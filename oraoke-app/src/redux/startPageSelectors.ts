import { AppStateType } from "./redux-store";
import AdvertismentBlock from "../components/common/AdvertismentBlock";
import { AdvertismentType } from "./startPageReduser";

export const getcurrentSongSelector = (state: AppStateType) => {
  return state.startPage.currentSong;
};

export const getIscurrentSongSetSelector = (state: AppStateType) => {
  return state.startPage.isCurrentSongSet;
};

export const getSongsSelector = (state: AppStateType) => {
  return state.startPage.songs;
};

export const getAdv = (state: AppStateType, numOfAdv: number) => {
  let adv = state.startPage.advertisment.find(advert => advert.advID === numOfAdv)
  return adv as AdvertismentType;
};

export const getIsStopBtnPushed = (state: AppStateType) => {
  return state.startPage.isStopBtnPushed;
};
export const getIsCurrentSongPlayingSetter = (state: AppStateType) => {
  return state.startPage.isCurrentSongPlaying;
};
export const getSrcToSoundExploision = (state: AppStateType) => {
  return state.startPage.srcToSoundExploision;
};
export const getSrcToSoundOfFinish = (state: AppStateType) => {
  return state.startPage.srcToSoundOfFinish;
};
export const getSrcTofinishLineImg = (state: AppStateType) => {
  return state.startPage.srcTofinishLineImg;
};
export const getFinishLineXCoordinate = (state: AppStateType) => {
  return state.startPage.currentSong.finishLineXCoordinate;
};
export const getCurrentSongVolume = (state: AppStateType) => {
  return state.startPage.currentSongVolume;
};
export const getCurrentVoiceVolume = (state: AppStateType) => {
  return state.startPage.currentVoiceVolume;
};
export const getCurrentLanguage = (state: AppStateType) => {
  return state.startPage.currentLanguage;
};
export const getLanguagesJSONData = (state: AppStateType) => {
  return state.startPage.languagesJSONData;
}
