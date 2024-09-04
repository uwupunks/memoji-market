import React, { useState } from "react";
import genClose from "assets/img/closepress.png";
import genClose2 from "assets/img/closepress2.png";
import genMin from "assets/img/minipress.png";
import genMin2 from "assets/img/minipress2.png";
import keygenVideo from "assets/video/keygen-video.mp4"
import keygenPoster from "assets/video/keygen-poster.png"

import "./index.css"

function Keygen({ onClose, onMinimize, patched }) {
  const [min, setMin] = useState(0);
  const [close, setClose] = useState(0);

  const swapWindows = () => {
    let webampWindow = document.getElementById("webamp");
    let webampIcon = document.getElementById("WinampIcon");
    let webampMenu = document.getElementById("Winampmenu");
    let crackedWindow = document.getElementById("Cracked");
    let crackedMenu = document.getElementById("Crackedmenu");
    let crackedIcon = document.getElementById("CrackedIcon");
    let browserWindow = document.getElementById("Unicorn");
    let browserIcon = document.getElementById("UnicornIcon");
    let keygenWindow = document.getElementById("Keygen");
    let keygenIcon = document.getElementById("KeygenIcon");
    let keygenMenu = document.getElementById("Keygenmenu");
    let unicornMenu = document.getElementById("Unicornmenu");

    webampWindow.style.display = "initial";
    webampIcon.style.display = "initial";
    webampMenu.style.display = "initial";
    crackedWindow.style.display = "initial";
    crackedMenu.style.display = "initial";
    crackedIcon.style.display = "initial";
    browserIcon.style.display = "none";
    browserWindow ? (browserWindow.style.display = "none") : null;
    keygenMenu.style.display = "none";
    keygenWindow.style.display = "none";
    keygenIcon.style.display = "none";
    unicornMenu.style.display = "none";
  };

  return (
    <>
      <span
        className="genButtons"
        style={{
          zIndex: "99 !important",
          pointerEvents: "fill",
          cursor: "pointer",
        }}
      >
        {min === 0 ? (
          <>
            <img onMouseEnter={() => setMin(1)} src={genMin} />
          </>
        ) : (
          <>
            <img
              onMouseOut={() => setMin(0)}
              src={genMin2}
              onClick={() => onMinimize(onMinimize)}
            />
          </>
        )}
        {close === 0 ? (
          <>
            <img onMouseEnter={() => setClose(1)} src={genClose} />
          </>
        ) : (
          <>
            <img
              onMouseOut={() => setClose(0)}
              onClick={() => onClose(onClose)}
              src={genClose2}
            />
          </>
        )}
      </span>
      <div className="keygenWindow" style={{ zIndex: "97" }}>
        <div className="rainbow-box">
          <video loop muted autoPlay playsInline poster={keygenPoster}>
            <source src={keygenVideo} type="video/mp4" />
            Unicorn Black Market
          </video>
        </div>
        <div className="genInputs">
          <p>Program:</p>
          <span className="versionBox">
            <input
              id="version"
              type="none"
              placeholder="uWu Blk Mrkt v21.320"
              disabled
            />
            <p>&#8681;</p>
          </span>
          <p>User Code 1</p>
          <input />
          <p>User Code 2</p>
          <input />
          <p>Authorization Code 1</p>
          <input placeholder="Please enter your user code !" />
          <p>Authorization Code 2</p>
          <input placeholder="Please enter your user code !" />
        </div>
        <div className="bottomText">
          <p onClick={() => swapWindows()}>Patch Host File</p>
          <p>Generate</p>
          <p onClick={() => onClose(onClose)}>Exit</p>
        </div>
      </div>
    </>
  );
}

export default Keygen;
