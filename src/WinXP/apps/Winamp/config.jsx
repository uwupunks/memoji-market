// Auto-generated imports for all music files
import Moonflight from "assets/music/moonflight.mp3";
import EastofHenesys from "assets/music/maple/EastofHenesys.mp3";
import Ellinia from "assets/music/maple/Ellinia.mp3";
import Henesys from "assets/music/maple/Henesys.mp3";
import HenesysMarket from "assets/music/maple/HenesysMarket.mp3";
import LithHarbor from "assets/music/maple/LithHarbor.mp3";
import Shanghai from "assets/music/maple/Shanghai.mp3";
import ShowaTown from "assets/music/maple/ShowaTown.mp3";
import Sleepywood from "assets/music/maple/Sleepywood.mp3";
import Subway from "assets/music/maple/Subway.mp3";
import ToEllinia from "assets/music/maple/ToEllinia.mp3";
import TreeDungeon from "assets/music/maple/TreeDungeon.mp3";
import WestofHenesys from "assets/music/maple/WestofHenesys.mp3";
import NightcoreEverytimeWeTouch from "assets/music/uwu/Nightcore Everytime We Touch - SuperstarElf - SoundLoadMate.com.mp3";
import PlatinumDisco from "assets/music/uwu/Platinum Disco _ Eurobeat Remix - Turbo - SoundLoadMate.com.mp3";
import SchnuffelHaschenparty from "assets/music/uwu/schnuffel - häschenparty _ bunny party _sped up_ - лимон - SoundLoadMate.com.mp3";
import DuvetBoa from "assets/music/uwu/𝗗𝘂𝘃𝗲𝘁 𝗕𝗼𝗮 - 𝗦𝗽𝗲𝗱 𝘂𝗽 - gore poop - SoundLoadMate.com.mp3";

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export const initialTracks = shuffleArray([
  // All local music files
  {
    url: Moonflight,
    duration: null,
    metaData: {
      title: "moonflight",
      artist: "Unknown",
      album: "Unknown",
    },
  },
  {
    url: EastofHenesys,
    duration: null,
    metaData: {
      title: "East of Henesys",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: Ellinia,
    duration: null,
    metaData: {
      title: "Ellinia",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: Henesys,
    duration: null,
    metaData: {
      title: "Henesys",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: HenesysMarket,
    duration: null,
    metaData: {
      title: "Henesys Market",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: LithHarbor,
    duration: null,
    metaData: {
      title: "Lith Harbor",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: Shanghai,
    duration: null,
    metaData: {
      title: "Shanghai",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: ShowaTown,
    duration: null,
    metaData: {
      title: "Showa Town",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: Sleepywood,
    duration: null,
    metaData: {
      title: "Sleepywood",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: Subway,
    duration: null,
    metaData: {
      title: "Subway",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: ToEllinia,
    duration: null,
    metaData: {
      title: "To Ellinia",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: TreeDungeon,
    duration: null,
    metaData: {
      title: "Tree Dungeon",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  {
    url: WestofHenesys,
    duration: null,
    metaData: {
      title: "West of Henesys",
      artist: "Unknown",
      album: "Maplestory",
    },
  },
  // uwu folder
  {
    url: NightcoreEverytimeWeTouch,
    duration: null,
    metaData: {
      title: "Nightcore Everytime We Touch",
      artist: "SuperstarElf",
      album: "uwu",
    },
  },
  {
    url: PlatinumDisco,
    duration: null,
    metaData: {
      title: "Platinum Disco (Eurobeat Remix)",
      artist: "Turbo",
      album: "uwu",
    },
  },
  {
    url: SchnuffelHaschenparty,
    duration: null,
    metaData: {
      title: "Schnuffel Häschenparty (Bunny Party Sped Up)",
      artist: "лимон",
      album: "uwu",
    },
  },
  {
    url: DuvetBoa,
    duration: null,
    metaData: {
      title: "Duvet Boa (Sped Up)",
      artist: "gore poop",
      album: "uwu",
    },
  },
]);
