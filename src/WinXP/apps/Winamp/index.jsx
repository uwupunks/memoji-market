import React, { useEffect, useRef } from "react";
import Webamp from "webamp";
import { initialTracks } from "./config";
import "./index.css";
import unicorn from "./unicorn.wsz";
import rock_unicorn from "./rock_unicorn.wsz";

function Winamp({ onClose, onMinimize }) {
  const renderTarget = useRef(null);
  const webamp = useRef(null);
  if (webamp.current === null) {
    webamp.current = new Webamp({
      initialTracks,
      initialSkin: { url: rock_unicorn },
      availableSkins: [
        { url: rock_unicorn, name: "Rock Unicorn" },
        { url: unicorn, name: "Unicorn" },
      ],
      __initialWindowLayout: {
        main: { position: { x: 800, y: 300 } },
        equalizer: { position: { x: 800, y: 415 } },
        playlist: { position: { x: 800, y: 520 } },
      },
    });
  }

  webamp.current.onClose(onClose);
  webamp.current.onMinimize(onMinimize);

  useEffect(() => {
    if (!renderTarget.current) {
      return;
    }

    // Handler to start playback after first click
    const handleFirstInteraction = () => {
      webamp.current.play();
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);

    webamp.current.renderWhenReady(renderTarget.current);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  return <div ref={renderTarget} id="winamp-container" />;
}

export default Winamp;
