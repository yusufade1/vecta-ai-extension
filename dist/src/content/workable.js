//#region \0content-inline-18.js
function scrollToElement(element) {
	element.scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
}
function sleep$1(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region \0content-inline-1.js
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
				await sleep$1(50);
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
				await sleep$1(100);
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
//#region \0content-inline-2.js
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region src/content/workable.ts
async function ensureApplyPage() {
	if (!window.location.href.includes("/apply")) {
		const applyBtn = document.querySelector("a[href*=\"/apply\"], button:has-text(\"Apply\"), .job-header-apply a");
		if (applyBtn) {
			applyBtn.click();
			await sleep(1500);
		}
	}
}
function getWorkableJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector(".job-header h1, h1.job-title, .job-details h1");
	const companyEl = document.querySelector(".job-header .company, .company-name, .job-details .company a");
	const descriptionEl = document.querySelector(".job-description, .job-details-content, .job-body");
	const locationEl = document.querySelector(".job-header .location, .job-details .location, .job-location");
	return {
		title: titleEl?.textContent?.trim() || details.title,
		company: companyEl?.textContent?.trim() || details.company,
		description: descriptionEl?.textContent?.trim() || details.description,
		location: locationEl?.textContent?.trim() || details.location
	};
}
ensureApplyPage().then(() => {
	setupGenericMessageListener({ fieldSelectors: [
		"input:not([type='hidden']):not([type='submit']):not([type='button'])",
		"textarea",
		"select"
	] }, getWorkableJobDetails);
});
console.log("[Vecta AI] 🔧 Workable content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2FibGUuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvd29ya2FibGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgV29ya2FibGUgQ29udGVudCBTY3JpcHRcblxuICAgSW5qZWN0ZWQgb24gam9icy53b3JrYWJsZS5jb20vKiBwYWdlcy5cbiAgIFVzZXMgZ2VuZXJpYyBBVFMgZmlsbGVyIHdpdGggV29ya2FibGUtc3BlY2lmaWNcbiAgIGZpZWxkIHBhdHRlcm5zIGFuZCBqb2IgZGV0YWlsIGV4dHJhY3Rpb24uXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCB7IHNldHVwR2VuZXJpY01lc3NhZ2VMaXN0ZW5lciwgZ2V0Sm9iRGV0YWlsc0Zyb21QYWdlIH0gZnJvbSBcIi4vZ2VuZXJpYy1hdHNcIjtcbmltcG9ydCB7IHdhaXRGb3JFbGVtZW50LCBzbGVlcCB9IGZyb20gXCIuL2RvbS1oZWxwZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUFwcGx5UGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCF3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcIi9hcHBseVwiKSkge1xuICAgIGNvbnN0IGFwcGx5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdhW2hyZWYqPVwiL2FwcGx5XCJdLCBidXR0b246aGFzLXRleHQoXCJBcHBseVwiKSwgLmpvYi1oZWFkZXItYXBwbHkgYScsXG4gICAgKTtcbiAgICBpZiAoYXBwbHlCdG4pIHtcbiAgICAgIChhcHBseUJ0biBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcbiAgICAgIGF3YWl0IHNsZWVwKDE1MDApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRXb3JrYWJsZUpvYkRldGFpbHMoKSB7XG4gIGNvbnN0IGRldGFpbHMgPSBnZXRKb2JEZXRhaWxzRnJvbVBhZ2UoKTtcbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuam9iLWhlYWRlciBoMSwgaDEuam9iLXRpdGxlLCAuam9iLWRldGFpbHMgaDFcIik7XG4gIGNvbnN0IGNvbXBhbnlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuam9iLWhlYWRlciAuY29tcGFueSwgLmNvbXBhbnktbmFtZSwgLmpvYi1kZXRhaWxzIC5jb21wYW55IGFcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpvYi1kZXNjcmlwdGlvbiwgLmpvYi1kZXRhaWxzLWNvbnRlbnQsIC5qb2ItYm9keVwiKTtcbiAgY29uc3QgbG9jYXRpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuam9iLWhlYWRlciAubG9jYXRpb24sIC5qb2ItZGV0YWlscyAubG9jYXRpb24sIC5qb2ItbG9jYXRpb25cIik7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGl0bGVFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLnRpdGxlLFxuICAgIGNvbXBhbnk6IGNvbXBhbnlFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmNvbXBhbnksXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICBsb2NhdGlvbjogbG9jYXRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmxvY2F0aW9uLFxuICB9O1xufVxuXG5lbnN1cmVBcHBseVBhZ2UoKS50aGVuKCgpID0+IHtcbiAgc2V0dXBHZW5lcmljTWVzc2FnZUxpc3RlbmVyKFxuICAgIHtcbiAgICAgIGZpZWxkU2VsZWN0b3JzOiBbXG4gICAgICAgIFwiaW5wdXQ6bm90KFt0eXBlPSdoaWRkZW4nXSk6bm90KFt0eXBlPSdzdWJtaXQnXSk6bm90KFt0eXBlPSdidXR0b24nXSlcIixcbiAgICAgICAgXCJ0ZXh0YXJlYVwiLFxuICAgICAgICBcInNlbGVjdFwiLFxuICAgICAgXSxcbiAgICB9LFxuICAgIGdldFdvcmthYmxlSm9iRGV0YWlscyxcbiAgKTtcbn0pO1xuXG5jb25zb2xlLmxvZyhcIltWZWN0YSBBSV0g8J+UpyBXb3JrYWJsZSBjb250ZW50IHNjcmlwdCBsb2FkZWRcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLGVBQWUsa0JBQWlDO0NBQzlDLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxTQUFTLFFBQVEsR0FBRztFQUM1QyxNQUFNLFdBQVcsU0FBUyxjQUN4QixzRUFDRjtFQUNBLElBQUksVUFBVTtHQUNaLFNBQTBCLE1BQU07R0FDaEMsTUFBTSxNQUFNLElBQUk7RUFDbEI7Q0FDRjtBQUNGO0FBRUEsU0FBUyx3QkFBd0I7Q0FDL0IsTUFBTSxVQUFVLHNCQUFzQjtDQUN0QyxNQUFNLFVBQVUsU0FBUyxjQUFjLCtDQUErQztDQUN0RixNQUFNLFlBQVksU0FBUyxjQUFjLDhEQUE4RDtDQUN2RyxNQUFNLGdCQUFnQixTQUFTLGNBQWMsbURBQW1EO0NBQ2hHLE1BQU0sYUFBYSxTQUFTLGNBQWMsOERBQThEO0NBRXhHLE9BQU87RUFDTCxPQUFPLFNBQVMsYUFBYSxLQUFLLEtBQUssUUFBUTtFQUMvQyxTQUFTLFdBQVcsYUFBYSxLQUFLLEtBQUssUUFBUTtFQUNuRCxhQUFhLGVBQWUsYUFBYSxLQUFLLEtBQUssUUFBUTtFQUMzRCxVQUFVLFlBQVksYUFBYSxLQUFLLEtBQUssUUFBUTtDQUN2RDtBQUNGO0FBRUEsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXO0NBQzNCLDRCQUNFLEVBQ0UsZ0JBQWdCO0VBQ2Q7RUFDQTtFQUNBO0NBQ0YsRUFDRixHQUNBLHFCQUNGO0FBQ0YsQ0FBQztBQUVELFFBQVEsSUFBSSw4Q0FBOEMifQ==