import { type TagId, getSettings } from "../core/settings";

function assignProperty(tagId?: TagId, value?: boolean) {
  const { tagId: settingsTagId, additionalAccounts } = getSettings();

  window[`ga-disable-${tagId ?? settingsTagId}`] = value;

  if (!additionalAccounts?.length || tagId) {
    return;
  }

  for (const account of additionalAccounts) {
    window[`ga-disable-${account.tagId}`] = value;
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
