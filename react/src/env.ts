const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://207.148.79.183:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://207.148.79.183:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "core";

export const env = {
  apiURL,
  rpcURL,
  prefix,
};
