export const getcurrentSongSelector = (state) => {
  return state.startPage.currentSong;
};

export const getIscurrentSongSetSelector = (state) => {
  return state.startPage.isCurrentSongSet;
};

export const getSongsSelector = (state) => {
  return state.startPage.songs;
};

export const getIsStopBtnPushed = (state) => {
  return state.startPage.isStopBtnPushed;
};
export const getCanvas = (state) => {
  return state.startPage.canvas;
};
export const getCanvasWrp = (state) => {
  return state.startPage.canvasWrp;
};
export const getSongMP3 = (state) => {
  return state.startPage.songMP3;
};
export const getIsCurrentSongPlayingSetter = (state) => {
  return state.startPage.isCurrentSongPlaying;
};
export const getTimerSongPlaying = (state) => {
  return state.startPage.timerSongPlaying;
};
export const getXCoordOfBird = (state) => {
  return state.startPage.xCoordOfBird;
};
export const getYCoordOfBird = (state) => {
  return state.startPage.yCoordOfBird;
};
export const getBirdOnCanvas = (state) => {
  return state.startPage.birdOnCanvas;
};
export const getSoundExploision = (state) => {
  return state.startPage.soundExploision;
};
export const getSrcToSoundExploision = (state) => {
  return state.startPage.srcToSoundExploision;
};
export const getSoundOfFinish = (state) => {
  return state.startPage.soundOfFinish;
};
export const getSrcToSoundOfFinish = (state) => {
  return state.startPage.srcToSoundOfFinish;
};
export const getSrcTofinishLineImg = (state) => {
  return state.startPage.srcTofinishLineImg;
};
export const getFinishLineXCoordinate = (state) => {
  return state.startPage.currentSong.finishLineXCoordinate;
};
export const getCurrentSongVolume = (state) => {
  return state.startPage.currentSongVolume;
};
export const getCurrentVoiceVolume = (state) => {
  return state.startPage.currentVoiceVolume;
};
export const getCurrentLanguage = (state) => {
  return state.startPage.currentLanguage;
};

