import React, { useState, useEffect, useRef } from "react";
import Ztext from "react-ztext";
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
import mainTabButton from "assets/img/mainTabButton.png";
import userWindow from "assets/img/user.gif";
import { getCNSAsync } from "hooks/cns";

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
import AlertModal from "../../../components/AlertModal/index.jsx";
import { useInterval } from "src/hooks/useInterval.js";

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

const longNumberFormatter = new Intl.NumberFormat(navigator.language);

const displayDenom = (denom) => {
  if (!denom) {
    return "";
  }
  if (denom === "usa") {
    return "USA";
  }
  if (denom === "uwunicorn") {
    return "Unicorn";
  }
  return denom?.charAt(1).toUpperCase() + denom?.slice(2);
};

function Cracked({ onClose }) {
  const { username, connect, disconnect, address, isWalletConnected } =
    useChain("osmosis");

  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)

  const [activeButton, setActiveButton] = useState(0);

  const [swapActive, setSwapActive] = useState(false);
  const [sendActive, setSendActive] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertLink, setAlertLink] = useState();
  const [alertLinkText, setAlertLinkText] = useState();
  const [leftAsset, setLeftAsset] = useState();
  const [rightAsset, setRightAsset] = useState();
  const [swapPrice, setSwapPrice] = useState();
  const [addressDisplay, setAddressDisplay] = useState();
  const [mainTab, setMainTab] = useState(0);
  const [balances, setBalances] = useState([]);
  const [refreshBalances, setRefreshBalances] = useState(false);
  const [rowData, setRowData] = useState([]);
  let gridRef = useRef();
  const clickSound = new Audio(clickMp3);
  const overSound = new Audio(overMp3);
  const FAKE_DIAMONDS =
    "factory/osmo1pawhaxskmdkzvfgevs0dh4lxuctn4x8wt2sqyz95tgem9ne2nrwqjg6rvq/udiamond";

  const fetchSupplyData = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      const supplyResponse = await fetch(ENDPOINTS.supply, { signal });
      const supplyJson = await supplyResponse.json();
      const supplyData = supplyJson.supply.filter(
        (s) => s.denom != FAKE_DIAMONDS
      );
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

      const infos = await Promise.all(supplyData.map(getInfo));
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

  const fetchUserBalances = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      if (isWalletConnected && rowData.length > 0) {
        const userBalances = await fetchBalancesAsync(address, signal);
        const userBalancesFiltered = userBalances.filter(
          (b) => b.denom != FAKE_DIAMONDS
        );
        const balances = userBalancesFiltered?.map((ub) => ({
          name: rowData.find((r) => r.denom === ub.denom)?.denomDisplay,
          denom: ub.denom,
          emoji: rowData.find((r) => r.denom === ub.denom)?.emoji,
          amount: displayNumber(Number(ub.amount) / 1000000),
          amountRaw: Number(ub.amount) / 1000000,
        }));
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
        <div key={i} className="assetWrapper">
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

  useEffect(() => {
    const fn = async () => {
      const addressDisplay = await getCNSAsync(address);
      if (addressDisplay) {
        setAddressDisplay(addressDisplay);
      }
    };
    if (address) {
      setAddressDisplay(`${address.slice(0, 11)}...${address.slice(40, 46)}`);
      fn();
    }
  }, [address]);

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

  const isLowLiq = (liq) => liq.replace("%", "") < 0.4;
  const alert = (message, link, linkText) => {
    setAlertMessage(message);
    setAlertLink(link);
    setAlertLinkText(linkText);
    setAlertActive(true);
  };
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
    fetchSupplyData();
  }, []);

  // fetch user balances
  useEffect(() => {
    if (address) {
      fetchUserBalances();
    }
  }, [address, rowData.length > 0, refreshBalances]);

  // Poll prices and balances
  useInterval(async () => {
    fetchSupplyData();
    fetchUserBalances();
  }, 60_000);

  const onRowClicked = (event) => {
    const rowNode = event.node;
    const selectedAsset = rowNode.data;

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

    if (isLowLiq(selectedAsset.liq)) {
      alert(
        "Warning: This pair has low liquidity. Expect high price impact. Consider trading OTC."
      );
    }
  };

  const onInventoryClick = (asset) => {
    const foundAsset = rowData.find((r) => r.denom.endsWith(asset.name));

    if (!foundAsset || foundAsset.denom === "uwunicorn") {
      return null;
    }

    setSwapPrice(foundAsset.price);

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

    if (isLowLiq(foundAsset.liq)) {
      alert(
        "Warning: This pair has low liquidity. Expect high price impact. Consider trading OTC."
      );
    }
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "Memoji",
      valueGetter: (p) =>
        `${p.data.emoji} ${displayDenom(p.data.denomDisplay)}`,
    },
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
      >
        <div className="leftSection w-226px">
          <div className="userSection p-1">
            <div className="userWindowWrapper">
              <img className="userWindow" src={userWindow} />
            </div>
            <div className="walletName">
              {isWalletConnected ? (
                <>
                  <p>{addressDisplay}</p>
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
              {mainTab === 0 && (
                <>
                  <div className="memeSection">
                    <img
                      id="bridgeButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(1)}
                      style={{ transform: "translate(130.5px, 10px)" }}
                    />
                    <img
                      id="airdropButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(2)}
                      style={{ transform: "translate(130.5px, 10px)" }}
                    />
                  </div>
                </>
              )}
              {mainTab === 1 && (
                <>
                  <div className="bridgeSection">
                    <img
                      id="memesButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(0)}
                      style={{ transform: "translate(0px, 10px)" }}
                    />
                    <img
                      id="airdropButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(2)}
                      style={{ transform: "translate(130.5px, 10px)" }}
                    />
                  </div>
                </>
              )}
              {mainTab === 2 && (
                <>
                  <div className="airdropSection">
                    <img
                      id="memesButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(0)}
                      style={{ transform: "translate(0px, 10px)" }}
                    />
                    <img
                      id="bridgeButton"
                      src={mainTabButton}
                      onClick={() => setMainTab(1)}
                      style={{ transform: "translate(0px, 10px)" }}
                    />
                  </div>
                </>
              )}
              {mainTab === 0 && (
                <>
                  {" "}
                  <div className="buttonSection">
                    {activeButton === 0 && (
                      <>
                        <img
                          className="allButton smidgeDown"
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
                          className="hiddenButton smidgeDown"
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
                          className="classicButton smidgeDown"
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
                </>
              )}
              {mainTab === 1 && (
                <>
                  <div className="constructionDiv">
                    <span className="centerText">
                      <Ztext
                        depth="60px"
                        direction="both"
                        event="pointer"
                        eventRotation="30deg"
                        eventDirection="default"
                        fade={false}
                        layers={8}
                        perspective="1200px"
                        style={{
                          fontSize: "4.5rem",
                        }}
                      >
                        <h1>
                          <span>UNDER CONSTRUCTION</span>
                        </h1>
                      </Ztext>
                    </span>
                  </div>
                </>
              )}
              {mainTab === 2 && (
                <>
                  <div className="constructionDiv">
                    <span className="centerText">
                      <Ztext
                        depth="60px"
                        direction="both"
                        event="pointer"
                        eventRotation="30deg"
                        eventDirection="default"
                        fade={false}
                        layers={8}
                        perspective="1200px"
                        style={{
                          fontSize: "4.5rem",
                        }}
                      >
                        <h1>
                          <span>UNDER CONSTRUCTION</span>
                        </h1>
                      </Ztext>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="bottomBar flex flex-row items-baseline">
            <div className="assetList">
              <div className="asset">
                <div className="quantity">
                  {longNumberFormatter.format(
                    balances?.find((b) => b.emoji === "🦄")?.amountRaw || 0
                  )}
                </div>
              </div>
              <div className="asset">
                <div className="quantity">
                  {longNumberFormatter.format(
                    balances?.find((b) => b.emoji === "🏴")?.amountRaw || 0
                  )}
                </div>
              </div>
              <div className="asset">
                <div className="quantity">
                  {longNumberFormatter.format(
                    balances?.find((b) => b.emoji === "💎")?.amountRaw || 0
                  )}
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
        isActive={swapActive}
        balances={balances}
        onClose={() => setSwapActive(false)}
        onSwap={(message, link, linkText) => {
          if (message) {
            alert(message, link, linkText);
          }
          setRefreshBalances(!refreshBalances);
        }}
      ></SwapModal>

      <SendModal
        isActive={sendActive}
        balances={balances}
        onSend={(message, link, linkText) => {
          setSendActive(false);
          if (message) {
            alert(message, link, linkText);
          }
          setRefreshBalances(!refreshBalances);
        }}
      ></SendModal>

      <AlertModal
        isActive={alertActive}
        message={alertMessage}
        link={alertLink}
        linkText={alertLinkText}
        onClose={() => {
          setAlertActive(false);
          setAlertMessage(null);
          setAlertLink(null);
          setAlertLinkText(null);
        }}
      ></AlertModal>
    </>
  );
}

export default Cracked;
