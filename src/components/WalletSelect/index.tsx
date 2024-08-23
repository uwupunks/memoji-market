
import useSound from "use-sound";

import { WalletModalProps } from "@cosmos-kit/core";

import clickMp3 from "assets/sounds/btclick.mp3";
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

import overMp3 from "assets/sounds/btmouseover.mp3";

import { throttle } from 'lodash';

import "./index.css"

function WalletSelect({ isOpen, setOpen, walletRepo }: WalletModalProps) {
    //hooks
    const [clickSound] = useSound(clickMp3);

    const [overSound] = useSound(overMp3);

    const playOverSound = throttle(overSound, 100)

    return isOpen ? <Modal
        open={isOpen}
        onClose={() => setOpen(false)}
        center
        showCloseIcon={false}
        classNames={{
            overlay: 'walletSelectOverlay',
            modal: 'walletSelectModal',
        }}

    >

        <div className="header" onMouseDown={() => clickSound()}></div>
        {walletRepo?.wallets.map(({ walletName, connect }) => (

            <div key={walletName} className={'option ' + walletName}
                onClick={async () => {
                    await connect()
                    setOpen(false)
                }}
                onMouseEnter={() => playOverSound()}
                onMouseDown={() => clickSound()}>
                <div className="icon-bg"><div className="icon"></div></div>
                <div className="name">
                    <div className="textbox">
                        <div className={walletName}></div>
                    </div>
                    <button
                    >
                    </button>
                </div>
                <div className="spacer"></div>
            </div>
        ))
        }
        <div className="option disabled" onMouseDown={() => clickSound()}>
            <div className="icon-bg"><div className="icon"></div></div>
            <div className="name">
                <div className="textbox">
                </div>
                <button>
                </button>
            </div>
            <div className="spacer"></div>
        </div>
        <div className="option disabled" onMouseDown={() => clickSound()}>
            <div className="icon-bg"><div className="icon"></div></div>
            <div className="name">
                <div className="textbox">
                </div>
                <button>
                </button>
            </div>
        </div>
        <div className="option disabled" onMouseDown={() => clickSound()}>
            <div className="icon-bg"><div className="icon"></div></div>
            <div className="name">
                <div className="textbox">
                </div>
                <button>
                </button>
            </div>
        </div>
    </Modal > : null
}

export { WalletSelect };
