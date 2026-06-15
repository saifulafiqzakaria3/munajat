import { DHIKR_LIST } from '$lib/data/dhikr';
import { browser } from '$app/environment';

const STORAGE_KEY = 'munajat_counts';

interface DhikrState {
	count: number;
	target: number;
}

type CounterMap = Record<string, DhikrState>;

function loadFromStorage(): CounterMap {
	if (!browser) return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

function saveToStorage(map: CounterMap) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function buildInitialMap(): CounterMap {
	const saved = loadFromStorage();
	const map: CounterMap = {};
	for (const dhikr of DHIKR_LIST) {
		map[dhikr.id] = {
			count: saved[dhikr.id]?.count ?? 0,
			target: saved[dhikr.id]?.target ?? dhikr.defaultTarget
		};
	}
	return map;
}

let counts = $state<CounterMap>(buildInitialMap());

export const counter = {
	get counts() {
		return counts;
	},

	getState(id: string) {
		const state = counts[id] ?? { count: 0, target: 33 };
		return {
			...state,
			progress: state.target > 0 ? Math.min(state.count / state.target, 1) : 0,
			done: state.count >= state.target
		};
	},

	increment(id: string) {
		const state = counts[id];
		if (!state || state.count >= state.target) return;
		counts = { ...counts, [id]: { ...state, count: state.count + 1 } };
		saveToStorage(counts);
	},

	reset(id: string) {
		const state = counts[id];
		if (!state) return;
		counts = { ...counts, [id]: { ...state, count: 0 } };
		saveToStorage(counts);
	},

	setTarget(id: string, target: number) {
		if (target < 1) return;
		const state = counts[id] ?? { count: 0, target };
		counts = { ...counts, [id]: { ...state, target } };
		saveToStorage(counts);
	},

	resetAll() {
		const fresh: CounterMap = {};
		for (const dhikr of DHIKR_LIST) {
			fresh[dhikr.id] = { count: 0, target: counts[dhikr.id]?.target ?? dhikr.defaultTarget };
		}
		counts = fresh;
		saveToStorage(counts);
	}
};
