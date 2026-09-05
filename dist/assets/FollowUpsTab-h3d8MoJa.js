import { t as Calendar } from "./calendar-Cprly5EN.js";
import { t as Clock } from "./clock-Ce6g0cew.js";
import { c as apiFetch } from "./auth-R0qBMroa.js";
import { E as __toESM, T as require_react, b as ChevronRight, c as Send, d as MessageSquare, f as Mail, n as require_jsx_dev_runtime, t as showToast, u as RefreshCw, w as createLucideIcon, x as Check, y as CircleAlert } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
//#endregion
//#region src/popup/components/FollowUpsTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/FollowUpsTab.tsx";
function daysUntil(dateStr) {
	const target = new Date(dateStr);
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	target.setHours(0, 0, 0, 0);
	return Math.ceil((target.getTime() - today.getTime()) / 864e5);
}
function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function FollowUpsTab() {
	const [followups, setFollowups] = (0, import_react.useState)([]);
	const [overdueMap, setOverdueMap] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [draftError, setDraftError] = (0, import_react.useState)(null);
	const [markingSent, setMarkingSent] = (0, import_react.useState)(false);
	const loadFollowUps = (0, import_react.useCallback)(async (forceRefresh = false) => {
		setLoading(true);
		setError(null);
		if (!forceRefresh) try {
			const cached = await chrome.storage.local.get("followups_cache");
			if (cached.followups_cache && typeof cached.followups_cache === "string") {
				const parsed = JSON.parse(cached.followups_cache);
				setFollowups(parsed.followups);
				setOverdueMap(parsed.overdueMap);
			}
		} catch {}
		try {
			const [listResult, overdueResult] = await Promise.all([apiFetch("/api/followups/"), apiFetch("/api/followups/overdue/")]);
			const list = listResult.results || listResult.data?.results || listResult.data || listResult || [];
			const overdueRaw = overdueResult.data?.results || overdueResult.data || overdueResult.results || overdueResult || [];
			const map = {};
			for (const item of overdueRaw) map[item.application_id] = item;
			setFollowups(list);
			setOverdueMap(map);
			await chrome.storage.local.set({ followups_cache: JSON.stringify({
				followups: list,
				overdueMap: map
			}) });
		} catch (err) {
			console.error("Failed to load follow-ups:", err);
			showToast("Failed to load follow-ups.", "error");
			setError(err instanceof Error ? err.message : "Failed to load follow-ups");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadFollowUps();
	}, [loadFollowUps]);
	const selected = followups.find((f) => f.id === selectedId) ?? null;
	const selectedCtx = selected ? overdueMap[selected.application] : null;
	const sorted = [...followups].sort((a, b) => {
		const aSent = a.sent_date ? 1 : 0;
		const bSent = b.sent_date ? 1 : 0;
		if (aSent !== bSent) return aSent - bSent;
		return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
	});
	if (selected) {
		const appDetail = selected.application_detail;
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-4 animate-fade-in pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: () => {
					setSelectedId(null);
					setDraft(null);
					setDraftError(null);
				},
				className: "flex items-center gap-1.5 text-surface-500 hover:text-surface-700 text-xs font-bold transition-colors cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 14 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 11
				}, this), "Back to Follow-ups"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 192,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm font-bold text-surface-900 truncate",
									children: appDetail?.company_name ?? selectedCtx?.company_name ?? `Application #${selected.application}`
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-surface-500 font-medium",
									children: appDetail?.job_title ?? selectedCtx?.job_title ?? selected.followup_type.replace("_", " ")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 13
							}, this),
							!selected.sent_date && selectedCtx && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedCtx.urgency === "overdue" ? "bg-error/10 text-error" : selectedCtx.urgency === "urgent" ? "bg-accent-500/10 text-accent-600" : "bg-brand-50 text-brand-600"}`,
								children: selectedCtx.urgency === "overdue" ? "OVERDUE" : `${daysUntil(selectedCtx.next_followup_date)}d`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 15
							}, this),
							selected.sent_date && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-success/10 text-success uppercase",
								children: "Sent"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-surface-600",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium",
									children: ["Scheduled: ", formatDate(selected.scheduled_date)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 13
							}, this),
							selected.sent_date && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-success",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium",
									children: ["Sent: ", formatDate(selected.sent_date)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-surface-600",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium capitalize",
									children: selected.followup_type.replace("_", " ")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 13
							}, this),
							selected.contact && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-surface-600",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium",
									children: ["Contact: ", selected.contact]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 15
							}, this),
							selected.channel && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-surface-600",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium capitalize",
									children: selected.channel
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 15
							}, this),
							selected.notes && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-surface-500 italic mt-2 text-[11px]",
								children: selected.notes
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 11
					}, this),
					selectedCtx && !selected.sent_date && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `p-3 rounded-xl text-xs font-bold ${selectedCtx.urgency === "overdue" ? "bg-error/10 text-error border border-error/20" : selectedCtx.urgency === "urgent" ? "bg-accent-500/10 text-accent-600 border border-accent-500/20" : "bg-brand-50 text-brand-600 border border-brand-100"}`,
						children: selectedCtx.urgency === "overdue" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"OVERDUE - ",
								selectedCtx.days_since,
								" days since last action"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 297,
							columnNumber: 17
						}, this) : selectedCtx.urgency === "urgent" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Due soon -",
								" ",
								daysUntil(selectedCtx.next_followup_date),
								" days remaining"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 304,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Next follow-up in",
								" ",
								daysUntil(selectedCtx.next_followup_date),
								" days"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 13
					}, this),
					!selected.sent_date && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [
							!draft && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: async () => {
									setGenerating(true);
									setDraftError(null);
									try {
										const result = await apiFetch(`/api/applications/${selected.application}/cadence/draft/`, {
											method: "POST",
											body: JSON.stringify({
												followup_type: selected.followup_type,
												contact: selected.contact || ""
											})
										});
										setDraft(result.data ?? result);
									} catch (err) {
										console.error("Failed to generate draft:", err);
										showToast("Failed to generate draft.", "error");
										setDraftError(err instanceof Error ? err.message : "Failed to generate draft");
									} finally {
										setGenerating(false);
									}
								},
								disabled: generating,
								className: "btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer",
								children: generating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 360,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Generating Draft..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { size: 14 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Generate Follow-up" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 366,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 17
							}, this),
							draftError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, {
									size: 14,
									className: "mt-0.5 shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: draftError }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 373,
								columnNumber: 17
							}, this),
							draft && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3 animate-fade-in",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-3 bg-surface-50 rounded-xl border border-surface-100 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs font-bold text-surface-700",
										children: ["Subject: ", draft.subject]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-surface-600 leading-relaxed whitespace-pre-wrap",
										children: draft.body
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => {
											navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
										},
										className: "flex-1 py-2 rounded-xl border border-surface-200 bg-white text-surface-600 text-xs font-bold hover:border-brand-300 hover:text-brand-600 transition-all cursor-pointer",
										children: "Copy Draft"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: async () => {
											setMarkingSent(true);
											try {
												const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
												await apiFetch(`/api/followups/${selected.id}/`, {
													method: "PATCH",
													body: JSON.stringify({ sent_date: today })
												});
												await loadFollowUps(true);
												setDraft(null);
												setSelectedId(null);
											} catch (err) {
												console.error("Failed to mark as sent:", err);
												showToast("Failed to mark as sent.", "error");
												setDraftError(err instanceof Error ? err.message : "Failed to mark as sent");
											} finally {
												setMarkingSent(false);
											}
										},
										disabled: markingSent,
										className: "flex-1 py-2 rounded-xl bg-success text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5",
										children: markingSent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 439,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Saving..." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 440,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 438,
											columnNumber: 25
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 14 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 444,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Mark as Sent" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 443,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 403,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 325,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 190,
			columnNumber: 7
		}, this);
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-48",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 464,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 463,
		columnNumber: 7
	}, this);
	if (error) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-lg font-bold text-surface-900",
			children: "Follow-ups"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 473,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-[10px] text-surface-500 font-medium",
			children: "Track your outreach cadence"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 474,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 472,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-4 rounded-xl bg-error/10 border border-error/20 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-2.5 text-error",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, {
					size: 16,
					className: "mt-0.5 shrink-0"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 480,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-bold",
					children: "Failed to load follow-ups"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 482,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[11px] opacity-80 mt-1",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 483,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 481,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 479,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: () => loadFollowUps(true),
				className: "w-full py-2 rounded-lg border border-error/20 bg-white text-error text-xs font-bold hover:bg-error/5 transition-all cursor-pointer flex items-center justify-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { size: 14 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 490,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retry" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 491,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 486,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 478,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 471,
		columnNumber: 7
	}, this);
	if (sorted.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-base font-bold text-foreground",
			children: "Follow-ups"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 502,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-[10px] text-muted-foreground font-mono",
			children: "Track your outreach cadence"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 503,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 501,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-8 text-center space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { size: 20 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 509,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 508,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-bold text-foreground",
					children: "No follow-ups yet"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 511,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground font-medium leading-relaxed",
					children: "Follow-ups will appear here when you schedule outreach for your applications."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 514,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 507,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 500,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-base font-bold text-foreground",
				children: "Follow-ups"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 527,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-muted-foreground font-mono",
				children: "Track your outreach cadence"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 528,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 526,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => loadFollowUps(true),
				className: "p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer border border-border/40 shadow-2xs",
				title: "Refresh",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { size: 14 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 538,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 532,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 525,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2.5",
			children: sorted.map((item) => {
				const ctx = overdueMap[item.application];
				const appDetail = item.application_detail;
				const isSent = !!item.sent_date;
				const displayCompany = appDetail?.company_name ?? ctx?.company_name;
				const displayRole = appDetail?.job_title ?? ctx?.job_title;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => {
						setSelectedId(item.id);
						setDraft(null);
						setDraftError(null);
					},
					className: "w-full glass-card p-3.5 hover:border-primary/40 transition-all text-left cursor-pointer shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-xs font-bold text-foreground truncate",
										children: displayCompany ?? `Application #${item.application}`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 567,
										columnNumber: 21
									}, this), isSent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "shrink-0 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase",
										children: "Sent"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 572,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 566,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground font-medium truncate",
									children: displayRole ?? item.followup_type.replace("_", " ")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 577,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 mt-1.5 text-[10px] font-mono text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, {
											size: 10,
											className: "text-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 582,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatDate(item.scheduled_date) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 583,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "capitalize",
											children: ["· ", item.followup_type.replace("_", " ")]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 584,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 565,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col items-end gap-1 shrink-0",
							children: [!isSent && ctx && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${ctx.urgency === "overdue" ? "bg-destructive/10 text-destructive border-destructive/20" : ctx.urgency === "urgent" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-primary/10 text-primary border-primary/20"}`,
								children: ctx.urgency === "overdue" ? "OVERDUE" : `${daysUntil(ctx.next_followup_date)}d`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 591,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, {
								size: 14,
								className: "text-muted-foreground"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 589,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 564,
						columnNumber: 15
					}, this)
				}, item.id, false, {
					fileName: _jsxFileName,
					lineNumber: 554,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 542,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 524,
		columnNumber: 5
	}, this);
}
//#endregion
export { FollowUpsTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9sbG93VXBzVGFiLWgzZDhNb0phLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvYXJyb3ctbGVmdC5tanMiLCIuLi8uLi9zcmMvcG9wdXAvY29tcG9uZW50cy9Gb2xsb3dVcHNUYWIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTEyIDE5LTctNyA3LTdcIiwga2V5OiBcIjFsNzI5blwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTkgMTJINVwiLCBrZXk6IFwieDN4MHpsXCIgfV1cbl07XG5jb25zdCBBcnJvd0xlZnQgPSBjcmVhdGVMdWNpZGVJY29uKFwiYXJyb3ctbGVmdFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQXJyb3dMZWZ0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycm93LWxlZnQubWpzLm1hcFxuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIE1haWwsXG4gIFNlbmQsXG4gIENsb2NrLFxuICBBbGVydENpcmNsZSxcbiAgQ2hlY2ssXG4gIFgsXG4gIFJlZnJlc2hDdyxcbiAgQ2hldnJvblJpZ2h0LFxuICBDYWxlbmRhcixcbiAgTWVzc2FnZVNxdWFyZSxcbiAgQXJyb3dMZWZ0LFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBhcGlGZXRjaCB9IGZyb20gXCIuLi8uLi9saWIvYXV0aFwiO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSBcIi4uLy4uL2xpYi90b2FzdFwiO1xuXG4vLyDilIDilIAgVHlwZXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmludGVyZmFjZSBBcHBsaWNhdGlvbkJyaWVmIHtcbiAgaWQ6IG51bWJlcjtcbiAgY29tcGFueV9uYW1lOiBzdHJpbmc7XG4gIGpvYl90aXRsZTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIE92ZXJkdWVJdGVtIHtcbiAgYXBwbGljYXRpb25faWQ6IG51bWJlcjtcbiAgY29tcGFueV9uYW1lOiBzdHJpbmc7XG4gIGpvYl90aXRsZTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgbmV4dF9mb2xsb3d1cF9kYXRlOiBzdHJpbmc7XG4gIHVyZ2VuY3k6IFwibm9ybWFsXCIgfCBcInVyZ2VudFwiIHwgXCJvdmVyZHVlXCI7XG4gIGRheXNfc2luY2U6IG51bWJlcjtcbiAgZm9sbG93dXBfY291bnQ6IG51bWJlcjtcbiAgbWF4X2ZvbGxvd3VwczogbnVtYmVyO1xuICBjYW5fZm9sbG93X3VwOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgRm9sbG93VXBJdGVtIHtcbiAgaWQ6IG51bWJlcjtcbiAgYXBwbGljYXRpb246IG51bWJlcjtcbiAgYXBwbGljYXRpb25fZGV0YWlsOiBBcHBsaWNhdGlvbkJyaWVmIHwgbnVsbDtcbiAgc2NoZWR1bGVkX2RhdGU6IHN0cmluZztcbiAgc2VudF9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBjaGFubmVsOiBzdHJpbmc7XG4gIGNvbnRhY3Q6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZztcbiAgZm9sbG93dXBfdHlwZTogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHVwZGF0ZWRfYXQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIERyYWZ0UmVzcG9uc2Uge1xuICBzdWJqZWN0OiBzdHJpbmc7XG4gIGJvZHk6IHN0cmluZztcbiAgZm9sbG93dXBfdHlwZTogc3RyaW5nO1xufVxuXG4vLyDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gZGF5c1VudGlsKGRhdGVTdHI6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IHRhcmdldCA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB0YXJnZXQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBNYXRoLmNlaWwoXG4gICAgKHRhcmdldC5nZXRUaW1lKCkgLSB0b2RheS5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpLFxuICApO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGVTdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlU3RyKTtcbiAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge1xuICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgfSk7XG59XG5cbi8vIOKUgOKUgCBDb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvbGxvd1Vwc1RhYigpIHtcbiAgY29uc3QgW2ZvbGxvd3Vwcywgc2V0Rm9sbG93dXBzXSA9IHVzZVN0YXRlPEZvbGxvd1VwSXRlbVtdPihbXSk7XG4gIGNvbnN0IFtvdmVyZHVlTWFwLCBzZXRPdmVyZHVlTWFwXSA9IHVzZVN0YXRlPFxuICAgIFJlY29yZDxudW1iZXIsIE92ZXJkdWVJdGVtPlxuICA+KHt9KTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gRGV0YWlsIC8gZHJhZnQgc3RhdGVcbiAgY29uc3QgW3NlbGVjdGVkSWQsIHNldFNlbGVjdGVkSWRdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtnZW5lcmF0aW5nLCBzZXRHZW5lcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RyYWZ0LCBzZXREcmFmdF0gPSB1c2VTdGF0ZTxEcmFmdFJlc3BvbnNlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtkcmFmdEVycm9yLCBzZXREcmFmdEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFya2luZ1NlbnQsIHNldE1hcmtpbmdTZW50XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBsb2FkRm9sbG93VXBzID0gdXNlQ2FsbGJhY2soYXN5bmMgKGZvcmNlUmVmcmVzaCA9IGZhbHNlKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIC8vIFRyeSBjYWNoZSBmaXJzdFxuICAgIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjYWNoZWQgPSAoYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwiZm9sbG93dXBzX2NhY2hlXCIpKSBhcyB7XG4gICAgICAgICAgZm9sbG93dXBzX2NhY2hlPzogc3RyaW5nO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY2FjaGVkLmZvbGxvd3Vwc19jYWNoZSAmJiB0eXBlb2YgY2FjaGVkLmZvbGxvd3Vwc19jYWNoZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY2FjaGVkLmZvbGxvd3Vwc19jYWNoZSkgYXMge1xuICAgICAgICAgICAgZm9sbG93dXBzOiBGb2xsb3dVcEl0ZW1bXTtcbiAgICAgICAgICAgIG92ZXJkdWVNYXA6IFJlY29yZDxudW1iZXIsIE92ZXJkdWVJdGVtPjtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNldEZvbGxvd3VwcyhwYXJzZWQuZm9sbG93dXBzKTtcbiAgICAgICAgICBzZXRPdmVyZHVlTWFwKHBhcnNlZC5vdmVyZHVlTWFwKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIENhY2hlIG1pc3MgLSBjb250aW51ZSB0byBmZXRjaFxuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBbbGlzdFJlc3VsdCwgb3ZlcmR1ZVJlc3VsdF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGFwaUZldGNoKFwiL2FwaS9mb2xsb3d1cHMvXCIpLFxuICAgICAgICBhcGlGZXRjaChcIi9hcGkvZm9sbG93dXBzL292ZXJkdWUvXCIpLFxuICAgICAgXSk7XG5cbiAgICAgIGNvbnN0IGxpc3QgPSAoXG4gICAgICAgIGxpc3RSZXN1bHQucmVzdWx0cyB8fFxuICAgICAgICBsaXN0UmVzdWx0LmRhdGE/LnJlc3VsdHMgfHxcbiAgICAgICAgbGlzdFJlc3VsdC5kYXRhIHx8XG4gICAgICAgIGxpc3RSZXN1bHQgfHxcbiAgICAgICAgW11cbiAgICAgICkgYXMgRm9sbG93VXBJdGVtW107XG5cbiAgICAgIGNvbnN0IG92ZXJkdWVSYXcgPVxuICAgICAgICAob3ZlcmR1ZVJlc3VsdC5kYXRhPy5yZXN1bHRzIHx8XG4gICAgICAgICAgb3ZlcmR1ZVJlc3VsdC5kYXRhIHx8XG4gICAgICAgICAgb3ZlcmR1ZVJlc3VsdC5yZXN1bHRzIHx8XG4gICAgICAgICAgb3ZlcmR1ZVJlc3VsdCB8fFxuICAgICAgICAgIFtdKSBhcyBPdmVyZHVlSXRlbVtdO1xuXG4gICAgICAvLyBCdWlsZCBhIGxvb2t1cCBrZXllZCBieSBhcHBsaWNhdGlvbl9pZFxuICAgICAgY29uc3QgbWFwOiBSZWNvcmQ8bnVtYmVyLCBPdmVyZHVlSXRlbT4gPSB7fTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvdmVyZHVlUmF3KSB7XG4gICAgICAgIG1hcFtpdGVtLmFwcGxpY2F0aW9uX2lkXSA9IGl0ZW07XG4gICAgICB9XG5cbiAgICAgIHNldEZvbGxvd3VwcyhsaXN0KTtcbiAgICAgIHNldE92ZXJkdWVNYXAobWFwKTtcblxuICAgICAgLy8gUGVyc2lzdCB0byBjaHJvbWUuc3RvcmFnZVxuICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgICAgZm9sbG93dXBzX2NhY2hlOiBKU09OLnN0cmluZ2lmeSh7IGZvbGxvd3VwczogbGlzdCwgb3ZlcmR1ZU1hcDogbWFwIH0pLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgZm9sbG93LXVwczpcIiwgZXJyKTtcbiAgICAgIHNob3dUb2FzdChcIkZhaWxlZCB0byBsb2FkIGZvbGxvdy11cHMuXCIsIFwiZXJyb3JcIik7XG4gICAgICBzZXRFcnJvcihcbiAgICAgICAgZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFwiRmFpbGVkIHRvIGxvYWQgZm9sbG93LXVwc1wiLFxuICAgICAgKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRm9sbG93VXBzKCk7XG4gIH0sIFtsb2FkRm9sbG93VXBzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWQgPSBmb2xsb3d1cHMuZmluZCgoZikgPT4gZi5pZCA9PT0gc2VsZWN0ZWRJZCkgPz8gbnVsbDtcbiAgY29uc3Qgc2VsZWN0ZWRDdHggPSBzZWxlY3RlZCA/IG92ZXJkdWVNYXBbc2VsZWN0ZWQuYXBwbGljYXRpb25dIDogbnVsbDtcblxuICAvLyBTb3J0IC0gdW5zZW50IGZpcnN0LCB0aGVuIGJ5IHNjaGVkdWxlZCBkYXRlXG4gIGNvbnN0IHNvcnRlZCA9IFsuLi5mb2xsb3d1cHNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCBhU2VudCA9IGEuc2VudF9kYXRlID8gMSA6IDA7XG4gICAgY29uc3QgYlNlbnQgPSBiLnNlbnRfZGF0ZSA/IDEgOiAwO1xuICAgIGlmIChhU2VudCAhPT0gYlNlbnQpIHJldHVybiBhU2VudCAtIGJTZW50O1xuICAgIHJldHVybiAoXG4gICAgICBuZXcgRGF0ZShhLnNjaGVkdWxlZF9kYXRlKS5nZXRUaW1lKCkgLVxuICAgICAgbmV3IERhdGUoYi5zY2hlZHVsZWRfZGF0ZSkuZ2V0VGltZSgpXG4gICAgKTtcbiAgfSk7XG5cbiAgLy8g4pSA4pSAIERldGFpbCBWaWV3IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGlmIChzZWxlY3RlZCkge1xuICAgIGNvbnN0IGFwcERldGFpbCA9IHNlbGVjdGVkLmFwcGxpY2F0aW9uX2RldGFpbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW4gcGItNFwiPlxuICAgICAgICB7LyogQmFjayAqL31cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkSWQobnVsbCk7XG4gICAgICAgICAgICBzZXREcmFmdChudWxsKTtcbiAgICAgICAgICAgIHNldERyYWZ0RXJyb3IobnVsbCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtc3VyZmFjZS01MDAgaG92ZXI6dGV4dC1zdXJmYWNlLTcwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8QXJyb3dMZWZ0IHNpemU9ezE0fSAvPlxuICAgICAgICAgIEJhY2sgdG8gRm9sbG93LXVwc1xuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICB7LyogRGV0YWlsIENhcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtY2FyZCBwLTQgc3BhY2UteS00XCI+XG4gICAgICAgICAgey8qIEhlYWRlciByb3cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1zdXJmYWNlLTkwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIHthcHBEZXRhaWw/LmNvbXBhbnlfbmFtZSA/P1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDdHg/LmNvbXBhbnlfbmFtZSA/P1xuICAgICAgICAgICAgICAgICAgYEFwcGxpY2F0aW9uICMke3NlbGVjdGVkLmFwcGxpY2F0aW9ufWB9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zdXJmYWNlLTUwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgIHthcHBEZXRhaWw/LmpvYl90aXRsZSA/P1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDdHg/LmpvYl90aXRsZSA/P1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuZm9sbG93dXBfdHlwZS5yZXBsYWNlKFwiX1wiLCBcIiBcIil9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyFzZWxlY3RlZC5zZW50X2RhdGUgJiYgc2VsZWN0ZWRDdHggJiYgKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHNocmluay0wIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgJHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3R4LnVyZ2VuY3kgPT09IFwib3ZlcmR1ZVwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1lcnJvci8xMCB0ZXh0LWVycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxlY3RlZEN0eC51cmdlbmN5ID09PSBcInVyZ2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgPyBcImJnLWFjY2VudC01MDAvMTAgdGV4dC1hY2NlbnQtNjAwXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiYmctYnJhbmQtNTAgdGV4dC1icmFuZC02MDBcIlxuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkQ3R4LnVyZ2VuY3kgPT09IFwib3ZlcmR1ZVwiXG4gICAgICAgICAgICAgICAgICA/IFwiT1ZFUkRVRVwiXG4gICAgICAgICAgICAgICAgICA6IGAke2RheXNVbnRpbChzZWxlY3RlZEN0eC5uZXh0X2ZvbGxvd3VwX2RhdGUpfWRgfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3NlbGVjdGVkLnNlbnRfZGF0ZSAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNocmluay0wIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VjY2Vzcy8xMCB0ZXh0LXN1Y2Nlc3MgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgU2VudFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1ldGEgZGV0YWlscyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zdXJmYWNlLTYwMFwiPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgU2NoZWR1bGVkOiB7Zm9ybWF0RGF0ZShzZWxlY3RlZC5zY2hlZHVsZWRfZGF0ZSl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3NlbGVjdGVkLnNlbnRfZGF0ZSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zdWNjZXNzXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrIHNpemU9ezEyfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICBTZW50OiB7Zm9ybWF0RGF0ZShzZWxlY3RlZC5zZW50X2RhdGUpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXN1cmZhY2UtNjAwXCI+XG4gICAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIHNpemU9ezEyfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bSBjYXBpdGFsaXplXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkLmZvbGxvd3VwX3R5cGUucmVwbGFjZShcIl9cIiwgXCIgXCIpfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtzZWxlY3RlZC5jb250YWN0ICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXN1cmZhY2UtNjAwXCI+XG4gICAgICAgICAgICAgICAgPE1haWwgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj5Db250YWN0OiB7c2VsZWN0ZWQuY29udGFjdH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzZWxlY3RlZC5jaGFubmVsICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXN1cmZhY2UtNjAwXCI+XG4gICAgICAgICAgICAgICAgPFNlbmQgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gY2FwaXRhbGl6ZVwiPlxuICAgICAgICAgICAgICAgICAge3NlbGVjdGVkLmNoYW5uZWx9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c2VsZWN0ZWQubm90ZXMgJiYgKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXN1cmZhY2UtNTAwIGl0YWxpYyBtdC0yIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkLm5vdGVzfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFVyZ2VuY3kgLyB0aW1pbmcgY2FsbG91dCAqL31cbiAgICAgICAgICB7c2VsZWN0ZWRDdHggJiYgIXNlbGVjdGVkLnNlbnRfZGF0ZSAmJiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdHgudXJnZW5jeSA9PT0gXCJvdmVyZHVlXCJcbiAgICAgICAgICAgICAgICAgID8gXCJiZy1lcnJvci8xMCB0ZXh0LWVycm9yIGJvcmRlciBib3JkZXItZXJyb3IvMjBcIlxuICAgICAgICAgICAgICAgICAgOiBzZWxlY3RlZEN0eC51cmdlbmN5ID09PSBcInVyZ2VudFwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1hY2NlbnQtNTAwLzEwIHRleHQtYWNjZW50LTYwMCBib3JkZXIgYm9yZGVyLWFjY2VudC01MDAvMjBcIlxuICAgICAgICAgICAgICAgICAgICA6IFwiYmctYnJhbmQtNTAgdGV4dC1icmFuZC02MDAgYm9yZGVyIGJvcmRlci1icmFuZC0xMDBcIlxuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3NlbGVjdGVkQ3R4LnVyZ2VuY3kgPT09IFwib3ZlcmR1ZVwiID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBPVkVSRFVFIC0ge3NlbGVjdGVkQ3R4LmRheXNfc2luY2V9IGRheXMgc2luY2UgbGFzdCBhY3Rpb25cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHNlbGVjdGVkQ3R4LnVyZ2VuY3kgPT09IFwidXJnZW50XCIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPENsb2NrIHNpemU9ezE0fSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIER1ZSBzb29uIC17XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgIHtkYXlzVW50aWwoc2VsZWN0ZWRDdHgubmV4dF9mb2xsb3d1cF9kYXRlKX0gZGF5cyByZW1haW5pbmdcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8Q2xvY2sgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgTmV4dCBmb2xsb3ctdXAgaW57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgIHtkYXlzVW50aWwoc2VsZWN0ZWRDdHgubmV4dF9mb2xsb3d1cF9kYXRlKX0gZGF5c1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBEcmFmdCBnZW5lcmF0aW9uICovfVxuICAgICAgICAgIHshc2VsZWN0ZWQuc2VudF9kYXRlICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIHshZHJhZnQgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0R2VuZXJhdGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZnRFcnJvcihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhcGlGZXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGAvYXBpL2FwcGxpY2F0aW9ucy8ke3NlbGVjdGVkLmFwcGxpY2F0aW9ufS9jYWRlbmNlL2RyYWZ0L2AsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xsb3d1cF90eXBlOiBzZWxlY3RlZC5mb2xsb3d1cF90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3Q6IHNlbGVjdGVkLmNvbnRhY3QgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0RHJhZnQoKHJlc3VsdC5kYXRhID8/IHJlc3VsdCkgYXMgRHJhZnRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgZHJhZnQ6XCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KFwiRmFpbGVkIHRvIGdlbmVyYXRlIGRyYWZ0LlwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldERyYWZ0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJGYWlsZWQgdG8gZ2VuZXJhdGUgZHJhZnRcIixcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgIHNldEdlbmVyYXRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2dlbmVyYXRpbmd9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tcHJpbWFyeSB3LWZ1bGwgcHktMi41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Z2VuZXJhdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNCBoLTQgYm9yZGVyLTIgYm9yZGVyLXdoaXRlIGJvcmRlci10LXRyYW5zcGFyZW50IHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmVyYXRpbmcgRHJhZnQuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZVNxdWFyZSBzaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HZW5lcmF0ZSBGb2xsb3ctdXA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7ZHJhZnRFcnJvciAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIHAtMyByb3VuZGVkLXhsIGJnLWVycm9yLzEwIGJvcmRlciBib3JkZXItZXJyb3IvMjAgdGV4dC1lcnJvciB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIDxBbGVydENpcmNsZSBzaXplPXsxNH0gY2xhc3NOYW1lPVwibXQtMC41IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntkcmFmdEVycm9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7ZHJhZnQgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgICAgICAgICAgey8qIERyYWZ0IHByZXZpZXcgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1zdXJmYWNlLTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zdXJmYWNlLTEwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zdXJmYWNlLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFN1YmplY3Q6IHtkcmFmdC5zdWJqZWN0fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zdXJmYWNlLTYwMCBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtkcmFmdC5ib2R5fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBgU3ViamVjdDogJHtkcmFmdC5zdWJqZWN0fVxcblxcbiR7ZHJhZnQuYm9keX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zdXJmYWNlLTIwMCBiZy13aGl0ZSB0ZXh0LXN1cmZhY2UtNjAwIHRleHQteHMgZm9udC1ib2xkIGhvdmVyOmJvcmRlci1icmFuZC0zMDAgaG92ZXI6dGV4dC1icmFuZC02MDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgQ29weSBEcmFmdFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hcmtpbmdTZW50KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJUXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBhcGlGZXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgL2FwaS9mb2xsb3d1cHMvJHtzZWxlY3RlZC5pZH0vYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VudF9kYXRlOiB0b2RheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGxvYWRGb2xsb3dVcHModHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldERyYWZ0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZElkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbWFyayBhcyBzZW50OlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJGYWlsZWQgdG8gbWFyayBhcyBzZW50LlwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREcmFmdEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciBpbnN0YW5jZW9mIEVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiRmFpbGVkIHRvIG1hcmsgYXMgc2VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWFya2luZ1NlbnQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e21hcmtpbmdTZW50fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQteGwgYmctc3VjY2VzcyB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGhvdmVyOmJyaWdodG5lc3MtMTEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge21hcmtpbmdTZW50ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBib3JkZXItMiBib3JkZXItd2hpdGUgYm9yZGVyLXQtdHJhbnNwYXJlbnQgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNhdmluZy4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk1hcmsgYXMgU2VudDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyDilIDilIAgTGlzdCBWaWV3IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC00OFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggYm9yZGVyLTIgYm9yZGVyLWJyYW5kLTUwMCBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYW5pbWF0ZS1mYWRlLWluIHBiLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zdXJmYWNlLTkwMFwiPkZvbGxvdy11cHM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc3VyZmFjZS01MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgIFRyYWNrIHlvdXIgb3V0cmVhY2ggY2FkZW5jZVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctZXJyb3IvMTAgYm9yZGVyIGJvcmRlci1lcnJvci8yMCBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTIuNSB0ZXh0LWVycm9yXCI+XG4gICAgICAgICAgICA8QWxlcnRDaXJjbGUgc2l6ZT17MTZ9IGNsYXNzTmFtZT1cIm10LTAuNSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZFwiPkZhaWxlZCB0byBsb2FkIGZvbGxvdy11cHM8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIG9wYWNpdHktODAgbXQtMVwiPntlcnJvcn08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBsb2FkRm9sbG93VXBzKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWVycm9yLzIwIGJnLXdoaXRlIHRleHQtZXJyb3IgdGV4dC14cyBmb250LWJvbGQgaG92ZXI6YmctZXJyb3IvNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IHNpemU9ezE0fSAvPlxuICAgICAgICAgICAgPHNwYW4+UmV0cnk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChzb3J0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+Rm9sbG93LXVwczwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgVHJhY2sgeW91ciBvdXRyZWFjaCBjYWRlbmNlXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtOCB0ZXh0LWNlbnRlciBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTEgaC0xMSBiZy1wcmltYXJ5LzEwIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG8gdGV4dC1wcmltYXJ5IGJvcmRlciBib3JkZXItcHJpbWFyeS8yMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgICAgICA8TWFpbCBzaXplPXsyMH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgIE5vIGZvbGxvdy11cHMgeWV0XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbWVkaXVtIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgRm9sbG93LXVwcyB3aWxsIGFwcGVhciBoZXJlIHdoZW4geW91IHNjaGVkdWxlIG91dHJlYWNoIGZvciB5b3VyXG4gICAgICAgICAgICBhcHBsaWNhdGlvbnMuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPkZvbGxvdy11cHM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIFRyYWNrIHlvdXIgb3V0cmVhY2ggY2FkZW5jZVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBsb2FkRm9sbG93VXBzKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGhvdmVyOmJnLXNlY29uZGFyeSB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlciBib3JkZXItYm9yZGVyLzQwIHNoYWRvdy0yeHNcIlxuICAgICAgICAgIHRpdGxlPVwiUmVmcmVzaFwiXG4gICAgICAgID5cbiAgICAgICAgICA8UmVmcmVzaEN3IHNpemU9ezE0fSAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41XCI+XG4gICAgICAgIHtzb3J0ZWQubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3R4ID0gb3ZlcmR1ZU1hcFtpdGVtLmFwcGxpY2F0aW9uXTtcbiAgICAgICAgICBjb25zdCBhcHBEZXRhaWwgPSBpdGVtLmFwcGxpY2F0aW9uX2RldGFpbDtcbiAgICAgICAgICBjb25zdCBpc1NlbnQgPSAhIWl0ZW0uc2VudF9kYXRlO1xuXG4gICAgICAgICAgY29uc3QgZGlzcGxheUNvbXBhbnkgPVxuICAgICAgICAgICAgYXBwRGV0YWlsPy5jb21wYW55X25hbWUgPz8gY3R4Py5jb21wYW55X25hbWU7XG4gICAgICAgICAgY29uc3QgZGlzcGxheVJvbGUgPVxuICAgICAgICAgICAgYXBwRGV0YWlsPy5qb2JfdGl0bGUgPz8gY3R4Py5qb2JfdGl0bGU7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRJZChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICBzZXREcmFmdChudWxsKTtcbiAgICAgICAgICAgICAgICBzZXREcmFmdEVycm9yKG51bGwpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZ2xhc3MtY2FyZCBwLTMuNSBob3Zlcjpib3JkZXItcHJpbWFyeS80MCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnQgY3Vyc29yLXBvaW50ZXIgc2hhZG93LXhzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXlDb21wYW55ID8/XG4gICAgICAgICAgICAgICAgICAgICAgICBgQXBwbGljYXRpb24gIyR7aXRlbS5hcHBsaWNhdGlvbn1gfVxuICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICB7aXNTZW50ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaHJpbmstMCBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIGJnLWVtZXJhbGQtNTAwLzEwIHRleHQtZW1lcmFsZC02MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8yMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbnRcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1lZGl1bSB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheVJvbGUgPz9cbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLmZvbGxvd3VwX3R5cGUucmVwbGFjZShcIl9cIiwgXCIgXCIpfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0xLjUgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgc2l6ZT17MTB9IGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXREYXRlKGl0ZW0uc2NoZWR1bGVkX2RhdGUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FwaXRhbGl6ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIMK3IHtpdGVtLmZvbGxvd3VwX3R5cGUucmVwbGFjZShcIl9cIiwgXCIgXCIpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtZW5kIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICB7IWlzU2VudCAmJiBjdHggJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudXJnZW5jeSA9PT0gXCJvdmVyZHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJnLWRlc3RydWN0aXZlLzEwIHRleHQtZGVzdHJ1Y3RpdmUgYm9yZGVyLWRlc3RydWN0aXZlLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjdHgudXJnZW5jeSA9PT0gXCJ1cmdlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1hbWJlci01MDAvMTAgdGV4dC1hbWJlci02MDAgYm9yZGVyLWFtYmVyLTUwMC8yMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5IGJvcmRlci1wcmltYXJ5LzIwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjdHgudXJnZW5jeSA9PT0gXCJvdmVyZHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJPVkVSRFVFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7ZGF5c1VudGlsKGN0eC5uZXh0X2ZvbGxvd3VwX2RhdGUpfWRgfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBzaXplPXsxNH0gY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFhQSxJQUFNLFlBQVksaUJBQWlCLGNBQWMsQ0FIL0MsQ0FBQyxRQUFRO0NBQUUsR0FBRztDQUFrQixLQUFLO0FBQVMsQ0FBQyxHQUMvQyxDQUFDLFFBQVE7Q0FBRSxHQUFHO0NBQVksS0FBSztBQUFTLENBQUMsQ0FFTSxDQUFVOzs7Ozs7QUNnRDNELFNBQVMsVUFBVSxTQUF5QjtDQUMxQyxNQUFNLFNBQVMsSUFBSSxLQUFLLE9BQU87Q0FDL0IsTUFBTSx3QkFBUSxJQUFJLEtBQUs7Q0FDdkIsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDekIsT0FBTyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDMUIsT0FBTyxLQUFLLE1BQ1QsT0FBTyxRQUFRLElBQUksTUFBTSxRQUFRLEtBQU0sS0FDMUM7QUFDRjtBQUVBLFNBQVMsV0FBVyxTQUF5QjtDQUUzQyxPQUFPLElBRE8sS0FBSyxPQUNaLENBQUEsQ0FBRSxtQkFBbUIsU0FBUztFQUNuQyxPQUFPO0VBQ1AsS0FBSztFQUNMLE1BQU07Q0FDUixDQUFDO0FBQ0g7QUFJQSxTQUF3QixlQUFlO0NBQ3JDLE1BQU0sQ0FBQyxXQUFXLGlCQUFBLEdBQWdCLGFBQUEsU0FBQSxDQUF5QixDQUFDLENBQUM7Q0FDN0QsTUFBTSxDQUFDLFlBQVksa0JBQUEsR0FBaUIsYUFBQSxTQUFBLENBRWxDLENBQUMsQ0FBQztDQUNKLE1BQU0s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