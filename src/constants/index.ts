export const CHAIN_ID = "osmo-test-5";
export const RPC = "https://rpc.osmotest5.osmosis.zone";
export const SERVER = "https://lcd.testnet.osmosis.zone";
export const EXPLORER_PATH = "https://www.mintscan.io/osmosis-testnet";
export const FACTORY_DEPLOYER = "osmo1d5gkvaryvmmumdgjpz90zn987yualaqgg7685z";
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
    poolId: "1091"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubear`,
    name: "ubear",
    maxSupply: "400000000000000",
    emoji: "🐻",
    listed: true,
    poolId: "1092"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubearhearth`,
    name: "ubearhearth",
    maxSupply: "100000000000",
    emoji: "🐻❤️",
    listed: true,
    poolId: "1093"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubitjaks`,
    name: "ubitjaks",
    maxSupply: "1000000000000000",
    emoji: "🏳️‍⚧️",
    listed: true,
    poolId: "1087"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublackflag`,
    name: "ublackflag",
    maxSupply: "69000000000000000",
    emoji: "🏴",
    listed: true,
    poolId: "1094"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublissful`,
    name: "ublissful",
    maxSupply: "60000000000000",
    emoji: "(｡◕‿‿◕｡)",
    listed: true,
    poolId: "1095"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ublowfish`,
    name: "ublowfish",
    maxSupply: "210000000000000",
    emoji: "🐡",
    listed: true,
    poolId: "1096"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubrainlet`,
    name: "ubrainlet",
    maxSupply: "55085999999982604000",
    emoji: "🧠🤏",
    listed: true,
    poolId: "1097"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ubugjuice`,
    name: "ubugjuice",
    maxSupply: "8525352329742000",
    emoji: "🪲🧃",
    listed: true,
    poolId: "1098"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucash`,
    name: "ucash",
    maxSupply: "2330000000000000000",
    emoji: "💸",
    listed: true,
    poolId: "1099"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucat`,
    name: "ucat",
    maxSupply: "390000000000000000",
    emoji: "🐱",
    listed: true,
    poolId: "1100"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchains`,
    name: "uchains",
    maxSupply: "100000000000000",
    emoji: "🙍⛓️",
    listed: true,
    poolId: "1101"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchick`,
    name: "uchick",
    maxSupply: "10000000000000",
    emoji: "🐤",
    listed: true,
    poolId: "1102"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchina`,
    name: "uchina",
    maxSupply: "1412000000000000",
    emoji: "🇨🇳",
    listed: true,
    poolId: "1103"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uchurchcrown`,
    name: "uchurchcrown",
    maxSupply: "2002000000",
    emoji: "👑",
    listed: true,
    poolId: "1150"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uclown`,
    name: "uclown",
    maxSupply: "420000000000000",
    emoji: "🤡",
    listed: true,
    poolId: "1104"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucoconutdoggy`,
    name: "ucoconutdoggy",
    maxSupply: "316040021801000000",
    emoji: "🥥🐶",
    listed: true,
    poolId: "1154"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucorn`,
    name: "ucorn",
    maxSupply: "21000000000000",
    emoji: "🌽",
    listed: true,
    poolId: "1105"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucrown`,
    name: "ucrown",
    maxSupply: "1000000",
    emoji: "👑",
    listed: true,
    poolId: "1090"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ucrystalball`,
    name: "ucrystalball",
    maxSupply: "100000000000000000",
    emoji: "🔮",
    listed: true,
    poolId: "1106"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udiamond`,
    name: "udiamond",
    maxSupply: "1000000000",
    emoji: "💎",
    listed: true,
    poolId: "1107"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udice`,
    name: "udice",
    maxSupply: "7777777777777",
    emoji: "🎲",
    listed: true,
    poolId: "1108"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udog`,
    name: "udog",
    maxSupply: "1000000000000000",
    emoji: "🐶",
    listed: true,
    poolId: "1109"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/udogwifgun`,
    name: "udogwifgun",
    maxSupply: "77088999999499000",
    emoji: "🐶🔫",
    listed: true,
    poolId: "1110"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ueggplant`,
    name: "ueggplant",
    maxSupply: "1000000000000000",
    emoji: "🍆",
    listed: true,
    poolId: "1111"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ueightball`,
    name: "ueightball",
    maxSupply: "888888888888888",
    emoji: "🎱",
    listed: true,
    poolId: "1112"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uenvelop`,
    name: "uenvelop",
    maxSupply: "777777777777777",
    emoji: "✉️",
    listed: true,
    poolId: "1113"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufahrenheit`,
    name: "ufahrenheit",
    maxSupply: "451000000000000000",
    emoji: "🔥",
    listed: true,
    poolId: "1114"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufoose`,
    name: "ufoose",
    maxSupply: "1000000000000000",
    emoji: "🐸🙂",
    listed: true,
    poolId: "1086"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ufrog`,
    name: "ufrog",
    maxSupply: "69000000000000000",
    emoji: "🐸",
    listed: true,
    poolId: "1115"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugirl`,
    name: "ugirl",
    maxSupply: "1000000000000000",
    emoji: "🎀",
    listed: true,
    poolId: "1116"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugobber`,
    name: "ugobber",
    maxSupply: "1000000000000000",
    emoji: "🍬",
    listed: true,
    poolId: "1083"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ugun`,
    name: "ugun",
    maxSupply: "1337000000000000",
    emoji: "🔫♡",
    listed: true,
    poolId: "1117"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uhammer`,
    name: "uhammer",
    maxSupply: "168554000000",
    emoji: "🔨",
    listed: true,
    poolId: "1118"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uharambe`,
    name: "uharambe",
    maxSupply: "28052016000000",
    emoji: "🦍🍌",
    listed: true,
    poolId: "1119"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uheart`,
    name: "uheart",
    maxSupply: "1000000000000000",
    emoji: "❤️❤️❤️❤️❤️",
    listed: true,
    poolId: "1153"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uinternet`,
    name: "uinternet",
    maxSupply: "1000000000000000",
    emoji: "🛜",
    listed: true,
    poolId: "1080"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ujeet`,
    name: "ujeet",
    maxSupply: "650459156998150000",
    emoji: "🪯",
    listed: true,
    poolId: "1120"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ujewnicorn`,
    name: "ujewnicorn",
    maxSupply: "1000000000000000",
    emoji: "🇮🇱🐴",
    listed: true,
    poolId: "1084"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uknightcore`,
    name: "uknightcore",
    maxSupply: "1000000000000000",
    emoji: "⚔️",
    listed: true,
    poolId: "1085"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ulain`,
    name: "ulain",
    maxSupply: "69000000000000",
    emoji: "",
    listed: true,
    poolId: "1152"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ulawb`,
    name: "ulawb",
    maxSupply: "1000000000000000",
    emoji: "🦞",
    listed: true,
    poolId: "1089"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umeat`,
    name: "umeat",
    maxSupply: "100000000000000",
    emoji: "🥩",
    listed: true,
    poolId: "1121"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umog`,
    name: "umog",
    maxSupply: "420690000000000000000",
    emoji: "😹",
    listed: true,
    poolId: "1122"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umondo`,
    name: "umondo",
    maxSupply: "1000000000000000",
    emoji: "",
    listed: true,
    poolId: "1081"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/umoon`,
    name: "umoon",
    maxSupply: "384400000000",
    emoji: "🌕",
    listed: true,
    poolId: "1123"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uorwell`,
    name: "uorwell",
    maxSupply: "1984000000000000",
    emoji: "🐷",
    listed: true,
    poolId: "1124"
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
    poolId: "1125"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upeace`,
    name: "upeace",
    maxSupply: "1000000000000000",
    emoji: "☮️",
    listed: true,
    poolId: "1126"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upeach`,
    name: "upeach",
    maxSupply: "80085000000",
    emoji: "🍑",
    listed: true,
    poolId: "1127"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upi`,
    name: "upi",
    maxSupply: "314159265358979",
    emoji: "🥧",
    listed: true,
    poolId: "1128"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uplaceholder`,
    name: "uplaceholder",
    maxSupply: "100000000000000",
    emoji: "placeholder",
    listed: true,
    poolId: "1129"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upoo`,
    name: "upoo",
    maxSupply: "7000000000000000",
    emoji: "💩",
    listed: true,
    poolId: "1130"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upretzel`,
    name: "upretzel",
    maxSupply: "30000000000000",
    emoji: "🥨",
    listed: true,
    poolId: "1131"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurpdildo`,
    name: "upurpdildo",
    maxSupply: "1000000000",
    emoji: "🟣🍆",
    listed: true,
    poolId: "1151"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurplephat`,
    name: "upurplephat",
    maxSupply: "1000000000",
    emoji: "💜🎉",
    listed: true,
    poolId: "1078"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/upurplepill`,
    name: "upurplepill",
    maxSupply: "150000000000",
    emoji: "💜💊",
    listed: true,
    poolId: "1132"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uretard`,
    name: "uretard",
    maxSupply: "1000000000000000",
    emoji: "🫵🤡",
    listed: true,
    poolId: "1133"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/urock`,
    name: "urock",
    maxSupply: "1000000000000",
    emoji: "🪨",
    listed: true,
    poolId: "1134"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/urocket`,
    name: "urocket",
    maxSupply: "420000000000000000",
    emoji: "🚀",
    listed: true,
    poolId: "1135"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usa`,
    name: "usa",
    maxSupply: "333333333333333",
    emoji: "🇺🇸",
    listed: true,
    poolId: "1136"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uscisors`,
    name: "uscisors",
    maxSupply: "1000000000000",
    emoji: "✂️",
    listed: true,
    poolId: "1137"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ushot`,
    name: "ushot",
    maxSupply: "1000000000000000",
    emoji: "💉🧬",
    listed: true,
    poolId: "1138"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/ushrimp`,
    name: "ushrimp",
    maxSupply: "210000000000000000",
    emoji: "🦐",
    listed: true,
    poolId: "1139"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uskull`,
    name: "uskull",
    maxSupply: "10000000000000",
    emoji: "💀",
    listed: true,
    poolId: "1140"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usparkle`,
    name: "usparkle",
    maxSupply: "1000000000000000",
    emoji: "✨",
    listed: true,
    poolId: "1141"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uspx`,
    name: "uspx",
    maxSupply: "69000000000000",
    emoji: "📈",
    listed: true,
    poolId: "1079"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usushi`,
    name: "usushi",
    maxSupply: "50000000000000",
    emoji: "🍣",
    listed: true,
    poolId: "1142"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/usyrupcity`,
    name: "usyrupcity",
    maxSupply: "42069000000000",
    emoji: "🍇🥤",
    listed: true,
    poolId: "1082"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utaco`,
    name: "utaco",
    maxSupply: "300000000000000",
    emoji: "🌮",
    listed: true,
    poolId: "1143"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utaiwan`,
    name: "utaiwan",
    maxSupply: "23570000000000",
    emoji: "🇹🇼",
    listed: true,
    poolId: "1144"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utang`,
    name: "utang",
    maxSupply: "420000000000",
    emoji: "🍊",
    listed: true,
    poolId: "1145"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/utest`,
    name: "utest",
    maxSupply: "1000000000000000",
    emoji: "test",
    listed: true,
    poolId: "1146"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uvril`,
    name: "uvril",
    maxSupply: "1000000000000000",
    emoji: "",
    listed: true,
    poolId: "1149"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uwatermelon`,
    name: "uwatermelon",
    maxSupply: "3000000000000000",
    emoji: "🍉",
    listed: true,
    poolId: "1147"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uwuxd`,
    name: "uwuxd",
    maxSupply: "1000000000000000",
    emoji: "😆",
    listed: true,
    poolId: "1148"
  },
  {
    denom: `factory/${FACTORY_DEPLOYER}/uzirconia`,
    name: "uzirconia",
    maxSupply: "1000000000",
    emoji: "◈",
    listed: true,
    poolId: "1088"
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
