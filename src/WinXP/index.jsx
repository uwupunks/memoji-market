import React, {
  useReducer,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import styled, { keyframes } from "styled-components";
import useMouse from "react-use/lib/useMouse";
import { useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  ADD_ICONS,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
} from "./constants/actions";
import { FOCUSING, POWER_STATE } from "./constants";
import { defaultIconState, defaultAppState, appSettings } from "./apps";
import Modal from "./Modal";
import Footer from "./Footer";
import Windows from "./Windows";
import Icons from "./Icons";
import { DashedBox } from "../components";
import Winamp from "./apps/Winamp";
import Cracked from "./apps/Cracked";
import winxpStormy from "assets/img/bg-winxp-stormy.jpeg";
import crackedIcon from "assets/windowsIcons/cracked.png";
import winamp from "assets/windowsIcons/winamp.png";
import "./index.css";

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  nextZIndex: defaultAppState.length,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: false,
  powerState: POWER_STATE.START,
};
const reducer = (state, action = { type: "" }) => {
  switch (action.type) {
    case ADD_APP:
      const app = state.apps.find(
        (_app) => _app.component === action.payload.component
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map((app) =>
        app.component === action.payload.component
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      if (state.focusing !== FOCUSING.WINDOW) return state;
      return {
        ...state,
        apps: state.apps.filter((app) => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find((icon) => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FOCUS_APP: {
      const apps = state.apps.map((app) =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map((app) =>
        app.id === action.payload ? { ...app, minimized: true } : app
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case TOGGLE_MAXIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map((app) =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      return {
        ...state,
        focusing: FOCUSING.ICON,
        icons,
      };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return {
        ...state,
        icons,
        focusing: FOCUSING.ICON,
      };
    }
    case ADD_ICONS: {
      const toAdd = action.payload.filter(
        (i) => state.icons.find((si) => si.id === i.id) === undefined
      );
      return {
        ...state,
        icons: [...state.icons, ...toAdd],
      };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map((icon) => ({
          ...icon,
          isFocus: false,
        })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map((icon) => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case END_SELECT:
      return {
        ...state,
        selecting: null,
      };
    case POWER_OFF:
      return {
        ...state,
        powerState: action.payload,
      };
    case CANCEL_POWER_OFF:
      return {
        ...state,
        powerState: POWER_STATE.START,
      };
    default:
      return state;
  }
};
function WinXP() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [patched, setPatched] = useState(0);
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const focusedAppId = getFocusedAppId();
  const [searchParams, setSearchParams] = useSearchParams();

  const onFocusApp = useCallback((id) => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);
  const onMaximizeWindow = useCallback(
    (id) => {
      if (focusedAppId === id) {
        dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId]
  );
  const onMinimizeWindow = useCallback(
    (id) => {
      if (focusedAppId === id) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId]
  );
  function PatchState() {
    return patched;
  }
  const onCloseApp = useCallback(
    (id) => {
      if (focusedAppId === id) {
        dispatch({ type: DEL_APP, payload: id });
      }
    },
    [focusedAppId]
  );
  function onMouseDownFooterApp(id) {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  }
  function onMouseDownIcon(id) {
    dispatch({ type: FOCUS_ICON, payload: id });
  }
  function onDoubleClickIcon(component) {
    const appSetting = Object.values(appSettings).find(
      (setting) => setting.component === component
    );
    dispatch({ type: ADD_APP, payload: appSetting });
  }
  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find((app) => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }
  function onMouseDownFooter() {
    dispatch({ type: FOCUS_DESKTOP });
  }
  function onClickMenuItem(o) {
    if (o === "Winamp")
      dispatch({ type: ADD_APP, payload: appSettings.Winamp });
    else if (o === "Unicorn")
      dispatch({ type: ADD_APP, payload: appSettings["Unicorn"] });
    else if (o === "Keygen")
      dispatch({ type: ADD_APP, payload: appSettings["Keygen"] });
    else if (o === "Log Off")
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === "Turn Off Computer")
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: "C:\\\nApplication not found" },
        },
      });
  }
  function onMouseDownDesktop(e) {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }
  function onMouseUpDesktop(e) {
    dispatch({ type: END_SELECT });
  }
  const onIconsSelected = useCallback(
    (iconIds) => {
      dispatch({ type: SELECT_ICONS, payload: iconIds });
    },
    [dispatch]
  );
  function onClickModalButton(text) {
    dispatch({ type: CANCEL_POWER_OFF });
    dispatch({
      type: ADD_APP,
      payload: appSettings.Error,
    });
  }
  function onModalClose() {
    dispatch({ type: CANCEL_POWER_OFF });
  }

  useEffect(() => {
    let desktop = document.getElementsByClassName("winxp")?.[0];
    if (desktop) {
      desktop.style.background = `url(${winxpStormy}) no-repeat center center fixed`;
      desktop.style.backgroundSize = "cover";
    }
    dispatch({ type: "ADD_APP", payload: appSettings["Cracked"] });
    dispatch({ type: "ADD_APP", payload: appSettings["Winamp"] });
    dispatch({
      type: "ADD_ICONS",
      payload: [
        {
          id: 2,
          icon: crackedIcon,
          title: "[Cracked] Unicorn Memoji Market",
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
  }, []);

  return (
    <Container
      className="winxp"
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        appSettings={appSettings}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
        patched={PatchState}
        dispatch={dispatch}
      />
      {!isMobile ? (
        <Footer
          apps={state.apps}
          onMouseDownApp={onMouseDownFooterApp}
          focusedAppId={focusedAppId}
          onMouseDown={onMouseDownFooter}
          onClickMenuItem={onClickMenuItem}
        />
      ) : null}
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </Container>
  );
}

const powerOffAnimation = keyframes`
  0% {
    filter: brightness(1) grayscale(0);
  }
  30% {
    filter: brightness(1) grayscale(0);
  }
  100% {
    filter: brightness(0.6) grayscale(1);
  }
`;
const animation = {
  [POWER_STATE.START]: "",
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans");
  font-family: Tahoma, "Noto Sans", sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
  }
`;

export default WinXP;
