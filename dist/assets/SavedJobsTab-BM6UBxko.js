import { t as Building2 } from "./building-2-CSFUp-6s.js";
import { t as Calendar } from "./calendar-Cprly5EN.js";
import { t as MapPin } from "./map-pin-B9Lbc5k1.js";
import { c as apiFetch } from "./auth-R0qBMroa.js";
import { C as Bookmark, E as __toESM, T as require_react, a as Trash2, n as require_jsx_dev_runtime, t as showToast, v as ExternalLink } from "./popup-B7pB8VfI.js";
//#region src/popup/components/SavedJobsTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/SavedJobsTab.tsx";
function SavedJobsTab() {
	const [savedJobs, setSavedJobs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadSavedJobs = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await apiFetch("/api/saved-jobs/");
			const list = res.results || res.data?.results || res.data || res;
			setSavedJobs(Array.isArray(list) ? list : []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load saved jobs.");
			setSavedJobs([]);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadSavedJobs();
	}, [loadSavedJobs]);
	const handleOpenJob = (url) => {
		if (!url) return;
		if (typeof chrome !== "undefined" && chrome.tabs?.create) chrome.tabs.create({ url });
		else window.open(url, "_blank");
	};
	const handleRemove = async (id) => {
		try {
			await apiFetch(`/api/saved-jobs/${id}/`, { method: "DELETE" });
			setSavedJobs((prev) => prev.filter((j) => j.id !== id));
		} catch (err) {
			console.error("Failed to remove saved job:", err);
			showToast("Failed to remove saved job.", "error");
		}
	};
	const formatDate = (dateStr) => {
		return new Date(dateStr).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-48",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 7
	}, this);
	if (error) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-base font-bold text-foreground",
			children: "Saved Jobs"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 74,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-[10px] text-muted-foreground font-mono",
			children: "Your job discovery shortlist"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 73,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-6 text-center border-destructive/20 bg-destructive/5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs font-semibold text-destructive",
				children: error
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-base font-bold text-foreground",
				children: "Saved Jobs"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-muted-foreground font-mono",
				children: [
					savedJobs.length,
					" ",
					savedJobs.length === 1 ? "job" : "jobs",
					" saved"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 9
			}, this), savedJobs.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full text-primary border border-primary/20",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, {
					size: 13,
					fill: "currentColor"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-mono font-bold",
					children: savedJobs.length
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 86,
			columnNumber: 7
		}, this), savedJobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary mb-3 border border-primary/20 shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { size: 20 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-bold text-foreground mb-1",
					children: "No saved jobs yet"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[11px] text-muted-foreground font-medium leading-relaxed max-w-[220px] mx-auto",
					children: "Browse LinkedIn, Indeed, or Wuzzuf and click \"Import to Vecta\" to save roles here."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2.5",
			children: savedJobs.map((item) => {
				const job = item.job_detail;
				const score = item.auto_rank_score;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-3.5 hover:border-primary/40 transition-all shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs font-bold text-foreground truncate leading-relaxed",
									children: job?.title || "Untitled Role"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, {
										size: 10,
										className: "shrink-0 text-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 127,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: job?.company || "Unknown Company"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 21
								}, this),
								job?.location ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 mt-0.5 text-[10px] text-muted-foreground/80 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, {
										size: 10,
										className: "shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: job.location
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 23
								}, this) : null
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleOpenJob(job?.url),
								className: "p-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer",
								title: "Open in new tab",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleRemove(item.id),
								className: "p-1.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer",
								title: "Remove from shortlist",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mt-2.5 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-wider",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { size: 10 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Saved ", formatDate(item.created)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full border ${item.priority === "high" ? "bg-destructive/10 text-destructive border-destructive/20" : item.priority === "low" ? "bg-secondary text-muted-foreground border-border/40" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`,
								children: item.priority
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 21
							}, this), score !== null && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `text-[9px] font-mono font-bold ${score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-muted-foreground"}`,
								children: [score, "% Match"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 17
					}, this)]
				}, item.id, true, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 15
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 112,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 5
	}, this);
}
//#endregion
export { SavedJobsTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2F2ZWRKb2JzVGFiLUJNNlVCeGtvLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb3B1cC9jb21wb25lbnRzL1NhdmVkSm9ic1RhYi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIEJvb2ttYXJrLFxuICBFeHRlcm5hbExpbmssXG4gIFRyYXNoMixcbiAgQ2FsZW5kYXIsXG4gIE1hcFBpbixcbiAgQnVpbGRpbmcyLFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBhcGlGZXRjaCB9IGZyb20gXCIuLi8uLi9saWIvYXV0aFwiO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSBcIi4uLy4uL2xpYi90b2FzdFwiO1xuaW1wb3J0IHR5cGUgeyBTYXZlZEpvYkl0ZW0gfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNhdmVkSm9ic1RhYigpIHtcbiAgY29uc3QgW3NhdmVkSm9icywgc2V0U2F2ZWRKb2JzXSA9IHVzZVN0YXRlPFNhdmVkSm9iSXRlbVtdPihbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGxvYWRTYXZlZEpvYnMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXBpRmV0Y2goXCIvYXBpL3NhdmVkLWpvYnMvXCIpO1xuICAgICAgY29uc3QgbGlzdCA9IHJlcy5yZXN1bHRzIHx8IHJlcy5kYXRhPy5yZXN1bHRzIHx8IHJlcy5kYXRhIHx8IHJlcztcbiAgICAgIHNldFNhdmVkSm9icyhBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IFtdKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIHNhdmVkIGpvYnMuXCIpO1xuICAgICAgc2V0U2F2ZWRKb2JzKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkU2F2ZWRKb2JzKCk7XG4gIH0sIFtsb2FkU2F2ZWRKb2JzXSk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkpvYiA9ICh1cmw/OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXVybCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgY2hyb21lICE9PSBcInVuZGVmaW5lZFwiICYmIGNocm9tZS50YWJzPy5jcmVhdGUpIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlID0gYXN5bmMgKGlkOiBudW1iZXIpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYXBpRmV0Y2goYC9hcGkvc2F2ZWQtam9icy8ke2lkfS9gLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcbiAgICAgIHNldFNhdmVkSm9icygocHJldikgPT4gcHJldi5maWx0ZXIoKGopID0+IGouaWQgIT09IGlkKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlbW92ZSBzYXZlZCBqb2I6XCIsIGVycik7XG4gICAgICBzaG93VG9hc3QoXCJGYWlsZWQgdG8gcmVtb3ZlIHNhdmVkIGpvYi5cIiwgXCJlcnJvclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZVN0cik7XG4gICAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKHVuZGVmaW5lZCwgeyBtb250aDogXCJzaG9ydFwiLCBkYXk6IFwibnVtZXJpY1wiIH0pO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC00OFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNiBoLTYgYm9yZGVyLTIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLXQtdHJhbnNwYXJlbnQgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+U2F2ZWQgSm9iczwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiPllvdXIgam9iIGRpc2NvdmVyeSBzaG9ydGxpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgcC02IHRleHQtY2VudGVyIGJvcmRlci1kZXN0cnVjdGl2ZS8yMCBiZy1kZXN0cnVjdGl2ZS81XCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZGVzdHJ1Y3RpdmVcIj57ZXJyb3J9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlNhdmVkIEpvYnM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIHtzYXZlZEpvYnMubGVuZ3RofSB7c2F2ZWRKb2JzLmxlbmd0aCA9PT0gMSA/IFwiam9iXCIgOiBcImpvYnNcIn0gc2F2ZWRcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2F2ZWRKb2JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMSBiZy1wcmltYXJ5LzEwIHJvdW5kZWQtZnVsbCB0ZXh0LXByaW1hcnkgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzIwXCI+XG4gICAgICAgICAgICA8Qm9va21hcmsgc2l6ZT17MTN9IGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkXCI+e3NhdmVkSm9icy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzYXZlZEpvYnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgcC04IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTExIGgtMTEgYmctcHJpbWFyeS8xMCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBteC1hdXRvIHRleHQtcHJpbWFyeSBtYi0zIGJvcmRlciBib3JkZXItcHJpbWFyeS8yMCBzaGFkb3ctMnhzXCI+XG4gICAgICAgICAgICA8Qm9va21hcmsgc2l6ZT17MjB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTFcIj5ObyBzYXZlZCBqb2JzIHlldDwvcD5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9udC1tZWRpdW0gbGVhZGluZy1yZWxheGVkIG1heC13LVsyMjBweF0gbXgtYXV0b1wiPlxuICAgICAgICAgICAgQnJvd3NlIExpbmtlZEluLCBJbmRlZWQsIG9yIFd1enp1ZiBhbmQgY2xpY2sgXCJJbXBvcnQgdG8gVmVjdGFcIiB0byBzYXZlIHJvbGVzIGhlcmUuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjVcIj5cbiAgICAgICAgICB7c2F2ZWRKb2JzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgam9iID0gaXRlbS5qb2JfZGV0YWlsO1xuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBpdGVtLmF1dG9fcmFua19zY29yZTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2xhc3MtY2FyZCBwLTMuNSBob3Zlcjpib3JkZXItcHJpbWFyeS80MCB0cmFuc2l0aW9uLWFsbCBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIHRydW5jYXRlIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtqb2I/LnRpdGxlIHx8IFwiVW50aXRsZWQgUm9sZVwifVxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMSB0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8QnVpbGRpbmcyIHNpemU9ezEwfSBjbGFzc05hbWU9XCJzaHJpbmstMCB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2pvYj8uY29tcGFueSB8fCBcIlVua25vd24gQ29tcGFueVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtqb2I/LmxvY2F0aW9uID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjUgdGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzgwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1hcFBpbiBzaXplPXsxMH0gY2xhc3NOYW1lPVwic2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj57am9iLmxvY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5Kb2Ioam9iPy51cmwpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQteGwgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcHJpbWFyeSBob3ZlcjpiZy1wcmltYXJ5LzEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk9wZW4gaW4gbmV3IHRhYlwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIHNpemU9ezEzfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZShpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLXhsIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWRlc3RydWN0aXZlIGhvdmVyOmJnLWRlc3RydWN0aXZlLzEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlJlbW92ZSBmcm9tIHNob3J0bGlzdFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIHNpemU9ezEzfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG10LTIuNSBwdC0yIGJvcmRlci10IGJvcmRlci1ib3JkZXIvNDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgc2l6ZT17MTB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlNhdmVkIHtmb3JtYXREYXRlKGl0ZW0uY3JlYXRlZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSBweC0xLjUgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByaW9yaXR5ID09PSBcImhpZ2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJnLWRlc3RydWN0aXZlLzEwIHRleHQtZGVzdHJ1Y3RpdmUgYm9yZGVyLWRlc3RydWN0aXZlLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaXRlbS5wcmlvcml0eSA9PT0gXCJsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctc2Vjb25kYXJ5IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBib3JkZXItYm9yZGVyLzQwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImJnLWFtYmVyLTUwMC8xMCB0ZXh0LWFtYmVyLTYwMCBib3JkZXItYW1iZXItNTAwLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnByaW9yaXR5fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtzY29yZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA+PSA4MCA/IFwidGV4dC1lbWVyYWxkLTUwMFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID49IDYwID8gXCJ0ZXh0LWFtYmVyLTUwMFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2NvcmV9JSBNYXRjaFxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAg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