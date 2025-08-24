import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";

import VoxLoader from "components/VoxLoader";
import { CHAIN_ID, EXPLORER_PATH } from "src/constants";

import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import sonicspin from "assets/img/sonicspin.png";

//force module load
console.log(SigningCosmWasmClient);

function SwapModal({
  left,
  right,
  price,
  isActive,
  onClose,
  onSwap,
  balances,
}) {
  //hooks
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const successSound = new Audio(successMp3);
  const errorSound = new Audio(errorWav);
  const { address, isWalletConnected, getSigningCosmWasmClient } =
    useChain("osmosis");

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

  const handleLeftInputChange = (e) => {
    setLeftAsset((prev) => ({ ...prev, amount: e.target.value }));
    setRightAsset((prev) => ({
      ...prev,
      amount:
        rightAsset.denom.endsWith("uowo")
          ? (e.target.value * price).toFixed(4)
          : (e.target.value / price).toFixed(4),
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
  function buildSwapMessage(
    senderAddress,
    poolId,
    inputAmount,
    inputDenom,
    outputDenom,
    minOutputAmount
  ) {
    const swapMessage = {
      fromAddress: senderAddress,
      toAddress: senderAddress, // Assuming you want to send it back to yourself
      routes: [
        {
          poolId: poolId,
          tokenIn: {
            amount: inputAmount.toString(),
            denom: inputDenom,
          },
          tokenOut: {
            denom: outputDenom,
          },
        },
      ],
      minAmountOut: minOutputAmount.toString(),
    };
    return swapMessage;
  }
  const swapAssets = async () => {
    if (isWalletConnected && leftAsset.denom && rightAsset.denom) {
      setIsLoading(true);
      const client = await getSigningCosmWasmClient({chainId: CHAIN_ID});

      let swapMessage = buildSwapMessage(
        address,
        balances?.find((b) => b.name === leftAsset.name)?.poolId,
        leftAsset.amount * Math.pow(10, 6),
        leftAsset.denom,
        rightAsset.denom,
        // Set minimum output amount to 95% of expected to account for slippage
        (rightAsset.amount * 0.95 * Math.pow(10, 6)).toFixed(0)
      );

      try {
        const res = await client.execute(address, 'osmosis.gamm.v1beta1.SwapExactAmountIn', swapMessage, "auto");
        successSound.onended = () =>
          onSwap(
            "Success!",
            `${EXPLORER_PATH}/tx/${res.transactionHash}`,
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
      tempLeft.denom.endsWith("uowo")
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
