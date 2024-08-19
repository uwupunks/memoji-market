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
import userWindow from "../../../assets/img/window.png";

import { useChain, useWallet } from "@cosmos-kit/react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import useSound from "use-sound";
import buyMp3 from "../../../assets/sounds/btbuy.mp3";
import overMp3 from "../../../assets/sounds/btmouseover.mp3";
import clickMp3 from "../../../assets/sounds/btclick.mp3";
import completeMp3 from "../../../assets/sounds/dlgnotice.mp3";

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
import Draggable from "react-draggable";
import { CONTRACTS, ENDPOINTS, MEMOJI } from "../../../constants";
import {
  fetchBalancesAsync,
  findBalance,
} from "../../../hooks/balanceUtils.jsx";
import SwapModal from "../../../components/SwapModal/index.jsx";

const numberFormatter = new Intl.NumberFormat(navigator.language, {
  maximumFractionDigits: 1,
  notation: "compact",
  compactDisplay: "short",
});

const percentFormatter = new Intl.NumberFormat(navigator.language, {
  style: "percent",
  minimumFractionDigits: 2,
});

function Cracked({ onClose }) {
  const { username, connect, disconnect, address, isWalletConnected } =
    useChain("unicorn");
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)

  const [activeButton, setActiveButton] = useState(0);

  const [swapActive, setSwapActive] = useState(false);
  const [leftAsset, setLeftAsset] = useState();
  const [rightAsset, setRightAsset] = useState();
  const [swapPrice, setSwapPrice] = useState();

  const [balances, setBalances] = useState([]);
  const [refreshBalances, setRefreshBalances] = useState(false);

  const [rowData, setRowData] = useState([]);
  let gridRef = useRef();
  const [overSound] = useSound(overMp3);
  const [clickSound] = useSound(clickMp3);

  // Connect Wallet
  useEffect(() => {
    const fn = async () => {
      await mainWallet?.connect();
    };
    fn();
  }, [mainWallet]);

  //wallet connected button
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

  // fetch supply data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const supplyResponse = await fetch(ENDPOINTS.supply, { signal });
        const supplyData = await supplyResponse.json();
        const lpBalances = await fetchBalancesAsync(CONTRACTS.lp, signal);

        const getPair = async (denom) => {
          const res = await fetch(
            `${ENDPOINTS.factory}/${btoa(
              JSON.stringify({
                pair: {
                  asset_infos: [
                    { native_token: { denom: denom } },
                    { native_token: { denom: "uwunicorn" } },
                  ],
                },
              })
            )}`,
            { signal }
          );
          const data = await res.json();
          return data.data.contract_addr;
        };

        const getPriceAndTvl = async (denom) => {
          const pair = await getPair(denom);
          const balances = await fetchBalancesAsync(pair, signal);
          const ubal = findBalance(balances, "uwunicorn");
          const dbal = findBalance(balances, denom);
          return { price: ubal / dbal, tvl: ubal };
        };

        const getInfo = async (sup) => {
          const denom = sup.denom;
          const denomShorthand = sup.denom.split("/")[2];
          const supply = parseFloat(sup.amount) / 1000000;
          const lpBalance = findBalance(lpBalances, denom);
          const circ = supply - lpBalance;

          if (denom === "uwunicorn") {
            return {
              denom: "uwunicorn",
              emoji: MEMOJI.find((x) => x["uwunicorn"])["uwunicorn"],
              supply: supply,
              circ,
              mcap: supply,
              fdv: supply,
              tvl: 0,
              liq: 0,
              price: 1,
              balance: lpBalance,
              share: lpBalance / circ,
              value: lpBalance,
              listed: true,
            };
          } else {
            const priceAndTvl = await getPriceAndTvl(denom);
            const price = priceAndTvl.price;
            const tvl = priceAndTvl.tvl;
            const info = {
              denom: denom,
              denomShorthand,
              emoji: MEMOJI.find((x) => x[denomShorthand])[denomShorthand],
              supply: supply,
              circ,
              mcap: price * circ,
              fdv: price * supply,
              tvl,
              liq: tvl / (price * circ),
              price,
              balance: lpBalance,
              share: lpBalance / circ,
              value: lpBalance * price,
              listed: MEMOJI.find((x) => x[denom])?.listed,
            };
            return info;
          }
        };

        const infos = await Promise.all(supplyData.supply.map(getInfo));

        const rowData = infos.map((info) => ({
          emoji: String(info.emoji),
          denom: String(info.denom),
          denomDisplay: info.denomShorthand,
          price: Number(info.price),
          priceDisplay: numberFormatter.format(info.price) + " 🦄",
          mcap: numberFormatter.format(info.mcap),
          liq: percentFormatter.format(info.liq),
          tvl: numberFormatter.format(info.tvl),
          fdv: numberFormatter.format(info.fdv),
          supply: info.supply,
          balance: info.balance,
          share: info.share,
          value: info.value,
          circ: info.circ,
        }));

        setRowData(rowData);
        return () => {
          // cancel rest requests before component unmounts
          controller.abort();
        };
      } catch (error) {
        console.error("Error fetching market data: ", error);
      }
    };

    fetchData();
  }, []);

  // fetch user balances
  useEffect(() => {
    const fetchUserBalances = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        if (isWalletConnected) {
          const userBalances = await fetchBalancesAsync(address, signal);

          const balances = userBalances.map((ub) => ({
            name: rowData.find((r) => r.denom === ub.denom)?.denomDisplay,
            emoji: rowData.find((r) => r.denom === ub.denom)?.emoji,
            amount: displayNumber(Number(ub.amount) / 1000000),
          }));
          console.log(balances);
          setBalances(balances);
        }
        return () => {
          // cancel rest requests before component unmounts
          controller.abort();
        };
      } catch (error) {
        console.error("Error fetching user balance data: ", error);
      }
    };
    if (address) {
      fetchUserBalances();
    }
  }, [address, refreshBalances]);

  const onSelectionChanged = useCallback(() => {
    const selectedAsset = gridRef.current.api.getSelectedRows()?.[0];
    if (!selectedAsset) return;

    setSwapPrice(selectedAsset.price);

    setLeftAsset({
      name: "uwunicorn",
      denom: "uwunicorn",
      amount: "1",
    });
    setRightAsset({
      name: selectedAsset.denomDisplay,
      denom: selectedAsset.denom,
      amount: (1 / selectedAsset.price).toFixed(4),
    });

    setSwapActive(true);
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: "Memoji", valueGetter: (p) => p.data.emoji, flex: 1 },
    { field: "Price", valueGetter: (p) => p.data.priceDisplay, flex: 1 },
    { field: "Mcap", valueGetter: (p) => p.data.mcap, flex: 1 },
    { field: "Liq", valueGetter: (p) => p.data.liq, flex: 1 },
    { field: "TVL", valueGetter: (p) => p.data.tvl, flex: 1 },
  ]);

  const defaultColDef = {
    sortable: true,
    flex: 1,
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
          {isWalletConnected ? (
            <div className="walletName">
              <p>
                {address.slice(0, 11)}....
                {address.slice(40, 46)}
              </p>
              <p>{username}</p>
            </div>
          ) : null}
        </div>

        <Draggable>
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
        </Draggable>

        {isWalletConnected ? (
          <div className="walletItems">
            {balances?.map((asset) => {
              return (
                <div key={asset.name} className="assetWrapper">
                  <div className="assetEmoji">{asset.emoji}</div>
                  <div className="assetAmount">{asset.amount}</div>
                </div>
              );
            })}
          </div>
        ) : null}


        {isWalletConnected ? (
          <div className="assetList">
            {balances?.map((asset) => {
              return (
                <div key={asset.name} className="asset">
                  {asset.name || asset.emoji} - {asset.amount}
                </div>
              );
            })}
          </div>
        ) : 
        null}

        <div id="bottomBar">
          <div>
            <img
              onMouseOver={overSound}
              className="mascot"
              onClick={() => onClose(onClose)}
              src={mascotButton}
            />
          </div>
          <div>
            <img
              className="exit"
              onClick={() => onClose(onClose)}
              src={exitButton}
            />
          </div>
          <div>
            {isWalletConnected ? (
                <img
                  className="walletButton"
                  id="wallet"
                  onClick={() => disconnect()}
                  src={switchButton}
                />
            ) : (
                <img
                  className="walletButton"
                  id="wallet"
                  onClick={async () => {
                    await connect();
                    console.log("connected");
                  }}
                  src={connectButton}
                />
            )}
          </div>
        </div>
      </div>

      <SwapModal
        left={leftAsset}
        right={rightAsset}
        price={swapPrice}
        isActive={swapActive}
        onClose={() => setSwapActive(false)}
        onSwap={() => setRefreshBalances(!refreshBalances)}
      ></SwapModal>
    </>
  );
}

export default Cracked;
