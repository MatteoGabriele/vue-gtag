import { type TagId, getSettings } from "../settings";

export function optOut(tagId?: TagId) {
  const { tagId: settingsTagId } = getSettings();
  window[`ga-disable-${tagId ?? settingsTagId}`] = true;
}

export function optIn(tagId?: TagId) {
  const { tagId: settingsTagId } = getSettings();
  window[`ga-disable-${tagId ?? settingsTagId}`] = undefined;
}
