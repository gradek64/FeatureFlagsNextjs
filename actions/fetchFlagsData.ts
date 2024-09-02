export async function fetchConfig() {
  const configsResponseJson = await (
    await fetch(
      "https://api.github.com/repos/sainsburys-tech/argos-checkout-ui-consul-configs/contents/configs/ui-payment/dev/dev.json",
      {
        headers: {
          Accept: "application/vnd.github.v3.raw", // returns raw json file not encoded
          Authorization: `token ${process.env.GITHUB_PACKAGES_AUTH_TOKEN}`,
        },
      }
    )
  ).json();
  const { features } = configsResponseJson;

  return features;
}
