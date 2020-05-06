import { AppStateType } from "./redux-store";

export const getcurrentSongSelector = (state: AppStateType) => {
  return state.startPage.currentSong;
};

export const getIscurrentSongSetSelector = (state: AppStateType) => {
  return state.startPage.isCurrentSongSet;
};

export const getSongsSelector = (state: AppStateType) => {
  return state.startPage.songs;
};

export const getIsStopBtnPushed = (state: AppStateType) => {
  return state.startPage.isStopBtnPushed;
};
export const getCanvas = (state: AppStateType) => {
  return state.startPage.canvas;
};
export const getCanvasWrp = (state: AppStateType) => {
  return state.startPage.canvasWrp;
};
export const getSongMP3 = (state: AppStateType) => {
  return state.startPage.songMP3;
};
export const getIsCurrentSongPlayingSetter = (state: AppStateType) => {
  return state.startPage.isCurrentSongPlaying;
};
export const getXCoordOfBird = (state: AppStateType) => {
  return state.startPage.xCoordOfBird;
};
export const getYCoordOfBird = (state: AppStateType) => {
  return state.startPage.yCoordOfBird;
};
export const getBirdOnCanvas = (state: AppStateType) => {
  return state.startPage.birdOnCanvas;
};
export const getSoundExploision = (state: AppStateType) => {
  return state.startPage.soundExploision;
};
export const getSrcToSoundExploision = (state: AppStateType) => {
  return state.startPage.srcToSoundExploision;
};
export const getSoundOfFinish = (state: AppStateType) => {
  return state.startPage.soundOfFinish;
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
