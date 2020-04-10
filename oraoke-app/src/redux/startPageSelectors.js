export const getcurrentSongSelector = (state) => {
  return state.startPage.currentSong;
}

export const getIscurrentSongSetSelector = (state) => {
  return state.startPage.isCurrentSongSet;
}

export const getSongsSelector = (state) => {
  return state.startPage.songs;
}

export const getCurrentSoundFromBuffer = (state) => {
  return state.startPage.currentSoundFromBuffer;
}