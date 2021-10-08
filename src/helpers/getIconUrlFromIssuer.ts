import StellarSdk, { StellarTomlResolver } from "stellar-sdk";
import { TESTNET_NETWORK_URL } from "constants/apiUrls";
import { CACHED_ASSET_ICONS_ID } from "constants/localStorageKeys";

/* 
This runs a slightly convoluted process to find an icon's url. 
It's not practical to manually find every possible icon png for every 
possible asset that exists/can exist and save a copy into this repo. 
Nor is it practical to manually create some sort of list of all icon url's and 
have to push releases to update it.

Ideally, this will be replaced by a backend server that does all 
this work for us in the near future.

Until then, the very first time a user loads a non native asset in the UI, 
we will check that asset's issuer public key account info to find their 
listed website. Using the website, we attempt to look at their stellar.toml 
file to see if it provides an icon url. 

So, on this very first time, this requires 3 roundtrips for an image: 
- first to Horizon to get issuer info, 
- second to the issuer toml file to get the icon url
- third to get the actual image data from the url

If any of that fails, we move on with no image and fallback to a generic bullet.

If we successfully do that, we save the resulting url in our localStorage cache.

So, any subsequent attempts to load the asset, it requires only 1 roundtrip 
for an image - just get the image from the url we already have saved for that 
asset and load it
*/
export const getIconUrlFromIssuer = async ({
  issuerKey,
  assetCode,
}: {
  issuerKey: string;
  assetCode: string;
}) => {
  let iconUrl = "";
  let response;

  /* First, check our localStorage cache in Background to see 
    if we've found this url before */

  const assetIconCache = JSON.parse(
    localStorage.getItem(CACHED_ASSET_ICONS_ID) || "{}",
  );

  iconUrl = assetIconCache[assetCode];
  if (iconUrl) {
    /* If we had the url stored in cache, simply return it. We're done. */
    return iconUrl;
  }

  try {
    /* Otherwise, 1. load their account from the API */
    const server = new StellarSdk.Server(TESTNET_NETWORK_URL);
    response = await server.loadAccount(issuerKey);
  } catch (e) {
    return iconUrl;
  }

  const { home_domain: homeDomain } = response;
  let toml;

  try {
    /* 2. Use their domain from their API account and use it attempt 
    to load their stellar.toml */
    toml = await StellarTomlResolver.resolve(homeDomain);
  } catch (e) {
    console.error(e);
    return iconUrl;
  }

  if (toml.CURRENCIES) {
    /* If we find some currencies listed, check to see if they have the 
    currency we're looking for listed */
    toml.CURRENCIES.every(
      ({ code: currencyCode, image }: { code: string; image: string }) => {
        if (currencyCode === assetCode && image) {
          /* We found the currency listing in the toml. 
          3. Get the image url from it */
          iconUrl = image;
          /* And also save into the cache to prevent having 
          to do this process again */
          assetIconCache[assetCode] = iconUrl;
          localStorage.setItem(
            CACHED_ASSET_ICONS_ID,
            JSON.stringify(assetIconCache),
          );

          return false;
        }
        return true;
      },
    );
  }
  /* Return the icon url to the UI, if we found it */
  return iconUrl;
};
