import clickMp3 from "assets/sounds/btclick.mp3";
import promptMp3 from "assets/sounds/prompt.mp3";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import overMp3 from "assets/sounds/btmouseover.mp3";

import { isMobile } from "react-device-detect";

import "./index.css";

const suggest = async () => {
  const chainInfo = {
    chainId: "osmosis-1",
    chainName: "Osmosis",
    rest: "https://lcd.osmosis.zone",
    rpc: "https://rpc.osmosis.zone",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "osmo",
      bech32PrefixAccPub: "osmopub",
      bech32PrefixValAddr: "osmovaloper",
      bech32PrefixValPub: "osmovaloperpub",
      bech32PrefixConsAddr: "osmovalcons",
      bech32PrefixConsPub: "osmovalconspub",
    },
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinGeckoId: "osmosis",
        coinImageUrl: "https://assets.coingecko.com/coins/images/16724/small/osmo.png",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        gasPriceStep: {
          low: 0.0025,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
    },
    features: ["ibc-transfer", "ibc-go", "cosmwasm"],
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
              await suggest();
              await connect();
              setOpen(false);
            } catch (err) {
              window.alert(err);
              console.error(err);
            }
          }}
          onMouseEnter={() => new Audio(overMp3).play()}
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
