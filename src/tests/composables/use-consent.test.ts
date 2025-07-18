import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { useConsent } from "@/composables/use-consent";
import { addGtag } from "@/core/add-gtag";
import { resetSettings } from "@/core/settings";
import { removeCookies } from "@/utils";
import flushPromises from "flush-promises";

vi.mock("@/utils");
vi.mock("@/api/consent");
vi.mock("@/core/add-gtag");

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
    const { acceptAll } = useConsent();

    acceptAll();

    await flushPromises();

    expect(consentGrantedAll).toHaveBeenCalledWith("update");
    expect(window.location.reload).toHaveBeenCalled();
    expect(addGtag).toHaveBeenCalled();
  });

  it("should load and accept custom consent properties", async () => {
    const { acceptCustom } = useConsent();

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
    expect(addGtag).toHaveBeenCalled();
  });

  it("should reject all", async () => {
    const { rejectAll } = useConsent();

    rejectAll();

    expect(consentDeniedAll).toHaveBeenCalledWith("update");
    expect(removeCookies).toHaveBeenCalledWith("_ga");

    await flushPromises();

    expect(window.location.reload).toHaveBeenCalled();
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should not have consent", async () => {
    const { hasConsent } = useConsent();

    expect(hasConsent.value).toEqual(false);
    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should have consent", async () => {
    document.cookie = "_ga=1234";
    const { hasConsent } = useConsent();

    expect(hasConsent.value).toEqual(true);
    expect(addGtag).toHaveBeenCalled();
  });
});
