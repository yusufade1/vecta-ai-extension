import { l as API_URL, s as apiClient, u as APP_URL } from "./auth-R0qBMroa.js";
import { a as PROVIDER_GROUPS, i as refreshProviders, r as getActiveProviders } from "./ats-detector-CroP96wW.js";
import { E as __toESM, T as require_react, a as Trash2, n as require_jsx_dev_runtime, p as LoaderCircle, t as showToast, u as RefreshCw, v as ExternalLink, w as createLucideIcon, y as CircleAlert } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Earth = createLucideIcon("earth", [
	["path", {
		d: "M21.54 15H17a2 2 0 0 0-2 2v4.54",
		key: "1djwo0"
	}],
	["path", {
		d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
		key: "1tzkfa"
	}],
	["path", {
		d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",
		key: "14pb5j"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Shield = createLucideIcon("shield", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}]]);
//#endregion
//#region src/content/cookie-mapper.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function mapChromeToPlaywrightCookie(cookie) {
	return {
		name: cookie.name,
		value: cookie.value,
		domain: cookie.domain,
		path: cookie.path,
		secure: cookie.secure,
		httpOnly: cookie.httpOnly,
		sameSite: {
			"lax": "Lax",
			"strict": "Strict",
			"no_restriction": "None",
			"unspecified": "Lax"
		}[cookie.sameSite] || "None",
		expires: cookie.expirationDate ? cookie.expirationDate : -1
	};
}
//#endregion
//#region src/popup/components/ConnectionsTab.tsx
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/ConnectionsTab.tsx";
var BROWSER_SYNC_URL = `${APP_URL}/profile?tab=browser`;
function openBrowserSyncTab() {
	if (typeof chrome !== "undefined" && chrome.tabs?.create) chrome.tabs.create({ url: BROWSER_SYNC_URL });
	else window.open(BROWSER_SYNC_URL, "_blank");
}
var BRAND_ICONS = {
	linkedin: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 28,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 5
	}, void 0),
	indeed: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12.6 1.5c-4.2 0-7.6 3.4-7.6 7.6 0 1.5.4 2.8 1.2 4-2.1 2.3-4.2 5.1-4.2 8.9h3.7c0-2.8 1.7-5.1 3.5-7.1 1 .5 2.1.8 3.4.8 4.2 0 7.6-3.4 7.6-7.6s-3.4-6.6-7.6-6.6zm0 10.8c-2.3 0-4.2-1.9-4.2-4.2S10.3 3.9 12.6 3.9s4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 33,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 5
	}, void 0),
	glassdoor: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2V7h2v10zm4 0h-2V7h2v10z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 5
	}, void 0),
	builtin: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M5 4h6.5c2.5 0 4.5 1.5 4.5 3.8 0 1.4-.8 2.6-2 3.2 1.6.6 2.5 2 2.5 3.8 0 2.6-2.2 4.2-5 4.2H5V4zm3.5 5.5h3c1 0 1.8-.6 1.8-1.5s-.8-1.5-1.8-1.5H8.5v3zm0 6h3.5c1.1 0 2-.7 2-1.7s-.9-1.7-2-1.7H8.5v3.4z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 5
	}, void 0),
	ziprecruiter: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 57 97",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M52.9 26.5c-.6-.2-1.3-.1-2 .1l-2.7.9V2.4c0-1.3-1.1-2.4-2.4-2.4H10.3C9 0 7.9 1.1 7.9 2.4v25.2l-2.7-.9c-.7-.2-1.4-.3-2-.1-1 .2-3.2 1.2-3.2 5.1v21c.3 1.8 1.5 3.9 4.2 3.9h9c.9 1.1 3.1 2.9 7.3 3.2.1 3.1 1.9 5.7 4.6 6.8v5.9c0 .1-.1.2-.2.2-12.6.4-20.6 4.4-22.9 5.7C.6 79.2.3 80.9.3 82v4.6c.1 1.6 1.4 2.9 3.1 2.9 1.5 0 2.8-1.3 2.9-2.8.1-1.5-.9-2.7-2.3-3.1-.1 0-.2-.1-.2-.2v-1.7c0-.4.2-.8.6-1 3.4-1.9 12.1-2.8 18.7-3.2H25c.1 0 .2.1.2.2.3 5.3.9 9.8 1.1 12.6h-.2c-1.1 0-2.1 1.3-2.1 3s1 3 2.1 3h4c1.1 0 2.1-1.3 2.1-3s-1-3-2.1-3h-.2s.7-7.3 1.1-12.6c0-.1.1-.2.2-.2h1.9c6.6.3 15.3 1.3 18.7 3.2.4.2.6.6.6 1v1.7c0 .1-.1.2-.2.2-1.4.3-2.4 1.6-2.3 3.1.1 1.5 1.4 2.8 2.9 2.8 1.6 0 3-1.2 3.1-2.9V82c0-1.1-.3-2.7-1.7-3.6-2.3-1.3-10.4-5.3-22.9-5.8-.1 0-.2-.1-.2-.2v-5.9c2.7-1.1 4.5-3.7 4.6-6.8 4.1-.3 6.3-2.2 7.3-3.2h9c2.7 0 3.9-2.1 4.2-3.9v-21c-.1-3.9-2.3-4.8-3.3-5.1zm-45 21.8l-4.1 3.1c-.1.1-.2 0-.2-.1V31.6c0-.8.1-1.8.5-1.7l3.6 1.2c.1 0 .2.2.2.3v16.9zm44.5 3.1l-4.1-3.1V31.5c0-.1.1-.2.2-.3l3.6-1.2c.5-.1.5.9.5 1.7v19.7s-.1.1-.2 0z"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 48,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 5
	}, void 0),
	workable: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		className: "w-4 h-4 fill-white",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M19.167 4.02v4.802h-4.802V4.02h4.802zm-6.002 0v4.802H8.363V4.02h4.802zM7.161 4.02v4.802H2.36V4.02h4.801zm12.006 6.002v4.803h-4.802v-4.803h4.802zm-6.002 0v4.803H8.363v-4.803h4.802zm-6.002 0v4.803H2.36v-4.803h4.801zm12.006 6.003v4.802h-4.802v-4.802h4.802zm-6.002 0v4.802H8.363v-4.802h4.802zm-6.002 0v4.802H2.36v-4.802h4.801z" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 56,
		columnNumber: 5
	}, void 0)
};
async function getExtensionCsrfToken() {
	return (await chrome.cookies.get({
		url: API_URL,
		name: "csrftoken"
	}) || await chrome.cookies.get({
		url: API_URL,
		name: "__Secure-csrftoken"
	}))?.value;
}
/** Render the accent with child icon or monogram */
function Accent({ color, className, children }) {
	if (color.startsWith("#")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className,
		style: { backgroundColor: color },
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `${className} ${color}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
function ProviderIcon({ provider, size = "md" }) {
	const icon = BRAND_ICONS[provider.id.toLowerCase()];
	const initials = provider.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
	const sizeClasses = size === "sm" ? "w-6 h-6 rounded-md text-[10px]" : "w-8 h-8 rounded-lg text-xs";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accent, {
		color: provider.color,
		className: `${sizeClasses} flex items-center justify-center text-white font-black shadow-sm shrink-0`,
		children: icon || /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: initials }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 16
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 5
	}, this);
}
function SectionEyebrow({ label }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
		className: "text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-1.5 select-none",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 127,
		columnNumber: 5
	}, this);
}
var ConnectionsTab = () => {
	const [syncing, setSyncing] = (0, import_react.useState)(null);
	const [invalidating, setInvalidating] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const [providers, setProviders] = (0, import_react.useState)([]);
	const [sessionsMap, setSessionsMap] = (0, import_react.useState)({});
	const loadSessions = (0, import_react.useCallback)(async () => {
		try {
			const payload = (await apiClient.get("/api/browser-sessions/")).data || [];
			const map = {};
			for (const item of payload) if (item.has_session) map[item.platform] = {
				hasSession: item.has_session,
				isValid: item.is_valid,
				updatedAt: item.updated_at
			};
			setSessionsMap(map);
			await chrome.storage.local.set({ synced_sessions: map });
		} catch {
			chrome.storage.local.get("synced_sessions", (res) => {
				if (res.synced_sessions) setSessionsMap(res.synced_sessions);
			});
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		getActiveProviders().then((list) => {
			if (active) setProviders(list);
		});
		refreshProviders().then((list) => {
			if (active) setProviders(list);
		});
		loadSessions();
		return () => {
			active = false;
		};
	}, [loadSessions]);
	const syncProviders = providers.filter((p) => p.supportsSync);
	const invalidatePlatform = async (provider) => {
		setInvalidating(provider.id);
		setError(null);
		try {
			const stored = await chrome.storage.local.get(["token", "sessionToken"]);
			const authToken = stored.sessionToken || stored.token;
			const csrfToken = await getExtensionCsrfToken();
			const headers = { "Content-Type": "application/json" };
			if (authToken) {
				headers["X-Session-Token"] = authToken;
				headers.Authorization = `Bearer ${authToken}`;
			}
			if (csrfToken) headers["X-CSRFToken"] = csrfToken;
			const res = await fetch(`${API_URL}/api/browser-sessions/invalidate/`, {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify({ platform: provider.id })
			});
			if (res.ok) {
				const updated = { ...sessionsMap };
				delete updated[provider.id.toLowerCase()];
				setSessionsMap(updated);
				await chrome.storage.local.set({ synced_sessions: updated });
				showToast(`Disconnected ${provider.name} session`, "success");
			} else {
				const errorPayload = await res.json().catch(() => ({}));
				const errorMessage = errorPayload?.error || errorPayload?.detail || `Failed to disconnect ${provider.name}. Backend returned ${res.status}`;
				throw new Error(errorMessage);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Disconnect failed";
			setError(msg);
			showToast(msg, "error");
		} finally {
			setInvalidating(null);
		}
	};
	const syncPlatform = async (provider) => {
		if (!provider.cookieDomain) return;
		const domain = provider.cookieDomain;
		setSyncing(provider.id);
		setError(null);
		try {
			const [domainCookies, dottedDomainCookies] = await Promise.all([chrome.cookies.getAll({ domain }), chrome.cookies.getAll({ domain: `.${domain}` })]);
			const cookiesMap = /* @__PURE__ */ new Map();
			[...domainCookies, ...dottedDomainCookies].forEach((cookie) => {
				const key = `${cookie.name}|${cookie.domain}|${cookie.path}`;
				cookiesMap.set(key, cookie);
			});
			const cookies = Array.from(cookiesMap.values());
			if (cookies.length === 0) throw new Error(`No cookies found for ${domain}. Please log into ${provider.name} in this browser first, then try syncing.`);
			const pwCookies = cookies.map(mapChromeToPlaywrightCookie);
			const metadata = {
				user_agent: navigator.userAgent,
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight
				},
				screen: {
					width: screen.width,
					height: screen.height
				},
				language: navigator.language,
				languages: Array.from(navigator.languages),
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				platform: navigator.platform,
				hardware_concurrency: navigator.hardwareConcurrency,
				device_memory: navigator.deviceMemory
			};
			const stored = await chrome.storage.local.get(["token", "sessionToken"]);
			const authToken = stored.sessionToken || stored.token;
			const csrfToken = await getExtensionCsrfToken();
			const headers = { "Content-Type": "application/json" };
			if (authToken) {
				headers["X-Session-Token"] = authToken;
				headers.Authorization = `Bearer ${authToken}`;
			}
			if (csrfToken) headers["X-CSRFToken"] = csrfToken;
			const res = await fetch(`${API_URL}/api/browser-sessions/sync/`, {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify({
					platform: provider.id,
					cookies: pwCookies,
					metadata
				})
			});
			if (res.ok) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				const updated = {
					...sessionsMap,
					[provider.id.toLowerCase()]: {
						platform: provider.id,
						hasSession: true,
						isValid: true,
						updatedAt: now
					}
				};
				setSessionsMap(updated);
				await chrome.storage.local.set({ synced_sessions: updated });
				showToast(`Successfully synced ${provider.name} session!`, "success");
			} else {
				const errorPayload = await res.json().catch(() => ({}));
				const errorMessage = errorPayload?.error || errorPayload?.detail || `Failed to sync ${provider.name}. Backend returned ${res.status}`;
				throw new Error(errorMessage);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Sync failed";
			setError(msg);
			showToast(msg, "error");
		} finally {
			setSyncing(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 pb-4 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-base font-bold text-foreground",
					children: "Cloud Sync"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 357,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] font-mono text-muted-foreground/80",
					children: "Sync browser sessions for autonomous AI applications"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 358,
					columnNumber: 11
				}, void 0)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 356,
					columnNumber: 9
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: openBrowserSyncTab,
					title: "Open Browser Sync in Web App",
					className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all border border-primary/20 shrink-0 cursor-pointer shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Web Settings" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 368,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 12 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 369,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 362,
					columnNumber: 9
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 355,
				columnNumber: 7
			}, void 0),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 flex items-start gap-3 shadow-xs border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { size: 16 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 375,
						columnNumber: 11
					}, void 0)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 374,
					columnNumber: 9
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] font-medium leading-relaxed text-muted-foreground",
						children: "Syncing session cookies allows Vecta AI agents to apply on your behalf through your own authenticated accounts safely."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 378,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: openBrowserSyncTab,
						className: "mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:opacity-85 transition-opacity cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Manage connected sessions on Web" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 386,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 11 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 387,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 381,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 377,
					columnNumber: 9
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 373,
				columnNumber: 7
			}, void 0),
			error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-[11px] font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, {
					size: 14,
					className: "mt-0.5 shrink-0"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 394,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: error }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 395,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 393,
				columnNumber: 9
			}, void 0),
			PROVIDER_GROUPS.map((group) => {
				const list = syncProviders.filter((p) => p.group === group.id);
				if (list.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionEyebrow, { label: group.label }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 406,
							columnNumber: 15
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[10px] text-muted-foreground/80 font-medium -mt-1 mb-2",
							children: group.description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 407,
							columnNumber: 15
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 405,
						columnNumber: 13
					}, void 0), list.map((p) => {
						const isConnected = !!sessionsMap[p.id.toLowerCase()]?.hasSession;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full glass-card p-3 flex items-center justify-between gap-2 hover:border-primary/40 transition-all group shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProviderIcon, {
									provider: p,
									size: "md"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 419,
									columnNumber: 21
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-left min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs font-bold text-foreground truncate",
											children: p.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 422,
											columnNumber: 25
										}, void 0), isConnected && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 425,
												columnNumber: 29
											}, void 0), "Connected"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 424,
											columnNumber: 27
										}, void 0)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 421,
										columnNumber: 23
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[10px] font-mono text-muted-foreground truncate",
										children: p.cookieDomain
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 430,
										columnNumber: 23
									}, void 0)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 21
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 418,
								columnNumber: 19
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 shrink-0",
								children: [isConnected && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => invalidatePlatform(p),
									disabled: invalidating !== null || syncing !== null,
									title: `Disconnect ${p.name} session`,
									"aria-label": `Disconnect ${p.name} session`,
									className: "p-1.5 rounded-xl text-xs font-bold text-muted-foreground/70 hover:text-destructive hover:bg-destructive/10 border border-border/50 hover:border-destructive/30 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 shrink-0",
									children: invalidating === p.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, {
										size: 13,
										className: "animate-spin text-destructive"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 445,
										columnNumber: 27
									}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 13 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 447,
										columnNumber: 27
									}, void 0)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 436,
									columnNumber: 23
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => syncPlatform(p),
									disabled: syncing !== null || invalidating !== null,
									className: `px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0 whitespace-nowrap ${isConnected ? "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary border border-border/50" : "bg-primary text-primary-foreground hover:opacity-95 shadow-xs"}`,
									children: syncing === p.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {
										size: 13,
										className: "animate-spin"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 463,
										columnNumber: 27
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Syncing..." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 464,
										columnNumber: 27
									}, void 0)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 462,
										columnNumber: 25
									}, void 0) : isConnected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {
										size: 13,
										className: "group-hover:rotate-180 transition-transform duration-300"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 27
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Re-sync" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 27
									}, void 0)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 25
									}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { size: 13 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 473,
										columnNumber: 27
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sync" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 474,
										columnNumber: 27
									}, void 0)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 472,
										columnNumber: 25
									}, void 0)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 451,
									columnNumber: 21
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 19
							}, void 0)]
						}, p.id, true, {
							fileName: _jsxFileName,
							lineNumber: 414,
							columnNumber: 17
						}, void 0);
					})]
				}, group.id, true, {
					fileName: _jsxFileName,
					lineNumber: 404,
					columnNumber: 11
				}, void 0);
			}),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setShowAll((v) => !v),
					className: "w-full glass-card p-3 flex items-center justify-between hover:border-primary/40 transition-all cursor-pointer shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-8 h-8 rounded-xl bg-secondary/80 flex items-center justify-center text-foreground border border-border/40",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Earth, {
								size: 16,
								strokeWidth: 2
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 495,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 494,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "All supported sites"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 498,
								columnNumber: 15
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] font-mono text-muted-foreground",
								children: [
									syncProviders.length,
									" syncable · ",
									PROVIDER_GROUPS.length,
									" groups"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 15
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 497,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 493,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
						size: 16,
						className: `text-muted-foreground transition-transform duration-200 ${showAll ? "rotate-180" : ""}`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 504,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 488,
					columnNumber: 9
				}, void 0), showAll && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-2.5 space-y-3",
					children: [PROVIDER_GROUPS.map((group) => {
						const list = providers.filter((p) => p.group === group.id);
						if (list.length === 0) return null;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionEyebrow, { label: group.label }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 517,
								columnNumber: 19
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-1.5 px-0.5",
								children: list.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/60 border border-border/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProviderIcon, {
											provider: p,
											size: "sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 524,
											columnNumber: 25
										}, void 0),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] font-semibold text-foreground",
											children: p.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 525,
											columnNumber: 25
										}, void 0),
										p.supportsSync && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[8px] font-bold text-emerald-600 uppercase font-mono",
											children: "sync"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 527,
											columnNumber: 27
										}, void 0)
									]
								}, p.id, true, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 23
								}, void 0))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 518,
								columnNumber: 19
							}, void 0)]
						}, group.id, true, {
							fileName: _jsxFileName,
							lineNumber: 516,
							columnNumber: 17
						}, void 0);
					}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "px-1 text-[9px] font-mono text-muted-foreground leading-relaxed",
						children: [
							"Platforms tagged ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-emerald-600 uppercase",
								children: "sync"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 536,
								columnNumber: 32
							}, void 0),
							" can store a synced session on the backend. Others are detected automatically for auto-fill and job tracking."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 535,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 511,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 487,
				columnNumber: 7
			}, void 0)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 354,
		columnNumber: 5
	}, void 0);
};
//#endregion
export { ConnectionsTab };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvbnNUYWItWjlSOFpFbTUuanMiLCJuYW1lcyI6WyJfX2ljb25Ob2RlIiwiX19pY29uTm9kZSJdLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2hldnJvbi1kb3duLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZWFydGgubWpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zaGllbGQubWpzIiwiLi4vLi4vc3JjL2NvbnRlbnQvY29va2llLW1hcHBlci50cyIsIi4uLy4uL3NyYy9wb3B1cC9jb21wb25lbnRzL0Nvbm5lY3Rpb25zVGFiLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MS4zMS4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLm1qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbW1wicGF0aFwiLCB7IGQ6IFwibTYgOSA2IDYgNi02XCIsIGtleTogXCJxcnVuc2xcIiB9XV07XG5jb25zdCBDaGV2cm9uRG93biA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaGV2cm9uLWRvd25cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENoZXZyb25Eb3duIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZXZyb24tZG93bi5tanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MS4zMS4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLm1qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMS41NCAxNUgxN2EyIDIgMCAwIDAtMiAydjQuNTRcIiwga2V5OiBcIjFkandvMFwiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNyAzLjM0VjVhMyAzIDAgMCAwIDMgM2EyIDIgMCAwIDEgMiAyYzAgMS4xLjkgMiAyIDJhMiAyIDAgMCAwIDItMmMwLTEuMS45LTIgMi0yaDMuMTdcIixcbiAgICAgIGtleTogXCIxdHprZmFcIlxuICAgIH1cbiAgXSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTExIDIxLjk1VjE4YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAxLTItMnYtMWEyIDIgMCAwIDAtMi0ySDIuMDVcIiwga2V5OiBcIjE0cGI1alwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjEwXCIsIGtleTogXCIxbWdsYXlcIiB9XVxuXTtcbmNvbnN0IEVhcnRoID0gY3JlYXRlTHVjaWRlSWNvbihcImVhcnRoXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBFYXJ0aCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lYXJ0aC5tanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MS4zMS4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLm1qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0yMCAxM2MwIDUtMy41IDcuNS03LjY2IDguOTVhMSAxIDAgMCAxLS42Ny0uMDFDNy41IDIwLjUgNCAxOCA0IDEzVjZhMSAxIDAgMCAxIDEtMWMyIDAgNC41LTEuMiA2LjI0LTIuNzJhMS4xNyAxLjE3IDAgMCAxIDEuNTIgMEMxNC41MSAzLjgxIDE3IDUgMTkgNWExIDEgMCAwIDEgMSAxelwiLFxuICAgICAga2V5OiBcIm9lbDQxeVwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU2hpZWxkID0gY3JlYXRlTHVjaWRlSWNvbihcInNoaWVsZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2hpZWxkIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoaWVsZC5tanMubWFwXG4iLCIvLyBleHRlbnNpb24vc3JjL2NvbnRlbnQvY29va2llLW1hcHBlci50c1xuZXhwb3J0IGZ1bmN0aW9uIG1hcENocm9tZVRvUGxheXdyaWdodENvb2tpZShjb29raWU6IGNocm9tZS5jb29raWVzLkNvb2tpZSk6IGFueSB7XG4gIGNvbnN0IHNhbWVTaXRlTWFwOiBSZWNvcmQ8c3RyaW5nLCBcIlN0cmljdFwiIHwgXCJMYXhcIiB8IFwiTm9uZVwiPiA9IHtcbiAgICAnbGF4JzogJ0xheCcsXG4gICAgJ3N0cmljdCc6ICdTdHJpY3QnLFxuICAgICdub19yZXN0cmljdGlvbic6ICdOb25lJyxcbiAgICAndW5zcGVjaWZpZWQnOiAnTGF4J1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogY29va2llLm5hbWUsXG4gICAgdmFsdWU6IGNvb2tpZS52YWx1ZSxcbiAgICBkb21haW46IGNvb2tpZS5kb21haW4sXG4gICAgcGF0aDogY29va2llLnBhdGgsXG4gICAgc2VjdXJlOiBjb29raWUuc2VjdXJlLFxuICAgIGh0dHBPbmx5OiBjb29raWUuaHR0cE9ubHksXG4gICAgc2FtZVNpdGU6IHNhbWVTaXRlTWFwW2Nvb2tpZS5zYW1lU2l0ZV0gfHwgJ05vbmUnLFxuICAgIGV4cGlyZXM6IGNvb2tpZS5leHBpcmF0aW9uRGF0ZSA/IGNvb2tpZS5leHBpcmF0aW9uRGF0ZSA6IC0xIC8vIC0xIGZvciBzZXNzaW9uIGNvb2tpZXNcbiAgfTtcbn1cbiIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWFwQ2hyb21lVG9QbGF5d3JpZ2h0Q29va2llIH0gZnJvbSAnLi4vLi4vY29udGVudC9jb29raWUtbWFwcGVyJztcbmltcG9ydCB7IFJlZnJlc2hDdywgQWxlcnRDaXJjbGUsIFNoaWVsZCwgQ2hldnJvbkRvd24sIEdsb2JlMiwgRXh0ZXJuYWxMaW5rLCBUcmFzaDIsIExvYWRlcjIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgUFJPVklERVJfR1JPVVBTIH0gZnJvbSAnLi4vLi4vbGliL3Byb3ZpZGVycyc7XG5cbmltcG9ydCB7XG4gIGdldEFjdGl2ZVByb3ZpZGVycyxcbiAgcmVmcmVzaFByb3ZpZGVycyxcbiAgdHlwZSBBY3RpdmVQcm92aWRlcixcbn0gZnJvbSAnLi4vLi4vbGliL3Byb3ZpZGVyU3luYyc7XG5pbXBvcnQgeyBhcGlDbGllbnQgfSBmcm9tICcuLi8uLi9saWIvYXV0aCc7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuLi8uLi9saWIvdG9hc3QnO1xuaW1wb3J0IHsgQVBJX1VSTCwgQVBQX1VSTCB9IGZyb20gJy4uLy4uL2xpYi9lbnYnO1xuXG5jb25zdCBCUk9XU0VSX1NZTkNfVVJMID0gYCR7QVBQX1VSTH0vcHJvZmlsZT90YWI9YnJvd3NlcmA7XG5cbmZ1bmN0aW9uIG9wZW5Ccm93c2VyU3luY1RhYigpIHtcbiAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS50YWJzPy5jcmVhdGUpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IEJST1dTRVJfU1lOQ19VUkwgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93Lm9wZW4oQlJPV1NFUl9TWU5DX1VSTCwgJ19ibGFuaycpO1xuICB9XG59XG5cbmNvbnN0IEJSQU5EX0lDT05TOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdE5vZGU+ID0ge1xuICBsaW5rZWRpbjogKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC13aGl0ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHBhdGggZD1cIk0xOSAzYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE0bS0uNSAxNS41di01LjNhMy4yNiAzLjI2IDAgMCAwLTMuMjYtMy4yNmMtLjg1IDAtMS44NC41Mi0yLjI4IDEuM3YtMS4xMWgtMi43OXY4LjM3aDIuNzl2LTQuOTNjMC0uNzcuNjItMS40IDEuMzktMS40YTEuNCAxLjQgMCAwIDEgMS40IDEuNHY0LjkzaDIuNzVNNi40NiAxMC45djguMzdIOS4yVjEwLjlINi40Nk03LjgzIDYuNjRhMS42NiAxLjY2IDAgMCAwLTEuNjYgMS42NiAxLjY2IDEuNjYgMCAwIDAgMS42NiAxLjY2IDEuNjYgMS42NiAwIDAgMCAxLjY2LTEuNjZjMC0uOTItLjc0LTEuNjYtMS42Ni0xLjY2WlwiIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIGluZGVlZDogKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC13aGl0ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHBhdGggZD1cIk0xMi42IDEuNWMtNC4yIDAtNy42IDMuNC03LjYgNy42IDAgMS41LjQgMi44IDEuMiA0LTIuMSAyLjMtNC4yIDUuMS00LjIgOC45aDMuN2MwLTIuOCAxLjctNS4xIDMuNS03LjEgMSAuNSAyLjEuOCAzLjQuOCA0LjIgMCA3LjYtMy40IDcuNi03LjZzLTMuNC02LjYtNy42LTYuNnptMCAxMC44Yy0yLjMgMC00LjItMS45LTQuMi00LjJTMTAuMyAzLjkgMTIuNiAzLjlzNC4yIDEuOSA0LjIgNC4yLTEuOSA0LjItNC4yIDQuMnpcIiAvPlxuICAgIDwvc3ZnPlxuICApLFxuICBnbGFzc2Rvb3I6IChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtd2hpdGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTEgMTVoLTJWN2gydjEwem00IDBoLTJWN2gydjEwelwiIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIGJ1aWx0aW46IChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtd2hpdGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxwYXRoIGQ9XCJNNSA0aDYuNWMyLjUgMCA0LjUgMS41IDQuNSAzLjggMCAxLjQtLjggMi42LTIgMy4yIDEuNi42IDIuNSAyIDIuNSAzLjggMCAyLjYtMi4yIDQuMi01IDQuMkg1VjR6bTMuNSA1LjVoM2MxIDAgMS44LS42IDEuOC0xLjVzLS44LTEuNS0xLjgtMS41SDguNXYzem0wIDZoMy41YzEuMSAwIDItLjcgMi0xLjdzLS45LTEuNy0yLTEuN0g4LjV2My40elwiIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIHppcHJlY3J1aXRlcjogKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCA1NyA5N1wiIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC13aGl0ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbFJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgY2xpcFJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgZD1cIk01Mi45IDI2LjVjLS42LS4yLTEuMy0uMS0yIC4xbC0yLjcuOVYyLjRjMC0xLjMtMS4xLTIuNC0yLjQtMi40SDEwLjNDOSAwIDcuOSAxLjEgNy45IDIuNHYyNS4ybC0yLjctLjljLS43LS4yLTEuNC0uMy0yLS4xLTEgLjItMy4yIDEuMi0zLjIgNS4xdjIxYy4zIDEuOCAxLjUgMy45IDQuMiAzLjloOWMuOSAxLjEgMy4xIDIuOSA3LjMgMy4yLjEgMy4xIDEuOSA1LjcgNC42IDYuOHY1LjljMCAuMS0uMS4yLS4yLjItMTIuNi40LTIwLjYgNC40LTIyLjkgNS43Qy42IDc5LjIuMyA4MC45LjMgODJ2NC42Yy4xIDEuNiAxLjQgMi45IDMuMSAyLjkgMS41IDAgMi44LTEuMyAyLjktMi44LjEtMS41LS45LTIuNy0yLjMtMy4xLS4xIDAtLjItLjEtLjItLjJ2LTEuN2MwLS40LjItLjguNi0xIDMuNC0xLjkgMTIuMS0yLjggMTguNy0zLjJIMjVjLjEgMCAuMi4xLjIuMi4zIDUuMy45IDkuOCAxLjEgMTIuNmgtLjJjLTEuMSAwLTIuMSAxLjMtMi4xIDNzMSAzIDIuMSAzaDRjMS4xIDAgMi4xLTEuMyAyLjEtM3MtMS0zLTIuMS0zaC0uMnMuNy03LjMgMS4xLTEyLjZjMC0uMS4xLS4yLjItLjJoMS45YzYuNi4zIDE1LjMgMS4zIDE4LjcgMy4yLjQuMi42LjYuNiAxdjEuN2MwIC4xLS4xLjItLjIuMi0xLjQuMy0yLjQgMS42LTIuMyAzLjEuMSAxLjUgMS40IDIuOCAyLjkgMi44IDEuNiAwIDMtMS4yIDMuMS0yLjlWODJjMC0xLjEtLjMtMi43LTEuNy0zLjYtMi4zLTEuMy0xMC40LTUuMy0yMi45LTUuOC0uMSAwLS4yLS4xLS4yLS4ydi01LjljMi43LTEuMSA0LjUtMy43IDQuNi02LjggNC4xLS4zIDYuMy0yLjIgNy4zLTMuMmg5YzIuNyAwIDMuOS0yLjEgNC4yLTMuOXYtMjFjLS4xLTMuOS0yLjMtNC44LTMuMy01LjF6bS00NSAyMS44bC00LjEgMy4xYy0uMS4xLS4yIDAtLjItLjFWMzEuNmMwLS44LjEtMS44LjUtMS43bDMuNiAxLjJjLjEgMCAuMi4yLjIuM3YxNi45em00NC41IDMuMWwtNC4xLTMuMVYzMS41YzAtLjEuMS0uMi4yLS4zbDMuNi0xLjJjLjUtLjEuNS45LjUgMS43djE5LjdzLS4xLjEtLjIgMHpcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd29ya2FibGU6IChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtd2hpdGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTkuMTY3IDQuMDJ2NC44MDJoLTQuODAyVjQuMDJoNC44MDJ6bS02LjAwMiAwdjQuODAySDguMzYzVjQuMDJoNC44MDJ6TTcuMTYxIDQuMDJ2NC44MDJIMi4zNlY0LjAyaDQuODAxem0xMi4wMDYgNi4wMDJ2NC44MDNoLTQuODAydi00LjgwM2g0LjgwMnptLTYuMDAyIDB2NC44MDNIOC4zNjN2LTQuODAzaDQuODAyem0tNi4wMDIgMHY0LjgwM0gyLjM2di00LjgwM2g0LjgwMXptMTIuMDA2IDYuMDAzdjQuODAyaC00LjgwMnYtNC44MDJoNC44MDJ6bS02LjAwMiAwdjQuODAySDguMzYzdi00LjgwMmg0LjgwMnptLTYuMDAyIDB2NC44MDJIMi4zNnYtNC44MDJoNC44MDF6XCIgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV4dGVuc2lvbkNzcmZUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBjb29raWUgPVxuICAgIChhd2FpdCBjaHJvbWUuY29va2llcy5nZXQoeyB1cmw6IEFQSV9VUkwsIG5hbWU6ICdjc3JmdG9rZW4nIH0pKSB8fFxuICAgIChhd2FpdCBjaHJvbWUuY29va2llcy5nZXQoeyB1cmw6IEFQSV9VUkwsIG5hbWU6ICdfX1NlY3VyZS1jc3JmdG9rZW4nIH0pKTtcbiAgcmV0dXJuIGNvb2tpZT8udmFsdWU7XG59XG5cbi8qKiBSZW5kZXIgdGhlIGFjY2VudCB3aXRoIGNoaWxkIGljb24gb3IgbW9ub2dyYW0gKi9cbmZ1bmN0aW9uIEFjY2VudCh7XG4gIGNvbG9yLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufToge1xuICBjb2xvcjogc3RyaW5nO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG59KSB7XG4gIGlmIChjb2xvci5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvciB9fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ake2NsYXNzTmFtZX0gJHtjb2xvcn1gfT57Y2hpbGRyZW59PC9kaXY+O1xufVxuXG5mdW5jdGlvbiBQcm92aWRlckljb24oe1xuICBwcm92aWRlcixcbiAgc2l6ZSA9ICdtZCcsXG59OiB7XG4gIHByb3ZpZGVyOiBBY3RpdmVQcm92aWRlcjtcbiAgc2l6ZT86ICdzbScgfCAnbWQnO1xufSkge1xuICBjb25zdCBpY29uID0gQlJBTkRfSUNPTlNbcHJvdmlkZXIuaWQudG9Mb3dlckNhc2UoKV07XG4gIGNvbnN0IGluaXRpYWxzID0gcHJvdmlkZXIubmFtZVxuICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgLm1hcCgodykgPT4gd1swXSlcbiAgICAuam9pbignJylcbiAgICAuc2xpY2UoMCwgMilcbiAgICAudG9VcHBlckNhc2UoKTtcblxuICBjb25zdCBzaXplQ2xhc3NlcyA9XG4gICAgc2l6ZSA9PT0gJ3NtJ1xuICAgICAgPyAndy02IGgtNiByb3VuZGVkLW1kIHRleHQtWzEwcHhdJ1xuICAgICAgOiAndy04IGgtOCByb3VuZGVkLWxnIHRleHQteHMnO1xuXG4gIHJldHVybiAoXG4gICAgPEFjY2VudFxuICAgICAgY29sb3I9e3Byb3ZpZGVyLmNvbG9yfVxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3Nlc30gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC13aGl0ZSBmb250LWJsYWNrIHNoYWRvdy1zbSBzaHJpbmstMGB9XG4gICAgPlxuICAgICAge2ljb24gfHwgPHNwYW4+e2luaXRpYWxzfTwvc3Bhbj59XG4gICAgPC9BY2NlbnQ+XG4gICk7XG59XG5cbmludGVyZmFjZSBTZXNzaW9uSW5mbyB7XG4gIGhhc1Nlc3Npb246IGJvb2xlYW47XG4gIGlzVmFsaWQ6IGJvb2xlYW47XG4gIHVwZGF0ZWRBdD86IHN0cmluZztcbn1cblxuZnVuY3Rpb24gU2VjdGlvbkV5ZWJyb3coeyBsYWJlbCB9OiB7IGxhYmVsOiBzdHJpbmcgfSkge1xuICByZXR1cm4gKFxuICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC84MCBtYi0xLjUgc2VsZWN0LW5vbmVcIj5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2gzPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgQ29ubmVjdGlvbnNUYWIgPSAoKSA9PiB7XG4gIGNvbnN0IFtzeW5jaW5nLCBzZXRTeW5jaW5nXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaW52YWxpZGF0aW5nLCBzZXRJbnZhbGlkYXRpbmddID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93QWxsLCBzZXRTaG93QWxsXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3Byb3ZpZGVycywgc2V0UHJvdmlkZXJzXSA9IHVzZVN0YXRlPEFjdGl2ZVByb3ZpZGVyW10+KFtdKTtcbiAgY29uc3QgW3Nlc3Npb25zTWFwLCBzZXRTZXNzaW9uc01hcF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBTZXNzaW9uSW5mbz4+KHt9KTtcblxuICBjb25zdCBsb2FkU2Vzc2lvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpQ2xpZW50LmdldDxcbiAgICAgICAgQXJyYXk8e1xuICAgICAgICAgIHBsYXRmb3JtOiBzdHJpbmc7XG4gICAgICAgICAgaGFzX3Nlc3Npb246IGJvb2xlYW47XG4gICAgICAgICAgaXNfdmFsaWQ6IGJvb2xlYW47XG4gICAgICAgICAgdXBkYXRlZF9hdD86IHN0cmluZztcbiAgICAgICAgfT5cbiAgICAgID4oJy9hcGkvYnJvd3Nlci1zZXNzaW9ucy8nKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHJlc3BvbnNlLmRhdGEgfHwgW107XG4gICAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIFNlc3Npb25JbmZvPiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKGl0ZW0uaGFzX3Nlc3Npb24pIHtcbiAgICAgICAgICBtYXBbaXRlbS5wbGF0Zm9ybV0gPSB7XG4gICAgICAgICAgICBoYXNTZXNzaW9uOiBpdGVtLmhhc19zZXNzaW9uLFxuICAgICAgICAgICAgaXNWYWxpZDogaXRlbS5pc192YWxpZCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogaXRlbS51cGRhdGVkX2F0LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFNlc3Npb25zTWFwKG1hcCk7XG4gICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzeW5jZWRfc2Vzc2lvbnM6IG1hcCB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcbiAgICAgICAgJ3N5bmNlZF9zZXNzaW9ucycsXG4gICAgICAgIChyZXM6IHsgc3luY2VkX3Nlc3Npb25zPzogUmVjb3JkPHN0cmluZywgU2Vzc2lvbkluZm8+IH0pID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN5bmNlZF9zZXNzaW9ucykge1xuICAgICAgICAgICAgc2V0U2Vzc2lvbnNNYXAocmVzLnN5bmNlZF9zZXNzaW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBQdWxsIHByb3ZpZGVyIGRpcmVjdG9yeSBhbmQgZXhpc3Rpbmcgc3luY2VkIHNlc3Npb25zIGZyb20gYmFja2VuZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuICAgIGdldEFjdGl2ZVByb3ZpZGVycygpLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgIGlmIChhY3RpdmUpIHNldFByb3ZpZGVycyhsaXN0KTtcbiAgICB9KTtcbiAgICByZWZyZXNoUHJvdmlkZXJzKCkudGhlbigobGlzdCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZSkgc2V0UHJvdmlkZXJzKGxpc3QpO1xuICAgIH0pO1xuICAgIGxvYWRTZXNzaW9ucygpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbbG9hZFNlc3Npb25zXSk7XG5cbiAgY29uc3Qgc3luY1Byb3ZpZGVycyA9IHByb3ZpZGVycy5maWx0ZXIoKHApID0+IHAuc3VwcG9ydHNTeW5jKTtcblxuICBjb25zdCBpbnZhbGlkYXRlUGxhdGZvcm0gPSBhc3luYyAocHJvdmlkZXI6IEFjdGl2ZVByb3ZpZGVyKSA9PiB7XG4gICAgc2V0SW52YWxpZGF0aW5nKHByb3ZpZGVyLmlkKTtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZWQgPSAoYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsndG9rZW4nLCAnc2Vzc2lvblRva2VuJ10pKSBhcyB7XG4gICAgICAgIHRva2VuPzogc3RyaW5nO1xuICAgICAgICBzZXNzaW9uVG9rZW4/OiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgY29uc3QgYXV0aFRva2VuID0gc3RvcmVkLnNlc3Npb25Ub2tlbiB8fCBzdG9yZWQudG9rZW47XG4gICAgICBjb25zdCBjc3JmVG9rZW4gPSBhd2FpdCBnZXRFeHRlbnNpb25Dc3JmVG9rZW4oKTtcblxuICAgICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH07XG5cbiAgICAgIGlmIChhdXRoVG9rZW4pIHtcbiAgICAgICAgaGVhZGVyc1snWC1TZXNzaW9uLVRva2VuJ10gPSBhdXRoVG9rZW47XG4gICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthdXRoVG9rZW59YDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNzcmZUb2tlbikge1xuICAgICAgICBoZWFkZXJzWydYLUNTUkZUb2tlbiddID0gY3NyZlRva2VuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfS9hcGkvYnJvd3Nlci1zZXNzaW9ucy9pbnZhbGlkYXRlL2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwbGF0Zm9ybTogcHJvdmlkZXIuaWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4uc2Vzc2lvbnNNYXAgfTtcbiAgICAgICAgZGVsZXRlIHVwZGF0ZWRbcHJvdmlkZXIuaWQudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIHNldFNlc3Npb25zTWFwKHVwZGF0ZWQpO1xuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzeW5jZWRfc2Vzc2lvbnM6IHVwZGF0ZWQgfSk7XG4gICAgICAgIHNob3dUb2FzdChgRGlzY29ubmVjdGVkICR7cHJvdmlkZXIubmFtZX0gc2Vzc2lvbmAsICdzdWNjZXNzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvclBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAgIGVycm9yUGF5bG9hZD8uZXJyb3IgfHxcbiAgICAgICAgICBlcnJvclBheWxvYWQ/LmRldGFpbCB8fFxuICAgICAgICAgIGBGYWlsZWQgdG8gZGlzY29ubmVjdCAke3Byb3ZpZGVyLm5hbWV9LiBCYWNrZW5kIHJldHVybmVkICR7cmVzLnN0YXR1c31gO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRGlzY29ubmVjdCBmYWlsZWQnO1xuICAgICAgc2V0RXJyb3IobXNnKTtcbiAgICAgIHNob3dUb2FzdChtc2csICdlcnJvcicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbnZhbGlkYXRpbmcobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN5bmNQbGF0Zm9ybSA9IGFzeW5jIChwcm92aWRlcjogQWN0aXZlUHJvdmlkZXIpID0+IHtcbiAgICBpZiAoIXByb3ZpZGVyLmNvb2tpZURvbWFpbikgcmV0dXJuO1xuICAgIGNvbnN0IGRvbWFpbiA9IHByb3ZpZGVyLmNvb2tpZURvbWFpbjtcbiAgICBzZXRTeW5jaW5nKHByb3ZpZGVyLmlkKTtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBbZG9tYWluQ29va2llcywgZG90dGVkRG9tYWluQ29va2llc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGNocm9tZS5jb29raWVzLmdldEFsbCh7IGRvbWFpbiB9KSxcbiAgICAgICAgY2hyb21lLmNvb2tpZXMuZ2V0QWxsKHsgZG9tYWluOiBgLiR7ZG9tYWlufWAgfSksXG4gICAgICBdKTtcblxuICAgICAgY29uc3QgY29va2llc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBjaHJvbWUuY29va2llcy5Db29raWU+KCk7XG4gICAgICBbLi4uZG9tYWluQ29va2llcywgLi4uZG90dGVkRG9tYWluQ29va2llc10uZm9yRWFjaCgoY29va2llKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGAke2Nvb2tpZS5uYW1lfXwke2Nvb2tpZS5kb21haW59fCR7Y29va2llLnBhdGh9YDtcbiAgICAgICAgY29va2llc01hcC5zZXQoa2V5LCBjb29raWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvb2tpZXMgPSBBcnJheS5mcm9tKGNvb2tpZXNNYXAudmFsdWVzKCkpO1xuICAgICAgaWYgKGNvb2tpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTm8gY29va2llcyBmb3VuZCBmb3IgJHtkb21haW59LiBQbGVhc2UgbG9nIGludG8gJHtwcm92aWRlci5uYW1lfSBpbiB0aGlzIGJyb3dzZXIgZmlyc3QsIHRoZW4gdHJ5IHN5bmNpbmcuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHdDb29raWVzID0gY29va2llcy5tYXAobWFwQ2hyb21lVG9QbGF5d3JpZ2h0Q29va2llKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSB7XG4gICAgICAgIHVzZXJfYWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgIHZpZXdwb3J0OiB7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfSxcbiAgICAgICAgc2NyZWVuOiB7IHdpZHRoOiBzY3JlZW4ud2lkdGgsIGhlaWdodDogc2NyZWVuLmhlaWdodCB9LFxuICAgICAgICBsYW5ndWFnZTogbmF2aWdhdG9yLmxhbmd1YWdlLFxuICAgICAgICBsYW5ndWFnZXM6IEFycmF5LmZyb20obmF2aWdhdG9yLmxhbmd1YWdlcyksXG4gICAgICAgIHRpbWV6b25lOiBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUsXG4gICAgICAgIHBsYXRmb3JtOiBuYXZpZ2F0b3IucGxhdGZvcm0sXG4gICAgICAgIGhhcmR3YXJlX2NvbmN1cnJlbmN5OiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSxcbiAgICAgICAgZGV2aWNlX21lbW9yeTogKG5hdmlnYXRvciBhcyBhbnkpLmRldmljZU1lbW9yeSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0b3JlZCA9IChhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWyd0b2tlbicsICdzZXNzaW9uVG9rZW4nXSkpIGFzIHtcbiAgICAgICAgdG9rZW4/OiBzdHJpbmc7XG4gICAgICAgIHNlc3Npb25Ub2tlbj86IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCBhdXRoVG9rZW4gPSBzdG9yZWQuc2Vzc2lvblRva2VuIHx8IHN0b3JlZC50b2tlbjtcbiAgICAgIGNvbnN0IGNzcmZUb2tlbiA9IGF3YWl0IGdldEV4dGVuc2lvbkNzcmZUb2tlbigpO1xuXG4gICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfTtcblxuICAgICAgaWYgKGF1dGhUb2tlbikge1xuICAgICAgICBoZWFkZXJzWydYLVNlc3Npb24tVG9rZW4nXSA9IGF1dGhUb2tlbjtcbiAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2F1dGhUb2tlbn1gO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3NyZlRva2VuKSB7XG4gICAgICAgIGhlYWRlcnNbJ1gtQ1NSRlRva2VuJ10gPSBjc3JmVG9rZW47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0FQSV9VUkx9L2FwaS9icm93c2VyLXNlc3Npb25zL3N5bmMvYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHBsYXRmb3JtOiBwcm92aWRlci5pZCxcbiAgICAgICAgICBjb29raWVzOiBwd0Nvb2tpZXMsXG4gICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICBjb25zdCB1cGRhdGVkID0ge1xuICAgICAgICAgIC4uLnNlc3Npb25zTWFwLFxuICAgICAgICAgIFtwcm92aWRlci5pZC50b0xvd2VyQ2FzZSgpXToge1xuICAgICAgICAgICAgcGxhdGZvcm06IHByb3ZpZGVyLmlkLFxuICAgICAgICAgICAgaGFzU2Vzc2lvbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IG5vdyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBzZXRTZXNzaW9uc01hcCh1cGRhdGVkKTtcbiAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgc3luY2VkX3Nlc3Npb25zOiB1cGRhdGVkIH0pO1xuICAgICAgICBzaG93VG9hc3QoYFN1Y2Nlc3NmdWxseSBzeW5jZWQgJHtwcm92aWRlci5uYW1lfSBzZXNzaW9uIWAsICdzdWNjZXNzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvclBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAgIGVycm9yUGF5bG9hZD8uZXJyb3IgfHxcbiAgICAgICAgICBlcnJvclBheWxvYWQ/LmRldGFpbCB8fFxuICAgICAgICAgIGBGYWlsZWQgdG8gc3luYyAke3Byb3ZpZGVyLm5hbWV9LiBCYWNrZW5kIHJldHVybmVkICR7cmVzLnN0YXR1c31gO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnU3luYyBmYWlsZWQnO1xuICAgICAgc2V0RXJyb3IobXNnKTtcbiAgICAgIHNob3dUb2FzdChtc2csICdlcnJvcicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTeW5jaW5nKG51bGwpO1xuICAgIH1cbiAgfTtcblxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgcGItNCBzZWxlY3Qtbm9uZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5DbG91ZCBTeW5jPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzgwXCI+XG4gICAgICAgICAgICBTeW5jIGJyb3dzZXIgc2Vzc2lvbnMgZm9yIGF1dG9ub21vdXMgQUkgYXBwbGljYXRpb25zXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e29wZW5Ccm93c2VyU3luY1RhYn1cbiAgICAgICAgICB0aXRsZT1cIk9wZW4gQnJvd3NlciBTeW5jIGluIFdlYiBBcHBcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xLjUgcm91bmRlZC14bCB0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1wcmltYXJ5IGJnLXByaW1hcnkvMTAgaG92ZXI6YmctcHJpbWFyeS8xNSB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXByaW1hcnkvMjAgc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXIgc2hhZG93LTJ4c1wiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj5XZWIgU2V0dGluZ3M8L3NwYW4+XG4gICAgICAgICAgPEV4dGVybmFsTGluayBzaXplPXsxMn0gLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zIHNoYWRvdy14cyBib3JkZXItYm9yZGVyLzYwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcHJpbWFyeSBzaHJpbmstMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgICAgPFNoaWVsZCBzaXplPXsxNn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tZWRpdW0gbGVhZGluZy1yZWxheGVkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgU3luY2luZyBzZXNzaW9uIGNvb2tpZXMgYWxsb3dzIFZlY3RhIEFJIGFnZW50cyB0byBhcHBseSBvbiB5b3VyIGJlaGFsZiB0aHJvdWdoIHlvdXIgb3duIGF1dGhlbnRpY2F0ZWQgYWNjb3VudHMgc2FmZWx5LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5Ccm93c2VyU3luY1RhYn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTIgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgaG92ZXI6b3BhY2l0eS04NSB0cmFuc2l0aW9uLW9wYWNpdHkgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPk1hbmFnZSBjb25uZWN0ZWQgc2Vzc2lvbnMgb24gV2ViPC9zcGFuPlxuICAgICAgICAgICAgPEV4dGVybmFsTGluayBzaXplPXsxMX0gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIHAtMyBiZy1kZXN0cnVjdGl2ZS8xMCBib3JkZXIgYm9yZGVyLWRlc3RydWN0aXZlLzIwIHJvdW5kZWQteGwgdGV4dC1kZXN0cnVjdGl2ZSB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bVwiPlxuICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNH0gY2xhc3NOYW1lPVwibXQtMC41IHNocmluay0wXCIgLz5cbiAgICAgICAgICA8c3Bhbj57ZXJyb3J9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBTeW5jYWJsZSBwbGF0Zm9ybXMsIGdyb3VwZWQgYnkgdHlwZSAqL31cbiAgICAgIHtQUk9WSURFUl9HUk9VUFMubWFwKChncm91cCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ID0gc3luY1Byb3ZpZGVycy5maWx0ZXIoKHApID0+IHAuZ3JvdXAgPT09IGdyb3VwLmlkKTtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGtleT17Z3JvdXAuaWR9IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0wLjVcIj5cbiAgICAgICAgICAgICAgPFNlY3Rpb25FeWVicm93IGxhYmVsPXtncm91cC5sYWJlbH0gLz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzgwIGZvbnQtbWVkaXVtIC1tdC0xIG1iLTJcIj57Z3JvdXAuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7bGlzdC5tYXAoKHApID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHNlc3Npb25zTWFwW3AuaWQudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gISFzZXNzaW9uPy5oYXNTZXNzaW9uO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAga2V5PXtwLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGdsYXNzLWNhcmQgcC0zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBob3Zlcjpib3JkZXItcHJpbWFyeS80MCB0cmFuc2l0aW9uLWFsbCBncm91cCBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBtaW4tdy0wIGZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8UHJvdmlkZXJJY29uIHByb3ZpZGVyPXtwfSBzaXplPVwibWRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdCBtaW4tdy0wIGZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCB0cnVuY2F0ZVwiPntwLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzQ29ubmVjdGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTEuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzlweF0gZm9udC1ib2xkIGJnLWVtZXJhbGQtNTAwLzEwIHRleHQtZW1lcmFsZC02MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8yMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMCBzaGFkb3ctWzBfMF82cHhfcmdiYSgxNiwxODUsMTI5LDAuNSldXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25uZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRydW5jYXRlXCI+e3AuY29va2llRG9tYWlufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpc0Nvbm5lY3RlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBpbnZhbGlkYXRlUGxhdGZvcm0ocCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aW52YWxpZGF0aW5nICE9PSBudWxsIHx8IHN5bmNpbmcgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YERpc2Nvbm5lY3QgJHtwLm5hbWV9IHNlc3Npb25gfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YERpc2Nvbm5lY3QgJHtwLm5hbWV9IHNlc3Npb25gfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LW11dGVkLWZvcmVncm91bmQvNzAgaG92ZXI6dGV4dC1kZXN0cnVjdGl2ZSBob3ZlcjpiZy1kZXN0cnVjdGl2ZS8xMCBib3JkZXIgYm9yZGVyLWJvcmRlci81MCBob3Zlcjpib3JkZXItZGVzdHJ1Y3RpdmUvMzAgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgZGlzYWJsZWQ6b3BhY2l0eS01MCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ludmFsaWRhdGluZyA9PT0gcC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRlcjIgc2l6ZT17MTN9IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiB0ZXh0LWRlc3RydWN0aXZlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgc2l6ZT17MTN9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc3luY1BsYXRmb3JtKHApfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtzeW5jaW5nICE9PSBudWxsIHx8IGludmFsaWRhdGluZyAhPT0gbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMS41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwIHNocmluay0wIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Nvbm5lY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zZWNvbmRhcnkgdGV4dC1zZWNvbmRhcnktZm9yZWdyb3VuZCBob3ZlcjpiZy1wcmltYXJ5LzEwIGhvdmVyOnRleHQtcHJpbWFyeSBib3JkZXIgYm9yZGVyLWJvcmRlci81MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcHJpbWFyeSB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZCBob3ZlcjpvcGFjaXR5LTk1IHNoYWRvdy14cydcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtzeW5jaW5nID09PSBwLmlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBzaXplPXsxM30gY2xhc3NOYW1lPVwiYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+U3luY2luZy4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBpc0Nvbm5lY3RlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgc2l6ZT17MTN9IGNsYXNzTmFtZT1cImdyb3VwLWhvdmVyOnJvdGF0ZS0xODAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmUtc3luYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IHNpemU9ezEzfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TeW5jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSl9XG5cbiAgICAgIHsvKiBDb2xsYXBzaWJsZSBmdWxsIGRpcmVjdG9yeSBvZiBzdXBwb3J0ZWQgc2l0ZXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTFcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dBbGwoKHYpID0+ICF2KX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZ2xhc3MtY2FyZCBwLTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1wcmltYXJ5LzQwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdy14c1wiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1zZWNvbmRhcnkvODAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1mb3JlZ3JvdW5kIGJvcmRlciBib3JkZXItYm9yZGVyLzQwXCI+XG4gICAgICAgICAgICAgIDxHbG9iZTIgc2l6ZT17MTZ9IHN0cm9rZVdpZHRoPXsyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5BbGwgc3VwcG9ydGVkIHNpdGVzPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICAgICAge3N5bmNQcm92aWRlcnMubGVuZ3RofSBzeW5jYWJsZSDCtyB7UFJPVklERVJfR1JPVVBTLmxlbmd0aH0gZ3JvdXBzXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxDaGV2cm9uRG93blxuICAgICAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LW11dGVkLWZvcmVncm91bmQgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwICR7c2hvd0FsbCA/ICdyb3RhdGUtMTgwJyA6ICcnfWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAge3Nob3dBbGwgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMi41IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAge1BST1ZJREVSX0dST1VQUy5tYXAoKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBwcm92aWRlcnMuZmlsdGVyKChwKSA9PiBwLmdyb3VwID09PSBncm91cC5pZCk7XG4gICAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2dyb3VwLmlkfSBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPFNlY3Rpb25FeWVicm93IGxhYmVsPXtncm91cC5sYWJlbH0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNSBweC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAge2xpc3QubWFwKChwKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIgcHktMSByb3VuZGVkLWxnIGJnLXNlY29uZGFyeS82MCBib3JkZXIgYm9yZGVyLWJvcmRlci80MFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFByb3ZpZGVySWNvbiBwcm92aWRlcj17cH0gc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+e3AubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cC5zdXBwb3J0c1N5bmMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIGZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNjAwIHVwcGVyY2FzZSBmb250LW1vbm9cIj5zeW5jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInB4LTEgdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBQbGF0Zm9ybXMgdGFnZ2VkIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNjAwIHVwcGVyY2FzZVwiPnN5bmM8L3NwYW4+IGNhbiBzdG9yZSBhXG4gICAgICAgICAgICAgIHN5bmNlZCBzZXNzaW9uIG9uIHRoZSBiYWNrZW5kLiBPdGhlcnMgYXJlIGRldGVjdGVkIGF1dG9tYXRpY2FsbHkgZm9yIGF1dG8tZmlsbCBhbmQgam9iXG4gICAgICAgICAgICAgIHRyYWNraW5nLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFVQSxJQUFNLGNBQWMsaUJBQWlCLGdCQUFnQkEsQ0FEakMsQ0FBQyxRQUFRO0NBQUUsR0FBRztDQUFnQixLQUFLO0FBQVMsQ0FBQyxDQUNaQSxDQUFVOzs7Ozs7O0FDVy9ELElBQU0sUUFBUSxpQkFBaUIsU0FBU0M7Q0FYdEMsQ0FBQyxRQUFRO0VBQUUsR0FBRztFQUFtQyxLQUFLO0NBQVMsQ0FBQztDQUNoRSxDQUNFLFFBQ0E7RUFDRSxHQUFHO0VBQ0gsS0FBSztDQUNQLENBQ0Y7Q0FDQSxDQUFDLFFBQVE7RUFBRSxHQUFHO0VBQWtFLEtBQUs7Q0FBUyxDQUFDO0NBQy9GLENBQUMsVUFBVTtFQUFFLElBQUk7RUFBTSxJQUFJO0VBQU0sR0FBRztFQUFNLEtBQUs7Q0FBUyxDQUFDO0FBRW5CQSxDQUFVOzs7Ozs7O0FDSGxELElBQU0sU0FBUyxpQkFBaUIsVUFBVSxDQVJ4QyxDQUNFLFFBQ0E7Q0FDRSxHQUFHO0NBQ0gsS0FBSztBQUNQLENBQ0YsQ0FFd0MsQ0FBVTs7OztBQ2pCcEQsU0FBZ0IsNEJBQTRCLFFBQW9DO0NBUTlFLE9BQU87RUFDTCxNQUFNLE9BQU87RUFDYixPQUFPLE9BQU87RUFDZCxRQUFRLE9BQU87RUFDZixN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