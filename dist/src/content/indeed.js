//#region \0content-inline-28.js
function scrollToElement(element) {
	element.scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region \0content-inline-15.js
var DEFAULT_FIELD_PATTERNS = [
	{
		keywords: [
			"first name",
			"firstname",
			"given name",
			"fname",
			"first"
		],
		getValue: (p) => p.personal.firstName || p.personal.name?.split(/\s+/)[0] || ""
	},
	{
		keywords: [
			"last name",
			"lastname",
			"surname",
			"family name",
			"lname",
			"last"
		],
		getValue: (p) => p.personal.lastName || p.personal.name?.split(/\s+/).slice(1).join(" ") || ""
	},
	{
		keywords: ["email", "e-mail"],
		getValue: (p) => p.personal.email
	},
	{
		keywords: [
			"phone",
			"telephone",
			"mobile",
			"cell",
			"phone number",
			"tel"
		],
		getValue: (p) => p.personal.phone
	},
	{
		keywords: [
			"location",
			"city",
			"town",
			"address"
		],
		getValue: (p) => p.personal.location || p.personal.city || ""
	},
	{
		keywords: [
			"linkedin",
			"linkedin url",
			"linkedin profile"
		],
		getValue: (p) => p.personal.linkedinUrl
	},
	{
		keywords: [
			"website",
			"portfolio",
			"url",
			"website url"
		],
		getValue: (p) => p.personal.websiteUrl
	},
	{
		keywords: [
			"headline",
			"summary",
			"cover letter",
			"coverletter",
			"additional info",
			"comments",
			"message"
		],
		getValue: (p) => p.answers?.coverLetter || p.answers?.additionalInfo || p.personal.summary || ""
	},
	{
		keywords: [
			"company",
			"current company",
			"employer",
			"organization",
			"org"
		],
		getValue: (p) => p.experience[0]?.company || ""
	},
	{
		keywords: [
			"job title",
			"title",
			"position",
			"current role"
		],
		getValue: (p) => p.experience[0]?.title || ""
	},
	{
		keywords: [
			"name",
			"full name",
			"fullname",
			"your name"
		],
		getValue: (p) => {
			return `${p.personal.firstName || ""} ${p.personal.lastName || ""}`.trim() || p.personal.name || "";
		}
	}
];
function getFieldLabel(element) {
	const input = element;
	if (input.ariaLabel) return input.ariaLabel;
	if (input.placeholder) return input.placeholder;
	if (input.name) return input.name.replace(/[_-]/g, " ");
	if (input.id) {
		const label = document.querySelector(`label[for="${input.id}"]`);
		if (label?.textContent) return label.textContent.trim();
	}
	const parent = element.closest("label");
	if (parent?.textContent) {
		const text = parent.textContent.replace(input.value || "", "").trim();
		if (text) return text;
	}
	const wrapper = element.closest("div[class*='field'], div[class*='form'], div[class*='input'], .field, .form-group");
	if (wrapper) {
		const labelEl = wrapper.querySelector("label, span.label, .label, .field-label");
		if (labelEl?.textContent) return labelEl.textContent.trim();
	}
	if (input.id) {
		const placeholder = document.querySelector(`[data-placeholder="${input.id}"]`);
		if (placeholder?.textContent) return placeholder.textContent.trim();
	}
	return input.name || input.id || "";
}
function findMatchingField(element, profile, patterns = DEFAULT_FIELD_PATTERNS) {
	const label = getFieldLabel(element).toLowerCase();
	if (!label) return {
		matched: false,
		value: ""
	};
	for (const pattern of patterns) if (pattern.keywords.some((k) => label.includes(k))) {
		const value = pattern.getValue(profile);
		if (value) return {
			matched: true,
			value
		};
	}
	return {
		matched: false,
		value: ""
	};
}
function getJobDetailsFromPage() {
	const titleEl = document.querySelector("h1[class*=\"title\"], h1[class*=\"heading\"], h1, .job-title, [data-testid*=\"title\"], .posting-header h1, .app-title");
	const companyEl = document.querySelector("[class*=\"company-name\"], [class*=\"company\"], .company, [data-testid*=\"company\"], .posting-header .company");
	const descriptionEl = document.querySelector("[class*=\"description\"], [class*=\"job-detail\"], [class*=\"posting\"], #content, #job-details, main, article");
	const locationEl = document.querySelector("[class*=\"location\"], [class*=\"region\"], .location, [data-testid*=\"location\"]");
	let company = companyEl?.textContent?.trim() || "Unknown Company";
	const pageTitle = document.title;
	if (company === "Unknown Company" && pageTitle.includes(" at ")) company = pageTitle.split(" at ")[1]?.trim() || company;
	else if (company === "Unknown Company" && pageTitle.includes(" - ")) company = pageTitle.split(" - ")[0]?.trim() || company;
	return {
		title: titleEl?.textContent?.trim() || pageTitle || "Unknown Title",
		company,
		description: descriptionEl?.textContent?.trim() || document.body.innerText.slice(0, 5e3) || "",
		location: locationEl?.textContent?.trim() || ""
	};
}
async function fillNativeInput(element, value) {
	const el = element;
	el.focus();
	const nativeSetter = Object.getOwnPropertyDescriptor(el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype, "value")?.set;
	if (nativeSetter) nativeSetter.call(el, value);
	else el.value = value;
	el.dispatchEvent(new Event("input", { bubbles: true }));
	el.dispatchEvent(new Event("change", { bubbles: true }));
	el.dispatchEvent(new Event("blur", { bubbles: true }));
}
async function handleSelectField(element, value) {
	const select = element;
	select.focus();
	for (const option of select.options) if (option.text.toLowerCase().includes(value.toLowerCase()) || option.value.toLowerCase() === value.toLowerCase()) {
		select.value = option.value;
		break;
	}
	select.dispatchEvent(new Event("change", { bubbles: true }));
	select.blur();
}
async function handleFileField(element, profile) {
	if (!profile.resume?.fileContentBase64) return;
	const input = element;
	try {
		const binaryStr = atob(profile.resume.fileContentBase64);
		const bytes = new Uint8Array(binaryStr.length);
		for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
		const file = new File([bytes], profile.resume.filename || "resume.pdf", { type: profile.resume.mimeType || "application/pdf" });
		const dt = new DataTransfer();
		dt.items.add(file);
		input.files = dt.files;
		input.dispatchEvent(new Event("change", { bubbles: true }));
	} catch {}
}
var DEFAULT_SCANNER_OPTIONS = {
	fieldSelectors: [
		"input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio'])",
		"textarea",
		"select"
	],
	excludedSelectors: [
		".hidden",
		"[style*='display: none']",
		"[type='file']"
	]
};
async function scanAndFillForm(profile, options = {}) {
	const opts = {
		...DEFAULT_SCANNER_OPTIONS,
		...options
	};
	const allFields = document.querySelectorAll(opts.fieldSelectors?.join(", ") || "input, textarea, select");
	const excludedElements = opts.excludedSelectors ? document.querySelectorAll(opts.excludedSelectors.join(", ")) : new NodeList();
	const excluded = /* @__PURE__ */ new Set();
	excludedElements.forEach((el) => {
		if (el instanceof Element) excluded.add(el);
	});
	let filled = 0;
	let total = 0;
	let completed = 0;
	const matched = [...allFields].filter((el) => {
		if (excluded.has(el)) return false;
		if (el instanceof HTMLInputElement && el.type === "file") return true;
		return true;
	});
	total = matched.length;
	const reportProgress = (field, status, message) => {
		completed++;
		chrome.runtime.sendMessage({
			type: "FILL_PROGRESS",
			progress: {
				field,
				status,
				total,
				completed,
				message
			}
		});
	};
	const visited = /* @__PURE__ */ new WeakSet();
	for (const el of matched) {
		if (visited.has(el)) continue;
		visited.add(el);
		try {
			if (el instanceof HTMLInputElement && el.type === "file") {
				await handleFileField(el, profile);
				reportProgress("Resume", "filled");
				filled++;
				continue;
			}
			const { matched: isMatch, value } = findMatchingField(el, profile, opts.patterns);
			if (isMatch && value) {
				scrollToElement(el);
				await sleep(50);
				if (el instanceof HTMLSelectElement) await handleSelectField(el, value);
				else if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) await fillNativeInput(el, value);
				el.setAttribute("data-vectai-filled", "true");
				el.style.outline = "2px solid #6366f1";
				el.style.outlineOffset = "2px";
				setTimeout(() => {
					el.style.outline = "";
					el.style.outlineOffset = "";
				}, 800);
				const label = getFieldLabel(el);
				const elName = el.name || el.id || "Field";
				reportProgress(label || elName, "filled");
				filled++;
				await sleep(100);
			}
		} catch {
			reportProgress(getFieldLabel(el) || el.id || `Field #${completed}`, "skipped");
		}
	}
	return filled;
}
function setupGenericMessageListener(options, extraJobDetails) {
	chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		if (message.type === "PING") {
			sendResponse({ pong: true });
			return true;
		}
		if (message.type === "GET_JOB_DETAILS") {
			sendResponse(extraJobDetails ? extraJobDetails() : getJobDetailsFromPage());
			return true;
		}
		if (message.type === "START_FILL") {
			scanAndFillForm(message.profile, options).then((filled) => {
				chrome.runtime.sendMessage({
					type: "FILL_COMPLETE",
					success: true,
					jobUrl: window.location.href,
					fieldsCompleted: filled
				});
				sendResponse({ started: true });
			}).catch((err) => {
				chrome.runtime.sendMessage({
					type: "FILL_ERROR",
					error: err instanceof Error ? err.message : String(err),
					jobUrl: window.location.href
				});
				sendResponse({ started: false });
			});
			return true;
		}
	});
}
//#endregion
//#region src/content/indeed.ts
var API_URL = "http://localhost:8000".replace(/\/+$/, "");
/** Extract job details from Indeed detail page/pane */
function getIndeedJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector(".jobsearch-JobInfoHeader-title, h1[class*='title'], [data-testid='jobsearch-JobInfoHeader-title'], h1.jobsearch-JobInfoHeader-title");
	const companyEl = document.querySelector("[data-testid='jobsearch-JobInfoHeader-companyName'], .jobsearch-JobInfoHeader-companyName, div[data-company-name]");
	const descriptionEl = document.querySelector("#jobDescriptionText, .jobsearch-jobDescriptionText, [data-testid='jobsearch-jobDescriptionText']");
	const locationEl = document.querySelector("[data-testid='jobsearch-JobInfoHeader-companyLocation'], .jobsearch-JobInfoHeader-companyLocation");
	return {
		title: titleEl?.textContent?.trim() || details.title,
		company: companyEl?.textContent?.trim() || details.company,
		description: descriptionEl?.textContent?.trim() || details.description,
		location: locationEl?.textContent?.trim() || details.location
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
		description: data.description || `${data.title} at ${data.company}`,
		url: data.url,
		location: data.location || "Remote",
		notes: data.notes || `Discovered from Indeed: ${data.title} at ${data.company}`,
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
		console.error("[Vecta AI] Failed to save Indeed job:", err);
		return false;
	}
}
/** Create styled Vecta Import Button */
function createImportButton(data, extraClass = "") {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = `vectai-import-btn ${extraClass}`.trim();
	btn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
    <span>Import to Vecta</span>
  `;
	btn.setAttribute("style", "display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:10px;border:1px solid rgba(37,99,235,0.3);background:rgba(37,99,235,0.08);color:#2563eb;font-size:11px;font-weight:700;font-family:'Plus Jakarta Sans',-apple-system,system-ui,sans-serif;cursor:pointer;margin:4px 0;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);white-space:nowrap;box-shadow:0 1px 2px rgba(37,99,235,0.06);user-select:none;");
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Import to Vecta</span>
        `;
				btn.style.color = "#2563eb";
			}, 2500);
		}
	});
	return btn;
}
/** Scan Indeed page and inject buttons */
function injectIndeedImportButtons() {
	document.querySelectorAll("div.job_seen_beacon, div.jobsearch-SerpJobCard, div.cardOutline, div[data-jk], li.css-5lfssm").forEach((card) => {
		if (card.querySelector(".vectai-import-btn")) return;
		const title = card.querySelector("a.jcs-JobTitle, h2.jobTitle span, h2.jobTitle a, [data-testid='job-title']")?.textContent?.trim();
		if (!title) return;
		const company = card.querySelector("[data-testid='company-name'], .companyName, span.companyName")?.textContent?.trim() || "Indeed Listing";
		const location = card.querySelector("[data-testid='text-location'], .companyLocation")?.textContent?.trim() || "Remote";
		let url = window.location.href;
		const linkEl = card.querySelector("a.jcs-JobTitle, h2.jobTitle a, a[data-jk]");
		if (linkEl?.href) url = linkEl.href;
		else {
			const jk = card.getAttribute("data-jk") || card.closest("[data-jk]")?.getAttribute("data-jk");
			if (jk) url = `https://www.indeed.com/viewjob?jk=${jk}`;
		}
		const description = card.querySelector(".job-snippet, table.jobCardShelfContainer, div.underShelfFooter")?.textContent?.trim() || `${title} at ${company} (${location})`;
		const targetContainer = card.querySelector(".jobsearch-JobInfoHeader-actions, .underShelfFooter, .resultContent, .slider_container") || card;
		const btn = createImportButton({
			title,
			company,
			description,
			url,
			location,
			notes: `Imported from Indeed search: ${title} at ${company}`
		});
		targetContainer.appendChild(btn);
	});
	const detailHeader = document.querySelector("#jobsearch-ViewjobPaneWrapper, .jobsearch-JobInfoHeader-actions, .jobsearch-ViewJobLayout, .jobsearch-JobComponent");
	if (detailHeader && !detailHeader.querySelector(".vectai-detail-import-btn")) {
		const details = getIndeedJobDetails();
		if (details.title && details.title !== "Untitled Position") {
			const btn = createImportButton({
				title: details.title,
				company: details.company || "Indeed Listing",
				description: details.description || details.title,
				url: window.location.href,
				location: details.location || "Remote",
				notes: `Imported from Indeed job detail view`
			}, "vectai-detail-import-btn");
			(detailHeader.querySelector(".jobsearch-JobInfoHeader-actions") || detailHeader).appendChild(btn);
		}
	}
}
/** Initialize Observer for dynamic scrolling on Indeed */
function initIndeedObserver() {
	injectIndeedImportButtons();
	new MutationObserver(() => {
		injectIndeedImportButtons();
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initIndeedObserver);
else initIndeedObserver();
setupGenericMessageListener({
	fieldSelectors: [
		"input:not([type='hidden']):not([type='submit']):not([type='button'])",
		"textarea",
		"select"
	],
	excludedSelectors: [
		".hidden",
		"[style*='display: none']",
		".icl-TextInput-control",
		"[type='file']"
	]
}, getIndeedJobDetails);
console.log("[Vecta AI] 🔍 Indeed in-page discovery & autofill content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZWVkLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L2luZGVlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBJbmRlZWQgQ29udGVudCBTY3JpcHRcbiAgIEluamVjdGVkIG9uIGluZGVlZC5jb20vKiBwYWdlcy5cbiAgIEZlYXR1cmVzOlxuICAgMS4gSW4tcGFnZSAxLWNsaWNrICdJbXBvcnQgdG8gVmVjdGEnIG9uIGpvYiBjYXJkcyBhbmQgZGV0YWlsIHZpZXcuXG4gICAyLiBBdXRvZmlsbCBhbmQgQVRTIGRldGVjdG9yIG1lc3NhZ2UgaGFuZGxpbmcuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCB7IHNldHVwR2VuZXJpY01lc3NhZ2VMaXN0ZW5lciwgZ2V0Sm9iRGV0YWlsc0Zyb21QYWdlIH0gZnJvbSBcIi4vZ2VuZXJpYy1hdHNcIjtcblxuY29uc3QgQVBJX1VSTCA9IChpbXBvcnQubWV0YS5lbnYuVklURV9BUElfVVJMIHx8IFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwXCIpLnJlcGxhY2UoL1xcLyskLywgXCJcIik7XG5cbmludGVyZmFjZSBKb2JJbXBvcnREYXRhIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29tcGFueTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbG9jYXRpb246IHN0cmluZztcbiAgbm90ZXM/OiBzdHJpbmc7XG59XG5cbi8qKiBFeHRyYWN0IGpvYiBkZXRhaWxzIGZyb20gSW5kZWVkIGRldGFpbCBwYWdlL3BhbmUgKi9cbmZ1bmN0aW9uIGdldEluZGVlZEpvYkRldGFpbHMoKSB7XG4gIGNvbnN0IGRldGFpbHMgPSBnZXRKb2JEZXRhaWxzRnJvbVBhZ2UoKTtcbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuam9ic2VhcmNoLUpvYkluZm9IZWFkZXItdGl0bGUsIGgxW2NsYXNzKj0ndGl0bGUnXSwgW2RhdGEtdGVzdGlkPSdqb2JzZWFyY2gtSm9iSW5mb0hlYWRlci10aXRsZSddLCBoMS5qb2JzZWFyY2gtSm9iSW5mb0hlYWRlci10aXRsZVwiXG4gICk7XG4gIGNvbnN0IGNvbXBhbnlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJbZGF0YS10ZXN0aWQ9J2pvYnNlYXJjaC1Kb2JJbmZvSGVhZGVyLWNvbXBhbnlOYW1lJ10sIC5qb2JzZWFyY2gtSm9iSW5mb0hlYWRlci1jb21wYW55TmFtZSwgZGl2W2RhdGEtY29tcGFueS1uYW1lXVwiXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI2pvYkRlc2NyaXB0aW9uVGV4dCwgLmpvYnNlYXJjaC1qb2JEZXNjcmlwdGlvblRleHQsIFtkYXRhLXRlc3RpZD0nam9ic2VhcmNoLWpvYkRlc2NyaXB0aW9uVGV4dCddXCJcbiAgKTtcbiAgY29uc3QgbG9jYXRpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJbZGF0YS10ZXN0aWQ9J2pvYnNlYXJjaC1Kb2JJbmZvSGVhZGVyLWNvbXBhbnlMb2NhdGlvbiddLCAuam9ic2VhcmNoLUpvYkluZm9IZWFkZXItY29tcGFueUxvY2F0aW9uXCJcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0aXRsZUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMudGl0bGUsXG4gICAgY29tcGFueTogY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMuY29tcGFueSxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvbkVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMubG9jYXRpb24sXG4gIH07XG59XG5cbi8qKiBHZXQgQ1NSRiB0b2tlbiBmb3IgYXV0aGVudGljYXRlZCBBUEkgY2FsbHMgKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENzcmZUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZSA9XG4gICAgICAoYXdhaXQgY2hyb21lLmNvb2tpZXM/LmdldCh7IHVybDogQVBJX1VSTCwgbmFtZTogXCJjc3JmdG9rZW5cIiB9KSkgfHxcbiAgICAgIChhd2FpdCBjaHJvbWUuY29va2llcz8uZ2V0KHsgdXJsOiBBUElfVVJMLCBuYW1lOiBcIl9fU2VjdXJlLWNzcmZ0b2tlblwiIH0pKTtcbiAgICByZXR1cm4gY29va2llPy52YWx1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKiogU2VuZCBleHRyYWN0ZWQgam9iIHRvIFZlY3RhIGJhY2tlbmQgKi9cbmFzeW5jIGZ1bmN0aW9uIHNhdmVKb2JUb1ZlY3RhKGRhdGE6IEpvYkltcG9ydERhdGEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgeyB0b2tlbiB9ID0gKGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcInRva2VuXCIpKSBhcyB7IHRva2VuPzogc3RyaW5nIH07XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGF3YWl0IGdldENzcmZUb2tlbigpO1xuXG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH07XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICBoZWFkZXJzW1wiWC1DU1JGVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgIGNvbXBhbnk6IGRhdGEuY29tcGFueSxcbiAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbiB8fCBgJHtkYXRhLnRpdGxlfSBhdCAke2RhdGEuY29tcGFueX1gLFxuICAgIHVybDogZGF0YS51cmwsXG4gICAgbG9jYXRpb246IGRhdGEubG9jYXRpb24gfHwgXCJSZW1vdGVcIixcbiAgICBub3RlczogZGF0YS5ub3RlcyB8fCBgRGlzY292ZXJlZCBmcm9tIEluZGVlZDogJHtkYXRhLnRpdGxlfSBhdCAke2RhdGEuY29tcGFueX1gLFxuICAgIHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL3NhdmVkLWpvYnMvY3JlYXRlLWFuZC1zYXZlL2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzLFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmYWxsYmFja1JlcyA9IGF3YWl0IGZldGNoKGAke0FQSV9VUkx9L2FwaS9qb2JzL2Rpc2NvdmVyL2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzLFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBlbmdpbmU6IFwibWFudWFsXCIsXG4gICAgICAgIG1hbnVhbF9qb2JfdXJsOiBkYXRhLnVybCxcbiAgICAgICAga2V5d29yZHM6IGRhdGEudGl0bGUsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICByZXR1cm4gZmFsbGJhY2tSZXMub2s7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbVmVjdGEgQUldIEZhaWxlZCB0byBzYXZlIEluZGVlZCBqb2I6XCIsIGVycik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKiBDcmVhdGUgc3R5bGVkIFZlY3RhIEltcG9ydCBCdXR0b24gKi9cbmZ1bmN0aW9uIGNyZWF0ZUltcG9ydEJ1dHRvbihkYXRhOiBKb2JJbXBvcnREYXRhLCBleHRyYUNsYXNzID0gXCJcIik6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICBidG4uY2xhc3NOYW1lID0gYHZlY3RhaS1pbXBvcnQtYnRuICR7ZXh0cmFDbGFzc31gLnRyaW0oKTtcbiAgYnRuLmlubmVySFRNTCA9IGBcbiAgICA8c3ZnIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0eWxlPVwiZmxleC1zaHJpbms6MDtcIj5cbiAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjEzIDIgMyAxNCAxMiAxNCAxMSAyMiAyMSAxMCAxMiAxMCAxMyAyXCI+PC9wb2x5Z29uPlxuICAgIDwvc3ZnPlxuICAgIDxzcGFuPkltcG9ydCB0byBWZWN0YTwvc3Bhbj5cbiAgYDtcblxuICBidG4uc2V0QXR0cmlidXRlKFxuICAgIFwic3R5bGVcIixcbiAgICBcImRpc3BsYXk6aW5saW5lLWZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo1cHg7cGFkZGluZzo0cHggMTBweDtcIiArXG4gICAgXCJib3JkZXItcmFkaXVzOjEwcHg7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjMpO1wiICtcbiAgICBcImJhY2tncm91bmQ6cmdiYSgzNyw5OSwyMzUsMC4wOCk7Y29sb3I6IzI1NjNlYjtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo3MDA7XCIgK1xuICAgIFwiZm9udC1mYW1pbHk6J1BsdXMgSmFrYXJ0YSBTYW5zJywtYXBwbGUtc3lzdGVtLHN5c3RlbS11aSxzYW5zLXNlcmlmO1wiICtcbiAgICBcImN1cnNvcjpwb2ludGVyO21hcmdpbjo0cHggMDt0cmFuc2l0aW9uOmFsbCAwLjJzIGN1YmljLWJlemllcigwLjE2LDEsMC4zLDEpO1wiICtcbiAgICBcIndoaXRlLXNwYWNlOm5vd3JhcDtib3gtc2hhZG93OjAgMXB4IDJweCByZ2JhKDM3LDk5LDIzNSwwLjA2KTt1c2VyLXNlbGVjdDpub25lO1wiXG4gICk7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICBidG4uc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiYSgzNyw5OSwyMzUsMC4xNSlcIjtcbiAgICBidG4uc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJnYmEoMzcsOTksMjM1LDAuNDUpXCI7XG4gICAgYnRuLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgtMXB4KVwiO1xuICB9KTtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICBpZiAoIWJ0bi5kaXNhYmxlZCkge1xuICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoMzcsOTksMjM1LDAuMDgpXCI7XG4gICAgICBidG4uc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJnYmEoMzcsOTksMjM1LDAuMylcIjtcbiAgICAgIGJ0bi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMClcIjtcbiAgICB9XG4gIH0pO1xuXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdmcgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgY2xhc3M9XCJhbmltYXRlLXNwaW5cIiBzdHlsZT1cImZsZXgtc2hyaW5rOjA7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMjEgMTJhOSA5IDAgMSAxLTYuMjE5LTguNTZcIj48L3BhdGg+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxzcGFuPkltcG9ydGluZy4uLjwvc3Bhbj5cbiAgICBgO1xuICAgIGJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIwLjhcIjtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCBzYXZlSm9iVG9WZWN0YShkYXRhKTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTNcIiBoZWlnaHQ9XCIxM1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiMxMGI5ODFcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHlsZT1cImZsZXgtc2hyaW5rOjA7XCI+XG4gICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz1cIjIwIDYgOSAxNyA0IDEyXCI+PC9wb2x5bGluZT5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6IzEwYjk4MTtcIj5TYXZlZCB0byBWZWN0YSE8L3NwYW4+XG4gICAgICBgO1xuICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoMTYsMTg1LDEyOSwwLjEpXCI7XG4gICAgICBidG4uc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJnYmEoMTYsMTg1LDEyOSwwLjMpXCI7XG4gICAgICBidG4uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJ0bi5pbm5lckhUTUwgPSBgPHNwYW4+SW1wb3J0IEZhaWxlZDwvc3Bhbj5gO1xuICAgICAgYnRuLnN0eWxlLmNvbG9yID0gXCIjZWY0NDQ0XCI7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0eWxlPVwiZmxleC1zaHJpbms6MDtcIj5cbiAgICAgICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjEzIDIgMyAxNCAxMiAxNCAxMSAyMiAyMSAxMCAxMiAxMCAxMyAyXCI+PC9wb2x5Z29uPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxzcGFuPkltcG9ydCB0byBWZWN0YTwvc3Bhbj5cbiAgICAgICAgYDtcbiAgICAgICAgYnRuLnN0eWxlLmNvbG9yID0gXCIjMjU2M2ViXCI7XG4gICAgICB9LCAyNTAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBidG47XG59XG5cbi8qKiBTY2FuIEluZGVlZCBwYWdlIGFuZCBpbmplY3QgYnV0dG9ucyAqL1xuZnVuY3Rpb24gaW5qZWN0SW5kZWVkSW1wb3J0QnV0dG9ucygpOiB2b2lkIHtcbiAgLy8gMS4gU2VhcmNoIFJlc3VsdCBDYXJkc1xuICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFxuICAgIFwiZGl2LmpvYl9zZWVuX2JlYWNvbiwgZGl2LmpvYnNlYXJjaC1TZXJwSm9iQ2FyZCwgZGl2LmNhcmRPdXRsaW5lLCBkaXZbZGF0YS1qa10sIGxpLmNzcy01bGZzc21cIlxuICApO1xuXG4gIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICBpZiAoY2FyZC5xdWVyeVNlbGVjdG9yKFwiLnZlY3RhaS1pbXBvcnQtYnRuXCIpKSByZXR1cm47XG5cbiAgICBjb25zdCB0aXRsZUVsID0gY2FyZC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcbiAgICAgIFwiYS5qY3MtSm9iVGl0bGUsIGgyLmpvYlRpdGxlIHNwYW4sIGgyLmpvYlRpdGxlIGEsIFtkYXRhLXRlc3RpZD0nam9iLXRpdGxlJ11cIlxuICAgICk7XG4gICAgY29uc3QgdGl0bGUgPSB0aXRsZUVsPy50ZXh0Q29udGVudD8udHJpbSgpO1xuICAgIGlmICghdGl0bGUpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbXBhbnlFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgICBcIltkYXRhLXRlc3RpZD0nY29tcGFueS1uYW1lJ10sIC5jb21wYW55TmFtZSwgc3Bhbi5jb21wYW55TmFtZVwiXG4gICAgKTtcbiAgICBjb25zdCBjb21wYW55ID0gY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiSW5kZWVkIExpc3RpbmdcIjtcblxuICAgIGNvbnN0IGxvY0VsID0gY2FyZC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcbiAgICAgIFwiW2RhdGEtdGVzdGlkPSd0ZXh0LWxvY2F0aW9uJ10sIC5jb21wYW55TG9jYXRpb25cIlxuICAgICk7XG4gICAgY29uc3QgbG9jYXRpb24gPSBsb2NFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBcIlJlbW90ZVwiO1xuXG4gICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IGxpbmtFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MQW5jaG9yRWxlbWVudD4oXCJhLmpjcy1Kb2JUaXRsZSwgaDIuam9iVGl0bGUgYSwgYVtkYXRhLWprXVwiKTtcbiAgICBpZiAobGlua0VsPy5ocmVmKSB7XG4gICAgICB1cmwgPSBsaW5rRWwuaHJlZjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgamsgPSBjYXJkLmdldEF0dHJpYnV0ZShcImRhdGEtamtcIikgfHwgY2FyZC5jbG9zZXN0KFwiW2RhdGEtamtdXCIpPy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWprXCIpO1xuICAgICAgaWYgKGprKSB7XG4gICAgICAgIHVybCA9IGBodHRwczovL3d3dy5pbmRlZWQuY29tL3ZpZXdqb2I/ams9JHtqa31gO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNuaXBwZXRFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIuam9iLXNuaXBwZXQsIHRhYmxlLmpvYkNhcmRTaGVsZkNvbnRhaW5lciwgZGl2LnVuZGVyU2hlbGZGb290ZXJcIik7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBzbmlwcGV0RWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgYCR7dGl0bGV9IGF0ICR7Y29tcGFueX0gKCR7bG9jYXRpb259KWA7XG5cbiAgICBjb25zdCB0YXJnZXRDb250YWluZXIgPVxuICAgICAgY2FyZC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5qb2JzZWFyY2gtSm9iSW5mb0hlYWRlci1hY3Rpb25zLCAudW5kZXJTaGVsZkZvb3RlciwgLnJlc3VsdENvbnRlbnQsIC5zbGlkZXJfY29udGFpbmVyXCIpIHx8XG4gICAgICBjYXJkO1xuXG4gICAgY29uc3QgYnRuID0gY3JlYXRlSW1wb3J0QnV0dG9uKHtcbiAgICAgIHRpdGxlLFxuICAgICAgY29tcGFueSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdXJsLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBub3RlczogYEltcG9ydGVkIGZyb20gSW5kZWVkIHNlYXJjaDogJHt0aXRsZX0gYXQgJHtjb21wYW55fWAsXG4gICAgfSk7XG5cbiAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfSk7XG5cbiAgLy8gMi4gRnVsbCBKb2IgVmlldyBIZWFkZXIgKFNpZGUgUGFuZWwgb3IgRGV0YWlsIFZpZXcpXG4gIGNvbnN0IGRldGFpbEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgIFwiI2pvYnNlYXJjaC1WaWV3am9iUGFuZVdyYXBwZXIsIC5qb2JzZWFyY2gtSm9iSW5mb0hlYWRlci1hY3Rpb25zLCAuam9ic2VhcmNoLVZpZXdKb2JMYXlvdXQsIC5qb2JzZWFyY2gtSm9iQ29tcG9uZW50XCJcbiAgKTtcbiAgaWYgKGRldGFpbEhlYWRlciAmJiAhZGV0YWlsSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIudmVjdGFpLWRldGFpbC1pbXBvcnQtYnRuXCIpKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IGdldEluZGVlZEpvYkRldGFpbHMoKTtcbiAgICBpZiAoZGV0YWlscy50aXRsZSAmJiBkZXRhaWxzLnRpdGxlICE9PSBcIlVudGl0bGVkIFBvc2l0aW9uXCIpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUltcG9ydEJ1dHRvbihcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICAgIGNvbXBhbnk6IGRldGFpbHMuY29tcGFueSB8fCBcIkluZGVlZCBMaXN0aW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRldGFpbHMuZGVzY3JpcHRpb24gfHwgZGV0YWlscy50aXRsZSxcbiAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgIGxvY2F0aW9uOiBkZXRhaWxzLmxvY2F0aW9uIHx8IFwiUmVtb3RlXCIsXG4gICAgICAgICAgbm90ZXM6IGBJbXBvcnRlZCBmcm9tIEluZGVlZCBqb2IgZGV0YWlsIHZpZXdgLFxuICAgICAgICB9LFxuICAgICAgICBcInZlY3RhaS1kZXRhaWwtaW1wb3J0LWJ0blwiXG4gICAgICApO1xuXG4gICAgICBjb25zdCBhY3Rpb25zUm93ID0gZGV0YWlsSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuam9ic2VhcmNoLUpvYkluZm9IZWFkZXItYWN0aW9uc1wiKSB8fCBkZXRhaWxIZWFkZXI7XG4gICAgICBhY3Rpb25zUm93LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgfVxuICB9XG59XG5cbi8qKiBJbml0aWFsaXplIE9ic2VydmVyIGZvciBkeW5hbWljIHNjcm9sbGluZyBvbiBJbmRlZWQgKi9cbmZ1bmN0aW9uIGluaXRJbmRlZWRPYnNlcnZlcigpOiB2b2lkIHtcbiAgaW5qZWN0SW5kZWVkSW1wb3J0QnV0dG9ucygpO1xuXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGluamVjdEluZGVlZEltcG9ydEJ1dHRvbnMoKTtcbiAgfSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdEluZGVlZE9ic2VydmVyKTtcbn0gZWxzZSB7XG4gIGluaXRJbmRlZWRPYnNlcnZlcigpO1xufVxuXG4vLyBTZXR1cCBBVFMgZm9ybSBmaWxsaW5nICYgZGV0YWlsIHJldHJpZXZhbCBtZXNzYWdlIGxpc3RlbmVyXG5zZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIoXG4gIHtcbiAgICBmaWVsZFNlbGVjdG9yczogW1xuICAgICAgXCJpbnB1dDpub3QoW3R5cGU9J2hpZGRlbiddKTpub3QoW3R5cGU9J3N1Ym1pdCddKTpub3QoW3R5cGU9J2J1dHRvbiddKVwiLFxuICAgICAgXCJ0ZXh0YXJlYVwiLFxuICAgICAgXCJzZWxlY3RcIixcbiAgICBdLFxuICAgIGV4Y2x1ZGVkU2VsZWN0b3JzOiBbXG4gICAgICBcIi5oaWRkZW5cIixcbiAgICAgIFwiW3N0eWxlKj0nZGlzcGxheTogbm9uZSddXCIsXG4gICAgICBcIi5pY2wtVGV4dElucHV0LWNvbnRyb2xcIixcbiAgICAgIFwiW3R5cGU9J2ZpbGUnXVwiLFxuICAgIF0sXG4gIH0sXG4gIGdldEluZGVlZEpvYkRldGFpbHMsXG4pO1xuXG5jb25zb2xlLmxvZyhcIltWZWN0YSBBSV0g8J+UjSBJbmRlZWQgaW4tcGFnZSBkaXNjb3ZlcnkgJiBhdXRvZmlsbCBjb250ZW50IHNjcmlwdCBsb2FkZWRcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxJQUFNLFVBQUEsd0JBQW9FLFFBQVEsUUFBUSxFQUFFOztBQVk1RixTQUFTLHNCQUFzQjtDQUM3QixNQUFNLFVBQVUsc0JBQXNCO0NBQ3RDLE1BQU0sVUFBVSxTQUFTLGNBQ3ZCLHFJQUNGO0NBQ0EsTUFBTSxZQUFZLFNBQVMsY0FDekIsbUhBQ0Y7Q0FDQSxNQUFNLGdCQUFnQixTQUFTLGNBQzdCLGtHQUNGO0NBQ0EsTUFBTSxhQUFhLFNBQVMsY0FDMUIsbUdBQ0Y7Q0FFQSxPQUFPO0VBQ0wsT0FBTyxTQUFTLGFB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