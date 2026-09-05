import { t as Clock } from "./clock-Ce6g0cew.js";
import { m as getStats } from "./ats-detector-CroP96wW.js";
import { E as __toESM, T as require_react, n as require_jsx_dev_runtime, o as Target, w as createLucideIcon } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Flame = createLucideIcon("flame", [["path", {
	d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
	key: "1slcih"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Share2 = createLucideIcon("share-2", [
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}],
	["circle", {
		cx: "6",
		cy: "12",
		r: "3",
		key: "w7nqdw"
	}],
	["circle", {
		cx: "18",
		cy: "19",
		r: "3",
		key: "1xt0gg"
	}],
	["line", {
		x1: "8.59",
		x2: "15.42",
		y1: "13.51",
		y2: "17.49",
		key: "47mynk"
	}],
	["line", {
		x1: "15.41",
		x2: "8.59",
		y1: "6.51",
		y2: "10.49",
		key: "1n3mei"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trophy = createLucideIcon("trophy", [
	["path", {
		d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",
		key: "pwuv1l"
	}],
	["path", {
		d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",
		key: "1y54w1"
	}],
	["path", {
		d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",
		key: "e30mpu"
	}],
	["path", {
		d: "M4 22h16",
		key: "57wxv0"
	}],
	["path", {
		d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
		key: "1mhfuq"
	}],
	["path", {
		d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",
		key: "i0yafy"
	}]
]);
//#endregion
//#region src/popup/components/StatsTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/StatsTab.tsx";
function StatsTab() {
	const [stats, setStats] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getStats().then(setStats);
	}, []);
	const handleShare = (platform) => {
		if (!stats) return;
		const text = `I just saved ${Math.round(stats.timeSavedMinutes / 60)} hours applying to ${stats.totalApplications} jobs this week using Vecta AI! 🚀 #JobHunt #Productivity`;
		const urls = {
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://vectai.tech")}&summary=${encodeURIComponent(text)}`,
			twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://vectai.tech")}`
		};
		window.open(urls[platform], "_blank");
	};
	if (!stats) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-48",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 7
	}, this);
	const statCards = [
		{
			icon: Target,
			value: stats.totalApplications,
			label: "Total Apps",
			color: "text-primary",
			bg: "bg-primary/10 border-primary/20"
		},
		{
			icon: TrendingUp,
			value: stats.successfulApplications,
			label: "Interviews",
			color: "text-emerald-500",
			bg: "bg-emerald-500/10 border-emerald-500/20"
		},
		{
			icon: Flame,
			value: stats.currentStreak,
			label: "Day Streak",
			color: "text-amber-500",
			bg: "bg-amber-500/10 border-amber-500/20"
		},
		{
			icon: Trophy,
			value: stats.longestStreak,
			label: "Best Streak",
			color: "text-primary",
			bg: "bg-primary/10 border-primary/20"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-base font-bold text-foreground",
				children: "Statistics"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 10
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-muted-foreground font-mono",
				children: "Job application pace & time metrics"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 10
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-2.5",
				children: statCards.map(({ icon: Icon, value, label, color, bg }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-3.5 shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `w-8 h-8 rounded-xl border flex items-center justify-center ${bg} ${color}`,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { size: 15 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xl font-bold text-foreground leading-none font-mono",
							children: value
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-wider mt-1.5",
							children: label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 13
					}, this)
				}, label, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold text-foreground",
							children: "Weekly Target"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 12
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[9px] font-mono font-bold text-emerald-600 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 uppercase",
							children: "On Track"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 12
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-baseline gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-2xl font-bold text-foreground font-mono",
							children: stats.weeklyApplications
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground font-mono",
							children: "/ 25 applications"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-2 bg-secondary/80 rounded-full overflow-hidden border border-border/40",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-full rounded-full transition-all duration-700 bg-primary",
							style: { width: `${Math.min(stats.weeklyApplications / 25 * 100, 100)}%` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[10px] text-muted-foreground font-mono flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, {
							size: 11,
							className: "text-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"Saved ~",
							Math.round(stats.timeSavedMinutes / 60),
							"h this month through AI automation."
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 106,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3 shadow-xs bg-secondary/30",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs font-bold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, {
						size: 14,
						className: "text-primary"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Share Milestone" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => handleShare("linkedin"),
						className: "flex-1 py-2 rounded-2xl text-[11px] font-bold bg-primary text-primary-foreground hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs",
						children: "LinkedIn"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => handleShare("twitter"),
						className: "flex-1 py-2 rounded-2xl text-[11px] font-bold bg-secondary hover:bg-secondary/80 border border-border/60 text-foreground transition-all cursor-pointer flex items-center justify-center gap-1.5",
						children: "X / Twitter"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 78,
		columnNumber: 5
	}, this);
}
//#endregion
export { StatsTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHNUYWItQTRmdm1ERVYuanMiLCJuYW1lcyI6WyJfX2ljb25Ob2RlIiwiX19pY29uTm9kZSIsIl9faWNvbk5vZGUiXSwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2ZsYW1lLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc2hhcmUtMi5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3RyZW5kaW5nLXVwLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdHJvcGh5Lm1qcyIsIi4uLy4uL3NyYy9wb3B1cC9jb21wb25lbnRzL1N0YXRzVGFiLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MS4zMS4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLm1qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMiAzcTEgNCA0IDYuNXQzIDUuNWExIDEgMCAwIDEtMTQgMCA1IDUgMCAwIDEgMS0zIDEgMSAwIDAgMCA1IDBjMC0yLTEuNS0zLTEuNS01cTAtMiAyLjUtNFwiLFxuICAgICAga2V5OiBcIjFzbGNpaFwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgRmxhbWUgPSBjcmVhdGVMdWNpZGVJY29uKFwiZmxhbWVcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEZsYW1lIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZsYW1lLm1qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiMThcIiwgY3k6IFwiNVwiLCByOiBcIjNcIiwga2V5OiBcImdxOGFjZFwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCI2XCIsIGN5OiBcIjEyXCIsIHI6IFwiM1wiLCBrZXk6IFwidzducWR3XCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjE4XCIsIGN5OiBcIjE5XCIsIHI6IFwiM1wiLCBrZXk6IFwiMXh0MGdnXCIgfV0sXG4gIFtcImxpbmVcIiwgeyB4MTogXCI4LjU5XCIsIHgyOiBcIjE1LjQyXCIsIHkxOiBcIjEzLjUxXCIsIHkyOiBcIjE3LjQ5XCIsIGtleTogXCI0N215bmtcIiB9XSxcbiAgW1wibGluZVwiLCB7IHgxOiBcIjE1LjQxXCIsIHgyOiBcIjguNTlcIiwgeTE6IFwiNi41MVwiLCB5MjogXCIxMC40OVwiLCBrZXk6IFwiMW4zbWVpXCIgfV1cbl07XG5jb25zdCBTaGFyZTIgPSBjcmVhdGVMdWNpZGVJY29uKFwic2hhcmUtMlwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2hhcmUyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLTIubWpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgN2g2djZcIiwga2V5OiBcImJveDU1bFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMjIgNy04LjUgOC41LTUtNUwyIDE3XCIsIGtleTogXCIxdDFtNzlcIiB9XVxuXTtcbmNvbnN0IFRyZW5kaW5nVXAgPSBjcmVhdGVMdWNpZGVJY29uKFwidHJlbmRpbmctdXBcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRyZW5kaW5nVXAgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlbmRpbmctdXAubWpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTQuNjZWMTdhMSAxIDAgMCAxLTEgMSAyIDIgMCAwIDAtMiAydjJcIiwga2V5OiBcInB3dXYxbFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTQgMTQuNjZWMTdhMSAxIDAgMCAwIDEgMSAyIDIgMCAwIDEgMiAydjJcIiwga2V5OiBcIjF5NTR3MVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTcuOTE2IDEwSDE5LjVBMi41IDIuNSAwIDAgMCAyMiA3LjVWNWExIDEgMCAwIDAtMS0xaC0zXCIsIGtleTogXCJlMzBtcHVcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTQgMjJoMTZcIiwga2V5OiBcIjU3d3h2MFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNNiA5YTYgNiAwIDAgMCAxMiAwVjNhMSAxIDAgMCAwLTEtMUg3YTEgMSAwIDAgMC0xIDF6XCIsIGtleTogXCIxbWhmdXFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTYuMDg0IDEwSDQuNUEyLjUgMi41IDAgMCAxIDIgNy41VjVhMSAxIDAgMCAxIDEtMWgzXCIsIGtleTogXCJpMHlhZnlcIiB9XVxuXTtcbmNvbnN0IFRyb3BoeSA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ0cm9waHlcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRyb3BoeSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cm9waHkubWpzLm1hcFxuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgVHJlbmRpbmdVcCxcbiAgQ2xvY2ssXG4gIEZsYW1lLFxuICBUcm9waHksXG4gIFNoYXJlMixcbiAgVGFyZ2V0LFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBnZXRTdGF0cyB9IGZyb20gXCIuLi8uLi9saWIvc3RvcmFnZVwiO1xuaW1wb3J0IHR5cGUgeyBVc2VyU3RhdHMgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0YXRzVGFiKCkge1xuICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlPFVzZXJTdGF0cyB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZ2V0U3RhdHMoKS50aGVuKHNldFN0YXRzKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVNoYXJlID0gKHBsYXRmb3JtOiBcImxpbmtlZGluXCIgfCBcInR3aXR0ZXJcIikgPT4ge1xuICAgIGlmICghc3RhdHMpIHJldHVybjtcblxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5yb3VuZChzdGF0cy50aW1lU2F2ZWRNaW51dGVzIC8gNjApO1xuICAgIGNvbnN0IHRleHQgPSBgSSBqdXN0IHNhdmVkICR7aG91cnN9IGhvdXJzIGFwcGx5aW5nIHRvICR7c3RhdHMudG90YWxBcHBsaWNhdGlvbnN9IGpvYnMgdGhpcyB3ZWVrIHVzaW5nIFZlY3RhIEFJISDwn5qAICNKb2JIdW50ICNQcm9kdWN0aXZpdHlgO1xuXG4gICAgY29uc3QgdXJsczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgIGxpbmtlZGluOiBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBcImh0dHBzOi8vdmVjdGFpLnRlY2hcIlxuICAgICAgKX0mc3VtbWFyeT0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gLFxuICAgICAgdHdpdHRlcjogYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHRleHRcbiAgICAgICl9JnVybD0ke2VuY29kZVVSSUNvbXBvbmVudChcImh0dHBzOi8vdmVjdGFpLnRlY2hcIil9YCxcbiAgICB9O1xuXG4gICAgd2luZG93Lm9wZW4odXJsc1twbGF0Zm9ybV0sIFwiX2JsYW5rXCIpO1xuICB9O1xuXG4gIGlmICghc3RhdHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBoLTQ4XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02IGgtNiBib3JkZXItMiBib3JkZXItcHJpbWFyeSBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBzdGF0Q2FyZHMgPSBbXG4gICAge1xuICAgICAgaWNvbjogVGFyZ2V0LFxuICAgICAgdmFsdWU6IHN0YXRzLnRvdGFsQXBwbGljYXRpb25zLFxuICAgICAgbGFiZWw6IFwiVG90YWwgQXBwc1wiLFxuICAgICAgY29sb3I6IFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICBiZzogXCJiZy1wcmltYXJ5LzEwIGJvcmRlci1wcmltYXJ5LzIwXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiBUcmVuZGluZ1VwLFxuICAgICAgdmFsdWU6IHN0YXRzLnN1Y2Nlc3NmdWxBcHBsaWNhdGlvbnMsXG4gICAgICBsYWJlbDogXCJJbnRlcnZpZXdzXCIsXG4gICAgICBjb2xvcjogXCJ0ZXh0LWVtZXJhbGQtNTAwXCIsXG4gICAgICBiZzogXCJiZy1lbWVyYWxkLTUwMC8xMCBib3JkZXItZW1lcmFsZC01MDAvMjBcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IEZsYW1lLFxuICAgICAgdmFsdWU6IHN0YXRzLmN1cnJlbnRTdHJlYWssXG4gICAgICBsYWJlbDogXCJEYXkgU3RyZWFrXCIsXG4gICAgICBjb2xvcjogXCJ0ZXh0LWFtYmVyLTUwMFwiLFxuICAgICAgYmc6IFwiYmctYW1iZXItNTAwLzEwIGJvcmRlci1hbWJlci01MDAvMjBcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IFRyb3BoeSxcbiAgICAgIHZhbHVlOiBzdGF0cy5sb25nZXN0U3RyZWFrLFxuICAgICAgbGFiZWw6IFwiQmVzdCBTdHJlYWtcIixcbiAgICAgIGNvbG9yOiBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgYmc6IFwiYmctcHJpbWFyeS8xMCBib3JkZXItcHJpbWFyeS8yMFwiLFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW4gcGItNFwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlN0YXRpc3RpY3M8L2gyPlxuICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiPkpvYiBhcHBsaWNhdGlvbiBwYWNlICYgdGltZSBtZXRyaWNzPC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTdGF0cyBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yLjVcIj5cbiAgICAgICAge3N0YXRDYXJkcy5tYXAoKHsgaWNvbjogSWNvbiwgdmFsdWUsIGxhYmVsLCBjb2xvciwgYmcgfSkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtsYWJlbH0gY2xhc3NOYW1lPVwiZ2xhc3MtY2FyZCBwLTMuNSBzaGFkb3cteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMi41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy04IGgtOCByb3VuZGVkLXhsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciAke2JnfSAke2NvbG9yfWB9PlxuICAgICAgICAgICAgICAgIDxJY29uIHNpemU9ezE1fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCBsZWFkaW5nLW5vbmUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtdC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFdlZWtseSBTdW1tYXJ5ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBzcGFjZS15LTMgc2hhZG93LXhzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPldlZWtseSBUYXJnZXQ8L3NwYW4+XG4gICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNjAwIHB4LTIgcHktMC41IGJnLWVtZXJhbGQtNTAwLzEwIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzIwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgIE9uIFRyYWNrXG4gICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWJhc2VsaW5lIGdhcC0xLjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAge3N0YXRzLndlZWtseUFwcGxpY2F0aW9uc31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9udC1tb25vXCI+LyAyNSBhcHBsaWNhdGlvbnM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0yIGJnLXNlY29uZGFyeS84MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItYm9yZGVyLzQwXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgYmctcHJpbWFyeVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogYCR7TWF0aC5taW4oKHN0YXRzLndlZWtseUFwcGxpY2F0aW9ucyAvIDI1KSAqIDEwMCwgMTAwKX0lYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgIDxDbG9jayBzaXplPXsxMX0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICA8c3Bhbj5TYXZlZCB+e01hdGgucm91bmQoc3RhdHMudGltZVNhdmVkTWludXRlcyAvIDYwKX1oIHRoaXMgbW9udGggdGhyb3VnaCBBSSBhdXRvbWF0aW9uLjwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTaGFyZSBNaWxlc3RvbmUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgcC00IHNwYWNlLXktMyBzaGFkb3cteHMgYmctc2Vjb25kYXJ5LzMwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgPFNoYXJlMiBzaXplPXsxNH0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICA8c3Bhbj5TaGFyZSBNaWxlc3RvbmU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNoYXJlKFwibGlua2VkaW5cIil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkLTJ4bCB0ZXh0LVsxMXB4XSBmb250LWJvbGQgYmctcHJpbWFyeSB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZCBob3ZlcjpvcGFjaXR5LTk1IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgc2hhZG93LXhzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBMaW5rZWRJblxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2hhcmUoXCJ0d2l0dGVyXCIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZC0yeGwgdGV4dC1bMTFweF0gZm9udC1ib2xkIGJnLXNlY29uZGFyeSBob3ZlcjpiZy1zZWNvbmRhcnkvODAgYm9yZGVyIGJvcmRlci1ib3JkZXIvNjAgdGV4dC1mb3JlZ3JvdW5kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFggLyBUd2l0dGVyXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDNdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBa0JBLElBQU0sUUFBUSxpQkFBaUIsU0FBU0EsQ0FSdEMsQ0FDRSxRQUNBO0NBQ0UsR0FBRztDQUNILEtBQUs7QUFDUCxDQUNGLENBRXNDQSxDQUFVOzs7Ozs7O0FDRmxELElBQU0sU0FBUyxpQkFBaUIsV0FBV0M7Q0FOekMsQ0FBQyxVQUFVO0VBQUUsSUFBSTtFQUFNLElBQUk7RUFBSyxHQUFHO0VBQUssS0FBSztDQUFTLENBQUM7Q0FDdkQsQ0FBQyxVQUFVO0VBQUUsSUFBSTtFQUFLLElBQUk7RUFBTSxHQUFHO0VBQUssS0FBSztDQUFTLENBQUM7Q0FDdkQsQ0FBQyxVQUFVO0VBQUUsSUFBSTtFQUFNLElBQUk7RUFBTSxHQUFHO0VBQUssS0FBSztDQUFTLENBQUM7Q0FDeEQsQ0FBQyxRQUFRO0VBQUUsSUFBSTtFQUFRLElBQUk7RUFBUyxJQUFJO0VBQVMsSUFBSTtFQUFTLEtBQUs7Q0FBUyxDQUFDO0NBQzdFLENBQUMsUUFBUTtFQUFFLElBQUk7RUFBUyxJQUFJO0VBQVEsSUFBSTtFQUFRLElBQUk7RUFBUyxLQUFLO0NBQVMsQ0FBQztBQUVuQ0EsQ0FBVTs7Ozs7OztBQ0hyRCxJQUFNLGFBQWEsaUJBQWlCLGVBQWVDLENBSGpELENBQUMsUUFBUTtDQUFFLEdBQUc7Q0FBYSxLQUFLO0FBQVMsQ0FBQyxHQUMxQyxDQUFDLFFBQVE7Q0FBRSxHQUFHO0NBQTBCLEtBQUs7QUFBUyxDQUFDLENBRU5BLENBQVU7Ozs7Ozs7QUNJN0QsSUFBTSxTQUFTLGlCQUFpQixVQUFVO0NBUHhDLENBQUMsUUFBUTtFQUFFLEdBQUc7RUFBOEMsS0FBSztDQUFTLENBQUM7Q0FDM0UsQ0FBQyxRQUFRO0VBQUUsR0FBRztFQUE4QyxLQUFLO0NBQVMsQ0FBQztDQUMzRSxDQUFDLFFBQVE7RUFBRSxHQUFHO0VBQTJELEtBQUs7Q0FBUyxDQUFDO0NBQ3hGLENBQUMsUUFBUTtFQUFFLEdBQUc7RUFBWSxLQUFLO0NBQVMsQ0FBQztDQUN6QyxDQUFDLFFBQVE7RUFBRSxHQUFHO0VBQXdELEtBQUs7Q0FBUyxDQUFDO0NBQ3JGLENBQUMsUUFBUTtFQUFFLEdBQUc7RUFBdUQsS0FBSztDQUFTLENBQUM7QUFFNUMsQ0FBVTs7Ozs7O0FDTHBELFNBQXdCLFdBQVc7Q0FDakMsTUFBTSxDQUFDLE9BQU8sYUFBQSxHQUFZLGFBQUEsU0FBQSxDQUEyQixJQUFJO0NBRXpELENBQUEsR0FBQSxhQUFBLFVBQUEsT0FBZ0I7RUFDZCxTQUFTLENBQUMsQ0FBQyxLQUFLLFFBQVE7Q0FDMUIsR0FBRyxDQUFDLENBQUM7Q0FFTCxNQUFNLGVBQWUsYUFBcUM7RUFDeEQsSUFBSSxDQUFDLE9BQU87RUFHWixNQUFNLE9BQU8sZ0JBREMsS0FBSyxNQUFNLE1BQU0sbUJBQW1CLEVBQ3JCLEVBQU0scUJBQXFCLE1BQU0sa0JBQWtCO0VBRWhGLE1BQU0sT0FBK0I7R0FDbkMsVUFBVSx1REFBdUQsbUJBQy9ELHFCQUNGLEVBQUUsV0FBVyxtQkFBbUIsSUFBSTtHQUNwQyxTQUFTLHlDQUF5QyxtQkFDaEQsSUFDRixFQUFFLE9BQU8sbUJBQW1CLHFCQUFxQjtFQUNuRDtFQUVBLE9BQU8sS0FBSyxLQUFLLFdBQVcsUUFBUTtDQUN0QztDQUVBLElBQUksQ0FBQyxPQUNILE9BQ0UsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsT0FBRDtFQUFLLFdBQVU7RUFDYixVQUFBLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQsRUFBSyxXQUFVLGlGQUFrRixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7OztDQUM5RixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7OztDQUlULE1BQU0sWUFBWTtFQUNoQjtHQUNFLE1BQU07R0FDTixPQUFPLE1BQU07R0FDYixPQUFPO0dBQ1AsT0FBTztHQUNQLElBQUk7RUFDTjtFQUNBO0dBQ0UsTUFBTTtHQUNOLE9BQU8sTUFBTTtHQUNiLE9BQU87R0FDUCxPQUFPO0dBQ1AsSUFBSTtFQUNOO0VBQ0E7R0FDRSxNQUFNO0dBQ04sT0FBTyxNQUFNO0dBQ2IsT0FBTztHQUNQLE9BQU87R0FDUCxJQUFJO0VBQ047RUFDQTtHQUNFLE1BQU07R0FDTixPQUFPLE1BQU07R0FDYixPQUFPO0dBQ1AsT0FBTztHQUNQLElBQUk7RUFDTjtDQUNGO0NBRUEsT0FDRSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO0VBQUssV0FBVTtFQUFmLFVBQUE7R0FDRSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFELEVBQUEsVUFBQSxDQUNHLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE1BQUQ7SUFBSSxXQUFVO0lBQXNDLFVBQUE7R0FBYyxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O0dBQ2xFLEdBQUEsSUFBQSxHQUFBLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLEtBQUQ7SUFBRyxXQUFVO0lBQThDLFVBQUE7R0FBc0MsR0FBQSxLQUFBLEdBQUEsT0FBQTs7OztHQUMvRixHQUFBLElBQUEsQ0FBQSxFQUFBLEdBQUEsS0FBQSxHQUFBLE1BQUE7Ozs7O0dBR0wsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsT0FBRDtJQUFLLFdBQVU7SUFDWixVQUFBLFVBQVUsS0FBSyxFQUFFLE1BQU0sTUFBTSxPQUFPLE9BQU8sT0FBTyxTQUNqRCxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO0tBQWlCLFdBQVU7S0FDekIsVUFBQSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO01BQUssV0FBVTtNQUFmLFVBQUEsQ0FDRSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO09BQUssV0FBVyw4REFBOEQsR0FBRyxHQUFHO09BQ2xGLFVBQUEsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsTUFBRCxFQUFNLE1BQU0sR0FBSyxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7OztNQUNkLEdBQUEsS0FBQSxHQUFBLE9BQUE7Ozs7TUFDTCxHQUFBLElBQUEsR0FBQSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFELEVBQUEsVUFBQSxDQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7T0FBSyxXQUFVO09BQ1osVUFBQTtNQUNFLEdBQUEsS0FBQSxHQUFBLE9BQUE7Ozs7TUFDTCxHQUFBLElBQUEsR0FBQSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO09BQUssV0FBVTtPQUNaLFVBQUE7TUFDRSxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O01BQ0YsR0FBQSxJQUFBLENBQUEsRUFBQSxHQUFBLEtBQUEsR0FBQSxNQUFBOzs7O01BQ0YsR0FBQSxJQUFBLENBQUE7Ozs7OztJQUNGLEdBZEssT0FBQSxPQUFBOzs7O0lBY0wsR0FBQSxJQUFBLENBQ047R0FDRSxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7OztHQUdMLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7SUFBSyxXQUFVO0lBQWYsVUFBQTtLQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7TUFBSyxXQUFVO01BQWYsVUFBQSxDQUNHLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLFFBQUQ7T0FBTSxXQUFVO09BQW9DLFVBQUE7TUFBbUIsR0FBQSxLQUFBLEdBQUEsT0FBQTs7OztNQUN2RSxHQUFBLElBQUEsR0FBQSxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxRQUFEO09BQU0sV0FBVTtPQUFvSSxVQUFBO01BRTlJLEdBQUEsS0FBQSxHQUFBLE9BQUE7Ozs7TUFDSixHQUFBLElBQUEsQ0FBQTs7Ozs7O0tBRUwsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsT0FBRDtNQUFLLFdBQVU7TUFBZixVQUFBLENBQ0UsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsUUFBRDtPQUFNLFdBQVU7T0FDYixVQUFBLE1BQU07TUFDSCxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O01BQ04sR0FBQSxJQUFBLEdBQUEsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsUUFBRDtPQUFNLFdBQVU7T0FBMEMsVUFBQTtNQUF1QixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O01BQzlFLEdBQUEsSUFBQSxDQUFBOzs7Ozs7S0FFTCxpQkFBQSxHQUFBLHVCQUFBLE9BQUEsQ0FBQyxPQUFEO01BQUssV0FBVTtNQUNiLFVBQUEsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsT0FBRDtPQUNFLFdBQVU7T0FDVixPQUFPLEVBQ0wsT0FBTyxHQUFHLEtBQUssSUFBSyxNQUFNLHFCQUFxQixLQUFNLEtBQUssR0FBRyxFQUFFLEdBQ2pFO01BQ0QsR0FBQSxLQUFBLEdBQUEsT0FBQTs7Ozs7S0FDRSxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7OztLQUNMLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLEtBQUQ7TUFBRyxXQUFVO01BQWIsVUFBQSxDQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7T0FBTyxNQUFNO09BQUksV0FBVTtNQUFnQixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O01BQzNDLEdBQUEsSUFBQSxHQUFBLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLFFBQUQsRUFBQSxVQUFBO09BQU07T0FBUSxLQUFLLE1BQU0sTUFBTSxtQkFBbUIsRUFBRTtPQUFFO01BQXlDLEVBQUEsR0FBQSxLQUFBLEdBQUEsTUFBQTs7OztNQUM5RixHQUFBLElBQUEsQ0FBQTs7Ozs7O0lBQ0E7Ozs7OztHQUdMLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7SUFBSyxXQUFVO0lBQWYsVUFBQSxDQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7S0FBSyxXQUFVO0tBQWYsVUFBQSxDQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLFFBQUQ7TUFBUSxNQUFNO01BQUksV0FBVTtLQUFnQixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O0tBQzVDLEdBQUEsSUFBQSxHQUFBLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLFFBQUQsRUFBQSxVQUFNLGtCQUFxQixHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O0tBQ3hCLEdBQUEsSUFBQSxDQUFBOzs7OztJQUNMLEdBQUEsSUFBQSxHQUFBLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLE9BQUQ7S0FBSyxXQUFVO0tBQWYsVUFBQSxDQUNFLGlCQUFBLEdBQUEsdUJBQUEsT0FBQSxDQUFDLFVBQUQ7TUFDRSxNQUFLO01BQ0wsZUFBZSxZQUFZLFVBQVU7TUFDckMsV0FBVTtNQUNYLFVBQUE7S0FFTyxHQUFBLEtBQUEsR0FBQSxPQUFBOzs7O0tBQ1IsR0FBQSxJQUFBLEdBQUEsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsVUFBRDtNQUNFLE1BQUs7TUFDTCxlQUFlLFlBQVksU0FBUztNQUNwQyxXQUFVO01BQ1gsVUFBQTtLQUVPLEdBQUEsS0FBQSxHQUFBLE9BQUE7Ozs7S0FDTCxHQUFBLElBQUEsQ0FBQTs7Ozs7SUFDRixHQUFBLElBQUEsQ0FBQTs7Ozs7O0VBQ0Y7Ozs7OztBQUVUIn0=