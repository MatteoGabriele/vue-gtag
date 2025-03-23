import flushPromises from "flush-promises";
import addGtag from "../add-gtag";
import { consent, consentDeniedAll, consentGrantedAll } from "../api/consent";
import { resetSettings, updateSettings } from "../settings";
import useGtagWithConsent from "./use-gtag-with-consent";

vi.mock("../api/consent");
vi.mock("../add-gtag");
vi.mock("../settings", async () => ({
  ...(await vi.importActual("../settings")),
  updateSettings: vi.fn(),
}));

const tagId = "G-1234567890";

describe("useGtagWithConsent", () => {
  beforeEach(() => {
    resetSettings();
    vi.stubGlobal("location", {
      ...window.location,
      reload: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should load and accept all consent", async () => {
    const { acceptAll } = useGtagWithConsent({ tagId });

    acceptAll();

    await flushPromises();

    expect(consentGrantedAll).toHaveBeenCalledWith("update");
    expect(window.location.reload).toHaveBeenCalled();
    expect(updateSettings).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
    expect(addGtag).toHaveBeenCalled();
  });

  it("should load and accept custom consent properties", async () => {
    const { acceptCustom } = useGtagWithConsent({
      tagId,
    });

    acceptCustom({
      ad_storage: "denied",
      ad_user_data: "granted",
    });

    await flushPromises();

    expect(consent).toHaveBeenCalledWith("update", {
      ad_storage: "denied",
      ad_user_data: "granted",
    });
    expect(window.location.reload).toHaveBeenCalled();
    expect(updateSettings).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
    expect(addGtag).toHaveBeenCalled();
  });

  it("should reject all", () => {
    const { rejectAll } = useGtagWithConsent({
      tagId,
    });

    rejectAll();

    expect(consentDeniedAll).toHaveBeenCalledWith("update");
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should not have consent", async () => {
    const { hasConsent } = useGtagWithConsent({ tagId });

    expect(hasConsent.value).toEqual(false);
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should have consent", async () => {
    document.cookie = "_ga=1234";
    const { hasConsent } = useGtagWithConsent({ tagId });

    expect(hasConsent.value).toEqual(true);
    expect(updateSettings).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
    expect(addGtag).toHaveBeenCalled();
  });
});
