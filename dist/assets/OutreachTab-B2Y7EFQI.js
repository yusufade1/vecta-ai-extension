import { t as Building2 } from "./building-2-CSFUp-6s.js";
import { t as Clock } from "./clock-Ce6g0cew.js";
import { t as Copy } from "./copy-D0hvuU8f.js";
import { c as apiFetch } from "./auth-R0qBMroa.js";
import { E as __toESM, T as require_react, _ as FileText, a as Trash2, c as Send, d as MessageSquare, i as User, n as require_jsx_dev_runtime, v as ExternalLink, w as createLucideIcon, x as Check, y as CircleAlert } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PenTool = createLucideIcon("pen-tool", [
	["path", {
		d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
		key: "nt11vn"
	}],
	["path", {
		d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
		key: "15qc1e"
	}],
	["path", {
		d: "m2.3 2.3 7.286 7.286",
		key: "1wuzzi"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "2",
		key: "xmgehs"
	}]
]);
//#endregion
//#region src/popup/components/OutreachTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/OutreachTab.tsx";
var LINKEDIN_MAX_CHARS = 300;
var HISTORY_STORAGE_KEY = "outreach_history";
var CONTACT_TYPES = [
	{
		id: "recruiter",
		label: "Recruiter",
		description: "Company recruiter or TA specialist"
	},
	{
		id: "hiring_manager",
		label: "Hiring Manager",
		description: "Team lead or department head"
	},
	{
		id: "peer",
		label: "Peer",
		description: "Future teammate or peer"
	},
	{
		id: "interviewer",
		label: "Interviewer",
		description: "Someone who interviewed you"
	}
];
function OutreachTab() {
	const [contactType, setContactType] = (0, import_react.useState)("recruiter");
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [jobTitle, setJobTitle] = (0, import_react.useState)("");
	const [jdSnippet, setJdSnippet] = (0, import_react.useState)("");
	const [contactName, setContactName] = (0, import_react.useState)("");
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		chrome.storage.local.get(HISTORY_STORAGE_KEY, (data) => {
			const items = data[HISTORY_STORAGE_KEY] || [];
			setHistory(items);
		});
	}, []);
	const saveToHistory = (0, import_react.useCallback)((item) => {
		const historyItem = {
			...item,
			id: Date.now().toString(),
			timestamp: Date.now()
		};
		chrome.storage.local.get(HISTORY_STORAGE_KEY, (data) => {
			const existing = data[HISTORY_STORAGE_KEY] || [];
			const updated = [historyItem, ...existing].slice(0, 50);
			chrome.storage.local.set({ [HISTORY_STORAGE_KEY]: updated });
			setHistory(updated);
		});
	}, []);
	const clearHistory = (0, import_react.useCallback)(() => {
		chrome.storage.local.remove(HISTORY_STORAGE_KEY);
		setHistory([]);
	}, []);
	const handleGenerate = async () => {
		if (!companyName.trim()) {
			setError("Company name is required.");
			return;
		}
		setGenerating(true);
		setError(null);
		setResult(null);
		setCopied(false);
		try {
			const body = {
				company_name: companyName.trim(),
				contact_type: contactType,
				contact_name: contactName.trim()
			};
			if (jobTitle.trim()) body.job_title = jobTitle.trim();
			if (jdSnippet.trim()) body.jd_snippet = jdSnippet.trim();
			const response = await apiFetch("/api/outreach/generate/", {
				method: "POST",
				body: JSON.stringify(body)
			});
			const data = response.data || response;
			const message = {
				message: data.message,
				char_count: data.char_count,
				contact_type: data.contact_type,
				framework_used: data.framework_used
			};
			setResult(message);
			saveToHistory(message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to generate message.");
		} finally {
			setGenerating(false);
		}
	};
	const handleCopy = async () => {
		if (!result?.message) return;
		try {
			await navigator.clipboard.writeText(result.message);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			const textArea = document.createElement("textarea");
			textArea.value = result.message;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	const handleOpenLinkedIn = () => {
		chrome.tabs.create({ url: "https://www.linkedin.com" });
	};
	const formatTime = (ts) => {
		const d = new Date(ts);
		const diffMs = (/* @__PURE__ */ new Date()).getTime() - d.getTime();
		const diffHrs = Math.floor(diffMs / 36e5);
		if (diffHrs < 1) return "Just now";
		if (diffHrs < 24) return `${diffHrs}h ago`;
		const diffDays = Math.floor(diffHrs / 24);
		if (diffDays < 7) return `${diffDays}d ago`;
		return d.toLocaleDateString();
	};
	const charCount = result?.char_count ?? 0;
	const charRemaining = LINKEDIN_MAX_CHARS - charCount;
	const isOverLimit = charCount > LINKEDIN_MAX_CHARS;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-lg font-bold text-surface-900",
				children: "LinkedIn Outreach"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 172,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-surface-500 font-medium",
				children: "Draft personalised connection request messages"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 173,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-foreground text-xs font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, {
							size: 14,
							className: "text-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Draft Outreach Message" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground",
							children: "Contact Type"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-2",
							children: CONTACT_TYPES.map((ct) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setContactType(ct.id),
								className: `p-2.5 rounded-2xl border text-left transition-all cursor-pointer shadow-2xs ${contactType === ct.id ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary/40 border-border/50 text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
										size: 12,
										className: contactType === ct.id ? "text-primary" : "text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] font-bold",
										children: ct.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[9px] text-muted-foreground mt-0.5 leading-tight",
									children: ct.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 17
								}, this)]
							}, ct.id, true, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { size: 10 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 217,
									columnNumber: 13
								}, this),
								" Company Name ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-destructive",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 217,
									columnNumber: 50
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: companyName,
							onChange: (e) => setCompanyName(e.target.value),
							placeholder: "e.g. Acme Corp",
							className: "input-field"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { size: 10 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 13
								}, this),
								" Contact Name ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground/60",
									children: "(optional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 45
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: contactName,
							onChange: (e) => setContactName(e.target.value),
							placeholder: "e.g. Jane Smith",
							className: "input-field"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { size: 10 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 13
								}, this),
								" Job Title ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground/60",
									children: "(optional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 42
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: jobTitle,
							onChange: (e) => setJobTitle(e.target.value),
							placeholder: "e.g. Senior Software Engineer",
							className: "input-field"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 10 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 13
								}, this),
								" Job Description ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground/60",
									children: "(optional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 52
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 258,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							value: jdSnippet,
							onChange: (e) => setJdSnippet(e.target.value),
							placeholder: "Paste a snippet from the job description to personalise the message...",
							rows: 3,
							className: "input-field resize-none leading-relaxed"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: handleGenerate,
						disabled: generating || !companyName.trim(),
						className: "btn-primary w-full py-2.5 flex items-center justify-center gap-2 shadow-xs",
						children: generating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 279,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Generating..." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 13
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenTool, { size: 15 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Generate Message" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 285,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 283,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 271,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 7
			}, this),
			error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-2.5 p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, {
					size: 16,
					className: "mt-0.5 shrink-0"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 294,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: error }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 296,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 295,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 9
			}, this),
			result && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3 animate-fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xs font-bold text-foreground",
							children: "Generated Message"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${isOverLimit ? "bg-destructive/10 text-destructive border-destructive/20" : charRemaining < 50 ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}`,
							children: [
								charCount,
								"/",
								LINKEDIN_MAX_CHARS
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 306,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 304,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-secondary/40 rounded-2xl p-3.5 border border-border/50",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words",
							children: result.message
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 320,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleCopy,
							className: `flex-1 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${copied ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-secondary/60 border-border/60 hover:border-primary/40 text-foreground"}`,
							children: copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
								size: 14,
								strokeWidth: 3
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copied!" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copy Message" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 326,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleOpenLinkedIn,
							className: "flex-1 py-2 rounded-2xl border border-border/60 bg-secondary/60 hover:border-primary/40 text-foreground text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Open LinkedIn" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 354,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 348,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 325,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-[9px] text-muted-foreground font-mono text-center",
						children: ["Target: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "capitalize font-bold text-foreground",
							children: result.contact_type.replace("_", " ")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 359,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 358,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 303,
				columnNumber: 9
			}, this),
			!result && !error && !generating && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center py-5 space-y-2 glass-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-10 h-10 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center mx-auto text-primary shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { size: 16 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 368,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 367,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground font-medium",
					children: "Fill in the details above to draft a high-converting LinkedIn message."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 370,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 366,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 text-xs font-bold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, {
							size: 14,
							className: "text-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 380,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "History" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 381,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 379,
						columnNumber: 11
					}, this), history.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: clearHistory,
						className: "flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-destructive transition-all cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 12 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 389,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Clear" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 384,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 378,
					columnNumber: 9
				}, this), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center py-3",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground font-medium",
						children: "No messages generated yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 397,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 396,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2 max-h-[260px] overflow-y-auto",
					children: history.slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-3 rounded-2xl bg-secondary/40 border border-border/50 space-y-1.5 cursor-pointer hover:bg-secondary/70 transition-all shadow-2xs",
						onClick: () => {
							setResult({
								message: item.message,
								char_count: item.char_count,
								contact_type: item.contact_type,
								framework_used: item.framework_used
							});
							setError(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground",
										children: formatTime(item.timestamp)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 419,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[9px] text-muted-foreground/40",
										children: "|"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 422,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[9px] font-bold capitalize text-primary",
										children: item.contact_type.replace("_", " ")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 423,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 418,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[9px] font-mono text-muted-foreground",
								children: [item.char_count, "c"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 427,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 417,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-foreground/80 leading-relaxed line-clamp-2",
							children: item.message
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 431,
							columnNumber: 17
						}, this)]
					}, item.id, true, {
						fileName: _jsxFileName,
						lineNumber: 404,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 402,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 377,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 169,
		columnNumber: 5
	}, this);
}
//#endregion
export { OutreachTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0cmVhY2hUYWItQjJZN0VGUUkuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9wZW4tdG9vbC5tanMiLCIuLi8uLi9zcmMvcG9wdXAvY29tcG9uZW50cy9PdXRyZWFjaFRhYi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTUuNzA3IDIxLjI5M2ExIDEgMCAwIDEtMS40MTQgMGwtMS41ODYtMS41ODZhMSAxIDAgMCAxIDAtMS40MTRsNS41ODYtNS41ODZhMSAxIDAgMCAxIDEuNDE0IDBsMS41ODYgMS41ODZhMSAxIDAgMCAxIDAgMS40MTR6XCIsXG4gICAgICBrZXk6IFwibnQxMXZuXCJcbiAgICB9XG4gIF0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIm0xOCAxMy0xLjM3NS02Ljg3NGExIDEgMCAwIDAtLjc0Ni0uNzc2TDMuMjM1IDIuMDI4YTEgMSAwIDAgMC0xLjIwNyAxLjIwN0w1LjM1IDE1Ljg3OWExIDEgMCAwIDAgLjc3Ni43NDZMMTMgMThcIixcbiAgICAgIGtleTogXCIxNXFjMWVcIlxuICAgIH1cbiAgXSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTIuMyAyLjMgNy4yODYgNy4yODZcIiwga2V5OiBcIjF3dXp6aVwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMVwiLCBjeTogXCIxMVwiLCByOiBcIjJcIiwga2V5OiBcInhtZ2Voc1wiIH1dXG5dO1xuY29uc3QgUGVuVG9vbCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwZW4tdG9vbFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgUGVuVG9vbCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZW4tdG9vbC5tanMubWFwXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBPdXRyZWFjaCBUYWIgLSBMaW5rZWRJbiBNZXNzYWdlIENvbXBvc2VyXG5cbiAgIERyYWZ0cyBMaW5rZWRJbiBjb25uZWN0aW9uIHJlcXVlc3QgbWVzc2FnZXNcbiAgIHVzaW5nIHRoZSBiYWNrZW5kIExMTSBzZXJ2aWNlLCBzdG9yZXMgaGlzdG9yeVxuICAgbG9jYWxseSwgYW5kIHByb3ZpZGVzIGNvcHkvb3BlbiBhY3Rpb25zLlxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgTWVzc2FnZVNxdWFyZSxcbiAgQ29weSxcbiAgQ2hlY2ssXG4gIEV4dGVybmFsTGluayxcbiAgUGVuVG9vbCxcbiAgQ2xvY2ssXG4gIFRyYXNoMixcbiAgQWxlcnRDaXJjbGUsXG4gIFJlZnJlc2hDdyxcbiAgVXNlcixcbiAgQnVpbGRpbmcyLFxuICBGaWxlVGV4dCxcbiAgU2VuZCxcbn0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYXBpRmV0Y2ggfSBmcm9tIFwiLi4vLi4vbGliL2F1dGhcIjtcbmltcG9ydCB0eXBlIHsgT3V0cmVhY2hNZXNzYWdlLCBPdXRyZWFjaEhpc3RvcnlJdGVtIH0gZnJvbSBcIi4uLy4uL2xpYi90eXBlc1wiO1xuXG5jb25zdCBMSU5LRURJTl9NQVhfQ0hBUlMgPSAzMDA7XG5jb25zdCBISVNUT1JZX1NUT1JBR0VfS0VZID0gXCJvdXRyZWFjaF9oaXN0b3J5XCI7XG5cbmNvbnN0IENPTlRBQ1RfVFlQRVMgPSBbXG4gIHsgaWQ6IFwicmVjcnVpdGVyXCIsIGxhYmVsOiBcIlJlY3J1aXRlclwiLCBkZXNjcmlwdGlvbjogXCJDb21wYW55IHJlY3J1aXRlciBvciBUQSBzcGVjaWFsaXN0XCIgfSxcbiAgeyBpZDogXCJoaXJpbmdfbWFuYWdlclwiLCBsYWJlbDogXCJIaXJpbmcgTWFuYWdlclwiLCBkZXNjcmlwdGlvbjogXCJUZWFtIGxlYWQgb3IgZGVwYXJ0bWVudCBoZWFkXCIgfSxcbiAgeyBpZDogXCJwZWVyXCIsIGxhYmVsOiBcIlBlZXJcIiwgZGVzY3JpcHRpb246IFwiRnV0dXJlIHRlYW1tYXRlIG9yIHBlZXJcIiB9LFxuICB7IGlkOiBcImludGVydmlld2VyXCIsIGxhYmVsOiBcIkludGVydmlld2VyXCIsIGRlc2NyaXB0aW9uOiBcIlNvbWVvbmUgd2hvIGludGVydmlld2VkIHlvdVwiIH0sXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPdXRyZWFjaFRhYigpIHtcbiAgY29uc3QgW2NvbnRhY3RUeXBlLCBzZXRDb250YWN0VHlwZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwicmVjcnVpdGVyXCIpO1xuICBjb25zdCBbY29tcGFueU5hbWUsIHNldENvbXBhbnlOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbam9iVGl0bGUsIHNldEpvYlRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbamRTbmlwcGV0LCBzZXRKZFNuaXBwZXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjb250YWN0TmFtZSwgc2V0Q29udGFjdE5hbWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgW2dlbmVyYXRpbmcsIHNldEdlbmVyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gdXNlU3RhdGU8T3V0cmVhY2hNZXNzYWdlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjb3BpZWQsIHNldENvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgW2hpc3RvcnksIHNldEhpc3RvcnldID0gdXNlU3RhdGU8T3V0cmVhY2hIaXN0b3J5SXRlbVtdPihbXSk7XG5cbiAgLyogLS0tLSBMb2FkIGhpc3RvcnkgZnJvbSBzdG9yYWdlIC0tLS0gKi9cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoSElTVE9SWV9TVE9SQUdFX0tFWSwgKGRhdGE6IFJlY29yZDxzdHJpbmcsIE91dHJlYWNoSGlzdG9yeUl0ZW1bXSB8IHVuZGVmaW5lZD4pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1zOiBPdXRyZWFjaEhpc3RvcnlJdGVtW10gPSBkYXRhW0hJU1RPUllfU1RPUkFHRV9LRVldIHx8IFtdO1xuICAgICAgc2V0SGlzdG9yeShpdGVtcyk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzYXZlVG9IaXN0b3J5ID0gdXNlQ2FsbGJhY2soKGl0ZW06IE91dHJlYWNoTWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IGhpc3RvcnlJdGVtOiBPdXRyZWFjaEhpc3RvcnlJdGVtID0ge1xuICAgICAgLi4uaXRlbSxcbiAgICAgIGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoSElTVE9SWV9TVE9SQUdFX0tFWSwgKGRhdGE6IFJlY29yZDxzdHJpbmcsIE91dHJlYWNoSGlzdG9yeUl0ZW1bXSB8IHVuZGVmaW5lZD4pID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nOiBPdXRyZWFjaEhpc3RvcnlJdGVtW10gPSBkYXRhW0hJU1RPUllfU1RPUkFHRV9LRVldIHx8IFtdO1xuICAgICAgY29uc3QgdXBkYXRlZCA9IFtoaXN0b3J5SXRlbSwgLi4uZXhpc3RpbmddLnNsaWNlKDAsIDUwKTsgLy8gS2VlcCBsYXRlc3QgNTBcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtISVNUT1JZX1NUT1JBR0VfS0VZXTogdXBkYXRlZCB9KTtcbiAgICAgIHNldEhpc3RvcnkodXBkYXRlZCk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckhpc3RvcnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKEhJU1RPUllfU1RPUkFHRV9LRVkpO1xuICAgIHNldEhpc3RvcnkoW10pO1xuICB9LCBbXSk7XG5cbiAgLyogLS0tLSBHZW5lcmF0ZSBtZXNzYWdlIC0tLS0gKi9cbiAgY29uc3QgaGFuZGxlR2VuZXJhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFjb21wYW55TmFtZS50cmltKCkpIHtcbiAgICAgIHNldEVycm9yKFwiQ29tcGFueSBuYW1lIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRHZW5lcmF0aW5nKHRydWUpO1xuICAgIHNldEVycm9yKG51bGwpO1xuICAgIHNldFJlc3VsdChudWxsKTtcbiAgICBzZXRDb3BpZWQoZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJvZHk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIGNvbXBhbnlfbmFtZTogY29tcGFueU5hbWUudHJpbSgpLFxuICAgICAgICBjb250YWN0X3R5cGU6IGNvbnRhY3RUeXBlLFxuICAgICAgICBjb250YWN0X25hbWU6IGNvbnRhY3ROYW1lLnRyaW0oKSxcbiAgICAgIH07XG4gICAgICBpZiAoam9iVGl0bGUudHJpbSgpKSB7XG4gICAgICAgIGJvZHkuam9iX3RpdGxlID0gam9iVGl0bGUudHJpbSgpO1xuICAgICAgfVxuICAgICAgaWYgKGpkU25pcHBldC50cmltKCkpIHtcbiAgICAgICAgYm9keS5qZF9zbmlwcGV0ID0gamRTbmlwcGV0LnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlGZXRjaChcIi9hcGkvb3V0cmVhY2gvZ2VuZXJhdGUvXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwgcmVzcG9uc2U7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPdXRyZWFjaE1lc3NhZ2UgPSB7XG4gICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSxcbiAgICAgICAgY2hhcl9jb3VudDogZGF0YS5jaGFyX2NvdW50LFxuICAgICAgICBjb250YWN0X3R5cGU6IGRhdGEuY29udGFjdF90eXBlLFxuICAgICAgICBmcmFtZXdvcmtfdXNlZDogZGF0YS5mcmFtZXdvcmtfdXNlZCxcbiAgICAgIH07XG4gICAgICBzZXRSZXN1bHQobWVzc2FnZSk7XG4gICAgICBzYXZlVG9IaXN0b3J5KG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIG1lc3NhZ2UuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRHZW5lcmF0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLyogLS0tLSBDb3B5IHRvIGNsaXBib2FyZCAtLS0tICovXG4gIGNvbnN0IGhhbmRsZUNvcHkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFyZXN1bHQ/Lm1lc3NhZ2UpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgc2V0Q29waWVkKHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGxiYWNrIGZvciBleHRlbnNpb24gY29udGV4dFxuICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICB0ZXh0QXJlYS52YWx1ZSA9IHJlc3VsdC5tZXNzYWdlO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xuICAgICAgc2V0Q29waWVkKHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgLyogLS0tLSBPcGVuIExpbmtlZEluIC0tLS0gKi9cbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtlZEluID0gKCkgPT4ge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb21cIiB9KTtcbiAgfTtcblxuICAvKiAtLS0tIEZvcm1hdCB0aW1lc3RhbXAgLS0tLSAqL1xuICBjb25zdCBmb3JtYXRUaW1lID0gKHRzOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUodHMpO1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGlmZk1zID0gbm93LmdldFRpbWUoKSAtIGQuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRpZmZIcnMgPSBNYXRoLmZsb29yKGRpZmZNcyAvICgxMDAwICogNjAgKiA2MCkpO1xuXG4gICAgaWYgKGRpZmZIcnMgPCAxKSByZXR1cm4gXCJKdXN0IG5vd1wiO1xuICAgIGlmIChkaWZmSHJzIDwgMjQpIHJldHVybiBgJHtkaWZmSHJzfWggYWdvYDtcbiAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguZmxvb3IoZGlmZkhycyAvIDI0KTtcbiAgICBpZiAoZGlmZkRheXMgPCA3KSByZXR1cm4gYCR7ZGlmZkRheXN9ZCBhZ29gO1xuICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICB9O1xuXG4gIGNvbnN0IGNoYXJDb3VudCA9IHJlc3VsdD8uY2hhcl9jb3VudCA/PyAwO1xuICBjb25zdCBjaGFyUmVtYWluaW5nID0gTElOS0VESU5fTUFYX0NIQVJTIC0gY2hhckNvdW50O1xuICBjb25zdCBpc092ZXJMaW1pdCA9IGNoYXJDb3VudCA+IExJTktFRElOX01BWF9DSEFSUztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtc3VyZmFjZS05MDBcIj5MaW5rZWRJbiBPdXRyZWFjaDwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc3VyZmFjZS01MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICBEcmFmdCBwZXJzb25hbGlzZWQgY29ubmVjdGlvbiByZXF1ZXN0IG1lc3NhZ2VzXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIENvbXBvc2VyIFNlY3Rpb24g4pSA4pSAICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBzcGFjZS15LTMuNVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtZm9yZWdyb3VuZCB0ZXh0LXhzIGZvbnQtYm9sZFwiPlxuICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIHNpemU9ezE0fSBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgIDxzcGFuPkRyYWZ0IE91dHJlYWNoIE1lc3NhZ2U8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb250YWN0IFR5cGUgU2VsZWN0b3IgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICBDb250YWN0IFR5cGVcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAge0NPTlRBQ1RfVFlQRVMubWFwKChjdCkgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAga2V5PXtjdC5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDb250YWN0VHlwZShjdC5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC0yeGwgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctMnhzICR7XG4gICAgICAgICAgICAgICAgICBjb250YWN0VHlwZSA9PT0gY3QuaWRcbiAgICAgICAgICAgICAgICAgICAgPyBcImJnLXByaW1hcnkvMTAgYm9yZGVyLXByaW1hcnkvMzAgdGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgOiBcImJnLXNlY29uZGFyeS80MCBib3JkZXItYm9yZGVyLzUwIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmRcIlxuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8VXNlciBzaXplPXsxMn0gY2xhc3NOYW1lPXtjb250YWN0VHlwZSA9PT0gY3QuaWQgPyBcInRleHQtcHJpbWFyeVwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmRcIn0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZFwiPntjdC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgbXQtMC41IGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIHtjdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb21wYW55IE5hbWUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgPEJ1aWxkaW5nMiBzaXplPXsxMH0gLz4gQ29tcGFueSBOYW1lIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZGVzdHJ1Y3RpdmVcIj4qPC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17Y29tcGFueU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbXBhbnlOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBBY21lIENvcnBcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtZmllbGRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb250YWN0IE5hbWUgKG9wdGlvbmFsKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8VXNlciBzaXplPXsxMH0gLz4gQ29udGFjdCBOYW1lIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZC82MFwiPihvcHRpb25hbCk8L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtjb250YWN0TmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29udGFjdE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIEphbmUgU21pdGhcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtZmllbGRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBKb2IgVGl0bGUgKG9wdGlvbmFsKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8VXNlciBzaXplPXsxMH0gLz4gSm9iIFRpdGxlIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZC82MFwiPihvcHRpb25hbCk8L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtqb2JUaXRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Sm9iVGl0bGUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIFNlbmlvciBTb2Z0d2FyZSBFbmdpbmVlclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC1maWVsZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEpEIFNuaXBwZXQgKG9wdGlvbmFsKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8RmlsZVRleHQgc2l6ZT17MTB9IC8+IEpvYiBEZXNjcmlwdGlvbiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQvNjBcIj4ob3B0aW9uYWwpPC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICB2YWx1ZT17amRTbmlwcGV0fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRKZFNuaXBwZXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYXN0ZSBhIHNuaXBwZXQgZnJvbSB0aGUgam9iIGRlc2NyaXB0aW9uIHRvIHBlcnNvbmFsaXNlIHRoZSBtZXNzYWdlLi4uXCJcbiAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCByZXNpemUtbm9uZSBsZWFkaW5nLXJlbGF4ZWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBHZW5lcmF0ZSBCdXR0b24gKi99XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZX1cbiAgICAgICAgICBkaXNhYmxlZD17Z2VuZXJhdGluZyB8fCAhY29tcGFueU5hbWUudHJpbSgpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5IHctZnVsbCBweS0yLjUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LXhzXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtnZW5lcmF0aW5nID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTQgaC00IGJvcmRlci0yIGJvcmRlci1wcmltYXJ5LWZvcmVncm91bmQgYm9yZGVyLXQtdHJhbnNwYXJlbnQgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkdlbmVyYXRpbmcuLi48L3NwYW4+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFBlblRvb2wgc2l6ZT17MTV9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPkdlbmVyYXRlIE1lc3NhZ2U8L3NwYW4+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIEVycm9yIFN0YXRlIOKUgOKUgCAqL31cbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMi41IHAtMyByb3VuZGVkLTJ4bCBiZy1kZXN0cnVjdGl2ZS8xMCBib3JkZXIgYm9yZGVyLWRlc3RydWN0aXZlLzIwIHRleHQtZGVzdHJ1Y3RpdmUgdGV4dC14cyBmb250LXNlbWlib2xkIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNn0gY2xhc3NOYW1lPVwibXQtMC41IHNocmluay0wXCIgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHA+e2Vycm9yfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7Lyog4pSA4pSAIFJlc3VsdCDilIDilIAgKi99XG4gICAgICB7cmVzdWx0ICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBzcGFjZS15LTMgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5HZW5lcmF0ZWQgTWVzc2FnZTwvaDM+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICBpc092ZXJMaW1pdFxuICAgICAgICAgICAgICAgICAgPyBcImJnLWRlc3RydWN0aXZlLzEwIHRleHQtZGVzdHJ1Y3RpdmUgYm9yZGVyLWRlc3RydWN0aXZlLzIwXCJcbiAgICAgICAgICAgICAgICAgIDogY2hhclJlbWFpbmluZyA8IDUwXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1hbWJlci01MDAvMTAgdGV4dC1hbWJlci02MDAgYm9yZGVyLWFtYmVyLTUwMC8yMFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJiZy1lbWVyYWxkLTUwMC8xMCB0ZXh0LWVtZXJhbGQtNjAwIGJvcmRlci1lbWVyYWxkLTUwMC8yMFwiXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hhckNvdW50fS97TElOS0VESU5fTUFYX0NIQVJTfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnkvNDAgcm91bmRlZC0yeGwgcC0zLjUgYm9yZGVyIGJvcmRlci1ib3JkZXIvNTBcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1mb3JlZ3JvdW5kIGxlYWRpbmctcmVsYXhlZCB3aGl0ZXNwYWNlLXByZS13cmFwIGJyZWFrLXdvcmRzXCI+XG4gICAgICAgICAgICAgIHtyZXN1bHQubWVzc2FnZX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTIgcm91bmRlZC0yeGwgYm9yZGVyIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgY3Vyc29yLXBvaW50ZXIgc2hhZG93LTJ4cyAke1xuICAgICAgICAgICAgICAgIGNvcGllZFxuICAgICAgICAgICAgICAgICAgPyBcImJnLWVtZXJhbGQtNTAwLzEwIGJvcmRlci1lbWVyYWxkLTUwMC8yMCB0ZXh0LWVtZXJhbGQtNjAwXCJcbiAgICAgICAgICAgICAgICAgIDogXCJiZy1zZWNvbmRhcnkvNjAgYm9yZGVyLWJvcmRlci82MCBob3Zlcjpib3JkZXItcHJpbWFyeS80MCB0ZXh0LWZvcmVncm91bmRcIlxuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvcGllZCA/IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPENoZWNrIHNpemU9ezE0fSBzdHJva2VXaWR0aD17M30gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkNvcGllZCE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxDb3B5IHNpemU9ezE0fSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+Q29weSBNZXNzYWdlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU9wZW5MaW5rZWRJbn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1ib3JkZXIvNjAgYmctc2Vjb25kYXJ5LzYwIGhvdmVyOmJvcmRlci1wcmltYXJ5LzQwIHRleHQtZm9yZWdyb3VuZCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHNoYWRvdy0yeHNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIHNpemU9ezE0fSAvPlxuICAgICAgICAgICAgICA8c3Bhbj5PcGVuIExpbmtlZEluPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ubyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgVGFyZ2V0OiA8c3BhbiBjbGFzc05hbWU9XCJjYXBpdGFsaXplIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj57cmVzdWx0LmNvbnRhY3RfdHlwZS5yZXBsYWNlKFwiX1wiLCBcIiBcIil9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiDilIDilIAgRW1wdHkgU3RhdGUgKG5vIHJlc3VsdCwgbm8gZXJyb3IsIG5vdCBnZW5lcmF0aW5nKSDilIDilIAgKi99XG4gICAgICB7IXJlc3VsdCAmJiAhZXJyb3IgJiYgIWdlbmVyYXRpbmcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTUgc3BhY2UteS0yIGdsYXNzLWNhcmQgcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgYmctcHJpbWFyeS8xMCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXByaW1hcnkvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXgtYXV0byB0ZXh0LXByaW1hcnkgc2hhZG93LTJ4c1wiPlxuICAgICAgICAgICAgPFNlbmQgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgIEZpbGwgaW4gdGhlIGRldGFpbHMgYWJvdmUgdG8gZHJhZnQgYSBoaWdoLWNvbnZlcnRpbmcgTGlua2VkSW4gbWVzc2FnZS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIOKUgOKUgCBIaXN0b3J5IFNlY3Rpb24g4pSA4pSAICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICA8Q2xvY2sgc2l6ZT17MTR9IGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5IaXN0b3J5PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtoaXN0b3J5Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJIaXN0b3J5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZGVzdHJ1Y3RpdmUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VHJhc2gyIHNpemU9ezEyfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj5DbGVhcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtoaXN0b3J5Lmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTNcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICBObyBtZXNzYWdlcyBnZW5lcmF0ZWQgeWV0LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1heC1oLVsyNjBweF0gb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICB7aGlzdG9yeS5zbGljZSgwLCAxMCkubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeS80MCBib3JkZXIgYm9yZGVyLWJvcmRlci81MCBzcGFjZS15LTEuNSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1zZWNvbmRhcnkvNzAgdHJhbnNpdGlvbi1hbGwgc2hhZG93LTJ4c1wiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogaXRlbS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaGFyX2NvdW50OiBpdGVtLmNoYXJfY291bnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RfdHlwZTogaXRlbS5jb250YWN0X3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIGZyYW1ld29ya191c2VkOiBpdGVtLmZyYW1ld29ya191c2VkLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRUaW1lKGl0ZW0udGltZXN0YW1wKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC80MFwiPnw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1ib2xkIGNhcGl0YWxpemUgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0uY29udGFjdF90eXBlLnJlcGxhY2UoXCJfXCIsIFwiIFwiKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uY2hhcl9jb3VudH1jXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1mb3JlZ3JvdW5kLzgwIGxlYWRpbmctcmVsYXhlZCBsaW5lLWNsYW1wLTJcIj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUEyQkEsSUFBTSxVQUFVLGlCQUFpQixZQUFZO0NBakIzQyxDQUNFLFFBQ0E7RUFDRSxHQUFHO0VBQ0gsS0FBSztDQUNQLENBQ0Y7Q0FDQSxDQUNFLFFBQ0E7RUFDRSxHQUFHO0VBQ0gsS0FBSztDQUNQLENBQ0Y7Q0FDQSxDQUFDLFFBQVE7RUFBRSxHQUFHO0VBQXdCLEtBQUs7Q0FBUyxDQUFDO0NBQ3JELENBQUMsVUFBVTtFQUFFLElBQUk7RUFBTSxJQUFJO0VBQU0sR0FBRztFQUFLLEtBQUs7Q0FBUyxDQUFDO0FBRWIsQ0FBVTs7Ozs7O0FDQXZELElBQU0scUJBQXFCO0FBQzNCLElBQU0sc0JBQXNCO0FBRTVCLElBQU0sZ0JBQWdCO0NBQ3BCO0VBQUUsSUFBSTtFQUFhLE9BQU87RUFBYSxhQUFhO0NBQXFDO0NBQ3pGO0VBQUUsSUFBSTtFQUFrQixPQUFPO0VBQWtCLGFBQWE7Q0FBK0I7Q0FDN0Y7RUFBRSxJQUFJO0VBQVEsT0FBTztFQUFRLGFBQWE7Q0FBMEI7Q0FDcEU7RUFBRSxJQUFJO0VBQWUsT0FBTztFQUFlLGFBQWE7Q0FBOEI7QUFDeEY7QUFFQSxTQUF3QixjQUFjO0NBQ3BDLE1BQU0sQ0FBQyxh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