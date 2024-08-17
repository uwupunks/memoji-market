import React, { useState, useEffect, useRef, useCallback } from "react";
import assetsWindow from "../../../assets/img/assets.png";
import connectButton from "../../../assets/img/connectwallet.png";
import exitButton from "../../../assets/img/exit.png";
import hoverButton from "../../../assets/img/hover.png";
import mascotButton from "../../../assets/img/mascot.png";
import pressedButton from "../../../assets/img/pressed.png";
import switchedHover from "../../../assets/img/switchwallethover.png";
import switchPressed from "../../../assets/img/switchwalletpressed.png";
import switchButton from "../../../assets/img/switchwallet.png";
import allButton from "../../../assets/img/all.png";
import hiddenButton from "../../../assets/img/hidden.png";
import classicButton from "../../../assets/img/classic.png";
import walletName from "../../../assets/img/walletname.png";
import userWindow from "../../../assets/img/window.png";
import invSlotsTop from "../../../assets/img/invslotstop.png";
import invSlotsBottom from "../../../assets/img/invslotsbottom.png";
import invText from "../../../assets/img/invtext.png";
import invSlots from "../../../assets/img/invslots.png";
import tradeSwap from "../../../assets/img/trade.png";
import tradeSwapHover from "../../../assets/img/tradehover.png";
import tradeSwapPressed from "../../../assets/img/tradepressed.png";
import switchSwap from "../../../assets/img/switch.png";
import switchSwapHover from "../../../assets/img/switchhover.png";
import switchSwapPressed from "../../../assets/img/switchpress.png";
import cancelSwap from "../../../assets/img/cancel.png";
import cancelSwapHover from "../../../assets/img/cancelhover.png";
import cancelSwapPressed from "../../../assets/img/cancelpressed.png";
import { useChain, useWallet } from "@cosmos-kit/react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import useSound from "use-sound";
import buyMp3 from "../../../assets/sounds/btbuy.mp3";
import overMp3 from "../../../assets/sounds/btmouseover.mp3";
import clickMp3 from "../../../assets/sounds/btclick.mp3";
import completeMp3 from "../../../assets/sounds/dlgnotice.mp3";
import VoxLoader from "./voxLoader.jsx";
import VoxLoaderTwo from "./voxLoaderTwo.jsx";
import ualienVox from "../../../assets/vox/sample.vox";
import ubearVox from "../../../assets/vox/sample.vox";
import ubearHearthVox from "../../../assets/vox/sample.vox";
import ublackflagVox from "../../../assets/vox/sample.vox";
import ublissfulVox from "../../../assets/vox/sample.vox";
import ublowfishVox from "../../../assets/vox/sample.vox";
import ucashVox from "../../../assets/vox/sample.vox";
import ucatVox from "../../../assets/vox/sample.vox";
import uchainsVox from "../../../assets/vox/sample.vox";
import uchickVox from "../../../assets/vox/sample.vox";
import uchinaVox from "../../../assets/vox/sample.vox";
import uclownVox from "../../../assets/vox/sample.vox";
import ucornVox from "../../../assets/vox/sample.vox";
import ucrystalballVox from "../../../assets/vox/sample.vox";
import udiamondVox from "../../../assets/vox/sample.vox";
import udiceVox from "../../../assets/vox/sample.vox";
import udogVox from "../../../assets/vox/sample.vox";
import ueggplantVox from "../../../assets/vox/sample.vox";
import ueightballVox from "../../../assets/vox/sample.vox";
import uenvelopVox from "../../../assets/vox/sample.vox";
import ufahrenheitVox from "../../../assets/vox/sample.vox";
import ufrogVox from "../../../assets/vox/sample.vox";
import ugunVox from "../../../assets/vox/sample.vox";
import umeatVox from "../../../assets/vox/sample.vox";
import umoonVox from "../../../assets/vox/sample.vox";
import umogVox from "../../../assets/vox/sample.vox";
import uorwellVox from "../../../assets/vox/sample.vox";
import upaperVox from "../../../assets/vox/sample.vox";
import upeaceVox from "../../../assets/vox/sample.vox";
import upeachVox from "../../../assets/vox/sample.vox";
import upiVox from "../../../assets/vox/sample.vox";
import uplaceholderVox from "../../../assets/vox/sample.vox";
import upooVox from "../../../assets/vox/sample.vox";
import upretzelVox from "../../../assets/vox/sample.vox";
import uretardVox from "../../../assets/vox/sample.vox";
import urockVox from "../../../assets/vox/sample.vox";
import urocketVox from "../../../assets/vox/sample.vox";
import usaVox from "../../../assets/vox/sample.vox";
import uscisorsVox from "../../../assets/vox/sample.vox";
import ushotVox from "../../../assets/vox/sample.vox";
import ushrimpVox from "../../../assets/vox/sample.vox";
import uskullVox from "../../../assets/vox/sample.vox";
import usushiVox from "../../../assets/vox/sample.vox";
import utacoVox from "../../../assets/vox/sample.vox";
import utaiwanVox from "../../../assets/vox/sample.vox";
import utestVox from "../../../assets/vox/sample.vox";
import uwatermelonVox from "../../../assets/vox/sample.vox";
import uwunicornVox from "../../../assets/vox/sample.vox";
import zeroCharacter from "../../../assets/img/zeroCharacter.png";
import oneCharacter from "../../../assets/img/oneCharacter.png";
import twoCharacter from "../../../assets/img/twoCharacter.png";
import threeCharacter from "../../../assets/img/threeCharacter.png";
import fourCharacter from "../../../assets/img/fourCharacter.png";
import fiveCharacter from "../../../assets/img/fiveCharacter.png";
import sixCharacter from "../../../assets/img/sixCharacter.png";
import sevenCharacter from "../../../assets/img/sevenCharacter.png";
import eightCharacter from "../../../assets/img/eightCharacter.png";
import nineCharacter from "../../../assets/img/nineCharacter.png";
import kCharacter from "../../../assets/img/kCharacter.png";
import mCharacter from "../../../assets/img/mCharacter.png";
import bCharacter from "../../../assets/img/bCharacter.png";
import tCharacter from "../../../assets/img/tCharacter.png";
import lessThanCharacter from "../../../assets/img/lessThanCharacter.png";
import { getBalance } from "hooks/getBalance";

let voxArray = [
  ualienVox,
  ubearVox,
  ubearHearthVox,
  ublackflagVox,
  ublissfulVox,
  ublowfishVox,
  ucashVox,
  ucatVox,
  uchainsVox,
  uchickVox,
  uchinaVox,
  uclownVox,
  ucornVox,
  ucrystalballVox,
  udiamondVox,
  udiceVox,
  udogVox,
  ueggplantVox,
  ueightballVox,
  uenvelopVox,
  ufahrenheitVox,
  ufrogVox,
  ugunVox,
  umeatVox,
  umoonVox,
  umogVox,
  uorwellVox,
  upaperVox,
  upeaceVox,
  upeachVox,
  upiVox,
  uplaceholderVox,
  upooVox,
  upretzelVox,
  uretardVox,
  urockVox,
  urocketVox,
  usaVox,
  uscisorsVox,
  ushotVox,
  ushrimpVox,
  uskullVox,
  usushiVox,
  utacoVox,
  utaiwanVox,
  utestVox,
  uwatermelonVox,
  uwunicornVox,
];

const numberFormatter = new Intl.NumberFormat(navigator.language, {
  maximumFractionDigits: 1,
  notation: "compact",
  compactDisplay: "short",
});

const percentFormatter = new Intl.NumberFormat(navigator.language, {
  style: "percent",
  minimumFractionDigits: 2,
});

function Cracked({ onClose, onMinimize }) {
  const {
    username,
    connect,
    disconnect,
    wallet,
    address,
    isWalletConnected,
    getSigningCosmWasmClient,
  } = useChain("unicorn");
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)
  //const isClient = useIsClient();
  const [min, setMin] = useState(0);
  const [patched, setPatched] = useState(0);
  const [hover, setHover] = useState(0);
  const [tradeHover, setTradeHover] = useState(0);
  const [switchHover, setSwitchHover] = useState(0);
  const [cancelHover, setCancelHover] = useState(0);
  const [activeButton, setActiveButton] = useState(0);
  const [activeClient, setActiveClient] = useState(0);
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(0);
  const [headerRow, setHeaderRow] = useState([]);
  const [leftDenom, setLeftDenom] = useState("");
  const [rightDenom, setRightDenom] = useState("");
  const [swapActive, setSwapActive] = useState(true);
  const [otherRows, setOtherRows] = useState([]);
  const [leftName, setLeftName] = useState("");
  const [leftSymbol, setLeftSymbol] = useState("");
  const [rightSymbol, setRightSymbol] = useState("🦄");
  const [rightName, setRightName] = useState("UWU");
  const [swapPrice, setSwapPrice] = useState(0);
  const [balances, setBalances] = useState([]);
  const [message, setMessage] = useState();
  let supplyArray = [];
  const [stateSupplyArray, setStateSupplyArray] = useState([]);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  let gridRef = useRef();
  const [buySound] = useSound(buyMp3);
  const [overSound] = useSound(overMp3);
  const [clickSound] = useSound(clickMp3);
  const [completeSound] = useSound(completeMp3);

  // Connect Wallet
  useEffect(() => {
    const fn = async () => {
      await mainWallet?.connect();
    };
    fn();
  }, [mainWallet]);

  useEffect(() => {
    let wallet = document.getElementById("wallet");
    wallet.onmousedown = function () {
      downFunction();
    };
    wallet.onmouseleave = function () {
      leaveFunction();
    };
    wallet.onmouseenter = function () {
      enterFunction();
    };
    function enterFunction() {
      if (isWalletConnected) {
        wallet.src = switchedHover;
      } else {
        wallet.src = hoverButton;
      }
    }

    function downFunction() {
      if (isWalletConnected) {
        wallet.src = switchPressed;
      } else {
        wallet.src = pressedButton;
      }
    }

    function leaveFunction() {
      if (isWalletConnected) {
        wallet.src = switchButton;
      } else {
        wallet.src = connectButton;
      }
    }
    if (swapActive) {
      let cancel = document.getElementById("cancel");
      let swap = document.getElementById("swap");
      let trade = document.getElementById("trade");
      cancel.onmousedown = function () {
        cancelDown();
      };
      cancel.onmouseleave = function () {
        cancelLeave();
      };
      cancel.onmouseenter = function () {
        cancelEnter();
      };
      trade.onmousedown = function () {
        tradeDown();
      };
      trade.onmouseleave = function () {
        tradeLeave();
      };
      trade.onmouseenter = function () {
        tradeEnter();
      };
      swap.onmousedown = function () {
        swapDown();
      };
      swap.onmouseenter = function () {
        swapEnter();
      };
      swap.onmouseleave = function () {
        swapLeave();
      };

      function cancelDown() {
        cancel.src = cancelSwapPressed;
      }

      function cancelLeave() {
        cancel.src = cancelSwap;
      }

      function cancelEnter() {
        cancel.src = cancelSwapHover;
      }

      function tradeDown() {
        trade.src = tradeSwapPressed;
      }

      function tradeEnter() {
        trade.src = tradeSwapHover;
      }

      function tradeLeave() {
        trade.src = tradeSwap;
      }

      function swapDown() {
        swap.src = switchSwapPressed;
      }

      function swapEnter() {
        swap.src = switchSwapHover;
      }

      function swapLeave() {
        swap.src = switchSwap;
      }



      const draggableDiv = document.getElementById('swapWindow');

// Set initial position
let startX, startY;
let isDragging = false;

// Event listeners
draggableDiv.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  startY = e.clientY;
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const newX = startX + e.clientX;
    const newY = startY + e.clientY;
    draggableDiv.style.left = `${newX}px`;
    draggableDiv.style.top = `${newY}px`;
  }
});


    }
  });

  const sprites = Object.freeze({
    0: zeroCharacter,
    1: oneCharacter,
    2: twoCharacter,
    3: threeCharacter,
    4: fourCharacter,
    5: fiveCharacter,
    6: sixCharacter,
    7: sevenCharacter,
    8: eightCharacter,
    9: nineCharacter,
    K: kCharacter,
    M: mCharacter,
    B: bCharacter,
    T: tCharacter,
    "<": lessThanCharacter,
  });

  function parsedText(text) {
    let textArray = [];
    for (let i = 0; i < text.length; i++) {
      if (sprites[text[i]]) {
        textArray.push(
          <img
            style={{ width: "initial", height: "initial" }}
            src={sprites[text[i]]}
          />
        );
      }
    }
    return textArray;
  }

  function displayNumber(num) {
    if (!num) return "";
    if (Number(num) < 1) return "<1";

    return numberFormatter.format(num);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplyResponse = await fetch(
          "https://rest.unicorn.meme/cosmos/bank/v1beta1/supply?pagination.limit=100"
        );
        const supplyData = await supplyResponse.json();

        const emoji = {
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ualien": "👽",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear":
            "ʕ·͡ᴥ·ʔ",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth":
            "ʕっ•ᴥ•ʔっ❤️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag":
            "🏴",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful":
            "(｡◕‿‿◕｡)",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish":
            "🐡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash": "💸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat": "🐱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchains":
            "🙍⛓️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick": "🐤",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina": "🇨🇳",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown": "🤡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn": "🌽",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball":
            "🔮",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond":
            "💎",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice": "🎲",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog": "🐶",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueggplant":
            "🍆",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball":
            "🎱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop":
            "✉️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit":
            "🔥",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufrog": "🐸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun":
            "▄︻デ══‐一♡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat": "🥩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon": "🌕",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umog": "😹",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell":
            "🐷",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper": "📄",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeace": "☮️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach": "🍑",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi": "🥧",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder":
            "placeholder",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo": "💩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel":
            "🥨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uretard":
            "🤡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock": "🪨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket":
            "🚀",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa": "🇺🇸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors":
            "✂️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushot": "🔫",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushrimp":
            "🦐",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uskull": "💀",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usushi": "🍣",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaco": "🌮",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaiwan":
            "🇹🇼",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utest":
            "test",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uwatermelon":
            "🍉",
          uwunicorn: "🦄",
        };

        const rest = "https://rest.unicorn.meme";
        const wasm = "/cosmwasm/wasm/v1/contract/";
        const factory =
          "unicorn1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjslkfelc";

        const devliq = "unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty";

        const getPair = async (denom) => {
          const res = await fetch(
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
          );
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
              value: b,
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
              value: b * price,
            };
            return info;
          }
        };

        const infos = await Promise.all(supplyData.supply.map(getInfo));
        const headerRow = [
          "Emoji",
          "Denom",
          "Supply",
          "Circ",
          "MCap",
          "FDV",
          "TVL",
          "Liq",
          "Price",
          "Balance",
          "Share",
          "Value",
        ];
        setHeaderRow(headerRow);

        const otherRows = infos.map((info) => [
          supplyArray.push([
            info.emoji,
            info.denom,
            info.supply,
            info.circ,
            info.mcap,
            info.fdv,
            info.tvl,
            info.liq,
            info.price,
            info.balance,
            info.share,
            info.value,
          ]),
        ]);
        let jsonArray = [];
        for (let i = 0; i < supplyArray.length; i++) {
          jsonArray.push({
            id: i,
            emoji: String(supplyArray[i][0]),
            denom: String(supplyArray[i][1]),
            price: Number(supplyArray[i][8]),
            priceDisplay: numberFormatter.format(supplyArray[i][8]) + " 🦄",
            mcap: numberFormatter.format(supplyArray[i][4]),
            liq: percentFormatter.format(supplyArray[i][7]),
            tvl: numberFormatter.format(supplyArray[i][6]),
            swap: "Swap",
          });
        }

        setRowData(jsonArray);
        setOtherRows(otherRows);

        let alienBalance = await getBalance(
          address,
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ualien"
        );
        setBalances([{ name: "alien", amount: alienBalance }]);
      } catch (error) {
        console.error("Error fetching market data: ", error);
      }
    };

    fetchData();
  }, [isWalletConnected, swapActive]);

  const onSelectionChanged = useCallback(() => {
    const selectedAsset = gridRef.current.api.getSelectedRows()?.[0];
    if (!selectedAsset) return;

    setSwapActive(true);

    setSwapPrice(selectedAsset.price);

    setLeftValue(1);
    setLeftSymbol(voxArray[selectedAsset?.id]);
    setLeftName(selectedAsset.denom?.split("/")?.[2]);
    setLeftDenom(selectedAsset.denom);

    setRightValue(selectedAsset.price);
    setRightSymbol(uwunicornVox);
    setRightName("uwunicorn");
    setRightDenom("uwunicorn");
  }, []);

  const switchSwapPlace = () => {
    let symRight = rightSymbol;
    let symLeft = leftSymbol;
    let namRight = rightName;
    let namLeft = leftName;
    let denLeft = leftDenom;
    let rightVal = rightValue;
    let leftVal = leftValue;
    let denRight = rightDenom;
    setRightName(namLeft);
    setLeftName(namRight);
    setRightSymbol(symLeft);
    setLeftSymbol(symRight);
    setLeftDenom(denRight);
    setRightDenom(denLeft);
    setLeftValue(rightVal);
    setRightValue(leftVal);
  };

  const [colDefs, setColDefs] = useState([
    { field: "Memoji", valueGetter: (p) => p.data.emoji, flex: 1 },
    { field: "Price", valueGetter: (p) => p.data.priceDisplay, flex: 1 },
    { field: "Mcap", valueGetter: (p) => p.data.mcap, flex: 1 },
    { field: "Liq", valueGetter: (p) => p.data.liq, flex: 1 },
    { field: "TVL", valueGetter: (p) => p.data.tvl, flex: 1 },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  // let { data: bearBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear",
  // });
  // let { data: bearhearthBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth",
  // });
  // let { data: blackflagBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag",
  // });
  // let { data: blissfulBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful",
  // });
  // let { data: blowfishBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish",
  // });
  // let { data: cashBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash",
  // });
  // let { data: catBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat",
  // });
  // let { data: chainsBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchains",
  // });
  // let { data: chickBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick",
  // });
  // let { data: chinaBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina",
  // });
  // let { data: clownBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown",
  // });
  // let { data: cornBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn",
  // });
  // let { data: crystalballBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom:
  //     "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball",
  // });
  // let { data: diamondBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond",
  // });
  // let { data: diceBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice",
  // });
  // let { data: dogBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog",
  // });
  // let { data: eggplantBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueggplant",
  // });
  // let { data: eightballBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball",
  // });
  // let { data: envelopBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop",
  // });
  // let { data: fahrenheitBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit",
  // });
  // let { data: frogBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufrog",
  // });
  // let { data: gunBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun",
  // });
  // let { data: meatBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat",
  // });
  // let { data: mogBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umog",
  // });
  // let { data: moonBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon",
  // });
  // let { data: orwellBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell",
  // });
  // let { data: paperBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper",
  // });
  // let { data: peaceBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeace",
  // });
  // let { data: peachBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach",
  // });
  // let { data: piBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi",
  // });
  // let { data: placeholderBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom:
  //     "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder",
  // });
  // let { data: pooBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo",
  // });
  // let { data: pretzelBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel",
  // });
  // let { data: retardBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uretard",
  // });
  // let { data: rockBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock",
  // });
  // let { data: rocketBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket",
  // });
  // let { data: usaBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa",
  // });
  // let { data: scisorsBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors",
  // });
  // let { data: shotBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushot",
  // });
  // let { data: shrimpBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushrimp",
  // });
  // let { data: skullBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uskull",
  // });
  // let { data: sushiBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usushi",
  // });
  // let { data: tacoBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaco",
  // });
  // let { data: taiwanBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaiwan",
  // });
  // let { data: testBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utest",
  // });
  // let { data: watermelonBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uwatermelon",
  // });
  // let { data: uwuBalance } = useBalance({
  //   bech32Adddress: account?.bech32Address,
  //   denom: "uwunicorn",
  // });

  //let coinArray = [
  // bearBalance,
  // bearhearthBalance,
  // blackflagBalance,
  // blissfulBalance,
  // blowfishBalance,
  // cashBalance,
  // catBalance,
  // chainsBalance,
  // chickBalance,
  // chinaBalance,
  // clownBalance,
  // cornBalance,
  // crystalballBalance,
  // diamondBalance,
  // diceBalance,
  // dogBalance,
  // eggplantBalance,
  // eightballBalance,
  // envelopBalance,
  // fahrenheitBalance,
  // frogBalance,
  // gunBalance,
  // meatBalance,
  // mogBalance,
  // moonBalance,
  // orwellBalance,
  // paperBalance,
  // peaceBalance,
  // peachBalance,
  // piBalance,
  // placeholderBalance,
  // pooBalance,
  // pretzelBalance,
  // retardBalance,
  // rockBalance,
  // rocketBalance,
  // usaBalance,
  // scisorsBalance,
  // shotBalance,
  // shrimpBalance,
  // skullBalance,
  // sushiBalance,
  // tacoBalance,
  // taiwanBalance,
  // testBalance,
  // watermelonBalance,
  // uwuBalance,
  //  ];

  const swapAssets = async () => {
    if (isWalletConnected) {
      const client = await getSigningCosmWasmClient();

      let msg = {
        execute_swap_operations: {
          max_spread: "0.5",
          minimum_receive: "1",
          operations: [
            {
              astro_swap: {
                offer_asset_info: {
                  native_token: { denom: String(leftDenom) },
                },
                ask_asset_info: { native_token: { denom: String(rightDenom) } },
              },
            },
          ],
        },
      };
      let res = await client.execute(
        address,
        "unicorn16jzpxp0e8550c9aht6q9svcux30vtyyyyxv5w2l2djjra46580wsl825uf",
        msg,
        "auto",
        "",
        [
          {
            denom: String(leftDenom),
            amount: String(leftValue * Math.pow(10, 6)),
          },
        ]
      );
      completeSound();
      alert(`Success, transaction hash: ${res.transactionHash}`);
      setSwapActive(false);
    } else {
      alert("Please connect a wallet");
    }
  };

  return (
    <>
      <div
        className="crackedWindow"
        onMouseDown={clickSound}
        style={{ zIndex: "97" }}
      >
        <div className="userSection">
          <img className="userWindow" src={userWindow} />
          <img className="walletName" src={walletName} />
          {isWalletConnected ? (
            <>
              <p className="walletId">
                {address.slice(0, 4)}....
                {address.slice(42, 46)}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="inventorySection">
          <img className="invText" src={invText} />
          <img className="invTop" src={invSlotsTop} />
          <img className="invSlots" src={invSlots} />
          <img className="invSlots" src={invSlots} />
          <img className="invSlots" src={invSlots} />
          <img className="invSlots" src={invSlots} />
          <img className="invSlots" src={invSlots} />
          <img className="invBottom" src={invSlotsBottom} />
        </div>
        <div id="memeMarketSection">
          <div className="memeSection"></div>
          <div className="buttonSection">
            {activeButton === 0 && (
              <>
                <img className="allButton" id="allButton" src={allButton} />
                <img
                  onClick={() => setActiveButton(1)}
                  className="hiddenButton"
                  id="hiddenButton"
                  style={{ opacity: "0" }}
                  src={hiddenButton}
                />
                <img
                  onClick={() => setActiveButton(2)}
                  className="classicButton"
                  id="classicButton"
                  style={{ opacity: "0" }}
                  src={classicButton}
                />
              </>
            )}
            {activeButton === 1 && (
              <>
                <img
                  onClick={() => setActiveButton(0)}
                  className="allButton"
                  id="allButton"
                  style={{ opacity: "0" }}
                  src={allButton}
                />
                <img
                  className="hiddenButton"
                  id="hiddenButton"
                  src={hiddenButton}
                />
                <img
                  onClick={() => setActiveButton(2)}
                  className="classicButton"
                  id="classicButton"
                  style={{ opacity: "0" }}
                  src={classicButton}
                />
              </>
            )}
            {activeButton === 2 && (
              <>
                <img
                  onClick={() => setActiveButton(0)}
                  className="allButton"
                  id="allButton"
                  style={{ opacity: "0" }}
                  src={allButton}
                />
                <img
                  onClick={() => setActiveButton(1)}
                  className="hiddenButton"
                  id="hiddenButton"
                  style={{ opacity: "0" }}
                  src={hiddenButton}
                />
                <img
                  className="classicButton"
                  id="classicButton"
                  src={classicButton}
                />
              </>
            )}
          </div>
          <div className="listItems">
            <div id="assetGrid" className="ag-theme-quartz-dark">
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                rowSelection="single"
                ref={gridRef}
                onSelectionChanged={onSelectionChanged}
              />
            </div>{" "}
          </div>
        </div>

        {isWalletConnected ? (
          <>
            <div className="walletItems">
              {balances?.map((asset) => {
                return (
                  <div key={asset.id}>
                    <span className="assetSpan">
                      <img className="assetImg" src={asset.name} />
                      <p className="assetAmount">
                        {parsedText(displayNumber(asset.amount))}
                      </p>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
        <div id="bottomBar">
          <div>
          <img
            onMouseOver={overSound}
            className="mascot"
            onClick={() => onClose(onClose)}
            src={mascotButton}
          /></div>
          <div><img
            className="exit"
            onClick={() => onClose(onClose)}
            src={exitButton}
          /></div>
          <div>{isWalletConnected ? (
            <>
              <img
                className="walletButton"
                id="wallet"
                onClick={() => disconnect()}
                src={switchButton}
              />
            </>
          ) : (
            <>
              <img
                className="walletButton"
                id="wallet"
                onClick={async () => {
                  await connect();
                  console.log("connected");
                }}
                src={connectButton}
              />
            </>
          )}
          </div>
          <div className="assetsWindow">
           <img src={assetsWindow} />
          <p className="unicornBal">
            {true
              ? Number(Number(0) / Math.pow(10, 6)).toFixed(2)
              : 0}
          </p>
          <p className="blackflagBal">
            0 🏴
          </p>
          <p className="diamondBal">
            0 💎
          </p> 
          </div>
        </div>
      </div>

      {swapActive ? (
        <>
          <div className="swapWindow" id="swapWindow" onMouseDown={clickSound}>
            <img
              className="tradeSwap"
              id="trade"
              onClick={() => swapAssets()}
              onMouseDown={buySound}
              src={tradeSwap}
            />
            <img
              onClick={() => switchSwapPlace()}
              className="switchSwap"
              id="swap"
              src={switchSwap}
            />
            <img
              className="cancelSwap"
              id="cancel"
              onClick={() => setSwapActive(false)}
              src={cancelSwap}
            />
            <input
              className="inputNumbers"
              id="leftInput"
              value={leftValue}
              onChange={(e) => {
                setLeftValue(e.target.value);
                setRightValue(e.target.value * swapPrice);
              }}
              type="number"
            />
            <input
              className="inputNumbers"
              id="rightInput"
              value={rightValue}
              onChange={(e) => {
                setRightValue(e.target.value);
                setLeftValue(e.target.value / swapPrice);
              }}
              type="number"
            />
            <span className="leftSwapSymbol">
              <VoxLoader object={leftSymbol} />
            </span>
            <p className="leftSwapName">{leftName}</p>
            <span className="rightSwapSymbol">
              <VoxLoaderTwo object={rightSymbol} />
            </span>
            <p className="rightSwapName">{rightName}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Cracked;
