import { ConfigResponse, Features } from "@/actions/types/fetchFlags";

export async function fetchConfig(): Promise<Features> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/sainsburys-tech/argos-checkout-ui-consul-configs/contents/configs/ui-payment/staging/uat2.json",
      {
        headers: {
          Accept: "application/vnd.github.v3.raw", // returns raw JSON file, not base64 encoded
          Authorization: `token ${process.env.GITHUB_PACKAGES_AUTH_TOKEN}`, // Secure token from environment
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Ensure TypeScript knows we're expecting a specific shape
    const configsResponseJson: ConfigResponse = await response.json();
    const { features } = configsResponseJson;

    console.log("api configsResponseJson", configsResponseJson);

    return features;
  } catch (error) {
    console.error("Error fetching config:", error);
    throw new Error("Error fetching config");
  }
}
