import React, { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import { rest, bank, wasm, factory, emoji, router } from "./Consts";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { fromBase64, fromHex } from "@cosmjs/encoding";
import { ChainProvider, useChain } from "@cosmos-kit/react";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { Mutex, Semaphore } from "async-mutex";
import { decode } from "punycode";

const sem = new Semaphore(100);

export async function getSupply() {
  return Axios.get(rest + bank + "supply").then((res) => {
    var s = res.data.supply;
    // console.log(s);
    var m = new Map();
    s.forEach((si) => m.set(si.denom, parseInt(si.amount)));
    // console.log(m);
    return m;
  });
}

// export interface Wallet {
//   address;
//   amounts: Map<string, number>;
// }

// export interface Tracker {
//   addr,
//   amt,
//   label,
// }

export async function getNumSearchResults(denom) {
  return Axios.get(
    `https://rpc.unicorn.meme/tx_search?query=%22transfer.amount%20CONTAINS%20%27${denom}%27%22&order_by=%22asc%22&per_page=100`
  ).then((res) => parseInt(res.data.total_count));
}

export async function getSearchResults(denom, page) {
  const q = `https://rpc.unicorn.meme/tx_search?query=%22transfer.amount%20CONTAINS%20%27${denom}%27%22&order_by=%22asc%22&page=${
    page + 1
  }&per_page=100`;
  return Axios.get(q).then((res) => {
    const bodies = res.data.txs.map((t) => decodeTxRaw(fromBase64(t.tx)).body);
    return bodies
      .map((t) => {
        return t.messages
          .map((m) => {
            switch (m.typeUrl) {
              case "/cosmos.bank.v1beta1.MsgSend":
                const send = MsgSend.decode(m.value);
                return new Set([send.toAddress, send.fromAddress]);
              case "/cosmwasm.wasm.v1.MsgExecuteContract":
                const exec = MsgExecuteContract.decode(m.value);
                return new Set([exec.sender]);
              default:
                console.log(m.typeUrl);
                console.log(m);
                return new Set();
            }
          })
          .reduce((a, b) => a.union(b), new Set());
      })
      .reduce((a, b) => a.union(b), new Set());
  });
}

export async function getNumTXs() {
  const denom =
    "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell";
  return Axios.get(
    `https://rpc.unicorn.meme/tx_search?query=%22transfer.amount%20CONTAINS%20%27${denom}%27%22&order_by=%22asc%22&per_page=100`
  ).then((res) => parseInt(res.data.total_count));
}

export async function getTXs(page) {
  const denom =
    "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell";
  const q = `https://rpc.unicorn.meme/tx_search?query=%22transfer.amount%20CONTAINS%20%27${denom}%27%22&order_by=%22asc%22&page=${
    page + 1
  }&per_page=100`;

  return Axios.get(q).then((res) => {
    const bodies = res.data.txs.map((t) => decodeTxRaw(fromBase64(t.tx)).body);
    const transfers = bodies.filter(
      (b) =>
        b.memo != "" &&
        b.messages.length == 1 &&
        b.messages[0].typeUrl == "/cosmos.bank.v1beta1.MsgSend"
    );
    return transfers.map((t) => {
      const send = MsgSend.decode(t.messages[0].value);
      return {
        addr: send.toAddress,
        amt: send.amount[0].amount, //should constrain this to only one coin denom
        label: t.memo,
      };
    });
  });
}

export async function getBalance(addr) {
  return sem.runExclusive(() =>
    Axios.get(rest + bank + "balances/" + addr).then((res) => {
      var bs = res.data.balances;
      var m = new Map();
      bs.forEach((b) => {
        m.set(b.denom, parseInt(b.amount));
      });
      return [addr, { address: addr, amounts: m }];
    })
  );
}

export async function getName(addr) {
  return Axios.get(
    `https://rest.stargaze-apis.com/cosmwasm/wasm/v1/contract/stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr/smart/${btoa(
      JSON.stringify({
        name: { address: addr },
      })
    )}`
  ).then((res) => {
    return [addr, res.data.data];
  });
}

export async function getSim(buy, denom, amount) {
  return Axios.get(
    `${rest}${wasm}${router}/smart/${btoa(
      JSON.stringify({
        simulate_swap_operations: {
          offer_amount: (amount * 1000000).toFixed(0),
          operations: [
            {
              astro_swap: {
                offer_asset_info: {
                  native_token: {
                    denom: buy ? "uwunicorn" : denom,
                  },
                },
                ask_asset_info: {
                  native_token: {
                    denom: buy ? denom : "uwunicorn",
                  },
                },
              },
            },
          ],
        },
      })
    )}`
  ).then((res) => {
    return parseFloat(res.data.data.amount) / 1000000;
  });
}

export async function getPair(denom) {
  return Axios.get(
    `${rest}${wasm}${factory}/smart/${btoa(
      JSON.stringify({
        pair: {
          asset_infos: [
            { native_token: { denom: denom } },
            { native_token: { denom: "uwunicorn" } },
          ],
        },
      })
    )}`
  ).then((res) => {
    var ca = res.data.data.contract_addr;
    return [denom, ca];
  });
}

export async function getUwUPrice() {
  return Axios.get(
    "https://api.rugcheck.xyz/v1/tokens/UwU8RVXB69Y6Dcju6cN2Qef6fykkq6UUNpB15rZku6Z/report"
  ).then((res) => res.data.markets[0].lp.quotePrice);
}

export function disDenom(denom, emoji) {
  return emoji.get(denom) ?? denom.substring(denom.lastIndexOf("/") + 1);
}

export function calcPrice(denom, balances, pools) {
  if (denom == "uwunicorn") {
    return 1;
  } else {
    var pb = balances.get(pools.get(denom))?.amounts.get(denom) ?? 0;
    var pbu = balances.get(pools.get(denom))?.amounts.get("uwunicorn") ?? 0;
    return pbu / pb;
  }
}

export function toHumanString(sn) {
  var PREFIXES = new Map([
    ["24", "Sp"],
    ["21", "Sx"],
    ["18", "Qn"],
    ["15", "Qd"],
    ["12", "T"],
    ["9", "B"],
    ["6", "M"],
    ["3", "k"],
    ["0", ""],
    ["-3", "m"],
    ["-6", "µ"],
    ["-9", "n"],
    ["-12", "p"],
    ["-15", "f"],
    ["-18", "a"],
    ["-21", "z"],
    ["-24", "y"],
  ]);
  function getExponent(n) {
    if (n === 0) {
      return 0;
    }
    return Math.floor(Math.log10(Math.abs(n)));
  }
  function precise(n) {
    return Number.parseFloat(n.toPrecision(3));
  }
  var n = precise(Number.parseFloat(sn));
  var e = Math.max(Math.min(3 * Math.floor(getExponent(n) / 3), 24), -24);
  return precise(n / Math.pow(10, e)).toString() + PREFIXES.get(e.toString());
}
