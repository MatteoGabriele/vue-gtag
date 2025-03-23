import flushPromises from "flush-promises";
import { consent, consentDeniedAll, consentGrantedAll } from "../api/consent";
import createGtag from "../create-gtag";
import { resetSettings } from "../settings";
import useGtagWithConsent from "./use-gtag-with-consent";

vi.mock("../api/consent");
vi.mock("../create-gtag", () => ({
  default: vi.fn().mockResolvedValue({}),
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
    expect(createGtag).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
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
    expect(createGtag).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
  });

  it("should reject all", () => {
    const { rejectAll } = useGtagWithConsent({
      tagId,
    });

    rejectAll();

    expect(consentDeniedAll).toHaveBeenCalledWith("update");
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(createGtag).not.toHaveBeenCalled();
  });

  it("should not have consent", async () => {
    const { hasConsent } = useGtagWithConsent({ tagId });

    expect(hasConsent.value).toEqual(false);
    expect(createGtag).not.toHaveBeenCalled();
  });

  it("should have consent", async () => {
    document.cookie = "_ga=1234";
    const { hasConsent } = useGtagWithConsent({ tagId });

    expect(hasConsent.value).toEqual(true);
    expect(createGtag).toHaveBeenCalledWith({
      consentMode: "denied",
      tagId,
    });
  });
});
