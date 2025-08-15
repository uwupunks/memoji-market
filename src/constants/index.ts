const SERVER = "https://lcd.testnet.osmosis.zone";

export const CONTRACTS = {
  creator: "osmo1d5gkvaryvmmumdgjpz90zn987yualaqgg7685z",
 // lp: "osmo1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty",
  // swap: "osmo16jzpxp0e8550c9aht6q9svcux30vtyyyyxv5w2l2djjra46580wsl825uf",
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

const memoji = [
  { name: "ualien", emoji: "👽", listed: true },
  { name: "ubear", emoji: "🐻", listed: true },
  { name: "ubearhearth", emoji: "🐻❤️", listed: true },
  { name: "ublackflag", emoji: "🏴", listed: false },
  { name: "ublissful", emoji: "(｡◕‿‿◕｡)", listed: true },
  { name: "ublowfish", emoji: "🐡", listed: false },
  { name: "ubugjuice", emoji: "🪲🧃", listed: true },
  { name: "ucash", emoji: "💸", listed: false },
  { name: "ucat", emoji: "🐱", listed: false },
  { name: "uchains", emoji: "🙍⛓️", listed: true },
  { name: "uucoconutdoggy", emoji: "🥥🐕", listed: true },
  { name: "ucrown", emoji: "👑", listed: true },
  { name: "ujeet", emoji: "🪯", listed: true },
  { name: "ubrainlet", emoji: "🧠🤏", listed: true },
  { name: "uchick", emoji: "🐤", listed: false },
  { name: "uchina", emoji: "🇨🇳", listed: true },
  { name: "uclown", emoji: "🤡", listed: false },
  { name: "ucorn", emoji: "🌽", listed: true },
  { name: "ucrystalball", emoji: "🔮", listed: false },
  { name: "udiamond", emoji: "💎", listed: false },
  { name: "udice", emoji: "🎲", listed: true },
  { name: "udog", emoji: "🐶", listed: false },
  { name: "udogwifgun", emoji: "🐶🔫", listed: true },
  { name: "ueggplant", emoji: "🍆", listed: true },
  { name: "ueightball", emoji: "🎱", listed: false },
  { name: "uenvelop", emoji: "✉️", listed: false },
  { name: "ufahrenheit", emoji: "🔥", listed: true },
  { name: "ufrog", emoji: "🐸", listed: true },
  { name: "ugirl", emoji: "🎀", listed: true },
  { name: "ugun", emoji: "🔫♡", listed: true },
  { name: "uhammer", emoji: "🔨", listed: true },
  { name: "uharambe", emoji: "🦍🍌", listed: true },
  { name: "umeat", emoji: "🥩", listed: true },
  { name: "umoon", emoji: "🌕", listed: false },
  { name: "umog", emoji: "😹", listed: true },
  { name: "uorwell", emoji: "🐷", listed: false },
  { name: "upaper", emoji: "📄", listed: false },
  { name: "upeace", emoji: "☮️", listed: true },
  { name: "upeach", emoji: "🍑", listed: true },
  { name: "upi", emoji: "🥧", listed: true },
  { name: "uplaceholder", emoji: "placeholder", listed: true },
  { name: "upoo", emoji: "💩", listed: true },
  { name: "upretzel", emoji: "🥨", listed: true },
  { name: "upurplephat", emoji: "💜🎉", listed: true },
  { name: "upurplepill", emoji: "💜💊", listed: true },
  { name: "uretard", emoji: "🫵🤡", listed: true },
  { name: "urock", emoji: "🪨", listed: false },
  { name: "urocket", emoji: "🚀", listed: true },
  { name: "usa", emoji: "🇺🇸", listed: true },
  { name: "uscisors", emoji: "✂️", listed: false },
  { name: "ushot", emoji: "💉🧬", listed: true },
  { name: "ushrimp", emoji: "🦐", listed: false },
  { name: "uskull", emoji: "💀", listed: true },
  { name: "usparkle", emoji: "✨", listed: true },
  { name: "usushi", emoji: "🍣", listed: true },
  { name: "utaco", emoji: "🌮", listed: true },
  { name: "utaiwan", emoji: "🇹🇼", listed: true },
  { name: "utang", emoji: "🍊", listed: true },
  { name: "utest", emoji: "test", listed: true },
  { name: "uwatermelon", emoji: "🍉", listed: true },
  { name: "uwuxd", emoji: "😆", listed: true },
  { name: "uwunicorn", emoji: "🦄", listed: true },
];

const loadMemojiModules = async () => {
  const promises = memoji.map(async (m) => {
    let merged = null;
    try {
      merged = {
        ...m,
        image: (await import(`../assets/emoji/${m.name}.png`)).default,
      };
    } catch {
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
