export const getcurrentSongSelector = (state) => {
  return state.startPage.currentSong;
}

export const getIscurrentSongSetSelector = (state) => {
  return state.startPage.isCurrentSongSet;
}

export const getSongsSelector = (state) => {
  return state.startPage.songs;
}

export const getIsStopBtnPushed = (state) => {
  return state.startPage.isStopBtnPushed;
}
export const getCanvas = (state) => {
  return state.startPage.canvas;
}
export const getCanvasWrp = (state) => {
  return state.startPage.canvasWrp;
}
export const getSongMP3 = (state) => {
  return state.startPage.songMP3;
}
export const getIsCurrentSongPlayingSetter = (state) => {
  return state.startPage.isCurrentSongPlaying;
}