import { STARGAZE } from "../constants/";

const {server, contract} = STARGAZE

export const getCNSAsync = async (address) => {
  const res = await fetch(
    `${server}/cosmwasm/wasm/v1/contract/${contract}/smart/${btoa(
      JSON.stringify({
        name: { address: address },
      })
    )}`
  ).then((r) => r.json());
  return res?.data ? `${res.data}.unicorn` : null;
};
