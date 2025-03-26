import type { App } from "vue";
import addGtag from "./add-gtag";
import config from "./api/config";
import { consent, consentDeniedAll, consentGrantedAll } from "./api/consent";
import customMap from "./api/custom-map";
import ecommerce from "./api/ecommerce";
import event from "./api/event";
import exception from "./api/exception";
import linker from "./api/linker";
import { optIn, optOut } from "./api/opt";
import pageview from "./api/pageview";
import query from "./api/query";
import screenview from "./api/screenview";
import set from "./api/set";
import time from "./api/time";
import { type PluginSettings, updateSettings } from "./settings";

const api = {
	config,
	event,
	linker,
	pageview,
	ecommerce,
	query,
	screenview,
	time,
	set,
	exception,
	customMap,
	consent,
	consentDeniedAll,
	consentGrantedAll,
	optIn,
	optOut,
};

type GtagAPI = typeof api;

declare module "vue" {
	interface ComponentCustomProperties {
		$gtag: GtagAPI;
	}
}

type CreateGtagReturn = (app: App) => void;

export function createGtag(settings: PluginSettings): CreateGtagReturn {
	updateSettings(settings);
	addGtag();

	return (app: App) => {
		app.config.globalProperties.$gtag = api;
	};
}

export * from "./composable/use-consent";

export {
	config,
	event,
	linker,
	pageview,
	ecommerce,
	query,
	screenview,
	time,
	set,
	exception,
	customMap,
	consent,
	consentDeniedAll,
	consentGrantedAll,
	optIn,
	optOut,
};
