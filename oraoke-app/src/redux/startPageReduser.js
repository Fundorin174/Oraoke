const CHANGE_DEFAULT_SONG = 'ORAOKE/START_PAGE/CHANGE_DEFAULT_SONG'

export const changeDefaultSong = (songTitle) => ({
    type: CHANGE_DEFAULT_SONG,
    songTitle: songTitle
  });

let initialState = {
  defaultsong: 'Рюмка водки на столе - Григорий Лепс'
}

const startPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEFAULT_SONG:
      
      return {
        ...state,
        defaultsong: action.songTitle
      };

    default:
      return state;
  }

  }

  export default startPageReducer;