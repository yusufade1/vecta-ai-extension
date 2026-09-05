import { c as apiFetch, l as API_URL } from "./auth-R0qBMroa.js";
//#region src/lib/profile.ts
/**
* Bridge the backend `Profile` shape (flat, snake_case) and the success
* envelope into the extension's nested `UserProfile` (camelCase, `personal.*`).
*
* The backend `Profile` model has fields such as `phone`, `location`, `linkedin_url`,
* `github_url`, `portfolio_url`, `headline`, `years_of_experience`, `seniority_level`,
* `desired_titles`, `tech_stack`, `skills`, `industries`, `education_level`,
* `work_authorization`, `notice_period_days`, `open_to_relocation`, `experience`
* (JSON), `education` (JSON), `structured_data`, etc.
*/
function normalizeProfile(raw, existing) {
	if (!raw || typeof raw !== "object") return existing ?? emptyProfile();
	const obj = raw;
	if (obj.personal && typeof obj.personal === "object") {
		const base = existing ?? emptyProfile();
		return {
			...base,
			...obj,
			personal: {
				...base.personal,
				...obj.personal
			},
			resume: obj.resume ?? existing?.resume ?? null,
			answers: obj.answers ?? existing?.answers ?? {},
			experience: Array.isArray(obj.experience) ? obj.experience : base.experience,
			education: Array.isArray(obj.education) ? obj.education : base.education
		};
	}
	let payload = obj;
	if ("data" in obj && obj.data && typeof obj.data === "object" && !("personal" in obj)) payload = obj.data;
	const user = payload.user && typeof payload.user === "object" ? payload.user : {};
	const fullName = payload.name || user.name || "";
	const email = payload.email || user.email || "";
	const nameParts = fullName.trim().split(/\s+/);
	const firstName = nameParts[0] || "";
	const lastName = nameParts.slice(1).join(" ").trim();
	const headline = payload.headline || "";
	const desiredTitles = Array.isArray(payload.desired_titles) ? payload.desired_titles : typeof payload.desired_titles === "string" ? payload.desired_titles.split(",").map((s) => s.trim()).filter(Boolean) : [];
	const techStack = Array.isArray(payload.tech_stack) ? payload.tech_stack : typeof payload.tech_stack === "string" ? payload.tech_stack.split(",").map((s) => s.trim()).filter(Boolean) : [];
	const skills = Array.isArray(payload.skills) ? payload.skills : typeof payload.skills === "string" ? payload.skills.split(",").map((s) => s.trim()).filter(Boolean) : techStack;
	const industries = Array.isArray(payload.industries) ? payload.industries : typeof payload.industries === "string" ? payload.industries.split(",").map((s) => s.trim()).filter(Boolean) : [];
	const personal = {
		firstName,
		lastName,
		name: fullName,
		email,
		phone: payload.phone || "",
		location: payload.location || "",
		country: "",
		city: "",
		address: "",
		linkedinUrl: payload.linkedin_url || "",
		githubUrl: payload.github_url || "",
		websiteUrl: payload.portfolio_url || "",
		summary: headline || payload.summary || "",
		headline,
		yearsOfExperience: payload.years_of_experience ?? "",
		seniorityLevel: payload.seniority_level || "",
		desiredTitles,
		educationLevel: payload.education_level || "",
		techStack,
		skills,
		industries,
		workAuthorization: payload.work_authorization || "",
		noticePeriodDays: payload.notice_period_days ?? "",
		openToRelocation: payload.open_to_relocation ?? false
	};
	const structured = payload.structured_data && typeof payload.structured_data === "object" ? payload.structured_data : {};
	return {
		personal,
		experience: Array.isArray(payload.experience) && payload.experience.length > 0 ? payload.experience : Array.isArray(structured.experience) ? structured.experience : existing?.experience ?? [],
		education: Array.isArray(payload.education) && payload.education.length > 0 ? payload.education : Array.isArray(structured.education) ? structured.education : existing?.education ?? [],
		resume: existing?.resume ?? null,
		answers: existing?.answers ?? {}
	};
}
function emptyProfile() {
	return {
		personal: {
			firstName: "",
			lastName: "",
			name: "",
			email: "",
			phone: "",
			location: "",
			country: "",
			city: "",
			address: "",
			linkedinUrl: "",
			githubUrl: "",
			websiteUrl: "",
			summary: "",
			headline: "",
			yearsOfExperience: "",
			seniorityLevel: "",
			desiredTitles: [],
			educationLevel: "",
			techStack: [],
			skills: [],
			industries: [],
			workAuthorization: "",
			noticePeriodDays: "",
			openToRelocation: false
		},
		experience: [],
		education: [],
		resume: null,
		answers: {}
	};
}
//#endregion
//#region src/lib/storage.ts
async function getProfile() {
	const raw = (await chrome.storage.local.get("profile")).profile;
	if (!raw) return null;
	return normalizeProfile(raw);
}
async function setProfile(profile) {
	await chrome.storage.local.set({ profile });
}
async function fetchProfile() {
	try {
		const normalized = normalizeProfile(await apiFetch("/api/profile/me/"), await getProfile());
		await setProfile(normalized);
		return normalized;
	} catch (err) {
		console.warn("Could not fetch remote profile:", err);
		return getProfile();
	}
}
async function syncProfileToBackend(profile) {
	try {
		const p = profile.personal;
		const payload = {
			phone: p.phone || "",
			location: p.location || "",
			linkedin_url: p.linkedinUrl || "",
			github_url: p.githubUrl || "",
			portfolio_url: p.websiteUrl || "",
			headline: p.headline || p.summary || "",
			years_of_experience: p.yearsOfExperience ? Number(p.yearsOfExperience) : null,
			seniority_level: p.seniorityLevel || "",
			desired_titles: Array.isArray(p.desiredTitles) ? p.desiredTitles : [],
			education_level: p.educationLevel || "",
			tech_stack: Array.isArray(p.techStack) ? p.techStack : [],
			skills: Array.isArray(p.skills) && p.skills.length > 0 ? p.skills : Array.isArray(p.techStack) ? p.techStack : [],
			industries: Array.isArray(p.industries) ? p.industries : [],
			work_authorization: p.workAuthorization || "",
			notice_period_days: p.noticePeriodDays ? Number(p.noticePeriodDays) : null,
			open_to_relocation: p.openToRelocation ?? false,
			experience: profile.experience || [],
			education: profile.education || [],
			structured_data: {
				experience: profile.experience || [],
				education: profile.education || []
			}
		};
		if (p.name) payload.name = p.name;
		await apiFetch("/api/profile/me/", {
			method: "PATCH",
			body: JSON.stringify(payload)
		});
		return true;
	} catch (err) {
		console.warn("Failed to sync profile to backend:", err);
		return false;
	}
}
async function completeOnboarding() {
	await chrome.storage.local.set({ onboardingComplete: true });
}
async function isOnboardingComplete() {
	return !!(await chrome.storage.local.get("onboardingComplete")).onboardingComplete;
}
var defaultCredits = {
	plan: "free",
	plan_allowance: 0,
	credits_remaining: 0,
	credits_top_up: 0,
	credits_reserved: 0,
	resets_at: "",
	referral_code: null,
	referrals_count: 0
};
async function getCredits() {
	return (await chrome.storage.local.get("credits")).credits ?? defaultCredits;
}
async function setCredits(credits) {
	await chrome.storage.local.set({ credits });
}
/**
* Fetch the live credit balance + plan from the backend and persist it locally.
*/
async function fetchCredits() {
	try {
		const res = await apiFetch("/api/credit-balance/");
		const raw = (res && "data" in res ? res.data : res) || null;
		if (!raw) return null;
		const credits = {
			plan: raw.plan ?? "free",
			plan_allowance: raw.plan_allowance ?? 0,
			credits_remaining: raw.credits_remaining ?? 0,
			credits_top_up: raw.credits_top_up ?? 0,
			credits_reserved: raw.credits_reserved ?? 0,
			resets_at: raw.resets_at ?? "",
			referral_code: raw.referral_code ?? null,
			referrals_count: raw.referrals_count ?? 0
		};
		await setCredits(credits);
		return credits;
	} catch {
		return null;
	}
}
async function getStats() {
	return (await chrome.storage.local.get("stats")).stats || {
		applicationsSubmitted: 0,
		interviewsSecured: 0,
		timeSavedMinutes: 0,
		totalApplications: 0,
		successfulApplications: 0,
		currentStreak: 0,
		longestStreak: 0,
		weeklyApplications: 0
	};
}
async function setReferral(info) {
	await chrome.storage.local.set({ referral: info });
}
var defaultSettings = {
	autoFillEnabled: true,
	fillDelayMs: 50,
	showFillAnimation: true,
	autoScroll: true
};
async function getSettings() {
	const data = await chrome.storage.local.get("settings");
	return {
		...defaultSettings,
		...data.settings || {}
	};
}
async function updateSettings(settings) {
	const updated = {
		...await getSettings(),
		...settings
	};
	await chrome.storage.local.set({ settings: updated });
	return updated;
}
var defaultJobPreferences = {
	job_types: ["full_time"],
	experience_levels: ["mid", "senior"],
	remote_ok: true,
	salary_min: null,
	salary_max: null,
	currency: "USD",
	locations: [],
	keywords: []
};
async function getPreferences() {
	const data = await chrome.storage.local.get("job_preferences");
	return {
		...defaultJobPreferences,
		...data.job_preferences || {}
	};
}
async function setPreferences(prefs) {
	await chrome.storage.local.set({ job_preferences: prefs });
}
/**
* Fetch live JobPreferences from backend (/api/preferences/) and sync to local storage.
*/
async function fetchPreferences() {
	try {
		const res = await apiFetch("/api/preferences/");
		const raw = (res && "data" in res ? res.data : res) || null;
		const list = raw?.results || (Array.isArray(raw) ? raw : []);
		const item = list.length > 0 ? list[0] : raw?.id ? raw : null;
		if (!item) return null;
		const normalized = {
			id: item.id,
			job_types: Array.isArray(item.job_types) ? item.job_types : [],
			experience_levels: Array.isArray(item.experience_levels) ? item.experience_levels : [],
			remote_ok: item.remote_ok ?? true,
			salary_min: item.salary_min ? Number(item.salary_min) : null,
			salary_max: item.salary_max ? Number(item.salary_max) : null,
			currency: item.currency || "USD",
			locations: Array.isArray(item.locations) ? item.locations : [],
			keywords: Array.isArray(item.keywords) ? item.keywords : []
		};
		await setPreferences(normalized);
		return normalized;
	} catch (err) {
		console.warn("Could not fetch preferences from backend:", err);
		return null;
	}
}
/**
* Save JobPreferences to both local storage and backend API (/api/preferences/).
*/
async function syncPreferencesToBackend(prefs) {
	await setPreferences(prefs);
	try {
		const payload = {
			job_types: prefs.job_types,
			experience_levels: prefs.experience_levels,
			remote_ok: prefs.remote_ok,
			salary_min: prefs.salary_min,
			salary_max: prefs.salary_max ?? null,
			currency: prefs.currency.toUpperCase().slice(0, 3),
			locations: prefs.locations,
			keywords: prefs.keywords
		};
		const res = await apiFetch("/api/preferences/", {
			method: "POST",
			body: JSON.stringify(payload)
		});
		const saved = (res && "data" in res ? res.data : res) || {};
		const result = {
			...prefs,
			id: saved.id || prefs.id
		};
		await setPreferences(result);
		return result;
	} catch (err) {
		console.error("Failed to sync preferences to backend API:", err);
		throw err;
	}
}
//#endregion
//#region src/lib/providers.ts
/** Group metadata used to render section headers in the UI. */
var PROVIDER_GROUPS = [{
	id: "board",
	label: "Job Boards & Aggregators",
	description: "Search engines and boards where jobs are listed and discovered"
}, {
	id: "ats",
	label: "Applicant Tracking Systems",
	description: "Where you complete and submit the actual application"
}];
var PROVIDERS = [
	{
		id: "linkedin",
		name: "LinkedIn",
		group: "board",
		domains: ["linkedin.com"],
		color: "bg-[#0077B5]",
		supportsSync: true,
		cookieDomain: "linkedin.com"
	},
	{
		id: "indeed",
		name: "Indeed",
		group: "board",
		domains: ["indeed.com"],
		color: "bg-[#2164F3]",
		supportsSync: true,
		cookieDomain: "indeed.com"
	},
	{
		id: "glassdoor",
		name: "Glassdoor",
		group: "board",
		domains: ["glassdoor.com"],
		color: "bg-[#0CAA41]",
		supportsSync: true,
		cookieDomain: "glassdoor.com"
	},
	{
		id: "bayt",
		name: "Bayt",
		group: "board",
		domains: ["bayt.com"],
		color: "bg-[#1E7A34]",
		supportsSync: true,
		cookieDomain: "bayt.com"
	},
	{
		id: "reed",
		name: "Reed",
		group: "board",
		domains: ["reed.co.uk"],
		color: "bg-[#005DAA]",
		supportsSync: true,
		cookieDomain: "reed.co.uk"
	},
	{
		id: "builtin",
		name: "BuiltIn",
		group: "board",
		domains: ["builtin.com"],
		color: "bg-[#0E2D52]",
		supportsSync: true,
		cookieDomain: "builtin.com"
	},
	{
		id: "dice",
		name: "Dice",
		group: "board",
		domains: ["dice.com"],
		color: "bg-[#1F7A3D]",
		supportsSync: false
	},
	{
		id: "ziprecruiter",
		name: "ZipRecruiter",
		group: "board",
		domains: ["ziprecruiter.com"],
		color: "bg-[#F26C6C]",
		supportsSync: true,
		cookieDomain: "ziprecruiter.com"
	},
	{
		id: "wellfound",
		name: "Wellfound",
		group: "board",
		domains: ["wellfound.com", "angellist.com"],
		color: "bg-[#2B2D42]",
		supportsSync: false
	},
	{
		id: "seek",
		name: "Seek",
		group: "board",
		domains: ["seek.com"],
		color: "bg-[#5B2EE5]",
		supportsSync: false
	},
	{
		id: "monster",
		name: "Monster",
		group: "board",
		domains: ["monster.com"],
		color: "bg-[#1A6FC4]",
		supportsSync: false
	},
	{
		id: "careerbuilder",
		name: "CareerBuilder",
		group: "board",
		domains: ["careerbuilder.com"],
		color: "bg-[#00A94F]",
		supportsSync: false
	},
	{
		id: "simplyhired",
		name: "SimplyHired",
		group: "board",
		domains: ["simplyhired.com"],
		color: "bg-[#2E8B57]",
		supportsSync: false
	},
	{
		id: "cvlibrary",
		name: "CV-Library",
		group: "board",
		domains: ["cv-library.co.uk"],
		color: "bg-[#E2231A]",
		supportsSync: false
	},
	{
		id: "totaljobs",
		name: "TotalJobs",
		group: "board",
		domains: ["totaljobs.com"],
		color: "bg-[#F26C2B]",
		supportsSync: false
	},
	{
		id: "jobserve",
		name: "JobServe",
		group: "board",
		domains: ["jobserve.com"],
		color: "bg-[#0B7A3B]",
		supportsSync: false
	},
	{
		id: "jobsite",
		name: "Jobsite",
		group: "board",
		domains: ["jobsite.co.uk"],
		color: "bg-[#FF6B00]",
		supportsSync: false
	},
	{
		id: "stepstone",
		name: "StepStone",
		group: "board",
		domains: ["stepstone.com", "stepstone.de"],
		color: "bg-[#0098C3]",
		supportsSync: false
	},
	{
		id: "xing",
		name: "XING",
		group: "board",
		domains: ["xing.com"],
		color: "bg-[#006567]",
		supportsSync: false
	},
	{
		id: "naukri",
		name: "Naukri",
		group: "board",
		domains: ["naukri.com"],
		color: "bg-[#E03C31]",
		supportsSync: false
	},
	{
		id: "naukrigulf",
		name: "NaukriGulf",
		group: "board",
		domains: ["naukrigulf.com"],
		color: "bg-[#1C7CC4]",
		supportsSync: true,
		cookieDomain: "naukrigulf.com"
	},
	{
		id: "wuzzuf",
		name: "Wuzzuf",
		group: "board",
		domains: ["wuzzuf.net"],
		color: "bg-[#0AA86E]",
		supportsSync: false
	},
	{
		id: "gulftalent",
		name: "Gulftalent",
		group: "board",
		domains: ["gulftalent.com"],
		color: "bg-[#C8102E]",
		supportsSync: false
	},
	{
		id: "adzuna",
		name: "Adzuna",
		group: "board",
		domains: ["adzuna.com"],
		color: "bg-[#FF6B35]",
		supportsSync: false
	},
	{
		id: "remoteok",
		name: "RemoteOK",
		group: "board",
		domains: ["remoteok.com"],
		color: "bg-[#1A1A1A]",
		supportsSync: false
	},
	{
		id: "weworkremotely",
		name: "We Work Remotely",
		group: "board",
		domains: ["weworkremotely.com"],
		color: "bg-[#4A4A4A]",
		supportsSync: false
	},
	{
		id: "flexjobs",
		name: "FlexJobs",
		group: "board",
		domains: ["flexjobs.com"],
		color: "bg-[#0F9D58]",
		supportsSync: false
	},
	{
		id: "hired",
		name: "Hired",
		group: "board",
		domains: ["hired.com"],
		color: "bg-[#F5506B]",
		supportsSync: false
	},
	{
		id: "craigslist",
		name: "Craigslist",
		group: "board",
		domains: ["craigslist.org"],
		color: "bg-[#0068A8]",
		supportsSync: false
	},
	{
		id: "greenhouse",
		name: "Greenhouse",
		group: "ats",
		domains: ["greenhouse.io"],
		color: "bg-[#3A7D44]",
		supportsSync: false
	},
	{
		id: "lever",
		name: "Lever",
		group: "ats",
		domains: ["lever.co"],
		color: "bg-[#0C9CEE]",
		supportsSync: false
	},
	{
		id: "workday",
		name: "Workday",
		group: "ats",
		domains: ["workday.com"],
		color: "bg-[#005CB9]",
		supportsSync: false
	},
	{
		id: "workable",
		name: "Workable",
		group: "ats",
		domains: ["workable.com"],
		color: "bg-[#1CA39B]",
		supportsSync: true,
		cookieDomain: "workable.com"
	},
	{
		id: "ashby",
		name: "Ashby",
		group: "ats",
		domains: ["ashbyhq.com"],
		color: "bg-[#5B5BD6]",
		supportsSync: false
	},
	{
		id: "smartrecruiters",
		name: "SmartRecruiters",
		group: "ats",
		domains: ["smartrecruiters.com"],
		color: "bg-[#1F9BCF]",
		supportsSync: false
	},
	{
		id: "taleo",
		name: "Taleo",
		group: "ats",
		domains: ["taleo.net"],
		color: "bg-[#C74634]",
		supportsSync: false
	},
	{
		id: "jazzhr",
		name: "JazzHR",
		group: "ats",
		domains: ["applytojob.com"],
		color: "bg-[#6B4FBB]",
		supportsSync: false
	},
	{
		id: "pinpoint",
		name: "Pinpoint",
		group: "ats",
		domains: ["pinpointhq.com", "pinpoint.com"],
		color: "bg-[#2E5AAC]",
		supportsSync: false
	},
	{
		id: "teamtailor",
		name: "Teamtailor",
		group: "ats",
		domains: ["teamtailor.com"],
		color: "bg-[#5C4BC6]",
		supportsSync: false
	},
	{
		id: "personio",
		name: "Personio",
		group: "ats",
		domains: ["personio.com", "personio.de"],
		color: "bg-[#1763C9]",
		supportsSync: false
	},
	{
		id: "bamboohr",
		name: "BambooHR",
		group: "ats",
		domains: ["bamboohr.com"],
		color: "bg-[#5B4FCF]",
		supportsSync: false
	},
	{
		id: "jobvite",
		name: "Jobvite",
		group: "ats",
		domains: ["jobvite.com"],
		color: "bg-[#E2553B]",
		supportsSync: false
	},
	{
		id: "recruitee",
		name: "Recruitee",
		group: "ats",
		domains: ["recruitee.com"],
		color: "bg-[#17A99A]",
		supportsSync: false
	},
	{
		id: "breezy",
		name: "Breezy HR",
		group: "ats",
		domains: ["breezy.hr"],
		color: "bg-[#17B3A6]",
		supportsSync: false
	},
	{
		id: "icims",
		name: "iCIMS",
		group: "ats",
		domains: ["icims.com"],
		color: "bg-[#0A6CB0]",
		supportsSync: false
	},
	{
		id: "avature",
		name: "Avature",
		group: "ats",
		domains: ["avature.net"],
		color: "bg-[#7C3AED]",
		supportsSync: false
	}
];
//#endregion
//#region src/lib/providerSync.ts
var STORAGE_KEY = "providers";
/** Bare registrable domains used for cookie sync (only backend-supported). */
var COOKIE_DOMAINS = {
	linkedin: "linkedin.com",
	indeed: "indeed.com",
	glassdoor: "glassdoor.com",
	bayt: "bayt.com",
	reed: "reed.co.uk",
	naukrigulf: "naukrigulf.com",
	builtin: "builtin.com",
	ziprecruiter: "ziprecruiter.com",
	workable: "workable.com"
};
function normalize(p) {
	return {
		id: p.name,
		name: p.display_name,
		group: p.group ?? "ats",
		url_patterns: p.url_patterns && p.url_patterns.length ? p.url_patterns : void 0,
		color: p.color || "#64748B",
		supportsSync: Boolean(p.supports_sync),
		cookieDomain: COOKIE_DOMAINS[p.name]
	};
}
/** Fallback seed (offline / unauthenticated), shaped like the dynamic list. */
function fallbackProviders() {
	return PROVIDERS.map((p) => ({
		id: p.id,
		name: p.name,
		group: p.group,
		domains: p.domains,
		color: p.color,
		supportsSync: p.supportsSync,
		cookieDomain: p.cookieDomain
	}));
}
/** Read the cached provider list (dynamic if present, else fallback). */
async function getActiveProviders() {
	try {
		const cached = (await chrome.storage.local.get(STORAGE_KEY))[STORAGE_KEY];
		if (cached && cached.length) return cached;
	} catch {}
	return fallbackProviders();
}
/** Fetch the latest providers from the backend and cache them. */
async function refreshProviders() {
	try {
		const { token } = await chrome.storage.local.get("token");
		const headers = { Accept: "application/json" };
		if (token) headers.Authorization = `Bearer ${token}`;
		const res = await fetch(`${API_URL}/api/ats-providers/`, {
			credentials: "include",
			headers
		});
		if (!res.ok) throw new Error(`Backend returned ${res.status}`);
		const body = await res.json();
		const rows = body.results || body.data?.results || body.data || body;
		if (!Array.isArray(rows) || rows.length === 0) throw new Error("Empty provider list");
		const normalized = rows.map(normalize);
		await chrome.storage.local.set({ [STORAGE_KEY]: normalized });
		return normalized;
	} catch {
		return getActiveProviders();
	}
}
/** Synchronous-ish test used by the detector (patterns may be regex). */
function urlMatchesProvider(url, p) {
	if (p.url_patterns && p.url_patterns.length) return p.url_patterns.some((pat) => {
		try {
			return new RegExp(pat, "i").test(url);
		} catch {
			return false;
		}
	});
	if (p.domains && p.domains.length) return p.domains.some((d) => url.includes(d));
	return false;
}
//#endregion
//#region src/lib/ats-detector.ts
function toActive(p) {
	return {
		id: p.id,
		name: p.name,
		group: p.group,
		domains: p.domains,
		color: p.color,
		supportsSync: p.supportsSync,
		cookieDomain: p.cookieDomain
	};
}
var cache = PROVIDERS.map(toActive);
getActiveProviders().then((list) => {
	if (list.length) cache = list;
});
refreshProviders().then((list) => {
	if (list.length) cache = list;
});
function detectATS(url) {
	if (!url) return "unsupported";
	for (const p of cache) if (urlMatchesProvider(url, p)) return p.id;
	return "unsupported";
}
function getATSDisplayName(atsType) {
	if (!atsType || atsType === "unsupported") return "Vecta AI";
	return cache.find((p) => p.id === atsType)?.name ?? "Vecta AI";
}
PROVIDERS.map((p) => p.id);
//#endregion
export { setReferral as _, PROVIDER_GROUPS as a, updateSettings as b, fetchPreferences as c, getPreferences as d, getProfile as f, setProfile as g, isOnboardingComplete as h, refreshProviders as i, fetchProfile as l, getStats as m, getATSDisplayName as n, completeOnboarding as o, getSettings as p, getActiveProviders as r, fetchCredits as s, detectATS as t, getCredits as u, syncPreferencesToBackend as v, normalizeProfile as x, syncProfileToBackend as y };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRzLWRldGVjdG9yLUNyb1A5NndXLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvZmlsZS50cyIsIi4uLy4uL3NyYy9saWIvc3RvcmFnZS50cyIsIi4uLy4uL3NyYy9saWIvcHJvdmlkZXJzLnRzIiwiLi4vLi4vc3JjL2xpYi9wcm92aWRlclN5bmMudHMiLCIuLi8uLi9zcmMvbGliL2F0cy1kZXRlY3Rvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFVzZXJQcm9maWxlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBCcmlkZ2UgdGhlIGJhY2tlbmQgYFByb2ZpbGVgIHNoYXBlIChmbGF0LCBzbmFrZV9jYXNlKSBhbmQgdGhlIHN1Y2Nlc3NcbiAqIGVudmVsb3BlIGludG8gdGhlIGV4dGVuc2lvbidzIG5lc3RlZCBgVXNlclByb2ZpbGVgIChjYW1lbENhc2UsIGBwZXJzb25hbC4qYCkuXG4gKlxuICogVGhlIGJhY2tlbmQgYFByb2ZpbGVgIG1vZGVsIGhhcyBmaWVsZHMgc3VjaCBhcyBgcGhvbmVgLCBgbG9jYXRpb25gLCBgbGlua2VkaW5fdXJsYCxcbiAqIGBnaXRodWJfdXJsYCwgYHBvcnRmb2xpb191cmxgLCBgaGVhZGxpbmVgLCBgeWVhcnNfb2ZfZXhwZXJpZW5jZWAsIGBzZW5pb3JpdHlfbGV2ZWxgLFxuICogYGRlc2lyZWRfdGl0bGVzYCwgYHRlY2hfc3RhY2tgLCBgc2tpbGxzYCwgYGluZHVzdHJpZXNgLCBgZWR1Y2F0aW9uX2xldmVsYCxcbiAqIGB3b3JrX2F1dGhvcml6YXRpb25gLCBgbm90aWNlX3BlcmlvZF9kYXlzYCwgYG9wZW5fdG9fcmVsb2NhdGlvbmAsIGBleHBlcmllbmNlYFxuICogKEpTT04pLCBgZWR1Y2F0aW9uYCAoSlNPTiksIGBzdHJ1Y3R1cmVkX2RhdGFgLCBldGMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVQcm9maWxlKFxuICByYXc6IHVua25vd24sXG4gIGV4aXN0aW5nPzogVXNlclByb2ZpbGUgfCBudWxsXG4pOiBVc2VyUHJvZmlsZSB7XG4gIGlmICghcmF3IHx8IHR5cGVvZiByYXcgIT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZXhpc3RpbmcgPz8gZW1wdHlQcm9maWxlKCk7XG4gIH1cblxuICBjb25zdCBvYmogPSByYXcgYXMgUmVjb3JkPHN0cmluZywgYW55PjtcblxuICAvLyBBbHJlYWR5IGluIGV4dGVuc2lvbiBzaGFwZSAtIGp1c3QgZ3VhcmQgdGhlIG5lc3RlZCBvYmplY3RzLlxuICBpZiAob2JqLnBlcnNvbmFsICYmIHR5cGVvZiBvYmoucGVyc29uYWwgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBiYXNlID0gZXhpc3RpbmcgPz8gZW1wdHlQcm9maWxlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2UsXG4gICAgICAuLi5vYmosXG4gICAgICBwZXJzb25hbDogeyAuLi5iYXNlLnBlcnNvbmFsLCAuLi5vYmoucGVyc29uYWwgfSxcbiAgICAgIHJlc3VtZTogb2JqLnJlc3VtZSA/PyBleGlzdGluZz8ucmVzdW1lID8/IG51bGwsXG4gICAgICBhbnN3ZXJzOiBvYmouYW5zd2VycyA/PyBleGlzdGluZz8uYW5zd2VycyA/PyB7fSxcbiAgICAgIGV4cGVyaWVuY2U6IEFycmF5LmlzQXJyYXkob2JqLmV4cGVyaWVuY2UpXG4gICAgICAgID8gb2JqLmV4cGVyaWVuY2VcbiAgICAgICAgOiBiYXNlLmV4cGVyaWVuY2UsXG4gICAgICBlZHVjYXRpb246IEFycmF5LmlzQXJyYXkob2JqLmVkdWNhdGlvbikgPyBvYmouZWR1Y2F0aW9uIDogYmFzZS5lZHVjYXRpb24sXG4gICAgfTtcbiAgfVxuXG4gIC8vIFVud3JhcCB0aGUgc3VjY2VzcyBlbnZlbG9wZSBpZiBwcmVzZW50LlxuICBsZXQgcGF5bG9hZCA9IG9iajtcbiAgaWYgKFxuICAgIFwiZGF0YVwiIGluIG9iaiAmJlxuICAgIG9iai5kYXRhICYmXG4gICAgdHlwZW9mIG9iai5kYXRhID09PSBcIm9iamVjdFwiICYmXG4gICAgIShcInBlcnNvbmFsXCIgaW4gb2JqKVxuICApIHtcbiAgICBwYXlsb2FkID0gb2JqLmRhdGEgYXMgUmVjb3JkPHN0cmluZywgYW55PjtcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSAoXG4gICAgcGF5bG9hZC51c2VyICYmIHR5cGVvZiBwYXlsb2FkLnVzZXIgPT09IFwib2JqZWN0XCIgPyBwYXlsb2FkLnVzZXIgOiB7fVxuICApIGFzIFJlY29yZDxzdHJpbmcsIGFueT47XG4gIGNvbnN0IGZ1bGxOYW1lOiBzdHJpbmcgPSBwYXlsb2FkLm5hbWUgfHwgdXNlci5uYW1lIHx8IFwiXCI7XG4gIGNvbnN0IGVtYWlsOiBzdHJpbmcgPSBwYXlsb2FkLmVtYWlsIHx8IHVzZXIuZW1haWwgfHwgXCJcIjtcbiAgY29uc3QgbmFtZVBhcnRzID0gZnVsbE5hbWUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gIGNvbnN0IGZpcnN0TmFtZSA9IG5hbWVQYXJ0c1swXSB8fCBcIlwiO1xuICBjb25zdCBsYXN0TmFtZSA9IG5hbWVQYXJ0cy5zbGljZSgxKS5qb2luKFwiIFwiKS50cmltKCk7XG5cbiAgY29uc3QgaGVhZGxpbmUgPSBwYXlsb2FkLmhlYWRsaW5lIHx8IFwiXCI7XG4gIGNvbnN0IGRlc2lyZWRUaXRsZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQuZGVzaXJlZF90aXRsZXMpXG4gICAgPyBwYXlsb2FkLmRlc2lyZWRfdGl0bGVzXG4gICAgOiB0eXBlb2YgcGF5bG9hZC5kZXNpcmVkX3RpdGxlcyA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBwYXlsb2FkLmRlc2lyZWRfdGl0bGVzXG4gICAgICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgICAgIC5tYXAoKHM6IHN0cmluZykgPT4gcy50cmltKCkpXG4gICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgOiBbXTtcbiAgY29uc3QgdGVjaFN0YWNrID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLnRlY2hfc3RhY2spXG4gICAgPyBwYXlsb2FkLnRlY2hfc3RhY2tcbiAgICA6IHR5cGVvZiBwYXlsb2FkLnRlY2hfc3RhY2sgPT09IFwic3RyaW5nXCJcbiAgICAgID8gcGF5bG9hZC50ZWNoX3N0YWNrXG4gICAgICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgICAgIC5tYXAoKHM6IHN0cmluZykgPT4gcy50cmltKCkpXG4gICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgOiBbXTtcbiAgY29uc3Qgc2tpbGxzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLnNraWxscylcbiAgICA/IHBheWxvYWQuc2tpbGxzXG4gICAgOiB0eXBlb2YgcGF5bG9hZC5za2lsbHMgPT09IFwic3RyaW5nXCJcbiAgICAgID8gcGF5bG9hZC5za2lsbHNcbiAgICAgICAgICAuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgLm1hcCgoczogc3RyaW5nKSA9PiBzLnRyaW0oKSlcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICA6IHRlY2hTdGFjaztcbiAgY29uc3QgaW5kdXN0cmllcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5pbmR1c3RyaWVzKVxuICAgID8gcGF5bG9hZC5pbmR1c3RyaWVzXG4gICAgOiB0eXBlb2YgcGF5bG9hZC5pbmR1c3RyaWVzID09PSBcInN0cmluZ1wiXG4gICAgICA/IHBheWxvYWQuaW5kdXN0cmllc1xuICAgICAgICAgIC5zcGxpdChcIixcIilcbiAgICAgICAgICAubWFwKChzOiBzdHJpbmcpID0+IHMudHJpbSgpKVxuICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIDogW107XG5cbiAgY29uc3QgcGVyc29uYWwgPSB7XG4gICAgZmlyc3ROYW1lLFxuICAgIGxhc3ROYW1lLFxuICAgIG5hbWU6IGZ1bGxOYW1lLFxuICAgIGVtYWlsLFxuICAgIHBob25lOiBwYXlsb2FkLnBob25lIHx8IFwiXCIsXG4gICAgbG9jYXRpb246IHBheWxvYWQubG9jYXRpb24gfHwgXCJcIixcbiAgICBjb3VudHJ5OiBcIlwiLFxuICAgIGNpdHk6IFwiXCIsXG4gICAgYWRkcmVzczogXCJcIixcbiAgICBsaW5rZWRpblVybDogcGF5bG9hZC5saW5rZWRpbl91cmwgfHwgXCJcIixcbiAgICBnaXRodWJVcmw6IHBheWxvYWQuZ2l0aHViX3VybCB8fCBcIlwiLFxuICAgIHdlYnNpdGVVcmw6IHBheWxvYWQucG9ydGZvbGlvX3VybCB8fCBcIlwiLFxuICAgIHN1bW1hcnk6IGhlYWRsaW5lIHx8IHBheWxvYWQuc3VtbWFyeSB8fCBcIlwiLFxuICAgIGhlYWRsaW5lLFxuICAgIHllYXJzT2ZFeHBlcmllbmNlOiBwYXlsb2FkLnllYXJzX29mX2V4cGVyaWVuY2UgPz8gXCJcIixcbiAgICBzZW5pb3JpdHlMZXZlbDogcGF5bG9hZC5zZW5pb3JpdHlfbGV2ZWwgfHwgXCJcIixcbiAgICBkZXNpcmVkVGl0bGVzLFxuICAgIGVkdWNhdGlvbkxldmVsOiBwYXlsb2FkLmVkdWNhdGlvbl9sZXZlbCB8fCBcIlwiLFxuICAgIHRlY2hTdGFjayxcbiAgICBza2lsbHMsXG4gICAgaW5kdXN0cmllcyxcbiAgICB3b3JrQXV0aG9yaXphdGlvbjogcGF5bG9hZC53b3JrX2F1dGhvcml6YXRpb24gfHwgXCJcIixcbiAgICBub3RpY2VQZXJpb2REYXlzOiBwYXlsb2FkLm5vdGljZV9wZXJpb2RfZGF5cyA/PyBcIlwiLFxuICAgIG9wZW5Ub1JlbG9jYXRpb246IHBheWxvYWQub3Blbl90b19yZWxvY2F0aW9uID8/IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0IHN0cnVjdHVyZWQgPVxuICAgIHBheWxvYWQuc3RydWN0dXJlZF9kYXRhICYmIHR5cGVvZiBwYXlsb2FkLnN0cnVjdHVyZWRfZGF0YSA9PT0gXCJvYmplY3RcIlxuICAgICAgPyAocGF5bG9hZC5zdHJ1Y3R1cmVkX2RhdGEgYXMgUmVjb3JkPHN0cmluZywgYW55PilcbiAgICAgIDoge307XG5cbiAgY29uc3QgZXhwZXJpZW5jZSA9XG4gICAgQXJyYXkuaXNBcnJheShwYXlsb2FkLmV4cGVyaWVuY2UpICYmIHBheWxvYWQuZXhwZXJpZW5jZS5sZW5ndGggPiAwXG4gICAgICA/IHBheWxvYWQuZXhwZXJpZW5jZVxuICAgICAgOiBBcnJheS5pc0FycmF5KHN0cnVjdHVyZWQuZXhwZXJpZW5jZSlcbiAgICAgICAgPyBzdHJ1Y3R1cmVkLmV4cGVyaWVuY2VcbiAgICAgICAgOiAoZXhpc3Rpbmc/LmV4cGVyaWVuY2UgPz8gW10pO1xuXG4gIGNvbnN0IGVkdWNhdGlvbiA9XG4gICAgQXJyYXkuaXNBcnJheShwYXlsb2FkLmVkdWNhdGlvbikgJiYgcGF5bG9hZC5lZHVjYXRpb24ubGVuZ3RoID4gMFxuICAgICAgPyBwYXlsb2FkLmVkdWNhdGlvblxuICAgICAgOiBBcnJheS5pc0FycmF5KHN0cnVjdHVyZWQuZWR1Y2F0aW9uKVxuICAgICAgICA/IHN0cnVjdHVyZWQuZWR1Y2F0aW9uXG4gICAgICAgIDogKGV4aXN0aW5nPy5lZHVjYXRpb24gPz8gW10pO1xuXG4gIHJldHVybiB7XG4gICAgcGVyc29uYWwsXG4gICAgZXhwZXJpZW5jZSxcbiAgICBlZHVjYXRpb24sXG4gICAgcmVzdW1lOiBleGlzdGluZz8ucmVzdW1lID8/IG51bGwsXG4gICAgYW5zd2VyczogZXhpc3Rpbmc/LmFuc3dlcnMgPz8ge30sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eVByb2ZpbGUoKTogVXNlclByb2ZpbGUge1xuICByZXR1cm4ge1xuICAgIHBlcnNvbmFsOiB7XG4gICAgICBmaXJzdE5hbWU6IFwiXCIsXG4gICAgICBsYXN0TmFtZTogXCJcIixcbiAgICAgIG5hbWU6IFwiXCIsXG4gICAgICBlbWFpbDogXCJcIixcbiAgICAgIHBob25lOiBcIlwiLFxuICAgICAgbG9jYXRpb246IFwiXCIsXG4gICAgICBjb3VudHJ5OiBcIlwiLFxuICAgICAgY2l0eTogXCJcIixcbiAgICAgIGFkZHJlc3M6IFwiXCIsXG4gICAgICBsaW5rZWRpblVybDogXCJcIixcbiAgICAgIGdpdGh1YlVybDogXCJcIixcbiAgICAgIHdlYnNpdGVVcmw6IFwiXCIsXG4gICAgICBzdW1tYXJ5OiBcIlwiLFxuICAgICAgaGVhZGxpbmU6IFwiXCIsXG4gICAgICB5ZWFyc09mRXhwZXJpZW5jZTogXCJcIixcbiAgICAgIHNlbmlvcml0eUxldmVsOiBcIlwiLFxuICAgICAgZGVzaXJlZFRpdGxlczogW10sXG4gICAgICBlZHVjYXRpb25MZXZlbDogXCJcIixcbiAgICAgIHRlY2hTdGFjazogW10sXG4gICAgICBza2lsbHM6IFtdLFxuICAgICAgaW5kdXN0cmllczogW10sXG4gICAgICB3b3JrQXV0aG9yaXphdGlvbjogXCJcIixcbiAgICAgIG5vdGljZVBlcmlvZERheXM6IFwiXCIsXG4gICAgICBvcGVuVG9SZWxvY2F0aW9uOiBmYWxzZSxcbiAgICB9LFxuICAgIGV4cGVyaWVuY2U6IFtdLFxuICAgIGVkdWNhdGlvbjogW10sXG4gICAgcmVzdW1lOiBudWxsLFxuICAgIGFuc3dlcnM6IHt9LFxuICB9O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBVc2VyUHJvZmlsZSwgVXNlclN0YXRzLCBSZWZlcnJhbEluZm8sIEV4dGVuc2lvblNldHRpbmdzLCBDcmVkaXRCYWxhbmNlLCBKb2JQcmVmZXJlbmNlc0RhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgYXBpRmV0Y2ggfSBmcm9tIFwiLi9hdXRoXCI7XG5pbXBvcnQgeyBub3JtYWxpemVQcm9maWxlIH0gZnJvbSBcIi4vcHJvZmlsZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlIHwgbnVsbD4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwicHJvZmlsZVwiKTtcbiAgY29uc3QgcmF3ID0gZGF0YS5wcm9maWxlO1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIC8vIE5vcm1hbGl6ZSBvbiByZWFkIHNvIGV2ZXJ5IGNhbGxlciAtIHBvcHVwIHRhYnMgYW5kIGNvbnRlbnQgc2NyaXB0cyAtIGdldHNcbiAgLy8gYSBndWFyYW50ZWVkIGB7IHBlcnNvbmFsOiB7Li4ufSB9YCBzaGFwZS4gU3RvcmVkIGRhdGEgY2FuIGJlIGFuIG9sZC9yYXdcbiAgLy8gYmFja2VuZCBzaGFwZSB3aG9zZSBtaXNzaW5nIGBwZXJzb25hbGAgd291bGQgb3RoZXJ3aXNlIGNyYXNoIHJlYWRlcnMgb2ZcbiAgLy8gYHByb2ZpbGUucGVyc29uYWwuZmlyc3ROYW1lYC5cbiAgcmV0dXJuIG5vcm1hbGl6ZVByb2ZpbGUocmF3KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFByb2ZpbGUocHJvZmlsZTogVXNlclByb2ZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcHJvZmlsZSB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaUZldGNoKFwiL2FwaS9wcm9maWxlL21lL1wiKTtcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IGdldFByb2ZpbGUoKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUHJvZmlsZShyZXMsIGV4aXN0aW5nKTtcbiAgICBhd2FpdCBzZXRQcm9maWxlKG5vcm1hbGl6ZWQpO1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgZmV0Y2ggcmVtb3RlIHByb2ZpbGU6XCIsIGVycik7XG4gICAgcmV0dXJuIGdldFByb2ZpbGUoKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY1Byb2ZpbGVUb0JhY2tlbmQocHJvZmlsZTogVXNlclByb2ZpbGUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwID0gcHJvZmlsZS5wZXJzb25hbDtcbiAgICBjb25zdCBwYXlsb2FkOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuICAgICAgcGhvbmU6IHAucGhvbmUgfHwgXCJcIixcbiAgICAgIGxvY2F0aW9uOiBwLmxvY2F0aW9uIHx8IFwiXCIsXG4gICAgICBsaW5rZWRpbl91cmw6IHAubGlua2VkaW5VcmwgfHwgXCJcIixcbiAgICAgIGdpdGh1Yl91cmw6IHAuZ2l0aHViVXJsIHx8IFwiXCIsXG4gICAgICBwb3J0Zm9saW9fdXJsOiBwLndlYnNpdGVVcmwgfHwgXCJcIixcbiAgICAgIGhlYWRsaW5lOiBwLmhlYWRsaW5lIHx8IHAuc3VtbWFyeSB8fCBcIlwiLFxuICAgICAgeWVhcnNfb2ZfZXhwZXJpZW5jZTogcC55ZWFyc09mRXhwZXJpZW5jZSA/IE51bWJlcihwLnllYXJzT2ZFeHBlcmllbmNlKSA6IG51bGwsXG4gICAgICBzZW5pb3JpdHlfbGV2ZWw6IHAuc2VuaW9yaXR5TGV2ZWwgfHwgXCJcIixcbiAgICAgIGRlc2lyZWRfdGl0bGVzOiBBcnJheS5pc0FycmF5KHAuZGVzaXJlZFRpdGxlcykgPyBwLmRlc2lyZWRUaXRsZXMgOiBbXSxcbiAgICAgIGVkdWNhdGlvbl9sZXZlbDogcC5lZHVjYXRpb25MZXZlbCB8fCBcIlwiLFxuICAgICAgdGVjaF9zdGFjazogQXJyYXkuaXNBcnJheShwLnRlY2hTdGFjaykgPyBwLnRlY2hTdGFjayA6IFtdLFxuICAgICAgc2tpbGxzOiBBcnJheS5pc0FycmF5KHAuc2tpbGxzKSAmJiBwLnNraWxscy5sZW5ndGggPiAwID8gcC5za2lsbHMgOiAoQXJyYXkuaXNBcnJheShwLnRlY2hTdGFjaykgPyBwLnRlY2hTdGFjayA6IFtdKSxcbiAgICAgIGluZHVzdHJpZXM6IEFycmF5LmlzQXJyYXkocC5pbmR1c3RyaWVzKSA/IHAuaW5kdXN0cmllcyA6IFtdLFxuICAgICAgd29ya19hdXRob3JpemF0aW9uOiBwLndvcmtBdXRob3JpemF0aW9uIHx8IFwiXCIsXG4gICAgICBub3RpY2VfcGVyaW9kX2RheXM6IHAubm90aWNlUGVyaW9kRGF5cyA/IE51bWJlcihwLm5vdGljZVBlcmlvZERheXMpIDogbnVsbCxcbiAgICAgIG9wZW5fdG9fcmVsb2NhdGlvbjogcC5vcGVuVG9SZWxvY2F0aW9uID8/IGZhbHNlLFxuICAgICAgZXhwZXJpZW5jZTogcHJvZmlsZS5leHBlcmllbmNlIHx8IFtdLFxuICAgICAgZWR1Y2F0aW9uOiBwcm9maWxlLmVkdWNhdGlvbiB8fCBbXSxcbiAgICAgIHN0cnVjdHVyZWRfZGF0YToge1xuICAgICAgICBleHBlcmllbmNlOiBwcm9maWxlLmV4cGVyaWVuY2UgfHwgW10sXG4gICAgICAgIGVkdWNhdGlvbjogcHJvZmlsZS5lZHVjYXRpb24gfHwgW10sXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKHAubmFtZSkge1xuICAgICAgcGF5bG9hZC5uYW1lID0gcC5uYW1lO1xuICAgIH1cbiAgICBhd2FpdCBhcGlGZXRjaChcIi9hcGkvcHJvZmlsZS9tZS9cIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIHN5bmMgcHJvZmlsZSB0byBiYWNrZW5kOlwiLCBlcnIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGxldGVPbmJvYXJkaW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBvbmJvYXJkaW5nQ29tcGxldGU6IHRydWUgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc09uYm9hcmRpbmdDb21wbGV0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcIm9uYm9hcmRpbmdDb21wbGV0ZVwiKTtcbiAgcmV0dXJuICEhZGF0YS5vbmJvYXJkaW5nQ29tcGxldGU7XG59XG5cbmNvbnN0IGRlZmF1bHRDcmVkaXRzOiBDcmVkaXRCYWxhbmNlID0ge1xuICBwbGFuOiBcImZyZWVcIixcbiAgcGxhbl9hbGxvd2FuY2U6IDAsXG4gIGNyZWRpdHNfcmVtYWluaW5nOiAwLFxuICBjcmVkaXRzX3RvcF91cDogMCxcbiAgY3JlZGl0c19yZXNlcnZlZDogMCxcbiAgcmVzZXRzX2F0OiBcIlwiLFxuICByZWZlcnJhbF9jb2RlOiBudWxsLFxuICByZWZlcnJhbHNfY291bnQ6IDAsXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3JlZGl0cygpOiBQcm9taXNlPENyZWRpdEJhbGFuY2U+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcImNyZWRpdHNcIik7XG4gIHJldHVybiAoZGF0YS5jcmVkaXRzIGFzIENyZWRpdEJhbGFuY2UpID8/IGRlZmF1bHRDcmVkaXRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0Q3JlZGl0cyhjcmVkaXRzOiBDcmVkaXRCYWxhbmNlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGNyZWRpdHMgfSk7XG59XG5cbi8qKlxuICogRmV0Y2ggdGhlIGxpdmUgY3JlZGl0IGJhbGFuY2UgKyBwbGFuIGZyb20gdGhlIGJhY2tlbmQgYW5kIHBlcnNpc3QgaXQgbG9jYWxseS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ3JlZGl0cygpOiBQcm9taXNlPENyZWRpdEJhbGFuY2UgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBpRmV0Y2goXCIvYXBpL2NyZWRpdC1iYWxhbmNlL1wiKTtcbiAgICBjb25zdCByYXcgPSAocmVzICYmIFwiZGF0YVwiIGluIHJlcyA/IHJlcy5kYXRhIDogcmVzKSB8fCBudWxsO1xuICAgIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjcmVkaXRzOiBDcmVkaXRCYWxhbmNlID0ge1xuICAgICAgcGxhbjogcmF3LnBsYW4gPz8gXCJmcmVlXCIsXG4gICAgICBwbGFuX2FsbG93YW5jZTogcmF3LnBsYW5fYWxsb3dhbmNlID8/IDAsXG4gICAgICBjcmVkaXRzX3JlbWFpbmluZzogcmF3LmNyZWRpdHNfcmVtYWluaW5nID8/IDAsXG4gICAgICBjcmVkaXRzX3RvcF91cDogcmF3LmNyZWRpdHNfdG9wX3VwID8/IDAsXG4gICAgICBjcmVkaXRzX3Jlc2VydmVkOiByYXcuY3JlZGl0c19yZXNlcnZlZCA/PyAwLFxuICAgICAgcmVzZXRzX2F0OiByYXcucmVzZXRzX2F0ID8/IFwiXCIsXG4gICAgICByZWZlcnJhbF9jb2RlOiByYXcucmVmZXJyYWxfY29kZSA/PyBudWxsLFxuICAgICAgcmVmZXJyYWxzX2NvdW50OiByYXcucmVmZXJyYWxzX2NvdW50ID8/IDAsXG4gICAgfTtcbiAgICBhd2FpdCBzZXRDcmVkaXRzKGNyZWRpdHMpO1xuICAgIHJldHVybiBjcmVkaXRzO1xuICB9IGNhdGNoIHtcbiAgICAvLyBOb3QgYXV0aGVudGljYXRlZCAvIG5ldHdvcmsgZXJyb3IgLSBrZWVwIGxhc3Qga25vd24gdmFsdWVcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdHMoKTogUHJvbWlzZTxVc2VyU3RhdHM+IHtcbiAgY29uc3QgZGF0YSA9IChhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJzdGF0c1wiKSkgYXMgeyBzdGF0cz86IFVzZXJTdGF0cyB9O1xuICByZXR1cm4gKFxuICAgIGRhdGEuc3RhdHMgfHwge1xuICAgICAgYXBwbGljYXRpb25zU3VibWl0dGVkOiAwLFxuICAgICAgaW50ZXJ2aWV3c1NlY3VyZWQ6IDAsXG4gICAgICB0aW1lU2F2ZWRNaW51dGVzOiAwLFxuICAgICAgdG90YWxBcHBsaWNhdGlvbnM6IDAsXG4gICAgICBzdWNjZXNzZnVsQXBwbGljYXRpb25zOiAwLFxuICAgICAgY3VycmVudFN0cmVhazogMCxcbiAgICAgIGxvbmdlc3RTdHJlYWs6IDAsXG4gICAgICB3ZWVrbHlBcHBsaWNhdGlvbnM6IDAsXG4gICAgfVxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVmZXJyYWwoKTogUHJvbWlzZTxSZWZlcnJhbEluZm8gfCBudWxsPiB7XG4gIGNvbnN0IGRhdGEgPSAoYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwicmVmZXJyYWxcIikpIGFzIHsgcmVmZXJyYWw/OiBSZWZlcnJhbEluZm8gfCBudWxsIH07XG4gIHJldHVybiBkYXRhLnJlZmVycmFsIHx8IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRSZWZlcnJhbChpbmZvOiBSZWZlcnJhbEluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgcmVmZXJyYWw6IGluZm8gfSk7XG59XG5cbmNvbnN0IGRlZmF1bHRTZXR0aW5nczogRXh0ZW5zaW9uU2V0dGluZ3MgPSB7XG4gIGF1dG9GaWxsRW5hYmxlZDogdHJ1ZSxcbiAgZmlsbERlbGF5TXM6IDUwLFxuICBzaG93RmlsbEFuaW1hdGlvbjogdHJ1ZSxcbiAgYXV0b1Njcm9sbDogdHJ1ZSxcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPEV4dGVuc2lvblNldHRpbmdzPiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJzZXR0aW5nc1wiKTtcbiAgcmV0dXJuIHsgLi4uZGVmYXVsdFNldHRpbmdzLCAuLi4oZGF0YS5zZXR0aW5ncyB8fCB7fSkgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzOiBQYXJ0aWFsPEV4dGVuc2lvblNldHRpbmdzPik6IFByb21pc2U8RXh0ZW5zaW9uU2V0dGluZ3M+IHtcbiAgY29uc3QgY3VycmVudCA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG4gIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLmN1cnJlbnQsIC4uLnNldHRpbmdzIH07XG4gIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHNldHRpbmdzOiB1cGRhdGVkIH0pO1xuICByZXR1cm4gdXBkYXRlZDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRKb2JQcmVmZXJlbmNlczogSm9iUHJlZmVyZW5jZXNEYXRhID0ge1xuICBqb2JfdHlwZXM6IFtcImZ1bGxfdGltZVwiXSxcbiAgZXhwZXJpZW5jZV9sZXZlbHM6IFtcIm1pZFwiLCBcInNlbmlvclwiXSxcbiAgcmVtb3RlX29rOiB0cnVlLFxuICBzYWxhcnlfbWluOiBudWxsLFxuICBzYWxhcnlfbWF4OiBudWxsLFxuICBjdXJyZW5jeTogXCJVU0RcIixcbiAgbG9jYXRpb25zOiBbXSxcbiAga2V5d29yZHM6IFtdLFxufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByZWZlcmVuY2VzKCk6IFByb21pc2U8Sm9iUHJlZmVyZW5jZXNEYXRhPiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJqb2JfcHJlZmVyZW5jZXNcIik7XG4gIHJldHVybiB7IC4uLmRlZmF1bHRKb2JQcmVmZXJlbmNlcywgLi4uKGRhdGEuam9iX3ByZWZlcmVuY2VzIHx8IHt9KSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0UHJlZmVyZW5jZXMocHJlZnM6IEpvYlByZWZlcmVuY2VzRGF0YSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBqb2JfcHJlZmVyZW5jZXM6IHByZWZzIH0pO1xufVxuXG4vKipcbiAqIEZldGNoIGxpdmUgSm9iUHJlZmVyZW5jZXMgZnJvbSBiYWNrZW5kICgvYXBpL3ByZWZlcmVuY2VzLykgYW5kIHN5bmMgdG8gbG9jYWwgc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUHJlZmVyZW5jZXMoKTogUHJvbWlzZTxKb2JQcmVmZXJlbmNlc0RhdGEgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBpRmV0Y2goXCIvYXBpL3ByZWZlcmVuY2VzL1wiKTtcbiAgICBjb25zdCByYXcgPSAocmVzICYmIFwiZGF0YVwiIGluIHJlcyA/IHJlcy5kYXRhIDogcmVzKSB8fCBudWxsO1xuICAgIGNvbnN0IGxpc3QgPSByYXc/LnJlc3VsdHMgfHwgKEFycmF5LmlzQXJyYXkocmF3KSA/IHJhdyA6IFtdKTtcbiAgICBjb25zdCBpdGVtID0gbGlzdC5sZW5ndGggPiAwID8gbGlzdFswXSA6IChyYXc/LmlkID8gcmF3IDogbnVsbCk7XG5cbiAgICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZDogSm9iUHJlZmVyZW5jZXNEYXRhID0ge1xuICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICBqb2JfdHlwZXM6IEFycmF5LmlzQXJyYXkoaXRlbS5qb2JfdHlwZXMpID8gaXRlbS5qb2JfdHlwZXMgOiBbXSxcbiAgICAgIGV4cGVyaWVuY2VfbGV2ZWxzOiBBcnJheS5pc0FycmF5KGl0ZW0uZXhwZXJpZW5jZV9sZXZlbHMpID8gaXRlbS5leHBlcmllbmNlX2xldmVscyA6IFtdLFxuICAgICAgcmVtb3RlX29rOiBpdGVtLnJlbW90ZV9vayA/PyB0cnVlLFxuICAgICAgc2FsYXJ5X21pbjogaXRlbS5zYWxhcnlfbWluID8gTnVtYmVyKGl0ZW0uc2FsYXJ5X21pbikgOiBudWxsLFxuICAgICAgc2FsYXJ5X21heDogaXRlbS5zYWxhcnlfbWF4ID8gTnVtYmVyKGl0ZW0uc2FsYXJ5X21heCkgOiBudWxsLFxuICAgICAgY3VycmVuY3k6IGl0ZW0uY3VycmVuY3kgfHwgXCJVU0RcIixcbiAgICAgIGxvY2F0aW9uczogQXJyYXkuaXNBcnJheShpdGVtLmxvY2F0aW9ucykgPyBpdGVtLmxvY2F0aW9ucyA6IFtdLFxuICAgICAga2V5d29yZHM6IEFycmF5LmlzQXJyYXkoaXRlbS5rZXl3b3JkcykgPyBpdGVtLmtleXdvcmRzIDogW10sXG4gICAgfTtcblxuICAgIGF3YWl0IHNldFByZWZlcmVuY2VzKG5vcm1hbGl6ZWQpO1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgZmV0Y2ggcHJlZmVyZW5jZXMgZnJvbSBiYWNrZW5kOlwiLCBlcnIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2F2ZSBKb2JQcmVmZXJlbmNlcyB0byBib3RoIGxvY2FsIHN0b3JhZ2UgYW5kIGJhY2tlbmQgQVBJICgvYXBpL3ByZWZlcmVuY2VzLykuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jUHJlZmVyZW5jZXNUb0JhY2tlbmQocHJlZnM6IEpvYlByZWZlcmVuY2VzRGF0YSk6IFByb21pc2U8Sm9iUHJlZmVyZW5jZXNEYXRhPiB7XG4gIC8vIEZpcnN0IHBlcnNpc3QgbG9jYWxseVxuICBhd2FpdCBzZXRQcmVmZXJlbmNlcyhwcmVmcyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgam9iX3R5cGVzOiBwcmVmcy5qb2JfdHlwZXMsXG4gICAgICBleHBlcmllbmNlX2xldmVsczogcHJlZnMuZXhwZXJpZW5jZV9sZXZlbHMsXG4gICAgICByZW1vdGVfb2s6IHByZWZzLnJlbW90ZV9vayxcbiAgICAgIHNhbGFyeV9taW46IHByZWZzLnNhbGFyeV9taW4sXG4gICAgICBzYWxhcnlfbWF4OiBwcmVmcy5zYWxhcnlfbWF4ID8/IG51bGwsXG4gICAgICBjdXJyZW5jeTogcHJlZnMuY3VycmVuY3kudG9VcHBlckNhc2UoKS5zbGljZSgwLCAzKSxcbiAgICAgIGxvY2F0aW9uczogcHJlZnMubG9jYXRpb25zLFxuICAgICAga2V5d29yZHM6IHByZWZzLmtleXdvcmRzLFxuICAgIH07XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGlGZXRjaChcIi9hcGkvcHJlZmVyZW5jZXMvXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNhdmVkID0gKHJlcyAmJiBcImRhdGFcIiBpbiByZXMgPyByZXMuZGF0YSA6IHJlcykgfHwge307XG4gICAgY29uc3QgcmVzdWx0OiBKb2JQcmVmZXJlbmNlc0RhdGEgPSB7XG4gICAgICAuLi5wcmVmcyxcbiAgICAgIGlkOiBzYXZlZC5pZCB8fCBwcmVmcy5pZCxcbiAgICB9O1xuICAgIGF3YWl0IHNldFByZWZlcmVuY2VzKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzeW5jIHByZWZlcmVuY2VzIHRvIGJhY2tlbmQgQVBJOlwiLCBlcnIpO1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICBQcm92aWRlciBSZWdpc3RyeSAtIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIGV2ZXJ5IGpvYlxuICAgc2l0ZSB0aGUgZXh0ZW5zaW9uIHVuZGVyc3RhbmRzIChBVFMgcG9ydGFscyArIGJvYXJkcy9hZ2dyZWdhdG9ycykuXG5cbiAgIFdoeSB0aGlzIGV4aXN0czpcbiAgIC0gVGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIHNpdGVzIGhhcyBncm93biBsYXJnZSwgc28gZGV0ZWN0aW9uLFxuICAgICB0aGUgQ2xvdWQgU3luYyBVSSwgYW5kIHRoZSBcIlN1cHBvcnRlZCBzaXRlc1wiIG92ZXJ2aWV3IGFsbCByZWFkXG4gICAgIGZyb20gaGVyZSBpbnN0ZWFkIG9mIGhhcmQtY29kZWQgZHVwbGljYXRlcyBzY2F0dGVyZWQgYXJvdW5kLlxuICAgLSBFYWNoIHByb3ZpZGVyIGRlY2xhcmVzIGEgYGdyb3VwYCBzbyB0aGUgVUkgY2FuIGJlIHNlZ21lbnRlZC5cbiAgIC0gYHN1cHBvcnRzU3luY2AgaXMgdHJ1ZSBPTkxZIGZvciBwbGF0Zm9ybXMgdGhlIGJhY2tlbmRcbiAgICAgKGBicm93c2VyX21hbmFnZXIubW9kZWxzLkJyb3dzZXJTZXNzaW9uLlBMQVRGT1JNX0NIT0lDRVNgKVxuICAgICBjYW4gc3RvcmUgYSBzeW5jZWQgc2Vzc2lvbiBmb3IuIEV2ZXJ5dGhpbmcgZWxzZSBpc1xuICAgICBkZXRlY3Rpb24tb25seSB1bnRpbCB0aGUgYmFja2VuZCBhZGRzIHN1cHBvcnQuXG5cbiAgIE5PVEU6IHdoZW4geW91IGFkZCBhIHByb3ZpZGVyIGhlcmUsIGFsc28gcmVnaXN0ZXIgaXRzIGRvbWFpbnMgaW5cbiAgIGBwdWJsaWMvbWFuaWZlc3QuanNvbmAgKGhvc3RfcGVybWlzc2lvbnMgKyBjb250ZW50X3NjcmlwdHMpIHNvIHRoZVxuICAgY29udGVudCBzY3JpcHQgaXMgaW5qZWN0ZWQgYW5kIGRldGVjdGlvbi9iYWRnaW5nIHdvcmtzLlxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmV4cG9ydCB0eXBlIFByb3ZpZGVyR3JvdXAgPSBcImF0c1wiIHwgXCJib2FyZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyRGVmIHtcbiAgLyoqIFN0YWJsZSBpZC4gTXVzdCBtYXRjaCB0aGUgYmFja2VuZCBwbGF0Zm9ybSBrZXkgd2hlbiBgc3VwcG9ydHNTeW5jYC4gKi9cbiAgaWQ6IHN0cmluZztcbiAgLyoqIEh1bWFuLXJlYWRhYmxlIG5hbWUgc2hvd24gaW4gdGhlIFVJLiAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIGdyb3VwOiBQcm92aWRlckdyb3VwO1xuICAvKiogVVJMIHN1YnN0cmluZ3MgdXNlZCBmb3IgZGV0ZWN0aW9uIChmaXJzdCBtYXRjaCB3aW5zLCBvcmRlciBtYXR0ZXJzKS4gKi9cbiAgZG9tYWluczogc3RyaW5nW107XG4gIC8qKiBUYWlsd2luZCBiYWNrZ3JvdW5kIGNsYXNzIGZvciB0aGUgcHJvdmlkZXIgY2hpcC9pY29uLiAqL1xuICBjb2xvcjogc3RyaW5nO1xuICAvKiogVHJ1ZSBvbmx5IGlmIHRoZSBiYWNrZW5kIGNhbiBzdG9yZSBhIHN5bmNlZCBzZXNzaW9uIGZvciB0aGlzIHBsYXRmb3JtLiAqL1xuICBzdXBwb3J0c1N5bmM6IGJvb2xlYW47XG4gIC8qKiBCYXJlIHJlZ2lzdHJhYmxlIGRvbWFpbiB1c2VkIGZvciBjb29raWUgc3luYyAob25seSB3aGVuIHN1cHBvcnRzU3luYykuICovXG4gIGNvb2tpZURvbWFpbj86IHN0cmluZztcbn1cblxuLyoqIEdyb3VwIG1ldGFkYXRhIHVzZWQgdG8gcmVuZGVyIHNlY3Rpb24gaGVhZGVycyBpbiB0aGUgVUkuICovXG5leHBvcnQgY29uc3QgUFJPVklERVJfR1JPVVBTOiB7IGlkOiBQcm92aWRlckdyb3VwOyBsYWJlbDogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSA9IFtcbiAge1xuICAgIGlkOiBcImJvYXJkXCIsXG4gICAgbGFiZWw6IFwiSm9iIEJvYXJkcyAmIEFnZ3JlZ2F0b3JzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2VhcmNoIGVuZ2luZXMgYW5kIGJvYXJkcyB3aGVyZSBqb2JzIGFyZSBsaXN0ZWQgYW5kIGRpc2NvdmVyZWRcIixcbiAgfSxcbiAge1xuICAgIGlkOiBcImF0c1wiLFxuICAgIGxhYmVsOiBcIkFwcGxpY2FudCBUcmFja2luZyBTeXN0ZW1zXCIsXG4gICAgZGVzY3JpcHRpb246IFwiV2hlcmUgeW91IGNvbXBsZXRlIGFuZCBzdWJtaXQgdGhlIGFjdHVhbCBhcHBsaWNhdGlvblwiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVSUzogUHJvdmlkZXJEZWZbXSA9IFtcbiAgLyogLS0tLS0tLS0tLS0tLS0tLSBKb2IgQm9hcmRzICYgQWdncmVnYXRvcnMgLS0tLS0tLS0tLS0tLS0tLSAqL1xuICB7IGlkOiBcImxpbmtlZGluXCIsIG5hbWU6IFwiTGlua2VkSW5cIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wibGlua2VkaW4uY29tXCJdLCBjb2xvcjogXCJiZy1bIzAwNzdCNV1cIiwgc3VwcG9ydHNTeW5jOiB0cnVlLCBjb29raWVEb21haW46IFwibGlua2VkaW4uY29tXCIgfSxcbiAgeyBpZDogXCJpbmRlZWRcIiwgbmFtZTogXCJJbmRlZWRcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wiaW5kZWVkLmNvbVwiXSwgY29sb3I6IFwiYmctWyMyMTY0RjNdXCIsIHN1cHBvcnRzU3luYzogdHJ1ZSwgY29va2llRG9tYWluOiBcImluZGVlZC5jb21cIiB9LFxuICB7IGlkOiBcImdsYXNzZG9vclwiLCBuYW1lOiBcIkdsYXNzZG9vclwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJnbGFzc2Rvb3IuY29tXCJdLCBjb2xvcjogXCJiZy1bIzBDQUE0MV1cIiwgc3VwcG9ydHNTeW5jOiB0cnVlLCBjb29raWVEb21haW46IFwiZ2xhc3Nkb29yLmNvbVwiIH0sXG4gIHsgaWQ6IFwiYmF5dFwiLCBuYW1lOiBcIkJheXRcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wiYmF5dC5jb21cIl0sIGNvbG9yOiBcImJnLVsjMUU3QTM0XVwiLCBzdXBwb3J0c1N5bmM6IHRydWUsIGNvb2tpZURvbWFpbjogXCJiYXl0LmNvbVwiIH0sXG4gIHsgaWQ6IFwicmVlZFwiLCBuYW1lOiBcIlJlZWRcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wicmVlZC5jby51a1wiXSwgY29sb3I6IFwiYmctWyMwMDVEQUFdXCIsIHN1cHBvcnRzU3luYzogdHJ1ZSwgY29va2llRG9tYWluOiBcInJlZWQuY28udWtcIiB9LFxuICB7IGlkOiBcImJ1aWx0aW5cIiwgbmFtZTogXCJCdWlsdEluXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcImJ1aWx0aW4uY29tXCJdLCBjb2xvcjogXCJiZy1bIzBFMkQ1Ml1cIiwgc3VwcG9ydHNTeW5jOiB0cnVlLCBjb29raWVEb21haW46IFwiYnVpbHRpbi5jb21cIiB9LFxuICB7IGlkOiBcImRpY2VcIiwgbmFtZTogXCJEaWNlXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcImRpY2UuY29tXCJdLCBjb2xvcjogXCJiZy1bIzFGN0EzRF1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInppcHJlY3J1aXRlclwiLCBuYW1lOiBcIlppcFJlY3J1aXRlclwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJ6aXByZWNydWl0ZXIuY29tXCJdLCBjb2xvcjogXCJiZy1bI0YyNkM2Q11cIiwgc3VwcG9ydHNTeW5jOiB0cnVlLCBjb29raWVEb21haW46IFwiemlwcmVjcnVpdGVyLmNvbVwiIH0sXG4gIHsgaWQ6IFwid2VsbGZvdW5kXCIsIG5hbWU6IFwiV2VsbGZvdW5kXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcIndlbGxmb3VuZC5jb21cIiwgXCJhbmdlbGxpc3QuY29tXCJdLCBjb2xvcjogXCJiZy1bIzJCMkQ0Ml1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInNlZWtcIiwgbmFtZTogXCJTZWVrXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcInNlZWsuY29tXCJdLCBjb2xvcjogXCJiZy1bIzVCMkVFNV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcIm1vbnN0ZXJcIiwgbmFtZTogXCJNb25zdGVyXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcIm1vbnN0ZXIuY29tXCJdLCBjb2xvcjogXCJiZy1bIzFBNkZDNF1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcImNhcmVlcmJ1aWxkZXJcIiwgbmFtZTogXCJDYXJlZXJCdWlsZGVyXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcImNhcmVlcmJ1aWxkZXIuY29tXCJdLCBjb2xvcjogXCJiZy1bIzAwQTk0Rl1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInNpbXBseWhpcmVkXCIsIG5hbWU6IFwiU2ltcGx5SGlyZWRcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wic2ltcGx5aGlyZWQuY29tXCJdLCBjb2xvcjogXCJiZy1bIzJFOEI1N11cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcImN2bGlicmFyeVwiLCBuYW1lOiBcIkNWLUxpYnJhcnlcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wiY3YtbGlicmFyeS5jby51a1wiXSwgY29sb3I6IFwiYmctWyNFMjIzMUFdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJ0b3RhbGpvYnNcIiwgbmFtZTogXCJUb3RhbEpvYnNcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1widG90YWxqb2JzLmNvbVwiXSwgY29sb3I6IFwiYmctWyNGMjZDMkJdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJqb2JzZXJ2ZVwiLCBuYW1lOiBcIkpvYlNlcnZlXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcImpvYnNlcnZlLmNvbVwiXSwgY29sb3I6IFwiYmctWyMwQjdBM0JdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJqb2JzaXRlXCIsIG5hbWU6IFwiSm9ic2l0ZVwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJqb2JzaXRlLmNvLnVrXCJdLCBjb2xvcjogXCJiZy1bI0ZGNkIwMF1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInN0ZXBzdG9uZVwiLCBuYW1lOiBcIlN0ZXBTdG9uZVwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJzdGVwc3RvbmUuY29tXCIsIFwic3RlcHN0b25lLmRlXCJdLCBjb2xvcjogXCJiZy1bIzAwOThDM11cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInhpbmdcIiwgbmFtZTogXCJYSU5HXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcInhpbmcuY29tXCJdLCBjb2xvcjogXCJiZy1bIzAwNjU2N11cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcIm5hdWtyaVwiLCBuYW1lOiBcIk5hdWtyaVwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJuYXVrcmkuY29tXCJdLCBjb2xvcjogXCJiZy1bI0UwM0MzMV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcIm5hdWtyaWd1bGZcIiwgbmFtZTogXCJOYXVrcmlHdWxmXCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcIm5hdWtyaWd1bGYuY29tXCJdLCBjb2xvcjogXCJiZy1bIzFDN0NDNF1cIiwgc3VwcG9ydHNTeW5jOiB0cnVlLCBjb29raWVEb21haW46IFwibmF1a3JpZ3VsZi5jb21cIiB9LFxuICB7IGlkOiBcInd1enp1ZlwiLCBuYW1lOiBcIld1enp1ZlwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJ3dXp6dWYubmV0XCJdLCBjb2xvcjogXCJiZy1bIzBBQTg2RV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcImd1bGZ0YWxlbnRcIiwgbmFtZTogXCJHdWxmdGFsZW50XCIsIGdyb3VwOiBcImJvYXJkXCIsIGRvbWFpbnM6IFtcImd1bGZ0YWxlbnQuY29tXCJdLCBjb2xvcjogXCJiZy1bI0M4MTAyRV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcImFkenVuYVwiLCBuYW1lOiBcIkFkenVuYVwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJhZHp1bmEuY29tXCJdLCBjb2xvcjogXCJiZy1bI0ZGNkIzNV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInJlbW90ZW9rXCIsIG5hbWU6IFwiUmVtb3RlT0tcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wicmVtb3Rlb2suY29tXCJdLCBjb2xvcjogXCJiZy1bIzFBMUExQV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcIndld29ya3JlbW90ZWx5XCIsIG5hbWU6IFwiV2UgV29yayBSZW1vdGVseVwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJ3ZXdvcmtyZW1vdGVseS5jb21cIl0sIGNvbG9yOiBcImJnLVsjNEE0QTRBXVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwiZmxleGpvYnNcIiwgbmFtZTogXCJGbGV4Sm9ic1wiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJmbGV4am9icy5jb21cIl0sIGNvbG9yOiBcImJnLVsjMEY5RDU4XVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwiaGlyZWRcIiwgbmFtZTogXCJIaXJlZFwiLCBncm91cDogXCJib2FyZFwiLCBkb21haW5zOiBbXCJoaXJlZC5jb21cIl0sIGNvbG9yOiBcImJnLVsjRjU1MDZCXVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwiY3JhaWdzbGlzdFwiLCBuYW1lOiBcIkNyYWlnc2xpc3RcIiwgZ3JvdXA6IFwiYm9hcmRcIiwgZG9tYWluczogW1wiY3JhaWdzbGlzdC5vcmdcIl0sIGNvbG9yOiBcImJnLVsjMDA2OEE4XVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG5cbiAgLyogLS0tLS0tLS0tLS0tLS0tLSBBcHBsaWNhbnQgVHJhY2tpbmcgU3lzdGVtcyAtLS0tLS0tLS0tLS0tLS0tICovXG4gIHsgaWQ6IFwiZ3JlZW5ob3VzZVwiLCBuYW1lOiBcIkdyZWVuaG91c2VcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcImdyZWVuaG91c2UuaW9cIl0sIGNvbG9yOiBcImJnLVsjM0E3RDQ0XVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwibGV2ZXJcIiwgbmFtZTogXCJMZXZlclwiLCBncm91cDogXCJhdHNcIiwgZG9tYWluczogW1wibGV2ZXIuY29cIl0sIGNvbG9yOiBcImJnLVsjMEM5Q0VFXVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwid29ya2RheVwiLCBuYW1lOiBcIldvcmtkYXlcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcIndvcmtkYXkuY29tXCJdLCBjb2xvcjogXCJiZy1bIzAwNUNCOV1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcIndvcmthYmxlXCIsIG5hbWU6IFwiV29ya2FibGVcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcIndvcmthYmxlLmNvbVwiXSwgY29sb3I6IFwiYmctWyMxQ0EzOUJdXCIsIHN1cHBvcnRzU3luYzogdHJ1ZSwgY29va2llRG9tYWluOiBcIndvcmthYmxlLmNvbVwiIH0sXG4gIHsgaWQ6IFwiYXNoYnlcIiwgbmFtZTogXCJBc2hieVwiLCBncm91cDogXCJhdHNcIiwgZG9tYWluczogW1wiYXNoYnlocS5jb21cIl0sIGNvbG9yOiBcImJnLVsjNUI1QkQ2XVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwic21hcnRyZWNydWl0ZXJzXCIsIG5hbWU6IFwiU21hcnRSZWNydWl0ZXJzXCIsIGdyb3VwOiBcImF0c1wiLCBkb21haW5zOiBbXCJzbWFydHJlY3J1aXRlcnMuY29tXCJdLCBjb2xvcjogXCJiZy1bIzFGOUJDRl1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInRhbGVvXCIsIG5hbWU6IFwiVGFsZW9cIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcInRhbGVvLm5ldFwiXSwgY29sb3I6IFwiYmctWyNDNzQ2MzRdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJqYXp6aHJcIiwgbmFtZTogXCJKYXp6SFJcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcImFwcGx5dG9qb2IuY29tXCJdLCBjb2xvcjogXCJiZy1bIzZCNEZCQl1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInBpbnBvaW50XCIsIG5hbWU6IFwiUGlucG9pbnRcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcInBpbnBvaW50aHEuY29tXCIsIFwicGlucG9pbnQuY29tXCJdLCBjb2xvcjogXCJiZy1bIzJFNUFBQ11cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInRlYW10YWlsb3JcIiwgbmFtZTogXCJUZWFtdGFpbG9yXCIsIGdyb3VwOiBcImF0c1wiLCBkb21haW5zOiBbXCJ0ZWFtdGFpbG9yLmNvbVwiXSwgY29sb3I6IFwiYmctWyM1QzRCQzZdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJwZXJzb25pb1wiLCBuYW1lOiBcIlBlcnNvbmlvXCIsIGdyb3VwOiBcImF0c1wiLCBkb21haW5zOiBbXCJwZXJzb25pby5jb21cIiwgXCJwZXJzb25pby5kZVwiXSwgY29sb3I6IFwiYmctWyMxNzYzQzldXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJiYW1ib29oclwiLCBuYW1lOiBcIkJhbWJvb0hSXCIsIGdyb3VwOiBcImF0c1wiLCBkb21haW5zOiBbXCJiYW1ib29oci5jb21cIl0sIGNvbG9yOiBcImJnLVsjNUI0RkNGXVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwiam9idml0ZVwiLCBuYW1lOiBcIkpvYnZpdGVcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcImpvYnZpdGUuY29tXCJdLCBjb2xvcjogXCJiZy1bI0UyNTUzQl1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuICB7IGlkOiBcInJlY3J1aXRlZVwiLCBuYW1lOiBcIlJlY3J1aXRlZVwiLCBncm91cDogXCJhdHNcIiwgZG9tYWluczogW1wicmVjcnVpdGVlLmNvbVwiXSwgY29sb3I6IFwiYmctWyMxN0E5OUFdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJicmVlenlcIiwgbmFtZTogXCJCcmVlenkgSFJcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcImJyZWV6eS5oclwiXSwgY29sb3I6IFwiYmctWyMxN0IzQTZdXCIsIHN1cHBvcnRzU3luYzogZmFsc2UgfSxcbiAgeyBpZDogXCJpY2ltc1wiLCBuYW1lOiBcImlDSU1TXCIsIGdyb3VwOiBcImF0c1wiLCBkb21haW5zOiBbXCJpY2ltcy5jb21cIl0sIGNvbG9yOiBcImJnLVsjMEE2Q0IwXVwiLCBzdXBwb3J0c1N5bmM6IGZhbHNlIH0sXG4gIHsgaWQ6IFwiYXZhdHVyZVwiLCBuYW1lOiBcIkF2YXR1cmVcIiwgZ3JvdXA6IFwiYXRzXCIsIGRvbWFpbnM6IFtcImF2YXR1cmUubmV0XCJdLCBjb2xvcjogXCJiZy1bIzdDM0FFRF1cIiwgc3VwcG9ydHNTeW5jOiBmYWxzZSB9LFxuXTtcblxuLyoqIERldGVjdCB3aGljaCBwcm92aWRlciBhIFVSTCBiZWxvbmdzIHRvIChmaXJzdCBtYXRjaCB3aW5zKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RQcm92aWRlcklkKHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmICghdXJsKSByZXR1cm4gbnVsbDtcbiAgZm9yIChjb25zdCBwIG9mIFBST1ZJREVSUykge1xuICAgIGlmIChwLmRvbWFpbnMuc29tZSgoZCkgPT4gdXJsLmluY2x1ZGVzKGQpKSkgcmV0dXJuIHAuaWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm92aWRlckJ5SWQoaWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBQcm92aWRlckRlZiB8IHVuZGVmaW5lZCB7XG4gIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiBQUk9WSURFUlMuZmluZCgocCkgPT4gcC5pZCA9PT0gaWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdmlkZXJCeU5hbWUobmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvdmlkZXJEZWYgfCB1bmRlZmluZWQge1xuICBpZiAoIW5hbWUpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IGxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gUFJPVklERVJTLmZpbmQoKHApID0+IHAubmFtZS50b0xvd2VyQ2FzZSgpID09PSBsb3dlcik7XG59XG5cbi8qKiBQcm92aWRlcnMgdGhhdCBjYW4gYmUgc3luY2VkIChiYWNrZW5kLXN1cHBvcnRlZCBzZXNzaW9uIHN0b3JhZ2UpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bmNhYmxlUHJvdmlkZXJzKCk6IFByb3ZpZGVyRGVmW10ge1xuICByZXR1cm4gUFJPVklERVJTLmZpbHRlcigocCkgPT4gcC5zdXBwb3J0c1N5bmMpO1xufVxuXG4vKiogR3JvdXAgaGVscGVycyBmb3IgdGhlIFVJLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3ZpZGVyc0J5R3JvdXAoZ3JvdXA6IFByb3ZpZGVyR3JvdXApOiBQcm92aWRlckRlZltdIHtcbiAgcmV0dXJuIFBST1ZJREVSUy5maWx0ZXIoKHApID0+IHAuZ3JvdXAgPT09IGdyb3VwKTtcbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgUHJvdmlkZXIgU3luYyAtIGZldGNoZXMgdGhlIGNhbm9uaWNhbCBwcm92aWRlciBkaXJlY3RvcnlcbiAgIGZyb20gdGhlIGJhY2tlbmQgKGAvYXBpL2F0cy1wcm92aWRlcnMvYCkgYW5kIGNhY2hlcyBpdFxuICAgbG9jYWxseSBzbyBkZXRlY3Rpb24gKyBVSSB3b3JrIGV2ZW4gb2ZmbGluZSAvIHByZS1sb2dpbi5cblxuICAgVGhlIGJhY2tlbmQgYGF0c19wcm92aWRlcnNgIHRhYmxlIChBVFNKb2JTb3VyY2UpIGlzIHRoZVxuICAgc2luZ2xlIHNvdXJjZSBvZiB0cnV0aDogYWRkaW5nIG9yIGVkaXRpbmcgYSBwcm92aWRlciB0aGVyZVxuICAgKERCIHJvdyAvIERqYW5nbyBhZG1pbikgZmxvd3MgdG8gdGhlIGV4dGVuc2lvbiBhdXRvbWF0aWNhbGx5XG4gICBvbiB0aGUgbmV4dCByZWZyZXNoLiBgc3JjL2xpYi9wcm92aWRlcnMudHNgIHJlbWFpbnMgb25seSBhc1xuICAgYW4gb2ZmbGluZSBmYWxsYmFjayBzZWVkLlxuXG4gICBOT1RFOiBDaHJvbWUgTVYzIHN0aWxsIHJlcXVpcmVzIGBob3N0X3Blcm1pc3Npb25zYCArIGFcbiAgIGBjb250ZW50X3NjcmlwdHNgIGVudHJ5IGluIG1hbmlmZXN0Lmpzb24gZm9yIHRoZSBleHRlbnNpb24gdG9cbiAgICppbmplY3QqIGEgc2NyaXB0IG9uIGEgZG9tYWluLCBzbyBuZXcgZG9tYWlucyBhbHNvIG5lZWQgYVxuICAgb25lLWxpbmUgbWFuaWZlc3QgZW50cnkgKyByZS1wdWJsaXNoLiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZVxuICAgbWV0YWRhdGEgKGdyb3VwcywgY29sb3Vycywgc3luYyBlbGlnaWJpbGl0eSwgZGV0ZWN0aW9uKSxcbiAgIHdoaWNoIGlzIGV2ZXJ5dGhpbmcgZXhjZXB0IHNjcmlwdCBpbmplY3Rpb24uXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuaW1wb3J0IHsgUFJPVklERVJTIH0gZnJvbSBcIi4vcHJvdmlkZXJzXCI7XG5pbXBvcnQgdHlwZSB7IFByb3ZpZGVyR3JvdXAgfSBmcm9tIFwiLi9wcm92aWRlcnNcIjtcbmltcG9ydCB7IEFQSV9VUkwgfSBmcm9tIFwiLi9lbnZcIjtcbmNvbnN0IFNUT1JBR0VfS0VZID0gXCJwcm92aWRlcnNcIjtcblxuLyoqIEJhcmUgcmVnaXN0cmFibGUgZG9tYWlucyB1c2VkIGZvciBjb29raWUgc3luYyAob25seSBiYWNrZW5kLXN1cHBvcnRlZCkuICovXG5jb25zdCBDT09LSUVfRE9NQUlOUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgbGlua2VkaW46IFwibGlua2VkaW4uY29tXCIsXG4gIGluZGVlZDogXCJpbmRlZWQuY29tXCIsXG4gIGdsYXNzZG9vcjogXCJnbGFzc2Rvb3IuY29tXCIsXG4gIGJheXQ6IFwiYmF5dC5jb21cIixcbiAgcmVlZDogXCJyZWVkLmNvLnVrXCIsXG4gIG5hdWtyaWd1bGY6IFwibmF1a3JpZ3VsZi5jb21cIixcbiAgYnVpbHRpbjogXCJidWlsdGluLmNvbVwiLFxuICB6aXByZWNydWl0ZXI6IFwiemlwcmVjcnVpdGVyLmNvbVwiLFxuICB3b3JrYWJsZTogXCJ3b3JrYWJsZS5jb21cIixcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZlUHJvdmlkZXIge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGdyb3VwOiBQcm92aWRlckdyb3VwO1xuICAvKiogUmVnZXggcGF0dGVybnMgZnJvbSB0aGUgYmFja2VuZCAocHJlZmVycmVkIGZvciBkZXRlY3Rpb24pLiAqL1xuICB1cmxfcGF0dGVybnM/OiBzdHJpbmdbXTtcbiAgLyoqIFN1YnN0cmluZyBkb21haW5zIChmYWxsYmFjayBzZWVkIG9ubHkpLiAqL1xuICBkb21haW5zPzogc3RyaW5nW107XG4gIC8qKiBIZXggKGJhY2tlbmQpIG9yIHRhaWx3aW5kIGNsYXNzIChmYWxsYmFjayBzZWVkKS4gKi9cbiAgY29sb3I6IHN0cmluZztcbiAgc3VwcG9ydHNTeW5jOiBib29sZWFuO1xuICBjb29raWVEb21haW4/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBCYWNrZW5kUHJvdmlkZXIge1xuICBpZD86IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgdXJsX3BhdHRlcm5zPzogc3RyaW5nW107XG4gIGdyb3VwOiBQcm92aWRlckdyb3VwO1xuICBjb2xvcj86IHN0cmluZztcbiAgc3VwcG9ydHNfc3luYz86IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShwOiBCYWNrZW5kUHJvdmlkZXIpOiBBY3RpdmVQcm92aWRlciB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHAubmFtZSxcbiAgICBuYW1lOiBwLmRpc3BsYXlfbmFtZSxcbiAgICBncm91cDogKHAuZ3JvdXAgYXMgUHJvdmlkZXJHcm91cCkgPz8gXCJhdHNcIixcbiAgICB1cmxfcGF0dGVybnM6IHAudXJsX3BhdHRlcm5zICYmIHAudXJsX3BhdHRlcm5zLmxlbmd0aCA/IHAudXJsX3BhdHRlcm5zIDogdW5kZWZpbmVkLFxuICAgIGNvbG9yOiBwLmNvbG9yIHx8IFwiIzY0NzQ4QlwiLFxuICAgIHN1cHBvcnRzU3luYzogQm9vbGVhbihwLnN1cHBvcnRzX3N5bmMpLFxuICAgIGNvb2tpZURvbWFpbjogQ09PS0lFX0RPTUFJTlNbcC5uYW1lXSxcbiAgfTtcbn1cblxuLyoqIEZhbGxiYWNrIHNlZWQgKG9mZmxpbmUgLyB1bmF1dGhlbnRpY2F0ZWQpLCBzaGFwZWQgbGlrZSB0aGUgZHluYW1pYyBsaXN0LiAqL1xuZnVuY3Rpb24gZmFsbGJhY2tQcm92aWRlcnMoKTogQWN0aXZlUHJvdmlkZXJbXSB7XG4gIHJldHVybiBQUk9WSURFUlMubWFwKChwKSA9PiAoe1xuICAgIGlkOiBwLmlkLFxuICAgIG5hbWU6IHAubmFtZSxcbiAgICBncm91cDogcC5ncm91cCxcbiAgICBkb21haW5zOiBwLmRvbWFpbnMsXG4gICAgY29sb3I6IHAuY29sb3IsXG4gICAgc3VwcG9ydHNTeW5jOiBwLnN1cHBvcnRzU3luYyxcbiAgICBjb29raWVEb21haW46IHAuY29va2llRG9tYWluLFxuICB9KSk7XG59XG5cbi8qKiBSZWFkIHRoZSBjYWNoZWQgcHJvdmlkZXIgbGlzdCAoZHluYW1pYyBpZiBwcmVzZW50LCBlbHNlIGZhbGxiYWNrKS4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVQcm92aWRlcnMoKTogUHJvbWlzZTxBY3RpdmVQcm92aWRlcltdPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFNUT1JBR0VfS0VZKTtcbiAgICBjb25zdCBjYWNoZWQgPSByZXN1bHRbU1RPUkFHRV9LRVldIGFzIEFjdGl2ZVByb3ZpZGVyW10gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGNhY2hlZCAmJiBjYWNoZWQubGVuZ3RoKSByZXR1cm4gY2FjaGVkO1xuICB9IGNhdGNoIHtcbiAgICAvLyBzdG9yYWdlIHVuYXZhaWxhYmxlIC0gZmFsbCB0aHJvdWdoIHRvIHNlZWRcbiAgfVxuICByZXR1cm4gZmFsbGJhY2tQcm92aWRlcnMoKTtcbn1cblxuLyoqIEZldGNoIHRoZSBsYXRlc3QgcHJvdmlkZXJzIGZyb20gdGhlIGJhY2tlbmQgYW5kIGNhY2hlIHRoZW0uICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaFByb3ZpZGVycygpOiBQcm9taXNlPEFjdGl2ZVByb3ZpZGVyW10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHRva2VuIH0gPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ0b2tlblwiKTtcbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiIH07XG4gICAgaWYgKHRva2VuKSBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0FQSV9VUkx9L2FwaS9hdHMtcHJvdmlkZXJzL2AsIHtcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgQmFja2VuZCByZXR1cm5lZCAke3Jlcy5zdGF0dXN9YCk7XG5cbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBjb25zdCByb3dzOiBCYWNrZW5kUHJvdmlkZXJbXSA9IGJvZHkucmVzdWx0cyB8fCBib2R5LmRhdGE/LnJlc3VsdHMgfHwgYm9keS5kYXRhIHx8IGJvZHk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJvd3MpIHx8IHJvd3MubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJFbXB0eSBwcm92aWRlciBsaXN0XCIpO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHJvd3MubWFwKG5vcm1hbGl6ZSk7XG4gICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW1NUT1JBR0VfS0VZXTogbm9ybWFsaXplZCB9KTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfSBjYXRjaCB7XG4gICAgLy8gTmV0d29yay9hdXRoIGZhaWx1cmUgLSBrZWVwIHVzaW5nIHdoYXRldmVyIGlzIGNhY2hlZCBvciB0aGUgc2VlZC5cbiAgICByZXR1cm4gZ2V0QWN0aXZlUHJvdmlkZXJzKCk7XG4gIH1cbn1cblxuLyoqIFN5bmNocm9ub3VzLWlzaCB0ZXN0IHVzZWQgYnkgdGhlIGRldGVjdG9yIChwYXR0ZXJucyBtYXkgYmUgcmVnZXgpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVybE1hdGNoZXNQcm92aWRlcih1cmw6IHN0cmluZywgcDogQWN0aXZlUHJvdmlkZXIpOiBib29sZWFuIHtcbiAgaWYgKHAudXJsX3BhdHRlcm5zICYmIHAudXJsX3BhdHRlcm5zLmxlbmd0aCkge1xuICAgIHJldHVybiBwLnVybF9wYXR0ZXJucy5zb21lKChwYXQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHBhdCwgXCJpXCIpLnRlc3QodXJsKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaWYgKHAuZG9tYWlucyAmJiBwLmRvbWFpbnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHAuZG9tYWlucy5zb21lKChkKSA9PiB1cmwuaW5jbHVkZXMoZCkpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImltcG9ydCB7XG4gIGdldEFjdGl2ZVByb3ZpZGVycyxcbiAgcmVmcmVzaFByb3ZpZGVycyxcbiAgdXJsTWF0Y2hlc1Byb3ZpZGVyLFxuICB0eXBlIEFjdGl2ZVByb3ZpZGVyLFxufSBmcm9tIFwiLi9wcm92aWRlclN5bmNcIjtcbmltcG9ydCB7IFBST1ZJREVSUyB9IGZyb20gXCIuL3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBBVFNUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZnVuY3Rpb24gdG9BY3RpdmUocDogKHR5cGVvZiBQUk9WSURFUlMpW251bWJlcl0pOiBBY3RpdmVQcm92aWRlciB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHAuaWQsXG4gICAgbmFtZTogcC5uYW1lLFxuICAgIGdyb3VwOiBwLmdyb3VwLFxuICAgIGRvbWFpbnM6IHAuZG9tYWlucyxcbiAgICBjb2xvcjogcC5jb2xvcixcbiAgICBzdXBwb3J0c1N5bmM6IHAuc3VwcG9ydHNTeW5jLFxuICAgIGNvb2tpZURvbWFpbjogcC5jb29raWVEb21haW4sXG4gIH07XG59XG5cbi8vIFN0YXJ0IHdpdGggdGhlIGJ1bmRsZWQgc2VlZCBzbyBkZXRlY3Rpb24gd29ya3MgYmVmb3JlIGFueSBuZXR3b3JrIGNhbGwsXG4vLyB0aGVuIHJlcGxhY2Ugd2l0aCB0aGUgY2FjaGVkL2JhY2tlbmQgbGlzdCBhcyBzb29uIGFzIGl0IHJlc29sdmVzLlxubGV0IGNhY2hlOiBBY3RpdmVQcm92aWRlcltdID0gUFJPVklERVJTLm1hcCh0b0FjdGl2ZSk7XG5cbmdldEFjdGl2ZVByb3ZpZGVycygpLnRoZW4oKGxpc3QpID0+IHtcbiAgaWYgKGxpc3QubGVuZ3RoKSBjYWNoZSA9IGxpc3Q7XG59KTtcbnJlZnJlc2hQcm92aWRlcnMoKS50aGVuKChsaXN0KSA9PiB7XG4gIGlmIChsaXN0Lmxlbmd0aCkgY2FjaGUgPSBsaXN0O1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RBVFModXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBBVFNUeXBlIHtcbiAgaWYgKCF1cmwpIHJldHVybiBcInVuc3VwcG9ydGVkXCI7XG4gIGZvciAoY29uc3QgcCBvZiBjYWNoZSkge1xuICAgIGlmICh1cmxNYXRjaGVzUHJvdmlkZXIodXJsLCBwKSkgcmV0dXJuIHAuaWQgYXMgQVRTVHlwZTtcbiAgfVxuICByZXR1cm4gXCJ1bnN1cHBvcnRlZFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QVRTRGlzcGxheU5hbWUoYXRzVHlwZTogQVRTVHlwZSk6IHN0cmluZyB7XG4gIGlmICghYXRzVHlwZSB8fCBhdHNUeXBlID09PSBcInVuc3VwcG9ydGVkXCIpIHJldHVybiBcIlZlY3RhIEFJXCI7XG4gIHJldHVybiBjYWNoZS5maW5kKChwKSA9PiBwLmlkID09PSBhdHNUeXBlKT8ubmFtZSA/PyBcIlZlY3RhIEFJXCI7XG59XG5cbi8qKiBFdmVyeSBrbm93biBwcm92aWRlciBpZCAoZnJvbSB0aGUgYnVuZGxlZCBzZWVkOyBmb3IgdGVzdHMvY29tcGF0KS4gKi9cbmV4cG9ydCBjb25zdCBBTExfQVRTX0lEUzogc3RyaW5nW10gPSBQUk9WSURFUlMubWFwKChwKSA9PiBwLmlkKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUEsU0FBZ0IsaUJBQ2QsS0FDQSxVQUNhO0NBQ2IsSUFBSSxDQUFDLE9BQU8sT0FBTyxRQUFRLFVBQ3pCLE9BQU8sWUFBWSxhQUFhO0NBR2xDLE1BQU0sTUFBTTtDQUdaLElBQUksSUFBSSxZQUFZLE9BQU8sSUFBSSxhQUFhLFVBQVU7RUFDcEQsTUFBTSxPQUFPLFlBQVksYUFBYTtFQUN0QyxPQUFPO0dBQ0wsR0FBRztHQUNILEdBQUc7R0FDSCxVQUFVO0lBQUUsR0FBRyxLQUFLO0lBQVUsR0FBRyxJQUFJO0dBQVM7R0FDOUMsUUFBUSxJQUFJLFVBQVUsVUFBVSxVQUFVO0dBQzFDLFNBQVMsSUFBSSxXQUFXLFVBQVUsV0FBVyxDQUFDO0dBQzlDLFlBQVksTUFBTSxRQUFRLElBQUksVUFBVSxJQUNwQyxJQUFJLGFBQ0osS0FBSztHQUNULFdBQVcsTUFBTSxRQUFRLElBQUksU0FBUyxJQUFJLElBQUksWUFBWSxLQUFLO0VBQ2pFO0NBQ0Y7Q0FHQSxJQUFJLFVBQVU7Q0FDZCxJQUNFLFVBQVUsT0FDVixJQUFJLFFBQ0osT0FBTyxJQUFJLFNBQVMsWUFDcEIsRUFBRSxjQUFjLE1BRWhCLFVBQVUsSUFBSTtDQUdoQixNQUFNLE9BQ0osUUFBUSxRQUFRLE9BQU8sUUFBUSxTQUFTLFdBQVcsUUFBUSxPQUFPLENBQUM7Q0FFckUsTUFBTSxXQUFtQixRQUFRLFFBQVEsS0FBSyxRQUFRO0NBQ3RELE1BQU0sUUFBZ0IsUUFBUSxTQUFTLEtBQUssU0FBUztDQUNyRCxNQUFNLFlBQVksU0FBUyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUs7Q0FDN0MsTUFBTSxZQUFZLFVBQVUsTUFBTTtDQUNsQyxNQUFNLFdBQVcsVUFBVSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSztDQUVuRCxNQUFNLFdBQVcsUUFBUSxZQUFZO0NBQ3JDLE1BQU0sZ0JBQWdCLE1BQU0sUUFBUSxRQUFRLGNBQWMsSUFDdEQsUUFBUSxpQkFDUixPQUFPLFFBQVEsbUJBQW1CLFdBQ2hDLFFBQVEsZUFDTCxNQUFNLEdBQUcsQ0FBQyxDQUNWLEtBQUssTUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQzVCLE9BQU8sT0FBTyxJQUNqQixDQUFDO0NBQ1AsTUFBTSxZQUFZLE1BQU0sUUFBUSxRQUFRLFVBQVUsSUFDOUMsUUFBUSxhQUNSLE9BQU8sUUFBUSxlQUFlLFdBQzVCLFFBQVEsV0FDTCxNQUFNLEdBQUcsQ0FBQyxDQUNWLEtBQUssTUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQzVCLE9BQU8sT0FBTyxJQUNqQixDQUFDO0NBQ1AsTUFBTSxTQUFTLE1BQU0sUUFBUSxRQUFRLE1BQU0sSUFDdkMsUUFBUSxTQUNSLE9BQU8sUUFBUSxXQUFXLFdBQ3hCLFFBQVEsT0FDTCxNQUFNLEdBQUcsQ0FBQyxDQUNWLEtBQUssTUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQzVCLE9BQU8sT0FBTyxJQUNqQjtDQUNOLE1BQU0sYUFBYSxNQUFNLFFBQVEsUUFBUSxVQUFVLElBQy9DLFFBQVEsYUFDUixPQUFPLFFBQVEsZUFBZSxXQUM1QixRQUFRLFdBQ0wsTUFBTSxHQUFHLENBQUMsQ0FDVixLQUFLLE1BQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUM1QixPQUFPLE9BQU8sSUFDakIsQ0FBQztDQUVQLE1BQU0sV0FBVztFQUNmO0VBQ0E7RUFDQSxNQUFNO0VBQ047RUFDQSxPQUFPLFFBQVEsU0FBUztFQUN4QixVQUFVLFFBQVEsWUFBWTtFQUM5QixTQUFTO0VBQ1QsTUFBTTtFQUNOLFNBQVM7RUFDVCxhQUFhLFFBQVEsZ0JBQWdCO0VBQ3JDLFdBQVcsUUFBUSxjQUFjO0VBQ2pDLFlBQVksUUFBUSxpQkFBaUI7RUFDckMsU0FBUyxZQUFZLFFBQVEsV0FBVztFQUN4QztFQUNBLG1CQUFtQixRQUFRLHVCQUF1QjtFQUNsRCxnQkFBZ0IsUUFBUSxtQkFBbUI7RUFDM0M7RUFDQSxnQkFBZ0IsUUFBUSxtQkFBbUI7RUFDM0M7RUFDQTtFQUNBO0VBQ0EsbUJBQW1CLFFBQVEsc0JBQXNCO0VBQ2pELGtCQUFrQixRQUFRLHNCQUFzQjtFQUNoRCxrQkFBa0IsUUFBUSxzQkFBc0I7Q0FDbEQ7Q0FFQSxNQUFNLGFBQ0osUUFBUSxtQkFBbUIsT0FBTyxRQUFRLG9CQUFvQixXQUN6RCxRQUFRLGtCQUNULENBQUM7Q0FnQlAsT0FBTztFQUNMO0VBQ0EsWUFmQSxNQUFNLFFBQVEsUUFBUSxVQUFVLEtBQUssUUFBUSxXQUFXLFNBQVMsSUFDN0QsUUFBUSxhQUNSLE1BQU0sUUFBUSxXQUFXLFVBQVUsSUFDakMsV0FBVyxhQUNWLFVBQVUsY0FBYyxDQUFDO0VBWWhDLFdBVEEsTUFBTSxRQUFRLFFBQVEsU0FBUyxLQUFLLFFBQVEsVUFBVSxTQUFTLElBQzNELFFBQVEsWUFDUixNQUFNLFFBQVEsV0FBVyxTQUFTLElBQ2hDLFdBQVcsWUFDVixVQUFVLGFBQWEsQ0FBQztFQU0vQixRQUFRLFVBQVUsVUFBVTtFQUM1QixTQUFTLFVBQVUsV0FBVyxDQUFDO0NBQ2pDO0FBQ0Y7QUFFQSxTQUFnQixlQUE0QjtDQUMxQyxPQUFPO0VBQ0wsVUFBVTtHQUNSLFdBQVc7R0FDWCxVQUFVO0dBQ1YsTUFBTTtHQUNOLE9BQU87R0FDUCxPQUFPO0dBQ1AsVUFBVTtHQUNWLFNBQVM7R0FDVCxNQUFNO0dBQ04sU0FBUztHQUNULGFBQWE7R0FDYixXQUFXO0dBQ1gsWUFBWTtHQUNaLFNBQVM7R0FDVCxVQUFVO0dBQ1YsbUJBQW1CO0dBQ25CLGdCQUFnQjtHQUNoQixlQUFlLENBQUM7R0FDaEIsZ0JBQWdCO0dBQ2hCLFdBQVcsQ0FBQztHQUNaLFFBQVEsQ0FBQztHQUNULFlBQVksQ0FBQztHQUNiLG1CQUFtQjtHQUNuQixrQkFBa0I7R0FDbEIsa0JBQWtCO0VBQ3BCO0VBQ0EsWUFBWSxDQUFDO0VBQ2IsV0FBVyxDQUFDO0VBQ1osUUFBUTtFQUNSLFNBQVMsQ0FBQztDQUNaO0FBQ0Y7OztBQ2hMQSxlQUFzQixhQUEwQztDQUU5RCxNQUFNLE9BQU0sTUFETyxPQUFPLFFBQVEsTUFBTSxJQUFJLFNBQVMsRUFBQSxDQUNwQztDQUNqQixJQUFJLENBQUMsS0FBSyxPQUFPO0NBS2pCLE9BQU8saUJBQWlCLEdBQUc7QUFDN0I7QUFFQSxlQUFzQixXQUFXLFNBQXFDO0NBQ3BFLE1BQU0sT0FBTyxRQUFRLE1BQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUM1QztBQUVBLGVBQXNCLGVBQTRDO0NBQ2hFLElBQUk7RUFHRixNQUFNLGFBQWEsaUJBQWlCLE1BRmxCLFNBQVMsa0JBQWtCLEdBRUosTUFEbEIsV0FBVyxDQUNlO0VBQ2pELE1BQU0sV0FBVyxVQUFVO0VBQzNCLE9BQU87Q0FDVCxTQUFTLEtBQUs7RUFDWixRQUFRLEtBQUssbUNBQW1DLEdBQUc7RUFDbkQsT0FBTyxXQUFXO0NBQ3BCO0FBQ0Y7QUFFQSxlQUFzQixxQkFBcUIsU0FBd0M7Q0FDakYsSUFBSTtFQUNGLE1BQU0sSUFBSSxRQUFRO0VBQ2xCLE1BQU0sVUFBK0I7R0FDbkMsT0FBTyxFQUFFLFNBQVM7R0FDbEIsVUFBVSxFQUFFLFlBQVk7R0FDeEIsY0FBYyxFQUFFLGVBQWU7R0FDL0IsWUFBWSxFQUFFLGFBQWE7R0FDM0IsZUFBZSxFQUFFLGNBQWM7R0FDL0IsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXO0dBQ3JDLHFCQUFxQixFQUFFLG9CQUFvQixPQUFPLEVBQUUsaUJBQWlCLElBQUk7R0FDekUsaUJBQWlCLEVBQUUsa0JBQWtCO0dBQ3JDLGdCQUFnQixNQUFNLFFBQVEsRUFBRSxhQUFhLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztHQUNwRSxpQkFBaUIsRUFBRSxrQkFBa0I7R0FDckMsWUFBWSxNQUFNLFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRSxZQUFZLENBQUM7R0FDeEQsUUFBUSxNQUFNLFFBQVEsRUFBRSxNQUFNLEtBQUssRUFBRSxPQUFPLFNBQVMsSUFBSSxFQUFFLFNBQVUsTUFBTSxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsWUFBWSxDQUFDO0dBQ2pILFlBQVksTUFBTSxRQUFRLEVBQUUsVUFBVSxJQUFJLEVBQUUsYUFBYSxDQUFDO0dBQzFELG9CQUFvQixFQUFFLHFCQUFxQjtHQUMzQyxvQkFBb0IsRUFBRSxtQkFBbUIsT0FBTyxFQUFFLGdCQUFnQixJQUFJO0dBQ3RFLG9CQUFvQixFQUFFLG9CQUFvQjtHQUMxQyxZQUFZLFFBQVEsY0FBYyxDQUFDO0dBQ25DLFdBQVcsUUFBUSxhQUFhLENBQUM7R0FDakMsaUJBQWlCO0lBQ2YsWUFBWSxRQUFRLGNBQWMsQ0FBQztJQUNuQyxXQUFXLFFBQVEsYUFBYSxDQUFDO0dBQ25DO0VBQ0Y7RUFDQSxJQUFJLEVBQUUsTUFDSixRQUFRLE9BQU8sRUFBRTtFQUVuQixNQUFNLFNBQVMsb0JBQW9CO0dBQ2pDLFFBQVE7R0FDUixNQUFNLEtBQUssVUFBVSxPQUFPO0VBQzlCLENBQUM7RUFDRCxPQUFPO0NBQ1QsU0FBUyxLQUFLO0VBQ1osUUFBUSxLQUFLLHNDQUFzQyxHQUFHO0VBQ3RELE9BQU87Q0FDVDtBQUNGO0FBRUEsZUFBc0IscUJBQW9DO0NBQ3hELE1BQU0sT0FBTyxRQUFRLE1BQU0sSUFBSSxFQUFFLG9CQUFvQixLQUFLLENBQUM7QUFDN0Q7QUFFQSxlQUFzQix1QkFBeUM7Q0FFN0QsT0FBTyxDQUFDLEVBQUMsTUFEVSxPQUFPLFFBQVEsTUFBTSxJQUFJLG9CQUFvQixFQUFBLENBQ2xEO0FBQ2hCO0FBRUEsSUFBTSxpQkFBZ0M7Q0FDcEMsTUFBTTtDQUNOLGdCQUFnQjtDQUNoQixtQkFBbUI7Q0FDbkIsZ0JBQWdCO0NBQ2hCLGtCQUFrQjtDQUNsQixXQUFXO0NBQ1gsZUFBZTtDQUNmLGlCQUFpQjtBQUNuQjtBQUVBLGVBQXNCLGFBQXFDO0NBRXpELFFBQVEsTUFEVyxPQUFPLFFBQVEsTUFBTSxJQUFJLFNBQVMsRUFBQSxDQUN4QyxXQUE2QjtBQUM1QztBQUVBLGVBQXNCLFdBQVcsU0FBdUM7Q0FDdEUsTUFBTSxPQUFPLFFBQVEsTUFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDO0FBQzVDOzs7O0FBS0EsZUFBc0IsZUFBOEM7Q0FDbEUsSUFBSTtFQUNGLE1BQU0sTUFBTSxNQUFNLFNBQVMsc0JBQXNCO0VBQ2pELE1BQU0sT0FBTyxPQUFPLFVBQVUsTUFBTSxJQUFJLE9BQU8sUUFBUTtFQUN2RCxJQUFJLENBQUMsS0FBSyxPQUFPO0VBQ2pCLE1BQU0sVUFBeUI7R0FDN0IsTUFBTSxJQUFJLFFBQVE7R0FDbEIsZ0JBQWdCLElBQUksa0JBQWtCO0dBQ3RDLG1CQUFtQixJQUFJLHFCQUFxQjtHQUM1QyxnQkFBZ0IsSUFBSSxrQkFBa0I7R0FDdEMsa0JBQWtCLElBQUksb0JBQW9CO0dBQzFDLFdBQVcsSUFBSSxhQUFhO0dBQzVCLGVBQWUsSUFBSSxpQkFBaUI7R0FDcEMsaUJBQWlCLElBQUksbUJBQW1CO0VBQzFDO0VBQ0EsTUFBTSxXQUFXLE9BQU87RUFDeEIsT0FBTztDQUNULFFBQVE7RUFFTixPQUFPO0NBQ1Q7QUFDRjtBQUVBLGVBQXNCLFdBQStCO0NBRW5ELFFBQ0UsTUFGa0IsT0FBTyxRQUFRLE1BQU0sSUFBSSxPQUFPLEVBQUEsQ0FFN0MsU0FBUztFQUNaLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix3QkFBd0I7RUFDeEIsZUFBZTtFQUNmLGVBQWU7RUFDZixvQkFBb0I7Q0FDdEI7QUFFSjtBQU9BLGVBQXNCLFlBQVksTUFBbUM7Q0FDbkUsTUFBTSxPQUFPLFFBQVEsTUFBTSxJQUFJLEVBQUUsVUFBVSxLQUFLLENBQUM7QUFDbkQ7QUFFQSxJQUFNLGtCQUFxQztDQUN6QyxpQkFBaUI7Q0FDakIsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixZQUFZO0FBQ2Q7QUFFQSxlQUFzQixjQUEwQztDQUM5RCxNQUFNLE9BQU8sTUFBTSxPQUFPLFFBQVEsTUFBTSxJQUFJLFVBQVU7Q0FDdEQsT0FBTztFQUFFLEdBQUc7RUFBaUIsR0FBSSxLQUFLLFlBQVksQ0FBQztDQUFHO0FBQ3hEO0FBRUEsZUFBc0IsZUFBZSxVQUFrRTtDQUVyRyxNQUFNLFVBQVU7RUFBRSxHQUFHLE1BREMsWUFBWTtFQUNKLEdBQUc7Q0FBUztDQUMxQyxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUksRUFBRSxVQUFVLFFBQVEsQ0FBQztDQUNwRCxPQUFPO0FBQ1Q7QUFFQSxJQUFhLHdCQUE0QztDQUN2RCxXQUFXLENBQUMsV0FBVztDQUN2QixtQkFBbUIsQ0FBQyxPQUFPLFFBQVE7Q0FDbkMsV0FBVztDQUNYLFlBQVk7Q0FDWixZQUFZO0NBQ1osVUFBVTtDQUNWLFdBQVcsQ0FBQztDQUNaLFVBQVUsQ0FBQztBQUNiO0FBRUEsZUFBc0IsaUJBQThDO0NBQ2xFLE1BQU0sT0FBTyxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUksaUJBQWlCO0NBQzdELE9BQU87RUFBRSxHQUFHO0VBQXVCLEdBQUksS0FBSyxtQkFBbUIsQ0FBQztDQUFHO0FBQ3JFO0FBRUEsZUFBc0IsZUFBZSxPQUEwQztDQUM3RSxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUksRUFBRSxpQkFBaUIsTUFBTSxDQUFDO0FBQzNEOzs7O0FBS0EsZUFBc0IsbUJBQXVEO0NBQzNFLElBQUk7RUFDRixNQUFNLE1BQU0sTUFBTSxTQUFTLG1CQUFtQjtFQUM5QyxNQUFNLE9BQU8sT0FBTyxVQUFVLE1BQU0sSUFBSSxPQUFPLFFBQVE7RUFDdkQsTUFBTSxPQUFPLEtBQUssWUFBWSxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQztFQUMxRCxNQUFNLE9BQU8sS0FBSyxTQUFTLElBQUksS0FBSyxLQUFNLEtBQUssS0FBSyxNQUFNO0VBRTFELElBQUksQ0FBQyxNQUFNLE9BQU87RUFFbEIsTUFBTSxhQUFpQztHQUNyQyxJQUFJLEtBQUs7R0FDVCxXQUFXLE1BQU0sUUFBUSxLQUFLLFNBQVMsSUFBSSxLQUFLLFlBQVksQ0FBQztHQUM3RCxtQkFBbUIsTUFBTSxRQUFRLEtBQUssaUJBQWlCLElBQUksS0FBSyxvQkFBb0IsQ0FBQztHQUNyRixXQUFXLEtBQUssYUFBYTtHQUM3QixZQUFZLEtBQUssYUFBYSxPQUFPLEtBQUssVUFBVSxJQUFJO0dBQ3hELFlBQVksS0FBSyxhQUFhLE9BQU8sS0FBSyxVQUFVLElBQUk7R0FDeEQsVUFBVSxLQUFLLFlBQVk7R0FDM0IsV0FBVyxNQUFNLFFBQVEsS0FBSyxTQUFTLElBQUksS0FBSyxZQUFZLENBQUM7R0FDN0QsVUFBVSxNQUFNLFFBQVEsS0FBSyxRQUFRLElBQUksS0FBSyxXQUFXLENBQUM7RUFDNUQ7RUFFQSxNQUFNLGVBQWUsVUFBVTtFQUMvQixPQUFPO0NBQ1QsU0FBUyxLQUFLO0VBQ1osUUFBUSxLQUFLLDZDQUE2QyxHQUFHO0VBQzdELE9BQU87Q0FDVDtBQUNGOzs7O0FBS0EsZUFBc0IseUJBQXlCLE9BQXdEO0NBRXJHLE1BQU0sZUFBZSxLQUFLO0NBRTFCLElBQUk7RUFDRixNQUFNLFVBQVU7R0FDZCxXQUFXLE1BQU07R0FDakIsbUJBQW1CLE1BQU07R0FDekIsV0FBVyxNQUFNO0dBQ2pCLFlBQVksTUFBTTtHQUNsQixZQUFZLE1BQU0sY0FBYztHQUNoQyxVQUFVLE1BQU0sU0FBUyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztHQUNqRCxXQUFXLE1BQU07R0FDakIsVUFBVSxNQUFNO0VBQ2xCO0VBRUEsTUFBTSxNQUFNLE1BQU0sU0FBUyxxQkFBcUI7R0FDOUMsUUFBUTtHQUNSLE1BQU0sS0FBSyxVQUFVLE9BQU87RUFDOUIsQ0FBQztFQUVELE1BQU0sU0FBUyxPQUFPLFVBQVUsTUFBTSxJQUFJLE9BQU8sUUFBUSxDQUFDO0VBQzFELE1BQU0sU0FBNkI7R0FDakMsR0FBRztHQUNILElBQUksTUFBTSxNQUFNLE1BQU07RUFDeEI7RUFDQSxNQUFNLGVBQWUsTUFBTTtFQUMzQixPQUFPO0NBQ1QsU0FBUyxLQUFLO0VBQ1osUUFBUSxNQUFNLDhDQUE4QyxHQUFHO0VBQy9ELE1BQU07Q0FDUjtBQUNGOzs7O0FDN05BLElBQWEsa0JBQStFLENBQzFGO0NBQ0UsSUFBSTtDQUNKLE9BQU87Q0FDUCxhQUFhO0FBQ2YsR0FDQTtDQUNFLElBQUk7Q0FDSixPQUFPO0NBQ1AsYUFBYTtBQUNmLENBQ0Y7QUFFQSxJQUFhLFlBQTJCO0NBRXRDO0VBQUUsSUFBSTtFQUFZLE1BQU07RUFBWSxPQUFPO0VBQVMsU0FBUyxDQUFDLGNBQWM7RUFBRyxPQUFPO0VBQWdCLGNBQWM7RUFBTSxjQUFjO0NBQWU7Q0FDdko7RUFBRSxJQUFJO0VBQVUsTUFBTTtFQUFVLE9BQU87RUFBUyxTQUFTLENBQUMsWUFBWTtFQUFHLE9BQU87RUFBZ0IsY0FBYztFQUFNLGNBQWM7Q0FBYTtDQUMvSTtFQUFFLElBQUk7RUFBYSxNQUFNO0VBQWEsT0FBTztFQUFTLFNBQVMsQ0FBQyxlQUFlO0VBQUcsT0FBTztFQUFnQixjQUFjO0VBQU0sY0FBYztDQUFnQjtDQUMzSjtFQUFFLElBQUk7RUFBUSxNQUFNO0VBQVEsT0FBTztFQUFTLFNBQVMsQ0FBQyxVQUFVO0VBQUcsT0FBTztFQUFnQixjQUFjO0VBQU0sY0FBYztDQUFXO0NBQ3ZJO0VBQUUsSUFBSTtFQUFRLE1BQU07RUFBUSxPQUFPO0VBQVMsU0FBUyxDQUFDLFlBQVk7RUFBRyxPQUFPO0VBQWdCLGNBQWM7RUFBTSxjQUFjO0NBQWE7Q0FDM0k7RUFBRSxJQUFJO0VBQVcsTUFBTTtFQUFXLE9BQU87RUFBUyxTQUFTLENBQUMsYUFBYTtFQUFHLE9BQU87RUFBZ0IsY0FBYztFQUFNLGNBQWM7Q0FBYztDQUNuSjtFQUFFLElBQUk7RUFBUSxNQUFNO0VBQVEsT0FBTztFQUFTLFNBQVMsQ0FBQyxVQUFVO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDOUc7RUFBRSxJQUFJO0VBQWdCLE1BQU07RUFBZ0IsT0FBTztFQUFTLFNBQVMsQ0FBQyxrQkFBa0I7RUFBRyxPQUFPO0VBQWdCLGNBQWM7RUFBTSxjQUFjO0NBQW1CO0NBQ3ZLO0VBQUUsSUFBSTtFQUFhLE1BQU07RUFBYSxPQUFPO0VBQVMsU0FBUyxDQUFDLGlCQUFpQixlQUFlO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDOUk7RUFBRSxJQUFJO0VBQVEsTUFBTTtFQUFRLE9BQU87RUFBUyxTQUFTLENBQUMsVUFBVTtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzlHO0VBQUUsSUFBSTtFQUFXLE1BQU07RUFBVyxPQUFPO0VBQVMsU0FBUyxDQUFDLGFBQWE7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUN2SDtFQUFFLElBQUk7RUFBaUIsTUFBTTtFQUFpQixPQUFPO0VBQVMsU0FBUyxDQUFDLG1CQUFtQjtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ3pJO0VBQUUsSUFBSTtFQUFlLE1BQU07RUFBZSxPQUFPO0VBQVMsU0FBUyxDQUFDLGlCQUFpQjtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ25JO0VBQUUsSUFBSTtFQUFhLE1BQU07RUFBYyxPQUFPO0VBQVMsU0FBUyxDQUFDLGtCQUFrQjtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ2pJO0VBQUUsSUFBSTtFQUFhLE1BQU07RUFBYSxPQUFPO0VBQVMsU0FBUyxDQUFDLGVBQWU7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUM3SDtFQUFFLElBQUk7RUFBWSxNQUFNO0VBQVksT0FBTztFQUFTLFNBQVMsQ0FBQyxjQUFjO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDMUg7RUFBRSxJQUFJO0VBQVcsTUFBTTtFQUFXLE9BQU87RUFBUyxTQUFTLENBQUMsZUFBZTtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ3pIO0VBQUUsSUFBSTtFQUFhLE1BQU07RUFBYSxPQUFPO0VBQVMsU0FBUyxDQUFDLGlCQUFpQixjQUFjO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDN0k7RUFBRSxJQUFJO0VBQVEsTUFBTTtFQUFRLE9BQU87RUFBUyxTQUFTLENBQUMsVUFBVTtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzlHO0VBQUUsSUFBSTtFQUFVLE1BQU07RUFBVSxPQUFPO0VBQVMsU0FBUyxDQUFDLFlBQVk7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNwSDtFQUFFLElBQUk7RUFBYyxNQUFNO0VBQWMsT0FBTztFQUFTLFNBQVMsQ0FBQyxnQkFBZ0I7RUFBRyxPQUFPO0VBQWdCLGNBQWM7RUFBTSxjQUFjO0NBQWlCO0NBQy9KO0VBQUUsSUFBSTtFQUFVLE1BQU07RUFBVSxPQUFPO0VBQVMsU0FBUyxDQUFDLFlBQVk7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNwSDtFQUFFLElBQUk7RUFBYyxNQUFNO0VBQWMsT0FBTztFQUFTLFNBQVMsQ0FBQyxnQkFBZ0I7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNoSTtFQUFFLElBQUk7RUFBVSxNQUFNO0VBQVUsT0FBTztFQUFTLFNBQVMsQ0FBQyxZQUFZO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDcEg7RUFBRSxJQUFJO0VBQVksTUFBTTtFQUFZLE9BQU87RUFBUyxTQUFTLENBQUMsY0FBYztFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzFIO0VBQUUsSUFBSTtFQUFrQixNQUFNO0VBQW9CLE9BQU87RUFBUyxTQUFTLENBQUMsb0JBQW9CO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDOUk7RUFBRSxJQUFJO0VBQVksTUFBTTtFQUFZLE9BQU87RUFBUyxTQUFTLENBQUMsY0FBYztFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzFIO0VBQUUsSUFBSTtFQUFTLE1BQU07RUFBUyxPQUFPO0VBQVMsU0FBUyxDQUFDLFdBQVc7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNqSDtFQUFFLElBQUk7RUFBYyxNQUFNO0VBQWMsT0FBTztFQUFTLFNBQVMsQ0FBQyxnQkFBZ0I7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUdoSTtFQUFFLElBQUk7RUFBYyxNQUFNO0VBQWMsT0FBTztFQUFPLFNBQVMsQ0FBQyxlQUFlO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDN0g7RUFBRSxJQUFJO0VBQVMsTUFBTTtFQUFTLE9BQU87RUFBTyxTQUFTLENBQUMsVUFBVTtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzlHO0VBQUUsSUFBSTtFQUFXLE1BQU07RUFBVyxPQUFPO0VBQU8sU0FBUyxDQUFDLGFBQWE7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNySDtFQUFFLElBQUk7RUFBWSxNQUFNO0VBQVksT0FBTztFQUFPLFNBQVMsQ0FBQyxjQUFjO0VBQUcsT0FBTztFQUFnQixjQUFjO0VBQU0sY0FBYztDQUFlO0NBQ3JKO0VBQUUsSUFBSTtFQUFTLE1BQU07RUFBUyxPQUFPO0VBQU8sU0FBUyxDQUFDLGFBQWE7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNqSDtFQUFFLElBQUk7RUFBbUIsTUFBTTtFQUFtQixPQUFPO0VBQU8sU0FBUyxDQUFDLHFCQUFxQjtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzdJO0VBQUUsSUFBSTtFQUFTLE1BQU07RUFBUyxPQUFPO0VBQU8sU0FBUyxDQUFDLFdBQVc7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUMvRztFQUFFLElBQUk7RUFBVSxNQUFNO0VBQVUsT0FBTztFQUFPLFNBQVMsQ0FBQyxnQkFBZ0I7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUN0SDtFQUFFLElBQUk7RUFBWSxNQUFNO0VBQVksT0FBTztFQUFPLFNBQVMsQ0FBQyxrQkFBa0IsY0FBYztFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzFJO0VBQUUsSUFBSTtFQUFjLE1BQU07RUFBYyxPQUFPO0VBQU8sU0FBUyxDQUFDLGdCQUFnQjtFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQzlIO0VBQUUsSUFBSTtFQUFZLE1BQU07RUFBWSxPQUFPO0VBQU8sU0FBUyxDQUFDLGdCQUFnQixhQUFhO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDdkk7RUFBRSxJQUFJO0VBQVksTUFBTTtFQUFZLE9BQU87RUFBTyxTQUFTLENBQUMsY0FBYztFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ3hIO0VBQUUsSUFBSTtFQUFXLE1BQU07RUFBVyxPQUFPO0VBQU8sU0FBUyxDQUFDLGFBQWE7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUNySDtFQUFFLElBQUk7RUFBYSxNQUFNO0VBQWEsT0FBTztFQUFPLFNBQVMsQ0FBQyxlQUFlO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07Q0FDM0g7RUFBRSxJQUFJO0VBQVUsTUFBTTtFQUFhLE9BQU87RUFBTyxTQUFTLENBQUMsV0FBVztFQUFHLE9BQU87RUFBZ0IsY0FBYztDQUFNO0NBQ3BIO0VBQUUsSUFBSTtFQUFTLE1BQU07RUFBUyxPQUFPO0VBQU8sU0FBUyxDQUFDLFdBQVc7RUFBRyxPQUFPO0VBQWdCLGNBQWM7Q0FBTTtDQUMvRztFQUFFLElBQUk7RUFBVyxNQUFNO0VBQVcsT0FBTztFQUFPLFNBQVMsQ0FBQyxhQUFhO0VBQUcsT0FBTztFQUFnQixjQUFjO0NBQU07QUFDdkg7OztBQy9FQSxJQUFNLGNBQWM7O0FBR3BCLElBQU0saUJBQXlDO0NBQzdDLFVBQVU7Q0FDVixRQUFRO0NBQ1IsV0FBVztDQUNYLE1BQU07Q0FDTixNQUFNO0NBQ04sWUFBWTtDQUNaLFNBQVM7Q0FDVCxjQUFjO0NBQ2QsVUFBVTtBQUNaO0FBMEJBLFNBQVMsVUFBVSxHQUFvQztDQUNyRCxPQUFPO0VBQ0wsSUFBSSxFQUFFO0VBQ04sTUFBTSxFQUFFO0VBQ1IsT0FBUSxFQUFFLFNBQTJCO0VBQ3JDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLFNBQVMsRUFBRSxlQUFlLEtBQUE7RUFDekUsT0FBTyxFQUFFLFNBQVM7RUFDbEIsY0FBYyxRQUFRLEVBQUUsYUFBYTtFQUNyQyxjQUFjLGVBQWUsRUFBRTtDQUNqQztBQUNGOztBQUdBLFNBQVMsb0JBQXNDO0NBQzdDLE9BQU8sVUFBVSxLQUFLLE9BQU87RUFDM0IsSUFBSSxFQUFFO0VBQ04sTUFBTSxFQUFFO0VBQ1IsT0FBTyxFQUFFO0VBQ1QsU0FBUyxFQUFFO0VBQ1gsT0FBTyxFQUFFO0VBQ1QsY0FBYyxFQUFFO0VBQ2hCLGNBQWMsRUFBRTtDQUNsQixFQUFFO0FBQ0o7O0FBR0EsZUFBc0IscUJBQWdEO0NBQ3BFLElBQUk7RUFFRixNQUFNLFVBQVMsTUFETSxPQUFPLFFBQVEsTUFBTSxJQUFJLFdBQVcsRUFBQSxDQUNuQztFQUN0QixJQUFJLFVBQVUsT0FBTyxRQUFRLE9BQU87Q0FDdEMsUUFBUSxDQUVSO0NBQ0EsT0FBTyxrQkFBa0I7QUFDM0I7O0FBR0EsZUFBc0IsbUJBQThDO0NBQ2xFLElBQUk7RUFDRixNQUFNLEVBQUUsVUFBVSxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUksT0FBTztFQUN4RCxNQUFNLFVBQWtDLEVBQUUsUUFBUSxtQkFBbUI7RUFDckUsSUFBSSxPQUFPLFFBQVEsZ0JBQWdCLFVBQVU7RUFFN0MsTUFBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLFFBQVEsc0JBQXNCO0dBQ3ZELGFBQWE7R0FDYjtFQUNGLENBQUM7RUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sSUFBSSxNQUFNLG9CQUFvQixJQUFJLFFBQVE7RUFFN0QsTUFBTSxPQUFPLE1BQU0sSUFBSSxLQUFLO0VBQzVCLE1BQU0sT0FBMEIsS0FBSyxXQUFXLEtBQUssTUFBTSxXQUFXLEtBQUssUUFBUTtFQUNuRixJQUFJLENBQUMsTUFBTSxRQUFRLElBQUksS0FBSyxLQUFLLFdBQVcsR0FBRyxNQUFNLElBQUksTUFBTSxxQkFBcUI7RUFFcEYsTUFBTSxhQUFhLEtBQUssSUFBSSxTQUFTO0VBQ3JDLE1BQU0sT0FBTyxRQUFRLE1BQU0sSUFBSSxHQUFHLGNBQWMsV0FBVyxDQUFDO0VBQzVELE9BQU87Q0FDVCxRQUFRO0VBRU4sT0FBTyxtQkFBbUI7Q0FDNUI7QUFDRjs7QUFHQSxTQUFnQixtQkFBbUIsS0FBYSxHQUE0QjtDQUMxRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxRQUNuQyxPQUFPLEVBQUUsYUFBYSxNQUFNLFFBQVE7RUFDbEMsSUFBSTtHQUNGLE9BQU8sSUFBSSxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHO0VBQ3RDLFFBQVE7R0FDTixPQUFPO0VBQ1Q7Q0FDRixDQUFDO0NBRUgsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLFFBQ3pCLE9BQU8sRUFBRSxRQUFRLE1BQU0sTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDO0NBRTlDLE9BQU87QUFDVDs7O0FDbElBLFNBQVMsU0FBUyxHQUErQztDQUMvRCxPQUFPO0VBQ0wsSUFBSSxFQUFFO0VBQ04sTUFBTSxFQUFFO0VBQ1IsT0FBTyxFQUFFO0VBQ1QsU0FBUyxFQUFFO0VBQ1gsT0FBTyxFQUFFO0VBQ1QsY0FBYyxFQUFFO0VBQ2hCLGNBQWMsRUFBRTtDQUNsQjtBQUNGO0FBSUEsSUFBSSxRQUEwQixVQUFVLElBQUksUUFBUTtBQUVwRCxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sU0FBUztDQUNsQyxJQUFJLEtBQUssUUFBUSxRQUFRO0FBQzNCLENBQUM7QUFDRCxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sU0FBUztDQUNoQyxJQUFJLEtBQUssUUFBUSxRQUFRO0FBQzNCLENBQUM7QUFFRCxTQUFnQixVQUFVLEtBQWtDO0NBQzFELElBQUksQ0FBQyxLQUFLLE9BQU87Q0FDakIsS0FBSyxNQUFNLEtBQUssT0FDZCxJQUFJLG1CQUFtQixLQUFLLENBQUMsR0FBRyxPQUFPLEVBQUU7Q0FFM0MsT0FBTztBQUNUO0FBRUEsU0FBZ0Isa0JBQWtCLFNBQTBCO0NBQzFELElBQUksQ0FBQyxXQUFXLFlBQVksZUFBZSxPQUFPO0NBQ2xELE9BQU8sTUFBTSxNQUFNLE1BQU0sRUFBRSxPQUFPLE9BQU8sQ0FBQyxFQUFFLFFBQVE7QUFDdEQ7QUFHcUMsVUFBVSxLQUFLLE1BQU0sRUFBRSxFQUFFIn0=