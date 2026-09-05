//#region \0content-inline-25.js
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
//#region \0content-inline-10.js
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
//#region src/content/wuzzuf.ts
var API_URL = "http://localhost:8000".replace(/\/+$/, "");
/** Extract job details from Wuzzuf detail page */
function getWuzzufJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector("h1.css-f9dt58, h1[class*='title'], h1, .css-f9dt58");
	const companyEl = document.querySelector("a.css-p3pfdn, a.css-17s97q8, div.css-d7j1kk a, a[href*='/jobs/careers/']");
	const descriptionEl = document.querySelector("section.css-31ggmv, div.css-1t5f0nm, div.css-12y436z, div[class*='description']");
	const locationEl = document.querySelector("span.css-5wys0k, strong.css-9geu3q, span.css-4c4ojb");
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
		location: data.location || "Egypt",
		notes: data.notes || `Discovered from Wuzzuf: ${data.title} at ${data.company}`,
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
		console.error("[Vecta AI] Failed to save Wuzzuf job:", err);
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
/** Scan Wuzzuf page and inject buttons */
function injectWuzzufImportButtons() {
	document.querySelectorAll("div.css-1g09ga1, div.css-pkv5jc, div[class*='job-card'], div[class*='JobCard'], div[class*='search-result']").forEach((card) => {
		if (card.querySelector(".vectai-import-btn")) return;
		const title = card.querySelector("h2.css-m604qf a, h2 a, a.css-o171ko, h2")?.textContent?.trim();
		if (!title) return;
		const company = card.querySelector("a.css-17s97q8, a.css-p3pfdn, div.css-d7j1kk a, span.css-17s97q8")?.textContent?.trim() || "Wuzzuf Employer";
		const location = card.querySelector("span.css-5wys0k, span.css-4c4ojb, span.css-1t5f0nm")?.textContent?.trim() || "Egypt";
		let url = window.location.href;
		const linkEl = card.querySelector("h2 a, a[href*='/jobs/p/']");
		if (linkEl?.href) url = linkEl.href;
		const description = card.querySelector("div.css-y4udm8, div.css-158icaa, div.css-1l1b0i0")?.textContent?.trim() || `${title} at ${company} (${location})`;
		const targetContainer = card.querySelector("div.css-1g9f26i, div.css-158icaa, div.css-y4udm8, div.css-1l1b0i0") || card;
		const btn = createImportButton({
			title,
			company,
			description,
			url,
			location,
			notes: `Imported from Wuzzuf search: ${title} at ${company}`
		});
		targetContainer.appendChild(btn);
	});
	const detailSection = document.querySelector("section.css-31ggmv, div.css-1g9f26i, div.css-1v2v4vd, div.css-158icaa");
	if (detailSection && !detailSection.querySelector(".vectai-detail-import-btn")) {
		const details = getWuzzufJobDetails();
		if (details.title && details.title !== "Untitled Position") {
			const btn = createImportButton({
				title: details.title,
				company: details.company || "Wuzzuf Employer",
				description: details.description || details.title,
				url: window.location.href,
				location: details.location || "Egypt",
				notes: `Imported from Wuzzuf job detail view`
			}, "vectai-detail-import-btn");
			detailSection.appendChild(btn);
		}
	}
}
/** Initialize Observer for dynamic scrolling on Wuzzuf */
function initWuzzufObserver() {
	injectWuzzufImportButtons();
	new MutationObserver(() => {
		injectWuzzufImportButtons();
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initWuzzufObserver);
else initWuzzufObserver();
setupGenericMessageListener({
	fieldSelectors: [
		"input:not([type='hidden']):not([type='submit']):not([type='button'])",
		"textarea",
		"select"
	],
	excludedSelectors: [
		".hidden",
		"[style*='display: none']",
		"[type='file']"
	]
}, getWuzzufJobDetails);
console.log("[Vecta AI] 🔍 Wuzzuf in-page discovery & autofill content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3V6enVmLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3d1enp1Zi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBXdXp6dWYgQ29udGVudCBTY3JpcHRcbiAgIEluamVjdGVkIG9uIHd1enp1Zi5uZXQvKiBwYWdlcy5cbiAgIEZlYXR1cmVzOlxuICAgMS4gSW4tcGFnZSAxLWNsaWNrICdJbXBvcnQgdG8gVmVjdGEnIG9uIGpvYiBzZWFyY2ggY2FyZHMgYW5kIGRldGFpbCB2aWV3LlxuICAgMi4gQXV0b2ZpbGwgYW5kIEFUUyBkZXRlY3RvciBtZXNzYWdlIGhhbmRsaW5nLlxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyBzZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIsIGdldEpvYkRldGFpbHNGcm9tUGFnZSB9IGZyb20gXCIuL2dlbmVyaWMtYXRzXCI7XG5cbmNvbnN0IEFQSV9VUkwgPSAoaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX1VSTCB8fCBcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMFwiKS5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpO1xuXG5pbnRlcmZhY2UgSm9iSW1wb3J0RGF0YSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbXBhbnk6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIG5vdGVzPzogc3RyaW5nO1xufVxuXG4vKiogRXh0cmFjdCBqb2IgZGV0YWlscyBmcm9tIFd1enp1ZiBkZXRhaWwgcGFnZSAqL1xuZnVuY3Rpb24gZ2V0V3V6enVmSm9iRGV0YWlscygpIHtcbiAgY29uc3QgZGV0YWlscyA9IGdldEpvYkRldGFpbHNGcm9tUGFnZSgpO1xuICBjb25zdCB0aXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcImgxLmNzcy1mOWR0NTgsIGgxW2NsYXNzKj0ndGl0bGUnXSwgaDEsIC5jc3MtZjlkdDU4XCJcbiAgKTtcbiAgY29uc3QgY29tcGFueUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcImEuY3NzLXAzcGZkbiwgYS5jc3MtMTdzOTdxOCwgZGl2LmNzcy1kN2oxa2sgYSwgYVtocmVmKj0nL2pvYnMvY2FyZWVycy8nXVwiXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwic2VjdGlvbi5jc3MtMzFnZ212LCBkaXYuY3NzLTF0NWYwbm0sIGRpdi5jc3MtMTJ5NDM2eiwgZGl2W2NsYXNzKj0nZGVzY3JpcHRpb24nXVwiXG4gICk7XG4gIGNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwic3Bhbi5jc3MtNXd5czBrLCBzdHJvbmcuY3NzLTlnZXUzcSwgc3Bhbi5jc3MtNGM0b2piXCJcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0aXRsZUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMudGl0bGUsXG4gICAgY29tcGFueTogY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMuY29tcGFueSxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvbkVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMubG9jYXRpb24sXG4gIH07XG59XG5cbi8qKiBHZXQgQ1NSRiB0b2tlbiBmb3IgYXV0aGVudGljYXRlZCBBUEkgY2FsbHMgKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENzcmZUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZSA9XG4gICAgICAoYXdhaXQgY2hyb21lLmNvb2tpZXM/LmdldCh7IHVybDogQVBJX1VSTCwgbmFtZTogXCJjc3JmdG9rZW5cIiB9KSkgfHxcbiAgICAgIChhd2FpdCBjaHJvbWUuY29va2llcz8uZ2V0KHsgdXJsOiBBUElfVVJMLCBuYW1lOiBcIl9fU2VjdXJlLWNzcmZ0b2tlblwiIH0pKTtcbiAgICByZXR1cm4gY29va2llPy52YWx1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKiogU2VuZCBleHRyYWN0ZWQgam9iIHRvIFZlY3RhIGJhY2tlbmQgKi9cbmFzeW5jIGZ1bmN0aW9uIHNhdmVKb2JUb1ZlY3RhKGRhdGE6IEpvYkltcG9ydERhdGEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgeyB0b2tlbiB9ID0gKGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcInRva2VuXCIpKSBhcyB7IHRva2VuPzogc3RyaW5nIH07XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGF3YWl0IGdldENzcmZUb2tlbigpO1xuXG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH07XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICBoZWFkZXJzW1wiWC1DU1JGVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgIGNvbXBhbnk6IGRhdGEuY29tcGFueSxcbiAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbiB8fCBgJHtkYXRhLnRpdGxlfSBhdCAke2RhdGEuY29tcGFueX1gLFxuICAgIHVybDogZGF0YS51cmwsXG4gICAgbG9jYXRpb246IGRhdGEubG9jYXRpb24gfHwgXCJFZ3lwdFwiLFxuICAgIG5vdGVzOiBkYXRhLm5vdGVzIHx8IGBEaXNjb3ZlcmVkIGZyb20gV3V6enVmOiAke2RhdGEudGl0bGV9IGF0ICR7ZGF0YS5jb21wYW55fWAsXG4gICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfS9hcGkvc2F2ZWQtam9icy9jcmVhdGUtYW5kLXNhdmUvYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL2pvYnMvZGlzY292ZXIvYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVuZ2luZTogXCJtYW51YWxcIixcbiAgICAgICAgbWFudWFsX2pvYl91cmw6IGRhdGEudXJsLFxuICAgICAgICBrZXl3b3JkczogZGF0YS50aXRsZSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiBmYWxsYmFja1Jlcy5vaztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltWZWN0YSBBSV0gRmFpbGVkIHRvIHNhdmUgV3V6enVmIGpvYjpcIiwgZXJyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqIENyZWF0ZSBzdHlsZWQgVmVjdGEgSW1wb3J0IEJ1dHRvbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW1wb3J0QnV0dG9uKGRhdGE6IEpvYkltcG9ydERhdGEsIGV4dHJhQ2xhc3MgPSBcIlwiKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gIGJ0bi5jbGFzc05hbWUgPSBgdmVjdGFpLWltcG9ydC1idG4gJHtleHRyYUNsYXNzfWAudHJpbSgpO1xuICBidG4uaW5uZXJIVE1MID0gYFxuICAgIDxzdmcgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIj48L3BvbHlnb24+XG4gICAgPC9zdmc+XG4gICAgPHNwYW4+SW1wb3J0IHRvIFZlY3RhPC9zcGFuPlxuICBgO1xuXG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJzdHlsZVwiLFxuICAgIFwiZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjVweDtwYWRkaW5nOjRweCAxMHB4O1wiICtcbiAgICBcImJvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMyk7XCIgK1xuICAgIFwiYmFja2dyb3VuZDpyZ2JhKDM3LDk5LDIzNSwwLjA4KTtjb2xvcjojMjU2M2ViO2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjcwMDtcIiArXG4gICAgXCJmb250LWZhbWlseTonUGx1cyBKYWthcnRhIFNhbnMnLC1hcHBsZS1zeXN0ZW0sc3lzdGVtLXVpLHNhbnMtc2VyaWY7XCIgK1xuICAgIFwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luOjRweCAwO3RyYW5zaXRpb246YWxsIDAuMnMgY3ViaWMtYmV6aWVyKDAuMTYsMSwwLjMsMSk7XCIgK1xuICAgIFwid2hpdGUtc3BhY2U6bm93cmFwO2JveC1zaGFkb3c6MCAxcHggMnB4IHJnYmEoMzcsOTksMjM1LDAuMDYpO3VzZXItc2VsZWN0Om5vbmU7XCJcbiAgKTtcblxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDM3LDk5LDIzNSwwLjE1KVwiO1xuICAgIGJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmdiYSgzNyw5OSwyMzUsMC40NSlcIjtcbiAgICBidG4uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKC0xcHgpXCI7XG4gIH0pO1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuICAgIGlmICghYnRuLmRpc2FibGVkKSB7XG4gICAgICBidG4uc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiYSgzNyw5OSwyMzUsMC4wOClcIjtcbiAgICAgIGJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmdiYSgzNyw5OSwyMzUsMC4zKVwiO1xuICAgICAgYnRuLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgwKVwiO1xuICAgIH1cbiAgfSk7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjEyXCIgaGVpZ2h0PVwiMTJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBjbGFzcz1cImFuaW1hdGUtc3BpblwiIHN0eWxlPVwiZmxleC1zaHJpbms6MDtcIj5cbiAgICAgICAgPHBhdGggZD1cIk0yMSAxMmE5IDkgMCAxIDEtNi4yMTktOC41NlwiPjwvcGF0aD5cbiAgICAgIDwvc3ZnPlxuICAgICAgPHNwYW4+SW1wb3J0aW5nLi4uPC9zcGFuPlxuICAgIGA7XG4gICAgYnRuLnN0eWxlLm9wYWNpdHkgPSBcIjAuOFwiO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IHNhdmVKb2JUb1ZlY3RhKGRhdGEpO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxM1wiIGhlaWdodD1cIjEzXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzEwYjk4MVwiIHN0cm9rZS13aWR0aD1cIjIuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0eWxlPVwiZmxleC1zaHJpbms6MDtcIj5cbiAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPVwiMjAgNiA5IDE3IDQgMTJcIj48L3BvbHlsaW5lPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjojMTBiOTgxO1wiPlNhdmVkIHRvIFZlY3RhITwvc3Bhbj5cbiAgICAgIGA7XG4gICAgICBidG4uc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiYSgxNiwxODUsMTI5LDAuMSlcIjtcbiAgICAgIGJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmdiYSgxNiwxODUsMTI5LDAuMylcIjtcbiAgICAgIGJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgYnRuLmlubmVySFRNTCA9IGA8c3Bhbj5JbXBvcnQgRmFpbGVkPC9zcGFuPmA7XG4gICAgICBidG4uc3R5bGUuY29sb3IgPSBcIiNlZjQ0NDRcIjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMi41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3R5bGU9XCJmbGV4LXNocmluazowO1wiPlxuICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcIj48L3BvbHlnb24+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPHNwYW4+SW1wb3J0IHRvIFZlY3RhPC9zcGFuPlxuICAgICAgICBgO1xuICAgICAgICBidG4uc3R5bGUuY29sb3IgPSBcIiMyNTYzZWJcIjtcbiAgICAgIH0sIDI1MDApO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGJ0bjtcbn1cblxuLyoqIFNjYW4gV3V6enVmIHBhZ2UgYW5kIGluamVjdCBidXR0b25zICovXG5mdW5jdGlvbiBpbmplY3RXdXp6dWZJbXBvcnRCdXR0b25zKCk6IHZvaWQge1xuICAvLyAxLiBTZWFyY2ggUmVzdWx0IENhcmRzXG4gIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXG4gICAgXCJkaXYuY3NzLTFnMDlnYTEsIGRpdi5jc3MtcGt2NWpjLCBkaXZbY2xhc3MqPSdqb2ItY2FyZCddLCBkaXZbY2xhc3MqPSdKb2JDYXJkJ10sIGRpdltjbGFzcyo9J3NlYXJjaC1yZXN1bHQnXVwiXG4gICk7XG5cbiAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgIGlmIChjYXJkLnF1ZXJ5U2VsZWN0b3IoXCIudmVjdGFpLWltcG9ydC1idG5cIikpIHJldHVybjtcblxuICAgIGNvbnN0IHRpdGxlRWwgPSBjYXJkLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgXCJoMi5jc3MtbTYwNHFmIGEsIGgyIGEsIGEuY3NzLW8xNzFrbywgaDJcIlxuICAgICk7XG4gICAgY29uc3QgdGl0bGUgPSB0aXRsZUVsPy50ZXh0Q29udGVudD8udHJpbSgpO1xuICAgIGlmICghdGl0bGUpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbXBhbnlFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgICBcImEuY3NzLTE3czk3cTgsIGEuY3NzLXAzcGZkbiwgZGl2LmNzcy1kN2oxa2sgYSwgc3Bhbi5jc3MtMTdzOTdxOFwiXG4gICAgKTtcbiAgICBjb25zdCBjb21wYW55ID0gY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiV3V6enVmIEVtcGxveWVyXCI7XG5cbiAgICBjb25zdCBsb2NFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgICBcInNwYW4uY3NzLTV3eXMwaywgc3Bhbi5jc3MtNGM0b2piLCBzcGFuLmNzcy0xdDVmMG5tXCJcbiAgICApO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgXCJFZ3lwdFwiO1xuXG4gICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IGxpbmtFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MQW5jaG9yRWxlbWVudD4oXCJoMiBhLCBhW2hyZWYqPScvam9icy9wLyddXCIpO1xuICAgIGlmIChsaW5rRWw/LmhyZWYpIHtcbiAgICAgIHVybCA9IGxpbmtFbC5ocmVmO1xuICAgIH1cblxuICAgIGNvbnN0IGRlc2NFbCA9IGNhcmQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCJkaXYuY3NzLXk0dWRtOCwgZGl2LmNzcy0xNThpY2FhLCBkaXYuY3NzLTFsMWIwaTBcIik7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkZXNjRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgYCR7dGl0bGV9IGF0ICR7Y29tcGFueX0gKCR7bG9jYXRpb259KWA7XG5cbiAgICBjb25zdCB0YXJnZXRDb250YWluZXIgPVxuICAgICAgY2FyZC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcImRpdi5jc3MtMWc5ZjI2aSwgZGl2LmNzcy0xNThpY2FhLCBkaXYuY3NzLXk0dWRtOCwgZGl2LmNzcy0xbDFiMGkwXCIpIHx8XG4gICAgICBjYXJkO1xuXG4gICAgY29uc3QgYnRuID0gY3JlYXRlSW1wb3J0QnV0dG9uKHtcbiAgICAgIHRpdGxlLFxuICAgICAgY29tcGFueSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdXJsLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBub3RlczogYEltcG9ydGVkIGZyb20gV3V6enVmIHNlYXJjaDogJHt0aXRsZX0gYXQgJHtjb21wYW55fWAsXG4gICAgfSk7XG5cbiAgICB0YXJnZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfSk7XG5cbiAgLy8gMi4gSm9iIERldGFpbCBQYWdlIFRvcCBTZWN0aW9uXG4gIGNvbnN0IGRldGFpbFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcbiAgICBcInNlY3Rpb24uY3NzLTMxZ2dtdiwgZGl2LmNzcy0xZzlmMjZpLCBkaXYuY3NzLTF2MnY0dmQsIGRpdi5jc3MtMTU4aWNhYVwiXG4gICk7XG4gIGlmIChkZXRhaWxTZWN0aW9uICYmICFkZXRhaWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIudmVjdGFpLWRldGFpbC1pbXBvcnQtYnRuXCIpKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IGdldFd1enp1ZkpvYkRldGFpbHMoKTtcbiAgICBpZiAoZGV0YWlscy50aXRsZSAmJiBkZXRhaWxzLnRpdGxlICE9PSBcIlVudGl0bGVkIFBvc2l0aW9uXCIpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGNyZWF0ZUltcG9ydEJ1dHRvbihcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICAgIGNvbXBhbnk6IGRldGFpbHMuY29tcGFueSB8fCBcIld1enp1ZiBFbXBsb3llclwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXRhaWxzLmRlc2NyaXB0aW9uIHx8IGRldGFpbHMudGl0bGUsXG4gICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICBsb2NhdGlvbjogZGV0YWlscy5sb2NhdGlvbiB8fCBcIkVneXB0XCIsXG4gICAgICAgICAgbm90ZXM6IGBJbXBvcnRlZCBmcm9tIFd1enp1ZiBqb2IgZGV0YWlsIHZpZXdgLFxuICAgICAgICB9LFxuICAgICAgICBcInZlY3RhaS1kZXRhaWwtaW1wb3J0LWJ0blwiXG4gICAgICApO1xuXG4gICAgICBkZXRhaWxTZWN0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgfVxuICB9XG59XG5cbi8qKiBJbml0aWFsaXplIE9ic2VydmVyIGZvciBkeW5hbWljIHNjcm9sbGluZyBvbiBXdXp6dWYgKi9cbmZ1bmN0aW9uIGluaXRXdXp6dWZPYnNlcnZlcigpOiB2b2lkIHtcbiAgaW5qZWN0V3V6enVmSW1wb3J0QnV0dG9ucygpO1xuXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGluamVjdFd1enp1ZkltcG9ydEJ1dHRvbnMoKTtcbiAgfSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH0pO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdFd1enp1Zk9ic2VydmVyKTtcbn0gZWxzZSB7XG4gIGluaXRXdXp6dWZPYnNlcnZlcigpO1xufVxuXG4vLyBTZXR1cCBBVFMgZm9ybSBmaWxsaW5nICYgZGV0YWlsIHJldHJpZXZhbCBtZXNzYWdlIGxpc3RlbmVyXG5zZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIoXG4gIHtcbiAgICBmaWVsZFNlbGVjdG9yczogW1xuICAgICAgXCJpbnB1dDpub3QoW3R5cGU9J2hpZGRlbiddKTpub3QoW3R5cGU9J3N1Ym1pdCddKTpub3QoW3R5cGU9J2J1dHRvbiddKVwiLFxuICAgICAgXCJ0ZXh0YXJlYVwiLFxuICAgICAgXCJzZWxlY3RcIixcbiAgICBdLFxuICAgIGV4Y2x1ZGVkU2VsZWN0b3JzOiBbXG4gICAgICBcIi5oaWRkZW5cIixcbiAgICAgIFwiW3N0eWxlKj0nZGlzcGxheTogbm9uZSddXCIsXG4gICAgICBcIlt0eXBlPSdmaWxlJ11cIixcbiAgICBdLFxuICB9LFxuICBnZXRXdXp6dWZKb2JEZXRhaWxzLFxuKTtcblxuY29uc29sZS5sb2coXCJbVmVjdGEgQUldIPCflI0gV3V6enVmIGluLXBhZ2UgZGlzY292ZXJ5ICYgYXV0b2ZpbGwgY29udGVudCBzY3JpcHQgbG9hZGVkXCIpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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