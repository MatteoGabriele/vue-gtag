import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { query } from "@/api/query";

vi.mock("@/api/query");

describe("consent", () => {
  it("should use the consent event without default values", () => {
    consent("update", {
      ad_user_data: "granted",
      wait_for_update: 1000,
    });

    expect(query).toHaveBeenCalledWith("consent", "update", {
      ad_user_data: "granted",
      wait_for_update: 1000,
    });
  });

  it("should use the consent default and set all to granted", () => {
    consentGrantedAll();

    expect(query).toHaveBeenCalledWith("consent", "default", {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  });

  it("should use the consent update and set all to granted", () => {
    consentGrantedAll("update");

    expect(query).toHaveBeenCalledWith("consent", "update", {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  });

  it("should use the consent default and set all to denied", () => {
    consentDeniedAll();

    expect(query).toHaveBeenCalledWith("consent", "default", {
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    });
  });

  it("should use the consent update and set all to denied", () => {
    consentDeniedAll("update");

    expect(query).toHaveBeenCalledWith("consent", "update", {
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    });
  });
});
