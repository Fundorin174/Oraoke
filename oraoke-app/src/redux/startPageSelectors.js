export const getDefaultSongSelector = (state) => {
  return state.startPage.defaultSong.fullTitle;
}

export const getSongsSelector = (state) => {
  return state.startPage.songs;
}