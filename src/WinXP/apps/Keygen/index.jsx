import React, { useState, useEffect, useRef } from "react";
import genClose from "assets/img/closepress.png";
import genClose2 from "assets/img/closepress2.png";
import genMin from "assets/img/minipress.png";
import genMin2 from "assets/img/minipress2.png";
import keygenVideo from "assets/video/keygen-video.mp4";
import keygenPoster from "assets/video/keygen-poster.png";
import winxpStormy from "assets/img/bg-winxp-stormy.jpeg";
import song from "assets/music/moonflight.mp3";

import "./index.css";

function Keygen({ onClose, onMinimize, patched }) {
  const [min, setMin] = useState(0);
  const [close, setClose] = useState(0);
  // start music
  const audioRef = useRef(new Audio(song));
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const swapWindows = () => {
    let webampWindow = document.getElementById("webamp");
    let webampIcon = document.getElementById("WinampIcon");
    let webampMenu = document.getElementById("Winampmenu");
    let crackedWindow = document.getElementById("Cracked");
    let crackedMenu = document.getElementById("Crackedmenu");
    let crackedIcon = document.getElementById("CrackedIcon");
    let keygenWindow = document.getElementById("Keygen");
    let keygenIcon = document.getElementById("KeygenIcon");
    let keygenMenu = document.getElementById("Keygenmenu");
    let desktop = document.getElementsByClassName("winxp")?.[0];

    // Stop music
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    if (desktop) {
      desktop.style.background = `url(${winxpStormy}) no-repeat center center fixed`;
    }

    if (webampWindow) webampWindow.style.display = "initial";
    if (webampIcon) webampIcon.style.display = "initial";
    if (webampMenu) webampMenu.style.display = "initial";
    if (crackedWindow) crackedWindow.style.display = "initial";
    if (crackedMenu) crackedMenu.style.display = "initial";
    if (crackedIcon) crackedIcon.style.display = "initial";
    if (keygenMenu) keygenMenu.style.display = "none";
    if (keygenWindow) keygenWindow.style.display = "none";
    if (keygenIcon) keygenIcon.style.display = "none";
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
          <img
            onMouseEnter={() => setMin(1)}
            src={genMin}
            alt="Minimize"
          />
        ) : (
          <img
            onMouseOut={() => setMin(0)}
            src={genMin2}
            onClick={() => onMinimize(onMinimize)}
            alt="Minimize Active"
          />
        )}
        {close === 0 ? (
          <img
            onMouseEnter={() => setClose(1)}
            src={genClose}
            alt="Close"
          />
        ) : (
          <img
            onMouseOut={() => setClose(0)}
            onClick={() => onClose(onClose)}
            src={genClose2}
            alt="Close Active"
          />
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
