import { useState, useRef } from "react";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "juno-network";

import { AgGridReact } from "@ag-grid-community/react"; // React Data Grid Component
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);


import { MEMOJI } from "src/constants";
import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import sonicspin from "assets/img/sonicspin.png";
import "./index.css";
import AirdropGrid from "./AirdropGrid";

import {
  useBalances,
  useNames,
  useNumSearchResults,
  useNumTXs,
  usePairs,
  useSearchResults,
  useSupply,
  useTXs,
  useUwUPrice,
} from "./utils/hooks";

import {
  supplyContext,
  namesContext,
  balancesContext,
  trackersContext,
  poolsContext,
  uwuPriceContext,
} from "./utils/context";
import { Box, Divider, Stack } from "@interchain-ui/react";

//hooks
const promptSound = new Audio(promptMp3);
const clickSound = new Audio(clickMp3);
const successSound = new Audio(successMp3);
const overSound = new Audio(overMp3);
const errorSound = new Audio(errorWav);

function AirDrop({ isActive, onSend }) {
  const { address, isWalletConnected, getSigningStargateClient } =
    useChain("unicorn");
  let gridRef = useRef();

  const supply = useSupply();
  const denoms = Array.from(supply.keys()).filter((d) => d != "uwunicorn");
  const minters = new Set(denoms.map((d) => d.split("/")[1]));
  const pools = usePairs(denoms);

  const [denom, setDenom] = useState(
    "factory/unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty/ublackflag"
  );
  const [holdersOrLP, setHoldersOrLP] = useState(true);
  const [minAmount, setMinAmount] = useState(0);

  // Add new state variables for airdrop functionality
  const [airdropEmoji, setAirdropEmoji] = useState("");
  const [airdropAmount, setAirdropAmount] = useState("");
  const [excludedWallets, setExcludedWallets] = useState("");
  const [distributionType, setDistributionType] = useState("equal");
  const [brackets, setBrackets] = useState([
    { min: 0, max: Infinity, amount: 0 },
  ]);

  const numSearchResults = useNumSearchResults(denom);
  const addrs = useSearchResults(denom, numSearchResults);

  const balances = useBalances(
    Array.from(addrs).concat(Array.from(minters), Array.from(pools.values()))
  );
  const uwuPrice = useUwUPrice();
  const names = useNames(Array.from(addrs));
  return (
    <div id="airdrop">
        <supplyContext.Provider value={supply}>
          <balancesContext.Provider value={balances}>
            <namesContext.Provider value={names}>
              <poolsContext.Provider value={pools}>
                <uwuPriceContext.Provider value={uwuPrice}>

                    <AirdropGrid
                      denom={denom}
                      minAmount={minAmount}
                      airdropEmoji={airdropEmoji}
                      airdropAmount={airdropAmount}
                      excludedWallets={excludedWallets}
                      distributionType={distributionType}
                      brackets={brackets}
                      setDenom={setDenom}
                      holdersOrLP={holdersOrLP}
                      setHoldersOrLP={setHoldersOrLP}
                      setMinAmount={setMinAmount}
                      setAirdropEmoji={setAirdropEmoji}
                      setAirdropAmount={setAirdropAmount}
                      setExcludedWallets={setExcludedWallets}
                      setDistributionType={setDistributionType}
                      setBrackets={setBrackets}
                    />

                </uwuPriceContext.Provider>
              </poolsContext.Provider>
            </namesContext.Provider>
          </balancesContext.Provider>
        </supplyContext.Provider>
    </div>
  );
}

export default AirDrop;
