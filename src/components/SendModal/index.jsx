import { useState, useEffect } from "react";
import useSound from "use-sound";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";

import smolguy from "./smolguy.png";
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

function SendModal({ isActive }) {
  //hooks
  const [promptSound] = useSound(promptMp3);
  const [clickSound] = useSound(clickMp3);
  const [successSound] = useSound(successMp3);
  const [overSound] = useSound(overMp3);
  const [errorSound] = useSound(errorWav);
  const playOverSound = throttle(overSound, 100);
  const { address, isWalletConnected, getSigningCosmWasmClient } =
    useChain("unicorn");

  // state
  const [isLoading, setIsLoading] = useState(false);

  // effects
//   useEffect(() => {
//     setLeftAsset(left);
//     setRightAsset(right);
//   }, [left, right]);

  const sendAsset = async () => {
    if (isWalletConnected) {
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
        successSound();
        alert(`Success, transaction hash: ${res.transactionHash}`);
        onSwap();
        onClose();
      } catch (err) {
        errorSound()
        alert(`swap failed with error: ${err}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please connect a wallet");
    }
  };

  return isActive  ? (
    <Draggable onMouseDown={clickSound}>
      <div className="">

        <img src={smolguy} />
        
      </div>
    </Draggable>
  ) : null;
}

export default SendModal;
