import imgSong1_Leps_RumkaVodki from './../img/songs/1_leps_rumka_vodki.png';
import imgSong2_Leningrag_labuteni from './../img/songs/2_leningrad_eksponat.png'


const CHANGE_DEFAULT_SONG = 'ORAOKE/START_PAGE/CHANGE_DEFAULT_SONG'

export const changeDefaultSong = (song) => ({
  type: CHANGE_DEFAULT_SONG,
  song: song
});

let initialState = {
  songs: [
     {
      songName: 'Рюмка водки на столе',
      artistName: 'Григорий Лепс',
      fullTitle: 'Григорий Лепс - Рюмка водки на столе',
      img: imgSong1_Leps_RumkaVodki,
    },
    {
      songName: 'Экспонат (Лабутены)',
      artistName: 'Ленинград',
      fullTitle: 'Ленинград - Экспонат (Лабутены)',
      img: imgSong2_Leningrag_labuteni,
    }],
  defaultSong: {
    songName: 'Рюмка водки на столе',
    artistName: 'Григорий Лепс',
    fullTitle: 'Григорий Лепс - Рюмка водки на столе',
    img: imgSong1_Leps_RumkaVodki,
  }
}

const startPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEFAULT_SONG:
      return {
        ...state,
        defaultSong: action.song.fullTitle
      };
    
    default:
      return state;
  }
  
}

export default startPageReducer;