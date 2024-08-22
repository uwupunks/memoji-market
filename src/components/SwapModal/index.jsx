import { useState, useEffect } from "react";
import useSound from "use-sound";
import Draggable from "react-draggable";
import { useChain, useWallet } from "@cosmos-kit/react";

import VoxLoader from "components/VoxLoader";
import { CONTRACTS } from "src/constants";

import buyMp3 from "assets/sounds/btbuy.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import completeMp3 from "assets/sounds/dlgnotice.mp3";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

//force module load
console.log(SigningCosmWasmClient);

const isLowLiq = (liq) => liq.replace("%", "") < 0.4;

function SwapModal({ left, right, price, liq, isActive, onClose, onSwap }) {
  //hooks
  const [buySound] = useSound(buyMp3);
  const [clickSound] = useSound(clickMp3);
  const [completeSound] = useSound(completeMp3);
  const { address, isWalletConnected, getSigningCosmWasmClient } =
    useChain("unicorn");

  // state
  const [leftAsset, setLeftAsset] = useState(left);
  const [rightAsset, setRightAsset] = useState(right);
  const [leftFilePath, setLeftFilePath] = useState();
  const [rightFilePath, setRightFilePath] = useState();

  // effects
  useEffect(() => {
    setLeftAsset(left);
    setRightAsset(right);
  }, [left, right]);
  useEffect(() => {
    const resolveVoxPaths = async () => {
      const left = (await import(`../../assets/vox/${leftAsset?.name}.vox`))
        .default;
      setLeftFilePath(left);
    };
    resolveVoxPaths().catch(() => {
      setLeftFilePath(null);
    });
  }, [leftAsset]);

  useEffect(() => {
    const resolveVoxPaths = async () => {
      const right = (await import(`../../assets/vox/${rightAsset?.name}.vox`))
        .default;
      setRightFilePath(right);
    };
    resolveVoxPaths().catch(() => {
      setRightFilePath(null);
    });
  }, [rightAsset]);

  const swapAssets = async () => {
    if (isWalletConnected && leftAsset.denom && rightAsset.denom) {
      const client = await getSigningCosmWasmClient();

      let msg = {
        execute_swap_operations: {
          max_spread: "0.5",
          minimum_receive: "1",
          operations: [
            {
              astro_swap: {
                offer_asset_info: {
                  native_token: { denom: String(leftAsset.denom) },
                },
                ask_asset_info: {
                  native_token: { denom: String(rightAsset.denom) },
                },
              },
            },
          ],
        },
      };
      try {
      let res = await client.execute(address, CONTRACTS.swap, msg, "auto", "", [
        {
          denom: String(leftAsset.denom),
          amount: String(leftAsset.amount * Math.pow(10, 6)),
        },
      ]);
    } catch(err) {
      alert(`swap failed with error: ${err}`)
      return null
    }
      completeSound();
      alert(`Success, transaction hash: ${res.transactionHash}`);
      onSwap();
      onClose();
    } else {
      alert("Please connect a wallet");
    }
  };

  const switchSwapPlace = () => {
    const tempLeft = leftAsset;
    const tempRight = rightAsset;
    const tempLeftFilePath = leftFilePath;
    const tempRightFilePath = rightFilePath;

    // keep left amount constant
    tempRight.amount = leftAsset.amount;

    // calc expected amount
    tempLeft.amount =
      tempLeft.denom === "uwunicorn"
        ? (leftAsset.amount * price).toFixed(4)
        : (leftAsset.amount / price).toFixed(4);

    setLeftAsset(tempRight);
    setRightAsset(tempLeft);
    setLeftFilePath(tempRightFilePath);
    setRightFilePath(tempLeftFilePath);
  };

  return isActive && price ? (
    <Draggable onMouseDown={clickSound}>
      <div className="swapWindow">
        {isLowLiq(liq) && (
          <span className="swapMessage">Low Liquidity: {liq}</span>
        )}
        <img
          className="tradeSwap"
          id="trade"
          onClick={() => swapAssets()}
          onMouseDown={buySound}
        />
        <img
          onClick={() => switchSwapPlace()}
          className="switchSwap"
          id="swap"
        />
        <img className="cancelSwap" id="cancel" onClick={onClose} />
        <input
          className="inputNumbers"
          id="leftInput"
          value={leftAsset?.amount ?? ""}
          onChange={(e) => {
            setLeftAsset((prev) => ({ ...prev, amount: e.target.value }));
            setRightAsset((prev) => ({
              ...prev,
              amount:
                rightAsset.denom === "uwunicorn"
                  ? (e.target.value * price).toFixed(4)
                  : (e.target.value / price).toFixed(4),
            }));
          }}
          type="number"
        />
        <input
          className="inputNumbers"
          id="rightInput"
          value={rightAsset?.amount ?? ""}
          type="number"
          disabled
        />
        <div className="leftSwapSymbol">
          <VoxLoader filePath={leftFilePath} />
        </div>
        <p className="leftSwapName">{leftAsset?.name}</p>
        <div className="rightSwapSymbol">
          <VoxLoader filePath={rightFilePath} />
        </div>
        <p className="rightSwapName">{rightAsset?.name}</p>
      </div>
    </Draggable>
  ) : null;
}

export default SwapModal;
