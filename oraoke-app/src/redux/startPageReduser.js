import imgSong1LepsRumkaVodki from './../img/songs/1_leps_rumka_vodki.png';
import imgSong2Leningraglabuteni from './../img/songs/2_leningrad_eksponat.png';
import imgSong3AiowaSmile from './../img/songs/3_aiowa_ulibaysya.png';
import imgSong4PirozhkowZacepila from './../img/songs/4_Pirozhkov_Zacepila.png';
import imgSong5SukochevBabuchka from './../img/songs/5_Sukachev_Babushka.png';
import imgSong6NatalyOBozhe from './../img/songs/6_Natali_O_Bozhe.png';
import srcToSong1LepsRumkaVodki from './../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki_introduse.mp3';
import srcToSong2Leningraglabuteni from './../songs/2_leningrad_eksponat/Leningrad_Eksponat_Introduce.mp3';
import srcToong3AiowaSmile from './../songs/3_Aiowa_ulibaysya/IOWA_Smile_introduce.mp3';
import srcToSong4PirozhkowZacepila from './../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila_Introduce.mp3';
import srcToSong5SukochevBabuchka from './../songs/5_Sukachev_Moya_Babushka/Sukachev_Moya_Babushka_Introduce.mp3';
import srcToSong6NatalyOBozhe from './../songs/6_Natali_O_Bozhe/Natali_O_Bozhe_Kakoy_Men_Introduce.mp3';

const CHANGE_CURRENT_SONG = 'ORAOKE/START_PAGE/CHANGE_CURRENT_SONG'

export const changecurrentSong = (song) => ({
  type: CHANGE_CURRENT_SONG,
  song: {...song}
});

let initialState = {
  songs: [
     {
      songID: '0',
      songName: 'Рюмка водки на столе',
      artistName: 'Григорий Лепс',
      fullTitle: 'Григорий Лепс - Рюмка водки на столе',
      img: imgSong1LepsRumkaVodki,
      srcToSong: srcToSong1LepsRumkaVodki
    },
    {
      songID: '1',
      songName: 'Экспонат (Лабутены)',
      artistName: 'Ленинград',
      fullTitle: 'Ленинград - Экспонат (Лабутены)',
      img: imgSong2Leningraglabuteni,
      srcToSong: srcToSong2Leningraglabuteni
    },
    {
      songID: '2',
      songName: 'Улыбайся',
      artistName: 'AIOWA',
      fullTitle: 'Aiowa - Улыбайся',
      img: imgSong3AiowaSmile,
      srcToSong: srcToong3AiowaSmile
    },
    {
      songID: '3',
      songName: 'Зацепила',
      artistName: 'Артур Пирожков',
      fullTitle: 'Артур Пирожков - Зацепила',
      img: imgSong4PirozhkowZacepila,
      srcToSong: srcToSong4PirozhkowZacepila
    },
    {
      songID: '4',
      songName: 'Моя бабушка курит трубку',
      artistName: 'Гарик Сукачев',
      fullTitle: 'Гарик Сукачев - Моя бабушка курит трубку',
      img: imgSong5SukochevBabuchka,
      srcToSong: srcToSong5SukochevBabuchka
    },
    {
      songID: '5',
      songName: 'О Боже! Какой мужчина!',
      artistName: 'Натали',
      fullTitle: 'Натали - О Боже! Какой мужчина!',
      img: imgSong6NatalyOBozhe,
      srcToSong: srcToSong6NatalyOBozhe
    }],
  currentSong: {
    songID: '0',
    songName: 'Рюмка водки на столе',
    artistName: 'Григорий Лепс',
    fullTitle: 'Григорий Лепс - Рюмка водки на столе',
    img: imgSong1LepsRumkaVodki,
    srcToSong: srcToSong1LepsRumkaVodki
  },
  isCurrentSongSet: false
}

const startPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.song,
        isCurrentSongSet: true
      };
    
    default:
      return state;
  }
  
}

export default startPageReducer;