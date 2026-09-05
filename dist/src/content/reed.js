//#region \0content-inline-23.js
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
//#region \0content-inline-7.js
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
//#region src/content/reed.ts
function getReedJobDetails() {
	const details = getJobDetailsFromPage();
	const titleEl = document.querySelector("h1.job-header__title, .job-title h1, [data-qa='job-title'], h1");
	const companyEl = document.querySelector(".job-header__employer, [data-qa='employer-name'], .employer-name a, .company-name");
	const descriptionEl = document.querySelector("#jobDescription, .job-description, [data-qa='job-description'], article");
	const locationEl = document.querySelector(".job-header__location, [data-qa='job-location'], .location, .job-location");
	return {
		title: titleEl?.textContent?.trim() || details.title,
		company: companyEl?.textContent?.trim() || details.company,
		description: descriptionEl?.textContent?.trim() || details.description,
		location: locationEl?.textContent?.trim() || details.location
	};
}
setupGenericMessageListener({
	fieldSelectors: [
		"input[name=\"firstName\"], input[id*=\"firstName\"], input[placeholder*=\"First\"], #firstname",
		"input[name=\"lastName\"], input[id*=\"lastName\"], input[placeholder*=\"Last\"], #lastname",
		"input[type=\"email\"], input[name=\"email\"], #email",
		"input[type=\"tel\"], input[name=\"phone\"], input[name=\"telephone\"], #phone",
		"input[name=\"location\"], input[name=\"city\"], input[placeholder*=\"Location\"], #location",
		"input[type=\"file\"][name*=\"cv\"], input[type=\"file\"][name*=\"resume\"], input[type=\"file\"][id*=\"cv\"], input[type=\"file\"]",
		"textarea",
		"select"
	],
	excludedSelectors: [".hidden", "[style*='display: none']"]
}, getReedJobDetails);
console.log("[Vecta AI] 🇬🇧 Reed content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVlZC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9yZWVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIFJlZWQgQ29udGVudCBTY3JpcHRcblxuICAgSW5qZWN0ZWQgb24gcmVlZC5jby51ay8qIHBhZ2VzLlxuICAgVXNlcyB0aGUgZ2VuZXJpYyBBVFMgZmlsbGVyIHdpdGggUmVlZC1zcGVjaWZpY1xuICAgZmllbGQgcGF0dGVybnMgYW5kIGpvYiBkZXRhaWwgZXh0cmFjdGlvbi5cbiAgIE1pcnJvcnMgdGhlIGJhY2tlbmQgUmVlZENvU3RyYXRlZ3kgKHJlZWRjby5weSk6XG4gICBpbi1SZWVkIHF1aWNrLWFwcGx5IGZvcm0gKG5hbWUsIGVtYWlsLCBwaG9uZSxcbiAgIGxvY2F0aW9uLCBDViB1cGxvYWQsIHNjcmVlbmluZyBxdWVzdGlvbnMpLlxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyBzZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIsIGdldEpvYkRldGFpbHNGcm9tUGFnZSB9IGZyb20gXCIuL2dlbmVyaWMtYXRzXCI7XG5cbmZ1bmN0aW9uIGdldFJlZWRKb2JEZXRhaWxzKCkge1xuICBjb25zdCBkZXRhaWxzID0gZ2V0Sm9iRGV0YWlsc0Zyb21QYWdlKCk7XG5cbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJoMS5qb2ItaGVhZGVyX190aXRsZSwgLmpvYi10aXRsZSBoMSwgW2RhdGEtcWE9J2pvYi10aXRsZSddLCBoMVwiLFxuICApO1xuICBjb25zdCBjb21wYW55RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLmpvYi1oZWFkZXJfX2VtcGxveWVyLCBbZGF0YS1xYT0nZW1wbG95ZXItbmFtZSddLCAuZW1wbG95ZXItbmFtZSBhLCAuY29tcGFueS1uYW1lXCIsXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI2pvYkRlc2NyaXB0aW9uLCAuam9iLWRlc2NyaXB0aW9uLCBbZGF0YS1xYT0nam9iLWRlc2NyaXB0aW9uJ10sIGFydGljbGVcIixcbiAgKTtcbiAgY29uc3QgbG9jYXRpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuam9iLWhlYWRlcl9fbG9jYXRpb24sIFtkYXRhLXFhPSdqb2ItbG9jYXRpb24nXSwgLmxvY2F0aW9uLCAuam9iLWxvY2F0aW9uXCIsXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGl0bGVFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLnRpdGxlLFxuICAgIGNvbXBhbnk6IGNvbXBhbnlFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmNvbXBhbnksXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICBsb2NhdGlvbjogbG9jYXRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkZXRhaWxzLmxvY2F0aW9uLFxuICB9O1xufVxuXG5zZXR1cEdlbmVyaWNNZXNzYWdlTGlzdGVuZXIoXG4gIHtcbiAgICAvLyBSZWVkLXNwZWNpZmljIGZpZWxkIHNlbGVjdG9ycyAobWlycm9ycyByZWVkY28ucHkgU0VMRUNUT1JTKSBzbyB0aGVcbiAgICAvLyBnZW5lcmljIHNjYW5uZXIgdGFyZ2V0cyB0aGUgcmlnaHQgaW5wdXRzIGZpcnN0LCB0aGVuIGZhbGxzIGJhY2sgdG9cbiAgICAvLyBsYWJlbC1iYXNlZCBtYXRjaGluZyBmb3IgYW55IHNjcmVlbmluZyBxdWVzdGlvbnMuXG4gICAgZmllbGRTZWxlY3RvcnM6IFtcbiAgICAgICdpbnB1dFtuYW1lPVwiZmlyc3ROYW1lXCJdLCBpbnB1dFtpZCo9XCJmaXJzdE5hbWVcIl0sIGlucHV0W3BsYWNlaG9sZGVyKj1cIkZpcnN0XCJdLCAjZmlyc3RuYW1lJyxcbiAgICAgICdpbnB1dFtuYW1lPVwibGFzdE5hbWVcIl0sIGlucHV0W2lkKj1cImxhc3ROYW1lXCJdLCBpbnB1dFtwbGFjZWhvbGRlcio9XCJMYXN0XCJdLCAjbGFzdG5hbWUnLFxuICAgICAgJ2lucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbbmFtZT1cImVtYWlsXCJdLCAjZW1haWwnLFxuICAgICAgJ2lucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W25hbWU9XCJwaG9uZVwiXSwgaW5wdXRbbmFtZT1cInRlbGVwaG9uZVwiXSwgI3Bob25lJyxcbiAgICAgICdpbnB1dFtuYW1lPVwibG9jYXRpb25cIl0sIGlucHV0W25hbWU9XCJjaXR5XCJdLCBpbnB1dFtwbGFjZWhvbGRlcio9XCJMb2NhdGlvblwiXSwgI2xvY2F0aW9uJyxcbiAgICAgICdpbnB1dFt0eXBlPVwiZmlsZVwiXVtuYW1lKj1cImN2XCJdLCBpbnB1dFt0eXBlPVwiZmlsZVwiXVtuYW1lKj1cInJlc3VtZVwiXSwgaW5wdXRbdHlwZT1cImZpbGVcIl1baWQqPVwiY3ZcIl0sIGlucHV0W3R5cGU9XCJmaWxlXCJdJyxcbiAgICAgIFwidGV4dGFyZWFcIixcbiAgICAgIFwic2VsZWN0XCIsXG4gICAgXSxcbiAgICBleGNsdWRlZFNlbGVjdG9yczogW1wiLmhpZGRlblwiLCBcIltzdHlsZSo9J2Rpc3BsYXk6IG5vbmUnXVwiXSxcbiAgfSxcbiAgZ2V0UmVlZEpvYkRldGFpbHMsXG4pO1xuXG5jb25zb2xlLmxvZyhcIltWZWN0YSBBSV0g8J+HrPCfh6cgUmVlZCBjb250ZW50IHNjcmlwdCBsb2FkZWRcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxTQUFTLG9CQUFvQjtDQUMzQixNQUFNLFVBQVUsc0JBQXNCO0NBRXRDLE1BQU0sVUFBVSxTQUFTLGNBQ3ZCLGdFQUNGO0NBQ0EsTUFBTSxZQUFZLFNBQVMsY0FDekIsbUZBQ0Y7Q0FDQSxNQUFNLGdCQUFnQixTQUFTLGNBQzdCLHlFQUNGO0NBQ0EsTUFBTSxhQUFhLFNBQVMsY0FDMUIsMkVBQ0Y7Q0FFQSxPQUFPO0VBQ0wsT0FBTyxTQUFTLGFBQWEsS0FBSyxLQUFLLFFBQVE7RUFDL0MsU0FBUyxXQUFXLGFBQWEsS0FBSyxLQUFLLFFBQVE7RUFDbkQsYUFBYSxlQUFlLGFBQWEsS0FBSyxLQUFLLFFBQVE7RUFDM0QsVUFBVSxZQUFZLGFBQWEsS0FBSyxLQUFLLFFBQVE7Q0FDdkQ7QUFDRjtBQUVBLDRCQUNFO0NBSUUsZ0JBQWdCO0VBQ2Q7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtDQUNGO0NBQ0EsbUJBQW1CLENBQUMsV0FBVywwQkFBMEI7QUFDM0QsR0FDQSxpQkFDRjtBQUVBLFFBQVEsSUFBSSw0Q0FBNEMifQ==