import { useState, useEffect, useRef } from "react";
import Ztext from "react-ztext";
import mascotButton from "assets/img/mascot.png";
import allButton from "assets/img/all.png";
import hiddenButton from "assets/img/hidden.png";
import classicButton from "assets/img/classic.png";
import mainTabButton from "assets/img/mainTabButton.png";
import userWindow from "assets/img/user.gif";
import { getCNSAsync } from "hooks/cns";
import { FACTORY_DEPLOYER } from "src/constants";

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
import { MEMOJI, ADDRESS_LENGTH } from "../../constants";
import {
  fetchBalancesAsync,
  fetchAllPools,
  fetchPoolPrice,
} from "../../hooks/balanceUtils.jsx";
import { fetch24HourPriceChange } from "../../hooks/fetchChartData.js";
import SwapModal from "../SwapModal/index.jsx";
import SendModal from "../SendModal/index.jsx";
import AlertModal from "../AlertModal/index.jsx";
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
  if (denom === "uowo") {
    return "UWU";
  }
  return denom?.charAt(1).toUpperCase() + denom?.slice(2);
};

function Trading({ onClose }) {
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)
  const { username, connect, disconnect, address, isWalletConnected } =
    useChain("osmosis");

  const [activeButton, setActiveButton] = useState(0);

  const [swapActive, setSwapActive] = useState(false);
  const [sendActive, setSendActive] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertLink, setAlertLink] = useState();
  const [alertLinkText, setAlertLinkText] = useState();
  const [leftAsset, setLeftAsset] = useState();
  const [rightAsset, setRightAsset] = useState();
  const [addressDisplay, setAddressDisplay] = useState();
  const [mainTab, setMainTab] = useState(0);
  const [balances, setBalances] = useState([]);
  const [refreshBalances, setRefreshBalances] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [settingsActive, setSettingsActive] = useState(false);
  const [slippage, setSlippage] = useState(5);
  let gridRef = useRef();
  const clickSound = new Audio(clickMp3);
  const overSound = new Audio(overMp3);

  const fetchSupplyData = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const allPools = await fetchAllPools();

      const getPriceAndTvl = async (poolId, maxSupply) => {
        const poolInfo = await fetchPoolPrice(allPools, poolId);
        return {
          price: poolInfo.price,
          liq: poolInfo.liq,
          mc: poolInfo.price * (parseFloat(maxSupply) / 1000000),
        };
      };

      const getInfo = async (sup) => {
        const supply = parseFloat(sup.maxSupply) / 1000000;

        if (sup?.name === "uowo") {
          return {
            denom: sup?.denom,
            denomShorthand: sup?.name,
            emoji: sup?.emoji,
            supply: supply,
            mcap: supply,
            tvl: 0,
            liq: 0,
            price: 1,
            listed: true,
            poolId: sup?.poolId || null,
          };
        } else {
          const priceAndTvl = await getPriceAndTvl(sup?.poolId, sup?.maxSupply);
          const price = priceAndTvl.price || 0;
          const liq = priceAndTvl.liq || 0;
          const mc = priceAndTvl.mc || 0;
          const info = {
            denom: sup?.denom,
            denomShorthand: sup?.name,
            emoji: sup?.emoji,
            supply: supply,
            mcap: mc,
            tvl: liq,
            liq: liq / mc || 0,
            price,
            listed: sup?.listed ? 1 : 0,
            poolId: sup?.poolId || null,
          };
          if (!sup?.emoji) {
            console.warn("No emoji info for denom: ", sup);
          }
          return info;
        }
      };

      const supplyDataMapped = (
        await Promise.allSettled(MEMOJI.map(getInfo))
      ).map((result) => {
        if (result.status === "fulfilled") {
          return result.value || {};
        } else {
          console.error("Error fetching supply data: ", result.reason);
          return {};
        }
      });
      const rowData = supplyDataMapped.map((info) => ({
        emoji: String(info.emoji),
        denom: String(info.denom),
        denomDisplay: info.denomShorthand,
        price: Number(info.price),
        poolId: info.poolId,
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
        const balances = userBalances?.map((ub) => ({
          name: rowData.find((r) => r.denom === ub.denom)?.denomDisplay,
          denom: ub.denom,
          emoji: rowData.find((r) => r.denom === ub.denom)?.emoji,
          amount: displayNumber(Number(ub.amount) / 1000000),
          amountRaw: Number(ub.amount) / 1000000,
          poolId: rowData.find((r) => r.denom === ub.denom)?.poolId,
        }));

        setBalances(balances.filter((b) => b.name));
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
      setAddressDisplay(
        `${address.slice(0, 11)}...${address.slice(37, ADDRESS_LENGTH)}`
      );
      fn();
    }
  }, [address]);

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
    fetch24HourPriceChange();
  }, [refreshBalances]);

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

    setLeftAsset({
      name: "UWU",
      denom: `factory/${FACTORY_DEPLOYER}/uowo`,
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
    const foundAsset = rowData.find((r) => r.denom === asset.denom);

    if (!foundAsset) {
      console.error("No asset found for denom: ", asset.name);
      return null;
    }

    if (foundAsset.denomDisplay === "uowo") {
      return null;
    }

    setLeftAsset({
      name: foundAsset.denomDisplay,
      denom: foundAsset.denom,
      amount: "1",
    });
    setRightAsset({
      name: "UWU",
      denom: `factory/${FACTORY_DEPLOYER}/uowo`,
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
        className="crackedWindow flex flex-col md:flex-row relative"
        onMouseDown={() => clickSound.play()}
      >
        {/* TESTNET Watermark overlay */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "40%",
            transform: "translate(-50%, -50%) rotate(-20deg)",
            fontSize: "5rem",
            color: "purple",
            opacity: 0.45,
            pointerEvents: "none",
            fontWeight: "bold",
            zIndex: 100,
            userSelect: "none",
            textShadow: "0 0 12px #800080, 0 0 2px #fff",
          }}
        >
          TESTNET
        </div>
        <div className="leftSection w-full md:w-226px">
          <div className="flex flex-row md:flex-col">
            <div className="userSection p-1 w-1/2 md:w-full">
              <div className="userWindowWrapper">
                <img className="userWindow" src={userWindow} />
              </div>
              <div className="walletName">
                {isWalletConnected ? (
                  <>
                    <p>{addressDisplay}</p>
                    <p style={{ color: "purple", fontWeight: "bold" }}>
                      TESTNET
                    </p>
                    {/* <p>{username}</p> */}
                  </>
                ) : null}
              </div>
            </div>

            <div className="walletItemsSection max-h-[200px] overflow-y-auto md:max-h-none md:overflow-visible w-1/2 md:w-full">
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
                        key={asset.denom}
                        className="assetWrapper"
                        onClick={() => onInventoryClick(asset)}
                      >
                        <div className="assetEmoji">
                          <img
                            src={
                              MEMOJI.find((m) => m.name === asset.name)?.image
                            }
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
        </div>
        <div className="flex flex-col flex-grow">
          <div className="memeMarketSection h-full p-2.5 max-h-[calc(100vh-260px)] overflow-y-auto md:max-h-none md:overflow-visible">
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
                <button
                  onMouseEnter={() => overSound.play()}
                  className="walletButtonConnected"
                  id="wallet"
                  onClick={() => {
                    setBalances(null);
                    disconnect();
                  }}
                />
              ) : (
                <button
                  onMouseEnter={() => overSound.play()}
                  className="walletButton"
                  id="wallet"
                  onClick={async () => {
                    await connect();
                  }}
                />
              )}
            </div>

            <div className="exitWrapper mt-auto mb-5 mr-2.5 h-full">
              <button
                onMouseEnter={() => overSound.play()}
                className="settingsButton"
                onClick={() => setSettingsActive(true)}
                aria-label="Settings"
              ></button>
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
        isActive={swapActive}
        balances={balances}
        slippage={slippage}
        onClose={() => setSwapActive(false)}
        onSwap={(message, link, linkText) => {
          if (message) {
            alert(message, link, linkText);
          }
          setRefreshBalances(!refreshBalances);
        }}
      ></SwapModal>

      {/* Settings Modal */}
      {settingsActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="rounded-lg shadow-lg p-6 min-w-[300px] relative"
            style={{ background: "#e0ddd7" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSettingsActive(false)}
              aria-label="Close"
            >
              ✖️
            </button>
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label
                htmlFor="slippage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slippage:{" "}
                <span className="font-bold text-purple-600">{slippage}%</span>
              </label>
              <input
                id="slippage"
                type="range"
                min={0}
                max={90}
                step={1}
                value={slippage}
                onChange={(e) => setSlippage(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Trading;
