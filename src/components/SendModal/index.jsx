import { useState } from "react";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "juno-network";
import { bech32 } from "bech32";

import { MEMOJI, EXPLORER_PATH, ADDRESS_LENGTH } from "src/constants";
import { CHAIN_ID } from "src/constants";
import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";
import overMp3 from "assets/sounds/btmouseover.mp3";
import sonicspin from "assets/img/sonicspin.png";
import "./index.css";

function SendModal({ isActive, balances, onSend }) {
  // Hooks
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const successSound = new Audio(successMp3);
  const overSound = new Audio(overMp3);
  const errorSound = new Audio(errorWav);
  const { address, isWalletConnected, getSigningStargateClient } =
    useChain("osmosis");

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [sendDenom, setSendDenom] = useState("");
  const [addressResolved, setAddressResolved] = useState(false);

  const playSound = (audio) => {
    if (!audio.paused) audio.currentTime = 0;
    audio.play().catch((err) => console.error("Sound playback failed:", err));
  };

  const isValidAddress = (address) => {
    try {
      const { prefix } = bech32.decode(address);
      return prefix === "osmo" && address.length === ADDRESS_LENGTH;
    } catch {
      return false;
    }
  };

  const sendAsset = async () => {
    if (!isWalletConnected || !addressResolved || !sendAmount || !sendDenom) {
      playSound(errorSound);
      onSend("Validation error or wallet not connected.");
      return;
    }

    playSound(promptSound);
    setIsLoading(true);

    try {
      const client = await getSigningStargateClient({ chainId: CHAIN_ID });
      if (!client) throw new Error("Failed to initialize client");

      const decimals = 6; // Adjust based on token metadata if needed
      const amount = [
        {
          denom: sendDenom,
          amount: String(Math.floor(sendAmount * Math.pow(10, decimals))),
        },
      ];

      const selectedBalance =
        balances?.find((b) => b.denom === sendDenom)?.amount || 0;
      if (sendAmount * Math.pow(10, decimals) > selectedBalance) {
        throw new Error("Insufficient balance");
      }

      const fee = {
        amount: [{ denom: "uosmo", amount: "5000" }],
        gas: "200000",
      };

      const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
      const msg = send({
        amount,
        toAddress,
        fromAddress: address,
      });

      const res = await client.signAndBroadcast(address, [msg], fee);
      if (res.code === 0) {
        playSound(successSound);
        onSend(
          "Success!",
          `${EXPLORER_PATH}/tx/${res.transactionHash}`,
          "View TXN"
        );
      } else {
        throw new Error(res.rawLog || "Transaction failed");
      }
    } catch (err) {
      playSound(errorSound);
      onSend(`Send failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemojiImage = () => {
    const denom = sendDenom.includes("factory/")
      ? sendDenom.split("/")[2]
      : sendDenom;
    return MEMOJI.find((m) => m.name === denom)?.image || null;
  };

  return isActive ? (
    <Draggable onMouseDown={() => playSound(clickSound)}>
      <div className="sendModal">
        <div className="form">
          {addressResolved ? (
            <span
              onClick={() => {
                setAddressResolved(false);
              }}
            >
              {toAddress.slice(0, 11)}....{toAddress.slice(37, ADDRESS_LENGTH)}
            </span>
          ) : (
            <input
              className="receiver"
              type="text"
              placeholder="Receiver"
              value={toAddress}
              onClick={(e) => {
                setAddressResolved(false);
                e.target.setSelectionRange(0, e.target.value.length);
              }}
              onChange={(e) => {
                const value = e.target.value;
                setToAddress(value);
                setAddressResolved(isValidAddress(value));
              }}
            />
          )}
          <input
            className="quantity"
            type="number"
            placeholder="Quantity"
            value={sendAmount}
            onClick={() => setSendAmount("")}
            onChange={(e) => {
              setSendAmount(e.target.value);
            }}
          />
          <div className="memoji">
            {sendDenom && <img src={getMemojiImage()} alt="Memoji" />}
          </div>
          <select
            placeholder="Memoji"
            value={sendDenom}
            onChange={(e) => {
              setSendDenom(e.target.value);
            }}
          >
            <option value="">Select...</option>
            {balances?.map((b) => (
              <option key={b.denom} value={b.denom}>
                {b.name}
              </option>
            ))}
          </select>
          {isLoading ? (
            <img className="loading" src={sonicspin} alt="Loading" />
          ) : (
            <>
              <button
                className="cancelButton"
                onClick={() => onSend(null)}
              ></button>
              <button
                disabled={
                  !toAddress || !sendAmount || !sendDenom || !addressResolved
                }
                className="sendButton"
                onClick={sendAsset}
              ></button>
            </>
          )}
        </div>
      </div>
    </Draggable>
  ) : null;
}

export default SendModal;
