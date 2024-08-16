import React,{useState} from 'react';
import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import Unicorn from './Unicorn';
import Keygen from './Keygen';
import Cracked from './Cracked';
import iePaper from 'assets/windowsIcons/ie-paper.png';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import unicornIcon from 'assets/windowsIcons/unicorn.png';
import keygenIcon from 'assets/windowsIcons/keygen.png';
import crackedIcon from 'assets/windowsIcons/cracked.png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
import empty from 'assets/windowsIcons/empty.png';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();

export const defaultAppState = [
  {
    component: Unicorn,
    header: {
      title: 'Unicorn',
      icon: unicornIcon,
    },
    defaultSize: {
      width: 700,
      height: 500,
    },
    defaultOffset: {
      x: 560,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: Keygen,
    header: {
      title: 'Keygen',
      icon: keygenIcon,
    },
    defaultSize: {
      width: 359,
      height: 522,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
   {
    component: Cracked,
    header: {
      title: 'Cracked',
      icon: crackedIcon,
    },
    defaultSize: {
      width: 911,
      height: 600,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
   {
    component: Winamp,
    header: {
      title: 'Winamp',
      icon: winamp,
      invisible: true,
    },
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 350,
      y: 400,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  }
];

export const defaultIconState = [
  {
    id: 0,
    icon: unicornIcon,
    title: 'Unicorn',
    component: Unicorn,
    isFocus: false,
  },
  {
    id: 1,
    icon: keygenIcon,
    title: 'Keygen',
    component: Keygen,
    isFocus: false,
  },
  {
    id: 2,
    icon: crackedIcon,
    title: 'Cracked',
    component: Cracked,
    isFocus: false,
  },
  {
    id: 3,
    icon: winamp,
    title: 'Winamp',
    component: Winamp,
    isFocus: false,
  }
];

export const appSettings = {
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
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
   'Unicorn': {
    header: {
      icon: unicornIcon,
      title: 'Unicorn',
    },
    component: Unicorn,
    defaultSize: {
      width: 700,
      height: 500,
    },
    defaultOffset: {
      x: 140,
      y: 30,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  'Keygen': {
    header: {
      icon: keygenIcon,
      title: 'Keygen',
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
   'Cracked': {
    header: {
      icon: crackedIcon,
      title: 'Cracked',
    },
    component: Cracked,
    defaultSize: {
      width: 911,
      height: 600,
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
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  }
};



export { ErrorBox, Winamp, Unicorn, Keygen, Cracked };