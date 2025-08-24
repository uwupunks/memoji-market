export const CHAIN_ID = "osmo-test-5";
export const RPC = "https://rpc.osmotest5.osmosis.zone";
export const SERVER = "https://lcd.testnet.osmosis.zone";
export const EXPLORER_PATH = "https://www.mintscan.io/osmosis-testnet";
export const FACTORY_DEPLOYER = "osmo1f6zussydevqw8quygf0llyhsfq9sla5wcgjntq";
export const ADDRESS_LENGTH = 43;
export const CONTRACTS = {
  creator: FACTORY_DEPLOYER,
};

export const ENDPOINTS = {
  denoms: `${SERVER}/osmosis/tokenfactory/v1beta1/denoms_from_creator/${CONTRACTS.creator}`,
  supplyByDenom: `${SERVER}/cosmos/bank/v1beta1/supply/by_denom?denom=`,
  balances: `${SERVER}/cosmos/bank/v1beta1/balances`,
};

export const STARGAZE = {
  server: "https://rest.stargaze-apis.com",
  contract: "stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr",
};

// Pool IDs can be found by querying the Osmosis LCD API:
// https://lcd.osmosis.zone/osmosis/gamm/v1beta1/pools?pagination.offset=0&pagination.limit=999999999'

export const DENOMS = [
  {
    denom: `factory/${FACTORY_DEPLOYER}/ualien`,
    name: "ualien",
    maxSupply: "510000000000",
    emoji: "👽",
    listed: true,
    poolId: "1175"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubear`,
    name: "ubear",
    maxSupply: "400000000000000",
    emoji: "🐻",
    listed: true,
    poolId: "1176"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubearhearth`,
    name: "ubearhearth",
    maxSupply: "100000000000",
    emoji: "🐻❤️",
    listed: true,
    poolId: "1177"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubitjaks`,
    name: "ubitjaks",
    maxSupply: "1000000000000000",
    emoji: "🏳️‍⚧️",
    listed: true,
    poolId: "1171"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublackflag`,
    name: "ublackflag",
    maxSupply: "69000000000000000",
    emoji: "🏴",
    listed: true,
    poolId: "1178"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublissful`,
    name: "ublissful",
    maxSupply: "60000000000000",
    emoji: "(｡◕‿‿◕｡)",
    listed: true,
    poolId: "1179"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublowfish`,
    name: "ublowfish",
    maxSupply: "210000000000000",
    emoji: "🐡",
    listed: true,
    poolId: "1180"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubrainlet`,
    name: "ubrainlet",
    maxSupply: "55085999999982604000",
    emoji: "🧠🤏",
    listed: true,
    poolId: "1181"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubugjuice`,
    name: "ubugjuice",
    maxSupply: "8525352329742000",
    emoji: "🪲🧃",
    listed: true,
    poolId: "1182"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucash`,
    name: "ucash",
    maxSupply: "2330000000000000000",
    emoji: "💸",
    listed: true,
    poolId: "1183"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucat`,
    name: "ucat",
    maxSupply: "390000000000000000",
    emoji: "🐱",
    listed: true,
    poolId: "1184"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchains`,
    name: "uchains",
    maxSupply: "100000000000000",
    emoji: "🙍⛓️",
    listed: true,
    poolId: "1185"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchick`,
    name: "uchick",
    maxSupply: "10000000000000",
    emoji: "🐤",
    listed: true,
    poolId: "1186"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchina`,
    name: "uchina",
    maxSupply: "1412000000000000",
    emoji: "🇨🇳",
    listed: true,
    poolId: "1187"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchurchcrown`,
    name: "uchurchcrown",
    maxSupply: "2002000000",
    emoji: "👑",
    listed: true,
    poolId: "1234"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uclown`,
    name: "uclown",
    maxSupply: "420000000000000",
    emoji: "🤡",
    listed: true,
    poolId: "1188"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucoconutdoggy`,
    name: "ucoconutdoggy",
    maxSupply: "316040021801000000",
    emoji: "🥥🐶",
    listed: true,
    poolId: "1238"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucorn`,
    name: "ucorn",
    maxSupply: "21000000000000",
    emoji: "🌽",
    listed: true,
    poolId: "1189"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucrown`,
    name: "ucrown",
    maxSupply: "1000000",
    emoji: "👑",
    listed: true,
    poolId: "1174"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucrystalball`,
    name: "ucrystalball",
    maxSupply: "100000000000000000",
    emoji: "🔮",
    listed: true,
    poolId: "1190"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udiamond`,
    name: "udiamond",
    maxSupply: "1000000000",
    emoji: "💎",
    listed: true,
    poolId: "1191"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udice`,
    name: "udice",
    maxSupply: "7777777777777",
    emoji: "🎲",
    listed: true,
    poolId: "1192"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udog`,
    name: "udog",
    maxSupply: "1000000000000000",
    emoji: "🐶",
    listed: true,
    poolId: "1193"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udogwifgun`,
    name: "udogwifgun",
    maxSupply: "77088999999499000",
    emoji: "🐶🔫",
    listed: true,
    poolId: "1194"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ueggplant`,
    name: "ueggplant",
    maxSupply: "1000000000000000",
    emoji: "🍆",
    listed: true,
    poolId: "1195"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ueightball`,
    name: "ueightball",
    maxSupply: "888888888888888",
    emoji: "🎱",
    listed: true,
    poolId: "1196"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uenvelop`,
    name: "uenvelop",
    maxSupply: "777777777777777",
    emoji: "✉️",
    listed: true,
    poolId: "1197"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufahrenheit`,
    name: "ufahrenheit",
    maxSupply: "451000000000000000",
    emoji: "🔥",
    listed: true,
    poolId: "1198"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufoose`,
    name: "ufoose",
    maxSupply: "1000000000000000",
    emoji: "🐸🙂",
    listed: true,
    poolId: "1170"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufrog`,
    name: "ufrog",
    maxSupply: "69000000000000000",
    emoji: "🐸",
    listed: true,
    poolId: "1199"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugirl`,
    name: "ugirl",
    maxSupply: "1000000000000000",
    emoji: "🎀",
    listed: true,
    poolId: "1200"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugobber`,
    name: "ugobber",
    maxSupply: "1000000000000000",
    emoji: "🍬",
    listed: true,
    poolId: "1167"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugun`,
    name: "ugun",
    maxSupply: "1337000000000000",
    emoji: "🔫♡",
    listed: true,
    poolId: "1201"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uhammer`,
    name: "uhammer",
    maxSupply: "168554000000",
    emoji: "🔨",
    listed: true,
    poolId: "1202"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uharambe`,
    name: "uharambe",
    maxSupply: "28052016000000",
    emoji: "🦍🍌",
    listed: true,
    poolId: "1203"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uheart`,
    name: "uheart",
    maxSupply: "1000000000000000",
    emoji: "❤️❤️❤️❤️❤️",
    listed: true,
    poolId: "1237"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uinternet`,
    name: "uinternet",
    maxSupply: "1000000000000000",
    emoji: "🛜",
    listed: true,
    poolId: "1164"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ujeet`,
    name: "ujeet",
    maxSupply: "650459156998150000",
    emoji: "🪯",
    listed: true,
    poolId: "1204"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ujewnicorn`,
    name: "ujewnicorn",
    maxSupply: "1000000000000000",
    emoji: "🇮🇱🐴",
    listed: true,
    poolId: "1168"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uknightcore`,
    name: "uknightcore",
    maxSupply: "1000000000000000",
    emoji: "⚔️",
    listed: true,
    poolId: "1169"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ulain`,
    name: "ulain",
    maxSupply: "69000000000000",
    emoji: "",
    listed: true,
    poolId: "1236"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ulawb`,
    name: "ulawb",
    maxSupply: "1000000000000000",
    emoji: "🦞",
    listed: true,
    poolId: "1173"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umeat`,
    name: "umeat",
    maxSupply: "100000000000000",
    emoji: "🥩",
    listed: true,
    poolId: "1205"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umog`,
    name: "umog",
    maxSupply: "420690000000000000000",
    emoji: "😹",
    listed: true,
    poolId: "1206"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umondo`,
    name: "umondo",
    maxSupply: "1000000000000000",
    emoji: "",
    listed: true,
    poolId: "1165"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umoon`,
    name: "umoon",
    maxSupply: "384400000000",
    emoji: "🌕",
    listed: true,
    poolId: "1207"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uorwell`,
    name: "uorwell",
    maxSupply: "1984000000000000",
    emoji: "🐷",
    listed: true,
    poolId: "1208"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uowo`,
    name: "uowo",
    maxSupply: "69000000000000000",
    emoji: "🦄",
    listed: true,
    poolId: "" // uowo is the base token, not assigned a specific pool
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upaper`,
    name: "upaper",
    maxSupply: "1000000000000",
    emoji: "📄",
    listed: true,
    poolId: "1209"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upeace`,
    name: "upeace",
    maxSupply: "1000000000000000",
    emoji: "☮️",
    listed: true,
    poolId: "1210"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upeach`,
    name: "upeach",
    maxSupply: "80085000000",
    emoji: "🍑",
    listed: true,
    poolId: "1211"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upi`,
    name: "upi",
    maxSupply: "314159265358979",
    emoji: "🥧",
    listed: true,
    poolId: "1212"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uplaceholder`,
    name: "uplaceholder",
    maxSupply: "100000000000000",
    emoji: "placeholder",
    listed: true,
    poolId: "1213"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upoo`,
    name: "upoo",
    maxSupply: "7000000000000000",
    emoji: "💩",
    listed: true,
    poolId: "1214"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upretzel`,
    name: "upretzel",
    maxSupply: "30000000000000",
    emoji: "🥨",
    listed: true,
    poolId: "1215"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurpdildo`,
    name: "upurpdildo",
    maxSupply: "1000000000",
    emoji: "🟣🍆",
    listed: true,
    poolId: "1235"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurplephat`,
    name: "upurplephat",
    maxSupply: "1000000000",
    emoji: "💜🎉",
    listed: true,
    poolId: "1162"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurplepill`,
    name: "upurplepill",
    maxSupply: "150000000000",
    emoji: "💜💊",
    listed: true,
    poolId: "1216"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uretard`,
    name: "uretard",
    maxSupply: "1000000000000000",
    emoji: "🫵🤡",
    listed: true,
    poolId: "1217"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/urock`,
    name: "urock",
    maxSupply: "1000000000000",
    emoji: "🪨",
    listed: true,
    poolId: "1218"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/urocket`,
    name: "urocket",
    maxSupply: "420000000000000000",
    emoji: "🚀",
    listed: true,
    poolId: "1219"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usa`,
    name: "usa",
    maxSupply: "333333333333333",
    emoji: "🇺🇸",
    listed: true,
    poolId: "1220"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uscisors`,
    name: "uscisors",
    maxSupply: "1000000000000",
    emoji: "✂️",
    listed: true,
    poolId: "1221"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ushot`,
    name: "ushot",
    maxSupply: "1000000000000000",
    emoji: "💉🧬",
    listed: true,
    poolId: "1222"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ushrimp`,
    name: "ushrimp",
    maxSupply: "210000000000000000",
    emoji: "🦐",
    listed: true,
    poolId: "1223"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uskull`,
    name: "uskull",
    maxSupply: "10000000000000",
    emoji: "💀",
    listed: true,
    poolId: "1224"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usparkle`,
    name: "usparkle",
    maxSupply: "1000000000000000",
    emoji: "✨",
    listed: true,
    poolId: "1225"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uspx`,
    name: "uspx",
    maxSupply: "69000000000000",
    emoji: "📈",
    listed: true,
    poolId: "1163"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usushi`,
    name: "usushi",
    maxSupply: "50000000000000",
    emoji: "🍣",
    listed: true,
    poolId: "1226"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usyrupcity`,
    name: "usyrupcity",
    maxSupply: "42069000000000",
    emoji: "🍇🥤",
    listed: true,
    poolId: "1166"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utaco`,
    name: "utaco",
    maxSupply: "300000000000000",
    emoji: "🌮",
    listed: true,
    poolId: "1227"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utaiwan`,
    name: "utaiwan",
    maxSupply: "23570000000000",
    emoji: "🇹🇼",
    listed: true,
    poolId: "1228"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utang`,
    name: "utang",
    maxSupply: "420000000000",
    emoji: "🍊",
    listed: true,
    poolId: "1229"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utest`,
    name: "utest",
    maxSupply: "1000000000000000",
    emoji: "test",
    listed: true,
    poolId: "1230"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uvril`,
    name: "uvril",
    maxSupply: "1000000000000000",
    emoji: "",
    listed: true,
    poolId: "1233"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uwatermelon`,
    name: "uwatermelon",
    maxSupply: "3000000000000000",
    emoji: "🍉",
    listed: true,
    poolId: "1231"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uwuxd`,
    name: "uwuxd",
    maxSupply: "1000000000000000",
    emoji: "😆",
    listed: true,
    poolId: "1232"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uzirconia`,
    name: "uzirconia",
    maxSupply: "1000000000",
    emoji: "◈",
    listed: true,
    poolId: "1172"
  }
];

const loadMemojiModules = async () => {
  const promises = DENOMS.map(async (m) => {
    let merged = null;
    try {
      merged = {
        ...m,
        image: (await import(`../assets/emoji/${m.name}.png`)).default,
      };
    } catch {
      console.warn(`Missing emoji image for ${m.name}, using unknown.png`);
      merged = {
        ...m,
        image: (await import(`../assets/emoji/unknown.png`)).default,
      };
    }
    return merged;
  });
  const results = await Promise.allSettled(promises);
  return results.map((r) => (r.status === "fulfilled" ? r.value : null));
};

export const MEMOJI = await loadMemojiModules();
console.log(
  `constants/index.ts: loaded ${MEMOJI.length} memojis`,
  "sample",
  MEMOJI?.[0]
);
