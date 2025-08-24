import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";

import VoxLoader from "components/VoxLoader";
import { SERVER, EXPLORER_PATH, RPC } from "src/constants";
import { osmosis, getSigningOsmosisClient } from "osmojs";
import { coin } from "@cosmjs/amino";
import axios from "axios";

import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";

import overMp3 from "assets/sounds/btmouseover.mp3";

import sonicspin from "assets/img/sonicspin.png";
import { CHAIN_ID } from "../../constants";

const { swapExactAmountIn } = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;
const playSound = async (sound) => {
  try {
    await sound.play();
  } catch (err) {
    console.warn("Audio playback failed:", err);
  }
};

function SwapModal({ left, right, isActive, onClose, onSwap, balances }) {
  //hooks
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const successSound = new Audio(successMp3);
  const errorSound = new Audio(errorWav);
  const { address, isWalletConnected, getOfflineSigner } = useChain("osmosis");

  // state
  const [leftAsset, setLeftAsset] = useState(left);
  const [rightAsset, setRightAsset] = useState(right);
  const [leftFilePath, setLeftFilePath] = useState();
  const [rightFilePath, setRightFilePath] = useState();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // effects

  useEffect(() => {
    const fetchPoolPrice = async () => {
      if (!leftAsset.denom || !rightAsset.denom || !balances) return;
      try {
        const poolId = balances.find(
          (b) => b.denom === leftAsset.denom
        )?.poolId;
        if (!poolId) {
          console.warn("Pool ID not found");
          setPrice(0);
          return;
        }

        // Query Osmosis LCD for pool data
        const response = await axios.get(
          `${SERVER}/osmosis/gamm/v1beta1/pools/${poolId}`
        );
        const pool = response.data.pool;

        // Extract token reserves
        const token0 = pool.pool_assets[0].token;
        const token1 = pool.pool_assets[1].token;
        const isForward = leftAsset.denom === token0.denom;
        const reserveIn = isForward ? token0.amount : token1.amount;
        const reserveOut = isForward ? token1.amount : token0.amount;

        // Calculate spot price (reserveOut / reserveIn)
        const spotPrice = parseFloat(reserveOut) / parseFloat(reserveIn);

        // Adjust for swap fee (e.g., 0.3% = 0.003)
        const swapFee = parseFloat(pool.pool_params.swap_fee) / 1e18 || 0.003;
        const effectivePrice = spotPrice * (1 - swapFee);
        const leftAmount = leftAsset?.amount;
        if (isNaN(leftAmount) || leftAmount < 0) return; // Ignore invalid inputs

        setPrice(effectivePrice);
        setRightAsset((prev) => ({
          ...prev,
          amount: rightAsset.denom.endsWith("uowo")
            ? (leftAmount * effectivePrice).toFixed(4)
            : (leftAmount / effectivePrice).toFixed(4),
        }));
        console.log("Fetched price:", effectivePrice);
      } catch (err) {
        console.error("Failed to fetch pool price:", err);
        setPrice(0);
      }
    };

    fetchPoolPrice();
  }, [leftAsset?.denom, rightAsset?.denom, balances]);

  useEffect(() => {
    setLeftAsset(left);
    setRightAsset(right);
  }, [left, right, price]);
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
      try {
        const left = (await import(`../../assets/vox/${leftAsset?.name}.vox`))
          .default;
        setLeftFilePath(left);
      } catch {
        setLeftFilePath(null);
        console.warn(`Failed to load .vox file for ${leftAsset?.name}`);
      }
    };
    if (leftAsset?.name) {
      resolveVoxPaths();
    }
  }, [leftAsset?.name]);

  const handleLeftInputChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value < 0) return; // Ignore invalid inputs
    setLeftAsset((prev) => ({ ...prev, amount: value }));
    setRightAsset((prev) => ({
      ...prev,
      amount: rightAsset.denom.endsWith("uowo")
        ? (value * price).toFixed(4)
        : (value / price).toFixed(4),
    }));
  };

  const handleMax = () => {
    const maxAmount =
      balances?.find((b) => b.name === leftAsset.name)?.amountRaw || "";
    setLeftAsset((prev) => ({
      ...prev,
      amount: maxAmount,
    }));
    handleLeftInputChange({ target: { value: maxAmount } });
  };
  const handleCancel = () => {
    setIsLoading(false);
    onClose();
  };

  const swapAssets = async () => {
    if (
      !isWalletConnected ||
      !address ||
      !leftAsset.denom ||
      !rightAsset.denom
    ) {
      playSound(errorSound);
      onSwap("Please connect a wallet and select valid assets");
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      const client = await getSigningOsmosisClient({
        rpcEndpoint: RPC,
        signer: getOfflineSigner({ chainId: CHAIN_ID }),
      });
      const poolId = balances?.find((b) => b.name === leftAsset.name)?.poolId;
      if (!poolId) {
        playSound(errorSound);
        onSwap("Invalid pool ID for the selected asset pair");
        setIsLoading(false);
        return;
      }

      const amount = (leftAsset.amount * Math.pow(10, 6)).toString();

      const msg = swapExactAmountIn({
        sender: address,
        routes: [
          {
            poolId,
            tokenOutDenom: rightAsset.denom,
          },
        ],
        tokenIn: coin(amount, leftAsset.denom),
        tokenOutMinAmount: (rightAsset.amount * 0.95 * Math.pow(10, 6))
          .toFixed(0)
          .toString(),
      });
      const fee = {
        amount: [coin("0", "uosmo")],
        gas: "250000",
      };
      debugger;

      const res = await client.signAndBroadcast(address, [msg], fee);

      if (res.code === 0) {
        playSound(successSound);
        onSwap(
          "Success!",
          `${EXPLORER_PATH}/tx/${res.transactionHash}`,
          "View TXN"
        );
      } else {
        throw new Error(res.rawLog || "Transaction failed");
      }
      onClose();
    } catch (err) {
      console.error("Swap failed:", err);
      await playSound(errorSound);
      onSwap(`Swap failed: ${err.message}`);
      onClose();
    } finally {
      setIsLoading(false);
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
    tempLeft.amount = tempLeft.denom.endsWith("uowo")
      ? (leftAsset.amount * price).toFixed(4)
      : (leftAsset.amount / price).toFixed(4);

    setLeftAsset(tempRight);
    setRightAsset(tempLeft);
    setLeftFilePath(tempRightFilePath);
    setRightFilePath(tempLeftFilePath);
  };

  return isActive ? (
    <Draggable onMouseDown={() => clickSound.play()}>
      <div className="swapWindow">
        {isLoading ? (
          <img className="swapLoading" src={sonicspin}></img>
        ) : (
          <div
            className="tradeSwap"
            id="trade"
            onTouchStart={() => swapAssets()}
            onClick={() => swapAssets()}
            onMouseDown={() => promptSound.play()}
            onMouseEnter={() => new Audio(overMp3).play()}
          />
        )}
        <div
          onTouchStart={() => switchSwapPlace()}
          onClick={() => switchSwapPlace()}
          className="switchSwap"
          id="swap"
          onMouseEnter={() => new Audio(overMp3).play()}
        />
        <div
          className="cancelSwap"
          id="cancel"
          onTouchStart={handleCancel}
          onClick={handleCancel}
          onMouseEnter={() => new Audio(overMp3).play()}
        />
        <input
          className="inputNumbers"
          id="leftInput"
          value={leftAsset?.amount ?? ""}
          inputMode="numeric"
          onTouchStart={(e) => {
            e.target.focus();
          }}
          onChange={handleLeftInputChange}
          type="number"
        />
        <button
          className="max"
          onTouchStart={handleMax}
          onClick={handleMax}
          onMouseEnter={() => new Audio(overMp3).play()}
        ></button>
        <input
          className="inputNumbers"
          id="rightInput"
          value={rightAsset?.amount ?? ""}
          inputMode="numeric"
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
