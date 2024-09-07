import Draggable from "react-draggable";

import clickMp3 from "assets/sounds/btclick.mp3";

import "./index.css";

function AlertModal({ isActive, message, link, linkText, onClose }) {
  const clickSound = new Audio(clickMp3);

  return isActive ? (
    <Draggable onMouseDown={() => clickSound.play()}>
      <div id="alertModal">
        <p style={{overflowY: message?.length > 50 ? "scroll" : "clip"}}>
          {message || "Close Me"}
          {link ? (
            <a target="_blank" href={link}>
              {linkText}
            </a>
          ) : null}
        </p>
        <button onClick={onClose} onTouchStart={onClose}></button>
      </div>
    </Draggable>
  ) : null;
}

export default AlertModal;
