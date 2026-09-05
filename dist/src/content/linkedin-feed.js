//#region src/content/linkedin-feed.ts
var API_URL = "http://localhost:8000".replace(/\/+$/, "");
var HIRING_PATTERNS = [
	/\b(?:we(?:'re| are)? hiring|looking for (?:a|an)?|open (?:role|position|opening)s?|join our team|join us as|DM (?:me|us)|apply here|hiring alert|send resume to|hiring for)\b/i,
	/#(?:hiring|jobopening|jobopportunity|careers|techjobs|nowhiring|jobsearch)\b/i,
	/\b(?:senior|lead|principal|staff|junior|frontend|backend|fullstack|software|engineer|developer|designer|product manager|data scientist)\b.*?\b(?:hiring|open role|join us|apply)\b/i
];
var TITLE_PATTERNS = [/\b(?:Senior|Lead|Staff|Principal|Junior)?\s*(?:Frontend|Backend|Full[- ]?Stack|Software|Mobile|DevOps|Site Reliability|Cloud|Security|Data|ML|AI|Product|UI\/UX)?\s*(?:Engineer|Developer|Architect|Designer|Manager|Scientist|Analyst)\b/i];
/** Check if text contains hiring signals */
function isHiringPost(text) {
	if (!text || text.length < 20) return false;
	return HIRING_PATTERNS.some((pattern) => pattern.test(text));
}
/** Infer Job Title from post text and author headline */
function extractJobTitle(text, headline) {
	for (const pattern of TITLE_PATTERNS) {
		const match = text.match(pattern);
		if (match && match[0]) return match[0].trim();
	}
	const firstLine = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 5)[0];
	if (firstLine && firstLine.length <= 60 && !firstLine.includes("http")) return firstLine.replace(/^[^\w]+/, "").trim();
	if (headline && headline.includes("at ")) {
		const role = headline.split("at ")[0].trim();
		if (role.length < 50) return role;
	}
	return "Open Role";
}
/** Infer Company from author headline or post text */
function extractCompany(text, headline, authorName) {
	if (headline) {
		if (headline.includes(" at ")) {
			const parts = headline.split(" at ");
			const companyPart = parts[parts.length - 1].split(/[|•,]/)[0].trim();
			if (companyPart.length > 1 && companyPart.length < 40) return companyPart;
		}
		if (headline.includes(" @ ")) {
			const parts = headline.split(" @ ");
			const companyPart = parts[parts.length - 1].split(/[|•,]/)[0].trim();
			if (companyPart.length > 1 && companyPart.length < 40) return companyPart;
		}
	}
	const atMatch = text.match(/\b(?:at|@)\s+([A-Z][A-Za-z0-9&.\s]{2,25})\b/);
	if (atMatch && atMatch[1]) {
		const candidate = atMatch[1].trim();
		if (![
			"LinkedIn",
			"The",
			"Our",
			"This",
			"Any"
		].includes(candidate)) return candidate;
	}
	return authorName ? `${authorName}'s Team` : "Company via LinkedIn";
}
/**
* LinkedIn now renders the feed with obfuscated hashed class names (SDUI).
* Stable hooks: role="listitem" + componentkey*="FeedType_MAIN_FEED_RELEVANCE"
* for the post container, [data-testid="expandable-text-box"] for text,
* aria-labels for the control menu / reaction / follow buttons.
*/
/** Extract author name from stable aria-label anchors */
function extractAuthorName(postEl) {
	const controlBtn = postEl.querySelector("button[aria-label^=\"Open control menu for post by \"]");
	if (controlBtn) {
		const name = controlBtn.getAttribute("aria-label")?.replace(/^Open control menu for post by\s+/, "").trim();
		if (name) return name;
	}
	const label = postEl.querySelector("[aria-label*=\"Verified Profile\"]")?.getAttribute("aria-label");
	if (label) {
		const name = label.replace(/\s+Verified\s+Profile.*$/i, "").trim();
		if (name) return name;
	}
	return "";
}
/** Extract author headline - the first plain <p> that isn't name/badge/time/followers */
function extractAuthorHeadline(postEl, authorName) {
	for (const p of postEl.querySelectorAll("p")) {
		const t = (p.textContent || "").trim();
		if (!t || t === authorName) continue;
		if (t.length > 200) continue;
		if (/^\d+\s*[hdwm]?\s*[•·]|^\d+\s*(?:hours?|days?|weeks?|months?)\s*ago/i.test(t)) continue;
		if (/\bfollowers?\b|\bconnections?\b/i.test(t) && t.length < 40) continue;
		if (/^(promoted|advertisement)$/i.test(t) || /^\d+\s*(?:reactions?|comments?|reposts?|impressions?)$/i.test(t)) continue;
		if (t.includes("•") && t.length < 45) continue;
		if (/verified|3rd\+|2nd\+|1st\+/i.test(t) && t.length < 30) continue;
		return t;
	}
	return "";
}
/** Extract full post metadata from a LinkedIn feed post container */
function extractPostData(postEl) {
	const description = (postEl.querySelector("[data-testid=\"expandable-text-box\"]")?.textContent || "").trim();
	if (!description) return null;
	const authorName = extractAuthorName(postEl);
	const authorHeadline = extractAuthorHeadline(postEl, authorName);
	const authorProfileUrl = postEl.querySelector("a[href*=\"/in/\"], a[href*=\"/company/\"]")?.href || "";
	const postUrl = window.location.href;
	const title = extractJobTitle(description, authorHeadline);
	const company = extractCompany(description, authorHeadline, authorName);
	let location = "Remote";
	if (/\b(?:San Francisco|New York|London|Berlin|Dubai|Austin|Toronto|Remote|Hybrid|On-site)\b/i.test(description)) {
		const locMatch = description.match(/\b(?:San Francisco|New York|London|Berlin|Dubai|Austin|Toronto|Remote|Hybrid|On-site)\b/i);
		if (locMatch) location = locMatch[0];
	}
	return {
		title,
		company,
		description,
		url: postUrl,
		location,
		authorName,
		authorHeadline,
		authorProfileUrl
	};
}
/** Get CSRF token for authenticated API calls */
async function getCsrfToken() {
	try {
		return (await chrome.cookies?.get({
			url: API_URL,
			name: "csrftoken"
		}) || await chrome.cookies?.get({
			url: API_URL,
			name: "__Secure-csrftoken"
		}))?.value;
	} catch {
		return;
	}
}
/** Send extracted job to Vecta backend */
async function saveJobToVecta(data) {
	const { token } = await chrome.storage.local.get("token");
	const csrfToken = await getCsrfToken();
	const headers = { "Content-Type": "application/json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	if (csrfToken) headers["X-CSRFToken"] = csrfToken;
	const payload = {
		title: data.title,
		company: data.company,
		description: data.description,
		url: data.url,
		location: data.location,
		notes: `Discovered from LinkedIn post by ${data.authorName} (${data.authorHeadline}) [${data.authorProfileUrl}]`,
		priority: "medium"
	};
	try {
		if ((await fetch(`${API_URL}/api/saved-jobs/create-and-save/`, {
			method: "POST",
			headers,
			credentials: "include",
			body: JSON.stringify(payload)
		})).ok) return true;
		return (await fetch(`${API_URL}/api/jobs/discover/`, {
			method: "POST",
			headers,
			credentials: "include",
			body: JSON.stringify({
				engine: "manual",
				manual_job_url: data.url,
				keywords: data.title
			})
		})).ok;
	} catch (err) {
		console.error("[Vecta AI] Failed to save post job:", err);
		return false;
	}
}
/** Inject action button into detected hiring post */
function processPost(postEl) {
	if (postEl.querySelector(".vectai-feed-job-btn")) return;
	const text = postEl.querySelector("[data-testid=\"expandable-text-box\"]")?.textContent?.trim() || "";
	if (!text) return;
	if (!isHiringPost(text)) return;
	const reactionBtn = postEl.querySelector("button[aria-label^=\"Reaction button state\"]");
	const actionBar = reactionBtn?.closest("div[class*=\"_1bfeb661\"]") || reactionBtn?.parentElement?.parentElement || postEl;
	if (!actionBar) return;
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "vectai-feed-job-btn";
	btn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
    <span>Import to Vecta</span>
  `;
	btn.setAttribute("style", "display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:10px;border:1px solid rgba(37,99,235,0.3);background:rgba(37,99,235,0.08);color:#2563eb;font-size:11px;font-weight:700;font-family:'Plus Jakarta Sans',-apple-system,system-ui,sans-serif;cursor:pointer;margin:4px 6px;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);white-space:nowrap;box-shadow:0 1px 2px rgba(37,99,235,0.06);user-select:none;");
	btn.addEventListener("mouseenter", () => {
		btn.style.background = "rgba(37,99,235,0.15)";
		btn.style.borderColor = "rgba(37,99,235,0.45)";
		btn.style.transform = "translateY(-1px)";
	});
	btn.addEventListener("mouseleave", () => {
		if (!btn.disabled) {
			btn.style.background = "rgba(37,99,235,0.08)";
			btn.style.borderColor = "rgba(37,99,235,0.3)";
			btn.style.transform = "translateY(0)";
		}
	});
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const data = extractPostData(postEl);
		if (!data) return;
		btn.disabled = true;
		btn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-spin" style="flex-shrink:0;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      <span>Importing...</span>
    `;
		btn.style.opacity = "0.8";
		if (await saveJobToVecta(data)) {
			btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span style="color:#10b981;">Saved to Vecta!</span>
      `;
			btn.style.background = "rgba(16,185,129,0.1)";
			btn.style.borderColor = "rgba(16,185,129,0.3)";
			btn.style.opacity = "1";
		} else {
			btn.disabled = false;
			btn.innerHTML = `<span>Import Failed</span>`;
			btn.style.color = "#ef4444";
			setTimeout(() => {
				btn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Import to Vecta</span>
        `;
				btn.style.color = "#2563eb";
			}, 2500);
		}
	});
	actionBar.appendChild(btn);
}
/** Scan entire feed for posts */
function scanFeed() {
	(document.querySelector("[data-testid=\"mainFeed\"]") || document.body).querySelectorAll("div[role=\"listitem\"][componentkey*=\"FeedType_MAIN_FEED_RELEVANCE\"]").forEach(processPost);
}
/** Initialize Observer */
function initFeedObserver() {
	scanFeed();
	new MutationObserver(() => {
		scanFeed();
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initFeedObserver);
else initFeedObserver();
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkaW4tZmVlZC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9saW5rZWRpbi1mZWVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIExpbmtlZEluIEZlZWQgSm9iIERpc2NvdmVyeSBDb250ZW50IFNjcmlwdFxuICAgUGFzc2l2ZWx5IG9ic2VydmVzIGZlZWQgcG9zdHMgYXMgdGhlIHVzZXIgc2Nyb2xscyxcbiAgIGRldGVjdHMgaGlyaW5nIGludGVudCB2aWEgc2VtYW50aWMgaGV1cmlzdGljcyxcbiAgIGFuZCBpbmplY3RzIGEgMS1jbGljayAnSW1wb3J0IHRvIFZlY3RhJyBidXR0b24uXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmNvbnN0IEFQSV9VUkwgPSAoaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX1VSTCB8fCBcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMFwiKS5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpO1xuXG5jb25zdCBISVJJTkdfUEFUVEVSTlMgPSBbXG4gIC9cXGIoPzp3ZSg/OidyZXwgYXJlKT8gaGlyaW5nfGxvb2tpbmcgZm9yICg/OmF8YW4pP3xvcGVuICg/OnJvbGV8cG9zaXRpb258b3BlbmluZylzP3xqb2luIG91ciB0ZWFtfGpvaW4gdXMgYXN8RE0gKD86bWV8dXMpfGFwcGx5IGhlcmV8aGlyaW5nIGFsZXJ0fHNlbmQgcmVzdW1lIHRvfGhpcmluZyBmb3IpXFxiL2ksXG4gIC8jKD86aGlyaW5nfGpvYm9wZW5pbmd8am9ib3Bwb3J0dW5pdHl8Y2FyZWVyc3x0ZWNoam9ic3xub3doaXJpbmd8am9ic2VhcmNoKVxcYi9pLFxuICAvXFxiKD86c2VuaW9yfGxlYWR8cHJpbmNpcGFsfHN0YWZmfGp1bmlvcnxmcm9udGVuZHxiYWNrZW5kfGZ1bGxzdGFja3xzb2Z0d2FyZXxlbmdpbmVlcnxkZXZlbG9wZXJ8ZGVzaWduZXJ8cHJvZHVjdCBtYW5hZ2VyfGRhdGEgc2NpZW50aXN0KVxcYi4qP1xcYig/OmhpcmluZ3xvcGVuIHJvbGV8am9pbiB1c3xhcHBseSlcXGIvaSxcbl07XG5cbmNvbnN0IFRJVExFX1BBVFRFUk5TID0gW1xuICAvXFxiKD86U2VuaW9yfExlYWR8U3RhZmZ8UHJpbmNpcGFsfEp1bmlvcik/XFxzKig/OkZyb250ZW5kfEJhY2tlbmR8RnVsbFstIF0/U3RhY2t8U29mdHdhcmV8TW9iaWxlfERldk9wc3xTaXRlIFJlbGlhYmlsaXR5fENsb3VkfFNlY3VyaXR5fERhdGF8TUx8QUl8UHJvZHVjdHxVSVxcL1VYKT9cXHMqKD86RW5naW5lZXJ8RGV2ZWxvcGVyfEFyY2hpdGVjdHxEZXNpZ25lcnxNYW5hZ2VyfFNjaWVudGlzdHxBbmFseXN0KVxcYi9pLFxuXTtcblxuaW50ZXJmYWNlIEV4dHJhY3RlZFBvc3REYXRhIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29tcGFueTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbG9jYXRpb246IHN0cmluZztcbiAgYXV0aG9yTmFtZTogc3RyaW5nO1xuICBhdXRob3JIZWFkbGluZTogc3RyaW5nO1xuICBhdXRob3JQcm9maWxlVXJsOiBzdHJpbmc7XG59XG5cbi8qKiBDaGVjayBpZiB0ZXh0IGNvbnRhaW5zIGhpcmluZyBzaWduYWxzICovXG5mdW5jdGlvbiBpc0hpcmluZ1Bvc3QodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA8IDIwKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBISVJJTkdfUEFUVEVSTlMuc29tZSgocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KHRleHQpKTtcbn1cblxuLyoqIEluZmVyIEpvYiBUaXRsZSBmcm9tIHBvc3QgdGV4dCBhbmQgYXV0aG9yIGhlYWRsaW5lICovXG5mdW5jdGlvbiBleHRyYWN0Sm9iVGl0bGUodGV4dDogc3RyaW5nLCBoZWFkbGluZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIFRJVExFX1BBVFRFUk5TKSB7XG4gICAgY29uc3QgbWF0Y2ggPSB0ZXh0Lm1hdGNoKHBhdHRlcm4pO1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFswXSkge1xuICAgICAgcmV0dXJuIG1hdGNoWzBdLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICAvLyBUcnkgZXh0cmFjdGluZyBmcm9tIGZpcnN0IG5vbi1lbXB0eSBsaW5lXG4gIGNvbnN0IGZpcnN0TGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIikubWFwKChsKSA9PiBsLnRyaW0oKSkuZmlsdGVyKChsKSA9PiBsLmxlbmd0aCA+IDUpWzBdO1xuICBpZiAoZmlyc3RMaW5lICYmIGZpcnN0TGluZS5sZW5ndGggPD0gNjAgJiYgIWZpcnN0TGluZS5pbmNsdWRlcyhcImh0dHBcIikpIHtcbiAgICByZXR1cm4gZmlyc3RMaW5lLnJlcGxhY2UoL15bXlxcd10rLywgXCJcIikudHJpbSgpO1xuICB9XG5cbiAgaWYgKGhlYWRsaW5lICYmIGhlYWRsaW5lLmluY2x1ZGVzKFwiYXQgXCIpKSB7XG4gICAgY29uc3Qgcm9sZSA9IGhlYWRsaW5lLnNwbGl0KFwiYXQgXCIpWzBdLnRyaW0oKTtcbiAgICBpZiAocm9sZS5sZW5ndGggPCA1MCkgcmV0dXJuIHJvbGU7XG4gIH1cblxuICByZXR1cm4gXCJPcGVuIFJvbGVcIjtcbn1cblxuLyoqIEluZmVyIENvbXBhbnkgZnJvbSBhdXRob3IgaGVhZGxpbmUgb3IgcG9zdCB0ZXh0ICovXG5mdW5jdGlvbiBleHRyYWN0Q29tcGFueSh0ZXh0OiBzdHJpbmcsIGhlYWRsaW5lOiBzdHJpbmcsIGF1dGhvck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChoZWFkbGluZSkge1xuICAgIGlmIChoZWFkbGluZS5pbmNsdWRlcyhcIiBhdCBcIikpIHtcbiAgICAgIGNvbnN0IHBhcnRzID0gaGVhZGxpbmUuc3BsaXQoXCIgYXQgXCIpO1xuICAgICAgY29uc3QgY29tcGFueVBhcnQgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXS5zcGxpdCgvW3zigKIsXS8pWzBdLnRyaW0oKTtcbiAgICAgIGlmIChjb21wYW55UGFydC5sZW5ndGggPiAxICYmIGNvbXBhbnlQYXJ0Lmxlbmd0aCA8IDQwKSByZXR1cm4gY29tcGFueVBhcnQ7XG4gICAgfVxuICAgIGlmIChoZWFkbGluZS5pbmNsdWRlcyhcIiBAIFwiKSkge1xuICAgICAgY29uc3QgcGFydHMgPSBoZWFkbGluZS5zcGxpdChcIiBAIFwiKTtcbiAgICAgIGNvbnN0IGNvbXBhbnlQYXJ0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0uc3BsaXQoL1t84oCiLF0vKVswXS50cmltKCk7XG4gICAgICBpZiAoY29tcGFueVBhcnQubGVuZ3RoID4gMSAmJiBjb21wYW55UGFydC5sZW5ndGggPCA0MCkgcmV0dXJuIGNvbXBhbnlQYXJ0O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGF0TWF0Y2ggPSB0ZXh0Lm1hdGNoKC9cXGIoPzphdHxAKVxccysoW0EtWl1bQS1aYS16MC05Ji5cXHNdezIsMjV9KVxcYi8pO1xuICBpZiAoYXRNYXRjaCAmJiBhdE1hdGNoWzFdKSB7XG4gICAgY29uc3QgY2FuZGlkYXRlID0gYXRNYXRjaFsxXS50cmltKCk7XG4gICAgaWYgKCFbXCJMaW5rZWRJblwiLCBcIlRoZVwiLCBcIk91clwiLCBcIlRoaXNcIiwgXCJBbnlcIl0uaW5jbHVkZXMoY2FuZGlkYXRlKSkge1xuICAgICAgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXV0aG9yTmFtZSA/IGAke2F1dGhvck5hbWV9J3MgVGVhbWAgOiBcIkNvbXBhbnkgdmlhIExpbmtlZEluXCI7XG59XG5cbi8qKlxuICogTGlua2VkSW4gbm93IHJlbmRlcnMgdGhlIGZlZWQgd2l0aCBvYmZ1c2NhdGVkIGhhc2hlZCBjbGFzcyBuYW1lcyAoU0RVSSkuXG4gKiBTdGFibGUgaG9va3M6IHJvbGU9XCJsaXN0aXRlbVwiICsgY29tcG9uZW50a2V5Kj1cIkZlZWRUeXBlX01BSU5fRkVFRF9SRUxFVkFOQ0VcIlxuICogZm9yIHRoZSBwb3N0IGNvbnRhaW5lciwgW2RhdGEtdGVzdGlkPVwiZXhwYW5kYWJsZS10ZXh0LWJveFwiXSBmb3IgdGV4dCxcbiAqIGFyaWEtbGFiZWxzIGZvciB0aGUgY29udHJvbCBtZW51IC8gcmVhY3Rpb24gLyBmb2xsb3cgYnV0dG9ucy5cbiAqL1xuXG4vKiogRXh0cmFjdCBhdXRob3IgbmFtZSBmcm9tIHN0YWJsZSBhcmlhLWxhYmVsIGFuY2hvcnMgKi9cbmZ1bmN0aW9uIGV4dHJhY3RBdXRob3JOYW1lKHBvc3RFbDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICBjb25zdCBjb250cm9sQnRuID0gcG9zdEVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICdidXR0b25bYXJpYS1sYWJlbF49XCJPcGVuIGNvbnRyb2wgbWVudSBmb3IgcG9zdCBieSBcIl0nXG4gICk7XG4gIGlmIChjb250cm9sQnRuKSB7XG4gICAgY29uc3QgbmFtZSA9IGNvbnRyb2xCdG4uZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKT8ucmVwbGFjZSgvXk9wZW4gY29udHJvbCBtZW51IGZvciBwb3N0IGJ5XFxzKy8sIFwiXCIpLnRyaW0oKTtcbiAgICBpZiAobmFtZSkgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBjb25zdCB2ZXJpZmllZEVsID0gcG9zdEVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbYXJpYS1sYWJlbCo9XCJWZXJpZmllZCBQcm9maWxlXCJdJyk7XG4gIGNvbnN0IGxhYmVsID0gdmVyaWZpZWRFbD8uZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgaWYgKGxhYmVsKSB7XG4gICAgY29uc3QgbmFtZSA9IGxhYmVsLnJlcGxhY2UoL1xccytWZXJpZmllZFxccytQcm9maWxlLiokL2ksIFwiXCIpLnRyaW0oKTtcbiAgICBpZiAobmFtZSkgcmV0dXJuIG5hbWU7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn1cblxuLyoqIEV4dHJhY3QgYXV0aG9yIGhlYWRsaW5lIC0gdGhlIGZpcnN0IHBsYWluIDxwPiB0aGF0IGlzbid0IG5hbWUvYmFkZ2UvdGltZS9mb2xsb3dlcnMgKi9cbmZ1bmN0aW9uIGV4dHJhY3RBdXRob3JIZWFkbGluZShwb3N0RWw6IEhUTUxFbGVtZW50LCBhdXRob3JOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmb3IgKGNvbnN0IHAgb2YgcG9zdEVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFBhcmFncmFwaEVsZW1lbnQ+KFwicFwiKSkge1xuICAgIGNvbnN0IHQgPSAocC50ZXh0Q29udGVudCB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCF0IHx8IHQgPT09IGF1dGhvck5hbWUpIGNvbnRpbnVlO1xuICAgIGlmICh0Lmxlbmd0aCA+IDIwMCkgY29udGludWU7XG4gICAgaWYgKC9eXFxkK1xccypbaGR3bV0/XFxzKlvigKLCt118XlxcZCtcXHMqKD86aG91cnM/fGRheXM/fHdlZWtzP3xtb250aHM/KVxccyphZ28vaS50ZXN0KHQpKSBjb250aW51ZTtcbiAgICBpZiAoL1xcYmZvbGxvd2Vycz9cXGJ8XFxiY29ubmVjdGlvbnM/XFxiL2kudGVzdCh0KSAmJiB0Lmxlbmd0aCA8IDQwKSBjb250aW51ZTtcbiAgICBpZiAoL14ocHJvbW90ZWR8YWR2ZXJ0aXNlbWVudCkkL2kudGVzdCh0KSB8fCAvXlxcZCtcXHMqKD86cmVhY3Rpb25zP3xjb21tZW50cz98cmVwb3N0cz98aW1wcmVzc2lvbnM/KSQvaS50ZXN0KHQpKSBjb250aW51ZTtcbiAgICBpZiAodC5pbmNsdWRlcyhcIuKAolwiKSAmJiB0Lmxlbmd0aCA8IDQ1KSBjb250aW51ZTtcbiAgICBpZiAoL3ZlcmlmaWVkfDNyZFxcK3wybmRcXCt8MXN0XFwrL2kudGVzdCh0KSAmJiB0Lmxlbmd0aCA8IDMwKSBjb250aW51ZTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuLyoqIEV4dHJhY3QgZnVsbCBwb3N0IG1ldGFkYXRhIGZyb20gYSBMaW5rZWRJbiBmZWVkIHBvc3QgY29udGFpbmVyICovXG5mdW5jdGlvbiBleHRyYWN0UG9zdERhdGEocG9zdEVsOiBIVE1MRWxlbWVudCk6IEV4dHJhY3RlZFBvc3REYXRhIHwgbnVsbCB7XG4gIC8vIDEuIFBvc3QgVGV4dFxuICBjb25zdCB0ZXh0RWwgPSBwb3N0RWwucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXRlc3RpZD1cImV4cGFuZGFibGUtdGV4dC1ib3hcIl0nKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSAodGV4dEVsPy50ZXh0Q29udGVudCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghZGVzY3JpcHRpb24pIHJldHVybiBudWxsO1xuXG4gIC8vIDIuIEF1dGhvciBJbmZvXG4gIGNvbnN0IGF1dGhvck5hbWUgPSBleHRyYWN0QXV0aG9yTmFtZShwb3N0RWwpO1xuICBjb25zdCBhdXRob3JIZWFkbGluZSA9IGV4dHJhY3RBdXRob3JIZWFkbGluZShwb3N0RWwsIGF1dGhvck5hbWUpO1xuXG4gIGNvbnN0IGF1dGhvckxpbmtFbCA9IHBvc3RFbC5xdWVyeVNlbGVjdG9yPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAnYVtocmVmKj1cIi9pbi9cIl0sIGFbaHJlZio9XCIvY29tcGFueS9cIl0nXG4gICk7XG4gIGNvbnN0IGF1dGhvclByb2ZpbGVVcmwgPSBhdXRob3JMaW5rRWw/LmhyZWYgfHwgXCJcIjtcblxuICAvLyAzLiBQb3N0IFVSTCAtIHRoZSBuZXcgZmVlZCBET00gZXhwb3NlcyBubyBwZXItcG9zdCBwZXJtYWxpbms7IGZhbGwgYmFjayB0byB0aGUgZmVlZCBVUkwuXG4gIGNvbnN0IHBvc3RVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAvLyA0LiBJbmZlcnJlZCBGaWVsZHNcbiAgY29uc3QgdGl0bGUgPSBleHRyYWN0Sm9iVGl0bGUoZGVzY3JpcHRpb24sIGF1dGhvckhlYWRsaW5lKTtcbiAgY29uc3QgY29tcGFueSA9IGV4dHJhY3RDb21wYW55KGRlc2NyaXB0aW9uLCBhdXRob3JIZWFkbGluZSwgYXV0aG9yTmFtZSk7XG5cbiAgbGV0IGxvY2F0aW9uID0gXCJSZW1vdGVcIjtcbiAgaWYgKC9cXGIoPzpTYW4gRnJhbmNpc2NvfE5ldyBZb3JrfExvbmRvbnxCZXJsaW58RHViYWl8QXVzdGlufFRvcm9udG98UmVtb3RlfEh5YnJpZHxPbi1zaXRlKVxcYi9pLnRlc3QoZGVzY3JpcHRpb24pKSB7XG4gICAgY29uc3QgbG9jTWF0Y2ggPSBkZXNjcmlwdGlvbi5tYXRjaCgvXFxiKD86U2FuIEZyYW5jaXNjb3xOZXcgWW9ya3xMb25kb258QmVybGlufER1YmFpfEF1c3RpbnxUb3JvbnRvfFJlbW90ZXxIeWJyaWR8T24tc2l0ZSlcXGIvaSk7XG4gICAgaWYgKGxvY01hdGNoKSBsb2NhdGlvbiA9IGxvY01hdGNoWzBdO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBjb21wYW55LFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIHVybDogcG9zdFVybCxcbiAgICBsb2NhdGlvbixcbiAgICBhdXRob3JOYW1lLFxuICAgIGF1dGhvckhlYWRsaW5lLFxuICAgIGF1dGhvclByb2ZpbGVVcmwsXG4gIH07XG59XG5cbi8qKiBHZXQgQ1NSRiB0b2tlbiBmb3IgYXV0aGVudGljYXRlZCBBUEkgY2FsbHMgKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENzcmZUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZSA9XG4gICAgICAoYXdhaXQgY2hyb21lLmNvb2tpZXM/LmdldCh7IHVybDogQVBJX1VSTCwgbmFtZTogXCJjc3JmdG9rZW5cIiB9KSkgfHxcbiAgICAgIChhd2FpdCBjaHJvbWUuY29va2llcz8uZ2V0KHsgdXJsOiBBUElfVVJMLCBuYW1lOiBcIl9fU2VjdXJlLWNzcmZ0b2tlblwiIH0pKTtcbiAgICByZXR1cm4gY29va2llPy52YWx1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKiogU2VuZCBleHRyYWN0ZWQgam9iIHRvIFZlY3RhIGJhY2tlbmQgKi9cbmFzeW5jIGZ1bmN0aW9uIHNhdmVKb2JUb1ZlY3RhKGRhdGE6IEV4dHJhY3RlZFBvc3REYXRhKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHsgdG9rZW4gfSA9IChhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ0b2tlblwiKSkgYXMgeyB0b2tlbj86IHN0cmluZyB9O1xuICBjb25zdCBjc3JmVG9rZW4gPSBhd2FpdCBnZXRDc3JmVG9rZW4oKTtcblxuICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9O1xuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgaGVhZGVyc1tcIlgtQ1NSRlRva2VuXCJdID0gY3NyZlRva2VuO1xuICB9XG5cbiAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICB0aXRsZTogZGF0YS50aXRsZSxcbiAgICBjb21wYW55OiBkYXRhLmNvbXBhbnksXG4gICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG4gICAgdXJsOiBkYXRhLnVybCxcbiAgICBsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcbiAgICBub3RlczogYERpc2NvdmVyZWQgZnJvbSBMaW5rZWRJbiBwb3N0IGJ5ICR7ZGF0YS5hdXRob3JOYW1lfSAoJHtkYXRhLmF1dGhvckhlYWRsaW5lfSkgWyR7ZGF0YS5hdXRob3JQcm9maWxlVXJsfV1gLFxuICAgIHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL3NhdmVkLWpvYnMvY3JlYXRlLWFuZC1zYXZlL2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzLFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayB0byBtYW51YWwgZGlzY292ZXJ5IGVuZHBvaW50IGlmIG5lZWRlZFxuICAgIGNvbnN0IGZhbGxiYWNrUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL2pvYnMvZGlzY292ZXIvYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVuZ2luZTogXCJtYW51YWxcIixcbiAgICAgICAgbWFudWFsX2pvYl91cmw6IGRhdGEudXJsLFxuICAgICAgICBrZXl3b3JkczogZGF0YS50aXRsZSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiBmYWxsYmFja1Jlcy5vaztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltWZWN0YSBBSV0gRmFpbGVkIHRvIHNhdmUgcG9zdCBqb2I6XCIsIGVycik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKiBJbmplY3QgYWN0aW9uIGJ1dHRvbiBpbnRvIGRldGVjdGVkIGhpcmluZyBwb3N0ICovXG5mdW5jdGlvbiBwcm9jZXNzUG9zdChwb3N0RWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGlmIChwb3N0RWwucXVlcnlTZWxlY3RvcihcIi52ZWN0YWktZmVlZC1qb2ItYnRuXCIpKSByZXR1cm47XG5cbiAgY29uc3QgdGV4dEVsID0gcG9zdEVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS10ZXN0aWQ9XCJleHBhbmRhYmxlLXRleHQtYm94XCJdJyk7XG4gIGNvbnN0IHRleHQgPSB0ZXh0RWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgXCJcIjtcbiAgaWYgKCF0ZXh0KSByZXR1cm47XG5cbiAgaWYgKCFpc0hpcmluZ1Bvc3QodGV4dCkpIHJldHVybjtcblxuICAvLyBBY3Rpb24gcm93OiB0aGUgZmxleCByb3cgY29udGFpbmluZyB0aGUgTGlrZS9SZWFjdGlvbiBidXR0b25cbiAgY29uc3QgcmVhY3Rpb25CdG4gPSBwb3N0RWwucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgJ2J1dHRvblthcmlhLWxhYmVsXj1cIlJlYWN0aW9uIGJ1dHRvbiBzdGF0ZVwiXSdcbiAgKTtcbiAgY29uc3QgYWN0aW9uQmFyID1cbiAgICByZWFjdGlvbkJ0bj8uY2xvc2VzdDxIVE1MRWxlbWVudD4oJ2RpdltjbGFzcyo9XCJfMWJmZWI2NjFcIl0nKSB8fFxuICAgIHJlYWN0aW9uQnRuPy5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50IHx8XG4gICAgcG9zdEVsO1xuICBpZiAoIWFjdGlvbkJhcikgcmV0dXJuO1xuXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgYnRuLmNsYXNzTmFtZSA9IFwidmVjdGFpLWZlZWQtam9iLWJ0blwiO1xuICBidG4uaW5uZXJIVE1MID0gYFxuICAgIDxzdmcgd2lkdGg9XCIxM1wiIGhlaWdodD1cIjEzXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIj48L3BvbHlnb24+XG4gICAgPC9zdmc+XG4gICAgPHNwYW4+SW1wb3J0IHRvIFZlY3RhPC9zcGFuPlxuICBgO1xuXG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJzdHlsZVwiLFxuICAgIFwiZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjVweDtwYWRkaW5nOjRweCAxMHB4O1wiICtcbiAgICBcImJvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMyk7XCIgK1xuICAgIFwiYmFja2dyb3VuZDpyZ2JhKDM3LDk5LDIzNSwwLjA4KTtjb2xvcjojMjU2M2ViO2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjcwMDtcIiArXG4gICAgXCJmb250LWZhbWlseTonUGx1cyBKYWthcnRhIFNhbnMnLC1hcHBsZS1zeXN0ZW0sc3lzdGVtLXVpLHNhbnMtc2VyaWY7XCIgK1xuICAgIFwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luOjRweCA2cHg7dHJhbnNpdGlvbjphbGwgMC4ycyBjdWJpYy1iZXppZXIoMC4xNiwxLDAuMywxKTtcIiArXG4gICAgXCJ3aGl0ZS1zcGFjZTpub3dyYXA7Ym94LXNoYWRvdzowIDFweCAycHggcmdiYSgzNyw5OSwyMzUsMC4wNik7dXNlci1zZWxlY3Q6bm9uZTtcIlxuICApO1xuXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoMzcsOTksMjM1LDAuMTUpXCI7XG4gICAgYnRuLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZ2JhKDM3LDk5LDIzNSwwLjQ1KVwiO1xuICAgIGJ0bi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoLTFweClcIjtcbiAgfSk7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgaWYgKCFidG4uZGlzYWJsZWQpIHtcbiAgICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDM3LDk5LDIzNSwwLjA4KVwiO1xuICAgICAgYnRuLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZ2JhKDM3LDk5LDIzNSwwLjMpXCI7XG4gICAgICBidG4uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfVxuICB9KTtcblxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBkYXRhID0gZXh0cmFjdFBvc3REYXRhKHBvc3RFbCk7XG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIGNsYXNzPVwiYW5pbWF0ZS1zcGluXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTIxIDEyYTkgOSAwIDEgMS02LjIxOS04LjU2XCI+PC9wYXRoPlxuICAgICAgPC9zdmc+XG4gICAgICA8c3Bhbj5JbXBvcnRpbmcuLi48L3NwYW4+XG4gICAgYDtcbiAgICBidG4uc3R5bGUub3BhY2l0eSA9IFwiMC44XCI7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgc2F2ZUpvYlRvVmVjdGEoZGF0YSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjMTBiOTgxXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIyMCA2IDkgMTcgNCAxMlwiPjwvcG9seWxpbmU+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiMxMGI5ODE7XCI+U2F2ZWQgdG8gVmVjdGEhPC9zcGFuPlxuICAgICAgYDtcbiAgICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDE2LDE4NSwxMjksMC4xKVwiO1xuICAgICAgYnRuLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZ2JhKDE2LDE4NSwxMjksMC4zKVwiO1xuICAgICAgYnRuLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxzcGFuPkltcG9ydCBGYWlsZWQ8L3NwYW4+YDtcbiAgICAgIGJ0bi5zdHlsZS5jb2xvciA9IFwiI2VmNDQ0NFwiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHlsZT1cImZsZXgtc2hyaW5rOjA7XCI+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiPjwvcG9seWdvbj5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8c3Bhbj5JbXBvcnQgdG8gVmVjdGE8L3NwYW4+XG4gICAgICAgIGA7XG4gICAgICAgIGJ0bi5zdHlsZS5jb2xvciA9IFwiIzI1NjNlYlwiO1xuICAgICAgfSwgMjUwMCk7XG4gICAgfVxuICB9KTtcblxuICBhY3Rpb25CYXIuYXBwZW5kQ2hpbGQoYnRuKTtcbn1cblxuLyoqIFNjYW4gZW50aXJlIGZlZWQgZm9yIHBvc3RzICovXG5mdW5jdGlvbiBzY2FuRmVlZCgpOiB2b2lkIHtcbiAgY29uc3QgZmVlZFJvb3QgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS10ZXN0aWQ9XCJtYWluRmVlZFwiXScpIHx8IGRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IHBvc3RzID0gZmVlZFJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXG4gICAgJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl1bY29tcG9uZW50a2V5Kj1cIkZlZWRUeXBlX01BSU5fRkVFRF9SRUxFVkFOQ0VcIl0nXG4gICk7XG4gIHBvc3RzLmZvckVhY2gocHJvY2Vzc1Bvc3QpO1xufVxuXG4vKiogSW5pdGlhbGl6ZSBPYnNlcnZlciAqL1xuZnVuY3Rpb24gaW5pdEZlZWRPYnNlcnZlcigpOiB2b2lkIHtcbiAgc2NhbkZlZWQoKTtcblxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBzY2FuRmVlZCgpO1xuICB9KTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgfSk7XG59XG5cbi8vIFN0YXJ0IG9ic2VydmluZyBvbiBkb2N1bWVudCBsb2FkIC8gaWRsZVxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRGZWVkT2JzZXJ2ZXIpO1xufSBlbHNlIHtcbiAgaW5pdEZlZWRPYnNlcnZlcigpO1xufVxuIl0sIm1hcHBpbmdzIjoiO0FBT0EsSUFBTSxVQUFBLHdCQUFvRSxRQUFRLFFBQVEsRUFBRTtBQUU1RixJQUFNLGtCQUFrQjtDQUN0QjtDQUNBO0NBQ0E7QUFDRjtBQUVBLElBQU0saUJBQWlCLENBQ3JCLDRPQUNGOztBQWNBLFNBQVMsYUFBYSxNQUF1QjtDQUMzQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPO0NBQ3RDLE9BQU8sZ0JBQWdCLE1BQU0sWUFBWSxRQUFRLEtBQUssSUFBSSxDQUFDO0FBQzdEOztBQUdBLFNBQVMsZ0JBQWdCLE1BQWMsVUFBMEI7Q0FDL0QsS0FBSyxNQUFNLFdBQVcsZ0JBQWdCO0VBQ3BDLE1BQU0sUUFBUSxLQUFLLE1BQU0sT0FBTztFQUNoQyxJQUFJLFNBQVMsTUFBTSxJQUNqQixPQUFPLE1BQU0sRUFBRSxDQUFDLEtBQUs7Q0FFekI7Q0FHQSxNQUFNLFlBQVksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztDQUNwRixJQUFJLGFBQWEsVUFBVSxVQUFVLE1BQU0sQ0FBQyxVQUFVLFNBQVMsTUFBTSxHQUNuRSxPQUFPLFVBQVUsUUFBUSxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Q0FHL0MsSUFBSSxZQUFZLFNBQVMsU0FBUyxLQUFLLEdBQUc7RUFDeEMsTUFBTSxPQUFPLFNBQVMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSztFQUMzQyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU87Q0FDL0I7Q0FFQSxPQUFPO0FBQ1Q7O0FBR0EsU0FBUyxlQUFlLE1BQWMsVUFBa0IsWUFBNEI7Q0FDbEYsSUFBSSxVQUFVO0VBQ1osSUFBSSxTQUFTLFNBQVMsTUFBTSxHQUFHO0dBQzdCLE1BQU0sUUFBUSxTQUFTLE1BQU0sTUFBTTtHQUNuQyxNQUFNLGNBQWMsTUFBTSxNQUFNLFNBQVMsRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUs7R0FDbkUsSUFBSSxZQUFZLFNBQVMsS0FBSyxZQUFZLFNBQVMsSUFBSSxPQUFPO0VBQ2hFO0VBQ0EsSUFBSSxTQUFTLFNBQVMsS0FBSyxHQUFHO0dBQzVCLE1BQU0sUUFBUSxTQUFTLE1BQU0sS0FBSztHQUNsQyxNQUFNLGNBQWMsTUFBTSxNQUFNLFNBQVMsRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUs7R0FDbkUsSUFBSSxZQUFZLFNBQVMsS0FBSyxZQUFZLFNBQVMsSUFBSSxPQUFPO0VBQ2hFO0NBQ0Y7Q0FFQSxNQUFNLFVBQVUsS0FBSyxNQUFNLDZDQUE2QztDQUN4RSxJQUFJLFdBQVcsUUFBUSxJQUFJO0VBQ3pCLE1BQU0sWUFBWSxRQUFRLEVBQUUsQ0FBQyxLQUFLO0VBQ2xDLElBQUksQ0FBQztHQUFDO0dBQVk7R0FBTztHQUFPO0dBQVE7RUFBSyxDQUFDLENBQUMsU0FBUyxTQUFTLEdBQy9ELE9BQU87Q0FFWDtDQUVBLE9BQU8sYUFBYSxHQUFHLFdBQVcsV0FBVztBQUMvQzs7Ozs7Ozs7QUFVQSxTQUFTLGtCQUFrQixRQUE2QjtDQUN0RCxNQUFNLGFBQWEsT0FBTyxjQUN4Qix3REFDRjtDQUNBLElBQUksWUFBWTtFQUNkLE1BQU0sT0FBTyxXQUFXLGFBQWEsWUFBWSxDQUFDLEVBQUUsUUFBUSxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsS0FBSztFQUMxRyxJQUFJLE1BQU0sT0FBTztDQUNuQjtDQUdBLE1BQU0sUUFEYSxPQUFPLGNBQTJCLG9DQUN2QyxDQUFBLEVBQVksYUFBYSxZQUFZO0NBQ25ELElBQUksT0FBTztFQUNULE1BQU0sT0FBTyxNQUFNLFFBQVEsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLEtBQUs7RUFDakUsSUFBSSxNQUFNLE9BQU87Q0FDbkI7Q0FFQSxPQUFPO0FBQ1Q7O0FBR0EsU0FBUyxzQkFBc0IsUUFBcUIsWUFBNEI7Q0FDOUUsS0FBSyxNQUFNLEtBQUssT0FBTyxpQkFBdUMsR0FBRyxHQUFHO0VBQ2xFLE1BQU0sS0FBSyxFQUFFLGVBQWUsR0FBQSxDQUFJLEtBQUs7RUFDckMsSUFBSSxDQUFDLEtBQUssTUFBTSxZQUFZO0VBQzVCLElBQUksRUFBRSxTQUFTLEtBQUs7RUFDcEIsSUFBSSxzRUFBc0UsS0FBSyxDQUFDLEdBQUc7RUFDbkYsSUFBSSxtQ0FBbUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLElBQUk7RUFDakUsSUFBSSw4QkFBOEIsS0FBSyxDQUFDLEtBQUssMERBQTBELEtBQUssQ0FBQyxHQUFHO0VBQ2hILElBQUksRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUFFLFNBQVMsSUFBSTtFQUN0QyxJQUFJLDhCQUE4QixLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsSUFBSTtFQUM1RCxPQUFPO0NBQ1Q7Q0FDQSxPQUFPO0FBQ1Q7O0FBR0EsU0FBUyxnQkFBZ0IsUUFBK0M7Q0FHdEUsTUFBTSxlQURTLE9BQU8sY0FBMkIsdUNBQzVCLENBQUEsRUFBUSxlQUFlLEdBQUEsQ0FBSSxLQUFLO0NBQ3JELElBQUksQ0FBQyxhQUFhLE9BQU87Q0FHekIsTUFBTSxhQUFhLGtCQUFrQixNQUFNO0NBQzNDLE1BQU0saUJBQWlCLHNCQUFzQixRQUFRLFVBQVU7Q0FLL0QsTUFBTSxtQkFIZSxPQUFPLGNBQzFCLDJDQUV1QixDQUFBLEVBQWMsUUFBUTtDQUcvQyxNQUFNLFVBQVUsT0FBTyxTQUFTO0NBR2hDLE1BQU0sUUFBUSxnQkFBZ0IsYUFBYSxjQUFjO0NBQ3pELE1BQU0sVUFBVSxlQUFlLGFBQWEsZ0JBQWdCLFVBQVU7Q0FFdEUsSUFBSSxXQUFXO0NBQ2YsSUFBSSwyRkFBMkYsS0FBSyxXQUFXLEdBQUc7RUFDaEgsTUFBTSxXQUFXLFlBQVksTUFBTSwwRkFBMEY7RUFDN0gsSUFBSSxVQUFVLFdBQVcsU0FBUztDQUNwQztDQUVBLE9BQU87RUFDTDtFQUNBO0VBQ0E7RUFDQSxLQUFLO0VBQ0w7RUFDQTtFQUNBO0VBQ0E7Q0FDRjtBQUNGOztBQUdBLGVBQWUsZUFBNEM7Q0FDekQsSUFBSTtFQUlGLFFBRkcsTUFBTSxPQUFPLFNBQVMsSUFBSTtHQUFFLEtBQUs7R0FBUyxNQUFNO0VBQVksQ0FBQyxLQUM3RCxNQUFNLE9BQU8sU0FBUyxJQUFJO0dBQUUsS0FBSztHQUFTLE1BQU07RUFBcUIsQ0FBQyxFQUFBLEVBQzFEO0NBQ2pCLFFBQVE7RUFDTjtDQUNGO0FBQ0Y7O0FBR0EsZUFBZSxlQUFlLE1BQTJDO0NBQ3ZFLE1BQU0sRUFBRSxVQUFXLE1BQU0sT0FBTyxRQUFRLE1BQU0sSUFBSSxPQUFPO0NBQ3pELE1BQU0sWUFBWSxNQUFNLGFBQWE7Q0FFckMsTUFBTSxVQUFrQyxFQUN0QyxnQkFBZ0IsbUJBQ2xCO0NBQ0EsSUFBSSxPQUNGLFFBQVEsZ0JBQWdCLFVBQVU7Q0FFcEMsSUFBSSxXQUNGLFFBQVEsaUJBQWlCO0NBRzNCLE1BQU0sVUFBVTtFQUNkLE9BQU8sS0FBSztFQUNaLFNBQVMsS0FBSztFQUNkLGFBQWEsS0FBSztFQUNsQixLQUFLLEtBQUs7RUFDVixVQUFVLEtBQUs7RUFDZixPQUFPLG9DQUFvQyxLQUFLLFdBQVcsSUFBSSxLQUFLLGVBQWUsS0FBSyxLQUFLLGlCQUFpQjtFQUM5RyxVQUFVO0NBQ1o7Q0FFQSxJQUFJO0VBUUYsS0FBSSxNQVBjLE1BQU0sR0FBRyxRQUFRLG1DQUFtQztHQUNwRSxRQUFRO0dBQ1I7R0FDQSxhQUFhO0dBQ2IsTUFBTSxLQUFLLFVBQVUsT0FBTztFQUM5QixDQUFDLEVBQUEsQ0FFTyxJQUNOLE9BQU87RUFjVCxRQUFPLE1BVm1CLE1BQU0sR0FBRyxRQUFRLHNCQUFzQjtHQUMvRCxRQUFRO0dBQ1I7R0FDQSxhQUFhO0dBQ2IsTUFBTSxLQUFLLFVBQVU7SUFDbkIsUUFBUTtJQUNSLGdCQUFnQixLQUFLO0lBQ3JCLFVBQVUsS0FBSztHQUNqQixDQUFDO0VBQ0gsQ0FBQyxFQUFBLENBQ2tCO0NBQ3JCLFNBQVMsS0FBSztFQUNaLFFBQVEsTUFBTSx1Q0FBdUMsR0FBRztFQUN4RCxPQUFPO0NBQ1Q7QUFDRjs7QUFHQSxTQUFTLFlBQVksUUFBMkI7Q0FDOUMsSUFBSSxPQUFPLGNBQWMsc0JBQXNCLEdBQUc7Q0FHbEQsTUFBTSxPQURTLE9BQU8sY0FBMkIsdUNBQ3BDLENBQUEsRUFBUSxhQUFhLEtBQUssS0FBSztDQUM1QyxJQUFJLENBQUMsTUFBTTtDQUVYLElBQUksQ0FBQyxhQUFhLElBQUksR0FBRztDQUd6QixNQUFNLGNBQWMsT0FBTyxjQUN6QiwrQ0FDRjtDQUNBLE1BQU0sWUFDSixhQUFhLFFBQXFCLDJCQUF5QixLQUMzRCxhQUFhLGVBQWUsaUJBQzVCO0NBQ0YsSUFBSSxDQUFDLFdBQVc7Q0FFaEIsTUFBTSxNQUFNLFNBQVMsY0FBYyxRQUFRO0NBQzNDLElBQUksT0FBTztDQUNYLElBQUksWUFBWTtDQUNoQixJQUFJLFlBQVk7Ozs7OztDQU9oQixJQUFJLGFBQ0YsU0FDQSxxYUFNRjtDQUVBLElBQUksaUJBQWlCLG9CQUFvQjtFQUN2QyxJQUFJLE1BQU0sYUFBYTtFQUN2QixJQUFJLE1BQU0sY0FBYztFQUN4QixJQUFJLE1BQU0sWUFBWTtDQUN4QixDQUFDO0NBQ0QsSUFBSSxpQkFBaUIsb0JBQW9CO0VBQ3ZDLElBQUksQ0FBQyxJQUFJLFVBQVU7R0FDakIsSUFBSSxNQUFNLGFBQWE7R0FDdkIsSUFBSSxNQUFNLGNBQWM7R0FDeEIsSUFBSSxNQUFNLFlBQVk7RUFDeEI7Q0FDRixDQUFDO0NBRUQsSUFBSSxpQkFBaUIsU0FBUyxPQUFPLE1BQU07RUFDekMsRUFBRSxlQUFlO0VBQ2pCLEVBQUUsZ0JBQWdCO0VBRWxCLE1BQU0sT0FBTyxnQkFBZ0IsTUFBTTtFQUNuQyxJQUFJLENBQUMsTUFBTTtFQUVYLElBQUksV0FBVztFQUNmLElBQUksWUFBWTs7Ozs7O0VBTWhCLElBQUksTUFBTSxVQUFVO0VBSXBCLElBQUksTUFGa0IsZUFBZSxJQUFJLEdBRTVCO0dBQ1gsSUFBSSxZQUFZOzs7Ozs7R0FNaEIsSUFBSSxNQUFNLGFBQWE7R0FDdkIsSUFBSSxNQUFNLGNBQWM7R0FDeEIsSUFBSSxNQUFNLFVBQVU7RUFDdEIsT0FBTztHQUNMLElBQUksV0FBVztHQUNmLElBQUksWUFBWTtHQUNoQixJQUFJLE1BQU0sUUFBUTtHQUNsQixpQkFBaUI7SUFDZixJQUFJLFlBQVk7Ozs7OztJQU1oQixJQUFJLE1BQU0sUUFBUTtHQUNwQixHQUFHLElBQUk7RUFDVDtDQUNGLENBQUM7Q0FFRCxVQUFVLFlBQVksR0FBRztBQUMzQjs7QUFHQSxTQUFTLFdBQWlCO0NBTXhCLENBSkUsU0FBUyxjQUEyQiw0QkFBMEIsS0FBSyxTQUFTLEtBQUEsQ0FDdkQsaUJBQ3JCLHdFQUVGLENBQUEsQ0FBTSxRQUFRLFdBQVc7QUFDM0I7O0FBR0EsU0FBUyxtQkFBeUI7Q0FDaEMsU0FBUztDQU1ULElBSnFCLHVCQUF1QjtFQUMxQyxTQUFTO0NBQ1gsQ0FFQSxDQUFBLENBQVMsUUFBUSxTQUFTLE1BQU07RUFDOUIsV0FBVztFQUNYLFNBQVM7Q0FDWCxDQUFDO0FBQ0g7QUFHQSxJQUFJLFNBQVMsZUFBZSxXQUMxQixTQUFTLGlCQUFpQixvQkFBb0IsZ0JBQWdCO0tBRTlELGlCQUFpQiJ9