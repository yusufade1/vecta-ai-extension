//#region \0content-inline-16.js
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
//#region src/content/greenhouse.ts
/** Known Greenhouse selectors - ported from greenhouse.py */
var SELECTORS = {
	firstName: "#first_name",
	lastName: "#last_name",
	email: "#email",
	phone: "#phone",
	resumeUpload: "input[type='file'][accept*='pdf'], input[type='file']",
	location: "#job_application_location",
	linkedinUrl: "input[name*=\"linkedin\"], input[placeholder*=\"LinkedIn\"]",
	websiteUrl: "input[name*=\"website\"], input[placeholder*=\"Website\"]",
	coverLetter: "#cover_letter_text, textarea[name*='cover_letter']",
	submitButton: "#submit_app, button[type='submit']",
	successMessage: ".flash-pending, .confirmation-page, h1.confirmation"
};
/** Field definitions for progress tracking. */
var FIELDS = [
	{
		key: "firstName",
		label: "First Name",
		required: true
	},
	{
		key: "lastName",
		label: "Last Name",
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
		key: "location",
		label: "Location",
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
		key: "coverLetter",
		label: "Cover Letter",
		required: false
	},
	{
		key: "resumeUpload",
		label: "Resume",
		required: false
	}
];
function resolveNameParts(profile) {
	const firstName = (profile.personal.firstName || "").trim();
	const lastName = (profile.personal.lastName || "").trim();
	if (firstName || lastName) return {
		firstName,
		lastName
	};
	const fullName = (profile.personal.name || "").trim();
	if (!fullName) return {
		firstName: "",
		lastName: ""
	};
	const parts = fullName.split(/\s+/);
	return {
		firstName: parts[0] || "",
		lastName: parts.slice(1).join(" ")
	};
}
/**
* Fill a Greenhouse application form.
*/
async function fillGreenhouseForm(profile) {
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
	console.log("[Vecta AI] 🚀 Starting Greenhouse form fill...");
	try {
		await waitForElement(SELECTORS.firstName, 5e3);
		await sleep(300);
		const { firstName, lastName } = resolveNameParts(profile);
		if (firstName) {
			await fillInput(SELECTORS.firstName, firstName);
			reportProgress("First Name", "filled");
		} else reportProgress("First Name", "skipped", "Missing first name in profile");
		await sleep(200);
		if (lastName) {
			await fillInput(SELECTORS.lastName, lastName);
			reportProgress("Last Name", "filled");
		} else reportProgress("Last Name", "skipped", "Missing last name in profile");
		await sleep(200);
		await fillInput(SELECTORS.email, profile.personal.email);
		reportProgress("Email", "filled");
		await sleep(200);
		if (profile.personal.phone && elementExists(SELECTORS.phone)) {
			await fillInput(SELECTORS.phone, profile.personal.phone);
			reportProgress("Phone", "filled");
		} else reportProgress("Phone", "skipped");
		await sleep(200);
		if (profile.personal.location && elementExists(SELECTORS.location)) {
			await fillInput(SELECTORS.location, profile.personal.location);
			reportProgress("Location", "filled");
		} else reportProgress("Location", "skipped");
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
		const coverLetter = profile.answers?.coverLetter || "";
		if (coverLetter && elementExists(SELECTORS.coverLetter)) {
			await fillInput(SELECTORS.coverLetter, coverLetter, 20);
			reportProgress("Cover Letter", "filled");
		} else reportProgress("Cover Letter", "skipped");
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
		console.log(`[Vecta AI] ✅ Greenhouse form filled! ${completed}/${totalFields} fields`);
	} catch (err) {
		console.error("[Vecta AI] ❌ Fill error:", err);
		chrome.runtime.sendMessage({
			type: "FILL_ERROR",
			error: err instanceof Error ? err.message : String(err),
			jobUrl: window.location.href
		});
	}
}
function getGreenhouseJobDetails() {
	const titleEl = document.querySelector(".header-container h1, h1.app-title, .app-title");
	const companyEl = document.querySelector(".header-container span.company-name, .company-name");
	const descriptionEl = document.querySelector("#content, #main, .content-intro, .job-board-post");
	const locationEl = document.querySelector(".header-container .location, .location");
	return {
		title: titleEl?.textContent?.trim() || document.title || "Unknown Title",
		company: companyEl?.textContent?.trim() || "Unknown Company",
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
		sendResponse(getGreenhouseJobDetails());
		return true;
	}
	if (message.type === "START_FILL") {
		console.log("[Vecta AI] Received START_FILL for Greenhouse");
		fillGreenhouseForm(message.profile).then(() => {
			sendResponse({ started: true });
		});
		return true;
	}
});
console.log("[Vecta AI] 🌱 Greenhouse content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZW5ob3VzZS5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9ncmVlbmhvdXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIEdyZWVuaG91c2UgQ29udGVudCBTY3JpcHRcbiAgIFBvcnRlZCBmcm9tIHBhZ2Vfb2JqZWN0cy9ncmVlbmhvdXNlLnB5XG5cbiAgIEluamVjdGVkIG9uIGJvYXJkcy5ncmVlbmhvdXNlLmlvLyogcGFnZXMuXG4gICBMaXN0ZW5zIGZvciBTVEFSVF9GSUxMIG1lc3NhZ2VzIGZyb20gdGhlIHBvcHVwXG4gICBhbmQgZmlsbHMgdGhlIGFwcGxpY2F0aW9uIGZvcm0gZmllbGQtYnktZmllbGQuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCB7XG4gIGZpbGxJbnB1dCxcbiAgdXBsb2FkRmlsZSxcbiAgZWxlbWVudEV4aXN0cyxcbiAgd2FpdEZvckVsZW1lbnQsXG4gIHNsZWVwLFxuICBzY3JvbGxUb0VsZW1lbnQsXG59IGZyb20gXCIuL2RvbS1oZWxwZXJzXCI7XG5pbXBvcnQgdHlwZSB7IFVzZXJQcm9maWxlLCBGaWxsUHJvZ3Jlc3NFdmVudCB9IGZyb20gXCIuLi9saWIvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhcnRGaWxsTWVzc2FnZSB9IGZyb20gXCIuLi9saWIvbWVzc2FnaW5nXCI7XG5cbi8qKiBLbm93biBHcmVlbmhvdXNlIHNlbGVjdG9ycyAtIHBvcnRlZCBmcm9tIGdyZWVuaG91c2UucHkgKi9cbmNvbnN0IFNFTEVDVE9SUyA9IHtcbiAgZmlyc3ROYW1lOiBcIiNmaXJzdF9uYW1lXCIsXG4gIGxhc3ROYW1lOiBcIiNsYXN0X25hbWVcIixcbiAgZW1haWw6IFwiI2VtYWlsXCIsXG4gIHBob25lOiBcIiNwaG9uZVwiLFxuICByZXN1bWVVcGxvYWQ6XG4gICAgXCJpbnB1dFt0eXBlPSdmaWxlJ11bYWNjZXB0Kj0ncGRmJ10sIGlucHV0W3R5cGU9J2ZpbGUnXVwiLFxuICBsb2NhdGlvbjogXCIjam9iX2FwcGxpY2F0aW9uX2xvY2F0aW9uXCIsXG4gIGxpbmtlZGluVXJsOlxuICAgICdpbnB1dFtuYW1lKj1cImxpbmtlZGluXCJdLCBpbnB1dFtwbGFjZWhvbGRlcio9XCJMaW5rZWRJblwiXScsXG4gIHdlYnNpdGVVcmw6XG4gICAgJ2lucHV0W25hbWUqPVwid2Vic2l0ZVwiXSwgaW5wdXRbcGxhY2Vob2xkZXIqPVwiV2Vic2l0ZVwiXScsXG4gIGNvdmVyTGV0dGVyOlxuICAgIFwiI2NvdmVyX2xldHRlcl90ZXh0LCB0ZXh0YXJlYVtuYW1lKj0nY292ZXJfbGV0dGVyJ11cIixcbiAgc3VibWl0QnV0dG9uOiBcIiNzdWJtaXRfYXBwLCBidXR0b25bdHlwZT0nc3VibWl0J11cIixcbiAgc3VjY2Vzc01lc3NhZ2U6XG4gICAgXCIuZmxhc2gtcGVuZGluZywgLmNvbmZpcm1hdGlvbi1wYWdlLCBoMS5jb25maXJtYXRpb25cIixcbn07XG5cbi8qKiBGaWVsZCBkZWZpbml0aW9ucyBmb3IgcHJvZ3Jlc3MgdHJhY2tpbmcuICovXG5jb25zdCBGSUVMRFMgPSBbXG4gIHsga2V5OiBcImZpcnN0TmFtZVwiLCBsYWJlbDogXCJGaXJzdCBOYW1lXCIsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHsga2V5OiBcImxhc3ROYW1lXCIsIGxhYmVsOiBcIkxhc3QgTmFtZVwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJlbWFpbFwiLCBsYWJlbDogXCJFbWFpbFwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJwaG9uZVwiLCBsYWJlbDogXCJQaG9uZVwiLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgeyBrZXk6IFwibG9jYXRpb25cIiwgbGFiZWw6IFwiTG9jYXRpb25cIiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIHsga2V5OiBcImxpbmtlZGluVXJsXCIsIGxhYmVsOiBcIkxpbmtlZEluIFVSTFwiLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgeyBrZXk6IFwid2Vic2l0ZVVybFwiLCBsYWJlbDogXCJXZWJzaXRlXCIsIHJlcXVpcmVkOiBmYWxzZSB9LFxuICB7IGtleTogXCJjb3ZlckxldHRlclwiLCBsYWJlbDogXCJDb3ZlciBMZXR0ZXJcIiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIHsga2V5OiBcInJlc3VtZVVwbG9hZFwiLCBsYWJlbDogXCJSZXN1bWVcIiwgcmVxdWlyZWQ6IGZhbHNlIH0sXG5dIGFzIGNvbnN0O1xuXG5mdW5jdGlvbiByZXNvbHZlTmFtZVBhcnRzKHByb2ZpbGU6IFVzZXJQcm9maWxlKToge1xuICBmaXJzdE5hbWU6IHN0cmluZztcbiAgbGFzdE5hbWU6IHN0cmluZztcbn0ge1xuICBjb25zdCBmaXJzdE5hbWUgPSAocHJvZmlsZS5wZXJzb25hbC5maXJzdE5hbWUgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBsYXN0TmFtZSA9IChwcm9maWxlLnBlcnNvbmFsLmxhc3ROYW1lIHx8IFwiXCIpLnRyaW0oKTtcblxuICBpZiAoZmlyc3ROYW1lIHx8IGxhc3ROYW1lKSB7XG4gICAgcmV0dXJuIHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9O1xuICB9XG5cbiAgY29uc3QgZnVsbE5hbWUgPSAocHJvZmlsZS5wZXJzb25hbC5uYW1lIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFmdWxsTmFtZSkge1xuICAgIHJldHVybiB7IGZpcnN0TmFtZTogXCJcIiwgbGFzdE5hbWU6IFwiXCIgfTtcbiAgfVxuXG4gIGNvbnN0IHBhcnRzID0gZnVsbE5hbWUuc3BsaXQoL1xccysvKTtcbiAgcmV0dXJuIHtcbiAgICBmaXJzdE5hbWU6IHBhcnRzWzBdIHx8IFwiXCIsXG4gICAgbGFzdE5hbWU6IHBhcnRzLnNsaWNlKDEpLmpvaW4oXCIgXCIpLFxuICB9O1xufVxuXG4vKipcbiAqIEZpbGwgYSBHcmVlbmhvdXNlIGFwcGxpY2F0aW9uIGZvcm0uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpbGxHcmVlbmhvdXNlRm9ybShwcm9maWxlOiBVc2VyUHJvZmlsZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB0b3RhbEZpZWxkcyA9IEZJRUxEUy5sZW5ndGg7XG4gIGxldCBjb21wbGV0ZWQgPSAwO1xuXG4gIGNvbnN0IHJlcG9ydFByb2dyZXNzID0gKFxuICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgc3RhdHVzOiBGaWxsUHJvZ3Jlc3NFdmVudFtcInN0YXR1c1wiXSxcbiAgICBtZXNzYWdlPzogc3RyaW5nXG4gICkgPT4ge1xuICAgIGNvbXBsZXRlZCsrO1xuICAgIGNvbnN0IHByb2dyZXNzOiBGaWxsUHJvZ3Jlc3NFdmVudCA9IHtcbiAgICAgIGZpZWxkLFxuICAgICAgc3RhdHVzLFxuICAgICAgdG90YWw6IHRvdGFsRmllbGRzLFxuICAgICAgY29tcGxldGVkLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogXCJGSUxMX1BST0dSRVNTXCIsIHByb2dyZXNzIH0pO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKFwiW1ZlY3RhIEFJXSDwn5qAIFN0YXJ0aW5nIEdyZWVuaG91c2UgZm9ybSBmaWxsLi4uXCIpO1xuXG4gIHRyeSB7XG4gICAgLy8gV2FpdCBmb3IgZm9ybSB0byBiZSByZWFkeVxuICAgIGF3YWl0IHdhaXRGb3JFbGVtZW50KFNFTEVDVE9SUy5maXJzdE5hbWUsIDUwMDApO1xuICAgIGF3YWl0IHNsZWVwKDMwMCk7XG5cbiAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IHJlc29sdmVOYW1lUGFydHMocHJvZmlsZSk7XG5cbiAgICAvLyA9PT0gUmVxdWlyZWQgZmllbGRzID09PVxuXG4gICAgLy8gRmlyc3QgTmFtZVxuICAgIGlmIChmaXJzdE5hbWUpIHtcbiAgICAgIGF3YWl0IGZpbGxJbnB1dChTRUxFQ1RPUlMuZmlyc3ROYW1lLCBmaXJzdE5hbWUpO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJGaXJzdCBOYW1lXCIsIFwiZmlsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkZpcnN0IE5hbWVcIiwgXCJza2lwcGVkXCIsIFwiTWlzc2luZyBmaXJzdCBuYW1lIGluIHByb2ZpbGVcIik7XG4gICAgfVxuXG4gICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgIC8vIExhc3QgTmFtZVxuICAgIGlmIChsYXN0TmFtZSkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFNFTEVDVE9SUy5sYXN0TmFtZSwgbGFzdE5hbWUpO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJMYXN0IE5hbWVcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiTGFzdCBOYW1lXCIsIFwic2tpcHBlZFwiLCBcIk1pc3NpbmcgbGFzdCBuYW1lIGluIHByb2ZpbGVcIik7XG4gICAgfVxuXG4gICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgIC8vIEVtYWlsXG4gICAgYXdhaXQgZmlsbElucHV0KFNFTEVDVE9SUy5lbWFpbCwgcHJvZmlsZS5wZXJzb25hbC5lbWFpbCk7XG4gICAgcmVwb3J0UHJvZ3Jlc3MoXCJFbWFpbFwiLCBcImZpbGxlZFwiKTtcblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyA9PT0gT3B0aW9uYWwgZmllbGRzID09PVxuXG4gICAgLy8gUGhvbmVcbiAgICBpZiAocHJvZmlsZS5wZXJzb25hbC5waG9uZSAmJiBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy5waG9uZSkpIHtcbiAgICAgIGF3YWl0IGZpbGxJbnB1dChTRUxFQ1RPUlMucGhvbmUsIHByb2ZpbGUucGVyc29uYWwucGhvbmUpO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJQaG9uZVwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJQaG9uZVwiLCBcInNraXBwZWRcIik7XG4gICAgfVxuXG4gICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgIC8vIExvY2F0aW9uXG4gICAgaWYgKFxuICAgICAgcHJvZmlsZS5wZXJzb25hbC5sb2NhdGlvbiAmJlxuICAgICAgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMubG9jYXRpb24pXG4gICAgKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLmxvY2F0aW9uLCBwcm9maWxlLnBlcnNvbmFsLmxvY2F0aW9uKTtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiTG9jYXRpb25cIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiTG9jYXRpb25cIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBMaW5rZWRJblxuICAgIGlmIChcbiAgICAgIHByb2ZpbGUucGVyc29uYWwubGlua2VkaW5VcmwgJiZcbiAgICAgIGVsZW1lbnRFeGlzdHMoU0VMRUNUT1JTLmxpbmtlZGluVXJsKVxuICAgICkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFxuICAgICAgICBTRUxFQ1RPUlMubGlua2VkaW5VcmwsXG4gICAgICAgIHByb2ZpbGUucGVyc29uYWwubGlua2VkaW5VcmxcbiAgICAgICk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkxpbmtlZEluIFVSTFwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJMaW5rZWRJbiBVUkxcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBXZWJzaXRlXG4gICAgaWYgKFxuICAgICAgcHJvZmlsZS5wZXJzb25hbC53ZWJzaXRlVXJsICYmXG4gICAgICBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy53ZWJzaXRlVXJsKVxuICAgICkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFxuICAgICAgICBTRUxFQ1RPUlMud2Vic2l0ZVVybCxcbiAgICAgICAgcHJvZmlsZS5wZXJzb25hbC53ZWJzaXRlVXJsXG4gICAgICApO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJXZWJzaXRlXCIsIFwiZmlsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIldlYnNpdGVcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBDb3ZlciBMZXR0ZXJcbiAgICBjb25zdCBjb3ZlckxldHRlciA9IHByb2ZpbGUuYW5zd2Vycz8uY292ZXJMZXR0ZXIgfHwgXCJcIjtcbiAgICBpZiAoY292ZXJMZXR0ZXIgJiYgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMuY292ZXJMZXR0ZXIpKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLmNvdmVyTGV0dGVyLCBjb3ZlckxldHRlciwgMjApOyAvLyBmYXN0ZXIgZm9yIGxvbmcgdGV4dFxuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJDb3ZlciBMZXR0ZXJcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiQ292ZXIgTGV0dGVyXCIsIFwic2tpcHBlZFwiKTtcbiAgICB9XG5cbiAgICBhd2FpdCBzbGVlcCgyMDApO1xuXG4gICAgLy8gUmVzdW1lIFVwbG9hZFxuICAgIGlmIChcbiAgICAgIHByb2ZpbGUucmVzdW1lPy5maWxlQ29udGVudEJhc2U2NCAmJlxuICAgICAgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMucmVzdW1lVXBsb2FkKVxuICAgICkge1xuICAgICAgYXdhaXQgdXBsb2FkRmlsZShcbiAgICAgICAgU0VMRUNUT1JTLnJlc3VtZVVwbG9hZCxcbiAgICAgICAgcHJvZmlsZS5yZXN1bWUuZmlsZUNvbnRlbnRCYXNlNjQsXG4gICAgICAgIHByb2ZpbGUucmVzdW1lLmZpbGVuYW1lIHx8IFwicmVzdW1lLnBkZlwiLFxuICAgICAgICBwcm9maWxlLnJlc3VtZS5taW1lVHlwZSB8fCBcImFwcGxpY2F0aW9uL3BkZlwiXG4gICAgICApO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJSZXN1bWVcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiUmVzdW1lXCIsIFwic2tpcHBlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBTY3JvbGwgc3VibWl0IGJ1dHRvbiBpbnRvIHZpZXcgKGJ1dCBET04nVCBjbGljayBpdCAtIHVzZXIgZGVjaWRlcylcbiAgICBpZiAoZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMuc3VibWl0QnV0dG9uKSkge1xuICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuc3VibWl0QnV0dG9uKTtcbiAgICAgIGlmIChzdWJtaXRCdG4pIHtcbiAgICAgICAgc2Nyb2xsVG9FbGVtZW50KHN1Ym1pdEJ0bik7XG4gICAgICAgIC8vIEFkZCBhIHN1YnRsZSBwdWxzZSB0byBkcmF3IGF0dGVudGlvblxuICAgICAgICAoc3VibWl0QnRuIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5hbmltYXRpb24gPVxuICAgICAgICAgIFwicHVsc2UgMS41cyBlYXNlLWluLW91dCAzXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVwb3J0IHN1Y2Nlc3NcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIkZJTExfQ09NUExFVEVcIixcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBqb2JVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgZmllbGRzQ29tcGxldGVkOiBjb21wbGV0ZWQsXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbVmVjdGEgQUldIOKchSBHcmVlbmhvdXNlIGZvcm0gZmlsbGVkISAke2NvbXBsZXRlZH0vJHt0b3RhbEZpZWxkc30gZmllbGRzYFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbVmVjdGEgQUldIOKdjCBGaWxsIGVycm9yOlwiLCBlcnIpO1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwiRklMTF9FUlJPUlwiLFxuICAgICAgZXJyb3I6IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKSxcbiAgICAgIGpvYlVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0R3JlZW5ob3VzZUpvYkRldGFpbHMoKSB7XG4gIGNvbnN0IHRpdGxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWNvbnRhaW5lciBoMSwgaDEuYXBwLXRpdGxlLCAuYXBwLXRpdGxlJyk7XG4gIGNvbnN0IGNvbXBhbnlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItY29udGFpbmVyIHNwYW4uY29tcGFueS1uYW1lLCAuY29tcGFueS1uYW1lJyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCwgI21haW4sIC5jb250ZW50LWludHJvLCAuam9iLWJvYXJkLXBvc3QnKTtcbiAgY29uc3QgbG9jYXRpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItY29udGFpbmVyIC5sb2NhdGlvbiwgLmxvY2F0aW9uJyk7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGl0bGVFbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkb2N1bWVudC50aXRsZSB8fCBcIlVua25vd24gVGl0bGVcIixcbiAgICBjb21wYW55OiBjb21wYW55RWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgXCJVbmtub3duIENvbXBhbnlcIixcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCB8fCBcIlwiLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvbkVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiXCIsXG4gIH07XG59XG5cbi8qIC0tLS0gTWVzc2FnZSBMaXN0ZW5lciAtLS0tICovXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgKFxuICAgIG1lc3NhZ2U6IFN0YXJ0RmlsbE1lc3NhZ2UgfCB7IHR5cGU6IFwiUElOR1wiIH0gfCB7IHR5cGU6IFwiR0VUX0pPQl9ERVRBSUxTXCIgfSxcbiAgICBfc2VuZGVyOiBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyLFxuICAgIHNlbmRSZXNwb25zZTogKHJlc3BvbnNlPzogdW5rbm93bikgPT4gdm9pZFxuICApID0+IHtcbiAgICBpZiAoKG1lc3NhZ2UgYXMgYW55KS50eXBlID09PSBcIlBJTkdcIikge1xuICAgICAgc2VuZFJlc3BvbnNlKHsgcG9uZzogdHJ1ZSB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICgobWVzc2FnZSBhcyBhbnkpLnR5cGUgPT09IFwiR0VUX0pPQl9ERVRBSUxTXCIpIHtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSBnZXRHcmVlbmhvdXNlSm9iRGV0YWlscygpO1xuICAgICAgc2VuZFJlc3BvbnNlKGRldGFpbHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJTVEFSVF9GSUxMXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW1ZlY3RhIEFJXSBSZWNlaXZlZCBTVEFSVF9GSUxMIGZvciBHcmVlbmhvdXNlXCIpO1xuICAgICAgZmlsbEdyZWVuaG91c2VGb3JtKG1lc3NhZ2UucHJvZmlsZSkudGhlbigoKSA9PiB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXJ0ZWQ6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBhc3luYyByZXNwb25zZVxuICAgIH1cbiAgfVxuKTtcblxuLyogLS0tLSBQYWdlIExvYWQgLS0tLSAqL1xuXG5jb25zb2xlLmxvZyhcIltWZWN0YSBBSV0g8J+MsSBHcmVlbmhvdXNlIGNvbnRlbnQgc2NyaXB0IGxvYWRlZFwiKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLElBQU0sWUFBWTtDQUNoQixXQUFXO0NBQ1gsVUFBVTtDQUNWLE9BQU87Q0FDUCxPQUFPO0NBQ1AsY0FDRTtDQUNGLFVBQVU7Q0FDVixhQUNFO0NBQ0YsWUFDRTtDQUNGLGFBQ0U7Q0FDRixjQUFjO0NBQ2QsZ0JBQ0U7QUFDSjs7QUFHQSxJQUFNLFNBQVM7Q0FDYjtFQUFFLEtBQUs7RUFBYSxPQUFPO0VBQWMsVUFBVTtDQUFLO0NBQ3hEO0VBQUUsS0FBSztFQUFZLE9BQU87RUFBYSxVQUFVO0NBQUs7Q0FDdEQ7RUFBRSxLQUFLO0VBQVMsT0FBTztFQUFTLFVBQVU7Q0FBSztDQUMvQztFQUFFLEtBQUs7RUFBUyxPQUFPO0VBQVMsVUFBVTtDQUFNO0NBQ2hEO0VBQUUsS0FBSztFQUFZLE9BQU87RUFBWSxVQUFVO0NBQU07Q0FDdEQ7RUFBRSxLQUFLO0VBQWUsT0FBTztFQUFnQixVQUFVO0NBQU07Q0FDN0Q7RUFBRSxLQUFLO0VBQWMsT0FBTztFQUFXLFVBQVU7Q0FBTTtDQUN2RDtFQUFFLEtBQUs7RUFBZSxPQUFPO0VBQWdCLFVBQVU7Q0FBTTtDQUM3RDtFQUFFLEtBQUs7RUFBZ0IsT0FBTztFQUFVLFVBQVU7Q0FBTTtBQUMxRDtBQUVBLFNBQVMsaUJBQWlCLFNBR3hCO0NBQ0EsTUFBTSxhQUFhLFFBQVEsU0FBUyxhQUFhLEdBQUEsQ0FBSSxLQUFLO0NBQzFELE1BQU0sWUFBWSxRQUFRLFNBQVMsWUFBWSxHQUFBLENBQUksS0FBSztDQUV4RCxJQUFJLGFBQWEsVUFDZixPQUFPO0VBQUU7RUFBVztDQUFTO0NBRy9CLE1BQU0sWUFBWSxR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