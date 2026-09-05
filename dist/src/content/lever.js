//#region \0content-inline-13.js
function waitForElement(selector, timeout = 1e4) {
	return new Promise((resolve, reject) => {
		const existing = document.querySelector(selector);
		if (existing) {
			resolve(existing);
			return;
		}
		const observer = new MutationObserver(() => {
			const el = document.querySelector(selector);
			if (el) {
				observer.disconnect();
				resolve(el);
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		setTimeout(() => {
			observer.disconnect();
			reject(/* @__PURE__ */ new Error(`Element not found: ${selector} (timeout: ${timeout}ms)`));
		}, timeout);
	});
}
function elementExists(selector) {
	return !!document.querySelector(selector);
}
function scrollToElement(element) {
	element.scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
}
function dispatchInputEvents(element, value) {
	const el = element;
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
	const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
	const setter = el instanceof HTMLTextAreaElement ? nativeTextAreaValueSetter : nativeInputValueSetter;
	if (setter) setter.call(el, value);
	else el.value = value;
	el.dispatchEvent(new Event("input", { bubbles: true }));
	el.dispatchEvent(new Event("change", { bubbles: true }));
}
async function fillInput(selector, value, delayMs = 80) {
	const el = await waitForElement(selector);
	scrollToElement(el);
	await sleep(100);
	el.focus();
	el.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
	el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
	dispatchInputEvents(el, "");
	el.style.outline = "2px solid #6366f1";
	el.style.outlineOffset = "2px";
	el.style.transition = "outline 0.2s ease";
	for (let i = 0; i <= value.length; i++) {
		dispatchInputEvents(el, value.slice(0, i));
		if (delayMs > 0 && i < value.length) await sleep(delayMs);
	}
	setTimeout(() => {
		el.style.outline = "";
		el.style.outlineOffset = "";
	}, 500);
	el.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
	el.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
}
async function uploadFile(selector, base64Content, filename = "resume.pdf", mimeType = "application/pdf") {
	const input = await waitForElement(selector);
	try {
		const binaryString = atob(base64Content);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
		const file = new File([bytes], filename, { type: mimeType });
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);
		input.files = dataTransfer.files;
		input.dispatchEvent(new Event("change", { bubbles: true }));
		input.dispatchEvent(new Event("input", { bubbles: true }));
		console.log(`[Vecta AI] Uploaded file: ${filename}`);
	} catch (err) {
		console.error(`[Vecta AI] Failed to decode base64 for ${filename}`, err);
		throw new Error(`Failed to process resume file: ${filename}. The file data may be corrupt.`);
	}
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region src/content/lever.ts
/** Known Lever selectors - ported from lever.py */
var SELECTORS = {
	fullName: "input[name=\"name\"]",
	email: "input[name=\"email\"]",
	phone: "input[name=\"phone\"]",
	currentCompany: "input[name=\"org\"]",
	resumeUpload: ".application-file input[type=\"file\"], input[type=\"file\"]",
	linkedinUrl: "input[name=\"urls[LinkedIn]\"], input[placeholder*=\"LinkedIn\"]",
	websiteUrl: "input[name=\"urls[Portfolio]\"], input[placeholder*=\"Website\"]",
	additionalInfo: "textarea[name=\"comments\"]",
	submitButton: "button[type=\"submit\"], .application-submit button",
	successMessage: ".application-confirmation, .thank-you"
};
/** Field definitions for progress tracking. */
var FIELDS = [
	{
		key: "fullName",
		label: "Full Name",
		required: true
	},
	{
		key: "email",
		label: "Email",
		required: true
	},
	{
		key: "phone",
		label: "Phone",
		required: false
	},
	{
		key: "currentCompany",
		label: "Current Company",
		required: false
	},
	{
		key: "linkedinUrl",
		label: "LinkedIn URL",
		required: false
	},
	{
		key: "websiteUrl",
		label: "Website",
		required: false
	},
	{
		key: "additionalInfo",
		label: "Additional Info",
		required: false
	},
	{
		key: "resumeUpload",
		label: "Resume",
		required: false
	}
];
function resolveFullName(profile) {
	const fromParts = `${profile.personal.firstName || ""} ${profile.personal.lastName || ""}`.trim();
	if (fromParts) return fromParts;
	return (profile.personal.name || "").trim();
}
/**
* Fill a Lever application form.
*/
async function fillLeverForm(profile) {
	const totalFields = FIELDS.length;
	let completed = 0;
	const reportProgress = (field, status, message) => {
		completed++;
		const progress = {
			field,
			status,
			total: totalFields,
			completed,
			message
		};
		chrome.runtime.sendMessage({
			type: "FILL_PROGRESS",
			progress
		});
	};
	console.log("[Vecta AI] 🚀 Starting Lever form fill...");
	try {
		if (!window.location.href.includes("/apply")) {
			const applyBtn = document.querySelector("a.postings-btn[href*=\"/apply\"], .posting-btn-submit a");
			if (applyBtn) {
				applyBtn.click();
				await sleep(1500);
			}
		}
		await waitForElement(SELECTORS.fullName, 5e3);
		await sleep(300);
		const fullName = resolveFullName(profile);
		if (fullName) {
			await fillInput(SELECTORS.fullName, fullName);
			reportProgress("Full Name", "filled");
		} else reportProgress("Full Name", "skipped", "Missing name in profile");
		await sleep(200);
		await fillInput(SELECTORS.email, profile.personal.email);
		reportProgress("Email", "filled");
		await sleep(200);
		if (profile.personal.phone && elementExists(SELECTORS.phone)) {
			await fillInput(SELECTORS.phone, profile.personal.phone);
			reportProgress("Phone", "filled");
		} else reportProgress("Phone", "skipped");
		await sleep(200);
		const currentCompany = profile.experience.length > 0 ? profile.experience[0].company : "";
		if (currentCompany && elementExists(SELECTORS.currentCompany)) {
			await fillInput(SELECTORS.currentCompany, currentCompany);
			reportProgress("Current Company", "filled");
		} else reportProgress("Current Company", "skipped");
		await sleep(200);
		if (profile.personal.linkedinUrl && elementExists(SELECTORS.linkedinUrl)) {
			await fillInput(SELECTORS.linkedinUrl, profile.personal.linkedinUrl);
			reportProgress("LinkedIn URL", "filled");
		} else reportProgress("LinkedIn URL", "skipped");
		await sleep(200);
		if (profile.personal.websiteUrl && elementExists(SELECTORS.websiteUrl)) {
			await fillInput(SELECTORS.websiteUrl, profile.personal.websiteUrl);
			reportProgress("Website", "filled");
		} else reportProgress("Website", "skipped");
		await sleep(200);
		const additionalInfo = profile.answers?.coverLetter || profile.answers?.additionalInfo || "";
		if (additionalInfo && elementExists(SELECTORS.additionalInfo)) {
			await fillInput(SELECTORS.additionalInfo, additionalInfo, 20);
			reportProgress("Additional Info", "filled");
		} else reportProgress("Additional Info", "skipped");
		await sleep(200);
		if (profile.resume?.fileContentBase64 && elementExists(SELECTORS.resumeUpload)) {
			await uploadFile(SELECTORS.resumeUpload, profile.resume.fileContentBase64, profile.resume.filename || "resume.pdf", profile.resume.mimeType || "application/pdf");
			reportProgress("Resume", "filled");
		} else reportProgress("Resume", "skipped");
		if (elementExists(SELECTORS.submitButton)) {
			const submitBtn = document.querySelector(SELECTORS.submitButton);
			if (submitBtn) {
				scrollToElement(submitBtn);
				submitBtn.style.animation = "pulse 1.5s ease-in-out 3";
			}
		}
		chrome.runtime.sendMessage({
			type: "FILL_COMPLETE",
			success: true,
			jobUrl: window.location.href,
			fieldsCompleted: completed
		});
		console.log(`[Vecta AI] ✅ Lever form filled! ${completed}/${totalFields} fields`);
	} catch (err) {
		console.error("[Vecta AI] ❌ Fill error:", err);
		chrome.runtime.sendMessage({
			type: "FILL_ERROR",
			error: err instanceof Error ? err.message : String(err),
			jobUrl: window.location.href
		});
	}
}
function getLeverJobDetails() {
	const titleEl = document.querySelector(".posting-header h2, .posting-header h1");
	const descriptionEl = document.querySelector(".section.page-centered, .posting-page, .posting-content");
	const locationEl = document.querySelector(".posting-header .location, .posting-categories .location");
	let company = "Unknown Company";
	const pageTitle = document.title;
	if (pageTitle.includes(" at ")) company = pageTitle.split(" at ")[1]?.trim();
	else if (pageTitle.includes(" - ")) company = pageTitle.split(" - ")[0]?.trim();
	return {
		title: titleEl?.textContent?.trim() || document.title || "Unknown Title",
		company: company || "Unknown Company",
		description: descriptionEl?.textContent?.trim() || document.body.innerText || "",
		location: locationEl?.textContent?.trim() || ""
	};
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message.type === "PING") {
		sendResponse({ pong: true });
		return true;
	}
	if (message.type === "GET_JOB_DETAILS") {
		sendResponse(getLeverJobDetails());
		return true;
	}
	if (message.type === "START_FILL") {
		console.log("[Vecta AI] Received START_FILL for Lever");
		fillLeverForm(message.profile).then(() => {
			sendResponse({ started: true });
		});
		return true;
	}
});
console.log("[Vecta AI] 🏗️ Lever content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZXIuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvbGV2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgTGV2ZXIgQ29udGVudCBTY3JpcHRcbiAgIFBvcnRlZCBmcm9tIHBhZ2Vfb2JqZWN0cy9sZXZlci5weVxuXG4gICBJbmplY3RlZCBvbiBqb2JzLmxldmVyLmNvLyogcGFnZXMuXG4gICBMaXN0ZW5zIGZvciBTVEFSVF9GSUxMIG1lc3NhZ2VzIGZyb20gdGhlIHBvcHVwXG4gICBhbmQgZmlsbHMgdGhlIGFwcGxpY2F0aW9uIGZvcm0gZmllbGQtYnktZmllbGQuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCB7XG4gIGZpbGxJbnB1dCxcbiAgdXBsb2FkRmlsZSxcbiAgZWxlbWVudEV4aXN0cyxcbiAgd2FpdEZvckVsZW1lbnQsXG4gIHNsZWVwLFxuICBzY3JvbGxUb0VsZW1lbnQsXG59IGZyb20gXCIuL2RvbS1oZWxwZXJzXCI7XG5pbXBvcnQgdHlwZSB7IFVzZXJQcm9maWxlLCBGaWxsUHJvZ3Jlc3NFdmVudCB9IGZyb20gXCIuLi9saWIvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhcnRGaWxsTWVzc2FnZSB9IGZyb20gXCIuLi9saWIvbWVzc2FnaW5nXCI7XG5cbi8qKiBLbm93biBMZXZlciBzZWxlY3RvcnMgLSBwb3J0ZWQgZnJvbSBsZXZlci5weSAqL1xuY29uc3QgU0VMRUNUT1JTID0ge1xuICBmdWxsTmFtZTogJ2lucHV0W25hbWU9XCJuYW1lXCJdJyxcbiAgZW1haWw6ICdpbnB1dFtuYW1lPVwiZW1haWxcIl0nLFxuICBwaG9uZTogJ2lucHV0W25hbWU9XCJwaG9uZVwiXScsXG4gIGN1cnJlbnRDb21wYW55OiAnaW5wdXRbbmFtZT1cIm9yZ1wiXScsXG4gIHJlc3VtZVVwbG9hZDpcbiAgICAnLmFwcGxpY2F0aW9uLWZpbGUgaW5wdXRbdHlwZT1cImZpbGVcIl0sIGlucHV0W3R5cGU9XCJmaWxlXCJdJyxcbiAgbGlua2VkaW5Vcmw6XG4gICAgJ2lucHV0W25hbWU9XCJ1cmxzW0xpbmtlZEluXVwiXSwgaW5wdXRbcGxhY2Vob2xkZXIqPVwiTGlua2VkSW5cIl0nLFxuICB3ZWJzaXRlVXJsOlxuICAgICdpbnB1dFtuYW1lPVwidXJsc1tQb3J0Zm9saW9dXCJdLCBpbnB1dFtwbGFjZWhvbGRlcio9XCJXZWJzaXRlXCJdJyxcbiAgYWRkaXRpb25hbEluZm86ICd0ZXh0YXJlYVtuYW1lPVwiY29tbWVudHNcIl0nLFxuICBzdWJtaXRCdXR0b246XG4gICAgJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdLCAuYXBwbGljYXRpb24tc3VibWl0IGJ1dHRvbicsXG4gIHN1Y2Nlc3NNZXNzYWdlOiBcIi5hcHBsaWNhdGlvbi1jb25maXJtYXRpb24sIC50aGFuay15b3VcIixcbn07XG5cbi8qKiBGaWVsZCBkZWZpbml0aW9ucyBmb3IgcHJvZ3Jlc3MgdHJhY2tpbmcuICovXG5jb25zdCBGSUVMRFMgPSBbXG4gIHsga2V5OiBcImZ1bGxOYW1lXCIsIGxhYmVsOiBcIkZ1bGwgTmFtZVwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJlbWFpbFwiLCBsYWJlbDogXCJFbWFpbFwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJwaG9uZVwiLCBsYWJlbDogXCJQaG9uZVwiLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgeyBrZXk6IFwiY3VycmVudENvbXBhbnlcIiwgbGFiZWw6IFwiQ3VycmVudCBDb21wYW55XCIsIHJlcXVpcmVkOiBmYWxzZSB9LFxuICB7IGtleTogXCJsaW5rZWRpblVybFwiLCBsYWJlbDogXCJMaW5rZWRJbiBVUkxcIiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIHsga2V5OiBcIndlYnNpdGVVcmxcIiwgbGFiZWw6IFwiV2Vic2l0ZVwiLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgeyBrZXk6IFwiYWRkaXRpb25hbEluZm9cIiwgbGFiZWw6IFwiQWRkaXRpb25hbCBJbmZvXCIsIHJlcXVpcmVkOiBmYWxzZSB9LFxuICB7IGtleTogXCJyZXN1bWVVcGxvYWRcIiwgbGFiZWw6IFwiUmVzdW1lXCIsIHJlcXVpcmVkOiBmYWxzZSB9LFxuXSBhcyBjb25zdDtcblxuZnVuY3Rpb24gcmVzb2x2ZUZ1bGxOYW1lKHByb2ZpbGU6IFVzZXJQcm9maWxlKTogc3RyaW5nIHtcbiAgY29uc3QgZnJvbVBhcnRzID0gYCR7cHJvZmlsZS5wZXJzb25hbC5maXJzdE5hbWUgfHwgXCJcIn0gJHtcbiAgICBwcm9maWxlLnBlcnNvbmFsLmxhc3ROYW1lIHx8IFwiXCJcbiAgfWAudHJpbSgpO1xuICBpZiAoZnJvbVBhcnRzKSB7XG4gICAgcmV0dXJuIGZyb21QYXJ0cztcbiAgfVxuICByZXR1cm4gKHByb2ZpbGUucGVyc29uYWwubmFtZSB8fCBcIlwiKS50cmltKCk7XG59XG5cbi8qKlxuICogRmlsbCBhIExldmVyIGFwcGxpY2F0aW9uIGZvcm0uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpbGxMZXZlckZvcm0ocHJvZmlsZTogVXNlclByb2ZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgdG90YWxGaWVsZHMgPSBGSUVMRFMubGVuZ3RoO1xuICBsZXQgY29tcGxldGVkID0gMDtcblxuICBjb25zdCByZXBvcnRQcm9ncmVzcyA9IChcbiAgICBmaWVsZDogc3RyaW5nLFxuICAgIHN0YXR1czogRmlsbFByb2dyZXNzRXZlbnRbXCJzdGF0dXNcIl0sXG4gICAgbWVzc2FnZT86IHN0cmluZ1xuICApID0+IHtcbiAgICBjb21wbGV0ZWQrKztcbiAgICBjb25zdCBwcm9ncmVzczogRmlsbFByb2dyZXNzRXZlbnQgPSB7XG4gICAgICBmaWVsZCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIHRvdGFsOiB0b3RhbEZpZWxkcyxcbiAgICAgIGNvbXBsZXRlZCxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6IFwiRklMTF9QUk9HUkVTU1wiLCBwcm9ncmVzcyB9KTtcbiAgfTtcblxuICBjb25zb2xlLmxvZyhcIltWZWN0YSBBSV0g8J+agCBTdGFydGluZyBMZXZlciBmb3JtIGZpbGwuLi5cIik7XG5cbiAgdHJ5IHtcbiAgICAvLyBMZXZlciBhcHBseSBwYWdlcyBhcmUgYXQgL2FwcGx5IC0gY2hlY2sgaWYgd2UgbmVlZCB0byBuYXZpZ2F0ZVxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBpZiAoIWN1cnJlbnRVcmwuaW5jbHVkZXMoXCIvYXBwbHlcIikpIHtcbiAgICAgIC8vIFRyeSBjbGlja2luZyB0aGUgXCJBcHBseVwiIGJ1dHRvbiB0byBnZXQgdG8gdGhlIGZvcm1cbiAgICAgIGNvbnN0IGFwcGx5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJ2EucG9zdGluZ3MtYnRuW2hyZWYqPVwiL2FwcGx5XCJdLCAucG9zdGluZy1idG4tc3VibWl0IGEnXG4gICAgICApO1xuICAgICAgaWYgKGFwcGx5QnRuKSB7XG4gICAgICAgIChhcHBseUJ0biBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTUwMCk7IC8vIFdhaXQgZm9yIG5hdmlnYXRpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXYWl0IGZvciBmb3JtIHRvIGJlIHJlYWR5XG4gICAgYXdhaXQgd2FpdEZvckVsZW1lbnQoU0VMRUNUT1JTLmZ1bGxOYW1lLCA1MDAwKTtcbiAgICBhd2FpdCBzbGVlcCgzMDApO1xuXG4gICAgLy8gPT09IFJlcXVpcmVkIGZpZWxkcyA9PT1cblxuICAgIC8vIEZ1bGwgTmFtZSAoTGV2ZXIgdXNlcyBjb21iaW5lZCBuYW1lIGZpZWxkKVxuICAgIGNvbnN0IGZ1bGxOYW1lID0gcmVzb2x2ZUZ1bGxOYW1lKHByb2ZpbGUpO1xuICAgIGlmIChmdWxsTmFtZSkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFNFTEVDVE9SUy5mdWxsTmFtZSwgZnVsbE5hbWUpO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJGdWxsIE5hbWVcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiRnVsbCBOYW1lXCIsIFwic2tpcHBlZFwiLCBcIk1pc3NpbmcgbmFtZSBpbiBwcm9maWxlXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBFbWFpbFxuICAgIGF3YWl0IGZpbGxJbnB1dChTRUxFQ1RPUlMuZW1haWwsIHByb2ZpbGUucGVyc29uYWwuZW1haWwpO1xuICAgIHJlcG9ydFByb2dyZXNzKFwiRW1haWxcIiwgXCJmaWxsZWRcIik7XG5cbiAgICBhd2FpdCBzbGVlcCgyMDApO1xuXG4gICAgLy8gPT09IE9wdGlvbmFsIGZpZWxkcyA9PT1cblxuICAgIC8vIFBob25lXG4gICAgaWYgKHByb2ZpbGUucGVyc29uYWwucGhvbmUgJiYgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMucGhvbmUpKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLnBob25lLCBwcm9maWxlLnBlcnNvbmFsLnBob25lKTtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiUGhvbmVcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiUGhvbmVcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBDdXJyZW50IENvbXBhbnlcbiAgICBjb25zdCBjdXJyZW50Q29tcGFueSA9XG4gICAgICBwcm9maWxlLmV4cGVyaWVuY2UubGVuZ3RoID4gMFxuICAgICAgICA/IHByb2ZpbGUuZXhwZXJpZW5jZVswXS5jb21wYW55XG4gICAgICAgIDogXCJcIjtcbiAgICBpZiAoXG4gICAgICBjdXJyZW50Q29tcGFueSAmJlxuICAgICAgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMuY3VycmVudENvbXBhbnkpXG4gICAgKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLmN1cnJlbnRDb21wYW55LCBjdXJyZW50Q29tcGFueSk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkN1cnJlbnQgQ29tcGFueVwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJDdXJyZW50IENvbXBhbnlcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBMaW5rZWRJblxuICAgIGlmIChcbiAgICAgIHByb2ZpbGUucGVyc29uYWwubGlua2VkaW5VcmwgJiZcbiAgICAgIGVsZW1lbnRFeGlzdHMoU0VMRUNUT1JTLmxpbmtlZGluVXJsKVxuICAgICkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFxuICAgICAgICBTRUxFQ1RPUlMubGlua2VkaW5VcmwsXG4gICAgICAgIHByb2ZpbGUucGVyc29uYWwubGlua2VkaW5VcmxcbiAgICAgICk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkxpbmtlZEluIFVSTFwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJMaW5rZWRJbiBVUkxcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBXZWJzaXRlIC8gUG9ydGZvbGlvXG4gICAgaWYgKFxuICAgICAgcHJvZmlsZS5wZXJzb25hbC53ZWJzaXRlVXJsICYmXG4gICAgICBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy53ZWJzaXRlVXJsKVxuICAgICkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFxuICAgICAgICBTRUxFQ1RPUlMud2Vic2l0ZVVybCxcbiAgICAgICAgcHJvZmlsZS5wZXJzb25hbC53ZWJzaXRlVXJsXG4gICAgICApO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJXZWJzaXRlXCIsIFwiZmlsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIldlYnNpdGVcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBBZGRpdGlvbmFsIEluZm8gLyBDb3ZlciBMZXR0ZXJcbiAgICBjb25zdCBhZGRpdGlvbmFsSW5mbyA9XG4gICAgICBwcm9maWxlLmFuc3dlcnM/LmNvdmVyTGV0dGVyIHx8XG4gICAgICBwcm9maWxlLmFuc3dlcnM/LmFkZGl0aW9uYWxJbmZvIHx8XG4gICAgICBcIlwiO1xuICAgIGlmIChcbiAgICAgIGFkZGl0aW9uYWxJbmZvICYmXG4gICAgICBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy5hZGRpdGlvbmFsSW5mbylcbiAgICApIHtcbiAgICAgIGF3YWl0IGZpbGxJbnB1dChTRUxFQ1RPUlMuYWRkaXRpb25hbEluZm8sIGFkZGl0aW9uYWxJbmZvLCAyMCk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkFkZGl0aW9uYWwgSW5mb1wiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJBZGRpdGlvbmFsIEluZm9cIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBSZXN1bWUgVXBsb2FkXG4gICAgaWYgKFxuICAgICAgcHJvZmlsZS5yZXN1bWU/LmZpbGVDb250ZW50QmFzZTY0ICYmXG4gICAgICBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy5yZXN1bWVVcGxvYWQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKFxuICAgICAgICBTRUxFQ1RPUlMucmVzdW1lVXBsb2FkLFxuICAgICAgICBwcm9maWxlLnJlc3VtZS5maWxlQ29udGVudEJhc2U2NCxcbiAgICAgICAgcHJvZmlsZS5yZXN1bWUuZmlsZW5hbWUgfHwgXCJyZXN1bWUucGRmXCIsXG4gICAgICAgIHByb2ZpbGUucmVzdW1lLm1pbWVUeXBlIHx8IFwiYXBwbGljYXRpb24vcGRmXCJcbiAgICAgICk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIlJlc3VtZVwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJSZXN1bWVcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIC8vIFNjcm9sbCBzdWJtaXQgYnV0dG9uIGludG8gdmlldyAoYnV0IERPTidUIGF1dG8tY2xpY2spXG4gICAgaWYgKGVsZW1lbnRFeGlzdHMoU0VMRUNUT1JTLnN1Ym1pdEJ1dHRvbikpIHtcbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLnN1Ym1pdEJ1dHRvbik7XG4gICAgICBpZiAoc3VibWl0QnRuKSB7XG4gICAgICAgIHNjcm9sbFRvRWxlbWVudChzdWJtaXRCdG4pO1xuICAgICAgICAoc3VibWl0QnRuIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5hbmltYXRpb24gPVxuICAgICAgICAgIFwicHVsc2UgMS41cyBlYXNlLWluLW91dCAzXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVwb3J0IHN1Y2Nlc3NcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIkZJTExfQ09NUExFVEVcIixcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBqb2JVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgZmllbGRzQ29tcGxldGVkOiBjb21wbGV0ZWQsXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbVmVjdGEgQUldIOKchSBMZXZlciBmb3JtIGZpbGxlZCEgJHtjb21wbGV0ZWR9LyR7dG90YWxGaWVsZHN9IGZpZWxkc2BcbiAgICApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW1ZlY3RhIEFJXSDinYwgRmlsbCBlcnJvcjpcIiwgZXJyKTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIkZJTExfRVJST1JcIixcbiAgICAgIGVycm9yOiBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVyciksXG4gICAgICBqb2JVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldExldmVySm9iRGV0YWlscygpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0aW5nLWhlYWRlciBoMiwgLnBvc3RpbmctaGVhZGVyIGgxJyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi5wYWdlLWNlbnRlcmVkLCAucG9zdGluZy1wYWdlLCAucG9zdGluZy1jb250ZW50Jyk7XG4gIGNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdGluZy1oZWFkZXIgLmxvY2F0aW9uLCAucG9zdGluZy1jYXRlZ29yaWVzIC5sb2NhdGlvbicpO1xuXG4gIC8vIEZvciBjb21wYW55LCB3ZSBjYW4gZXh0cmFjdCBpdCBmcm9tIHRoZSBwYWdlIHRpdGxlIChlLmcuIFwiR29vZ2xlIC0gU29mdHdhcmUgRW5naW5lZXJcIiBvciBcIlNvZnR3YXJlIEVuZ2luZWVyIGF0IEdvb2dsZVwiKVxuICBsZXQgY29tcGFueSA9IFwiVW5rbm93biBDb21wYW55XCI7XG4gIGNvbnN0IHBhZ2VUaXRsZSA9IGRvY3VtZW50LnRpdGxlO1xuICBpZiAocGFnZVRpdGxlLmluY2x1ZGVzKFwiIGF0IFwiKSkge1xuICAgIGNvbXBhbnkgPSBwYWdlVGl0bGUuc3BsaXQoXCIgYXQgXCIpWzFdPy50cmltKCk7XG4gIH0gZWxzZSBpZiAocGFnZVRpdGxlLmluY2x1ZGVzKFwiIC0gXCIpKSB7XG4gICAgY29tcGFueSA9IHBhZ2VUaXRsZS5zcGxpdChcIiAtIFwiKVswXT8udHJpbSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGl0bGVFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkb2N1bWVudC50aXRsZSB8fCBcIlVua25vd24gVGl0bGVcIixcbiAgICBjb21wYW55OiBjb21wYW55IHx8IFwiVW5rbm93biBDb21wYW55XCIsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZG9jdW1lbnQuYm9keS5pbm5lclRleHQgfHwgXCJcIixcbiAgICBsb2NhdGlvbjogbG9jYXRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBcIlwiLFxuICB9O1xufVxuXG4vKiAtLS0tIE1lc3NhZ2UgTGlzdGVuZXIgLS0tLSAqL1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gIChcbiAgICBtZXNzYWdlOiBTdGFydEZpbGxNZXNzYWdlIHwgeyB0eXBlOiBcIlBJTkdcIiB9IHwgeyB0eXBlOiBcIkdFVF9KT0JfREVUQUlMU1wiIH0sXG4gICAgX3NlbmRlcjogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcixcbiAgICBzZW5kUmVzcG9uc2U6IChyZXNwb25zZT86IHVua25vd24pID0+IHZvaWRcbiAgKSA9PiB7XG4gICAgaWYgKChtZXNzYWdlIGFzIGFueSkudHlwZSA9PT0gXCJQSU5HXCIpIHtcbiAgICAgIHNlbmRSZXNwb25zZSh7IHBvbmc6IHRydWUgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoKG1lc3NhZ2UgYXMgYW55KS50eXBlID09PSBcIkdFVF9KT0JfREVUQUlMU1wiKSB7XG4gICAgICBjb25zdCBkZXRhaWxzID0gZ2V0TGV2ZXJKb2JEZXRhaWxzKCk7XG4gICAgICBzZW5kUmVzcG9uc2UoZGV0YWlscyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS50eXBlID09PSBcIlNUQVJUX0ZJTExcIikge1xuICAgICAgY29uc29sZS5sb2coXCJbVmVjdGEgQUldIFJlY2VpdmVkIFNUQVJUX0ZJTEwgZm9yIExldmVyXCIpO1xuICAgICAgZmlsbExldmVyRm9ybShtZXNzYWdlLnByb2ZpbGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGFydGVkOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gYXN5bmMgcmVzcG9uc2VcbiAgICB9XG4gIH1cbik7XG5cbi8qIC0tLS0gUGFnZSBMb2FkIC0tLS0gKi9cblxuY29uc29sZS5sb2coXCJbVmVjdGEgQUldIPCfj5fvuI8gTGV2ZXIgY29udGVudCBzY3JpcHQgbG9hZGVkXCIpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBTSxZQUFZO0NBQ2hCLFVBQVU7Q0FDVixPQUFPO0NBQ1AsT0FBTztDQUNQLGdCQUFnQjtDQUNoQixjQUNFO0NBQ0YsYUFDRTtDQUNGLFlBQ0U7Q0FDRixnQkFBZ0I7Q0FDaEIsY0FDRTtDQUNGLGdCQUFnQjtBQUNsQjs7QUFHQSxJQUFNLFNBQVM7Q0FDYjtFQUFFLEtBQUs7RUFBWSxPQUFPO0VBQWEsVUFBVTtDQUFLO0NBQ3REO0VBQUUsS0FBSztFQUFTLE9BQU87RUFBUyxVQUFVO0NBQUs7Q0FDL0M7RUFBRSxLQUFLO0VBQVMsT0FBTztFQUFTLFVBQVU7Q0FBTTtDQUNoRDtFQUFFLEtBQUs7RUFBa0IsT0FBTztFQUFtQixVQUFVO0NBQU07Q0FDbkU7RUFBRSxLQUFLO0VBQWUsT0FBTztFQUFnQixVQUFVO0NBQU07Q0FDN0Q7RUFBRSxLQUFLO0VBQWMsT0FBTztFQUFXLFVBQVU7Q0FBTTtDQUN2RDtFQUFFLEtBQUs7RUFBa0IsT0FBTztFQUFtQixVQUFVO0NBQU07Q0FDbkU7RUFBRSxLQUFLO0VB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