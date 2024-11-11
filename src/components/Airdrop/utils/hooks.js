import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getBalance,
  getName,
  getNumSearchResults,
  getNumTXs,
  getPair,
  getSearchResults,
  getSupply,
  getTXs,
  getUwUPrice,
} from "./utils";

export function useSupply() {
  const q = useQuery({
    queryKey: ["Supply"],
    queryFn: () => getSupply(),
  });
  return q.isSuccess ? q.data : new Map();
}

export function useUwUPrice() {
  const q = useQuery({
    queryKey: ["UwUPrice"],
    queryFn: () => getUwUPrice(),
  });
  return q.isSuccess ? q.data : 0;
}

export function useNames(addrs) {
  const q = useQueries({
    queries: addrs.map((a) => {
      return {
        queryKey: [`Name ${a}`],
        queryFn: () => getName(a),
      };
    }),
  });
  return new Map(q.filter((x) => x.isSuccess).map((x) => x.data));
}

export function useBalances(addrs) {
  const q = useQueries({
    queries: addrs.map((a) => {
      return {
        queryKey: [`Balance ${a}`],
        queryFn: () => getBalance(a),
      };
    }),
  });
  return new Map(q.filter((x) => x.isSuccess).map((x) => x.data));
}

export function usePairs(denoms) {
  const q = useQueries({
    queries: denoms.map((denom) => {
      return {
        queryKey: [`Pair ${denom}`],
        queryFn: () => getPair(denom),
      };
    }),
  });
  return new Map(q.filter((x) => x.isSuccess).map((x) => x.data));
}

export function useNumSearchResults(denom) {
  const q = useQuery({
    queryKey: [`Search ${denom}`],
    queryFn: () => getNumSearchResults(denom),
  });
  return q.isSuccess ? q.data : 0;
}

export function useSearchResults(denom, numSearchResults) {
  const q = useQueries({
    queries: [...Array(Math.ceil(numSearchResults / 100) + 1).keys()].map(
      (k) => {
        return {
          queryKey: [`Search ${denom} ${k * 100} -> ${(k + 1) * 100}`],
          queryFn: () => getSearchResults(denom, k),
        };
      }
    ),
  });
  return q
    .filter((x) => x.isSuccess)
    .map((x) => x.data)
    .reduce((a, b) => a.union(b), new Set());
}

export function useNumTXs() {
  const q = useQuery({
    queryKey: ["NumTXs"],
    queryFn: () => getNumTXs(),
  });
  return q.isSuccess ? q.data : 0;
}

export function useTXs(numTXs) {
  const q = useQueries({
    queries: [...Array(Math.ceil(numTXs / 100) + 1).keys()].map((k) => {
      return {
        queryKey: [`TXs ${k * 100} -> ${(k + 1) * 100}`],
        queryFn: () => getTXs(k),
      };
    }),
  });
  return q
    .filter((x) => x.isSuccess)
    .map((x) => x.data)
    .reduce((a, b) => a.concat(b), [])
    .reduce((a, b) => {
      const cur = a.get(b.addr);
      return a.set(b.addr, cur == undefined || cur.amt < b.amt ? b : cur);
    }, new Map());
}
