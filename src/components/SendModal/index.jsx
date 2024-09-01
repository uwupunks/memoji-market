import { useState } from "react";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "juno-network";

import { MEMOJI } from "src/constants";
import promptMp3 from "assets/sounds/prompt.mp3";
import clickMp3 from "assets/sounds/btclick.mp3";
import successMp3 from "assets/sounds/success.mp3";
import errorWav from "assets/sounds/error.wav";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { throttle } from "lodash";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import sonicspin from "assets/img/sonicspin.png";
import "./index.css";

//force module load
console.log(SigningCosmWasmClient);

function SendModal({ isActive, balances, onSend }) {
  //hooks
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const successSound = new Audio(successMp3);
  const overSound = new Audio(overMp3);
  const errorSound = new Audio(errorWav);
  const { address, isWalletConnected, getSigningStargateClient } =
    useChain("unicorn");

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [sendDenom, setSendDenom] = useState("");
  const [addressResolved, setAddressResolved] = useState(false);

  const sendAsset = async () => {
    if (isWalletConnected && addressResolved && sendAmount && sendDenom) {
      promptSound.play();
      setIsLoading(true);
      const client = await getSigningStargateClient();

      const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

      try {
        const msg = send({
          amount: [
            {
              denom: sendDenom,
              amount: String(sendAmount * Math.pow(10, 6)),
            },
          ],
          toAddress: toAddress,
          fromAddress: address,
        });

        const fee = {
          amount: [
            {
              denom: "uwunicorn",
              amount: "2576",
            },
          ],
          gas: "103005",
        };
        const res = await client.signAndBroadcast(address, [msg], fee);

        /** Error code. The transaction succeeded if and only if code is 0. */
        if (res.code === 0) {
          setIsLoading(false);
          successSound.play();
          alert(`Success, transaction hash: ${res.transactionHash}`);
          onSend();
        } else {
          throw new Error(res.rawLog);
        }
      } catch (err) {
        setIsLoading(false);
        errorSound.play();
        alert(`send failed with error: ${err}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Validation Error or wallet not connected.");
    }
  };

  return isActive ? (
    <Draggable onMouseDown={() => clickSound.play()}>
      <div className="sendModal">
        <div className="form">
          {addressResolved ? (
            <span
              onClick={() => {
                setAddressResolved(false);
              }}
            >
              {toAddress.slice(0, 11)}....
              {toAddress.slice(40, 46)}
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
                setToAddress(e.target.value);
                setAddressResolved(e.target.value.length === 46);
              }}
            ></input>
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
          ></input>
          <div className="memoji">
            <img
              src={
                sendDenom &&
                MEMOJI.find(
                  (m) => (sendDenom.split("/")?.[2] || "uwunicorn") === m.name
                )?.image
              }
            ></img>
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
              <option key={b.name} value={b.denom}>
                {b.name}
              </option>
            ))}
          </select>
          {isLoading ? (
            <img className="loading" src={sonicspin}></img>
          ) : (
            <>
              <button className="cancelButton" onClick={onSend}></button>
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
