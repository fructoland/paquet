import { App } from "@/types/App.ts";
import { AppSpec } from "../../scripts/update.ts";

export const kv = await Deno.openKv();

export const getApp = async (id: string, eager = false) => {
	const app = await kv.get<App>(["apps", id], {
		consistency: eager ? "strong" : "eventual",
	});

	return app.value;
};

export const _wipeKv = async () => {
	const iter = kv.list({
		prefix: [],
	});

	for await (const { key } of iter) {
		await kv.delete(key);
	}
}

export const createApp = async (app: App | AppSpec) => {
	const categories = app.categories;

	let tsx = kv.atomic()
		.check({ key: ["apps", app.id], versionstamp: null })
		.set(["apps", app.id], app);


	if (categories && categories.length !== 0) {
		for (const category of categories) {
			tsx = tsx.check({ key: ["apps_by_category", category, app.id], versionstamp: null })
				.set(["apps_by_category", category, app.id], app);
		}
	}

	const res = await tsx.commit();

	if (!res) {
		throw new Error("Failed to create app");
	}

	return true;
}

export const updateApp = async (id: string, app: App) => {
	const categories = app.categories;

	const currentApp = await kv.get<App>(["apps", id]);

	let tsx = kv.atomic()
		.check(currentApp)
		.set(["apps", id], {
			...currentApp.value,
			...app,
			id
		});
	
	if (categories && categories?.length !== 0) {
		for (const category of categories) {
			const currentAppByCategory = await kv.get<App>(["apps_by_category", category, id]);

			// If it doesn't exist, create it
			if (!currentAppByCategory) {
				tsx = tsx.set(["apps_by_category", category, id], {
					...currentApp.value,
					...app,
					id
				});
				continue;
			}

			// But if it does, check it
			tsx = tsx.check(currentAppByCategory)
				.set(["apps_by_category", category, id], {
					...currentApp.value,
					...app,
					id
				});
		}
	}

	const res = await tsx.commit();

	if (!res) {
		throw new Error("Failed to update app");
	}

	return true;
}



export const getApps = async (limit: number, eager = false) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps"],
	}, {
		consistency: eager ? "strong" : "eventual",
	});

	for await (const { value } of iter) {
		apps.push(value);
	}

	return apps.slice(0, limit);
}

export const searchApps = async (limit: number, query: string, eager = false) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps"],
	}, {
		consistency: eager ? "strong" : "eventual",
	});

	for await (const { value } of iter) {
		if (value.name.toLowerCase().includes(query.toLowerCase())) {
			apps.push(value);
		}
	}

	return apps.slice(0, limit);
}

export const getAppsRandom = async (limit: number, eager = false, except?: string) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps"],
	}, {
		consistency: eager ? "strong" : "eventual",
	});


	for await (const { value } of iter) {
		apps.push(value);
	}

	if (except) {
		return apps.filter((app) => app.id !== except).sort(() => Math.random() - 0.5).slice(0, limit);
	} else {
		return apps.sort(() => Math.random() - 0.5).slice(0, limit);
	}
}

export const getAppsByCategory = async (limit: number, category: string, eager = false) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps_by_category", category],
	}, {
		consistency: eager ? "strong" : "eventual",
	});

	for await (const { value } of iter) {
		apps.push(value);
	}

	return apps.slice(0, limit);
}

export const getAppsBetweenDates = async (limit: number, start: Date, end: Date, eager = false) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps"],
	}, {
		consistency: eager ? "strong" : "eventual",
	});

	for await (const { value } of iter) {
		if (new Date(value.addedOn) >= start && new Date(value.addedOn) <= end) {
			apps.push(value);
		}
	}

	return apps.slice(0, limit);
}

export const getRandomAppsWithCover = async (limit: number, eager = false) => {
	const apps: App[] = [];

	const iter = kv.list<App>({
		prefix: ["apps"],
	}, {
		consistency: eager ? "strong" : "eventual",
	});

	for await (const { value } of iter) {
		if (value.cover) {
			apps.push(value);
		}
	}

	return apps.sort(() => Math.random() - 0.5).slice(0, limit);
}
