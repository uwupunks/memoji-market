import ErrorBox from "./ErrorBox";
import Winamp from "./Winamp";
import Keygen from "./Keygen";
import Cracked from "./Cracked";
import error from "../../assets/windowsIcons/897(16x16).png";
import unicornIcon from "../../assets/windowsIcons/unicorn.png";
import keygenIcon from "../../assets/windowsIcons/keygen.png";
import crackedIcon from "../../assets/windowsIcons/cracked.png";
import winamp from "../../assets/windowsIcons/winamp.png";

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();

export const defaultAppState = [];

export const defaultIconState = [
  {
    id: 1,
    icon: keygenIcon,
    title: "[RAD] uwunicorn keygen V0.5.exe",
    component: Keygen,
    isFocus: false,
  },
];

export const appSettings = {
  Error: {
    header: {
      icon: error,
      title: "C:\\",
      buttons: ["close"],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Keygen: {
    header: {
      icon: keygenIcon,
      title: "Keygen",
    },
    component: Keygen,
    defaultSize: {
      width: 359,
      height: 522,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Cracked: {
    header: {
      icon: crackedIcon,
      title: "[Cracked] Unicorn Memoji Market",
    },
    component: Cracked,
    defaultSize: {
      width: 911,
      height: 600,
    },
    defaultOffset: {
      x: 50,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: "Winamp",
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 150,
      y: 650,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
};

export { ErrorBox, Winamp, Keygen, Cracked };
