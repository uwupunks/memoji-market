import React, { useState, useEffect, useRef } from "react";
import genClose from "assets/img/closepress.png";
import genClose2 from "assets/img/closepress2.png";
import genMin from "assets/img/minipress.png";
import genMin2 from "assets/img/minipress2.png";
import keygenVideo from "assets/video/keygen-video.mp4";
import keygenPoster from "assets/video/keygen-poster.png";
import winxpStormy from "assets/img/bg-winxp-stormy.jpeg";
import song from "assets/music/moonflight.mp3";
import { appSettings } from "src/WinXP/apps";
import "./index.css";

import Winamp from "../Winamp";
import Cracked from "../Cracked";
import crackedIcon from "assets/windowsIcons/cracked.png";
import winamp from "assets/windowsIcons/winamp.png";

function Keygen({ onClose, onMinimize, dispatch, id }) {
  const [min, setMin] = useState(0);
  const [close, setClose] = useState(0);

  const audio = new Audio(song);
  audio.loop = true;

  // start music
  useEffect(() => {
    const tryToPlay = setInterval(() => {
      audio
        .play()
        .then(() => {
          clearInterval(tryToPlay);
        })
        .catch((error) => {
          console.info("User has not interacted with document yet.");
        });
    }, 2500);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(tryToPlay);
    };
  }, []);

  const swapWindows = () => {
    let desktop = document.getElementsByClassName("winxp")?.[0];
    if (desktop) {
      desktop.style.background = `url(${winxpStormy}) no-repeat center center fixed`;
    }

    // Stop music
    audio.pause();
    audio.currentTime = 0;

    dispatch({ type: "ADD_APP", payload: appSettings["Cracked"] });
    dispatch({ type: "ADD_APP", payload: appSettings["Winamp"] });

    dispatch({ type: "DEL_APP", payload: id });
    dispatch({
      type: "ADD_ICONS",
      payload: [
        {
          id: 2,
          icon: crackedIcon,
          title: "Cracked",
          component: Cracked,
          isFocus: false,
        },
        {
          id: 3,
          icon: winamp,
          title: "Winamp",
          component: Winamp,
          isFocus: false,
        },
      ],
    });

    onClose();
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
          <img onMouseEnter={() => setMin(1)} src={genMin} alt="Minimize" />
        ) : (
          <img
            onMouseOut={() => setMin(0)}
            src={genMin2}
            onClick={() => onMinimize(onMinimize)}
            alt="Minimize Active"
          />
        )}
        {close === 0 ? (
          <img onMouseEnter={() => setClose(1)} src={genClose} alt="Close" />
        ) : (
          <img
            onMouseOut={() => setClose(0)}
            onClick={() => onClose()}
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
          <p onClick={() => onClose()}>Exit</p>
        </div>
      </div>
    </>
  );
}

export default Keygen;
