import { assets, chains } from "chain-registry";

export const chainId = "unicorn-420";
export const rest = "https://rest.unicorn.meme/";
export const rpc = "https://rpc.unicorn.meme";
export const bank = "cosmos/bank/v1beta1/";
export const wasm = "cosmwasm/wasm/v1/contract/";
export const factory = "unicorn1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjslkfelc";
export const router = "unicorn16jzpxp0e8550c9aht6q9svcux30vtyyyyxv5w2l2djjra46580wsl825uf";

export const emoji = new Map([
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ualien", "👽"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear", "ʕ·͡ᴥ·ʔ"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth", "ʕっ•ᴥ•ʔっ❤️"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag", "🏴"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful", "(｡◕‿‿◕｡)"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish", "🐡"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubrainlet", "🧠🤏"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubugjuice", "🪲🧃"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash", "💸"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat", "🐱"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchains", "🙂⛓️"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick", "🐤"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina", "🇨🇳"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown", "🤡"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn", "🌽"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball", "🔮"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond", "💎"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice", "🎲"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog", "🐶"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udogwifgun", "🐶🔫"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueggplant", "🍆"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball", "🎱"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop", "✉️"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit", "🔥"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufrog", "🐸"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun", "▄︻デ══‐一♡"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ujeet", "जीत"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat", "🥩"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umog", "😹"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon", "🌕"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell", "🐷"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper", "📄"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeace","🌎☮️"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach", "🍑"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi", "🥧"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder", "placeholder"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo", "💩"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel", "🥨"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uretard", "🫵🤡"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock", "🪨"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket", "🚀"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa", "🇺🇸"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors", "✂️"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushot", "💉🧬"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushrimp", "🦐"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uskull", "💀"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usushi", "🍣"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaco", "🌮"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaiwan", "🇹🇼"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utang", "🍊"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utest", "test"],
  ["factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uwatermelon", "🍉"],
  ["uwunicorn", "🦄"]
]);


export const chains_ = Array.from(chains);
chains_.push({
    chain_name: "unicorn",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg"
      }
    ],
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg"
    },
    chain_id: "unicorn-420",
    bech32_prefix: "unicorn",
    pretty_name: "Unicorn",
    status: "live",
    network_type: "mainnet",
    slip44: 118,
    apis: {
      rpc: [{ address: "https://rpc.unicorn.meme", provider: "unicorn" }],
      rest: [{ address: "https://rest.unicorn.meme", provider: "unicorn" }]
    },
    explorers: [{
      kind : "ping.pub",
      url: "https://uwu.direct/Unicorn",
      tx_page: "https://uwu.direct/Unicorn/tx/${txHash}",
      account_page: "https://uwu.direct/Unicorn/account/${accountAddress}"
    }]
  });
  export const chains__ = Array.from(chains_);

  export const assets_ = Array.from(assets);
  assets_.push({
    chain_name: "unicorn",
    assets: Array.from(emoji.entries()).map(([d,e]) => {
      return {
        base: d,
        symbol: e,
        denom_units: [ {denom: d, exponent: 0},{denom:e, exponent:6}],
        display: e,
        name: e
      };
    })
  });
  export const assets__ = Array.from(assets_);



