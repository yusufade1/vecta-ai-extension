import { t as Copy } from "./copy-D0hvuU8f.js";
import { u as APP_URL } from "./auth-R0qBMroa.js";
import { _ as setReferral, s as fetchCredits, u as getCredits } from "./ats-detector-CroP96wW.js";
import { E as __toESM, T as require_react, g as Gift, n as require_jsx_dev_runtime, r as Zap, t as showToast, v as ExternalLink, w as createLucideIcon, x as Check } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Users = createLucideIcon("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/popup/components/ReferralTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/ReferralTab.tsx";
var MILESTONES = [
	{
		count: 1,
		reward: 10,
		label: "First Friend"
	},
	{
		count: 5,
		reward: 25,
		label: "Squad Builder"
	},
	{
		count: 10,
		reward: 50,
		label: "Viral Agent"
	},
	{
		count: 25,
		reward: 100,
		label: "Growth Hacker"
	}
];
function SectionEyebrow({ label }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
		className: "text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-2",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 5
	}, this);
}
function openReferralsWeb() {
	const url = `${APP_URL}/referrals`;
	if (typeof chrome !== "undefined" && chrome.tabs?.create) chrome.tabs.create({ url });
	else window.open(url, "_blank");
}
function ReferralTab({ user }) {
	const [referral, setReferralState] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadReferral() {
			setLoading(true);
			try {
				const liveCredits = await fetchCredits() || await getCredits();
				const code = liveCredits.referral_code || user.name?.replace(/\s+/g, "-").toUpperCase() || `USER-${user.pk}`;
				const totalReferrals = liveCredits.referrals_count ?? 0;
				const info = {
					code,
					totalReferrals,
					creditsEarned: totalReferrals * 10,
					referralLink: `${APP_URL}/ref/${code}`
				};
				await setReferral(info);
				setReferralState(info);
			} catch (err) {
				console.error("Failed to load referral code:", err);
			} finally {
				setLoading(false);
			}
		}
		loadReferral();
	}, [user.pk, user.name]);
	const handleCopy = async () => {
		if (!referral) return;
		try {
			await navigator.clipboard.writeText(referral.referralLink);
			setCopied(true);
			showToast("Referral link copied to clipboard!", "success");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			showToast("Failed to copy link", "error");
		}
	};
	if (loading || !referral) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-48",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 92,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 pb-4 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-base font-bold text-foreground",
					children: "Earn Credits"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] font-mono text-muted-foreground/80",
					children: "Give 10, Get 10 application credits"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: openReferralsWeb,
					title: "Open Referral Hub in Web App",
					className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all border border-primary/20 shrink-0 cursor-pointer shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Web Hub" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 12 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel p-4 text-foreground relative overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-accent/5",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative z-10 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-primary/15 text-primary border border-primary/25 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gift, { size: 12 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 13
							}, this), " GIVE 10 · GET 10"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-foreground",
							children: "Invite Colleagues & Peers"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] font-medium text-muted-foreground",
							children: "Every friend who joins with your link earns 10 credits for both of you."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3 border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionEyebrow, { label: "Your Referral Code & Link" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20",
						children: referral.code
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 bg-secondary/60 rounded-xl px-3 py-2 text-[11px] font-mono font-medium text-foreground truncate border border-border/40",
						children: referral.referralLink
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: handleCopy,
						className: `px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${copied ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "btn-primary"}`,
						children: [copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
							size: 14,
							strokeWidth: 2.5
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 23
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 14 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 63
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: copied ? "Copied" : "Copy" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-3.5 border-border/60 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { size: 15 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xl font-bold font-mono text-foreground",
							children: referral.totalReferrals
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground",
						children: "Friends Joined"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-3.5 border-border/60 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { size: 15 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xl font-bold font-mono text-foreground",
							children: ["+", referral.creditsEarned]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground",
						children: "Credits Earned"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 159,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card overflow-hidden border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-3 bg-secondary/40 border-b border-border/40",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, {
							size: 13,
							className: "text-amber-500 fill-amber-500"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 13
						}, this), "Reward Milestones"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 182,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-2 space-y-1",
					children: MILESTONES.map(({ count, reward, label }) => {
						const reached = referral.totalReferrals >= count;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `flex items-center gap-3 p-2 rounded-xl transition-all ${reached ? "bg-emerald-500/5 border border-emerald-500/15" : "bg-transparent"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${reached ? "bg-emerald-500 text-white shadow-2xs" : "bg-secondary text-muted-foreground border border-border/40"}`,
									children: reached ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
										size: 14,
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 30
									}, this) : count
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `text-xs font-bold ${reached ? "text-foreground" : "text-muted-foreground"}`,
										children: label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[9px] font-mono font-bold text-muted-foreground/80",
										children: [
											"+",
											reward,
											" Credits"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 17
								}, this),
								reached && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[9px] font-mono font-bold text-emerald-600 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20",
									children: "Unlocked"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 19
								}, this)
							]
						}, label, true, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 99,
		columnNumber: 5
	}, this);
}
//#endregion
export { ReferralTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmZXJyYWxUYWItQ1FKdW53N1ouanMiLCJuYW1lcyI6WyJfX2ljb25Ob2RlIl0sInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zdGFyLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdXNlcnMubWpzIiwiLi4vLi4vc3JjL3BvcHVwL2NvbXBvbmVudHMvUmVmZXJyYWxUYWIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTExLjUyNSAyLjI5NWEuNTMuNTMgMCAwIDEgLjk1IDBsMi4zMSA0LjY3OWEyLjEyMyAyLjEyMyAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIzIDIuMTIzIDAgMCAwLS42MTEgMS44NzhsLjg4MiA1LjE0YS41My41MyAwIDAgMS0uNzcxLjU2bC00LjYxOC0yLjQyOGEyLjEyMiAyLjEyMiAwIDAgMC0xLjk3MyAwTDYuMzk2IDIxLjAxYS41My41MyAwIDAgMS0uNzctLjU2bC44ODEtNS4xMzlhMi4xMjIgMi4xMjIgMCAwIDAtLjYxMS0xLjg3OUwyLjE2IDkuNzk1YS41My41MyAwIDAgMSAuMjk0LS45MDZsNS4xNjUtLjc1NWEyLjEyMiAyLjEyMiAwIDAgMCAxLjU5Ny0xLjE2elwiLFxuICAgICAga2V5OiBcInIwNHM3c1wiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU3RhciA9IGNyZWF0ZUx1Y2lkZUljb24oXCJzdGFyXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBTdGFyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXIubWpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MlwiLCBrZXk6IFwiMXl5aXRxXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NFwiLCBrZXk6IFwiMTZncjhqXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3XCIsIGtleTogXCJrc2hlZ2RcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiOVwiLCBjeTogXCI3XCIsIHI6IFwiNFwiLCBrZXk6IFwibnVmazhcIiB9XVxuXTtcbmNvbnN0IFVzZXJzID0gY3JlYXRlTHVjaWRlSWNvbihcInVzZXJzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBVc2VycyBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2Vycy5tanMubWFwXG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBHaWZ0LFxuICBDb3B5LFxuICBDaGVjayxcbiAgVXNlcnMsXG4gIFphcCxcbiAgU3RhcixcbiAgRXh0ZXJuYWxMaW5rLFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaENyZWRpdHMsIGdldENyZWRpdHMsIHNldFJlZmVycmFsIH0gZnJvbSBcIi4uLy4uL2xpYi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tIFwiLi4vLi4vbGliL3RvYXN0XCI7XG5pbXBvcnQgeyBBUFBfVVJMIH0gZnJvbSBcIi4uLy4uL2xpYi9lbnZcIjtcbmltcG9ydCB0eXBlIHsgQXV0aFVzZXIsIFJlZmVycmFsSW5mbyB9IGZyb20gXCIuLi8uLi9saWIvdHlwZXNcIjtcblxuY29uc3QgTUlMRVNUT05FUyA9IFtcbiAgeyBjb3VudDogMSwgcmV3YXJkOiAxMCwgbGFiZWw6IFwiRmlyc3QgRnJpZW5kXCIgfSxcbiAgeyBjb3VudDogNSwgcmV3YXJkOiAyNSwgbGFiZWw6IFwiU3F1YWQgQnVpbGRlclwiIH0sXG4gIHsgY291bnQ6IDEwLCByZXdhcmQ6IDUwLCBsYWJlbDogXCJWaXJhbCBBZ2VudFwiIH0sXG4gIHsgY291bnQ6IDI1LCByZXdhcmQ6IDEwMCwgbGFiZWw6IFwiR3Jvd3RoIEhhY2tlclwiIH0sXG5dIGFzIGNvbnN0O1xuXG5mdW5jdGlvbiBTZWN0aW9uRXllYnJvdyh7IGxhYmVsIH06IHsgbGFiZWw6IHN0cmluZyB9KSB7XG4gIHJldHVybiAoXG4gICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzgwIG1iLTJcIj5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2gzPlxuICApO1xufVxuXG5mdW5jdGlvbiBvcGVuUmVmZXJyYWxzV2ViKCkge1xuICBjb25zdCB1cmwgPSBgJHtBUFBfVVJMfS9yZWZlcnJhbHNgO1xuICBpZiAodHlwZW9mIGNocm9tZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjaHJvbWUudGFicz8uY3JlYXRlKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsIH0pO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIik7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJlZmVycmFsVGFiUHJvcHMge1xuICB1c2VyOiBBdXRoVXNlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVmZXJyYWxUYWIoeyB1c2VyIH06IFJlZmVycmFsVGFiUHJvcHMpIHtcbiAgY29uc3QgW3JlZmVycmFsLCBzZXRSZWZlcnJhbFN0YXRlXSA9IHVzZVN0YXRlPFJlZmVycmFsSW5mbyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRSZWZlcnJhbCgpIHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBGZXRjaCBsaXZlIHJlZmVycmFsIGNvZGUgYW5kIGNvdW50IGZyb20gY3JlZGl0LWJhbGFuY2UgZW5kcG9pbnRcbiAgICAgICAgY29uc3QgbGl2ZUNyZWRpdHMgPSAoYXdhaXQgZmV0Y2hDcmVkaXRzKCkpIHx8IChhd2FpdCBnZXRDcmVkaXRzKCkpO1xuICAgICAgICBjb25zdCBjb2RlID0gbGl2ZUNyZWRpdHMucmVmZXJyYWxfY29kZSB8fCB1c2VyLm5hbWU/LnJlcGxhY2UoL1xccysvZywgJy0nKS50b1VwcGVyQ2FzZSgpIHx8IGBVU0VSLSR7dXNlci5wa31gO1xuICAgICAgICBjb25zdCB0b3RhbFJlZmVycmFscyA9IGxpdmVDcmVkaXRzLnJlZmVycmFsc19jb3VudCA/PyAwO1xuICAgICAgICBjb25zdCBjcmVkaXRzRWFybmVkID0gdG90YWxSZWZlcnJhbHMgKiAxMDtcbiAgICAgICAgY29uc3QgcmVmZXJyYWxMaW5rID0gYCR7QVBQX1VSTH0vcmVmLyR7Y29kZX1gO1xuXG4gICAgICAgIGNvbnN0IGluZm86IFJlZmVycmFsSW5mbyA9IHtcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIHRvdGFsUmVmZXJyYWxzLFxuICAgICAgICAgIGNyZWRpdHNFYXJuZWQsXG4gICAgICAgICAgcmVmZXJyYWxMaW5rLFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IHNldFJlZmVycmFsKGluZm8pO1xuICAgICAgICBzZXRSZWZlcnJhbFN0YXRlKGluZm8pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCByZWZlcnJhbCBjb2RlOlwiLCBlcnIpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxvYWRSZWZlcnJhbCgpO1xuICB9LCBbdXNlci5waywgdXNlci5uYW1lXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXJlZmVycmFsKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHJlZmVycmFsLnJlZmVycmFsTGluayk7XG4gICAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgICBzaG93VG9hc3QoXCJSZWZlcnJhbCBsaW5rIGNvcGllZCB0byBjbGlwYm9hcmQhXCIsIFwic3VjY2Vzc1wiKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkKGZhbHNlKSwgMjAwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzaG93VG9hc3QoXCJGYWlsZWQgdG8gY29weSBsaW5rXCIsIFwiZXJyb3JcIik7XG4gICAgfVxuICB9O1xuXG4gIGlmIChsb2FkaW5nIHx8ICFyZWZlcnJhbCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGgtNDhcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IGJvcmRlci0yIGJvcmRlci1wcmltYXJ5IGJvcmRlci10LXRyYW5zcGFyZW50IHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgcGItNCBzZWxlY3Qtbm9uZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5FYXJuIENyZWRpdHM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LW11dGVkLWZvcmVncm91bmQvODBcIj5cbiAgICAgICAgICAgIEdpdmUgMTAsIEdldCAxMCBhcHBsaWNhdGlvbiBjcmVkaXRzXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e29wZW5SZWZlcnJhbHNXZWJ9XG4gICAgICAgICAgdGl0bGU9XCJPcGVuIFJlZmVycmFsIEh1YiBpbiBXZWIgQXBwXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMS41IHJvdW5kZWQteGwgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtcHJpbWFyeSBiZy1wcmltYXJ5LzEwIGhvdmVyOmJnLXByaW1hcnkvMTUgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzIwIHNocmluay0wIGN1cnNvci1wb2ludGVyIHNoYWRvdy0yeHNcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+V2ViIEh1Yjwvc3Bhbj5cbiAgICAgICAgICA8RXh0ZXJuYWxMaW5rIHNpemU9ezEyfSAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGVybyBDYXJkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBwLTQgdGV4dC1mb3JlZ3JvdW5kIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXByaW1hcnkvMjAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1wcmltYXJ5LzEwIHZpYS1jYXJkLzgwIHRvLWFjY2VudC81XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgYmctcHJpbWFyeS8xNSB0ZXh0LXByaW1hcnkgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzI1IG1iLTFcIj5cbiAgICAgICAgICAgIDxHaWZ0IHNpemU9ezEyfSAvPiBHSVZFIDEwIMK3IEdFVCAxMFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5JbnZpdGUgQ29sbGVhZ3VlcyAmIFBlZXJzPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgIEV2ZXJ5IGZyaWVuZCB3aG8gam9pbnMgd2l0aCB5b3VyIGxpbmsgZWFybnMgMTAgY3JlZGl0cyBmb3IgYm90aCBvZiB5b3UuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUmVmZXJyYWwgTGluayAmIENvZGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgcC00IHNwYWNlLXktMyBib3JkZXItYm9yZGVyLzYwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPFNlY3Rpb25FeWVicm93IGxhYmVsPVwiWW91ciBSZWZlcnJhbCBDb2RlICYgTGlua1wiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgYmctcHJpbWFyeS8xMCBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcHJpbWFyeS8yMFwiPlxuICAgICAgICAgICAge3JlZmVycmFsLmNvZGV9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2Vjb25kYXJ5LzYwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQgdHJ1bmNhdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIvNDBcIj5cbiAgICAgICAgICAgIHtyZWZlcnJhbC5yZWZlcnJhbExpbmt9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMy41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciBib3JkZXIgJHtcbiAgICAgICAgICAgICAgY29waWVkXG4gICAgICAgICAgICAgICAgPyBcImJnLWVtZXJhbGQtNTAwLzEwIHRleHQtZW1lcmFsZC02MDAgYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCJcbiAgICAgICAgICAgICAgICA6IFwiYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvcGllZCA/IDxDaGVjayBzaXplPXsxNH0gc3Ryb2tlV2lkdGg9ezIuNX0gLz4gOiA8Q29weSBzaXplPXsxNH0gLz59XG4gICAgICAgICAgICA8c3Bhbj57Y29waWVkID8gXCJDb3BpZWRcIiA6IFwiQ29weVwifTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFN0YXRzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtY2FyZCBwLTMuNSBib3JkZXItYm9yZGVyLzYwIGZsZXggZmxleC1jb2wgZ2FwLTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC1sZyBiZy1wcmltYXJ5LzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICA8VXNlcnMgc2l6ZT17MTV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LWZvcmVncm91bmRcIj57cmVmZXJyYWwudG90YWxSZWZlcnJhbHN9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkZyaWVuZHMgSm9pbmVkPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtMy41IGJvcmRlci1ib3JkZXIvNjAgZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy03IGgtNyByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNTAwLzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZW1lcmFsZC02MDBcIj5cbiAgICAgICAgICAgICAgPFphcCBzaXplPXsxNX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgZm9udC1tb25vIHRleHQtZm9yZWdyb3VuZFwiPit7cmVmZXJyYWwuY3JlZGl0c0Vhcm5lZH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+Q3JlZGl0cyBFYXJuZWQ8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNaWxlc3RvbmVzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIG92ZXJmbG93LWhpZGRlbiBib3JkZXItYm9yZGVyLzYwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNlY29uZGFyeS80MCBib3JkZXItYiBib3JkZXItYm9yZGVyLzQwXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHVwcGVyY2FzZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgPFN0YXIgc2l6ZT17MTN9IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNTAwIGZpbGwtYW1iZXItNTAwXCIgLz5cbiAgICAgICAgICAgIFJld2FyZCBNaWxlc3RvbmVzXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHNwYWNlLXktMVwiPlxuICAgICAgICAgIHtNSUxFU1RPTkVTLm1hcCgoeyBjb3VudCwgcmV3YXJkLCBsYWJlbCB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFjaGVkID0gcmVmZXJyYWwudG90YWxSZWZlcnJhbHMgPj0gY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtsYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBwLTIgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgcmVhY2hlZCA/IFwiYmctZW1lcmFsZC01MDAvNSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzE1XCIgOiBcImJnLXRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY2hlZFxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy0yeHNcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGJvcmRlciBib3JkZXItYm9yZGVyLzQwXCJcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtyZWFjaGVkID8gPENoZWNrIHNpemU9ezE0fSBzdHJva2VXaWR0aD17Mi41fSAvPiA6IGNvdW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkICR7cmVhY2hlZCA/IFwidGV4dC1mb3JlZ3JvdW5kXCIgOiBcInRleHQtbXV0ZWQtZm9yZWdyb3VuZFwifWB9PlxuICAgICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC84MFwiPit7cmV3YXJkfSBDcmVkaXRzPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3JlYWNoZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtZW1lcmFsZC02MDAgdXBwZXJjYXNlIGJnLWVtZXJhbGQtNTAwLzEwIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCI+XG4gICAgICAgICAgICAgICAgICAgIFVubG9ja2VkXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDFdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQWtCQSxJQUFNLE9BQU8saUJBQWlCLFFBQVFBLENBUnBDLENBQ0UsUUFDQTtDQUNFLEdBQUc7Q0FDSCxLQUFLO0FBQ1AsQ0FDRixDQUVvQ0EsQ0FBVTs7Ozs7OztBQ0hoRCxJQUFNLFFBQVEsaUJBQWlCLFNBQVM7Q0FMdEMsQ0FBQyxRQUFRO0VBQUUsR0FBRztFQUE2QyxLQUFLO0NBQVMsQ0FBQztDQUMxRSxDQUFDLFFBQVE7RUFBRSxHQUFHO0VBQStCLEtBQUs7Q0FBUyxDQUFDO0NBQzVELENBQUMsUUFBUTtFQUFFLEdBQUc7RUFBOEIsS0FBSztDQUFTLENBQUM7Q0FDM0QsQ0FBQyxVQUFVO0VBQUUsSUFBSTtFQUFLLElBQUk7RUFBSyxHQUFHO0VBQUssS0FBSztDQUFRLENBQUM7QUFFZixDQUFVOzs7Ozs7QUNBbEQsSUFBTSxhQUFhO0NBQ2pCO0VBQUUsT0FBTztFQUFHLFFBQVE7RUFBSSxPQUFPO0NBQWU7Q0FDOUM7RUFBRSxPQUFPO0VBQUcsUUFBUTtFQUFJLE9BQU87Q0FBZ0I7Q0FDL0M7RUFBRSxPQUFPO0VBQUksUUFBUTtFQUFJLE9BQU87Q0FBYztDQUM5QztFQUFFLE9BQU87RUFBSSxRQUFRO0VBQUssT0FBTztDQUFnQjtBQUNuRDtBQUVBLFNBQVMsZUFBZSxFQUFFLFNBQTRCO0NBQ3BELE9BQ0UsaUJBQUEsR0FBQSx1QkFBQSxPQUFBLENBQUMsTUFBRDtFQUFJLFdBQVU7RUFDWCxV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