import React, { useRef, memo, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import rt from "../../assets/extra/window/barrt.png";
import lt from "../../assets/extra/window/barlt.png";
import ufrt from "../../assets/extra/window/barufrt.png";
import uflt from "../../assets/extra/window/baruflt.png";
import m from "../../assets/extra/window/barm.png";
import unm from "../../assets/extra/window/barufm.png";
import borderInactive from "assets/img/window-border-slice-inactive.png";
import borderActive from "assets/img/window-border-slice-active.png";

import { useElementResize } from "../../hooks";
import HeaderButtons from "./HeaderButtons";
import { isMobile } from "react-device-detect";

function Windows({
  apps,
  onMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  focusedAppId,
  dispatch,
}) {
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      {apps.map((app) => (
        <StyledWindow
          show={!app.minimized}
          key={app.id}
          id={app.id}
          onMouseDown={onMouseDown}
          onMouseUpClose={onClose}
          onMouseUpMinimize={onMinimize}
          onMouseUpMaximize={onMaximize}
          isFocus={focusedAppId === app.id} // for styledWindow
          {...app}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

const Window = memo(function ({
  injectProps,
  id,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  header,
  defaultSize,
  defaultOffset,
  resizable,
  maximized,
  component,
  zIndex,
  isFocus,
  className,
  dispatch,
}) {
  function _onMouseDown() {
    onMouseDown(id);
  }
  function _onMouseUpClose() {
    onMouseUpClose(id);
  }
  function _onMouseUpMinimize() {
    onMouseUpMinimize(id);
  }
  function _onMouseUpMaximize() {
    if (resizable) onMouseUpMaximize(id);
  }
  function onDoubleClickHeader(e) {
    if (e.target !== dragRef.current) return;
    _onMouseUpMaximize();
  }
  const dragRef = useRef(null);
  const [patched, setPatched] = useState(0);
  const ref = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const {
    offset,
    size,
    handleDraggable,
  } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });
  let width, height, x, y;
  if (maximized) {
    width = windowWidth + 6;
    height = windowHeight - 24;
    x = -3;
    y = -3;
  } else {
    width = size.width;
    height = size.height;
    x = offset.x;
    y = offset.y;
  }

  return (
    <>
      <div
        patched={patched}
        className={className}
        id={header.title}
        key={id}
        onMouseDown={(e) => {
          _onMouseDown(e);
          handleDraggable(e);
        }}
        style={{
          transform: `translate(${x}px,${y}px)`,
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
          zIndex,
        }}
      >
        <div className="header__bg" />
        <header
          ref={dragRef}
          className="app__header"
          onDoubleClick={onDoubleClickHeader}
        >
          <img
            onDoubleClick={_onMouseUpClose}
            src={header.icon}
            alt={header.title}
            className="app__header__icon"
            draggable={false}
          />
          <div className="app__header__title">{header.title}</div>
          <HeaderButtons
            buttons={header.buttons}
            onMaximize={_onMouseUpMaximize}
            onMinimize={_onMouseUpMinimize}
            onClose={_onMouseUpClose}
            maximized={maximized}
            resizable={resizable}
            isFocus={isFocus}
          />
        </header>
        <div className="app__content" ref={ref}>
          {component({
            onClose: _onMouseUpClose,
            onMinimize: _onMouseUpMinimize,
            onMaximize: _onMouseUpMaximize,
            isFocus,
            ...injectProps,
            dispatch,
            id,
          })}
        </div>
      </div>
    </>
  );
});

const StyledWindow = styled(Window)`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: absolute;
  padding: 1px;
  padding: ${({ header }) => (header.invisible ? 0 : 1)}px;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0px;
  .header__bg {
    background-image: ${({ isFocus }) => `url(${isFocus ? m : unm})`};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 30px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  .header__bg:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    background-image: ${({ isFocus }) => `url(${isFocus ? lt : uflt})`};
    top: 0;
    bottom: 0;
    width: 7px;
  }
  .header__bg:after {
    content: "";
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.4)};
    display: block;
    position: absolute;
    right: 0;
    background-image: ${({ isFocus }) => `url(${isFocus ? rt : ufrt})`};
    top: 0;
    bottom: 0;
    width: 7px;
  }
  .app__header {
    display: ${({ header }) => (header.invisible ? "none" : "flex")};
    height: 25px;
    line-height: 25px;
    font-weight: 700;
    font-size: 12px;
    font-family: "Noto Sans";
    text-shadow: 1px 1px #000;
    color: white;
    position: absolute;
    left: 3px;
    right: 3px;
    align-items: center;
  }
  .app__header__icon {
    width: 15px;
    height: 15px;
    margin-left: 1px;
    margin-right: 3px;
  }
  .app__header__title {
    flex: 1;
    pointer-events: none;
    padding-right: 5px;
    letter-spacing: 0.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .app__content {
    flex: 1;
    position: relative;
    margin-top: 27px;
    height: ${isMobile ? "101%" : "calc(100% - 27px)"};

    border-width: 4px;
    border-image: ${({ isFocus }) =>
      `url(${isFocus ? borderActive : borderInactive})`};
    border-image-slice: 4;
    border-top: 2px solid #003366;
  }
`;

export default Windows;
