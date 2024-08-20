import { useEffect } from "react";
import useSound from "use-sound";
import Draggable from "react-draggable";

import { WalletModalProps } from "@cosmos-kit/core";

import clickMp3 from "assets/sounds/btclick.mp3";
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

import "./index.css"

function WalletSelect({ isOpen, setOpen, walletRepo }: WalletModalProps) {
    //hooks
    const [clickSound] = useSound(clickMp3);

    // state

    // effects
    useEffect(() => {

    }, []);

    function onCloseModal() {
        setOpen(false);
    }

    return isOpen ?  <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            center
            showCloseIcon={false}
            classNames={{
              overlay: 'walletSelectOverlay',
              modal: 'walletSelectModal',
            }}
        >
            <div className="header"></div>
            {walletRepo?.wallets.map(({ walletName, connect }) => (
                <div key={walletName} className="option">
                    <div className="icon"><img></img></div>
                    <div className="name">
                        <div className="textbox"></div>
                <button
                    className={walletName}
                    onClick={async () => {
                        await connect()
                        setOpen(false)
                    }}
                >
                </button></div>
                </div>
            ))}
        </Modal> : null
}

export { WalletSelect };
