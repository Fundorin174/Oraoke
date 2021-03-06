import imgSong1LepsRumkaVodki from "./../img/songs/1_leps_rumka_vodki.png";
import imgSong2VitaminkaBelorusskih from "./../img/songs/2_vitaminka.png";
import imgSong3AiowaSmile from "./../img/songs/3_aiowa_ulibaysya.png";
import imgSong4PirozhkowZacepila from "./../img/songs/4_Pirozhkov_Zacepila.png";
import imgSong5SukochevBabuchka from "./../img/songs/5_Sukachev_Babushka.png";
import imgSong6NatalyOBozhe from "./../img/songs/6_Natali_O_Bozhe.png";
// @ts-ignore
import srcToSong1LepsRumkaVodki from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki.mp3";
// @ts-ignore
import srcToSong1LepsRumkaVodkiIntro from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki_introduse.mp3";
// @ts-ignore
import srcToSong2Vitaminka from "./../songs/2_Vitaminka_Belorusskih/Vitaminka-Belorusskif-Minus-Cut.mp3";
// @ts-ignore
import srcToSong2VitaminkaIntro from "./../songs/2_Vitaminka_Belorusskih/Vitaminka-Intro-Cut.mp3";
// @ts-ignore
import srcToong3AiowaSmile from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile.mp3";
// @ts-ignore
import srcToong3AiowaSmileIntro from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile_introduce.mp3";
// @ts-ignore
import srcToSong4PirozhkowZacepila from "./../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila_Minus.mp3";
// @ts-ignore
import srcToSong4PirozhkowZacepilaIntro from "./../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila_Introduce.mp3";
// @ts-ignore
import srcToSong5SukochevBabuchka from "./../songs/5_Sukachev_Moya_Babushka/Sukachev_Moya_Babushka.mp3";
// @ts-ignore
import srcToSong5SukochevBabuchkaIntro from "./../songs/5_Sukachev_Moya_Babushka/Sukachev_Moya_Babushka_Introduce.mp3";
// @ts-ignore
import srcToSong6NatalyOBozhe from "./../songs/6_Natali_O_Bozhe/Natali_O_Bozhe_Kakoy_Men.mp3";
// @ts-ignore
import srcToSong6NatalyOBozheIntro from "./../songs/6_Natali_O_Bozhe/Natali_O_Bozhe_Kakoy_Men_Introduce.mp3";
// @ts-ignore
import srcToSoundExploision from "./../songs/soundExploision.mp3";
// @ts-ignore
import srcToSoundOfFinish from "./../songs/soundOfFinish.mp3";
import srcTofinishLineImg from "./../img/finishLine.jpg";
import languagesJSONData from './../components/common/languages/languagesData.json';
import Img1 from "./../img/advertisment/adv1SettingPage.png";
import Img2 from "./../img/advertisment/adv2SettingPage.png";
import Img3 from "./../img/advertisment/adv1SettingPage.png";
import Img5 from "./../img/advertisment/adv2SettingPage.png";
import Img4 from "./../img/advertisment/adv4ChooseSongPage.png";
import Img6 from "./../img/advertisment/adv6ChooseSongPage.png";

const CHANGE_CURRENT_SONG = "ORAOKE/START_PAGE/CHANGE_CURRENT_SONG";
const STOP_BTN_IS_PUSHED_SET = "ORAOKE/PLAY_SONG_PAGE/STOP_BTN_IS_PUSHED_SET";
const IS_CURRENT_SONG_PLAYING = "ORAOKE/PLAY_SONG_PAGE/IS_CURRENT_SONG_PLAYING";
const SET_NEW_VOLUME_OF_SONG = "ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_SONG";
const SET_NEW_VOLUME_OF_VOICE = "ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_VOICE";
const SET_NEW_LANGUAGE = "ORAOKE/START_PAGE/SET_NEW_LANGUAGE";

type TrapezeType = {
  type: "trapeze";
  x1: number;
  y1: string;
  x2: number;
  x3: number;
  x4: number;
  y2: string;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
};

type TriangleType = {
  type: "triangle";
  x1: number;
  y1: string;
  x2: number;
  y2: string;
  x3: number;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
};

type CircleType = {
  type: "circle";
  x: number;
  y1: string;
  r: number;
  startAngle?: number | undefined;
  endAngle?: number | undefined;
  anticlockwise?: boolean | undefined;
  fillColor?: string | undefined;
  strokeColor?: string | undefined;
};

export type SongType = {
  songID: string;
  songName: string;
  artistName: string;
  fullTitle: string;
  img: string;
  srcToSong: string;
  srcToSongIntro: string;
  playbackSpeed: number;
  startMovingDelay: number;
  canvasWigth: number;
  finishLineXCoordinate: number;
  itemsOnCanvasCoordinates: Array<any>; //разобраться почему не работает Array<TrapezeType | TriangleType | CircleType>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  songText: string;
};

type ChangecurrentSong = {
  type: typeof CHANGE_CURRENT_SONG;
  song: SongType;
};

export const changecurrentSong = (song: SongType): ChangecurrentSong => ({
  type: CHANGE_CURRENT_SONG,
  song: {
    ...song,
  },
});

type StopBtnIsPushSetType = {
  type: typeof STOP_BTN_IS_PUSHED_SET;
  isBtnPushed: boolean;
};

export const stopBtnIsPushSet = (
  isBtnPushed: boolean
): StopBtnIsPushSetType => ({
  type: STOP_BTN_IS_PUSHED_SET,
  isBtnPushed,
});

type IsCurrentSongPlayingSetterType = {
  type: typeof IS_CURRENT_SONG_PLAYING;
  isCurrentSongPlaying: boolean;
};

export const isCurrentSongPlayingSetter = (
  isCurrentSongPlaying: boolean
): IsCurrentSongPlayingSetterType => ({
  type: IS_CURRENT_SONG_PLAYING,
  isCurrentSongPlaying,
});

type SetNewVolumeOfSongType = {
  type: typeof SET_NEW_VOLUME_OF_SONG;
  newVolume: number;
};

export const setNewVolumeOfSong = (
  newVolume: number
): SetNewVolumeOfSongType => ({
  type: SET_NEW_VOLUME_OF_SONG,
  newVolume,
});

type SetNewVolumeOfVoiceType = {
  type: typeof SET_NEW_VOLUME_OF_VOICE;
  newVolume: number;
};
  
export const setNewVolumeOfVoice = (
  newVolume: number
): SetNewVolumeOfVoiceType => ({
  type: SET_NEW_VOLUME_OF_VOICE,
  newVolume,
});

type CurrentLanguageToggleType = {
  type: typeof SET_NEW_LANGUAGE;
  lang: "ru" | "en";
};

export const currentLanguageToggle = (
  lang: "ru" | "en"
): CurrentLanguageToggleType => ({
  type: SET_NEW_LANGUAGE,
  lang,
});

type ActionType =
  | CurrentLanguageToggleType
  | SetNewVolumeOfVoiceType
  | SetNewVolumeOfSongType
  | IsCurrentSongPlayingSetterType
  | StopBtnIsPushSetType
  | ChangecurrentSong;


  export type AdvertismentType = {
    advID: number;
    url: string;
    img: string;
    text: string;
  };



let initialState = {
  songs: [
    {
      songID: languagesJSONData.ru.songs[0].songID,
      songName: languagesJSONData.ru.songs[0].songName,
      artistName: languagesJSONData.ru.songs[0].artistName,
      fullTitle: languagesJSONData.ru.songs[0].fullTitle,
      img: imgSong1LepsRumkaVodki,
      srcToSong: srcToSong1LepsRumkaVodki,
      srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
      playbackSpeed: 100,
      startMovingDelay: 12.5,
      canvasWigth: 20000,
      finishLineXCoordinate: 16550,
      itemsOnCanvasCoordinates: [
        {
          type: "trapeze", x1: 430, y1: "h0", x2: 100, x3: 0, x4: 1000, y2: "h1"
        }, //Ночь по улицам пошла
        {
          type: "trapeze",x1: 1250,y1: "h6",x2: 100,x3: 100,x4: 1500,y2: "h3"
        },
        {
          type: "trapeze",x1: 1770,y1: "h0",x2: 100,x3: 100,x4: 2000,y2: "h2"
        }, //Звездной постутью
        {
          type: "triangle",x1: 2320,y1: "h0",x2: 2410,y2: "h3",x3: 2500
        }, // цариц
        {
          type: "trapeze",x1: 2700,y1: "h6",x2: 100,x3: 50,x4: 2950,y2: "h4"
        },
        {
          type: "trapeze",x1: 3200,y1: "h0",x2: 100,x3: 100,x4: 3750,y2: "h2"
        }, ////Слов и чисел простота
        {
          type: "trapeze",x1: 3950,y1: "h0",x2: 100,x3: 100,x4: 4380,y2: "h2"
        }, //у небесного моста
        {
          type: "trapeze",x1: 4620,y1: "h0",x2: 50,x3: 50,x4: 4830,y2: "h2"
        }, //раскидала перья
        {
          type: "triangle",x1: 5050,y1: "h0",x2: 5160,y2: "h3",x3: 5270
        }, //пти и и и и и ц
        {
          type: "trapeze",x1: 5980,y1: "h0", x2: 100,x3: 100,x4: 6460,y2: "h1"
        }, //Не забудутся никем
        {
          type: "trapeze",x1: 6680,y1: "h6",x2: 100,x3: 100,x4: 6920,y2: "h3"
        },
        {
          type: "trapeze",x1: 7220,y1: "h0",x2: 100,x3: 100,x4: 7820,y2: "h2"
        }, //праздник губ обид и глаз
        {
          type: "trapeze",x1: 8070,y1: "h6",x2: 100,x3: 100,x4: 8400,y2: "h4"
        },
        {
          type: "trapeze",x1: 8650,y1: "h0",x2: 100,x3: 100,x4: 9220,y2: "h2"
        }, //Забери меня в свой плен
        {
          type: "trapeze",x1: 9450,y1: "h0",x2: 100,x3: 100,x4: 9800,y2: "h1"
        }, //эту линию колен
        {
          type: "trapeze",x1: 10070,y1: "h0",x2: 100,x3: 50,x4: 10370,y2: "h2"
        }, //целовать в последний
        {
          type: "triangle",x1: 10570,y1: "h0",x2: 10670,y2: "h3",x3: 10770,
        }, //раааааааз
        {
          type: "trapeze",x1: 11120,y1: "h0",x2: 100,x3: 100,x4: 11500,y2: "h3"
        }, //Тоооолькооооооо
        {
          type: "trapeze",x1: 11930,y1: "h0",x2: 100,x3: 100,x4: 12530,y2: "h3"
        }, //рюмка водкииии на столе
        {
          type: "trapeze",x1: 12790,y1: "h0",x2: 100,x3: 100,x4: 13250,y2: "h2"
        }, //Ветер плачет за окнооом
        {
          type: "trapeze",x1: 13550,y1: "h0",x2: 30,x3: 30,x4: 13620,y2: "h3"
        }, //тиииииихооо
        {
          type: "trapeze",x1: 13820,y1: "h0",x2: 50,x3: 50,x4: 14120,y2: "h3"
        }, //больююююю
        {
          type: "trapeze",x1: 14270,y1: "h6",x2: 100,x3: 100,x4: 14570,y2: "h4"
        },
        {
          type: "trapeze",x1: 14776,y1: "h0",x2: 100,x3: 100,x4: 15220,y2: "h2"
        }, //о т з ы в а ю т с я в о м н е
        {
          type: "trapeze",x1: 15550,y1: "h0",x2: 100,x3: 100,x4: 15870,y2: "h2"
        }, // э т о й молодой   л у н ы
        {
          type: "trapeze",x1: 16220,y1: "h0",x2: 50,x3: 50,x4: 16400,y2: "h3"
        }, //к р и к и
      ],
      songText:
        "Ночь   по    улицам   пошла                                           звездной поступью  ца-а-ри-ц.                                      Слов и чисел простота-а          у небесного моста           раскидала перья пти и и и и ц.                                       Не забудутся никем                                             праздник губ обид и глаз.                                              Забери меня в свой пле-ен,      эту линию коле-ен           целовать в последний ра-а-з.                   Тоооолькооооооо                         рюмка водкииии на столе.           Ветер плачет за окнооом      тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
    },
    {
      songID: "1" as string,
      songName: languagesJSONData.ru.songs[1].songName,
      artistName: languagesJSONData.ru.songs[1].artistName,
      fullTitle: languagesJSONData.ru.songs[1].fullTitle,
      img: imgSong2VitaminkaBelorusskih,
      srcToSong: srcToSong2Vitaminka,
      srcToSongIntro: srcToSong2VitaminkaIntro,
      playbackSpeed: 170,
      startMovingDelay: 0,
      canvasWigth: 22500,
      finishLineXCoordinate: 21500,
      itemsOnCanvasCoordinates: [
        //беззабo-о-отно
        { type: "trapeze", x1: 470, y1: "h0", x2: 100, x3: 100, x4: 900, y2: "h2" },
        //вда-а-ааль
        { type: "triangle", x1: 1150, y1: "h0", x2: 1250, y2: "h2", x3: 1350, },
        //Наша с тобой
        { type: "trapeze", x1: 1790, y1: "h0", x2: 100, x3: 100, x4: 2000, y2: "h3" },
        //одна на двоих
        { type: "trapeze", x1: 2200, y1: "h0", x2: 100, x3: 100, x4: 2650, y2: "h2" },
        // об одном
        { type: "trapeze", x1: 3150, y1: "h0", x2: 100, x3: 100, x4: 3350, y2: "h3" },
        //не забывай
        { type: "trapeze", x1: 3650, y1: "h0", x2: 100, x3: 100, x4: 3900, y2: "h3" },
        //всех остальных
        { type: "trapeze", x1: 4800, y1: "h0", x2: 100, x3: 100, x4: 5350, y2: "h2" },
        //печаль
        { type: "trapeze", x1: 5900, y1: "h0", x2: 100, x3: 100, x4: 6500, y2: "h3" },
        //неееет
        { type: "trapeze", x1: 7800, y1: "h0", x2: 100, x3: 100, x4: 8050, y2: "h3" },
        //нееет
        { type: "trapeze", x1: 9000, y1: "h0", x2: 100, x3: 100, x4: 10100, y2: "h3" },
        //И все мои сюжеты по твоим картинкам
        { type: "trapeze", x1: 10850, y1: "h0", x2: 100, x3: 100, x4: 11800, y2: "h3" },
        //витаминка
        { type: "trapeze", x1: 12900, y1: "h0", x2: 100, x3: 100, x4: 13300, y2: "h3" },
        //сильно
        { type: "trapeze", x1: 14150, y1: "h0", x2: 100, x3: 100, x4: 14550, y2: "h2" },
        //в моей голове
        { type: "trapeze", x1: 14850, y1: "h0", x2: 100, x3: 100, x4: 15050, y2: "h3" },
        //витамина
        { type: "triangle", x1: 15600, y1: "h0", x2: 15700, y2: "h2", x3: 15800, },
        //И все мои сюжеты по твоим картинкам
        { type: "trapeze", x1: 16100, y1: "h0", x2: 100, x3: 100, x4: 17050, y2: "h3" },
        //витаминка
        { type: "trapeze", x1: 18150, y1: "h0", x2: 100, x3: 100, x4: 18550, y2: "h3" },
        //сильно
        { type: "trapeze", x1: 19400, y1: "h0", x2: 100, x3: 100, x4: 19800, y2: "h2" },
        //в моей голове
        { type: "trapeze", x1: 20100, y1: "h0", x2: 100, x3: 100, x4: 20300, y2: "h3" },
        //витамина
        { type: "triangle", x1: 20900, y1: "h0", x2: 20975, y2: "h2", x3: 21050, },
      ] as Array<
        TrapezeType | TriangleType | CircleType
      >,
      songText:
        "Так беззабo-о-отно уходит вда-а-а-а-аль          Наша с тоб-о-ой  жизнь одна-а-а на дво-о-и-их Я прошу об одно-о-ом, только не забыва-аай обо мне, как мы с тобой и о все-е-е-е-х  оста-а-а-льны-ы-х    Провожая печа-а-аль, мы просто мимо молчим Просто и без при-и-и-чин, ссылаясь на н-е-е-е-е-т                                                   И в этот моме-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-ент                           И все мои сюжеты по твоим карти-и-н-к-а-а-а м      Девочка-разноцветная витами-и-и-и-и н-к-а-а-а-а Сегодня я буду любить тебя си-и-ильно-о-о-о     Пока в моей голове действие витами-и-и-и-на              И все мои сюжеты по твоим карти-и-н-к-а-а-а м      Девочка-разноцветная витами-и-и-и-и н-к-а-а-а-а Сегодня я буду любить тебя си-и-ильно-о-о-о     Пока в моей голове действие витами-и-и-и-на                                                                                                                                          ",
    },
    {
      songID: "2" as string,
      songName: languagesJSONData.ru.songs[2].songName,
      artistName: languagesJSONData.ru.songs[2].artistName,
      fullTitle: languagesJSONData.ru.songs[2].fullTitle,
      img: imgSong3AiowaSmile,
      srcToSong: srcToong3AiowaSmile,
      srcToSongIntro: srcToong3AiowaSmileIntro,
      playbackSpeed: 165,
      startMovingDelay: 12.1,
      canvasWigth: 17200,
      finishLineXCoordinate: 15500,
      itemsOnCanvasCoordinates: [
        //Я птицу счастья свою отпускаю на юг
        { type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1300, y2: "h1" },
        //Теперь   сама    я     пою
        { type: "trapeze", x1: 1950, y1: "h0", x2: 100, x3: 100, x4: 2250, y2: "h2" },
        //теперь сама летаю
        { type: "trapeze", x1: 2500, y1: "h0", x2: 100, x3: 100, x4: 2700, y2: "h2" },
        //Аа  -  аа
        { type: "triangle", x1: 2900, y1: "h0", x2: 3025, y2: "h3", x3: 3150, },
        //Аа  -  аа
        { type: "triangle", x1: 4200, y1: "h0", x2: 4310, y2: "h3", x3: 4420, },
        //В открытый космос лечу
        { type: "trapeze", x1: 5400, y1: "h0", x2: 100, x3: 100, x4: 5900, y2: "h1" },
        //кометы  огибая
        { type: "trapeze", x1: 6050, y1: "h0", x2: 100, x3: 100, x4: 6400, y2: "h2" },
        //Тебя мечтать научу
        { type: "trapeze", x1: 6670, y1: "h0", x2: 100, x3: 100, x4: 7050, y2: "h2" },
        //теперь одна мы стая
        { type: "trapeze", x1: 7200, y1: "h0", x2: 100, x3: 100, x4: 7650, y2: "h1" },
        //Аа  -  аа
        { type: "triangle", x1: 7790, y1: "h0", x2: 7890, y2: "h4", x3: 7990, },
  
        { type: "trapeze", x1: 8300, y1: "h6", x2: 100, x3: 100, x4: 8650, y2: "h4" },
  
        { type: "trapeze", x1: 9000, y1: "h6", x2: 100, x3: 100, x4: 9600, y2: "h4" },
        //Только у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 9800, y1: "h0", x2: 100, x3: 100, x4: 10350, y2: "h3" },
        //невесомости поверь
        { type: "trapeze", x1: 11000, y1: "h0", x2: 100, x3: 100, x4: 11450, y2: "h3" },
        //и отд - а - а- -а- -а- йся
        { type: "triangle", x1: 11800, y1: "h0", x2: 12050, y2: "h4", x3: 12300, },
        //у -   лы  -  бааааай-  ся
        { type: "triangle", x1: 12720, y1: "h0", x2: 12820, y2: "h4", x3: 12920, },
        //у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 13350, y1: "h0", x2: 100, x3: 100, x4: 13750, y2: "h2" },
        //aaaa
        { type: "triangle", x1: 14070, y1: "h0", x2: 14135, y2: "h1", x3: 14200, },
        //aaaa
        { type: "triangle", x1: 14370, y1: "h0", x2: 14420, y2: "h2", x3: 14470, },
        //aaaa
        { type: "triangle", x1: 14580, y1: "h0", x2: 14630, y2: "h2", x3: 14680, },
        //у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 14770, y1: "h0", x2: 100, x3: 100, x4: 14970, y2: "h2" },
      ],
      songText:
        "Я  птицу     счастья     свою      отпускаю    на    юг.    Теперь  сама  я пою, теперь сама летаю     Аа  -  аа   -  аа.                                                           Аа  -  аа -  аа                                                         В открытый космос лечу,  кометы  огибая.            Тебя мечтать научу, теперь одна мы стая     Аа-аа -аа.                                                                                                          Только у -   лы  -  бааааай-  ся,   улыбайся             невесомости поверь                 и отд - а - а- -а- -а- йся.      У -   лы  -  бааай  -  ся,       Улы  -  бааааай  -  сяяяяяя,           Аа-аа-ааа      -ааа       ааа     улыбайся!                                                                                                                                ",
    },
    {
      songID: "3" as string,
      songName: languagesJSONData.ru.songs[3].songName,
      artistName: languagesJSONData.ru.songs[3].artistName,
      fullTitle: languagesJSONData.ru.songs[3].fullTitle,
      img: imgSong4PirozhkowZacepila,
      srcToSong: srcToSong4PirozhkowZacepila,
      srcToSongIntro: srcToSong4PirozhkowZacepilaIntro,
      playbackSpeed: 150,
      startMovingDelay: 17.2,
      canvasWigth: 21000,
      finishLineXCoordinate: 20000,
      itemsOnCanvasCoordinates: [
        //Добрый вечер! Эй, полегче
        { type: "trapeze", x1: 380, y1: "h0", x2: 100, x3: 100, x4: 1050, y2: "h1" },
        //Пусть он длится бесконечно
        { type: "trapeze", x1: 1350, y1: "h0", x2: 100, x3: 100, x4: 1600, y2: "h2" },
        //Было Хорошо
        { type: "trapeze", x1: 2050, y1: "h0", x2: 100, x3: 100, x4: 2500, y2: "h3" },
        //Этот праздник
        { type: "trapeze", x1: 3250, y1: "h0", x2: 100, x3: 100, x4: 3500, y2: "h2" },
        //Уже ушел
        { type: "trapeze", x1: 4100, y1: "h0", x2: 100, x3: 100, x4: 4400, y2: "h3" },
        // Выходит на танцпол
        { type: "trapeze", x1: 4720, y1: "h0", x2: 100, x3: 100, x4: 5190, y2: "h3" },
        // почему я просто не пошел
        { type: "trapeze", x1: 5900, y1: "h0", x2: 100, x3: 100, x4: 6450, y2: "h2" },
        // сказала что я сегодня 
        { type: "trapeze", x1: 7200, y1: "h0", x2: 100, x3: 100, x4: 7900, y2: "h3" },
        //танцевал
        { type: "triangle", x1: 8500, y1: "h0", x2: 8600, y2: "h3", x3: 8700 },
        //снилось никому
        { type: "triangle", x1: 9150, y1: "h0", x2: 9285, y2: "h2", x3: 9400 },
        // я не пойму
        { type: "triangle", x1: 9800, y1: "h0", x2: 9900, y2: "h3", x3: 10000 },
        // ну почему
        { type: "trapeze", x1: 10600, y1: "h0", x2: 100, x3: 100, x4: 10900, y2: "h2" },
  
        { type: "trapeze", x1: 11350, y1: "h3", x2: 0, x3: 0, x4: 11700, y2: "h5" },
        { type: "trapeze", x1: 12000, y1: "h6", x2: 100, x3: 100, x4: 12350, y2: "h3" },
        { type: "trapeze", x1: 12800, y1: "h6", x2: 100, x3: 100, x4: 13200, y2: "h4" },
        // зацепила
        { type: "trapeze", x1: 13700, y1: "h0", x2: 100, x3: 100, x4: 14140, y2: "h2" },
        // ослепила
        { type: "trapeze", x1: 14480, y1: "h0", x2: 100, x3: 100, x4: 14680, y2: "h3" },
        // порога
        { type: "triangle", x1: 15050, y1: "h0", x2: 15125, y2: "h2", x3: 15200 },
        // любви
        { type: "triangle", x1: 15780, y1: "h0", x2: 15855, y2: "h2", x3: 15930 },
        // Зацепила
        { type: "triangle", x1: 16480, y1: "h0", x2: 16555, y2: "h3", x3: 16630 },
        // Соблазнила
        { type: "trapeze", x1: 17170, y1: "h0", x2: 100, x3: 100, x4: 17470, y2: "h2" },
        // До порога довела
        { type: "trapeze", x1: 18000, y1: "h0", x2: 100, x3: 100, x4: 18360, y2: "h2" },
        // А любви не дала
        { type: "trapeze", x1: 18590, y1: "h0", x2: 100, x3: 100, x4: 18990, y2: "h2" },
        // Зацепила меня
        { type: "triangle", x1: 19280, y1: "h0", x2: 19430, y2: "h3", x3: 19580 }
      ],
      songText:
        "Добрый вечер! Эй, полегче, пусть он длится бесконечно. Нам сегодня было хорошо!                                   Этот праздник не подвел, Я   почти    уже    ушел,    И тут она выходит на танцпол.                              Ну, почему я просто не пошел домой?                       Зачем сказал я, что сегодня холостой?                         Я танцевал так, как не снилось никому,                      Я не пойму,                         ну почему-у-у-у-у?                                                                                                                                                                         Заце - пи -  ла    меня,            осле - пила    меня,    До   порога   довела,               а  любви   не    дала.        Зацепила             меня,        соблазнила     меня,           До порога     довела,         а  любви  не  дала.              Зацепила   меня…                                                                                                                 ",
    },
    {
      songID: "4" as string,
      songName: languagesJSONData.ru.songs[4].songName,
      artistName: languagesJSONData.ru.songs[4].artistName,
      fullTitle: languagesJSONData.ru.songs[4].fullTitle,
      img: imgSong5SukochevBabuchka,
      srcToSong: srcToSong5SukochevBabuchka,
      srcToSongIntro: srcToSong5SukochevBabuchkaIntro,
      playbackSpeed: 170,
      startMovingDelay: 14.5,
      canvasWigth: 15000,
      finishLineXCoordinate: 14000,
      itemsOnCanvasCoordinates: [
        //Моя   бабушка   курит   тру  -  б  -  ку
        { type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1319, y2: "h1" },
        //чёрный-пречёрный  табак
        { type: "trapeze", x1: 1600, y1: "h0", x2: 100, x3: 100, x4: 2200, y2: "h2" },
        { type: "triangle", x1: 2450, y1: "h6", x2: 2525, y2: "h4", x3: 2600, },
        //Моя   бабушка 
        { type: "trapeze", x1: 2700, y1: "h0", x2: 100, x3: 100, x4: 3000, y2: "h1" },
        //тру  -  б  -  ку
        { type: "trapeze", x1: 3300, y1: "h0", x2: 100, x3: 100, x4: 3610, y2: "h3" },
        //в суровый
        { type: "triangle", x1: 3900, y1: "h0", x2: 3975, y2: "h2", x3: 4050, },
        //моряцкий 
        { type: "triangle", x1: 4150, y1: "h0", x2: 4225, y2: "h3", x3: 4300, },
        // затяг
        { type: "triangle", x1: 4450, y1: "h0", x2: 4525, y2: "h2", x3: 4600, },
        //Моя бабушка курит
        { type: "trapeze", x1: 4950, y1: "h0", x2: 100, x3: 100, x4: 5400, y2: "h2" },
        //тру  -  б  -  ку
        { type: "triangle", x1: 5600, y1: "h0", x2: 5700, y2: "h2", x3: 5800, },
        //и обожает   огненный     ром
        { type: "trapeze", x1: 6100, y1: "h0", x2: 100, x3: 100, x4: 6800, y2: "h2" },
        //и когда я к бабуле заскочу на минутку
        { type: "trapeze", x1: 7200, y1: "h0", x2: 100, x3: 100, x4: 8050, y2: "h3" },
        //мы     c    ней
        { type: "triangle", x1: 8250, y1: "h0", x2: 8375, y2: "h2", x3: 8500, },
        //его     весело
        { type: "triangle", x1: 8650, y1: "h0", x2: 8725, y2: "h2", x3: 8800, },
        //пьём
        { type: "triangle", x1: 9050, y1: "h0", x2: 9125, y2: "h3", x3: 9200, },
        //У    неё     ничего     не осталось
        { type: "trapeze", x1: 9500, y1: "h0", x2: 100, x3: 100, x4: 10200, y2: "h2" },
        { type: "trapeze", x1: 10350, y1: "h6", x2: 100, x3: 100, x4: 10600, y2: "h4" },
        //у неё в кошельке три рубля
        { type: "trapeze", x1: 10750, y1: "h0", x2: 100, x3: 100, x4: 11400, y2: "h2" },
        { type: "triangle", x1: 11550, y1: "h6", x2: 11625, y2: "h4", x3: 11700, },
        //моя бабушка курит трубку
        { type: "trapeze", x1: 11950, y1: "h0", x2: 100, x3: 100, x4: 12550, y2: "h3" },
        //труб    ку     ку     рит
        { type: "trapeze", x1: 12930, y1: "h0", x2: 100, x3: 100, x4: 13400, y2: "h4" },
        //бабушка    моя!
        { type: "triangle", x1: 13600, y1: "h0", x2: 13700, y2: "h3", x3: 13800, }
      ],
      songText:
        "Моя   бабушка   курит   тру  -  б  -  ку,              чёрный-пречёрный  табак,                      Моя   бабушка     курит   тру  -  б  -  ку,              в суровый    моряцкий    затяг.                      Моя бабушка      курит    тру  -    б      -  ку        и обожает   огненный    ром,                      и когда я к бабуле заскочу на минутку,   мы     c    ней     его     весело     пьём.                   У    неё     ничего     не осталось,                             у неё в кошельке три рубля,                         моя бабушка курит    трубку,                   труб    ку     ку     рит         бабушка    моя!                                                                                                          ",
    },
    {
      songID: "5" as string,
      songName: languagesJSONData.ru.songs[5].songName,
      artistName: languagesJSONData.ru.songs[5].artistName,
      fullTitle: languagesJSONData.ru.songs[5].fullTitle,
      img: imgSong6NatalyOBozhe,
      srcToSong: srcToSong6NatalyOBozhe,
      srcToSongIntro: srcToSong6NatalyOBozheIntro,
      playbackSpeed: 150,
      startMovingDelay: 8.5,
      canvasWigth: 22000,
      finishLineXCoordinate: 21000,
      itemsOnCanvasCoordinates: [
        // Ты ворвался 
        { type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 750, y2: "h2" },
        //нежданно изменил
        { type: "trapeze", x1: 1200, y1: "h0", x2: 100, x3: 100, x4: 1550, y2: "h2" },
        //мою-ю-ю  ре-а- а-ально-о-ость
        { type: "trapeze", x1: 2200, y1: "h0", x2: 100, x3: 100, x4: 2800, y2: "h3" },
        { type: "trapeze", x1: 3100, y1: "h6", x2: 100, x3: 100, x4: 3400, y2: "h5" },
        //вспышки-и-и,    
        { type: "trapeze", x1: 3600, y1: "h0", x2: 100, x3: 100, x4: 3900, y2: "h2" },
        //и-и-и-и любовь
        { type: "trapeze", x1: 4200, y1: "h0", x2: 100, x3: 100, x4: 4420, y2: "h2" },
        { type: "trapeze", x1: 4650, y1: "h6", x2: 50, x3: 50, x4: 4750, y2: "h4" },
        // без передышки
        { type: "trapeze", x1: 4950, y1: "h0", x2: 100, x3: 100, x4: 5250, y2: "h3" },
       //Все начиналось
       { type: "trapeze", x1: 5550, y1: "h0", x2: 100, x3: 100, x4: 5850, y2: "h2" },       
        //как неви-и-нный флирт
        { type: "trapeze", x1: 6050, y1: "h0", x2: 100, x3: 100, x4: 6350, y2: "h2" },
        //а       теперь
        { type: "triangle", x1: 6800, y1: "h0", x2: 6885, y2: "h3", x3: 6970 },
        //без теб-я-мой мир
        { type: "trapeze", x1: 7300, y1: "h0", x2: 100, x3: 100, x4: 7750, y2: "h3" },
        // с другой пла  не  т-ы-ы-ы
        { type: "trapeze", x1: 8500, y1: "h0", x2: 100, x3: 100, x4: 9100, y2: "h3" },
        { type: "triangle", x1: 9300, y1: "h6", x2: 9400, y2: "h4", x3: 9500 },
        //ты из моей мечты-ы-ы-!
        { type: "trapeze", x1: 9750, y1: "h0", x2: 100, x3: 100, x4: 10350, y2: "h3" },
        //О-о-о Бо-о-же, как-о-ой мужчи-и-на
        { type: "trapeze", x1: 11000, y1: "h0", x2: 100, x3: 100, x4: 11750, y2: "h3" },
        //Я хочу    
        { type: "triangle", x1: 12190, y1: "h0", x2: 12255, y2: "h3", x3: 12320 },
        //От тебя    
        { type: "triangle", x1: 12450, y1: "h0", x2: 12525, y2: "h3", x3: 12600 },
        //Сына    
        { type: "triangle", x1: 12750, y1: "h0", x2: 12825, y2: "h3", x3: 12900 },
        //и я хочу-у-у   от тебя         дочку-у-у-у-у
        { type: "trapeze", x1: 13400, y1: "h0", x2: 100, x3: 100, x4: 14320, y2: "h3" },
        //и точ - ка,
        { type: "trapeze", x1: 14640, y1: "h0", x2: 100, x3: 100, x4: 14840, y2: "h3" },
        //и точ - ка,
        { type: "trapeze", x1: 15060, y1: "h0", x2: 100, x3: 100, x4: 15410, y2: "h4" },
        { type: "trapeze", x1: 15560, y1: "h6", x2: 100, x3: 100, x4: 15810, y2: "h5" },
        //О-о-о Бо-о-же, как-о-ой мужчи-и-на
        { type: "trapeze", x1: 15960, y1: "h0", x2: 100, x3: 100, x4: 16660, y2: "h3" },
        //Я хочу    
        { type: "triangle", x1: 17160, y1: "h0", x2: 17210, y2: "h3", x3: 17260 },
        //От тебя    
        { type: "triangle", x1: 17410, y1: "h0", x2: 17500, y2: "h3", x3: 17590 },
        //Сына    
        { type: "triangle", x1: 17760, y1: "h0", x2: 17835, y2: "h3", x3: 17910 },
        //и я хочу-у-у   от тебя         дочку-у-у-у-у
        { type: "trapeze", x1: 18410, y1: "h0", x2: 100, x3: 100, x4: 19310, y2: "h3" },
        //и точ - ка,
        { type: "trapeze", x1: 19700, y1: "h0", x2: 100, x3: 100, x4: 19910, y2: "h4" },
        //и точ - ка,
        { type: "trapeze", x1: 20210, y1: "h0", x2: 100, x3: 100, x4: 20490, y2: "h4" }      
      ],
      songText:
        "Ты  вор - вался    в жизнь мою неждан-н-н-но, из - ме - нил           мою-ю-ю  ре-а- а-ально-о-ость. Мысли мерцают,    на сердце вспышки-и-и,    и-и-и-и любовь                             без передышки.  Все начина-а-а-лось как неви-и-нный флирт,          а       теперь               пуст без теб-я-мой мир.        Ты волшебный, ты с другой пла  не  т-ы-ы-ы,                                            ты из моей мечты-ы-ы-!                              О-о-о Бо-о-же, как-о-ой мужчи-и-на,                         я хочу      от тебя        сы - на,                      и я хочу-у-у   от тебя         дочку-у-у-у-у,                  и точ - ка,            и  точ - ка-а-а!                      О-о-о Бо-о-же, как-о-ой мужчи-и-на,                          я хочу       от тебя         сы - на,                        и я хочу-у-у    от тебя          дочку-у-у-у-у,                   и точ - ка,             и  точ - ка-а-а!                                                                                                                               ",
   },
  ],
  currentSong: {
    songID: languagesJSONData.ru.songs[0].songID,
    songName: languagesJSONData.ru.songs[0].songName,
    artistName: languagesJSONData.ru.songs[0].artistName,
    fullTitle: languagesJSONData.ru.songs[0].fullTitle,
    img: imgSong1LepsRumkaVodki,
    srcToSong: srcToSong1LepsRumkaVodki,
    srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
    playbackSpeed: 100,
    startMovingDelay: 12.5,
    canvasWigth: 20000,
    finishLineXCoordinate: 16550,
    itemsOnCanvasCoordinates: [
      {
        type: "trapeze", x1: 430, y1: "h0", x2: 100, x3: 0, x4: 1000, y2: "h1"
      }, //Ночь по улицам пошла
      {
        type: "trapeze",x1: 1250,y1: "h6",x2: 100,x3: 100,x4: 1500,y2: "h3"
      },
      {
        type: "trapeze",x1: 1770,y1: "h0",x2: 100,x3: 100,x4: 2000,y2: "h2"
      }, //Звездной постутью
      {
        type: "triangle",x1: 2320,y1: "h0",x2: 2410,y2: "h3",x3: 2500
      }, // цариц
      {
        type: "trapeze",x1: 2700,y1: "h6",x2: 100,x3: 50,x4: 2950,y2: "h4"
      },
      {
        type: "trapeze",x1: 3200,y1: "h0",x2: 100,x3: 100,x4: 3750,y2: "h2"
      }, ////Слов и чисел простота
      {
        type: "trapeze",x1: 3950,y1: "h0",x2: 100,x3: 100,x4: 4380,y2: "h2"
      }, //у небесного моста
      {
        type: "trapeze",x1: 4620,y1: "h0",x2: 50,x3: 50,x4: 4830,y2: "h2"
      }, //раскидала перья
      {
        type: "triangle",x1: 5050,y1: "h0",x2: 5160,y2: "h3",x3: 5270
      }, //пти и и и и и ц
      {
        type: "trapeze",x1: 5980,y1: "h0", x2: 100,x3: 100,x4: 6460,y2: "h1"
      }, //Не забудутся никем
      {
        type: "trapeze",x1: 6680,y1: "h6",x2: 100,x3: 100,x4: 6920,y2: "h3"
      },
      {
        type: "trapeze",x1: 7220,y1: "h0",x2: 100,x3: 100,x4: 7820,y2: "h2"
      }, //праздник губ обид и глаз
      {
        type: "trapeze",x1: 8070,y1: "h6",x2: 100,x3: 100,x4: 8400,y2: "h4"
      },
      {
        type: "trapeze",x1: 8650,y1: "h0",x2: 100,x3: 100,x4: 9220,y2: "h2"
      }, //Забери меня в свой плен
      {
        type: "trapeze",x1: 9450,y1: "h0",x2: 100,x3: 100,x4: 9800,y2: "h1"
      }, //эту линию колен
      {
        type: "trapeze",x1: 10070,y1: "h0",x2: 100,x3: 50,x4: 10370,y2: "h2"
      }, //целовать в последний
      {
        type: "triangle",x1: 10570,y1: "h0",x2: 10670,y2: "h3",x3: 10770,
      }, //раааааааз
      {
        type: "trapeze",x1: 11120,y1: "h0",x2: 100,x3: 100,x4: 11500,y2: "h3"
      }, //Тоооолькооооооо
      {
        type: "trapeze",x1: 11930,y1: "h0",x2: 100,x3: 100,x4: 12530,y2: "h3"
      }, //рюмка водкииии на столе
      {
        type: "trapeze",x1: 12790,y1: "h0",x2: 100,x3: 100,x4: 13250,y2: "h2"
      }, //Ветер плачет за окнооом
      {
        type: "trapeze",x1: 13550,y1: "h0",x2: 30,x3: 30,x4: 13620,y2: "h3"
      }, //тиииииихооо
      {
        type: "trapeze",x1: 13820,y1: "h0",x2: 50,x3: 50,x4: 14120,y2: "h3"
      }, //больююююю
      {
        type: "trapeze",x1: 14270,y1: "h6",x2: 100,x3: 100,x4: 14570,y2: "h4"
      },
      {
        type: "trapeze",x1: 14776,y1: "h0",x2: 100,x3: 100,x4: 15220,y2: "h2"
      }, //о т з ы в а ю т с я в о м н е
      {
        type: "trapeze",x1: 15550,y1: "h0",x2: 100,x3: 100,x4: 15870,y2: "h2"
      }, // э т о й молодой   л у н ы
      {
        type: "trapeze",x1: 16220,y1: "h0",x2: 50,x3: 50,x4: 16400,y2: "h3"
      }, //к р и к и
    ],
    songText:
      "Ночь   по    улицам   пошла                                           звездной поступью  ца-а-ри-ц.                                      Слов и чисел простота-а          у небесного моста           раскидала перья пти и и и и ц.                                       Не забудутся никем                                             праздник губ обид и глаз.                                              Забери меня в свой пле-ен,      эту линию коле-ен           целовать в последний ра-а-з.                   Тоооолькооооооо                         рюмка водкииии на столе.           Ветер плачет за окнооом      тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
  },
  isCurrentSongSet: false,
  currentSongVolume: 0.5,
  currentVoiceVolume: 1,
  currentLanguage: "ru" as "ru" | "en",
  isStopBtnPushed: false,
  isCurrentSongPlaying: false,
  srcToSoundExploision: srcToSoundExploision,
  srcToSoundOfFinish: srcToSoundOfFinish,
  srcTofinishLineImg: srcTofinishLineImg,
  languagesJSONData: languagesJSONData,
  advertisment: [
    {
      advID: 1,
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img1,
      text: languagesJSONData.ru.settingsPageTexts.adv1Text,
    },
    {
      advID: 2,
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img2,
      text: languagesJSONData.ru.settingsPageTexts.adv2Text,
    },
    {
      advID: 3,
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img3,
      text: languagesJSONData.ru.settingsPageTexts.adv3Text,
    },
    {
      advID: 4,
      url:
        "https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8",
      img: Img4,
      text: languagesJSONData.ru.settingsPageTexts.adv4Text,
    },
    {
      advID: 5,
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img5,
      text: languagesJSONData.ru.settingsPageTexts.adv5Text,
    },
    {
      advID: 6,
      url: "https://it-incubator.by/",
      img: Img6,
      text: languagesJSONData.ru.settingsPageTexts.adv6Text,
    },
    {
      advID: 7,
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img3,
      text: languagesJSONData.ru.settingsPageTexts.adv7Text,
    },
    {
      advID: 8,
      url: "https://it-incubator.by/",
      img: Img6,
      text: languagesJSONData.ru.settingsPageTexts.adv8Text,
    },
  ],
};

export type StartPageInitialStateType = typeof initialState;

const startPageReducer = (
  state = initialState,
  action: ActionType
): StartPageInitialStateType => {
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.song,
        isCurrentSongSet: true,
      };
    case STOP_BTN_IS_PUSHED_SET:
      return {
        ...state,
        isStopBtnPushed: action.isBtnPushed,
      };
    case IS_CURRENT_SONG_PLAYING:
      return {
        ...state,
        isCurrentSongPlaying: action.isCurrentSongPlaying,
      };
    case SET_NEW_VOLUME_OF_SONG:
      return {
        ...state,
        currentSongVolume: action.newVolume,
      };
    case SET_NEW_VOLUME_OF_VOICE:
      return {
        ...state,
        currentVoiceVolume: action.newVolume,
      };
    case SET_NEW_LANGUAGE:

      let newLangSong = state.songs.map((song:SongType, i:number) => {
        return{            
          ...song, 
          //@ts-ignore
          songName: languagesJSONData[action.lang].songs[i].songName,
          //@ts-ignore
          artistName: languagesJSONData[action.lang].songs[i].artistName,
          //@ts-ignore
          fullTitle: languagesJSONData[action.lang].songs[i].fullTitle
        } 
      });

      let newLangCurrentSong = {...state.currentSong, 
      //@ts-ignore
      songName: languagesJSONData[action.lang].songs[+state.currentSong.songID].songName,
      //@ts-ignore
      artistName: languagesJSONData[action.lang].songs[+state.currentSong.songID].artistName,
      //@ts-ignore
      fullTitle: languagesJSONData[action.lang].songs[+state.currentSong.songID].fullTitle}
        
      let newLangAdvert = state.advertisment.map((adv:AdvertismentType, index)=>{
        return{            
          ...adv, 
          //@ts-ignore
          text: languagesJSONData[action.lang].settingsPageTexts[`adv${index+1}Text`] as string
        }
      });

      return {
        ...state,
        currentLanguage: action.lang,
        songs: newLangSong,
        currentSong: newLangCurrentSong,
        advertisment: newLangAdvert
      }
    default:
      return state;
  }
};

export default startPageReducer;
