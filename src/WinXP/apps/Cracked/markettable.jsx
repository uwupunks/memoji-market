import React, { useEffect } from 'react';

const MarketTable = ({ setHeaderRow, setOtherRows }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplyResponse = await fetch('https://rest.unicorn.meme/cosmos/bank/v1beta1/supply?pagination.limit=100');
        const supplyData = await supplyResponse.json();

        console.log('Supply Data: ', supplyData);

        const emoji = {
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear": "ʕ·͡ᴥ·ʔ",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth": "ʕっ•ᴥ•ʔっ❤️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag": "🏴",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful": "(｡◕‿‿◕｡)",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish": "🐡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash": "💸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat": "🐱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick": "🐤",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina": "🇨🇳",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown": "🤡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn": "🌽",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball": "🔮",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond": "💎",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice": "🎲",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog": "🐶",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball": "🎱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop": "✉️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit": "🔥",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun": "▄︻デ══‐一♡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat": "🥩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon": "🌕",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell": "🐷",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper": "📄",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach": "🍑",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi": "🥧",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder": "placeholder",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo": "💩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel": "🥨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock": "🪨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket": "🚀",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa": "🇺🇸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors": "✂️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushrimp": "🦐",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uskull": "💀",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usushi": "🍣",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaco": "🌮",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaiwan": "🇹🇼",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utest": "test",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uwatermelon": "🍉",
          "uwunicorn": "🦄"
        };

        const rest = "https://rest.unicorn.meme";
        const wasm = "/cosmwasm/wasm/v1/contract/";
        const factory = "unicorn1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjslkfelc";
        const devliq = "unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty";

        const getBalance = async (address, denom) => {
          const res = await fetch(`${rest}/cosmos/bank/v1beta1/balances/${address}`);
          const data = await res.json();
          const balance = data.balances.find(b => b.denom === denom);
          return balance ? parseFloat(balance.amount) / 1000000 : 0;
        };

        const getPair = async (denom) => {
          const res = await fetch(`${rest}${wasm}${factory}/smart/${btoa(JSON.stringify({
            "pair": {
              "asset_infos": [
                { "native_token": { "denom": denom } },
                { "native_token": { "denom": "uwunicorn" } }
              ]
            }
          }))}`);
          const data = await res.json();
          return data.data.contract_addr;
        };

        const getPrice = async (denom) => {
          const pair = await getPair(denom);
          const ubal = await getBalance(pair, "uwunicorn");
          const dbal = await getBalance(pair, denom);
          return ubal / dbal;
        };

        const getTVL = async (denom) => {
          const pair = await getPair(denom);
          const balance = await getBalance(pair, "uwunicorn");
          return balance;
        };

        const getInfo = async (sup) => {
          const d = sup.denom;
          const s = parseFloat(sup.amount) / 1000000;
          const b = await getBalance(devliq, d);
          const circ = s - b;

          if (d === "uwunicorn") {
            return {
              denom: "uwunicorn",
              emoji: emoji["uwunicorn"],
              supply: s,
              circ,
              mcap: s,
              fdv: s,
              tvl: 0,
              liq: 0,
              price: 1,
              balance: b,
              share: b / circ,
              value: b
            };
          } else {
            const price = await getPrice(d);
            const tvl = await getTVL(d);
            const info = {
              denom: d,
              emoji: emoji[d],
              supply: s,
              circ,
              mcap: price * circ,
              fdv: price * s,
              tvl,
              liq: tvl / (price * circ),
              price,
              balance: b,
              share: b / circ,
              value: b * price
            };
            console.log(`Info for ${d}:`, info);
            return info;
          }
        };

        const infos = await Promise.all(supplyData.supply.map(getInfo));
        const headerRow = ["Emoji", "Denom", "Supply", "Circ", "MCap", "FDV", "TVL", "Liq", "Price", "Balance", "Share", "Value"];
        setHeaderRow(headerRow);

        const otherRows = infos.map(info => [
          info.emoji, info.denom, info.supply, info.circ, info.mcap, info.fdv, info.tvl, info.liq, info.price, info.balance, info.share, info.value
        ]);

        setOtherRows(otherRows);
      } catch (error) {
        console.error('Error fetching market data: ', error);
      }
    };

    fetchData();
  }, [setHeaderRow, setOtherRows]);

  return null;
};

export default MarketTable;
