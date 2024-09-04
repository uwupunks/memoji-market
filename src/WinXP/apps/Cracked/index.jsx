import React, { useState, useEffect, useRef } from "react";

import connectButton from "assets/img/connectwallet.png";
import exitButton from "assets/img/exit.png";
import hoverButton from "assets/img/hover.png";
import mascotButton from "assets/img/mascot.png";
import pressedButton from "assets/img/pressed.png";
import switchedHover from "assets/img/switchwallethover.png";
import switchPressed from "assets/img/switchwalletpressed.png";
import switchButton from "assets/img/switchwallet.png";
import allButton from "assets/img/all.png";
import hiddenButton from "assets/img/hidden.png";
import classicButton from "assets/img/classic.png";
import userWindow from "assets/img/window.png";

import { useChain, useWallet } from "@cosmos-kit/react";
import { AgGridReact } from "@ag-grid-community/react"; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import overMp3 from "assets/sounds/btmouseover.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";

import zeroCharacter from "assets/img/zeroCharacter.png";
import oneCharacter from "assets/img/oneCharacter.png";
import twoCharacter from "assets/img/twoCharacter.png";
import threeCharacter from "assets/img/threeCharacter.png";
import fourCharacter from "assets/img/fourCharacter.png";
import fiveCharacter from "assets/img/fiveCharacter.png";
import sixCharacter from "assets/img/sixCharacter.png";
import sevenCharacter from "assets/img/sevenCharacter.png";
import eightCharacter from "assets/img/eightCharacter.png";
import nineCharacter from "assets/img/nineCharacter.png";
import kCharacter from "assets/img/kCharacter.png";
import mCharacter from "assets/img/mCharacter.png";
import bCharacter from "assets/img/bCharacter.png";
import tCharacter from "assets/img/tCharacter.png";
import lessThanCharacter from "assets/img/lessThanCharacter.png";
import btSend2 from "assets/img/btsend/2.png";
import memeInv from "assets/img/memeInv.png";
import { CONTRACTS, ENDPOINTS, MEMOJI } from "../../../constants";
import {
  fetchBalancesAsync,
  findBalance,
} from "../../../hooks/balanceUtils.jsx";
import SwapModal from "../../../components/SwapModal/index.jsx";
import SendModal from "../../../components/SendModal/index.jsx";

const numberFormatter = new Intl.NumberFormat(navigator.language, {
  notation: "compact",
  compactDisplay: "short",
});

const numberFormatterInventory = new Intl.NumberFormat(navigator.language, {
  maximumFractionDigits: 0,
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
  const [sendActive, setSendActive] = useState(false);
  const [leftAsset, setLeftAsset] = useState();
  const [rightAsset, setRightAsset] = useState();
  const [swapPrice, setSwapPrice] = useState();
  const [swapLiq, setSwapLiq] = useState();

  const [balances, setBalances] = useState([]);
  const [refreshBalances, setRefreshBalances] = useState(false);

  const [rowData, setRowData] = useState([]);
  let gridRef = useRef();
  const clickSound = new Audio(clickMp3);
  const overSound = new Audio(overMp3);

  const onGridTabClick = async (e) => {
    const activeTab =
      e.target.className === "hiddenButton"
        ? 1
        : e.target.className === "classicButton"
        ? 2
        : 0;
    setActiveButton(activeTab);

    if (activeTab > 0) {
      await gridRef.current.api.setColumnFilterModel("Listed", {
        filterType: "number",
        type: "equals",
        filter: e.target.className === "classicButton" ? 1 : 0,
      });
      gridRef.current.api.onFilterChanged();
    } else {
      await gridRef.current.api.setColumnFilterModel("Listed", null);
      gridRef.current.api.onFilterChanged();
    }
  };

  const padInventory = (balances) => {
    const emptyBoxes = [];
    for (let i = 0; i < 60 - (balances?.length || 0); i++) {
      emptyBoxes.push(
        <div  key={i} className="assetWrapper">
          <div className="assetEmoji"></div>
        </div>
      );
    }
    return emptyBoxes;
  };
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

  const sprites = {
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
  };

  function asImage(text) {
    let textArray = [];
    for (let i = 0; i < text.length; i++) {
      if (sprites[text[i]]) {
        textArray.push(<img src={sprites[text[i]]} />);
      }
    }
    return <span className="textImage">{textArray}</span>;
  }

  function displayNumber(num) {
    if (!num) return "";
    if (Number(num) < 1) return "<1";

    return numberFormatterInventory.format(num);
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
          const denomShorthand = sup.denom.split("/")?.[2];
          const supply = parseFloat(sup.amount) / 1000000;
          const lpBalance = findBalance(lpBalances, denom);
          const circ = supply - lpBalance;

          if (denom === "uwunicorn") {
            return {
              denom: "uwunicorn",
              denomShorthand: "uwunicorn",
              emoji: MEMOJI.find((x) => x.name === "uwunicorn")?.emoji,
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
              emoji: MEMOJI.find((x) => x.name === denomShorthand)?.emoji,
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
              listed: MEMOJI.find((x) => x.name === denomShorthand)?.listed
                ? 1
                : 0,
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
          mcap: info.mcap,
          mcapDisplay: numberFormatter.format(info.mcap),
          liq: percentFormatter.format(info.liq),
          tvl: numberFormatter.format(info.tvl),
          fdv: numberFormatter.format(info.fdv),
          supply: info.supply,
          balance: info.balance,
          share: info.share,
          value: info.value,
          circ: info.circ,
          listed: info.listed,
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

        if (isWalletConnected && rowData.length > 0) {
          const userBalances = await fetchBalancesAsync(address, signal);
          const balances = userBalances?.map((ub) => ({
            name: rowData.find((r) => r.denom === ub.denom)?.denomDisplay,
            denom: ub.denom,
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
  }, [address, rowData.length > 0, refreshBalances]);

  const onRowClicked = (event) => {
    const rowNode = event.node;
    const selectedAsset = rowNode.data;

    setSwapPrice(selectedAsset.price);
    setSwapLiq(selectedAsset.liq);

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
  };

  const onInventoryClick = (asset) => {
    const foundAsset = rowData.find((r) => r.denom.endsWith(asset.name));

    if (!foundAsset) {
      return null;
    }

    setSwapPrice(foundAsset.price);
    setSwapLiq(foundAsset.liq);

    setLeftAsset({
      name: foundAsset.denomDisplay,
      denom: foundAsset.denom,
      amount: "1",
    });
    setRightAsset({
      name: "uwunicorn",
      denom: "uwunicorn",
      amount: (1 * foundAsset.price).toFixed(4),
    });

    setSwapActive(true);
  };

  const [colDefs, setColDefs] = useState([
    { field: "Memoji", valueGetter: (p) => p.data.emoji },
    { field: "Price", valueGetter: (p) => p.data.priceDisplay },
    {
      field: "McapRaw",
      valueGetter: (p) => p.data.mcap,
      sort: "desc",
      hide: true,
    },
    { field: "Mcap", valueGetter: (p) => p.data.mcapDisplay },
    { field: "Liq", valueGetter: (p) => p.data.liq },
    { field: "TVL", valueGetter: (p) => p.data.tvl },
    {
      field: "Listed",
      valueGetter: (p) => p.data.listed,
      flex: 1,
      filter: "agNumberColumnFilter",
      hide: true,
    },
  ]);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    cellClass: "partial-vertical-borders",
  };

  return (
    <>
      <div
        className="crackedWindow flex flex-row"
        onMouseDown={() => clickSound.play()}
        style={{ zIndex: "97" }}
      >
        <div className="leftSection w-226px">
          <div className="userSection p-1">
            <img className="userWindow" src={userWindow} />

            <div className="walletName">
              {isWalletConnected ? (
                <>
                  <p>
                    {address.slice(0, 11)}....
                    {address.slice(40, 46)}
                  </p>
                  <p>{username}</p>
                </>
              ) : null}
            </div>
          </div>

          <div className="walletItemsSection">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={memeInv} />

              <button
                className="send"
                onClick={async () => {
                  if (!isWalletConnected) {
                    await connect();
                  }
                  setSendActive(!sendActive);
                }}
                onMouseEnter={() => overSound.play()}
                src={btSend2}
                id="send"
              />
            </div>

            <div className="walletItemsBorder">
              <div className="walletItems">
                {balances?.map((asset) => {
                  return (
                    <div
                      key={asset.name}
                      className="assetWrapper"
                      onClick={() => onInventoryClick(asset)}
                    >
                      <div className="assetEmoji">
                        <img
                          src={MEMOJI.find((m) => m.name === asset.name)?.image}
                        ></img>
                      </div>
                      {asImage(asset.amount)}
                    </div>
                  );
                })}
                {padInventory(balances)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="memeMarketSection h-full p-2.5">
              <div id="memeMarket">
                <div className="memeSection"></div>
                <div className="buttonSection">
                  {activeButton === 0 && (
                    <>
                      <img
                        className="allButton"
                        id="allButton"
                        src={allButton}
                        onClick={onGridTabClick}
                      />
                      <img
                        onClick={onGridTabClick}
                        className="hiddenButton"
                        id="hiddenButton"
                        style={{ opacity: "0" }}
                        src={hiddenButton}
                      />
                      <img
                        onClick={onGridTabClick}
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
                        onClick={onGridTabClick}
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
                        onClick={onGridTabClick}
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
                        onClick={onGridTabClick}
                        className="allButton"
                        id="allButton"
                        style={{ opacity: "0" }}
                        src={allButton}
                      />
                      <img
                        onClick={onGridTabClick}
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
                      onRowClicked={onRowClicked}
                      enableSorting
                      rowClass="row-borders"
                    />
                  </div>
                </div>
              </div>
          </div>
          <div className="bottomBar flex flex-row items-baseline">
            <div className="assetList">
              <div className="asset">
                UNICORN
                <div className="quantity">
                  {balances?.find((b) => b.emoji === "🦄")?.amount || 0}
                </div>
              </div>
              <div className="asset">
                BLACK FLAG
                <div className="quantity">
                  {balances?.find((b) => b.emoji === "🏴")?.amount || 0}
                </div>
              </div>
              <div className="asset">
                DIAMOND
                <div className="quantity">
                  {balances?.find((b) => b.emoji === "💎")?.amount || 0}
                </div>
              </div>
            </div>
            <div className="w-2/3" id="bottomBarMiddle">
              {isWalletConnected ? (
                <img
                  onMouseEnter={() => overSound.play()}
                  className="walletButton"
                  id="wallet"
                  onClick={() => {
                    setBalances(null);
                    disconnect();
                  }}
                  src={switchButton}
                />
              ) : (
                <img
                  onMouseEnter={() => overSound.play()}
                  className="walletButton"
                  id="wallet"
                  onClick={async () => {
                    await connect();
                  }}
                  src={connectButton}
                />
              )}
            </div>

            <div className="exitWrapper mt-auto mb-5 mr-2.5 h-full">
              <img
                onMouseEnter={() => overSound.play()}
                className="exit"
                onClick={() => onClose(onClose)}
                src={exitButton}
              />
            </div>

            <div className="mt-auto">
              <img
                className="mascot"
                onClick={() => onClose(onClose)}
                src={mascotButton}
              />
            </div>
          </div>
        </div>
      </div>

      <SwapModal
        left={leftAsset}
        right={rightAsset}
        price={swapPrice}
        liq={swapLiq}
        isActive={swapActive}
        onClose={() => setSwapActive(false)}
        onSwap={() => setRefreshBalances(!refreshBalances)}
      ></SwapModal>

      <SendModal
        isActive={sendActive}
        balances={balances}
        onSend={() => {
          setSendActive(false);
          setRefreshBalances(!refreshBalances);
        }}
      ></SendModal>
    </>
  );
}

export default Cracked;
