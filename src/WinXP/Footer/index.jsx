import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Balloon from "../../components/Balloon";
import sb1 from "../../assets/extra/footer/sbut1.png";
import sb2 from "../../assets/extra/footer/sbut2.png";
import sb3 from "../../assets/extra/footer/sbut3.png";
import footerMenuImage from "../../assets/extra/footer/startmenu.png";
import sound from "../../assets/windowsIcons/690(16x16).png";
import usb from "../../assets/windowsIcons/394(16x16).png";
import risk from "../../assets/windowsIcons/229(16x16).png";
import lbar from "../../assets/extra/footer/lbar.png";
import rbar from "../../assets/extra/footer/rbar.png";

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = "AM";
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

function StartButton({ toggleMenu, menuOn }) {
  const [hover, setHover] = useState(false);

  const getImageSource = () => {
    if (menuOn) return sb3;
    return hover ? sb2 : sb1;
  };

  return (
    <img
      src={getImageSource()}
      alt="start"
      className="footer__start"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={toggleMenu}
    />
  );
}

function Footer({
  onMouseDownApp,
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) {
  const [time, setTime] = useState(getTime);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef(null);
  const initialClick = useRef(false);

  function toggleMenu() {
    setMenuOn((on) => {
      const newState = !on;
      initialClick.current = true; // Set the initial click flag
      if (newState) {
        setTimeout(() => attachOutsideClickListener(), 0);
      }
      console.log("Menu toggled:", newState);
      return newState;
    });
  }

  function attachOutsideClickListener() {
    function onMouseDown(e) {
      console.log("mousedown event detected", e);
      if (initialClick.current) {
        setTimeout(() => {
          initialClick.current = false; // Reset the initial click flag
        }, 0);
        return;
      }
      if (!menu.current.contains(e.target) && menuOn) {
        console.log("Closing menu because click outside detected");
        setMenuOn(false);
      }
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }

  function _onMouseDown(e) {
    console.log("Footer _onMouseDown event detected", e);
    if (e.target.closest(".footer__window")) return;
    onMouseDown();
  }

  function _onClickMenuItem(name) {
    console.log("Footer _onClickMenuItem:", name);
    onClickMenuItem(name);
    setMenuOn(false);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTime();
      if (newTime !== time) setTime(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (menuOn) {
      const cleanup = attachOutsideClickListener();
      return cleanup;
    }
  }, [menuOn]);

  return (
    <Container onMouseDown={_onMouseDown}>
      <div className="footer__items left">
        <div ref={menu} className="footer__start__menu">
          {menuOn && (
            <img
              src={footerMenuImage}
              alt="Footer Menu"
              className="footer__menu-image"
            />
          )}
        </div>
        <StartButton toggleMenu={toggleMenu} menuOn={menuOn} />
        {[...apps].map(
          (app) =>
            !app.header.noFooterWindow && (
              <FooterWindow
                key={app.id}
                id={app.id}
                icon={app.header.icon}
                title={app.header.title}
                onMouseDown={onMouseDownApp}
                isFocus={focusedAppId === app.id}
              />
            )
        )}
      </div>

      <div className="footer__items right">
        <img className="footer__icon" src={sound} alt="" />
        <img className="footer__icon" src={usb} alt="" />
        <img className="footer__icon" src={risk} alt="" />
        <div style={{ position: "relative", width: 0, height: 0 }}>
          <Balloon />
        </div>
        <div className="footer__time">{time}</div>
      </div>
    </Container>
  );
}

function FooterWindow({ id, icon, title, onMouseDown, isFocus }) {
  function _onMouseDown() {
    onMouseDown(id);
  }
  return (
    <div
      onMouseDown={_onMouseDown}
      id={title + "menu"}
      className={`footer__window ${isFocus ? "focus" : "cover"}`}
    >
      <img className="footer__icon" src={icon} alt={title} />
      <div className="footer__text">{title}</div>
    </div>
  );
}

const Container = styled.footer`
  height: 30px;
  background-image: url(${lbar});
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  z-index: 1000; /* Ensures footer is above other elements */
  .footer__items.left {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  .footer__items.right {
    background-image: url(${rbar});
    padding: 0 10px;
    margin-left: 10px;
  }
  .footer__items {
    display: flex;
    align-items: center;
  }
  .footer__start {
    height: 100%;
    margin-right: 10px;
    position: relative;
    &:hover {
      filter: brightness(105%);
    }
    &:active {
      pointer-events: none;
      filter: brightness(85%);
    }
  }
  .footer__menu-image {
    position: absolute;
    left: 0;
    bottom: calc(100% - 5px);
    z-index: 1001; /* Ensures the menu is above other elements */
  }
  .footer__window {
    flex: 1;
    max-width: 150px;
    color: #fff;
    border-radius: 2px;
    margin-top: 2px;
    padding: 0 8px;
    height: 22px;
    font-size: 11px;
    background-color: #3c81f3;
    box-shadow: inset -1px 0px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.2);
    position: relative;
    display: flex;
    align-items: center;
  }
  .footer__icon {
    height: 15px;
    width: 15px;
  }
  .footer__text {
    position: absolute;
    left: 27px;
    right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .footer__window.cover:before {
    display: block;
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    width: 10px;
    height: 1px;
    border-bottom-right-radius: 50%;
    box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  }
  .footer__window.cover:hover:active {
    background-color: #1e52b7;
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
      inset 1px 0 1px rgba(0, 0, 0, 0.7);
  }


  .footer__window {
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.2),
      inset 1px 0 1px rgba(0, 0, 0, 0.7);
  }

  .footer__time {
    margin: 0 5px;
    color: #fff;
    font-size: 11px;
    font-weight: lighter;
    text-shadow: none;
  }
`;

export default Footer;
