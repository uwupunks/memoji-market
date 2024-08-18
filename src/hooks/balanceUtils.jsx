import {ENDPOINTS} from '../constants'

const fetchBalancesAsync = async (address, signal) => {
  if (!address || !signal) {
    return null;
  }

  const res = await fetch(`${ENDPOINTS.balances}/${address}`, signal);
  const data = await res.json();
  return data.balances
};

const findBalance = (balances, denom) => {
  if (!balances || !denom) {
    return null;
  }

  const balance = balances.find((b) => b.denom === denom);
  return balance ? parseFloat(balance.amount) / 1000000 : 0;
};

export { fetchBalancesAsync, findBalance };
