import clickMp3 from "assets/sounds/btclick.mp3";
import promptMp3 from "assets/sounds/prompt.mp3";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { isMobile } from "react-device-detect";

import "./index.css";

const suggest = async () => {
  const chainInfo = {
    chainId: "unicorn-420",
    chainName: "unicorn",
    rest: "https://rest.unicorn.meme",
    rpc: "https://rpc.unicorn.meme",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "unicorn",
      bech32PrefixAccPub: "unicorn" + "pub",
      bech32PrefixValAddr: "unicorn" + "valoper",
      bech32PrefixValPub: "unicorn" + "valoperpub",
      bech32PrefixConsAddr: "unicorn" + "valcons",
      bech32PrefixConsPub: "unicorn" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "UWU",
        coinMinimalDenom: "uwunicorn",
        coinDecimals: 6,
        coinImageUrl:
          "https://bafkreid2zugjmwborka6qt4mxlb3vepnnxj344dtyaf4gmdsogzd2dh2a4.ipfs.w3s.link",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "🦄",
        coinMinimalDenom: "uwunicorn",
        coinDecimals: 6,
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "🦄",
      coinMinimalDenom: "uwunicorn",
      coinDecimals: 6,
    },
    features: ["cosmwasm"],
  };

  if (window.keplr) {
    await window.keplr.experimentalSuggestChain(chainInfo);
  }
  if (window.leap) {
    await window.leap.experimentalSuggestChain(chainInfo);
  }
};

function WalletSelect({ isOpen, setOpen, walletRepo }) {
  const promptSound = new Audio(promptMp3);
  const clickSound = new Audio(clickMp3);
  const overSound = new Audio(overMp3);

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      center
      showCloseIcon={false}
      classNames={{
        overlay: "walletSelectOverlay",
        modal: "walletSelectModal",
      }}
    >
      <div className="header" onMouseDown={() => clickSound.play()}></div>
      {walletRepo?.wallets.map(({ walletName, connect }) => (
        <div
          key={walletName}
          className={"option " + walletName}
          onClick={async () => {
            promptSound.play();
            try {
              const res = await suggest();
              await connect();
            } catch (err) {
              window.alert(err);
              console.error(err);
            }
            setOpen(false);
          }}
          onMouseEnter={() => overSound.play()}
          onMouseDown={() => clickSound.play()}
        >
          <div className="icon-bg">
            <div className="icon"></div>
          </div>
          <div className="name">
            <div className="textbox">
              <div className={walletName}></div>
            </div>
            <button></button>
          </div>
          <div className="spacer"></div>
        </div>
      ))}
      {!isMobile ? (
        <>
          <div
            className="option disabled"
            onMouseDown={() => clickSound.play()}
          >
            <div className="icon-bg">
              <div className="icon"></div>
            </div>
            <div className="name">
              <div className="textbox"></div>
              <button></button>
            </div>
            <div className="spacer"></div>
          </div>
          <div
            className="option disabled"
            onMouseDown={() => clickSound.play()}
          >
            <div className="icon-bg">
              <div className="icon"></div>
            </div>
            <div className="name">
              <div className="textbox"></div>
              <button></button>
            </div>
          </div>
          <div
            className="option disabled"
            onMouseDown={() => clickSound.play()}
          >
            <div className="icon-bg">
              <div className="icon"></div>
            </div>
            <div className="name">
              <div className="textbox"></div>
              <button></button>
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  ) : null;
}

export { WalletSelect };
