import { type TagId, getSettings } from "@/core/settings";
import { isServer } from "@/utils";

function updateProperty<T>(propertyName: string, value: T) {
  if (value) {
    window[propertyName] = value;
  } else {
    delete window[propertyName];
  }
}

function assignProperty(tagId?: TagId, value?: boolean) {
  const { tagId: settingsTagId, additionalAccounts } = getSettings();

  if (isServer()) {
    return;
  }

  updateProperty(`ga-disable-${tagId ?? settingsTagId}`, value);

  if (!additionalAccounts?.length || tagId) {
    return;
  }

  for (const account of additionalAccounts) {
    updateProperty(`ga-disable-${account.tagId}`, value);
  }
}

/**
 * Disable tracking

 * By default uses the provided tagId and all additional accounts in the plugin configuration.
 * If a tagId is provided, it will only disable that account.
 */
export function optOut(tagId?: TagId) {
  assignProperty(tagId, true);
}

/**
 * Enable tracking
 *
 * By default uses the provided tagId and all additional accounts in the plugin configuration.
 * If a tagId is provided, it will only enable that account.
 */
export function optIn(tagId?: TagId) {
  assignProperty(tagId, undefined);
}
