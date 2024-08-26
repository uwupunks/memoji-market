import { useState, useEffect } from "react";
import useSound from "use-sound";
import Draggable from "react-draggable";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "juno-network";

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
import "./index.css";

//force module load
console.log(SigningCosmWasmClient);

function SendModal({ isActive, balances, onSend }) {
  //hooks
  const [promptSound] = useSound(promptMp3);
  const [clickSound] = useSound(clickMp3);
  const [successSound] = useSound(successMp3);
  const [overSound] = useSound(overMp3);
  const [errorSound] = useSound(errorWav);
  const playOverSound = throttle(overSound, 100);
  const { address, isWalletConnected, getSigningStargateClient } =
    useChain("unicorn");

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [toAddress, setToAddress] = useState("");
  const [sendDenom, setSendDenom] = useState("");

  const sendAsset = async () => {
    if (isWalletConnected && toAddress && sendAmount && sendDenom) {
      promptSound();
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
          successSound();
          alert(`Success, transaction hash: ${res.transactionHash}`);
          onSend();
        } else {
          throw new Error(res.rawLog);
        }
      } catch (err) {
        errorSound();
        alert(`send failed with error: ${err}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please connect a wallet");
    }
  };

  return isActive ? (
    <Draggable onMouseDown={clickSound}>
      <div className="sendModal">
        <div className="form">
          <input
            type="text"
            placeholder="Receiver"
            value={toAddress}
            onClick={() => setToAddress("")}
            onChange={(e) => {
              setToAddress(e.target.value);
            }}
          ></input>
          <input
            type="number"
            placeholder="Quantity"
            value={sendAmount}
            onClick={() => setSendAmount("")}
            onChange={(e) => {
              setSendAmount(e.target.value);
            }}
          ></input>
          <select
            placeholder="Memoji"
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
          {isLoading ? <img className="loading" src={sonicspin}></img> : <button
            disabled={!toAddress || !sendAmount || !sendDenom || !toAddress}
            className="sendButton"
            onClick={sendAsset}
          ></button>}
        </div>
      </div>
    </Draggable>
  ) : null;
}

export default SendModal;
