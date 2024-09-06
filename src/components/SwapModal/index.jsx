import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";

import VoxLoader from "components/VoxLoader";
import { CONTRACTS } from "src/constants";

import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { throttle } from "lodash";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import sonicspin from "assets/img/sonicspin.png";

//force module load
console.log(SigningCosmWasmClient);

function SwapModal({ left, right, price, isActive, onClose, onSwap }) {
  //hooks
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const successSound = new Audio(successMp3);
  const overSound = new Audio(overMp3);
  const errorSound = new Audio(errorWav);
  const { address, isWalletConnected, getSigningCosmWasmClient } =
    useChain("unicorn");

  // state
  const [leftAsset, setLeftAsset] = useState(left);
  const [rightAsset, setRightAsset] = useState(right);
  const [leftFilePath, setLeftFilePath] = useState();
  const [rightFilePath, setRightFilePath] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
        const res = await client.execute(
          address,
          CONTRACTS.swap,
          msg,
          "auto",
          "",
          [
            {
              denom: String(leftAsset.denom),
              amount: String(leftAsset.amount * Math.pow(10, 6)),
            },
          ]
        );
        successSound.onended = () =>
          onSwap(
            "Success!",
            `https://uwu.direct/Unicorn/tx/${res.transactionHash}`,
            "View TXN"
          );
        await successSound.play();

        onClose();
      } catch (err) {
        errorSound.onended = () => onSwap(`swap failed with error: ${err}`);
        await errorSound.play();
        onClose();
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      onSwap("Please connect a wallet");
      onClose();
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
    <Draggable onMouseDown={() => clickSound.play()}>
      <div className="swapWindow">
{/* todo: low liq alert */}
        {isLoading ? (
          <img className="swapLoading" src={sonicspin}></img>
        ) : (
          <div
            className="tradeSwap"
            id="trade"
            onClick={() => swapAssets()}
            onMouseDown={() => promptSound.play()}
            onMouseEnter={() => overSound.play()}
          />
        )}
        <div
          onClick={() => switchSwapPlace()}
          className="switchSwap"
          id="swap"
          onMouseEnter={() => overSound.play()}
        />
        <div
          className="cancelSwap"
          id="cancel"
          onClick={() => {
            setIsLoading(false);
            onClose();
          }}
          onMouseEnter={() => overSound.play()}
        />
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
