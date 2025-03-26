import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import addGtag from "@/core/add-gtag";
import { resetSettings, updateSettings } from "@/core/settings";
import flushPromises from "flush-promises";
import { useConsent } from "./use-consent";

vi.mock("@/api/consent");
vi.mock("@/core/add-gtag");
vi.mock("@/core/settings", async () => ({
  ...(await vi.importActual("@/core/settings")),
  updateSettings: vi.fn(),
}));

const tagId = "G-1234567890";

describe("useConsent", () => {
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
    const { acceptAll } = useConsent({ tagId });

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
    const { acceptCustom } = useConsent({
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
    const { rejectAll } = useConsent({
      tagId,
    });

    rejectAll();

    expect(consentDeniedAll).toHaveBeenCalledWith("update");
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should not have consent", async () => {
    const { hasConsent } = useConsent({ tagId });

    expect(hasConsent.value).toEqual(false);
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should have consent", async () => {
    document.cookie = "_ga=1234";
    const { hasConsent } = useConsent({ tagId });

    expect(hasConsent.value).toEqual(true);
    expect(updateSettings).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
    expect(addGtag).toHaveBeenCalled();
  });
});
