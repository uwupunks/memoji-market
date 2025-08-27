import { ENDPOINTS, SERVER } from "../constants";
import axios from "axios";

export const fetchAllPools = async () => {
  try {
    const response = await axios.get(
      `${SERVER}/osmosis/gamm/v1beta1/pools?pagination.offset=0&pagination.limit=999999999`
    );
    return response.data.pools;
  } catch (err) {
    console.error("Failed to fetch all pools:", err);
    return [];
  }
};


export const fetchPoolPrice = async (allPools, poolId) => {
  try {
    if (!poolId) {
      console.warn(`No pool ID found for poolId=${poolId}`);
      return 0;
    }

    const pool = allPools.find((p) => p.id === poolId);
    if (!pool) {
      console.warn(`Pool data not found for poolId=${poolId}`);
      return null;
    }
    // Extract token reserves
    const uwuAmount = pool.pool_assets.find(a=>a.token.denom.endsWith("owo"))?.token.amount
    const otherAmount = pool.pool_assets.find(a=>!a.token.denom.endsWith("owo"))?.token.amount

    // Calculate spot price
    const spotPrice = parseFloat(uwuAmount) / parseFloat(otherAmount);
    return {price: spotPrice, liq: spotPrice * (parseFloat(otherAmount) / 1000000)};
  } catch (err) {
    console.error("Failed to fetch pool price:", err);
    return 0;
  }
};

const fetchBalancesAsync = async (address, signal) => {
  if (!address || !signal) {
    return null;
  }

  const res = await fetch(`${ENDPOINTS.balances}/${address}?pagination.offset=0&pagination.limit=999999999`, signal);
  const data = await res.json();
  return data.balances;
};

const findBalance = (balances, denom) => {
  if (!balances || !denom) {
    return null;
  }

  const balance = balances.find((b) => b.denom === denom);
  return balance ? Number(balance.amount) / 1000000 : 0;
};

export { fetchBalancesAsync, findBalance };
