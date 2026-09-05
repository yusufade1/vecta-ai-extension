//#region \0content-inline-27.js
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
//#region \0content-inline-12.js
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
//#region src/content/ziprecruiter.ts
var API_URL = "http://localhost:8000".replace(/\/+$/, "");
/** Extract job details from ZipRecruiter detail page/pane */
function getZipRecruiterJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector("h1[data-testid='job-title'], h1[class*='title'], h2 a, a[data-testid='job-title'], a.job_link, a[class*='title'], .job_title, h1, h2");
	const companyEl = document.querySelector("a[data-testid='job-company'], span[data-testid='job-company'], span[class*='company'], a[class*='company'], .company_name, [class*='company']");
	const descriptionEl = document.querySelector("div[data-testid='job-description'], div.jobDescriptionSection, div[class*='job_description'], div[class*='description'], #job_description, .job_body");
	const locationEl = document.querySelector("span[data-testid='job-location'], span[class*='location'], span[class*='region'], .job_location, [class*='location']");
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
		notes: data.notes || `Discovered from ZipRecruiter: ${data.title} at ${data.company}`,
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
		console.error("[Vecta AI] Failed to save ZipRecruiter job:", err);
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
	btn.setAttribute("style", "display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:10px;border:1px solid rgba(242,108,108,0.3);background:rgba(242,108,108,0.08);color:#e04848;font-size:11px;font-weight:700;font-family:'Plus Jakarta Sans',-apple-system,system-ui,sans-serif;cursor:pointer;margin:4px 0;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);white-space:nowrap;box-shadow:0 1px 2px rgba(242,108,108,0.06);user-select:none;");
	btn.addEventListener("mouseenter", () => {
		btn.style.background = "rgba(242,108,108,0.15)";
		btn.style.borderColor = "rgba(242,108,108,0.45)";
		btn.style.transform = "translateY(-1px)";
	});
	btn.addEventListener("mouseleave", () => {
		if (!btn.disabled) {
			btn.style.background = "rgba(242,108,108,0.08)";
			btn.style.borderColor = "rgba(242,108,108,0.3)";
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
				btn.style.color = "#e04848";
			}, 2500);
		}
	});
	return btn;
}
/** Scan ZipRecruiter page and inject buttons */
function injectZipRecruiterImportButtons() {
	document.querySelectorAll("article[data-testid='job-card'], div[data-testid='job-card'], article[class*='job_result'], div.job_result, li.job").forEach((card) => {
		if (card.querySelector(".vectai-import-btn")) return;
		const title = card.querySelector("h2 a, a[data-testid='job-title'], a.job_link, a[class*='title'], h2")?.textContent?.trim();
		if (!title) return;
		const company = card.querySelector("a[data-testid='job-company'], span[data-testid='job-company'], span[class*='company'], a[class*='company'], .company_name")?.textContent?.trim() || "ZipRecruiter Listing";
		const location = card.querySelector("span[data-testid='job-location'], span[class*='location'], span[class*='region'], .job_location")?.textContent?.trim() || "Remote";
		let url = window.location.href;
		const linkEl = card.querySelector("h2 a, a[data-testid='job-title'], a.job_link, a[class*='title'], a[href*='/job/'], a[href*='/jobs/']");
		if (linkEl?.href) url = linkEl.href;
		const description = card.querySelector("div[data-testid='job-description'], div.jobDescriptionSection, div[class*='job_description'], div[class*='description']")?.textContent?.trim() || `${title} at ${company} (${location})`;
		const targetContainer = card.querySelector(".job_actions, [data-testid='job-actions'], [class*='action'], footer") || card;
		const btn = createImportButton({
			title,
			company,
			description,
			url,
			location,
			notes: `Imported from ZipRecruiter search: ${title} at ${company}`
		});
		targetContainer.appendChild(btn);
	});
	const detailHeader = document.querySelector("div[data-testid='job-details'], .job_details, #job_detail_view, .job_header, [class*='job_header']");
	if (detailHeader && !detailHeader.querySelector(".vectai-detail-import-btn")) {
		const details = getZipRecruiterJobDetails();
		if (details.title && details.title !== "Untitled Position") {
			const btn = createImportButton({
				title: details.title,
				company: details.company || "ZipRecruiter Listing",
				description: details.description || details.title,
				url: window.location.href,
				location: details.location || "Remote",
				notes: "Imported from ZipRecruiter job detail view"
			}, "vectai-detail-import-btn");
			(detailHeader.querySelector(".job_actions, [data-testid='job-actions'], [class*='action'], [class*='button_group']") || detailHeader).appendChild(btn);
		}
	}
}
/** Initialize Observer for dynamic scrolling on ZipRecruiter */
function initZipRecruiterObserver() {
	injectZipRecruiterImportButtons();
	new MutationObserver(() => {
		injectZipRecruiterImportButtons();
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initZipRecruiterObserver);
else initZipRecruiterObserver();
setupGenericMessageListener({
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
}, getZipRecruiterJobDetails);
console.log("[Vecta AI] 📋 ZipRecruiter in-page discovery & autofill content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwcmVjcnVpdGVyLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3ppcHJlY3J1aXRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBaaXBSZWNydWl0ZXIgQ29udGVudCBTY3JpcHRcbiAgIEluamVjdGVkIG9uIHppcHJlY3J1aXRlci5jb20vKiBwYWdlcy5cbiAgIEZlYXR1cmVzOlxuICAgMS4gSW4tcGFnZSAxLWNsaWNrICdJbXBvcnQgdG8gVmVjdGEnIG9uIGpvYiBzZWFyY2ggY2FyZHMgYW5kIGRldGFpbCB2aWV3LlxuICAgMi4gQXV0b2ZpbGwgYW5kIEFUUyBkZXRlY3RvciBtZXNzYWdlIGhhbmRsaW5nLlxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyBzZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIsIGdldEpvYkRldGFpbHNGcm9tUGFnZSB9IGZyb20gXCIuL2dlbmVyaWMtYXRzXCI7XG5cbmNvbnN0IEFQSV9VUkwgPSAoaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX1VSTCB8fCBcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMFwiKS5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpO1xuXG5pbnRlcmZhY2UgSm9iSW1wb3J0RGF0YSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbXBhbnk6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIG5vdGVzPzogc3RyaW5nO1xufVxuXG4vKiogRXh0cmFjdCBqb2IgZGV0YWlscyBmcm9tIFppcFJlY3J1aXRlciBkZXRhaWwgcGFnZS9wYW5lICovXG5mdW5jdGlvbiBnZXRaaXBSZWNydWl0ZXJKb2JEZXRhaWxzKCkge1xuICBjb25zdCBkZXRhaWxzID0gZ2V0Sm9iRGV0YWlsc0Zyb21QYWdlKCk7XG4gIGNvbnN0IHRpdGxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiaDFbZGF0YS10ZXN0aWQ9J2pvYi10aXRsZSddLCBoMVtjbGFzcyo9J3RpdGxlJ10sIGgyIGEsIGFbZGF0YS10ZXN0aWQ9J2pvYi10aXRsZSddLCBhLmpvYl9saW5rLCBhW2NsYXNzKj0ndGl0bGUnXSwgLmpvYl90aXRsZSwgaDEsIGgyXCJcbiAgKTtcbiAgY29uc3QgY29tcGFueUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcImFbZGF0YS10ZXN0aWQ9J2pvYi1jb21wYW55J10sIHNwYW5bZGF0YS10ZXN0aWQ9J2pvYi1jb21wYW55J10sIHNwYW5bY2xhc3MqPSdjb21wYW55J10sIGFbY2xhc3MqPSdjb21wYW55J10sIC5jb21wYW55X25hbWUsIFtjbGFzcyo9J2NvbXBhbnknXVwiXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiZGl2W2RhdGEtdGVzdGlkPSdqb2ItZGVzY3JpcHRpb24nXSwgZGl2LmpvYkRlc2NyaXB0aW9uU2VjdGlvbiwgZGl2W2NsYXNzKj0nam9iX2Rlc2NyaXB0aW9uJ10sIGRpdltjbGFzcyo9J2Rlc2NyaXB0aW9uJ10sICNqb2JfZGVzY3JpcHRpb24sIC5qb2JfYm9keVwiXG4gICk7XG4gIGNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwic3BhbltkYXRhLXRlc3RpZD0nam9iLWxvY2F0aW9uJ10sIHNwYW5bY2xhc3MqPSdsb2NhdGlvbiddLCBzcGFuW2NsYXNzKj0ncmVnaW9uJ10sIC5qb2JfbG9jYXRpb24sIFtjbGFzcyo9J2xvY2F0aW9uJ11cIlxuICApO1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHRpdGxlRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZGV0YWlscy50aXRsZSxcbiAgICBjb21wYW55OiBjb21wYW55RWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZGV0YWlscy5jb21wYW55LFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbkVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgbG9jYXRpb246IGxvY2F0aW9uRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZGV0YWlscy5sb2NhdGlvbixcbiAgfTtcbn1cblxuLyoqIEdldCBDU1JGIHRva2VuIGZvciBhdXRoZW50aWNhdGVkIEFQSSBjYWxscyAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q3NyZlRva2VuKCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29va2llID1cbiAgICAgIChhd2FpdCBjaHJvbWUuY29va2llcz8uZ2V0KHsgdXJsOiBBUElfVVJMLCBuYW1lOiBcImNzcmZ0b2tlblwiIH0pKSB8fFxuICAgICAgKGF3YWl0IGNocm9tZS5jb29raWVzPy5nZXQoeyB1cmw6IEFQSV9VUkwsIG5hbWU6IFwiX19TZWN1cmUtY3NyZnRva2VuXCIgfSkpO1xuICAgIHJldHVybiBjb29raWU/LnZhbHVlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKiBTZW5kIGV4dHJhY3RlZCBqb2IgdG8gVmVjdGEgYmFja2VuZCAqL1xuYXN5bmMgZnVuY3Rpb24gc2F2ZUpvYlRvVmVjdGEoZGF0YTogSm9iSW1wb3J0RGF0YSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCB7IHRva2VuIH0gPSAoYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwidG9rZW5cIikpIGFzIHsgdG9rZW4/OiBzdHJpbmcgfTtcbiAgY29uc3QgY3NyZlRva2VuID0gYXdhaXQgZ2V0Q3NyZlRva2VuKCk7XG5cbiAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIGhlYWRlcnNbXCJYLUNTUkZUb2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgY29tcGFueTogZGF0YS5jb21wYW55LFxuICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uIHx8IGAke2RhdGEudGl0bGV9IGF0ICR7ZGF0YS5jb21wYW55fWAsXG4gICAgdXJsOiBkYXRhLnVybCxcbiAgICBsb2NhdGlvbjogZGF0YS5sb2NhdGlvbiB8fCBcIlJlbW90ZVwiLFxuICAgIG5vdGVzOiBkYXRhLm5vdGVzIHx8IGBEaXNjb3ZlcmVkIGZyb20gWmlwUmVjcnVpdGVyOiAke2RhdGEudGl0bGV9IGF0ICR7ZGF0YS5jb21wYW55fWAsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfS9hcGkvc2F2ZWQtam9icy9jcmVhdGUtYW5kLXNhdmUvYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL2pvYnMvZGlzY292ZXIvYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVuZ2luZTogXCJtYW51YWxcIixcbiAgICAgICAgbWFudWFsX2pvYl91cmw6IGRhdGEudXJsLFxuICAgICAgICBrZXl3b3JkczogZGF0YS50aXRsZSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiBmYWxsYmFja1Jlcy5vaztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltWZWN0YSBBSV0gRmFpbGVkIHRvIHNhdmUgWmlwUmVjcnVpdGVyIGpvYjpcIiwgZXJyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqIENyZWF0ZSBzdHlsZWQgVmVjdGEgSW1wb3J0IEJ1dHRvbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW1wb3J0QnV0dG9uKGRhdGE6IEpvYkltcG9ydERhdGEsIGV4dHJhQ2xhc3MgPSBcIlwiKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gIGJ0bi5jbGFzc05hbWUgPSBgdmVjdGFpLWltcG9ydC1idG4gJHtleHRyYUNsYXNzfWAudHJpbSgpO1xuICBidG4uaW5uZXJIVE1MID0gYFxuICAgIDxzdmcgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIj48L3BvbHlnb24+XG4gICAgPC9zdmc+XG4gICAgPHNwYW4+SW1wb3J0IHRvIFZlY3RhPC9zcGFuPlxuICBgO1xuXG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJzdHlsZVwiLFxuICAgIFwiZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjVweDtwYWRkaW5nOjRweCAxMHB4O1wiICtcbiAgICBcImJvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjQyLDEwOCwxMDgsMC4zKTtcIiArXG4gICAgXCJiYWNrZ3JvdW5kOnJnYmEoMjQyLDEwOCwxMDgsMC4wOCk7Y29sb3I6I2UwNDg0ODtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo3MDA7XCIgK1xuICAgIFwiZm9udC1mYW1pbHk6J1BsdXMgSmFrYXJ0YSBTYW5zJywtYXBwbGUtc3lzdGVtLHN5c3RlbS11aSxzYW5zLXNlcmlmO1wiICtcbiAgICBcImN1cnNvcjpwb2ludGVyO21hcmdpbjo0cHggMDt0cmFuc2l0aW9uOmFsbCAwLjJzIGN1YmljLWJlemllcigwLjE2LDEsMC4zLDEpO1wiICtcbiAgICBcIndoaXRlLXNwYWNlOm5vd3JhcDtib3gtc2hhZG93OjAgMXB4IDJweCByZ2JhKDI0MiwxMDgsMTA4LDAuMDYpO3VzZXItc2VsZWN0Om5vbmU7XCJcbiAgKTtcblxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDI0MiwxMDgsMTA4LDAuMTUpXCI7XG4gICAgYnRuLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZ2JhKDI0MiwxMDgsMTA4LDAuNDUpXCI7XG4gICAgYnRuLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgtMXB4KVwiO1xuICB9KTtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICBpZiAoIWJ0bi5kaXNhYmxlZCkge1xuICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoMjQyLDEwOCwxMDgsMC4wOClcIjtcbiAgICAgIGJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmdiYSgyNDIsMTA4LDEwOCwwLjMpXCI7XG4gICAgICBidG4uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfVxuICB9KTtcblxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIGNsYXNzPVwiYW5pbWF0ZS1zcGluXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTIxIDEyYTkgOSAwIDEgMS02LjIxOS04LjU2XCI+PC9wYXRoPlxuICAgICAgPC9zdmc+XG4gICAgICA8c3Bhbj5JbXBvcnRpbmcuLi48L3NwYW4+XG4gICAgYDtcbiAgICBidG4uc3R5bGUub3BhY2l0eSA9IFwiMC44XCI7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgc2F2ZUpvYlRvVmVjdGEoZGF0YSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjMTBiOTgxXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9XCIyMCA2IDkgMTcgNCAxMlwiPjwvcG9seWxpbmU+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiMxMGI5ODE7XCI+U2F2ZWQgdG8gVmVjdGEhPC9zcGFuPlxuICAgICAgYDtcbiAgICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDE2LDE4NSwxMjksMC4xKVwiO1xuICAgICAgYnRuLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZ2JhKDE2LDE4NSwxMjksMC4zKVwiO1xuICAgICAgYnRuLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxzcGFuPkltcG9ydCBGYWlsZWQ8L3NwYW4+YDtcbiAgICAgIGJ0bi5zdHlsZS5jb2xvciA9IFwiI2VmNDQ0NFwiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjEyXCIgaGVpZ2h0PVwiMTJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHlsZT1cImZsZXgtc2hyaW5rOjA7XCI+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiPjwvcG9seWdvbj5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8c3Bhbj5JbXBvcnQgdG8gVmVjdGE8L3NwYW4+XG4gICAgICAgIGA7XG4gICAgICAgIGJ0bi5zdHlsZS5jb2xvciA9IFwiI2UwNDg0OFwiO1xuICAgICAgfSwgMjUwMCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYnRuO1xufVxuXG4vKiogU2NhbiBaaXBSZWNydWl0ZXIgcGFnZSBhbmQgaW5qZWN0IGJ1dHRvbnMgKi9cbmZ1bmN0aW9uIGluamVjdFppcFJlY3J1aXRlckltcG9ydEJ1dHRvbnMoKTogdm9pZCB7XG4gIC8vIDEuIFNlYXJjaCBSZXN1bHQgQ2FyZHNcbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcbiAgICBcImFydGljbGVbZGF0YS10ZXN0aWQ9J2pvYi1jYXJkJ10sIGRpdltkYXRhLXRlc3RpZD0nam9iLWNhcmQnXSwgYXJ0aWNsZVtjbGFzcyo9J2pvYl9yZXN1bHQnXSwgZGl2LmpvYl9yZXN1bHQsIGxpLmpvYlwiXG4gICk7XG5cbiAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgIGlmIChjYXJkLnF1ZXJ5U2VsZWN0b3IoXCIudmVjdGFpLWltcG9ydC1idG5cIikpIHJldHVybjtcblxuICAgIGNvbnN0IHRpdGxlRWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgXCJoMiBhLCBhW2RhdGEtdGVzdGlkPSdqb2ItdGl0bGUnXSwgYS5qb2JfbGluaywgYVtjbGFzcyo9J3RpdGxlJ10sIGgyXCJcbiAgICApO1xuICAgIGNvbnN0IHRpdGxlID0gdGl0bGVFbD8udGV4dENvbnRlbnQ/LnRyaW0oKTtcbiAgICBpZiAoIXRpdGxlKSByZXR1cm47XG5cbiAgICBjb25zdCBjb21wYW55RWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgXCJhW2RhdGEtdGVzdGlkPSdqb2ItY29tcGFueSddLCBzcGFuW2RhdGEtdGVzdGlkPSdqb2ItY29tcGFueSddLCBzcGFuW2NsYXNzKj0nY29tcGFueSddLCBhW2NsYXNzKj0nY29tcGFueSddLCAuY29tcGFueV9uYW1lXCJcbiAgICApO1xuICAgIGNvbnN0IGNvbXBhbnkgPSBjb21wYW55RWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgXCJaaXBSZWNydWl0ZXIgTGlzdGluZ1wiO1xuXG4gICAgY29uc3QgbG9jRWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgXCJzcGFuW2RhdGEtdGVzdGlkPSdqb2ItbG9jYXRpb24nXSwgc3BhbltjbGFzcyo9J2xvY2F0aW9uJ10sIHNwYW5bY2xhc3MqPSdyZWdpb24nXSwgLmpvYl9sb2NhdGlvblwiXG4gICAgKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGxvY0VsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiUmVtb3RlXCI7XG5cbiAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgY29uc3QgbGlua0VsID0gY2FyZC5xdWVyeVNlbGVjdG9yPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgIFwiaDIgYSwgYVtkYXRhLXRlc3RpZD0nam9iLXRpdGxlJ10sIGEuam9iX2xpbmssIGFbY2xhc3MqPSd0aXRsZSddLCBhW2hyZWYqPScvam9iLyddLCBhW2hyZWYqPScvam9icy8nXVwiXG4gICAgKTtcbiAgICBpZiAobGlua0VsPy5ocmVmKSB7XG4gICAgICB1cmwgPSBsaW5rRWwuaHJlZjtcbiAgICB9XG5cbiAgICBjb25zdCBkZXNjRWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgXCJkaXZbZGF0YS10ZXN0aWQ9J2pvYi1kZXNjcmlwdGlvbiddLCBkaXYuam9iRGVzY3JpcHRpb25TZWN0aW9uLCBkaXZbY2xhc3MqPSdqb2JfZGVzY3JpcHRpb24nXSwgZGl2W2NsYXNzKj0nZGVzY3JpcHRpb24nXVwiXG4gICAgKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBgJHt0aXRsZX0gYXQgJHtjb21wYW55fSAoJHtsb2NhdGlvbn0pYDtcblxuICAgIGNvbnN0IHRhcmdldENvbnRhaW5lciA9XG4gICAgICBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmpvYl9hY3Rpb25zLCBbZGF0YS10ZXN0aWQ9J2pvYi1hY3Rpb25zJ10sIFtjbGFzcyo9J2FjdGlvbiddLCBmb290ZXJcIikgfHxcbiAgICAgIGNhcmQ7XG5cbiAgICBjb25zdCBidG4gPSBjcmVhdGVJbXBvcnRCdXR0b24oe1xuICAgICAgdGl0bGUsXG4gICAgICBjb21wYW55LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB1cmwsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG5vdGVzOiBgSW1wb3J0ZWQgZnJvbSBaaXBSZWNydWl0ZXIgc2VhcmNoOiAke3RpdGxlfSBhdCAke2NvbXBhbnl9YCxcbiAgICB9KTtcblxuICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICB9KTtcblxuICAvLyAyLiBGdWxsIEpvYiBWaWV3IEhlYWRlciAoU2lkZSBQYW5lbCBvciBEZXRhaWwgVmlldylcbiAgY29uc3QgZGV0YWlsSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgXCJkaXZbZGF0YS10ZXN0aWQ9J2pvYi1kZXRhaWxzJ10sIC5qb2JfZGV0YWlscywgI2pvYl9kZXRhaWxfdmlldywgLmpvYl9oZWFkZXIsIFtjbGFzcyo9J2pvYl9oZWFkZXInXVwiXG4gICk7XG4gIGlmIChkZXRhaWxIZWFkZXIgJiYgIWRldGFpbEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnZlY3RhaS1kZXRhaWwtaW1wb3J0LWJ0blwiKSkge1xuICAgIGNvbnN0IGRldGFpbHMgPSBnZXRaaXBSZWNydWl0ZXJKb2JEZXRhaWxzKCk7XG4gICAgaWYgKGRldGFpbHMudGl0bGUgJiYgZGV0YWlscy50aXRsZSAhPT0gXCJVbnRpdGxlZCBQb3NpdGlvblwiKSB7XG4gICAgICBjb25zdCBidG4gPSBjcmVhdGVJbXBvcnRCdXR0b24oXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogZGV0YWlscy50aXRsZSxcbiAgICAgICAgICBjb21wYW55OiBkZXRhaWxzLmNvbXBhbnkgfHwgXCJaaXBSZWNydWl0ZXIgTGlzdGluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXRhaWxzLmRlc2NyaXB0aW9uIHx8IGRldGFpbHMudGl0bGUsXG4gICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICBsb2NhdGlvbjogZGV0YWlscy5sb2NhdGlvbiB8fCBcIlJlbW90ZVwiLFxuICAgICAgICAgIG5vdGVzOiBcIkltcG9ydGVkIGZyb20gWmlwUmVjcnVpdGVyIGpvYiBkZXRhaWwgdmlld1wiLFxuICAgICAgICB9LFxuICAgICAgICBcInZlY3RhaS1kZXRhaWwtaW1wb3J0LWJ0blwiXG4gICAgICApO1xuXG4gICAgICBjb25zdCBhY3Rpb25zUm93ID1cbiAgICAgICAgZGV0YWlsSGVhZGVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmpvYl9hY3Rpb25zLCBbZGF0YS10ZXN0aWQ9J2pvYi1hY3Rpb25zJ10sIFtjbGFzcyo9J2FjdGlvbiddLCBbY2xhc3MqPSdidXR0b25fZ3JvdXAnXVwiKSB8fFxuICAgICAgICBkZXRhaWxIZWFkZXI7XG4gICAgICBhY3Rpb25zUm93LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgfVxuICB9XG59XG5cbi8qKiBJbml0aWFsaXplIE9ic2VydmVyIGZvciBkeW5hbWljIHNjcm9sbGluZyBvbiBaaXBSZWNydWl0ZXIgKi9cbmZ1bmN0aW9uIGluaXRaaXBSZWNydWl0ZXJPYnNlcnZlcigpOiB2b2lkIHtcbiAgaW5qZWN0WmlwUmVjcnVpdGVySW1wb3J0QnV0dG9ucygpO1xuXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGluamVjdFppcFJlY3J1aXRlckltcG9ydEJ1dHRvbnMoKTtcbiAgfSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdFppcFJlY3J1aXRlck9ic2VydmVyKTtcbn0gZWxzZSB7XG4gIGluaXRaaXBSZWNydWl0ZXJPYnNlcnZlcigpO1xufVxuXG4vLyBTZXR1cCBBVFMgZm9ybSBmaWxsaW5nICYgZGV0YWlsIHJldHJpZXZhbCBtZXNzYWdlIGxpc3RlbmVyXG5zZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIoXG4gIHtcbiAgICBmaWVsZFNlbGVjdG9yczogW1xuICAgICAgXCJpbnB1dDpub3QoW3R5cGU9J2hpZGRlbiddKTpub3QoW3R5cGU9J3N1Ym1pdCddKTpub3QoW3R5cGU9J2J1dHRvbiddKTpub3QoW3R5cGU9J2NoZWNrYm94J10pOm5vdChbdHlwZT0ncmFkaW8nXSlcIixcbiAgICAgIFwidGV4dGFyZWFcIixcbiAgICAgIFwic2VsZWN0XCIsXG4gICAgXSxcbiAgICBleGNsdWRlZFNlbGVjdG9yczogW1xuICAgICAgXCIuaGlkZGVuXCIsXG4gICAgICBcIltzdHlsZSo9J2Rpc3BsYXk6IG5vbmUnXVwiLFxuICAgICAgXCJbdHlwZT0nZmlsZSddXCIsXG4gICAgXSxcbiAgfSxcbiAgZ2V0WmlwUmVjcnVpdGVySm9iRGV0YWlscyxcbik7XG5cbmNvbnNvbGUubG9nKFwiW1ZlY3RhIEFJXSDwn5OLIFppcFJlY3J1aXRlciBpbi1wYWdlIGRpc2NvdmVyeSAmIGF1dG9maWxsIGNvbnRlbnQgc2NyaXB0IGxvYWRlZFwiKTtcblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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