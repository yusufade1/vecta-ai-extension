//#region \0content-inline-14.js
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
//#region src/content/linkedin.ts
/** Known LinkedIn Easy Apply selectors */
var SELECTORS = {
	firstName: "input[id*=\"first-name\"], input[id*=\"firstName\"]",
	lastName: "input[id*=\"last-name\"], input[id*=\"lastName\"]",
	email: "input[type=\"email\"], input[id*=\"email\"]",
	phone: "input[id*=\"phoneNumber\"], input[type=\"tel\"]",
	resumeUpload: "input[type=\"file\"][name*=\"file\"], input[type=\"file\"][id*=\"file\"]",
	submitButton: "button[aria-label=\"Submit application\"], button[aria-label=\"Review your application\"], button.artdeco-button--primary"
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
		key: "resumeUpload",
		label: "Resume",
		required: false
	}
];
function resolveNameParts(profile) {
	const personal = profile?.personal ?? {};
	const firstName = (personal.firstName || "").trim();
	const lastName = (personal.lastName || "").trim();
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
* Fill a LinkedIn Easy Apply form.
*/
async function fillLinkedinForm(profile) {
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
	console.log("[Job Vecta AI] 🚀 Starting LinkedIn Easy Apply form fill...");
	try {
		await sleep(300);
		const { firstName, lastName } = resolveNameParts(profile);
		if (firstName && elementExists(SELECTORS.firstName)) {
			await fillInput(SELECTORS.firstName, firstName);
			reportProgress("First Name", "filled");
		} else reportProgress("First Name", "skipped", "Field not found or missing in profile");
		await sleep(200);
		if (lastName && elementExists(SELECTORS.lastName)) {
			await fillInput(SELECTORS.lastName, lastName);
			reportProgress("Last Name", "filled");
		} else reportProgress("Last Name", "skipped", "Field not found or missing in profile");
		await sleep(200);
		if (elementExists(SELECTORS.email)) {
			await fillInput(SELECTORS.email, profile.personal.email);
			reportProgress("Email", "filled");
		} else reportProgress("Email", "skipped");
		await sleep(200);
		if (profile.personal.phone && elementExists(SELECTORS.phone)) {
			await fillInput(SELECTORS.phone, profile.personal.phone);
			reportProgress("Phone", "filled");
		} else reportProgress("Phone", "skipped");
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
		console.log(`[Job Vecta AI] ✅ LinkedIn form filled! ${completed}/${totalFields} fields`);
	} catch (err) {
		console.error("[Job Vecta AI] ❌ Fill error:", err);
		chrome.runtime.sendMessage({
			type: "FILL_ERROR",
			error: err instanceof Error ? err.message : String(err),
			jobUrl: window.location.href
		});
	}
}
function getLinkedInJobDetails() {
	const titleEl = document.querySelector(".job-details-jobs-unified-top-card__job-title h1, .jobs-unified-top-card__job-title, h1.t-24, h2.jobs-details-top-card__job-title");
	const companyEl = document.querySelector(".job-details-jobs-unified-top-card__company-name a, .jobs-unified-top-card__company-name, .jobs-details-top-card__company-info a");
	const descriptionEl = document.querySelector("#job-details, .jobs-description__content, .jobs-box__html-content, .description__text");
	const locationEl = document.querySelector(".job-details-jobs-unified-top-card__bullet, .jobs-unified-top-card__bullet, .jobs-details-top-card__bullet");
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
		sendResponse(getLinkedInJobDetails());
		return true;
	}
	if (message.type === "START_FILL") {
		console.log("[Job Vecta AI] Received START_FILL for LinkedIn");
		if (!message.profile?.personal) {
			chrome.runtime.sendMessage({
				type: "FILL_ERROR",
				error: "Profile data is incomplete. Please re-open the extension and save your profile.",
				jobUrl: window.location.href
			});
			sendResponse({ started: false });
			return true;
		}
		fillLinkedinForm(message.profile).then(() => {
			sendResponse({ started: true });
		}).catch((err) => {
			console.error("[Job Vecta AI] ❌ Fill failed:", err);
			sendResponse({ started: false });
		});
		return true;
	}
});
console.log("[Job Vecta AI] 💼 LinkedIn content script loaded");
//#endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkaW4uanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvbGlua2VkaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgTGlua2VkSW4gQ29udGVudCBTY3JpcHRcblxuICAgSW5qZWN0ZWQgb24gbGlua2VkaW4uY29tL2pvYnMvKiBwYWdlcy5cbiAgIExpc3RlbnMgZm9yIFNUQVJUX0ZJTEwgbWVzc2FnZXMgZnJvbSB0aGUgcG9wdXBcbiAgIGFuZCBmaWxscyB0aGUgYXBwbGljYXRpb24gZm9ybSBmaWVsZC1ieS1maWVsZC5cbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuaW1wb3J0IHtcbiAgZmlsbElucHV0LFxuICB1cGxvYWRGaWxlLFxuICBlbGVtZW50RXhpc3RzLFxuICB3YWl0Rm9yRWxlbWVudCxcbiAgc2xlZXAsXG4gIHNjcm9sbFRvRWxlbWVudCxcbn0gZnJvbSBcIi4vZG9tLWhlbHBlcnNcIjtcbmltcG9ydCB0eXBlIHsgVXNlclByb2ZpbGUsIEZpbGxQcm9ncmVzc0V2ZW50IH0gZnJvbSBcIi4uL2xpYi90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGFydEZpbGxNZXNzYWdlIH0gZnJvbSBcIi4uL2xpYi9tZXNzYWdpbmdcIjtcblxuLyoqIEtub3duIExpbmtlZEluIEVhc3kgQXBwbHkgc2VsZWN0b3JzICovXG5jb25zdCBTRUxFQ1RPUlMgPSB7XG4gIGZpcnN0TmFtZTogJ2lucHV0W2lkKj1cImZpcnN0LW5hbWVcIl0sIGlucHV0W2lkKj1cImZpcnN0TmFtZVwiXScsXG4gIGxhc3ROYW1lOiAnaW5wdXRbaWQqPVwibGFzdC1uYW1lXCJdLCBpbnB1dFtpZCo9XCJsYXN0TmFtZVwiXScsXG4gIGVtYWlsOiAnaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFtpZCo9XCJlbWFpbFwiXScsXG4gIHBob25lOiAnaW5wdXRbaWQqPVwicGhvbmVOdW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0nLFxuICByZXN1bWVVcGxvYWQ6ICdpbnB1dFt0eXBlPVwiZmlsZVwiXVtuYW1lKj1cImZpbGVcIl0sIGlucHV0W3R5cGU9XCJmaWxlXCJdW2lkKj1cImZpbGVcIl0nLFxuICBzdWJtaXRCdXR0b246ICdidXR0b25bYXJpYS1sYWJlbD1cIlN1Ym1pdCBhcHBsaWNhdGlvblwiXSwgYnV0dG9uW2FyaWEtbGFiZWw9XCJSZXZpZXcgeW91ciBhcHBsaWNhdGlvblwiXSwgYnV0dG9uLmFydGRlY28tYnV0dG9uLS1wcmltYXJ5Jyxcbn07XG5cbi8qKiBGaWVsZCBkZWZpbml0aW9ucyBmb3IgcHJvZ3Jlc3MgdHJhY2tpbmcuICovXG5jb25zdCBGSUVMRFMgPSBbXG4gIHsga2V5OiBcImZpcnN0TmFtZVwiLCBsYWJlbDogXCJGaXJzdCBOYW1lXCIsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHsga2V5OiBcImxhc3ROYW1lXCIsIGxhYmVsOiBcIkxhc3QgTmFtZVwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJlbWFpbFwiLCBsYWJlbDogXCJFbWFpbFwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB7IGtleTogXCJwaG9uZVwiLCBsYWJlbDogXCJQaG9uZVwiLCByZXF1aXJlZDogZmFsc2UgfSxcbiAgeyBrZXk6IFwicmVzdW1lVXBsb2FkXCIsIGxhYmVsOiBcIlJlc3VtZVwiLCByZXF1aXJlZDogZmFsc2UgfSxcbl0gYXMgY29uc3Q7XG5cbmZ1bmN0aW9uIHJlc29sdmVOYW1lUGFydHMocHJvZmlsZTogVXNlclByb2ZpbGUpOiB7XG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuICBsYXN0TmFtZTogc3RyaW5nO1xufSB7XG4gIGNvbnN0IHBlcnNvbmFsID0gcHJvZmlsZT8ucGVyc29uYWwgPz8ge307XG4gIGNvbnN0IGZpcnN0TmFtZSA9IChwZXJzb25hbC5maXJzdE5hbWUgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBsYXN0TmFtZSA9IChwZXJzb25hbC5sYXN0TmFtZSB8fCBcIlwiKS50cmltKCk7XG5cbiAgaWYgKGZpcnN0TmFtZSB8fCBsYXN0TmFtZSkge1xuICAgIHJldHVybiB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfTtcbiAgfVxuXG4gIGNvbnN0IGZ1bGxOYW1lID0gKHByb2ZpbGUucGVyc29uYWwubmFtZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghZnVsbE5hbWUpIHtcbiAgICByZXR1cm4geyBmaXJzdE5hbWU6IFwiXCIsIGxhc3ROYW1lOiBcIlwiIH07XG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IGZ1bGxOYW1lLnNwbGl0KC9cXHMrLyk7XG4gIHJldHVybiB7XG4gICAgZmlyc3ROYW1lOiBwYXJ0c1swXSB8fCBcIlwiLFxuICAgIGxhc3ROYW1lOiBwYXJ0cy5zbGljZSgxKS5qb2luKFwiIFwiKSxcbiAgfTtcbn1cblxuLyoqXG4gKiBGaWxsIGEgTGlua2VkSW4gRWFzeSBBcHBseSBmb3JtLlxuICovXG5hc3luYyBmdW5jdGlvbiBmaWxsTGlua2VkaW5Gb3JtKHByb2ZpbGU6IFVzZXJQcm9maWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHRvdGFsRmllbGRzID0gRklFTERTLmxlbmd0aDtcbiAgbGV0IGNvbXBsZXRlZCA9IDA7XG5cbiAgY29uc3QgcmVwb3J0UHJvZ3Jlc3MgPSAoXG4gICAgZmllbGQ6IHN0cmluZyxcbiAgICBzdGF0dXM6IEZpbGxQcm9ncmVzc0V2ZW50W1wic3RhdHVzXCJdLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgKSA9PiB7XG4gICAgY29tcGxldGVkKys7XG4gICAgY29uc3QgcHJvZ3Jlc3M6IEZpbGxQcm9ncmVzc0V2ZW50ID0ge1xuICAgICAgZmllbGQsXG4gICAgICBzdGF0dXMsXG4gICAgICB0b3RhbDogdG90YWxGaWVsZHMsXG4gICAgICBjb21wbGV0ZWQsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiBcIkZJTExfUFJPR1JFU1NcIiwgcHJvZ3Jlc3MgfSk7XG4gIH07XG5cbiAgY29uc29sZS5sb2coXCJbSm9iIFZlY3RhIEFJXSDwn5qAIFN0YXJ0aW5nIExpbmtlZEluIEVhc3kgQXBwbHkgZm9ybSBmaWxsLi4uXCIpO1xuXG4gIHRyeSB7XG4gICAgLy8gV2FpdCBmb3IgZm9ybSB0byBiZSByZWFkeVxuICAgIGF3YWl0IHNsZWVwKDMwMCk7XG5cbiAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IHJlc29sdmVOYW1lUGFydHMocHJvZmlsZSk7XG5cbiAgICAvLyA9PT0gUmVxdWlyZWQgZmllbGRzID09PVxuXG4gICAgLy8gRmlyc3QgTmFtZVxuICAgIGlmIChmaXJzdE5hbWUgJiYgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMuZmlyc3ROYW1lKSkge1xuICAgICAgYXdhaXQgZmlsbElucHV0KFNFTEVDVE9SUy5maXJzdE5hbWUsIGZpcnN0TmFtZSk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkZpcnN0IE5hbWVcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiRmlyc3QgTmFtZVwiLCBcInNraXBwZWRcIiwgXCJGaWVsZCBub3QgZm91bmQgb3IgbWlzc2luZyBpbiBwcm9maWxlXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyBMYXN0IE5hbWVcbiAgICBpZiAobGFzdE5hbWUgJiYgZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMubGFzdE5hbWUpKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLmxhc3ROYW1lLCBsYXN0TmFtZSk7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIkxhc3QgTmFtZVwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJMYXN0IE5hbWVcIiwgXCJza2lwcGVkXCIsIFwiRmllbGQgbm90IGZvdW5kIG9yIG1pc3NpbmcgaW4gcHJvZmlsZVwiKTtcbiAgICB9XG5cbiAgICBhd2FpdCBzbGVlcCgyMDApO1xuXG4gICAgLy8gRW1haWxcbiAgICBpZiAoZWxlbWVudEV4aXN0cyhTRUxFQ1RPUlMuZW1haWwpKSB7XG4gICAgICBhd2FpdCBmaWxsSW5wdXQoU0VMRUNUT1JTLmVtYWlsLCBwcm9maWxlLnBlcnNvbmFsLmVtYWlsKTtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiRW1haWxcIiwgXCJmaWxsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiRW1haWxcIiwgXCJza2lwcGVkXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAvLyA9PT0gT3B0aW9uYWwgZmllbGRzID09PVxuXG4gICAgLy8gUGhvbmVcbiAgICBpZiAocHJvZmlsZS5wZXJzb25hbC5waG9uZSAmJiBlbGVtZW50RXhpc3RzKFNFTEVDVE9SUy5waG9uZSkpIHtcbiAgICAgIGF3YWl0IGZpbGxJbnB1dChTRUxFQ1RPUlMucGhvbmUsIHByb2ZpbGUucGVyc29uYWwucGhvbmUpO1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJQaG9uZVwiLCBcImZpbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3MoXCJQaG9uZVwiLCBcInNraXBwZWRcIik7XG4gICAgfVxuXG4gICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgIC8vIFJlc3VtZSBVcGxvYWRcbiAgICBpZiAoXG4gICAgICBwcm9maWxlLnJlc3VtZT8uZmlsZUNvbnRlbnRCYXNlNjQgJiZcbiAgICAgIGVsZW1lbnRFeGlzdHMoU0VMRUNUT1JTLnJlc3VtZVVwbG9hZClcbiAgICApIHtcbiAgICAgIGF3YWl0IHVwbG9hZEZpbGUoXG4gICAgICAgIFNFTEVDVE9SUy5yZXN1bWVVcGxvYWQsXG4gICAgICAgIHByb2ZpbGUucmVzdW1lLmZpbGVDb250ZW50QmFzZTY0LFxuICAgICAgICBwcm9maWxlLnJlc3VtZS5maWxlbmFtZSB8fCBcInJlc3VtZS5wZGZcIixcbiAgICAgICAgcHJvZmlsZS5yZXN1bWUubWltZVR5cGUgfHwgXCJhcHBsaWNhdGlvbi9wZGZcIlxuICAgICAgKTtcbiAgICAgIHJlcG9ydFByb2dyZXNzKFwiUmVzdW1lXCIsIFwiZmlsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXBvcnRQcm9ncmVzcyhcIlJlc3VtZVwiLCBcInNraXBwZWRcIik7XG4gICAgfVxuXG4gICAgLy8gU2Nyb2xsIHN1Ym1pdCBidXR0b24gaW50byB2aWV3IChidXQgRE9OJ1QgY2xpY2sgaXQgLSB1c2VyIGRlY2lkZXMpXG4gICAgaWYgKGVsZW1lbnRFeGlzdHMoU0VMRUNUT1JTLnN1Ym1pdEJ1dHRvbikpIHtcbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLnN1Ym1pdEJ1dHRvbik7XG4gICAgICBpZiAoc3VibWl0QnRuKSB7XG4gICAgICAgIHNjcm9sbFRvRWxlbWVudChzdWJtaXRCdG4pO1xuICAgICAgICAvLyBBZGQgYSBzdWJ0bGUgcHVsc2UgdG8gZHJhdyBhdHRlbnRpb25cbiAgICAgICAgKHN1Ym1pdEJ0biBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYW5pbWF0aW9uID1cbiAgICAgICAgICBcInB1bHNlIDEuNXMgZWFzZS1pbi1vdXQgM1wiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG9ydCBzdWNjZXNzXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJGSUxMX0NPTVBMRVRFXCIsXG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgam9iVXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIGZpZWxkc0NvbXBsZXRlZDogY29tcGxldGVkLFxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXG4gICAgICBgW0pvYiBWZWN0YSBBSV0g4pyFIExpbmtlZEluIGZvcm0gZmlsbGVkISAke2NvbXBsZXRlZH0vJHt0b3RhbEZpZWxkc30gZmllbGRzYFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbSm9iIFZlY3RhIEFJXSDinYwgRmlsbCBlcnJvcjpcIiwgZXJyKTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIkZJTExfRVJST1JcIixcbiAgICAgIGVycm9yOiBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVyciksXG4gICAgICBqb2JVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldExpbmtlZEluSm9iRGV0YWlscygpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb2ItZGV0YWlscy1qb2JzLXVuaWZpZWQtdG9wLWNhcmRfX2pvYi10aXRsZSBoMSwgLmpvYnMtdW5pZmllZC10b3AtY2FyZF9fam9iLXRpdGxlLCBoMS50LTI0LCBoMi5qb2JzLWRldGFpbHMtdG9wLWNhcmRfX2pvYi10aXRsZScpO1xuICBjb25zdCBjb21wYW55RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam9iLWRldGFpbHMtam9icy11bmlmaWVkLXRvcC1jYXJkX19jb21wYW55LW5hbWUgYSwgLmpvYnMtdW5pZmllZC10b3AtY2FyZF9fY29tcGFueS1uYW1lLCAuam9icy1kZXRhaWxzLXRvcC1jYXJkX19jb21wYW55LWluZm8gYScpO1xuICBjb25zdCBkZXNjcmlwdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pvYi1kZXRhaWxzLCAuam9icy1kZXNjcmlwdGlvbl9fY29udGVudCwgLmpvYnMtYm94X19odG1sLWNvbnRlbnQsIC5kZXNjcmlwdGlvbl9fdGV4dCcpO1xuICBjb25zdCBsb2NhdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpvYi1kZXRhaWxzLWpvYnMtdW5pZmllZC10b3AtY2FyZF9fYnVsbGV0LCAuam9icy11bmlmaWVkLXRvcC1jYXJkX19idWxsZXQsIC5qb2JzLWRldGFpbHMtdG9wLWNhcmRfX2J1bGxldCcpO1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHRpdGxlRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZG9jdW1lbnQudGl0bGUgfHwgXCJVbmtub3duIFRpdGxlXCIsXG4gICAgY29tcGFueTogY29tcGFueUVsPy50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiVW5rbm93biBDb21wYW55XCIsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uRWw/LnRleHRDb250ZW50Py50cmltKCkgfHwgZG9jdW1lbnQuYm9keS5pbm5lclRleHQgfHwgXCJcIixcbiAgICBsb2NhdGlvbjogbG9jYXRpb25FbD8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBcIlwiLFxuICB9O1xufVxuXG4vKiAtLS0tIE1lc3NhZ2UgTGlzdGVuZXIgLS0tLSAqL1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gIChcbiAgICBtZXNzYWdlOiBTdGFydEZpbGxNZXNzYWdlIHwgeyB0eXBlOiBcIlBJTkdcIiB9IHwgeyB0eXBlOiBcIkdFVF9KT0JfREVUQUlMU1wiIH0sXG4gICAgX3NlbmRlcjogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcixcbiAgICBzZW5kUmVzcG9uc2U6IChyZXNwb25zZT86IHVua25vd24pID0+IHZvaWRcbiAgKSA9PiB7XG4gICAgaWYgKChtZXNzYWdlIGFzIGFueSkudHlwZSA9PT0gXCJQSU5HXCIpIHtcbiAgICAgIHNlbmRSZXNwb25zZSh7IHBvbmc6IHRydWUgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoKG1lc3NhZ2UgYXMgYW55KS50eXBlID09PSBcIkdFVF9KT0JfREVUQUlMU1wiKSB7XG4gICAgICBjb25zdCBkZXRhaWxzID0gZ2V0TGlua2VkSW5Kb2JEZXRhaWxzKCk7XG4gICAgICBzZW5kUmVzcG9uc2UoZGV0YWlscyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS50eXBlID09PSBcIlNUQVJUX0ZJTExcIikge1xuICAgICAgY29uc29sZS5sb2coXCJbSm9iIFZlY3RhIEFJXSBSZWNlaXZlZCBTVEFSVF9GSUxMIGZvciBMaW5rZWRJblwiKTtcbiAgICAgIGlmICghbWVzc2FnZS5wcm9maWxlPy5wZXJzb25hbCkge1xuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogXCJGSUxMX0VSUk9SXCIsXG4gICAgICAgICAgZXJyb3I6IFwiUHJvZmlsZSBkYXRhIGlzIGluY29tcGxldGUuIFBsZWFzZSByZS1vcGVuIHRoZSBleHRlbnNpb24gYW5kIHNhdmUgeW91ciBwcm9maWxlLlwiLFxuICAgICAgICAgIGpvYlVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgIH0pO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGFydGVkOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBmaWxsTGlua2VkaW5Gb3JtKG1lc3NhZ2UucHJvZmlsZSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXJ0ZWQ6IHRydWUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIltKb2IgVmVjdGEgQUldIOKdjCBGaWxsIGZhaWxlZDpcIiwgZXJyKTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGFydGVkOiBmYWxzZSB9KTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gYXN5bmMgcmVzcG9uc2VcbiAgICB9XG4gIH1cbik7XG5cbi8qIC0tLS0gUGFnZSBMb2FkIC0tLS0gKi9cblxuY29uc29sZS5sb2coXCJbSm9iIFZlY3RhIEFJXSDw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