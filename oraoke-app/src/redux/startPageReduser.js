import imgSong1_Leps_RumkaVodki from './../img/songs/1_leps_rumka_vodki.png';
import imgSong2_Leningrag_labuteni from './../img/songs/2_leningrad_eksponat.png';
import imgSong3_Aiowa_Smile from './../img/songs/3_aiowa_ulibaysya.png';
import imgSong4_Pirozhkow_Zacepila from './../img/songs/4_Pirozhkov_Zacepila.png';
import imgSong5_Sukochev_Babuchka from './../img/songs/5_Sukachev_Babushka.png';
import imgSong6_Nataly_O_Bozhe from './../img/songs/6_Natali_O_Bozhe.png';

const CHANGE_DEFAULT_SONG = 'ORAOKE/START_PAGE/CHANGE_DEFAULT_SONG'

export const changecurrentSong = (song) => ({
  type: CHANGE_DEFAULT_SONG,
  song: {...song}
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
    },
    {
      songName: 'Улыбайся',
      artistName: 'AIOWA',
      fullTitle: 'Aiowa - Улыбайся',
      img: imgSong3_Aiowa_Smile,
    },
    {
      songName: 'Зацепила',
      artistName: 'Артур Пирожков',
      fullTitle: 'Артур Пирожков - Зацепила',
      img: imgSong4_Pirozhkow_Zacepila,
    },
    {
      songName: 'Моя бабушка курит трубку',
      artistName: 'Гарик Сукачев',
      fullTitle: 'Гарик Сукачев - Моя бабушка курит трубку',
      img: imgSong5_Sukochev_Babuchka,
    },
    {
      songName: 'О Боже! Какой мужчина!',
      artistName: 'Натали',
      fullTitle: 'Натали - О Боже! Какой мужчина!',
      img: imgSong6_Nataly_O_Bozhe,
    }],
  currentSong: {
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
        currentSong: action.song
      };
    
    default:
      return state;
  }
  
}

export default startPageReducer;