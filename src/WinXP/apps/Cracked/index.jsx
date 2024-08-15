import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import assetsWindow from '../../../assets/img/assets.png';
import connectButton from '../../../assets/img/connectwallet.png';
import exitButton from '../../../assets/img/exit.png';
import hoverButton from '../../../assets/img/hover.png';
import mascotButton from '../../../assets/img/mascot.png';
import pressedButton from '../../../assets/img/pressed.png';
import switchedHover from '../../../assets/img/switchwallethover.png';
import switchPressed from '../../../assets/img/switchwalletpressed.png';
import switchButton from '../../../assets/img/switchwallet.png';
import memeButtons from '../../../assets/img/memes.png';
import memeMiddle from '../../../assets/img/memesmiddle.png';
import memeEnd from '../../../assets/img/memesend.png';
import bgMiddle from '../../../assets/img/bgmiddle.png';
import bgEnd from '../../../assets/img/bgend.png';
import bgStart from '../../../assets/img/bgstart.png';
import allButton from '../../../assets/img/all.png';
import hiddenButton from '../../../assets/img/hidden.png';
import classicButton from '../../../assets/img/classic.png';
import backButtons from '../../../assets/img/backButtons.png';
import bgListend from '../../../assets/img/bglistend.png';
import bgList from '../../../assets/img/bglist.png';
import listLeft from '../../../assets/img/listleft.png';
import listMiddle from '../../../assets/img/list.png';
import listRight from '../../../assets/img/listright.png';
import walletName from '../../../assets/img/walletname.png';
import userWindow from '../../../assets/img/window.png';
import invSlotsTop from '../../../assets/img/invslotstop.png';
import invSlotsBottom from '../../../assets/img/invslotsbottom.png';
import invText from '../../../assets/img/invtext.png';
import invSlots from '../../../assets/img/invslots.png';
import tradeSwap from '../../../assets/img/trade.png';
import tradeSwapHover from '../../../assets/img/tradehover.png';
import tradeSwapPressed from '../../../assets/img/tradepressed.png';
import switchSwap from '../../../assets/img/switch.png';
import switchSwapHover from '../../../assets/img/switchhover.png'
import switchSwapPressed from '../../../assets/img/switchpress.png';
import baseSwap from '../../../assets/img/baseswap.png';
import cancelSwap from '../../../assets/img/cancel.png';
import cancelSwapHover from '../../../assets/img/cancelhover.png';
import cancelSwapPressed from '../../../assets/img/cancelpressed.png';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { useAccount, useConnect, useDisconnect, WalletType, useBalance } from "graz";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import asset1 from '../../../assets/img/blackflag.png';
import useSound from 'use-sound';
import buyMp3 from '../../../assets/sounds/btbuy.mp3';
import overMp3 from '../../../assets/sounds/btmouseover.mp3';
import clickMp3 from '../../../assets/sounds/btclick.mp3';
import completeMp3 from '../../../assets/sounds/dlgnotice.mp3';
import leftCorner from '../../../assets/img/leftCorner.png';
import rightCorner from '../../../assets/img/rightCorner.png';
import leftBar from '../../../assets/img/leftBar.png';
import rightBar from '../../../assets/img/rightBar.png';
import bottomBar from '../../../assets/img/bottomBar.png';
import VoxLoader from './voxLoader.jsx';
import VoxLoaderTwo from './voxLoaderTwo.jsx';
import ualienVox from '../../../assets/vox/sample.vox';
import ubearVox from '../../../assets/vox/sample.vox';
import ubearHearthVox from '../../../assets/vox/sample.vox';
import ublackflagVox from '../../../assets/vox/sample.vox';
import ublissfulVox from '../../../assets/vox/sample.vox';
import ublowfishVox from '../../../assets/vox/sample.vox';
import ucashVox from '../../../assets/vox/sample.vox';
import ucatVox from '../../../assets/vox/sample.vox';
import uchainsVox from '../../../assets/vox/sample.vox';
import uchickVox from '../../../assets/vox/sample.vox';
import uchinaVox from '../../../assets/vox/sample.vox';
import uclownVox from '../../../assets/vox/sample.vox';
import ucornVox from '../../../assets/vox/sample.vox';
import ucrystalballVox from '../../../assets/vox/sample.vox';
import udiamondVox from '../../../assets/vox/sample.vox';
import udiceVox from '../../../assets/vox/sample.vox';
import udogVox from '../../../assets/vox/sample.vox';
import ueggplantVox from '../../../assets/vox/sample.vox';
import ueightballVox from '../../../assets/vox/sample.vox';
import uenvelopVox from '../../../assets/vox/sample.vox';
import ufahrenheitVox from '../../../assets/vox/sample.vox';
import ufrogVox from '../../../assets/vox/sample.vox';
import ugunVox from '../../../assets/vox/sample.vox';
import umeatVox from '../../../assets/vox/sample.vox';
import umoonVox from '../../../assets/vox/sample.vox';
import umogVox from '../../../assets/vox/sample.vox';
import uorwellVox from '../../../assets/vox/sample.vox';
import upaperVox from '../../../assets/vox/sample.vox';
import upeaceVox from '../../../assets/vox/sample.vox';
import upeachVox from '../../../assets/vox/sample.vox';
import upiVox from '../../../assets/vox/sample.vox';
import uplaceholderVox from '../../../assets/vox/sample.vox';
import upooVox from '../../../assets/vox/sample.vox';
import upretzelVox from '../../../assets/vox/sample.vox';
import uretardVox from '../../../assets/vox/sample.vox';
import urockVox from '../../../assets/vox/sample.vox';
import urocketVox from '../../../assets/vox/sample.vox';
import usaVox from '../../../assets/vox/sample.vox';
import uscisorsVox from '../../../assets/vox/sample.vox';
import ushotVox from '../../../assets/vox/sample.vox';
import ushrimpVox from '../../../assets/vox/sample.vox';
import uskullVox from '../../../assets/vox/sample.vox';
import usushiVox from '../../../assets/vox/sample.vox';
import utacoVox from '../../../assets/vox/sample.vox';
import utaiwanVox from '../../../assets/vox/sample.vox';
import utestVox from '../../../assets/vox/sample.vox';
import uwatermelonVox from '../../../assets/vox/sample.vox';
import uwunicornVox from '../../../assets/vox/sample.vox';
import zeroCharacter from '../../../assets/img/zeroCharacter.png';
import oneCharacter from '../../../assets/img/oneCharacter.png';
import twoCharacter from '../../../assets/img/twoCharacter.png';
import threeCharacter from '../../../assets/img/threeCharacter.png';
import fourCharacter from '../../../assets/img/fourCharacter.png';
import fiveCharacter from '../../../assets/img/fiveCharacter.png';
import sixCharacter from '../../../assets/img/sixCharacter.png';
import sevenCharacter from '../../../assets/img/sevenCharacter.png';
import eightCharacter from '../../../assets/img/eightCharacter.png';
import nineCharacter from '../../../assets/img/nineCharacter.png';
import kCharacter from '../../../assets/img/kCharacter.png';
import mCharacter from '../../../assets/img/mCharacter.png';
import bCharacter from '../../../assets/img/bCharacter.png';
import tCharacter from '../../../assets/img/tCharacter.png';
import qCharacter from '../../../assets/img/qCharacter.png';
import sCharacter from '../../../assets/img/sCharacter.png';

let voxArray = [ualienVox, ubearVox, ubearHearthVox, ublackflagVox, ublissfulVox, ublowfishVox, ucashVox, ucatVox, uchainsVox, uchickVox, uchinaVox, uclownVox, ucornVox, ucrystalballVox, udiamondVox, udiceVox, udogVox, ueggplantVox, ueightballVox, uenvelopVox, ufahrenheitVox, ufrogVox, ugunVox, umeatVox, umoonVox, umogVox, uorwellVox, upaperVox, upeaceVox, upeachVox, upiVox, uplaceholderVox, upooVox, upretzelVox, uretardVox, urockVox, urocketVox, usaVox, uscisorsVox, ushotVox, ushrimpVox, uskullVox, usushiVox, utacoVox, utaiwanVox, utestVox, uwatermelonVox, uwunicornVox];



function Cracked({ onClose, onMinimize }) {


   

   const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
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
  const [swapActive, setSwapActive] = useState(false);
  const [otherRows, setOtherRows] = useState([]);
  const [address, setAddress] = useState(0);
  const [leftName, setLeftName] = useState("");
  const [leftSymbol, setLeftSymbol] = useState("");
  const [rightSymbol, setRightSymbol] = useState("🦄");
  const [rightName, setRightName] = useState("UWU");
  const [swapPrice, setSwapPrice] = useState(0);
  let supplyArray = [];
  const [stateSupplyArray, setStateSupplyArray] = useState([]);
   // Row Data: The data to be displayed.
 const [rowData, setRowData] = useState([]);
 let gridRef = useRef();
 const [buySound] = useSound(buyMp3);
 const [overSound] = useSound(overMp3);
 const [clickSound] = useSound(clickMp3);
 const [completeSound] = useSound(completeMp3);

  useEffect(() =>{
  let wallet = document.getElementById("wallet");
  wallet.onmousedown = function() {downFunction()};
  wallet.onmouseleave = function() {leaveFunction()};
  wallet.onmouseenter = function() {enterFunction()};
  function enterFunction() {
  if(isConnected){wallet.src = switchedHover}else{
  wallet.src = hoverButton;}
}

function downFunction() {
  if(isConnected){wallet.src = switchPressed}else{
  wallet.src = pressedButton;}
}

function leaveFunction() {
  if(isConnected){wallet.src = switchButton}else{
  wallet.src = connectButton;}
}
  if(swapActive){let cancel = document.getElementById("cancel");
  let swap = document.getElementById("swap");
  let trade = document.getElementById("trade");
  cancel.onmousedown = function() {cancelDown()};
  cancel.onmouseleave = function() {cancelLeave()};
  cancel.onmouseenter = function(){cancelEnter()};
  trade.onmousedown = function(){tradeDown()};
  trade.onmouseleave = function(){tradeLeave()};
  trade.onmouseenter = function(){tradeEnter()};
  swap.onmousedown = function(){swapDown()};
  swap.onmouseenter = function(){swapEnter()};
  swap.onmouseleave = function(){swapLeave()};



  function cancelDown(){
    cancel.src = cancelSwapPressed;
  }

  function cancelLeave(){
    cancel.src = cancelSwap;
  }

  function cancelEnter(){
    cancel.src = cancelSwapHover;
  }

  function tradeDown(){
    trade.src = tradeSwapPressed;
  }

  function tradeEnter(){
    trade.src = tradeSwapHover;
  }

  function tradeLeave(){
    trade.src = tradeSwap;
  }

  function swapDown(){
    swap.src = switchSwapPressed;
  }

  function swapEnter(){
    swap.src = switchSwapHover;
  }

  function swapLeave(){
    swap.src = switchSwap;
  }};

  let agRow = document.getElementsByClassName('swapGridButton');

  for(let i = 0; i < agRow.length; i++){
    agRow[i].onmouseover = function(){overSound()};
  }

});

  const sprites = Object.freeze({
  "0": zeroCharacter,
  "1": oneCharacter,
  "2": twoCharacter,
  "3": threeCharacter,
  "4": fourCharacter,
  "5": fiveCharacter,
  "6": sixCharacter,
  "7": sevenCharacter,
  "8": eightCharacter,
  "9": nineCharacter,
  "k": kCharacter,
  "m": mCharacter,
  "b": bCharacter,
  "t": tCharacter,
  "q": qCharacter,
  "s": sCharacter
});

  function parsedText(text) {
    let textArray = [];
  for(let i = 0; i < text.length; i++){
    if(sprites[text[i]]){
      textArray.push(<img style={{width: 'initial', height: 'initial'}} src={sprites[text[i]]} />);
    }
  }
  return textArray;
}

  function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "b" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "q" },
    { value: 1e18, symbol: "s" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

   useEffect(() => {
    const fetchData = async () => {
      try {
        const supplyResponse = await fetch('https://rest.unicorn.meme/cosmos/bank/v1beta1/supply?pagination.limit=100');
        const supplyData = await supplyResponse.json();

        const emoji = {
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ualien": "👽",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear": "ʕ·͡ᴥ·ʔ",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth": "ʕっ•ᴥ•ʔっ❤️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag": "🏴",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful": "(｡◕‿‿◕｡)",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish": "🐡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash": "💸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat": "🐱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchains": "🙍⛓️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick": "🐤",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina": "🇨🇳",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown": "🤡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn": "🌽",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball": "🔮",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond": "💎",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice": "🎲",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog": "🐶",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueggplant": "🍆",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball": "🎱",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop": "✉️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit": "🔥",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufrog": "🐸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun": "▄︻デ══‐一♡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat": "🥩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon": "🌕",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umog": "😹",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell": "🐷",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper": "📄",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeace": "☮️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach": "🍑",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi": "🥧",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder": "placeholder",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo": "💩",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel": "🥨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uretard": "🤡",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock": "🪨",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket": "🚀",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa": "🇺🇸",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors": "✂️",
          "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushot": "🔫",
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
            return info;
          }
        };

        const infos = await Promise.all(supplyData.supply.map(getInfo));
        const headerRow = ["Emoji", "Denom", "Supply", "Circ", "MCap", "FDV", "TVL", "Liq", "Price", "Balance", "Share", "Value"];
        setHeaderRow(headerRow);

        const otherRows = infos.map(info => [
          supplyArray.push([info.emoji, info.denom, info.supply, info.circ, info.mcap, info.fdv, info.tvl, info.liq, info.price, info.balance, info.share, info.value])
        ]);
        let jsonArray = [];
        for(let i = 0; i < supplyArray.length; i++){
  jsonArray.push({id: i, emoji: String(supplyArray[i][0]), denom: String(supplyArray[i][1]), price: Number(supplyArray[i][8]), mcap: Number(supplyArray[i][4]), liq: Number(supplyArray[i][7]), tvl: Number(supplyArray[i][6]), swap: "Swap"},);
}
   
        setRowData(jsonArray);
        setOtherRows(otherRows);
      } catch (error) {
        console.error('Error fetching market data: ', error);
      }
    };

    fetchData();
  }, []);

 const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSwapPrice(selectedRows[0].price);
    setLeftValue(1);
    setRightValue(selectedRows[0].price);
    setLeftSymbol(voxArray[selectedRows[0].id]);
    setRightSymbol(uwunicornVox);
    setRightName("uwunicorn");
    setLeftName(String(selectedRows[0].denom).slice(55, String(selectedRows[0].denom).length));
    setLeftDenom(String(selectedRows[0].denom));
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
 }


const CustomButtonComponent = (props) => {
   return <button className="swapGridButton" onClick={() => setSwapActive(true)}>Swap</button>;
 };



 const [colDefs, setColDefs] = useState([
    {field: "Id", valueGetter: (p) => p.data.id, flex: 1},
   { field: "Emoji", valueGetter: (p) => p.data.emoji, flex: 1},
   { field: "Price", valueGetter: (p) => p.data.price, flex: 1 },
   { field: "Mcap", valueGetter: (p) => p.data.mcap, flex: 1 },
   { field: "Liq", valueGetter: (p) => p.data.liq, flex: 1 },
   {field: "TVL", valueGetter: (p) => p.data.tvl, flex: 1},
   {field: "Swap", cellRenderer: CustomButtonComponent, flex: 1}
 ]);

 const defaultColDef = {
    flex: 1,
  }

let {data: alienBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ualien'});
let {data: bearBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubear'});
let {data: bearhearthBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ubearhearth'});
let {data: blackflagBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag'});
let {data: blissfulBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublissful'});
let {data: blowfishBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublowfish'});
let {data: cashBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucash'});
let {data: catBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucat'});
let {data: chainsBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchains'});
let {data: chickBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchick'});
let {data: chinaBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uchina'});
let {data: clownBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uclown'});
let {data: cornBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucorn'});
let {data: crystalballBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ucrystalball'});
let {data: diamondBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udiamond'});
let {data: diceBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udice'});
let {data: dogBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/udog'});
let {data: eggplantBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueggplant'});
let {data: eightballBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ueightball'});
let {data: envelopBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uenvelop'});
let {data: fahrenheitBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufahrenheit'});
let {data: frogBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ufrog'});
let {data: gunBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ugun'});
let {data: meatBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umeat'});
let {data: mogBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umog'});
let {data: moonBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/umoon'});
let {data: orwellBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uorwell'});
let {data: paperBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upaper'});
let {data: peaceBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeace'});
let {data: peachBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upeach'});
let {data: piBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upi'});
let {data: placeholderBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uplaceholder'});
let {data: pooBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upoo'});
let {data: pretzelBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/upretzel'});
let {data: retardBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uretard'});
let {data: rockBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urock'});
let {data: rocketBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/urocket'});
let {data: usaBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usa'});
let {data: scisorsBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uscisors'});
let {data: shotBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushot'});
let {data: shrimpBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ushrimp'});
let {data: skullBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uskull'});
let {data: sushiBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/usushi'});
let {data: tacoBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaco'});
let {data: taiwanBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utaiwan'});
let {data: testBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/utest'});
let {data: watermelonBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/uwatermelon'});
let {data: uwuBalance} = useBalance({bech32Adddress: account?.bech32Address, denom: 'uwunicorn'});

let coinArray = [alienBalance, bearBalance, bearhearthBalance, blackflagBalance, blissfulBalance, blowfishBalance, cashBalance, catBalance, chainsBalance, chickBalance, chinaBalance, clownBalance, cornBalance, crystalballBalance, diamondBalance, diceBalance, dogBalance, eggplantBalance, eightballBalance, envelopBalance, fahrenheitBalance, frogBalance, gunBalance, meatBalance, mogBalance, moonBalance, orwellBalance, paperBalance, peaceBalance, peachBalance, piBalance, placeholderBalance, pooBalance, pretzelBalance, retardBalance, rockBalance, rocketBalance, usaBalance, scisorsBalance, shotBalance, shrimpBalance, skullBalance, sushiBalance, tacoBalance, taiwanBalance, testBalance, watermelonBalance, uwuBalance];
let coinWallet = [];


for(let i = 0; i < coinArray.length; i++){
   if(coinArray[i] ? Number(coinArray[i].amount) : 0 > 0){
    coinWallet.push([i, coinArray[i] ? Number(coinArray[i].amount) : 0]);}
}

const swapAssets = async () => {
  if(isConnected){
    await window.leap.enable('unicorn-420');
    const offlineSigner = await window.leap.getOfflineSignerAuto('unicorn-420');
    const client = await SigningCosmWasmClient.connectWithSigner('https://rpc.unicorn.meme', offlineSigner, {gasPrice: GasPrice.fromString('0.001uwunicorn')});
    let msg = {
                "execute_swap_operations": {
                    "max_spread": "0.5",
                    "minimum_receive": "1",
                    "operations": [{
                        "astro_swap": {
                            "offer_asset_info": { "native_token": { "denom": String(leftDenom) } },
                            "ask_asset_info": { "native_token": { "denom": String(rightDenom) } }
                        }
                    }]
                }
            };
    let res = await client.execute(account?.bech32Address, 'unicorn16jzpxp0e8550c9aht6q9svcux30vtyyyyxv5w2l2djjra46580wsl825uf', msg, "auto", "", [{
                denom: String(leftDenom), amount: String(leftValue*Math.pow(10,6))
            }]);
    completeSound();
  }else{

  }
}
 

  return (
    <>
     <div className="crackedWindow" onMouseDown={clickSound} style={{zIndex: '97'}}>
     <span className="userSection"><img className="userWindow" src={userWindow} /><img className="walletName" src={walletName} />{isConnected ? <><p className="walletId">{account.bech32Address.slice(0,4)}....{account.bech32Address.slice(42,46)}</p></>:<></>}</span>
     <span className="inventorySection"><img className="invText" src={invText} /><img className="invTop" src={invSlotsTop} />
     <img className="invSlots" src={invSlots} />
     <img className="invSlots" src={invSlots} />
     <img className="invSlots" src={invSlots} />
     <img className="invSlots" src={invSlots} />
     <img className="invSlots" src={invSlots} />
     <img className="invBottom" src={invSlotsBottom} /></span>
     <span className="memeSection"><img className="memeStart" src={memeButtons} /><img className="memeMiddle" src={memeMiddle} /><img className="memeEnd" src={memeEnd} /></span>
     <span onMouseOver={overSound} className="buttonSection">
     {activeButton === 0 && (<><img  className="allButton" id="allButton" src={allButton} /><img onClick={() => setActiveButton(1)} className="hiddenButton" id="hiddenButton" style={{opacity: '0'}} src={hiddenButton} /><img onClick={() => setActiveButton(2)} className="classicButton" id="classicButton" style={{opacity: '0'}} src={classicButton} /></>)}
     {activeButton === 1 && (<><img  onClick={() => setActiveButton(0)} className="allButton" id="allButton" style={{opacity: '0'}} src={allButton} /><img className="hiddenButton" id="hiddenButton" src={hiddenButton} /><img onClick={() => setActiveButton(2)} className="classicButton" id="classicButton" style={{opacity: '0'}} src={classicButton} /></>)}
     {activeButton === 2 && (<><img  onClick={() => setActiveButton(0)} className="allButton" id="allButton" style={{opacity: '0'}} src={allButton} /><img onClick={() => setActiveButton(1)} className="hiddenButton" id="hiddenButton" style={{opacity: '0'}} src={hiddenButton} /><img className="classicButton" id="classicButton" src={classicButton} /></>)}
     </span>
     <span className="midSection"><img className="bgEnd" src={bgStart} /><img className="bgMiddle" src={bgMiddle} /><img className="bgEnd" src={bgEnd} /></span>
     <span className="listItems">
      <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} rowSelection='single' ref={gridRef} onSelectionChanged={onSelectionChanged}
      />
    </div> </span>
     <span className="listSection"><img className="listBg" src={bgList} /><img className="listEnd" src={bgListend} /></span>
     {isConnected ? <>
      <div className="walletItems">
      {coinWallet?.map((item, index) => {return (<><span className="assetSpan" onMouseOver={overSound}><img className="assetImg" src={asset1} /><p className="assetAmount">{parsedText(nFormatter(Number(coinWallet[index][1] / Math.pow(10,6)).toFixed(0)))}</p></span></>)})}
      </div>
      </>:<></>}
     <img onMouseOver={overSound} className="mascot" onClick={() => onClose(onClose)} src={mascotButton} />
     <img onMouseOver={overSound} className="exit" onClick={() => onClose(onClose)} src={exitButton} />
     {isConnected ? <><img onMouseOver={overSound} className="walletButton" id="wallet" onClick={() => disconnect()} src={switchButton} /></>:<><img onMouseOver={overSound} className="walletButton" id="wallet" onClick={() => connect({ chainId: "unicorn-420", walletType: WalletType.LEAP })} src={connectButton} /></>}
     <span className="assetsWindow"><img src={assetsWindow} /><p className="unicornBal">{uwuBalance ? Number(Number(uwuBalance.amount)  / Math.pow(10, 6)).toFixed(2): 0}</p><p className="blackflagBal">{blackflagBalance ? Number(Number(blackflagBalance.amount)  / Math.pow(10, 6)).toFixed(2): 0}</p><p className="diamondBal">{diamondBalance ? Number(Number(diamondBalance.amount)  / Math.pow(10, 6)).toFixed(2): 0}</p></span>
    </div>
          <img className="leftCornerCrack" src={leftCorner} />
          <img className="rightCornerCrack" src={rightCorner} />
    <img className="leftBarCrack" src={leftBar} />
    <img className="rightBarCrack" src={rightBar} />
    <img className="bottomBarCrack" src={bottomBar} />
    {swapActive ? <><div className="swapWindow" onMouseDown={clickSound}>
    <img className="tradeSwap" id="trade" onClick={() => swapAssets()} onMouseDown={buySound} onMouseOver={overSound} src={tradeSwap} />
    <img onClick={() => switchSwapPlace()} className="switchSwap" onMouseOver={overSound} id="swap" src={switchSwap} />
    <img className="cancelSwap" id="cancel" onMouseOver={overSound} onClick={() => setSwapActive(false)} src={cancelSwap} />
    <input className="inputNumbers" id="leftInput" value={leftValue} onChange={(e) => {setLeftValue(e.target.value);setRightValue(e.target.value*swapPrice)}} type="number" />
    <input className="inputNumbers" id="rightInput" value={rightValue} onChange={(e) => {setRightValue(e.target.value);setLeftValue(e.target.value/swapPrice)}} type="number" />
    <span className="leftSwapSymbol"><VoxLoader object={leftSymbol} /></span>
    <p className="leftSwapName">{leftName}</p>
    <span  className="rightSwapSymbol"><VoxLoaderTwo object={rightSymbol} /></span>
    <p className="rightSwapName">{rightName}</p>
    </div></>:<></>}
    </>
  );
}

export default Cracked;

