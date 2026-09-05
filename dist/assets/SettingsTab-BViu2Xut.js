import { t as MapPin } from "./map-pin-B9Lbc5k1.js";
import { a as signOut, d as MODE, f as getApiHost, l as API_URL, p as getAppHost, u as APP_URL } from "./auth-R0qBMroa.js";
import { b as updateSettings, c as fetchPreferences, d as getPreferences, p as getSettings, v as syncPreferencesToBackend } from "./ats-detector-CroP96wW.js";
import { E as __toESM, S as Briefcase, T as require_react, h as Globe, l as Save, m as Info, n as require_jsx_dev_runtime, s as ShieldCheck, t as showToast, u as RefreshCw, v as ExternalLink, w as createLucideIcon, x as Check } from "./popup-B7pB8VfI.js";
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var DollarSign = createLucideIcon("dollar-sign", [["line", {
	x1: "12",
	x2: "12",
	y1: "2",
	y2: "22",
	key: "7eqyqh"
}], ["path", {
	d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
	key: "1b0p4s"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MousePointer = createLucideIcon("mouse-pointer", [["path", {
	d: "M12.586 12.586 19 19",
	key: "ea5xo7"
}], ["path", {
	d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
	key: "277e5u"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersVertical = createLucideIcon("sliders-vertical", [
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M12 21v-9",
		key: "17s77i"
	}],
	["path", {
		d: "M12 8V3",
		key: "13r4qs"
	}],
	["path", {
		d: "M17 16h4",
		key: "h1uq16"
	}],
	["path", {
		d: "M19 12V3",
		key: "o1uvq1"
	}],
	["path", {
		d: "M19 21v-5",
		key: "qua636"
	}],
	["path", {
		d: "M3 14h4",
		key: "bcjad9"
	}],
	["path", {
		d: "M5 10V3",
		key: "cb8scm"
	}],
	["path", {
		d: "M5 21v-7",
		key: "1w1uti"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Timer = createLucideIcon("timer", [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2",
		key: "14vaq8"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11",
		key: "17fdiu"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8",
		key: "1e1u0o"
	}]
]);
//#endregion
//#region src/popup/components/SettingsTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/home/yusuf/Documents/ComSci/6-Projects/JOB-COPILOT/job_copilot/extension/src/popup/components/SettingsTab.tsx";
var AVAILABLE_JOB_TYPES = [
	{
		id: "full_time",
		label: "Full-Time"
	},
	{
		id: "contract",
		label: "Contract"
	},
	{
		id: "part_time",
		label: "Part-Time"
	},
	{
		id: "internship",
		label: "Internship"
	}
];
var AVAILABLE_EXPERIENCE_LEVELS = [
	{
		id: "entry",
		label: "Entry"
	},
	{
		id: "mid",
		label: "Mid"
	},
	{
		id: "senior",
		label: "Senior"
	},
	{
		id: "lead",
		label: "Lead"
	},
	{
		id: "director",
		label: "Director"
	},
	{
		id: "executive",
		label: "Executive"
	}
];
var CURRENCIES = [
	"USD",
	"EUR",
	"GBP",
	"CAD",
	"AUD",
	"EGP",
	"AED",
	"SAR"
];
function SectionEyebrow({ label, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-1.5 mb-2.5",
		children: [Icon && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
			size: 12,
			className: "text-primary"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 58,
			columnNumber: 16
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
			className: "text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 59,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 57,
		columnNumber: 5
	}, this);
}
function SettingsTab({ user, onSignOut }) {
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [preferences, setPreferences] = (0, import_react.useState)(null);
	const [isSavingPrefs, setIsSavingPrefs] = (0, import_react.useState)(false);
	const [prefsSaved, setPrefsSaved] = (0, import_react.useState)(false);
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const [jobTypes, setJobTypes] = (0, import_react.useState)([]);
	const [experienceLevels, setExperienceLevels] = (0, import_react.useState)([]);
	const [remoteOk, setRemoteOk] = (0, import_react.useState)(true);
	const [salaryMin, setSalaryMin] = (0, import_react.useState)("");
	const [currency, setCurrency] = (0, import_react.useState)("USD");
	const [locationsInput, setLocationsInput] = (0, import_react.useState)("");
	const [keywordsInput, setKeywordsInput] = (0, import_react.useState)("");
	const loadData = (0, import_react.useCallback)(async () => {
		const s = await getSettings();
		setSettings(s);
		const localPrefs = await getPreferences();
		setPreferences(localPrefs);
		syncFormFromPrefs(localPrefs);
		setIsSyncing(true);
		try {
			const livePrefs = await fetchPreferences();
			if (livePrefs) {
				setPreferences(livePrefs);
				syncFormFromPrefs(livePrefs);
			}
		} catch {} finally {
			setIsSyncing(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const syncFormFromPrefs = (prefs) => {
		setJobTypes(prefs.job_types || []);
		setExperienceLevels(prefs.experience_levels || []);
		setRemoteOk(prefs.remote_ok ?? true);
		setSalaryMin(prefs.salary_min ? String(prefs.salary_min) : "");
		setCurrency(prefs.currency || "USD");
		setLocationsInput((prefs.locations || []).join(", "));
		setKeywordsInput((prefs.keywords || []).join(", "));
	};
	const toggleJobType = (typeId) => {
		setJobTypes((prev) => prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]);
	};
	const toggleExperienceLevel = (expId) => {
		setExperienceLevels((prev) => prev.includes(expId) ? prev.filter((e) => e !== expId) : [...prev, expId]);
	};
	const handleSavePreferences = async () => {
		setIsSavingPrefs(true);
		try {
			const locations = locationsInput.split(",").map((s) => s.trim()).filter(Boolean);
			const keywords = keywordsInput.split(",").map((s) => s.trim()).filter(Boolean);
			const payload = {
				...preferences || {},
				job_types: jobTypes,
				experience_levels: experienceLevels,
				remote_ok: remoteOk,
				salary_min: salaryMin ? parseInt(salaryMin, 10) : null,
				currency: currency.toUpperCase().slice(0, 3),
				locations,
				keywords
			};
			const updated = await syncPreferencesToBackend(payload);
			setPreferences(updated);
			setPrefsSaved(true);
			showToast("Job preferences synced with cloud", "success");
			setTimeout(() => setPrefsSaved(false), 2500);
		} catch (err) {
			console.error("Failed to save preferences:", err);
			showToast("Failed to sync preferences to cloud. Saved locally.", "error");
		} finally {
			setIsSavingPrefs(false);
		}
	};
	const toggleSetting = async (key, val) => {
		const updated = await updateSettings({ [key]: val });
		setSettings(updated);
	};
	const handleSignOut = async () => {
		await signOut();
		onSignOut();
	};
	if (!settings) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-48",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 180,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 179,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 animate-fade-in pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-base font-bold text-foreground",
					children: "Preferences"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-muted-foreground font-mono",
					children: "Job targeting & extension settings"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 191,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 189,
					columnNumber: 9
				}, this), isSyncing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1 text-[10px] font-mono text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {
						size: 11,
						className: "animate-spin text-primary"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Syncing" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border/40 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionEyebrow, {
							label: "Discovery Preferences",
							icon: SlidersVertical
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleSavePreferences,
							disabled: isSavingPrefs,
							className: `btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5 shadow-2xs ${prefsSaved ? "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-600" : ""}`,
							children: [isSavingPrefs ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 15
							}, this) : prefsSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
								size: 13,
								strokeWidth: 3
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { size: 13 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: prefsSaved ? "Synced" : isSavingPrefs ? "Saving..." : "Save Prefs" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { size: 11 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 13
							}, this), " Job Types"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-1.5",
							children: AVAILABLE_JOB_TYPES.map((jt) => {
								const isSelected = jobTypes.includes(jt.id);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => toggleJobType(jt.id),
									className: `py-1.5 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left flex items-center justify-between shadow-2xs ${isSelected ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary/40 border-border/50 text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: jt.label }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 19
									}, this), isSelected && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
										size: 12,
										strokeWidth: 3
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 34
									}, this)]
								}, jt.id, true, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { size: 11 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this), " Experience Level"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-3 gap-1.5",
							children: AVAILABLE_EXPERIENCE_LEVELS.map((exp) => {
								const isSelected = experienceLevels.includes(exp.id);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => toggleExperienceLevel(exp.id),
									className: `py-1 px-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer text-center shadow-2xs ${isSelected ? "bg-primary/10 border-primary/30 text-primary font-bold" : "bg-secondary/40 border-border/50 text-muted-foreground hover:text-foreground"}`,
									children: exp.label
								}, exp.id, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 pt-1 border-t border-border/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-bold text-foreground",
									children: "Remote Roles Preferred"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 281,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Prioritize remote & flexible listings"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setRemoteOk(!remoteOk),
									className: `relative w-9 h-5 rounded-full transition-all cursor-pointer ${remoteOk ? "bg-emerald-500" : "bg-secondary"}`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${remoteOk ? "translate-x-5" : "translate-x-1"}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 291,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "col-span-2 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DollarSign, { size: 10 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 302,
											columnNumber: 17
										}, this), " Min Base Salary"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 301,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "number",
										value: salaryMin,
										onChange: (e) => setSalaryMin(e.target.value),
										placeholder: "e.g. 90000",
										className: "input-field font-mono text-xs"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 300,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground",
										children: "Currency"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: currency,
										onChange: (e) => setCurrency(e.target.value),
										className: "input-field font-mono text-xs bg-card",
										children: CURRENCIES.map((curr) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: curr,
											children: curr
										}, curr, false, {
											fileName: _jsxFileName,
											lineNumber: 322,
											columnNumber: 19
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { size: 10 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 333,
										columnNumber: 15
									}, this), " Target Locations"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 332,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: locationsInput,
									onChange: (e) => setLocationsInput(e.target.value),
									placeholder: "e.g. Remote, San Francisco, London",
									className: "input-field text-xs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { size: 10 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 347,
										columnNumber: 15
									}, this), " Target Roles & Skills"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 346,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: keywordsInput,
									onChange: (e) => setKeywordsInput(e.target.value),
									placeholder: "e.g. React, Python, Full Stack",
									className: "input-field text-xs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 349,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 345,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-3.5 bg-secondary/30 border-b border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.18em]",
						children: "Copilot Autofill Behavior"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 363,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 362,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 15 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 372,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-bold text-foreground",
									children: "Live Animation"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Visual feedback during form autofill"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 376,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 370,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => toggleSetting("showFillAnimation", !settings.showFillAnimation),
								className: `relative w-9 h-5 rounded-full transition-all cursor-pointer ${settings.showFillAnimation ? "bg-emerald-500" : "bg-secondary"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${settings.showFillAnimation ? "translate-x-5" : "translate-x-1"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 386,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 379,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 369,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timer, { size: 15 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 398,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs font-bold text-foreground",
										children: "Fill Keystroke Speed"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 401,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Emulated typing cadence"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 400,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20",
									children: [settings.fillDelayMs, "ms"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 405,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "range",
								min: 20,
								max: 200,
								step: 10,
								value: settings.fillDelayMs,
								onChange: (e) => updateSettings({ fillDelayMs: Number(e.target.value) }).then(setSettings),
								className: "w-full accent-primary h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MousePointer, { size: 15 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 425,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 424,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-bold text-foreground",
									children: "Auto-Scroll"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 428,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Follow current focus field in ATS"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 429,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 427,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 423,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => toggleSetting("autoScroll", !settings.autoScroll),
								className: `relative w-9 h-5 rounded-full transition-all cursor-pointer ${settings.autoScroll ? "bg-emerald-500" : "bg-secondary"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${settings.autoScroll ? "translate-x-5" : "translate-x-1"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 432,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 422,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 368,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 361,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionEyebrow, { label: "User Account" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 451,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 pb-2 border-b border-border/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs",
							children: (user.name || user.email || "U").charAt(0).toUpperCase()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 453,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm font-bold text-foreground",
							children: user.name || user.email || "User"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 457,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] font-mono text-muted-foreground",
							children: user.email || ""
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 458,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 456,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 452,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							const url = `${APP_URL}/profile?tab=browser`;
							if (typeof chrome !== "undefined" && chrome.tabs?.create) chrome.tabs.create({ url });
							else window.open(url, "_blank");
						},
						className: "w-full flex items-center justify-between p-3 rounded-2xl bg-secondary/40 hover:bg-primary/5 border border-border/50 hover:border-primary/30 transition-all text-left cursor-pointer group shadow-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 475,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground group-hover:text-primary transition-colors",
								children: "Browser Sync Dashboard"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 479,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Manage connected sessions on web"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 482,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 478,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 474,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, {
							size: 14,
							className: "text-muted-foreground group-hover:text-primary transition-colors"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 485,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 462,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 450,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `glass-card p-3.5 space-y-2.5 border border-amber-500/30 bg-amber-500/[0.04]`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, {
								size: 11,
								className: "text-amber-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 493,
								columnNumber: 13
							}, this), "Environment"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 492,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							title: `${MODE} • ${API_URL}`,
							className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border bg-amber-500 text-white border-amber-600`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `w-1.5 h-1.5 rounded-full bg-white animate-pulse` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 504,
									columnNumber: 13
								}, this),
								"DEV",
								" • ",
								MODE
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 496,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 491,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-1.5 text-[11px] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-secondary/50 border border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground text-[10px] font-bold uppercase tracking-wide shrink-0",
								children: "API"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 510,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-foreground font-medium truncate text-right",
								title: API_URL,
								children: getApiHost()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 511,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 509,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-secondary/50 border border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground text-[10px] font-bold uppercase tracking-wide shrink-0",
								children: "APP"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 514,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-foreground font-medium truncate text-right",
								title: APP_URL,
								children: getAppHost()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 515,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 513,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 508,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[9px] font-mono text-muted-foreground leading-relaxed px-0.5",
						children: "Local dev build — talks to localhost. Manifest shows [DEV] in chrome://extensions."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 518,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 490,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-emerald-500",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { size: 14 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 526,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono font-bold uppercase tracking-wide",
						children: "Cloud & Local Sync Active"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 527,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 525,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-2.5 border-t border-border/40 flex justify-between items-center text-[10px] font-mono font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { size: 12 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 533,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "v1.5.0 Stable" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 534,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 532,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-primary font-bold",
						children: "Vecta AI"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 536,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 531,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 524,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: handleSignOut,
				className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-destructive/20 text-destructive text-xs font-bold hover:bg-destructive/10 transition-all cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 15 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 545,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign Out from Copilot" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 546,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 540,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 186,
		columnNumber: 5
	}, this);
}
//#endregion
export { SettingsTab as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NUYWItQlZpdTJYdXQuanMiLCJuYW1lcyI6WyJfX2ljb25Ob2RlIiwiX19pY29uTm9kZSIsIl9faWNvbk5vZGUiLCJfX2ljb25Ob2RlIiwiX19pY29uTm9kZSIsIl9faWNvbk5vZGUiXSwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2RvbGxhci1zaWduLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZXllLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvbG9nLW91dC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL21vdXNlLXBvaW50ZXIubWpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zbGlkZXJzLXZlcnRpY2FsLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdGFnLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdGltZXIubWpzIiwiLi4vLi4vc3JjL3BvcHVwL2NvbXBvbmVudHMvU2V0dGluZ3NUYWIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wibGluZVwiLCB7IHgxOiBcIjEyXCIsIHgyOiBcIjEyXCIsIHkxOiBcIjJcIiwgeTI6IFwiMjJcIiwga2V5OiBcIjdlcXlxaFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTcgNUg5LjVhMy41IDMuNSAwIDAgMCAwIDdoNWEzLjUgMy41IDAgMCAxIDAgN0g2XCIsIGtleTogXCIxYjBwNHNcIiB9XVxuXTtcbmNvbnN0IERvbGxhclNpZ24gPSBjcmVhdGVMdWNpZGVJY29uKFwiZG9sbGFyLXNpZ25cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIERvbGxhclNpZ24gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9sbGFyLXNpZ24ubWpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMFwiLFxuICAgICAga2V5OiBcIjFuY2xjMFwiXG4gICAgfVxuICBdLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjNcIiwga2V5OiBcIjF2N3pyZFwiIH1dXG5dO1xuY29uc3QgRXllID0gY3JlYXRlTHVjaWRlSWNvbihcImV5ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRXllIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV5ZS5tanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MS4zMS4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLm1qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0xNiAxNyA1LTUtNS01XCIsIGtleTogXCIxYmppMmhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTIxIDEySDlcIiwga2V5OiBcImRuMW05MlwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDRcIiwga2V5OiBcIjF1ZjNyc1wiIH1dXG5dO1xuY29uc3QgTG9nT3V0ID0gY3JlYXRlTHVjaWRlSWNvbihcImxvZy1vdXRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIExvZ091dCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2ctb3V0Lm1qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyLjU4NiAxMi41ODYgMTkgMTlcIiwga2V5OiBcImVhNXhvN1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMy42ODggMy4wMzdhLjQ5Ny40OTcgMCAwIDAtLjY1MS42NTFsNi41IDE1Ljk5OWEuNTAxLjUwMSAwIDAgMCAuOTQ3LS4wNjJsMS41NjktNi4wODNhMiAyIDAgMCAxIDEuNDQ4LTEuNDc5bDYuMTI0LTEuNTc5YS41LjUgMCAwIDAgLjA2My0uOTQ3elwiLFxuICAgICAga2V5OiBcIjI3N2U1dVwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgTW91c2VQb2ludGVyID0gY3JlYXRlTHVjaWRlSWNvbihcIm1vdXNlLXBvaW50ZXJcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIE1vdXNlUG9pbnRlciBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb3VzZS1wb2ludGVyLm1qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEwIDhoNFwiLCBrZXk6IFwiMXNyMmFmXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAyMXYtOVwiLCBrZXk6IFwiMTdzNzdpXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiA4VjNcIiwga2V5OiBcIjEzcjRxc1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTcgMTZoNFwiLCBrZXk6IFwiaDF1cTE2XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xOSAxMlYzXCIsIGtleTogXCJvMXV2cTFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE5IDIxdi01XCIsIGtleTogXCJxdWE2MzZcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgMTRoNFwiLCBrZXk6IFwiYmNqYWQ5XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk01IDEwVjNcIiwga2V5OiBcImNiOHNjbVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNNSAyMXYtN1wiLCBrZXk6IFwiMXcxdXRpXCIgfV1cbl07XG5jb25zdCBTbGlkZXJzVmVydGljYWwgPSBjcmVhdGVMdWNpZGVJY29uKFwic2xpZGVycy12ZXJ0aWNhbFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2xpZGVyc1ZlcnRpY2FsIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNsaWRlcnMtdmVydGljYWwubWpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjEuMzEuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5tanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTIuNTg2IDIuNTg2QTIgMiAwIDAgMCAxMS4xNzIgMkg0YTIgMiAwIDAgMC0yIDJ2Ny4xNzJhMiAyIDAgMCAwIC41ODYgMS40MTRsOC43MDQgOC43MDRhMi40MjYgMi40MjYgMCAwIDAgMy40MiAwbDYuNTgtNi41OGEyLjQyNiAyLjQyNiAwIDAgMCAwLTMuNDJ6XCIsXG4gICAgICBrZXk6IFwidmt0c2QwXCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjcuNVwiLCBjeTogXCI3LjVcIiwgcjogXCIuNVwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBrZXk6IFwia3F2OTQ0XCIgfV1cbl07XG5jb25zdCBUYWcgPSBjcmVhdGVMdWNpZGVJY29uKFwidGFnXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBUYWcgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFnLm1qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYxLjMxLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24ubWpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wibGluZVwiLCB7IHgxOiBcIjEwXCIsIHgyOiBcIjE0XCIsIHkxOiBcIjJcIiwgeTI6IFwiMlwiLCBrZXk6IFwiMTR2YXE4XCIgfV0sXG4gIFtcImxpbmVcIiwgeyB4MTogXCIxMlwiLCB4MjogXCIxNVwiLCB5MTogXCIxNFwiLCB5MjogXCIxMVwiLCBrZXk6IFwiMTdmZGl1XCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjE0XCIsIHI6IFwiOFwiLCBrZXk6IFwiMWUxdTBvXCIgfV1cbl07XG5jb25zdCBUaW1lciA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ0aW1lclwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVGltZXIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIubWpzLm1hcFxuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIExvZ091dCxcbiAgRXllLFxuICBUaW1lcixcbiAgTW91c2VQb2ludGVyLFxuICBJbmZvLFxuICBTaGllbGRDaGVjayxcbiAgRXh0ZXJuYWxMaW5rLFxuICBTbGlkZXJzLFxuICBCcmllZmNhc2UsXG4gIENoZWNrLFxuICBTYXZlLFxuICBEb2xsYXJTaWduLFxuICBHbG9iZSxcbiAgVGFnLFxuICBNYXBQaW4sXG4gIFJlZnJlc2hDdyxcbn0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHtcbiAgZ2V0U2V0dGluZ3MsXG4gIHVwZGF0ZVNldHRpbmdzLFxuICBnZXRQcmVmZXJlbmNlcyxcbiAgZmV0Y2hQcmVmZXJlbmNlcyxcbiAgc3luY1ByZWZlcmVuY2VzVG9CYWNrZW5kLFxufSBmcm9tIFwiLi4vLi4vbGliL3N0b3JhZ2VcIjtcbmltcG9ydCB7IHNpZ25PdXQgfSBmcm9tIFwiLi4vLi4vbGliL2F1dGhcIjtcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gXCIuLi8uLi9saWIvdG9hc3RcIjtcbmltcG9ydCB7IEFQUF9VUkwsIEFQSV9VUkwsIE1PREUsIEVOVl9MQUJFTCwgSVNfREVWLCBnZXRBcGlIb3N0LCBnZXRBcHBIb3N0IH0gZnJvbSBcIi4uLy4uL2xpYi9lbnZcIjtcbmltcG9ydCB0eXBlIHsgQXV0aFVzZXIsIEV4dGVuc2lvblNldHRpbmdzLCBKb2JQcmVmZXJlbmNlc0RhdGEgfSBmcm9tIFwiLi4vLi4vbGliL3R5cGVzXCI7XG5cbmludGVyZmFjZSBTZXR0aW5nc1RhYlByb3BzIHtcbiAgdXNlcjogQXV0aFVzZXI7XG4gIG9uU2lnbk91dDogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgQVZBSUxBQkxFX0pPQl9UWVBFUyA9IFtcbiAgeyBpZDogXCJmdWxsX3RpbWVcIiwgbGFiZWw6IFwiRnVsbC1UaW1lXCIgfSxcbiAgeyBpZDogXCJjb250cmFjdFwiLCBsYWJlbDogXCJDb250cmFjdFwiIH0sXG4gIHsgaWQ6IFwicGFydF90aW1lXCIsIGxhYmVsOiBcIlBhcnQtVGltZVwiIH0sXG4gIHsgaWQ6IFwiaW50ZXJuc2hpcFwiLCBsYWJlbDogXCJJbnRlcm5zaGlwXCIgfSxcbl0gYXMgY29uc3Q7XG5cbmNvbnN0IEFWQUlMQUJMRV9FWFBFUklFTkNFX0xFVkVMUyA9IFtcbiAgeyBpZDogXCJlbnRyeVwiLCBsYWJlbDogXCJFbnRyeVwiIH0sXG4gIHsgaWQ6IFwibWlkXCIsIGxhYmVsOiBcIk1pZFwiIH0sXG4gIHsgaWQ6IFwic2VuaW9yXCIsIGxhYmVsOiBcIlNlbmlvclwiIH0sXG4gIHsgaWQ6IFwibGVhZFwiLCBsYWJlbDogXCJMZWFkXCIgfSxcbiAgeyBpZDogXCJkaXJlY3RvclwiLCBsYWJlbDogXCJEaXJlY3RvclwiIH0sXG4gIHsgaWQ6IFwiZXhlY3V0aXZlXCIsIGxhYmVsOiBcIkV4ZWN1dGl2ZVwiIH0sXG5dIGFzIGNvbnN0O1xuXG5jb25zdCBDVVJSRU5DSUVTID0gW1wiVVNEXCIsIFwiRVVSXCIsIFwiR0JQXCIsIFwiQ0FEXCIsIFwiQVVEXCIsIFwiRUdQXCIsIFwiQUVEXCIsIFwiU0FSXCJdIGFzIGNvbnN0O1xuXG5mdW5jdGlvbiBTZWN0aW9uRXllYnJvdyh7IGxhYmVsLCBpY29uOiBJY29uIH06IHsgbGFiZWw6IHN0cmluZzsgaWNvbj86IHR5cGVvZiBTbGlkZXJzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbWItMi41XCI+XG4gICAgICB7SWNvbiAmJiA8SWNvbiBzaXplPXsxMn0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5XCIgLz59XG4gICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMThlbV0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvaDM+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNldHRpbmdzVGFiKHsgdXNlciwgb25TaWduT3V0IH06IFNldHRpbmdzVGFiUHJvcHMpIHtcbiAgY29uc3QgW3NldHRpbmdzLCBzZXRTZXR0aW5nc10gPSB1c2VTdGF0ZTxFeHRlbnNpb25TZXR0aW5ncyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbcHJlZmVyZW5jZXMsIHNldFByZWZlcmVuY2VzXSA9IHVzZVN0YXRlPEpvYlByZWZlcmVuY2VzRGF0YSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNTYXZpbmdQcmVmcywgc2V0SXNTYXZpbmdQcmVmc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcmVmc1NhdmVkLCBzZXRQcmVmc1NhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzU3luY2luZywgc2V0SXNTeW5jaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBGb3JtIHN0YXRlcyBmb3IgcHJlZmVyZW5jZXNcbiAgY29uc3QgW2pvYlR5cGVzLCBzZXRKb2JUeXBlc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICBjb25zdCBbZXhwZXJpZW5jZUxldmVscywgc2V0RXhwZXJpZW5jZUxldmVsc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICBjb25zdCBbcmVtb3RlT2ssIHNldFJlbW90ZU9rXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbc2FsYXJ5TWluLCBzZXRTYWxhcnlNaW5dID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5LCBzZXRDdXJyZW5jeV0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiVVNEXCIpO1xuICBjb25zdCBbbG9jYXRpb25zSW5wdXQsIHNldExvY2F0aW9uc0lucHV0XSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gIGNvbnN0IFtrZXl3b3Jkc0lucHV0LCBzZXRLZXl3b3Jkc0lucHV0XSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG5cbiAgY29uc3QgbG9hZERhdGEgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG4gICAgc2V0U2V0dGluZ3Mocyk7XG5cbiAgICBjb25zdCBsb2NhbFByZWZzID0gYXdhaXQgZ2V0UHJlZmVyZW5jZXMoKTtcbiAgICBzZXRQcmVmZXJlbmNlcyhsb2NhbFByZWZzKTtcbiAgICBzeW5jRm9ybUZyb21QcmVmcyhsb2NhbFByZWZzKTtcblxuICAgIC8vIEJhY2tncm91bmQgZmV0Y2ggbGF0ZXN0IHByZWZlcmVuY2VzIGZyb20gYmFja2VuZFxuICAgIHNldElzU3luY2luZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbGl2ZVByZWZzID0gYXdhaXQgZmV0Y2hQcmVmZXJlbmNlcygpO1xuICAgICAgaWYgKGxpdmVQcmVmcykge1xuICAgICAgICBzZXRQcmVmZXJlbmNlcyhsaXZlUHJlZnMpO1xuICAgICAgICBzeW5jRm9ybUZyb21QcmVmcyhsaXZlUHJlZnMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gS2VlcCBsb2NhbFxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1N5bmNpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZERhdGEoKTtcbiAgfSwgW2xvYWREYXRhXSk7XG5cbiAgY29uc3Qgc3luY0Zvcm1Gcm9tUHJlZnMgPSAocHJlZnM6IEpvYlByZWZlcmVuY2VzRGF0YSkgPT4ge1xuICAgIHNldEpvYlR5cGVzKHByZWZzLmpvYl90eXBlcyB8fCBbXSk7XG4gICAgc2V0RXhwZXJpZW5jZUxldmVscyhwcmVmcy5leHBlcmllbmNlX2xldmVscyB8fCBbXSk7XG4gICAgc2V0UmVtb3RlT2socHJlZnMucmVtb3RlX29rID8/IHRydWUpO1xuICAgIHNldFNhbGFyeU1pbihwcmVmcy5zYWxhcnlfbWluID8gU3RyaW5nKHByZWZzLnNhbGFyeV9taW4pIDogXCJcIik7XG4gICAgc2V0Q3VycmVuY3kocHJlZnMuY3VycmVuY3kgfHwgXCJVU0RcIik7XG4gICAgc2V0TG9jYXRpb25zSW5wdXQoKHByZWZzLmxvY2F0aW9ucyB8fCBbXSkuam9pbihcIiwgXCIpKTtcbiAgICBzZXRLZXl3b3Jkc0lucHV0KChwcmVmcy5rZXl3b3JkcyB8fCBbXSkuam9pbihcIiwgXCIpKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVKb2JUeXBlID0gKHR5cGVJZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Sm9iVHlwZXMoKHByZXYpID0+XG4gICAgICBwcmV2LmluY2x1ZGVzKHR5cGVJZCkgPyBwcmV2LmZpbHRlcigodCkgPT4gdCAhPT0gdHlwZUlkKSA6IFsuLi5wcmV2LCB0eXBlSWRdXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVFeHBlcmllbmNlTGV2ZWwgPSAoZXhwSWQ6IHN0cmluZykgPT4ge1xuICAgIHNldEV4cGVyaWVuY2VMZXZlbHMoKHByZXYpID0+XG4gICAgICBwcmV2LmluY2x1ZGVzKGV4cElkKSA/IHByZXYuZmlsdGVyKChlKSA9PiBlICE9PSBleHBJZCkgOiBbLi4ucHJldiwgZXhwSWRdXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlUHJlZmVyZW5jZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNTYXZpbmdQcmVmcyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jYXRpb25zID0gbG9jYXRpb25zSW5wdXRcbiAgICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgICAubWFwKChzKSA9PiBzLnRyaW0oKSlcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGNvbnN0IGtleXdvcmRzID0ga2V5d29yZHNJbnB1dFxuICAgICAgICAuc3BsaXQoXCIsXCIpXG4gICAgICAgIC5tYXAoKHMpID0+IHMudHJpbSgpKVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICBjb25zdCBwYXlsb2FkOiBKb2JQcmVmZXJlbmNlc0RhdGEgPSB7XG4gICAgICAgIC4uLihwcmVmZXJlbmNlcyB8fCB7fSksXG4gICAgICAgIGpvYl90eXBlczogam9iVHlwZXMsXG4gICAgICAgIGV4cGVyaWVuY2VfbGV2ZWxzOiBleHBlcmllbmNlTGV2ZWxzLFxuICAgICAgICByZW1vdGVfb2s6IHJlbW90ZU9rLFxuICAgICAgICBzYWxhcnlfbWluOiBzYWxhcnlNaW4gPyBwYXJzZUludChzYWxhcnlNaW4sIDEwKSA6IG51bGwsXG4gICAgICAgIGN1cnJlbmN5OiBjdXJyZW5jeS50b1VwcGVyQ2FzZSgpLnNsaWNlKDAsIDMpLFxuICAgICAgICBsb2NhdGlvbnMsXG4gICAgICAgIGtleXdvcmRzLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHN5bmNQcmVmZXJlbmNlc1RvQmFja2VuZChwYXlsb2FkKTtcbiAgICAgIHNldFByZWZlcmVuY2VzKHVwZGF0ZWQpO1xuICAgICAgc2V0UHJlZnNTYXZlZCh0cnVlKTtcbiAgICAgIHNob3dUb2FzdChcIkpvYiBwcmVmZXJlbmNlcyBzeW5jZWQgd2l0aCBjbG91ZFwiLCBcInN1Y2Nlc3NcIik7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFByZWZzU2F2ZWQoZmFsc2UpLCAyNTAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2F2ZSBwcmVmZXJlbmNlczpcIiwgZXJyKTtcbiAgICAgIHNob3dUb2FzdChcIkZhaWxlZCB0byBzeW5jIHByZWZlcmVuY2VzIHRvIGNsb3VkLiBTYXZlZCBsb2NhbGx5LlwiLCBcImVycm9yXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1NhdmluZ1ByZWZzKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlU2V0dGluZyA9IGFzeW5jIChrZXk6IGtleW9mIEV4dGVuc2lvblNldHRpbmdzLCB2YWw6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgdXBkYXRlU2V0dGluZ3MoeyBba2V5XTogdmFsIH0pO1xuICAgIHNldFNldHRpbmdzKHVwZGF0ZWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNpZ25PdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgc2lnbk91dCgpO1xuICAgIG9uU2lnbk91dCgpO1xuICB9O1xuXG4gIGlmICghc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBoLTQ4XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02IGgtNiBib3JkZXItMiBib3JkZXItcHJpbWFyeSBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiBwYi00XCI+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5QcmVmZXJlbmNlczwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiPkpvYiB0YXJnZXRpbmcgJiBleHRlbnNpb24gc2V0dGluZ3M8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXNTeW5jaW5nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgIDxSZWZyZXNoQ3cgc2l6ZT17MTF9IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U3luY2luZzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIDEuIEpvYiBTZWFyY2ggJiBEaXNjb3ZlcnkgUHJlZmVyZW5jZXMg4pSA4pSAICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1jYXJkIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLWJvcmRlci80MCBwYi0yLjVcIj5cbiAgICAgICAgICA8U2VjdGlvbkV5ZWJyb3cgbGFiZWw9XCJEaXNjb3ZlcnkgUHJlZmVyZW5jZXNcIiBpY29uPXtTbGlkZXJzfSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVByZWZlcmVuY2VzfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU2F2aW5nUHJlZnN9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BidG4tcHJpbWFyeSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQteHMgcHgtMyBweS0xLjUgc2hhZG93LTJ4cyAke1xuICAgICAgICAgICAgICBwcmVmc1NhdmVkID8gXCJiZy1lbWVyYWxkLTUwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGJvcmRlci1lbWVyYWxkLTYwMFwiIDogXCJcIlxuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzU2F2aW5nUHJlZnMgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgYm9yZGVyLTIgYm9yZGVyLXByaW1hcnktZm9yZWdyb3VuZCBib3JkZXItdC10cmFuc3BhcmVudCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICkgOiBwcmVmc1NhdmVkID8gKFxuICAgICAgICAgICAgICA8Q2hlY2sgc2l6ZT17MTN9IHN0cm9rZVdpZHRoPXszfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPFNhdmUgc2l6ZT17MTN9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPHNwYW4+e3ByZWZzU2F2ZWQgPyBcIlN5bmNlZFwiIDogaXNTYXZpbmdQcmVmcyA/IFwiU2F2aW5nLi4uXCIgOiBcIlNhdmUgUHJlZnNcIn08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBKb2IgVHlwZXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8QnJpZWZjYXNlIHNpemU9ezExfSAvPiBKb2IgVHlwZXNcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41XCI+XG4gICAgICAgICAgICB7QVZBSUxBQkxFX0pPQl9UWVBFUy5tYXAoKGp0KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBqb2JUeXBlcy5pbmNsdWRlcyhqdC5pZCk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBrZXk9e2p0LmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlSm9iVHlwZShqdC5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xLjUgcHgtMi41IHJvdW5kZWQteGwgYm9yZGVyIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy0yeHMgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5LzEwIGJvcmRlci1wcmltYXJ5LzMwIHRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgOiBcImJnLXNlY29uZGFyeS80MCBib3JkZXItYm9yZGVyLzUwIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmRcIlxuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2p0LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtpc1NlbGVjdGVkICYmIDxDaGVjayBzaXplPXsxMn0gc3Ryb2tlV2lkdGg9ezN9IC8+fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBFeHBlcmllbmNlIExldmVscyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxHbG9iZSBzaXplPXsxMX0gLz4gRXhwZXJpZW5jZSBMZXZlbFxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHtBVkFJTEFCTEVfRVhQRVJJRU5DRV9MRVZFTFMubWFwKChleHApID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGV4cGVyaWVuY2VMZXZlbHMuaW5jbHVkZXMoZXhwLmlkKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGtleT17ZXhwLmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlRXhwZXJpZW5jZUxldmVsKGV4cC5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHB4LTIgcm91bmRlZC14bCBib3JkZXIgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlciBzaGFkb3ctMnhzICR7XG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctcHJpbWFyeS8xMCBib3JkZXItcHJpbWFyeS8zMCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiYmctc2Vjb25kYXJ5LzQwIGJvcmRlci1ib3JkZXIvNTAgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZFwiXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7ZXhwLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZW1vdGUgJiBNaW5pbXVtIFNhbGFyeSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMSBib3JkZXItdCBib3JkZXItYm9yZGVyLzMwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlJlbW90ZSBSb2xlcyBQcmVmZXJyZWQ8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlByaW9yaXRpemUgcmVtb3RlICYgZmxleGlibGUgbGlzdGluZ3M8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFJlbW90ZU9rKCFyZW1vdGVPayl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctOSBoLTUgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgcmVtb3RlT2sgPyBcImJnLWVtZXJhbGQtNTAwXCIgOiBcImJnLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTEgdy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctd2hpdGUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgIHJlbW90ZU9rID8gXCJ0cmFuc2xhdGUteC01XCIgOiBcInRyYW5zbGF0ZS14LTFcIlxuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMiBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIDxEb2xsYXJTaWduIHNpemU9ezEwfSAvPiBNaW4gQmFzZSBTYWxhcnlcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NhbGFyeU1pbn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNhbGFyeU1pbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDkwMDAwXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBmb250LW1vbm8gdGV4dC14c1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgICBDdXJyZW5jeVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q3VycmVuY3koZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LWZpZWxkIGZvbnQtbW9ubyB0ZXh0LXhzIGJnLWNhcmRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge0NVUlJFTkNJRVMubWFwKChjdXJyKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17Y3Vycn0gdmFsdWU9e2N1cnJ9PlxuICAgICAgICAgICAgICAgICAgICB7Y3Vycn1cbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIExvY2F0aW9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8TWFwUGluIHNpemU9ezEwfSAvPiBUYXJnZXQgTG9jYXRpb25zXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2xvY2F0aW9uc0lucHV0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldExvY2F0aW9uc0lucHV0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIFJlbW90ZSwgU2FuIEZyYW5jaXNjbywgTG9uZG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtZmllbGQgdGV4dC14c1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEtleXdvcmRzIC8gUm9sZXMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFRhZyBzaXplPXsxMH0gLz4gVGFyZ2V0IFJvbGVzICYgU2tpbGxzXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2tleXdvcmRzSW5wdXR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0S2V5d29yZHNJbnB1dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBSZWFjdCwgUHl0aG9uLCBGdWxsIFN0YWNrXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtZmllbGQgdGV4dC14c1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIDIuIENvcGlsb3QgQXV0b21hdGlvbiBCZWhhdmlvciDilIDilIAgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgYmctc2Vjb25kYXJ5LzMwIGJvcmRlci1iIGJvcmRlci1ib3JkZXIvNTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMThlbV1cIj5cbiAgICAgICAgICAgIENvcGlsb3QgQXV0b2ZpbGwgQmVoYXZpb3JcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgIDxFeWUgc2l6ZT17MTV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPkxpdmUgQW5pbWF0aW9uPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlZpc3VhbCBmZWVkYmFjayBkdXJpbmcgZm9ybSBhdXRvZmlsbDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZVNldHRpbmcoXCJzaG93RmlsbEFuaW1hdGlvblwiLCAhc2V0dGluZ3Muc2hvd0ZpbGxBbmltYXRpb24pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB3LTkgaC01IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnNob3dGaWxsQW5pbWF0aW9uID8gXCJiZy1lbWVyYWxkLTUwMFwiIDogXCJiZy1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0xIHctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRyYW5zaXRpb24tdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zaG93RmlsbEFuaW1hdGlvbiA/IFwidHJhbnNsYXRlLXgtNVwiIDogXCJ0cmFuc2xhdGUteC0xXCJcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLWFjY2VudC8xMCBib3JkZXIgYm9yZGVyLWFjY2VudC8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWFjY2VudFwiPlxuICAgICAgICAgICAgICAgICAgPFRpbWVyIHNpemU9ezE1fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5GaWxsIEtleXN0cm9rZSBTcGVlZDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkVtdWxhdGVkIHR5cGluZyBjYWRlbmNlPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgYmctcHJpbWFyeS8xMCBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcHJpbWFyeS8yMFwiPlxuICAgICAgICAgICAgICAgIHtzZXR0aW5ncy5maWxsRGVsYXlNc31tc1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICBtaW49ezIwfVxuICAgICAgICAgICAgICBtYXg9ezIwMH1cbiAgICAgICAgICAgICAgc3RlcD17MTB9XG4gICAgICAgICAgICAgIHZhbHVlPXtzZXR0aW5ncy5maWxsRGVsYXlNc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHsgZmlsbERlbGF5TXM6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSkudGhlbihzZXRTZXR0aW5ncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXByaW1hcnkgaC0xLjUgYmctc2Vjb25kYXJ5IHJvdW5kZWQtbGcgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1wcmltYXJ5LzEwIGJvcmRlciBib3JkZXItcHJpbWFyeS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8TW91c2VQb2ludGVyIHNpemU9ezE1fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5BdXRvLVNjcm9sbDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5Gb2xsb3cgY3VycmVudCBmb2N1cyBmaWVsZCBpbiBBVFM8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVTZXR0aW5nKFwiYXV0b1Njcm9sbFwiLCAhc2V0dGluZ3MuYXV0b1Njcm9sbCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctOSBoLTUgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYXV0b1Njcm9sbCA/IFwiYmctZW1lcmFsZC01MDBcIiA6IFwiYmctc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMSB3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYXV0b1Njcm9sbCA/IFwidHJhbnNsYXRlLXgtNVwiIDogXCJ0cmFuc2xhdGUteC0xXCJcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIDMuIFVzZXIgQWNjb3VudCAmIFdlYiBTeW5jIOKUgOKUgCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtY2FyZCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgIDxTZWN0aW9uRXllYnJvdyBsYWJlbD1cIlVzZXIgQWNjb3VudFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcGItMiBib3JkZXItYiBib3JkZXItYm9yZGVyLzMwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctcHJpbWFyeSB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJvbGQgdGV4dC1zbSBzaGFkb3cteHNcIj5cbiAgICAgICAgICAgIHsodXNlci5uYW1lIHx8IHVzZXIuZW1haWwgfHwgXCJVXCIpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj57dXNlci5uYW1lIHx8IHVzZXIuZW1haWwgfHwgXCJVc2VyXCJ9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPnt1c2VyLmVtYWlsIHx8IFwiXCJ9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7QVBQX1VSTH0vcHJvZmlsZT90YWI9YnJvd3NlcmA7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNocm9tZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjaHJvbWUudGFicz8uY3JlYXRlKSB7XG4gICAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMyByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNDAgaG92ZXI6YmctcHJpbWFyeS81IGJvcmRlciBib3JkZXItYm9yZGVyLzUwIGhvdmVyOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIHRleHQtbGVmdCBjdXJzb3ItcG9pbnRlciBncm91cCBzaGFkb3ctMnhzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQteGwgYmctcHJpbWFyeS8xMCBib3JkZXIgYm9yZGVyLXByaW1hcnkvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgIDxTaGllbGRDaGVjayBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIGdyb3VwLWhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIEJyb3dzZXIgU3luYyBEYXNoYm9hcmRcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5NYW5hZ2UgY29ubmVjdGVkIHNlc3Npb25zIG9uIHdlYjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxFeHRlcm5hbExpbmsgc2l6ZT17MTR9IGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZCBncm91cC1ob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvbi1jb2xvcnNcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIDQuIEVudmlyb25tZW50IOKUgOKUgCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ2xhc3MtY2FyZCBwLTMuNSBzcGFjZS15LTIuNSBib3JkZXIgJHtJU19ERVYgPyBcImJvcmRlci1hbWJlci01MDAvMzAgYmctYW1iZXItNTAwL1swLjA0XVwiIDogXCJib3JkZXItZW1lcmFsZC01MDAvMjAgYmctZW1lcmFsZC01MDAvWzAuMDNdXCJ9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMThlbV0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxHbG9iZSBzaXplPXsxMX0gY2xhc3NOYW1lPXtJU19ERVYgPyBcInRleHQtYW1iZXItNTAwXCIgOiBcInRleHQtZW1lcmFsZC01MDBcIn0gLz5cbiAgICAgICAgICAgIEVudmlyb25tZW50XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB0aXRsZT17YCR7TU9ERX0g4oCiICR7QVBJX1VSTH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJvcmRlciAke1xuICAgICAgICAgICAgICBJU19ERVZcbiAgICAgICAgICAgICAgICA/IFwiYmctYW1iZXItNTAwIHRleHQtd2hpdGUgYm9yZGVyLWFtYmVyLTYwMFwiXG4gICAgICAgICAgICAgICAgOiBcImJnLWVtZXJhbGQtNTAwLzEwIHRleHQtZW1lcmFsZC03MDAgYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMS41IGgtMS41IHJvdW5kZWQtZnVsbCAke0lTX0RFViA/IFwiYmctd2hpdGUgYW5pbWF0ZS1wdWxzZVwiIDogXCJiZy1lbWVyYWxkLTUwMFwifWB9IC8+XG4gICAgICAgICAgICB7RU5WX0xBQkVMfSDigKIge01PREV9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGdhcC0xLjUgdGV4dC1bMTFweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHgtMi41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeS81MCBib3JkZXIgYm9yZGVyLWJvcmRlci80MFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSBzaHJpbmstMFwiPkFQSTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZCBmb250LW1lZGl1bSB0cnVuY2F0ZSB0ZXh0LXJpZ2h0XCIgdGl0bGU9e0FQSV9VUkx9PntnZXRBcGlIb3N0KCl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHB4LTIuNSBweS0xLjUgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkvNTAgYm9yZGVyIGJvcmRlci1ib3JkZXIvNDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUgc2hyaW5rLTBcIj5BUFA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWZvcmVncm91bmQgZm9udC1tZWRpdW0gdHJ1bmNhdGUgdGV4dC1yaWdodFwiIHRpdGxlPXtBUFBfVVJMfT57Z2V0QXBwSG9zdCgpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBsZWFkaW5nLXJlbGF4ZWQgcHgtMC41XCI+XG4gICAgICAgICAge0lTX0RFViA/IFwiTG9jYWwgZGV2IGJ1aWxkIOKAlCB0YWxrcyB0byBsb2NhbGhvc3QuIE1hbmlmZXN0IHNob3dzIFtERVZdIGluIGNocm9tZTovL2V4dGVuc2lvbnMuXCIgOiBcIlByb2R1Y3Rpb24gYnVpbGQg4oCUIHRhbGtzIHRvIHZlY3RhaS50ZWNoLiBObyBbREVWXSB0YWcuXCJ9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIDUuIFN0b3JhZ2UgJiBTaWduIE91dCDilIDilIAgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWNhcmQgcC00IHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtZW1lcmFsZC01MDBcIj5cbiAgICAgICAgICA8U2hpZWxkQ2hlY2sgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgQ2xvdWQgJiBMb2NhbCBTeW5jIEFjdGl2ZVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMi41IGJvcmRlci10IGJvcmRlci1ib3JkZXIvNDAgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgIDxJbmZvIHNpemU9ezEyfSAvPlxuICAgICAgICAgICAgPHNwYW4+djEuNS4wIFN0YWJsZTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCI+VmVjdGEgQUk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNpZ25PdXR9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0yLjUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1kZXN0cnVjdGl2ZS8yMCB0ZXh0LWRlc3RydWN0aXZlIHRleHQteHMgZm9udC1ib2xkIGhvdmVyOmJnLWRlc3RydWN0aXZlLzEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgID5cbiAgICAgICAgPExvZ091dCBzaXplPXsxNX0gLz5cbiAgICAgICAgPHNwYW4+U2lnbiBPdXQgZnJvbSBDb3BpbG90PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDZdLCJtYXBw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