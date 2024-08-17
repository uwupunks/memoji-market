import { useEffect } from "react";

const rest = "https://rest.unicorn.meme";
const wasm = "/cosmwasm/wasm/v1/contract/";
const factory =
  "unicorn1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjslkfelc";

const getBalance = async (address, denom) => {
  if (!address || !denom) {
    return null;
  }

  const res = await fetch(`${rest}/cosmos/bank/v1beta1/balances/${address}`);
  const data = await res.json();
  const balance = data.balances.find((b) => b.denom === denom);
  return balance ? parseFloat(balance.amount) / 1000000 : 0;
};

export { getBalance };
