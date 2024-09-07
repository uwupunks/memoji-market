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


function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const initialTracks = shuffleArray([
  {
    url: ToEllinia,
    duration: 158,
    metaData: {
      title: "To Ellinia",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: Ellinia,
    duration: 187,
    metaData: {
      title: "Ellinia",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: Henesys,
    duration: 137,
    metaData: {
      title: "Henesys",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: HenesysMarket,
    duration: 72,
    metaData: {
      title: "Henesys Market",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: LithHarbor,
    duration: 271,
    metaData: {
      title: "Lith Harbor",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: Shanghai,
    duration: 146,
    metaData: {
      title: "Shanghai",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: ShowaTown,
    duration: 157,
    metaData: {
      title: "Showa Town",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: Sleepywood,
    duration: 166,
    metaData: {
      title: "Sleepywood",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: Subway,
    duration: 198,
    metaData: {
      title: "Subway",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: TreeDungeon,
    duration: 146,
    metaData: {
      title: "Tree Dungeon",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: WestofHenesys,
    duration: 128,
    metaData: {
      title: "West of Henesys",
      artist: "Wizet",
      album: "Maplestory",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Autumn_Voyage.ogg",
    duration: 138,
    metaData: {
      title: "Autumn Voyage",
      artist: "Jagex",
      album: "Runescape",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Background.ogg",
    duration: 243,
    metaData: {
      title: "Background",
      artist: "Jagex",
      album: "Runescape",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Dream.ogg",
    duration: 153,
    metaData: {
      title: "Dream",
      artist: "Jagex",
      album: "Runescape",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Home_Sweet_Home.ogg",
    duration: 321,
    metaData: {
      title: "Home Sweet Home",
      artist: "Jagex",
      album: "Runescape",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Spirit.ogg",
    duration: 234,
    metaData: {
      title: "Spirit",
      artist: "Jagex",
      album: "Runescape",
    },
  },
  {
    url: "https://oldschool.runescape.wiki/images/Waterfall.ogg",
    duration: 207.072653,
    metaData: {
      title: "Waterfall",
      artist: "Jagex",
      album: "Runescape",
    },
  },
]);

