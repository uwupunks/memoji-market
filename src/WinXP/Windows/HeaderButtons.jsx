import React from "react";
import styled from "styled-components";
import c from "../../assets/extra/window/close1.png";
import ch from "../../assets/extra/window/close2.png";
import cu from "../../assets/extra/window/close3.png";
import cuf from "../../assets/extra/window/close4.png";
import cuuh from "../../assets/extra/window/close5.png";
import mm from "../../assets/extra/window/min1.png";
import mmh from "../../assets/extra/window/min2.png";
import mmu from "../../assets/extra/window/min3.png";
import mmuf from "../../assets/extra/window/min4.png";
import mmuuh from "../../assets/extra/window/min5.png";
import m from "../../assets/extra/window/max1.png";
import mh from "../../assets/extra/window/max2.png";
import mu from "../../assets/extra/window/max3.png";
import muf from "../../assets/extra/window/max4.png";
import muuh from "../../assets/extra/window/max5.png";
import mi from "../../assets/extra/window/micro1.png";
import mih from "../../assets/extra/window/micro2.png";
import miu from "../../assets/extra/window/micro3.png";
import miuf from "../../assets/extra/window/micro4.png";
import miuuh from "../../assets/extra/window/micro5.png";
function HeaderButtons({
  buttons,
  onMaximize,
  onMinimize,
  onClose,
  maximized,
  resizable,
  className,
}) {
  const buttonElements = {
    minimize: (
      <button
        key="minimize"
        className="header__button header__button--minimize"
        onMouseUp={onMinimize}
      />
    ),
    maximize: (
      <button
        key="maximize"
        className={`header__button ${
          maximized ? "header__button--maximized" : "header__button--maximize"
        } ${resizable ? "" : "header__button--disable"}`}
        onMouseUp={onMaximize}
      />
    ),
    close: (
      <button
        key="button"
        className="header__button header__button--close"
        onMouseUp={onClose}
      />
    ),
  };

  return (
    <div className={className}>
      {buttons ? (
        buttons.map((b) => buttonElements[b])
      ) : (
        <>
          {buttonElements.minimize}
          {buttonElements.maximize}
          {buttonElements.close}
        </>
      )}
    </div>
  );
}

export default styled(HeaderButtons)`
  height: 21px;
  display: flex;
  align-items: center;
  margin-top: 1px;
  margin-right: 1px;
  .header__button {
    margin-right: 2px;
    position: relative;
    width: 21px;
    height: 21px;
    border: 0px solid #fff;
    border-radius: 0px;
    cursor: auto;
  }
  .header__button button:active {
    cursor: auto;
  }
  .header__button--minimize {
    background-image: ${({ isFocus }) => `url(${isFocus ? mm : mmuuh})`};
    &:hover {
      background-image: ${({ isFocus }) => `url(${isFocus ? mmh : mmuf})`};
    }
    &:active {
      background-image: url(${mmu});
    }
  }

  .header__button--maximize {
    background-image: ${({ isFocus }) => `url(${isFocus ? m : muuh})`};
    &:hover {
      background-image: ${({ isFocus }) => `url(${isFocus ? mh : muf})`};
    }
    &:active {
      background-image: url(${mu});
    }
  }
  .header__button--maximized {
    background-image: ${({ isFocus }) => `url(${isFocus ? mi : miuuh})`};
    &:hover {
      background-image: ${({ isFocus }) => `url(${isFocus ? mih : miuf})`};
    }
    &:active {
      background-image: url(${miu});
    }
  }
  .header__button--close {
    background-image: ${({ isFocus }) => `url(${isFocus ? c : cuuh})`};
    &:hover {
      background-image: ${({ isFocus }) => `url(${isFocus ? ch : cuf})`};
    }
    &:active {
      background-image: url(${cu});
    }
  }
  .header__button--disable {
    outline: none;
    opacity: 0.5;
    &:hover {
      filter: brightness(100%);
    }
  }
`;
