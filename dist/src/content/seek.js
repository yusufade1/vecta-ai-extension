//#region \0content-inline-26.js
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
//#region \0content-inline-11.js
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
//#region src/content/seek.ts
function getSeekJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector("h1[data-automation='job-title'], h1[class*='title'], [data-automation*='title']");
	const companyEl = document.querySelector("[data-automation='advertiser-name'], [data-automation*='company'], [class*='company']");
	const descriptionEl = document.querySelector("[data-automation='jobDescription'] div, [data-automation*='description'], .job-description");
	const locationEl = document.querySelector("[data-automation='jobLocation'], [data-automation*='location'], .job-location");
	return {
		title: titleEl?.textContent?.trim() || details.title,
		company: companyEl?.textContent?.trim() || details.company,
		description: descriptionEl?.textContent?.trim() || details.description,
		location: locationEl?.textContent?.trim() || details.location
	};
}
setupGenericMessageListener({ fieldSelectors: [
	"input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio'])",
	"textarea",
	"select"
] }, getSeekJobDetails);
console.log("[Vecta AI] 🔍 Seek content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vlay5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9zZWVrLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIFNlZWsgQ29udGVudCBTY3JpcHRcblxuICAgSW5qZWN0ZWQgb24gc2Vlay5jb20vKiBwYWdlcy5cbiAgIFVzZXMgZ2VuZXJpYyBBVFMgZmlsbGVyIHdpdGggU2Vlay1zcGVjaWZpY1xuICAgZmllbGQgcGF0dGVybnMgYW5kIGpvYiBkZXRhaWwgZXh0cmFjdGlvbi5cbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuaW1wb3J0IHsgc2V0dXBHZW5lcmljTWVzc2FnZUxpc3RlbmVyLCBnZXRKb2JEZXRhaWxzRnJvbVBhZ2UgfSBmcm9tIFwiLi9nZW5lcmljLWF0c1wiO1xuaW1wb3J0IHsgd2FpdEZvckVsZW1lbnQsIHNsZWVwIH0gZnJvbSBcIi4vZG9tLWhlbHBlcnNcIjtcblxuZnVuY3Rpb24gZ2V0U2Vla0pvYkRldGFpbHMoKSB7XG4gIGNvbnN0IGRldGFpbHMgPSBnZXRKb2JEZXRhaWxzRnJvbVBhZ2UoKTtcbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJoMVtkYXRhLWF1dG9tYXRpb249J2pvYi10aXRsZSddLCBoMVtjbGFzcyo9J3RpdGxlJ10sIFtkYXRhLWF1dG9tYXRpb24qPSd0aXRsZSddXCIsXG4gICk7XG4gIGNvbnN0IGNvbXBhbnlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJbZGF0YS1hdXRvbWF0aW9uPSdhZHZlcnRpc2VyLW5hbWUnXSwgW2RhdGEtYXV0b21hdGlvbio9J2NvbXBhbnknXSwgW2NsYXNzKj0nY29tcGFueSddXCIsXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiW2RhdGEtYXV0b21hdGlvbj0nam9iRGVzY3JpcHRpb24nXSBkaXYsIFtkYXRhLWF1dG9tYXRpb24qPSdkZXNjcmlwdGlvbiddLCAuam9iLWRlc2NyaXB0aW9uXCIsXG4gICk7XG4gIGNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiW2RhdGEtYXV0b21hdGlvbj0nam9iTG9jYXRpb24nXSwgW2RhdGEtYXV0b21hdGlvbio9J2xvY2F0aW9uJ10sIC5qb2ItbG9jYXRpb25cIixcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0aXRsZUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMudGl0bGUsXG4gICAgY29tcGFueTogY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMuY29tcGFueSxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvbkVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IGRldGFpbHMubG9jYXRpb24sXG4gIH07XG59XG5cbnNldHVwR2VuZXJpY01lc3NhZ2VMaXN0ZW5lcihcbiAge1xuICAgIGZpZWxkU2VsZWN0b3JzOiBbXG4gICAgICBcImlucHV0Om5vdChbdHlwZT0naGlkZGVuJ10pOm5vdChbdHlwZT0nc3VibWl0J10pOm5vdChbdHlwZT0nYnV0dG9uJ10pOm5vdChbdHlwZT0nY2hlY2tib3gnXSk6bm90KFt0eXBlPSdyYWRpbyddKVwiLFxuICAgICAgXCJ0ZXh0YXJlYVwiLFxuICAgICAgXCJzZWxlY3RcIixcbiAgICBdLFxuICB9LFxuICBnZXRTZWVrSm9iRGV0YWlscyxcbik7XG5cbmNvbnNvbGUubG9nKFwiW1ZlY3RhIEFJXSDwn5SNIFNlZWsgY29udGVudCBzY3JpcHQgbG9hZGVkXCIpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsU0FBUyxvQkFBb0I7Q0FDM0IsTUFBTSxVQUFVLHNCQUFzQjtDQUN0QyxNQUFNLFVBQVUsU0FBUyxjQUN2QixpRkFDRjtDQUNBLE1BQU0sWUFBWSxTQUFTLGNBQ3pCLHVGQUNGO0NBQ0EsTUFBTSxnQkFBZ0IsU0FBUyxjQUM3Qiw0RkFDRjtDQUNBLE1BQU0sYUFBYSxTQUFTLGNBQzFCLCtFQUNGO0NBRUEsT0FBTztFQUNMLE9BQU8sU0FBUyxhQUFhLEtBQUssS0FBSyxRQUFRO0VBQy9DLFNBQVMsV0FBVyxhQUFhLEtBQUssS0FBSyxRQUFRO0VBQ25ELGFBQWEsZUFBZSxhQUFhLEtBQUssS0FBSyxRQUFRO0VBQzNELFVBQVUsWUFBWSxhQUFhLEtBQUssS0FBSyxRQUFRO0NBQ3ZEO0FBQ0Y7QUFFQSw0QkFDRSxFQUNFLGdCQUFnQjtDQUNkO0NBQ0E7Q0FDQTtBQUNGLEVBQ0YsR0FDQSxpQkFDRjtBQUVBLFFBQVEsSUFBSSwwQ0FBMEMifQ==