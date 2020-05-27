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

const CHANGE_CURRENT_SONG = "ORAOKE/START_PAGE/CHANGE_CURRENT_SONG";
const STOP_BTN_IS_PUSHED_SET = "ORAOKE/PLAY_SONG_PAGE/STOP_BTN_IS_PUSHED_SET";
const IS_CURRENT_SONG_PLAYING = "ORAOKE/PLAY_SONG_PAGE/IS_CURRENT_SONG_PLAYING";
const SET_NEW_VOLUME_OF_SONG = "ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_SONG";
const SET_NEW_VOLUME_OF_VOICE = "ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_VOICE";
const SET_NEW_LANGUAGE = "ORAOKE/START_PAGE/SET_NEW_LANGUAGE";

export type MultiLanguageTextType = {
  ru: string;
  en: string;
};

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
  songName: MultiLanguageTextType;
  artistName: MultiLanguageTextType;
  fullTitle: MultiLanguageTextType;
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

//перенести честь данных в новый редюсер song_play_page

let initialState = {
  songs: [
    {
      songID: "0" as string,
      songName: {
        ru: "Рюмка водки на столе",
        en: "Rumka vodki na stole",
      },
      artistName: {
        ru: "Григорий Лепс",
        en: "Grigoriy Leps",
      },
      fullTitle: {
        ru: "Григорий Лепс - Рюмка водки на столе",
        en: "Grigoriy Leps - Rumka vodki na stole",
      },
      img: imgSong1LepsRumkaVodki,
      srcToSong: srcToSong1LepsRumkaVodki,
      srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
      playbackSpeed: 100,
      startMovingDelay: 26,
      canvasWigth: 20000,
      finishLineXCoordinate: 16300,
      itemsOnCanvasCoordinates: [
        {
          type: "trapeze", x1: 400, y1: "h0",
          x2: 100,
          x3: 0,
          x4: 950,
          y2: "h1",
        }, //Ночь по улицам пошла
        {
          type: "trapeze",
          x1: 1250,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 1500,
          y2: "h3",
        },
        {
          type: "trapeze",
          x1: 1680,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 2000,
          y2: "h2",
        }, //Звездной постутью
        {
          type: "triangle",
          x1: 2150,
          y1: "h0",
          x2: 2225,
          y2: "h3",
          x3: 2300,
        }, // цариц
        {
          type: "trapeze",
          x1: 2500,
          y1: "h6",
          x2: 100,
          x3: 50,
          x4: 2900,
          y2: "h4",
        },
        {
          type: "trapeze",
          x1: 3050,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 3620,
          y2: "h2",
        }, ////Слов и чисел простота
        {
          type: "trapeze",
          x1: 3800,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 4250,
          y2: "h2",
        }, //у небесного моста
        {
          type: "trapeze",
          x1: 4470,
          y1: "h0",
          x2: 50,
          x3: 50,
          x4: 4880,
          y2: "h2",
        }, //раскидала перья
        {
          type: "triangle",
          x1: 5000,
          y1: "h0",
          x2: 5125,
          y2: "h3",
          x3: 5250,
        }, //пти и и и и и ц
        {
          type: "trapeze",
          x1: 5750,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 6240,
          y2: "h1",
        }, //Не забудутся никем
        {
          type: "trapeze",
          x1: 6560,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 6800,
          y2: "h3",
        },
        {
          type: "trapeze",
          x1: 7050,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 7650,
          y2: "h2",
        }, //праздник губ обид и глаз
        {
          type: "trapeze",
          x1: 7850,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 8200,
          y2: "h4",
        },
        {
          type: "trapeze",
          x1: 8430,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 9100,
          y2: "h3",
        }, //Забери меня в свой плен
        {
          type: "trapeze",
          x1: 9230,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 9630,
          y2: "h2",
        }, //эту линию колен
        {
          type: "trapeze",
          x1: 9850,
          y1: "h0",
          x2: 100,
          x3: 50,
          x4: 10200,
          y2: "h2",
        }, //целовать в последний
        {
          type: "triangle",
          x1: 10400,
          y1: "h0",
          x2: 10525,
          y2: "h4",
          x3: 10650,
        }, //раааааааз
        {
          type: "trapeze",
          x1: 10900,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 11370,
          y2: "h3",
        }, //Тоооолькооооооо
        {
          type: "trapeze",
          x1: 11630,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 12266,
          y2: "h3",
        }, //рюмка водкииии на столе
        {
          type: "trapeze",
          x1: 12570,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 12990,
          y2: "h2",
        }, //Ветер плачет за окнооом
        {
          type: "trapeze",
          x1: 13200,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 13400,
          y2: "h3",
        }, //тиииииихооо
        {
          type: "trapeze",
          x1: 13550,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 13850,
          y2: "h3",
        }, //больююююю
        {
          type: "trapeze",
          x1: 14000,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 14300,
          y2: "h4",
        },
        {
          type: "trapeze",
          x1: 14386,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 15000,
          y2: "h2",
        }, //о т з ы в а ю т с я в о м н е
        {
          type: "trapeze",
          x1: 15180,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 15650,
          y2: "h2",
        }, // э т о й молодой   л у н ы
        {
          type: "trapeze",
          x1: 15880,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 16090,
          y2: "h3",
        }, //к р и к и
      ],
      songText:
        "Ночь по улицам пошла                                          звездной поступью цариц.                                               Слов и чисел простота          у небесного моста           раскидала перья пти и и и и и ц.                              Не забудутся никем                                                  праздник губ обид и глаз.                                                Забери меня в свой плен,       эту линию колен            целовать в последний раааааааз.               Тоооолькооооооо                рюмка водкииии на столе.           Ветер плачет за окнооом      тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
    },
    {
      songID: "1" as string,
      songName: {
        ru: "Витаминка",
        en: "Vitaminka",
      },
      artistName: {
        ru: "Тима Белорусских",
        en: "Tima Belorusskih",
      },
      fullTitle: {
        ru: "Тима Белорусских - Витаминка",
        en: "Tima Belorusskih - Vitaminka",
      },
      img: imgSong2VitaminkaBelorusskih,
      srcToSong: srcToSong2Vitaminka,
      srcToSongIntro: srcToSong2VitaminkaIntro,
      playbackSpeed: 170,
      startMovingDelay: 0,
      canvasWigth: 22500,
      finishLineXCoordinate: 21500,
      itemsOnCanvasCoordinates: [
        //беззабo-о-отно
        { type: "trapeze", x1: 470, y1: "h0", x2: 100, x3: 100, x4: 900, y2: "h3" },
        //вда-а-ааль
        { type: "triangle", x1: 1050, y1: "h0", x2: 1175, y2: "h2", x3: 1300, },
        //беззабo-о-отно
        { type: "trapeze", x1: 1590, y1: "h0", x2: 100, x3: 100, x4: 1800, y2: "h3" },
        //одна на двоих
        { type: "trapeze", x1: 2050, y1: "h0", x2: 100, x3: 100, x4: 2500, y2: "h3" },
        //
        { type: "trapeze", x1: 2950, y1: "h0", x2: 100, x3: 100, x4: 3150, y2: "h4" },
        //не забывай
        { type: "trapeze", x1: 3500, y1: "h0", x2: 100, x3: 100, x4: 3750, y2: "h3" },
        //всех остальных
        { type: "trapeze", x1: 4500, y1: "h0", x2: 100, x3: 100, x4: 5250, y2: "h3" },
        //печаль
        { type: "trapeze", x1: 5650, y1: "h0", x2: 100, x3: 100, x4: 6500, y2: "h4" },
        //неееет
        { type: "trapeze", x1: 7500, y1: "h0", x2: 100, x3: 100, x4: 7850, y2: "h3" },
        //нееет
        { type: "trapeze", x1: 9000, y1: "h0", x2: 100, x3: 100, x4: 10100, y2: "h4" },
        //по твоим картинкам
        { type: "trapeze", x1: 10850, y1: "h0", x2: 100, x3: 100, x4: 11800, y2: "h3" },
        //витаминка
        { type: "trapeze", x1: 12500, y1: "h0", x2: 100, x3: 100, x4: 13100, y2: "h3" },
        //
        { type: "trapeze", x1: 13950, y1: "h0", x2: 100, x3: 100, x4: 14350, y2: "h2" },
        //
        { type: "trapeze", x1: 14750, y1: "h0", x2: 100, x3: 100, x4: 15100, y2: "h3" },
        //вда-а-ааль
        { type: "triangle", x1: 15400, y1: "h0", x2: 15500, y2: "h2", x3: 15600, },
        //
        { type: "trapeze", x1: 16000, y1: "h0", x2: 100, x3: 100, x4: 16950, y2: "h3" },
        //
        { type: "trapeze", x1: 17650, y1: "h0", x2: 100, x3: 100, x4: 18250, y2: "h3" },
        //
        { type: "trapeze", x1: 19100, y1: "h0", x2: 100, x3: 100, x4: 19500, y2: "h3" },
        //
        { type: "trapeze", x1: 19900, y1: "h0", x2: 100, x3: 100, x4: 20250, y2: "h2" },
        //вда-а-ааль
        { type: "triangle", x1: 20550, y1: "h0", x2: 20650, y2: "h4", x3: 20750, }
      ] as Array<
        TrapezeType | TriangleType | CircleType
      >,
      songText:
        "Так беззабo-о-отно уходит вда-а-ааль   Наша с тоб-о-ой  жизнь одна-а-а на дво-о-и-их Я прошу об одно-о-ом, только не забыва-аай обо мне, как мы с тобой и о все-е-е-е-х  оста-а-а-льны-ы-х    Провожая печа-а-аль, мы просто мимо молчим Просто и без при-и-и-чин, ссылаясь на н-е-е-е-е-т                                                   И в этот моме-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-е-ент                           И все мои сюжеты по твоим карти-и-н-к-а-а-а м      Девочка-разноцветная витами-и-и-и-и н-к-а-а-а-а Сегодня я буду любить тебя си-и-ильно-о-о-о     Пока в моей голове действие витами-и-и-и-на              И все мои сюжеты по твоим карти-и-н-к-а-а-а м      Девочка-разноцветная витами-и-и-и-и н-к-а-а-а-а Сегодня я буду любить тебя си-и-ильно-о-о-о     Пока в моей голове действие витами-и-и-и-на                                                                                                                                          ",
    },
    {
      songID: "2" as string,
      songName: {
        ru: "Улыбайся",
        en: "Ulibaisya",
      },
      artistName: {
        ru: "AIOWA",
        en: "AIOWA",
      },
      fullTitle: {
        ru: "Aiowa - Улыбайся",
        en: "Aiowa - Ulibaisya",
      },
      img: imgSong3AiowaSmile,
      srcToSong: srcToong3AiowaSmile,
      srcToSongIntro: srcToong3AiowaSmileIntro,
      playbackSpeed: 160,
      startMovingDelay: 12,
      canvasWigth: 17200,
      finishLineXCoordinate: 15500,
      itemsOnCanvasCoordinates: [
        //Я птицу счастья свою отпускаю на юг
        { type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1300, y2: "h1" },
        //Теперь   сама    я     пою
        { type: "trapeze", x1: 1700, y1: "h0", x2: 100, x3: 100, x4: 2050, y2: "h2" },
        //теперь сама летаю
        { type: "trapeze", x1: 2320, y1: "h0", x2: 100, x3: 100, x4: 2530, y2: "h2" },
        //Аа  -  аа
        { type: "triangle", x1: 2750, y1: "h0", x2: 2875, y2: "h4", x3: 3000, },
        //Аа  -  аа
        { type: "triangle", x1: 4080, y1: "h0", x2: 4255, y2: "h4", x3: 4430, },
        //В открытый космос лечу
        { type: "trapeze", x1: 5350, y1: "h0", x2: 100, x3: 100, x4: 5850, y2: "h1" },
        //кометы  огибая
        { type: "trapeze", x1: 6000, y1: "h0", x2: 100, x3: 100, x4: 6350, y2: "h2" },
        //Тебя мечтать научу
        { type: "trapeze", x1: 6600, y1: "h0", x2: 100, x3: 100, x4: 7000, y2: "h2" },
        //теперь одна мы стая
        { type: "trapeze", x1: 7100, y1: "h0", x2: 100, x3: 100, x4: 7600, y2: "h3" },
        //Аа  -  аа
        { type: "triangle", x1: 7720, y1: "h0", x2: 7820, y2: "h4", x3: 7920, },

        { type: "trapeze", x1: 8250, y1: "h6", x2: 100, x3: 100, x4: 8600, y2: "h4" },

        { type: "trapeze", x1: 9000, y1: "h6", x2: 100, x3: 100, x4: 9600, y2: "h4" },
        //Только у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 9800, y1: "h0", x2: 100, x3: 100, x4: 10350, y2: "h3" },
        //невесомости поверь
        { type: "trapeze", x1: 10920, y1: "h0", x2: 100, x3: 100, x4: 11420, y2: "h3" },
        //и отд - а - а- -а- -а- йся
        { type: "triangle", x1: 11750, y1: "h0", x2: 12000, y2: "h4", x3: 12250, },
        //у -   лы  -  бааааай-  ся
        { type: "triangle", x1: 12620, y1: "h0", x2: 12770, y2: "h4", x3: 12920, },
        //у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 13200, y1: "h0", x2: 100, x3: 100, x4: 13750, y2: "h2" },
        //aaaa
        { type: "triangle", x1: 14020, y1: "h0", x2: 14085, y2: "h2", x3: 14150, },
        //aaaa
        { type: "triangle", x1: 14320, y1: "h0", x2: 14370, y2: "h3", x3: 14420, },
        //aaaa
        { type: "triangle", x1: 14530, y1: "h0", x2: 14580, y2: "h3", x3: 14630, },
        //у -   лы  -  бааааай-  ся
        { type: "trapeze", x1: 14720, y1: "h0", x2: 100, x3: 100, x4: 14920, y2: "h2" },
      ],
      songText:
        "Я птицу счастья свою отпускаю на юг.         Теперь   сама    я     пою, теперь сама летаю    Аа  -  аа   -  аа.                                                                Аа  -  аа -  аа                                                         В открытый космос лечу,  кометы  огибая.            Тебя мечтать научу, теперь одна мы стая     Аа-аа -аа.                                                                                                          Только у -   лы  -  бааааай-  ся,   улыбайся             невесомости поверь                 и отд - а - а- -а- -а- йся.      У -   лы  -  бааай  -  ся,       Улы  -  бааааай  -  сяяяяяя,           Аа-аа-ааа      -ааа       ааа     улыбайся!                                                                                                                                ",
    },
    {
      songID: "3" as string,
      songName: {
        ru: "Зацепила",
        en: "Zazepila",
      },
      artistName: {
        ru: "Артур Пирожков",
        en: "Artur Pirozhkov",
      },
      fullTitle: {
        ru: "Артур Пирожков - Зацепила",
        en: "Artur Pirozhkov - Zazepila",
      },
      img: imgSong4PirozhkowZacepila,
      srcToSong: srcToSong4PirozhkowZacepila,
      srcToSongIntro: srcToSong4PirozhkowZacepilaIntro,
      playbackSpeed: 150,
      startMovingDelay: 17,
      canvasWigth: 21000,
      finishLineXCoordinate: 20000,
      itemsOnCanvasCoordinates: [
        //Добрый вечер! Эй, полегче
        { type: "trapeze", x1: 380, y1: "h0", x2: 100, x3: 100, x4: 1050, y2: "h1" },
        //Пусть он длится бесконечно
        { type: "trapeze", x1: 1550, y1: "h0", x2: 100, x3: 100, x4: 1800, y2: "h2" },
        //Хорошо
        { type: "trapeze", x1: 2050, y1: "h0", x2: 100, x3: 100, x4: 2500, y2: "h3" },
        //Этот праздник
        { type: "trapeze", x1: 3300, y1: "h0", x2: 100, x3: 100, x4: 3800, y2: "h2" },
        //Уже ушел
        { type: "trapeze", x1: 4200, y1: "h0", x2: 100, x3: 100, x4: 4500, y2: "h3" },
        // 
        { type: "trapeze", x1: 4820, y1: "h0", x2: 100, x3: 100, x4: 5290, y2: "h4" },
        // почему я просто не пошел
        { type: "trapeze", x1: 6000, y1: "h0", x2: 100, x3: 100, x4: 6550, y2: "h2" },
        // сказала что я сегодня 
        { type: "trapeze", x1: 7400, y1: "h0", x2: 100, x3: 100, x4: 8000, y2: "h3" },
        //танцевал
        { type: "triangle", x1: 8550, y1: "h0", x2: 8650, y2: "h4", x3: 8750 },
        //снилось никому
        { type: "triangle", x1: 9100, y1: "h0", x2: 9285, y2: "h3", x3: 9450 },
        //танцевал
        { type: "triangle", x1: 9850, y1: "h0", x2: 10000, y2: "h4", x3: 10150 },
        // ну почему
        { type: "trapeze", x1: 10600, y1: "h0", x2: 100, x3: 100, x4: 11000, y2: "h2" },

        { type: "trapeze", x1: 11350, y1: "h3", x2: 0, x3: 0, x4: 11700, y2: "h5" },
        { type: "trapeze", x1: 12000, y1: "h6", x2: 100, x3: 100, x4: 12350, y2: "h3" },
        { type: "trapeze", x1: 12800, y1: "h6", x2: 100, x3: 100, x4: 13200, y2: "h4" },
        // зацепила
        { type: "trapeze", x1: 13700, y1: "h0", x2: 100, x3: 100, x4: 14140, y2: "h2" },
        // ослепила
        { type: "trapeze", x1: 14420, y1: "h0", x2: 100, x3: 100, x4: 14680, y2: "h3" },
        // порога
        { type: "triangle", x1: 15090, y1: "h0", x2: 15165, y2: "h2", x3: 15240 },
        // любви
        { type: "triangle", x1: 15820, y1: "h0", x2: 15895, y2: "h2", x3: 15970 },
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
        "Добрый вечер! Эй, полегче, Пусть он длится бесконечно. Нам сегодня было хорошо!                                           Этот праздник не подвел, Я   почти    уже    ушел,    И тут она выходит на танцпол.                                Ну, почему я просто не пошел домой?                     Зачем сказал я, что сегодня холостой?                         Я танцевал так, как не снилось никому,                      Я не пойму,                         ну почему-у-у-у-у?                                                                                                                                                                   Заце - пи -  ла    меня,             осле - пила    меня,    До   порога   довела,                   а любви  не   дала.         Зацепила             меня,          соблазнила     меня,             До порога   довела,            а любви не дала.              Зацепила меня…                                                                                                                 ",
    },
    {
      songID: "4" as string,
      songName: {
        ru: "Моя бабушка курит трубку",
        en: "Moya babushka kurit trubku",
      },
      artistName: {
        ru: "Гарик Сукачев",
        en: "Garik Sukochev",
      },
      fullTitle: {
        ru: "Гарик Сукачев - Моя бабушка курит трубку",
        en: "Garik Sukochev - Moya babushka kurit trubku",
      },
      img: imgSong5SukochevBabuchka,
      srcToSong: srcToSong5SukochevBabuchka,
      srcToSongIntro: srcToSong5SukochevBabuchkaIntro,
      playbackSpeed: 170,
      startMovingDelay: 14,
      canvasWigth: 15000,
      finishLineXCoordinate: 14000,
      itemsOnCanvasCoordinates: [
        //Моя   бабушка   курит   тру  -  б  -  ку
        { type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1319, y2: "h2" },
        //чёрный-пречёрный  табак
        { type: "trapeze", x1: 1600, y1: "h0", x2: 100, x3: 100, x4: 2200, y2: "h3" },
        { type: "triangle", x1: 2450, y1: "h6", x2: 2525, y2: "h4", x3: 2600, },
        //Моя   бабушка 
        { type: "trapeze", x1: 2700, y1: "h0", x2: 100, x3: 100, x4: 3000, y2: "h2" },
        //тру  -  б  -  ку
        { type: "trapeze", x1: 3300, y1: "h0", x2: 100, x3: 100, x4: 3610, y2: "h3" },
        //в суровый
        { type: "triangle", x1: 3900, y1: "h0", x2: 3975, y2: "h2", x3: 4050, },
        //моряцкий 
        { type: "triangle", x1: 4150, y1: "h0", x2: 4225, y2: "h4", x3: 4300, },
        // затяг
        { type: "triangle", x1: 4450, y1: "h0", x2: 4525, y2: "h3", x3: 4600, },
        { type: "trapeze", x1: 4700, y1: "h6", x2: 100, x3: 100, x4: 4900, y2: "h5" },
        //Моя бабушка курит
        { type: "trapeze", x1: 4950, y1: "h0", x2: 100, x3: 100, x4: 5400, y2: "h2" },
        //тру  -  б  -  ку
        { type: "triangle", x1: 5600, y1: "h0", x2: 5700, y2: "h2", x3: 5800, },
        //и обожает   огненный     ром
        { type: "trapeze", x1: 6100, y1: "h0", x2: 100, x3: 100, x4: 6800, y2: "h3" },
        //и когда я к бабуле заскочу на минутку
        { type: "trapeze", x1: 7200, y1: "h0", x2: 100, x3: 100, x4: 8050, y2: "h4" },
        //мы     c    ней
        { type: "triangle", x1: 8250, y1: "h0", x2: 8375, y2: "h2", x3: 8500, },
        //его     весело
        { type: "triangle", x1: 8650, y1: "h0", x2: 8725, y2: "h2", x3: 8800, },
        //пьём
        { type: "triangle", x1: 9050, y1: "h0", x2: 9125, y2: "h3", x3: 9200, },
        { type: "triangle", x1: 9300, y1: "h6", x2: 9350, y2: "h4", x3: 9400, },
        //У    неё     ничего     не осталось
        { type: "trapeze", x1: 9500, y1: "h0", x2: 100, x3: 100, x4: 10200, y2: "h2" },
        { type: "trapeze", x1: 10300, y1: "h6", x2: 100, x3: 100, x4: 10600, y2: "h4" },
        //у неё в кошельке три рубля
        { type: "trapeze", x1: 10750, y1: "h0", x2: 100, x3: 100, x4: 11400, y2: "h2" },
        { type: "triangle", x1: 11500, y1: "h6", x2: 11600, y2: "h4", x3: 11700, },
        //моя бабушка курит трубку
        { type: "trapeze", x1: 11950, y1: "h0", x2: 100, x3: 100, x4: 12550, y2: "h3" },
        //труб    ку     ку     рит
        { type: "trapeze", x1: 12930, y1: "h0", x2: 100, x3: 100, x4: 13400, y2: "h4" },
        //бабушка    моя!
        { type: "triangle", x1: 13600, y1: "h0", x2: 13700, y2: "h4", x3: 13800, }
      ],
      songText:
        "Моя   бабушка   курит   тру  -  б  -  ку,              чёрный-пречёрный  табак,                      Моя   бабушка     курит   тру  -  б  -  ку,              в суровый    моряцкий    затяг.                      Моя бабушка      курит    тру  -    б      -  ку        и обожает   огненный    ром,                      и когда я к бабуле заскочу на минутку,   мы     c    ней     его     весело     пьём.                   У    неё     ничего     не осталось,                             у неё в кошельке три рубля,                         моя бабушка курит    трубку,                   труб    ку     ку     рит         бабушка    моя!                                                                                                          ",
    },
    {
      songID: "5" as string,
      songName: {
        ru: "О Боже! Какой мужчина!",
        en: "O Bozhe! Kakoy muzhchina!",
      },
      artistName: {
        ru: "Натали",
        en: "Nataly",
      },
      fullTitle: {
        ru: "Натали - О Боже! Какой мужчина!",
        en: "Nataly - O Bozhe! Kakoy muzhchina!",
      },
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
        { type: "trapeze", x1: 1200, y1: "h0", x2: 100, x3: 100, x4: 1850, y2: "h2" },
        //мою-ю-ю  ре-а- а-ально-о-ость
        { type: "trapeze", x1: 2200, y1: "h0", x2: 100, x3: 100, x4: 2800, y2: "h3" },
        { type: "trapeze", x1: 3100, y1: "h6", x2: 100, x3: 100, x4: 3400, y2: "h5" },
        //вспышки-и-и,    и-и-и-и любовь
        { type: "trapeze", x1: 3600, y1: "h0", x2: 100, x3: 100, x4: 4420, y2: "h2" },
        { type: "trapeze", x1: 4600, y1: "h6", x2: 100, x3: 100, x4: 4850, y2: "h4" },
        // без передышки
        { type: "trapeze", x1: 4950, y1: "h0", x2: 100, x3: 100, x4: 5250, y2: "h4" },
        //как неви-и-нный флирт
        { type: "trapeze", x1: 5600, y1: "h0", x2: 100, x3: 100, x4: 6300, y2: "h2" },
        //а       теперь
        { type: "triangle", x1: 6800, y1: "h0", x2: 6885, y2: "h4", x3: 6970 },
        //без теб-я-мой мир
        { type: "trapeze", x1: 7300, y1: "h0", x2: 100, x3: 100, x4: 7750, y2: "h3" },
        // с другой пла  не  т-ы-ы-ы
        { type: "trapeze", x1: 8500, y1: "h0", x2: 100, x3: 100, x4: 9100, y2: "h3" },
        { type: "triangle", x1: 9300, y1: "h6", x2: 9400, y2: "h4", x3: 9500 },
        //ты из моей мечты-ы-ы-!
        { type: "trapeze", x1: 9750, y1: "h0", x2: 100, x3: 100, x4: 10350, y2: "h4" },
        //О-о-о Бо-о-же, как-о-ой мужчи-и-на
        { type: "trapeze", x1: 11000, y1: "h0", x2: 100, x3: 100, x4: 11750, y2: "h3" },
        //Я хочу    
        { type: "triangle", x1: 12240, y1: "h0", x2: 12305, y2: "h4", x3: 12370 },
        //От тебя    
        { type: "triangle", x1: 12500, y1: "h0", x2: 12575, y2: "h4", x3: 12650 },
        //Сына    
        { type: "triangle", x1: 12800, y1: "h0", x2: 12875, y2: "h4", x3: 12950 },
        //и я хочу-у-у   от тебя         дочку-у-у-у-у
        { type: "trapeze", x1: 13400, y1: "h0", x2: 100, x3: 100, x4: 14350, y2: "h3" },
        //и точ - ка,
        { type: "trapeze", x1: 14670, y1: "h0", x2: 100, x3: 100, x4: 14880, y2: "h4" },
        //и точ - ка,
        { type: "trapeze", x1: 15100, y1: "h0", x2: 100, x3: 100, x4: 15450, y2: "h4" },
        { type: "trapeze", x1: 15600, y1: "h6", x2: 100, x3: 100, x4: 15850, y2: "h5" },
        //О-о-о Бо-о-же, как-о-ой мужчи-и-на
        { type: "trapeze", x1: 16000, y1: "h0", x2: 100, x3: 100, x4: 16700, y2: "h3" },
        //Я хочу    
        { type: "triangle", x1: 17200, y1: "h0", x2: 17250, y2: "h4", x3: 17300 },
        //От тебя    
        { type: "triangle", x1: 17450, y1: "h0", x2: 17540, y2: "h4", x3: 17630 },
        //Сына    
        { type: "triangle", x1: 17800, y1: "h0", x2: 17875, y2: "h4", x3: 17950 },
        //и я хочу-у-у   от тебя         дочку-у-у-у-у
        { type: "trapeze", x1: 18450, y1: "h0", x2: 100, x3: 100, x4: 19350, y2: "h3" },
        //и точ - ка,
        { type: "trapeze", x1: 19740, y1: "h0", x2: 100, x3: 100, x4: 19950, y2: "h4" },
        //и точ - ка,
        { type: "trapeze", x1: 20250, y1: "h0", x2: 100, x3: 100, x4: 20530, y2: "h4" }      
      ],
      songText:
        "Ты  вор - вался    в жизнь мою неждан-н-н-но, из - ме - нил           мою-ю-ю  ре-а- а-ально-о-ость. Мысли мерцают,    на сердце вспышки-и-и,    и-и-и-и любовь                             без передышки.  Все начина-а-а-лось как неви-и-нный флирт,          а       теперь               пуст без теб-я-мой мир.        Ты волшебный, ты с другой пла  не  т-ы-ы-ы,                                            ты из моей мечты-ы-ы-!                                О-о-о Бо-о-же, как-о-ой мужчи-и-на,                         я хочу      от тебя        сы - на,                       и я хочу-у-у   от тебя         дочку-у-у-у-у,                  и точ - ка,            и  точ - ка-а-а!                      О-о-о Бо-о-же, как-о-ой мужчи-и-на,                          я хочу       от тебя         сы - на,                        и я хочу-у-у    от тебя          дочку-у-у-у-у,                   и точ - ка,             и  точ - ка-а-а!                                                                                                                               ",
   },
  ],
  currentSong: {
    songID: "0" as string,
    songName: {
      ru: "Рюмка водки на столе",
      en: "Rumka vodki na stole",
    },
    artistName: {
      ru: "Григорий Лепс",
      en: "Grigoriy Leps",
    },
    fullTitle: {
      ru: "Григорий Лепс - Рюмка водки на столе",
      en: "Grigoriy Leps - Rumka vodki na stole",
    },
    img: imgSong1LepsRumkaVodki,
    srcToSong: srcToSong1LepsRumkaVodki,
    srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
    playbackSpeed: 100,
    startMovingDelay: 26,
    canvasWigth: 20000,
    finishLineXCoordinate: 16300,
    itemsOnCanvasCoordinates: [
      {
        type: "trapeze", x1: 400, y1: "h0",
        x2: 100,
        x3: 0,
        x4: 950,
        y2: "h1",
      }, //Ночь по улицам пошла
      {
        type: "trapeze",
        x1: 1250,
        y1: "h6",
        x2: 100,
        x3: 100,
        x4: 1500,
        y2: "h3",
      },
      {
        type: "trapeze",
        x1: 1680,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 2000,
        y2: "h2",
      }, //Звездной постутью
      {
        type: "triangle",
        x1: 2150,
        y1: "h0",
        x2: 2225,
        y2: "h3",
        x3: 2300,
      }, // цариц
      {
        type: "trapeze",
        x1: 2500,
        y1: "h6",
        x2: 100,
        x3: 50,
        x4: 2900,
        y2: "h4",
      },
      {
        type: "trapeze",
        x1: 3050,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 3620,
        y2: "h2",
      }, ////Слов и чисел простота
      {
        type: "trapeze",
        x1: 3800,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 4250,
        y2: "h2",
      }, //у небесного моста
      {
        type: "trapeze",
        x1: 4470,
        y1: "h0",
        x2: 50,
        x3: 50,
        x4: 4880,
        y2: "h2",
      }, //раскидала перья
      {
        type: "triangle",
        x1: 5000,
        y1: "h0",
        x2: 5125,
        y2: "h3",
        x3: 5250,
      }, //пти и и и и и ц
      {
        type: "trapeze",
        x1: 5750,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 6240,
        y2: "h1",
      }, //Не забудутся никем
      {
        type: "trapeze",
        x1: 6560,
        y1: "h6",
        x2: 100,
        x3: 100,
        x4: 6800,
        y2: "h3",
      },
      {
        type: "trapeze",
        x1: 7050,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 7650,
        y2: "h2",
      }, //праздник губ обид и глаз
      {
        type: "trapeze",
        x1: 7850,
        y1: "h6",
        x2: 100,
        x3: 100,
        x4: 8200,
        y2: "h4",
      },
      {
        type: "trapeze",
        x1: 8430,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 9100,
        y2: "h3",
      }, //Забери меня в свой плен
      {
        type: "trapeze",
        x1: 9230,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 9630,
        y2: "h2",
      }, //эту линию колен
      {
        type: "trapeze",
        x1: 9850,
        y1: "h0",
        x2: 100,
        x3: 50,
        x4: 10200,
        y2: "h2",
      }, //целовать в последний
      {
        type: "triangle",
        x1: 10400,
        y1: "h0",
        x2: 10525,
        y2: "h4",
        x3: 10650,
      }, //раааааааз
      {
        type: "trapeze",
        x1: 10900,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 11370,
        y2: "h3",
      }, //Тоооолькооооооо
      {
        type: "trapeze",
        x1: 11630,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 12266,
        y2: "h3",
      }, //рюмка водкииии на столе
      {
        type: "trapeze",
        x1: 12570,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 12990,
        y2: "h2",
      }, //Ветер плачет за окнооом
      {
        type: "trapeze",
        x1: 13200,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 13400,
        y2: "h3",
      }, //тиииииихооо
      {
        type: "trapeze",
        x1: 13550,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 13850,
        y2: "h3",
      }, //больююююю
      {
        type: "trapeze",
        x1: 14000,
        y1: "h6",
        x2: 100,
        x3: 100,
        x4: 14300,
        y2: "h4",
      },
      {
        type: "trapeze",
        x1: 14386,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 15000,
        y2: "h2",
      }, //о т з ы в а ю т с я в о м н е
      {
        type: "trapeze",
        x1: 15180,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 15650,
        y2: "h2",
      }, // э т о й молодой   л у н ы
      {
        type: "trapeze",
        x1: 15880,
        y1: "h0",
        x2: 100,
        x3: 100,
        x4: 16090,
        y2: "h3",
      }, //к р и к и
    ],
    songText:
      "Ночь по улицам пошла                                          звездной поступью цариц.                                               Слов и чисел простота          у небесного моста           раскидала перья пти и и и и и ц.                              Не забудутся никем                                                  праздник губ обид и глаз.                                                Забери меня в свой плен,       эту линию колен            целовать в последний раааааааз.               Тоооолькооооооо                рюмка водкииии на столе.           Ветер плачет за окнооом      тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
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
      return {
        ...state,
        currentLanguage: action.lang,
      };

    default:
      return state;
  }
};

export default startPageReducer;
