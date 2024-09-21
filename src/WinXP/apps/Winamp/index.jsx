import React, { useEffect, useRef } from "react";
import Webamp from "webamp";
import { initialTracks } from "./config";
import "./index.css";

function Winamp({ onClose, onMinimize }) {
  const renderTarget = useRef(null);
  const webamp = useRef(null);
  if (webamp.current === null) {
    webamp.current = new Webamp({
      initialTracks,
    });
  }

  webamp.current.onClose(onClose);
  webamp.current.onMinimize(onMinimize);

  useEffect(() => {
    if (!renderTarget.current) {
      return;
    }
    webamp.current.renderWhenReady(renderTarget.current)
  }, []);

  return <div ref={renderTarget} id="winamp-container" />;
}

export default Winamp;
