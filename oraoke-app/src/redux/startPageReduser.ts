import imgSong1LepsRumkaVodki from "./../img/songs/1_leps_rumka_vodki.png";
import imgSong2Leningraglabuteni from "./../img/songs/2_leningrad_eksponat.png";
import imgSong3AiowaSmile from "./../img/songs/3_aiowa_ulibaysya.png";
import imgSong4PirozhkowZacepila from "./../img/songs/4_Pirozhkov_Zacepila.png";
import imgSong5SukochevBabuchka from "./../img/songs/5_Sukachev_Babushka.png";
import imgSong6NatalyOBozhe from "./../img/songs/6_Natali_O_Bozhe.png";
// @ts-ignore
import srcToSong1LepsRumkaVodki from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki.mp3";
// @ts-ignore
import srcToSong1LepsRumkaVodkiIntro from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki_introduse.mp3";
// @ts-ignore
import srcToSong2Leningraglabuteni from "./../songs/2_leningrad_eksponat/Leningrad_Eksponat.mp3";
// @ts-ignore
import srcToSong2LeningraglabuteniIntro from "./../songs/2_leningrad_eksponat/Leningrad_Eksponat_Introduce.mp3";
// @ts-ignore
import srcToong3AiowaSmile from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile.mp3";
// @ts-ignore
import srcToong3AiowaSmileIntro from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile_introduce.mp3";
// @ts-ignore
import srcToSong4PirozhkowZacepila from "./../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila.mp3";
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
const SAVE_ELEMENT_TO_STATE = "ORAOKE/PLAY_SONG_PAGE/SAVE_ELEMENT_TO_STATE";
const IS_CURRENT_SONG_PLAYING = "ORAOKE/PLAY_SONG_PAGE/IS_CURRENT_SONG_PLAYING";
const SEND_CHANGING_MOVE_DATA_TO_STATE =
  "ORAOKE/PLAY_SONG_PAGE/SEND_CHANGING_MOVE_DATA_TO_STATE";
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

type SaveDOMElementToStateType = {
  type: typeof SAVE_ELEMENT_TO_STATE;
  DOMelement: HTMLElement;
  elementName: string;
};

export const saveDOMElementToState = (
  DOMelement: HTMLElement,
  elementName: string
): SaveDOMElementToStateType => ({
  type: SAVE_ELEMENT_TO_STATE,
  DOMelement,
  elementName,
});

type SendChangingMoveDataToStateType = {
  type: typeof SEND_CHANGING_MOVE_DATA_TO_STATE;
  xCoordOfBird: number
};

export const sendChangingMoveDataToState = (
  xCoordOfBird: number
): SendChangingMoveDataToStateType => ({
  type: SEND_CHANGING_MOVE_DATA_TO_STATE,
  xCoordOfBird
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
  | SendChangingMoveDataToStateType
  | SaveDOMElementToStateType
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
        ru: "Экспонат (Лабутены)",
        en: "Eksponat (Labuteny)",
      },
      artistName: {
        ru: "Ленинград",
        en: "Leningrad",
      },
      fullTitle: {
        ru: "Ленинград - Экспонат (Лабутены)",
        en: "Leningrad - Eksponat (Labuteny)",
      },
      img: imgSong2Leningraglabuteni,
      srcToSong: srcToSong2Leningraglabuteni,
      srcToSongIntro: srcToSong2LeningraglabuteniIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      finishLineXCoordinate: 17000,
      itemsOnCanvasCoordinates: [] as Array<
        TrapezeType | TriangleType | CircleType
      >,
      songText:
        "Водил меня Серёга на выставку Ван Гога. Там было тёлок много, и нервы, как канат, но я не недотрога. Дала понять с порога - на выставке Ван Гога я главный экспонат. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. Штанах. Мы с Генкой и Маринкой ходили в «Мариинку» - послушать чисто Глинку. Партер, туда-сюда. Там, сразу без заминки, в партере «Мариинки», все поняли блондинки, Я - Прима и звезда. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах Штанах... штанах... Водил меня Серёга на выставку Ван Гога. Там было тёлок много, и нервы, как канат, но я не недотрога. Дала понять с порога - на выставке Ван Гога я главный экспонат. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. Штанах... штанах...",
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
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      finishLineXCoordinate: 17000,
      itemsOnCanvasCoordinates: [
        {
          type: "trapeze",
          x1: 15200,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 15500,
          y2: "h5",
        },
        {
          type: "trapeze",
          x1: 15880,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 16090,
          y2: "h3",
        },
      ],
      songText:
        "Я птицу счастья свою отпускаю на юг. Теперь сама я пою, теперь сама летаю Аа-аа. В открытый космос лечу, кометы огибая. Тебя мечтать научу, теперь одна мы стая Аа-аа Только улыбайся, улыбайся невесомости поверь и отдайся. Улыбайся, улыбайся Аа-аа Закинув лески в дали, ловим мы корабли. Рисуем время в пыли, мы Сальвадоры Дали Аа-аа Над этой бездной во ржи мне глаза завяжи. Рискуя с ветром, дыши, его за крылья держи Аа-аа И улыбайся, улыбайся. Невесомости поверь и отдайся. Улыбайся, улыбайся Аа-аа Я птицу счастья свою отпускаю на юг. Теперь сама я пою, теперь сама летаю Аа-аа Аа-аа",
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
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      finishLineXCoordinate: 17000,
      itemsOnCanvasCoordinates: [
        {
          type: "trapeze",
          x1: 15200,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 15500,
          y2: "h5",
        },
        {
          type: "trapeze",
          x1: 15880,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 16090,
          y2: "h3",
        },
      ],
      songText:
        "Добрый вечер! Эй, полегче, Пусть он длится бесконечно. Нам сегодня было хорошо! Этот праздник не подвел, Я почти уже ушел, И тут она выходит на танцпол. Ну, почему я просто не пошел домой? Зачем сказал я, что сегодня холостой? Я танцевал так, как не снилось никому, Я не пойму — ну, почему? И закружилось все вокруг, как на репите, Ничего уже не помню, извините. Только помню голос: Вы что творите? Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня… Громче крики, громче звуки, Поднимите ваши руки. Эта вечеринка просто класс! Я не знаю, как мне быть: Как мне с ней заговорить, А, может, лучше что-то подарить? Ну, почему я просто не пошел домой? Зачем сказал я, что сегодня холостой? Я танцевал так, как не снилось никому, Я не пойму — ну, почему? И закружилось все вокруг, как на репите, Ничего уже не помню, извините. Только помню голос: Вы что творите? Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня… Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня…",
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
      startMovingDelay: 14.5,
      canvasWigth: 15000,
      finishLineXCoordinate: 14000,
      itemsOnCanvasCoordinates: [
              //Моя   бабушка   курит   тру  -  б  -  ку
      {type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1319, y2: "h2"},
      //чёрный-пречёрный  табак
      {type: "trapeze", x1: 1650, y1: "h0", x2: 100, x3: 100, x4: 2250, y2: "h3"},
      {type: "triangle", x1: 2450, y1: "h6", x2: 2525, y2: "h4", x3: 2600,},
      //Моя   бабушка 
      {type: "trapeze", x1: 2750, y1: "h0", x2: 100, x3: 100, x4: 3050, y2: "h2"},
      //тру  -  б  -  ку
      {type: "trapeze", x1: 3370, y1: "h0", x2: 100, x3: 100, x4: 3680, y2: "h3"},
      //в суровый
      {type: "triangle", x1: 4000, y1: "h0", x2: 4075, y2: "h2", x3: 4150,},
      //моряцкий 
      {type: "triangle", x1: 4250, y1: "h0", x2: 4325, y2: "h4", x3: 4400,},
      // затяг
      {type: "triangle", x1: 4550, y1: "h0", x2: 4625, y2: "h3", x3: 4700,},
      {type: "trapeze", x1: 4800, y1: "h6", x2: 100, x3: 100, x4: 5500, y2: "h5"},
      //Моя бабушка курит
      {type: "trapeze", x1: 5050, y1: "h0", x2: 100, x3: 100, x4: 5500, y2: "h2"},
      //тру  -  б  -  ку
      {type: "triangle", x1: 5700, y1: "h0", x2: 5800, y2: "h2", x3: 5900,},
      //и обожает   огненный     ром
      {type: "trapeze", x1: 6050, y1: "h0", x2: 100, x3: 100, x4: 6750, y2: "h3"},
      //и когда я к бабуле заскочу на минутку
      {type: "trapeze", x1: 7150, y1: "h0", x2: 100, x3: 100, x4: 8000, y2: "h4"},
      //мы     c    ней
      {type: "triangle", x1: 8250, y1: "h0", x2: 8375, y2: "h2", x3: 8500,},
      //его     весело
      {type: "triangle", x1: 8700, y1: "h0", x2: 8775, y2: "h2", x3: 8850,},
      //пьём
      {type: "triangle", x1: 9000, y1: "h0", x2: 9075, y2: "h3", x3: 9150,},
      {type: "triangle", x1: 9300, y1: "h6", x2: 9350, y2: "h4", x3: 9400,},
     //У    неё     ничего     не осталось
      {type: "trapeze", x1: 9500, y1: "h0", x2: 100, x3: 100, x4: 10200, y2: "h2"},
      {type: "trapeze", x1: 10300, y1: "h6", x2: 100, x3: 100, x4: 10600, y2: "h4"},
      //у неё в кошельке три рубля
      {type: "trapeze", x1: 10750, y1: "h0", x2: 100, x3: 100, x4: 11400, y2: "h2"},
      {type: "triangle", x1: 11500, y1: "h6", x2: 11600, y2: "h4", x3: 11700,},
      //моя бабушка курит трубку
      {type: "trapeze", x1: 11950, y1: "h0", x2: 100, x3: 100, x4: 12550, y2: "h3"},
      //труб    ку     ку     рит
      {type: "trapeze", x1: 12930, y1: "h0", x2: 100, x3: 100, x4: 13400, y2: "h4"},
      //бабушка    моя!
      {type: "triangle", x1: 13600, y1: "h0", x2: 13700, y2: "h4", x3: 13800,}
      ],
      songText:
        "Моя   бабушка   курит   тру  -  б  -  ку,             чёрный-пречёрный  табак,                           Моя   бабушка     курит   тру  -  б  -  ку,              в суровый    моряцкий    затяг.                      Моя бабушка курит тру  -  б  -  ку         и обожает   огненный     ром,                      и когда я к бабуле заскочу на минутку,   мы     c    ней     его     весело     пьём.                      У    неё     ничего     не осталось,                            у неё в кошельке три рубля,                            моя бабушка курит трубку,                   труб    ку     ку     рит         бабушка    моя!                                                                                                          ",
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
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      finishLineXCoordinate: 17000,
      itemsOnCanvasCoordinates: [
        {
          type: "trapeze",
          x1: 15200,
          y1: "h6",
          x2: 100,
          x3: 100,
          x4: 15500,
          y2: "h5",
        },
        {
          type: "trapeze",
          x1: 15880,
          y1: "h0",
          x2: 100,
          x3: 100,
          x4: 16090,
          y2: "h3",
        },
      ],
      songText:
        "Ты ворвался в жизнь мою нежданно, изменил мою реальность. Мысли мерцают, на сердце вспышки, и любовь без передышки. Все начиналось как невинный флирт, а теперь пуст без тебя мой мир. Ты волшебный, ты с другой планеты, и ты из моей мечты! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! Не хватит всех на свете нежных слов, чтобы описать мою любовь. И по ночам не плакать по мелочам. Ты, как время - лечишь мою печаль. Знаю я, любовь моя взаимна. Женщина прекрасна, когда любима. Ты волшебный, ты с другой планеты, Ты из моей мечты. О Боже, какой мужчина, я хочу от тебя сына. И я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына. И я хочу от тебя дочку, и точка, и точка! Ты Джонни Депп и Брэд Питт в одном флаконе. Как самый лучший, ты записан в телефоне. И ты волшебный, ты с другой планеты. Я на все вопросы к тебе нашла ответы. О Боже, какой мужчина! О Боже, какой мужчина! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка!",
    },
  ],
  currentSong: {
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
      {type: "trapeze", x1: 450, y1: "h0", x2: 100, x3: 100, x4: 1319, y2: "h2"},
      //чёрный-пречёрный  табак
      {type: "trapeze", x1: 1600, y1: "h0", x2: 100, x3: 100, x4: 2200, y2: "h3"},
      {type: "triangle", x1: 2450, y1: "h6", x2: 2525, y2: "h4", x3: 2600,},
      //Моя   бабушка 
      {type: "trapeze", x1: 2700, y1: "h0", x2: 100, x3: 100, x4: 3000, y2: "h2"},
      //тру  -  б  -  ку
      {type: "trapeze", x1: 3300, y1: "h0", x2: 100, x3: 100, x4: 3610, y2: "h3"},
      //в суровый
      {type: "triangle", x1: 3900, y1: "h0", x2: 3975, y2: "h2", x3: 4050,},
      //моряцкий 
      {type: "triangle", x1: 4150, y1: "h0", x2: 4225, y2: "h4", x3: 4300,},
      // затяг
      {type: "triangle", x1: 4450, y1: "h0", x2: 4525, y2: "h3", x3: 4600,},
      {type: "trapeze", x1: 4700, y1: "h6", x2: 100, x3: 100, x4: 4900, y2: "h5"},
      //Моя бабушка курит
      {type: "trapeze", x1: 4950, y1: "h0", x2: 100, x3: 100, x4: 5400, y2: "h2"},
      //тру  -  б  -  ку
      {type: "triangle", x1: 5600, y1: "h0", x2: 5700, y2: "h2", x3: 5800,},
      //и обожает   огненный     ром
      {type: "trapeze", x1: 6100, y1: "h0", x2: 100, x3: 100, x4: 6800, y2: "h3"},
      //и когда я к бабуле заскочу на минутку
      {type: "trapeze", x1: 7200, y1: "h0", x2: 100, x3: 100, x4: 8050, y2: "h4"},
      //мы     c    ней
      {type: "triangle", x1: 8250, y1: "h0", x2: 8375, y2: "h2", x3: 8500,},
      //его     весело
      {type: "triangle", x1: 8650, y1: "h0", x2: 8725, y2: "h2", x3: 8800,},
      //пьём
      {type: "triangle", x1: 9050, y1: "h0", x2: 9125, y2: "h3", x3: 9200,},
      {type: "triangle", x1: 9300, y1: "h6", x2: 9350, y2: "h4", x3: 9400,},
     //У    неё     ничего     не осталось
      {type: "trapeze", x1: 9500, y1: "h0", x2: 100, x3: 100, x4: 10200, y2: "h2"},
      {type: "trapeze", x1: 10300, y1: "h6", x2: 100, x3: 100, x4: 10600, y2: "h4"},
      //у неё в кошельке три рубля
      {type: "trapeze", x1: 10750, y1: "h0", x2: 100, x3: 100, x4: 11400, y2: "h2"},
      {type: "triangle", x1: 11500, y1: "h6", x2: 11600, y2: "h4", x3: 11700,},
      //моя бабушка курит трубку
      {type: "trapeze", x1: 11950, y1: "h0", x2: 100, x3: 100, x4: 12550, y2: "h3"},
      //труб    ку     ку     рит
      {type: "trapeze", x1: 12930, y1: "h0", x2: 100, x3: 100, x4: 13400, y2: "h4"},
      //бабушка    моя!
      {type: "triangle", x1: 13600, y1: "h0", x2: 13700, y2: "h4", x3: 13800,}
    ],
    songText:
      "Моя   бабушка   курит   тру  -  б  -  ку,              чёрный-пречёрный  табак,                      Моя   бабушка     курит   тру  -  б  -  ку,              в суровый    моряцкий    затяг.                      Моя бабушка      курит    тру  -    б      -  ку        и обожает   огненный    ром,                      и когда я к бабуле заскочу на минутку,   мы     c    ней     его     весело     пьём.                   У    неё     ничего     не осталось,                             у неё в кошельке три рубля,                         моя бабушка курит    трубку,                   труб    ку     ку     рит         бабушка    моя!                                                                                                          ",
  },
  isCurrentSongSet: false,
  currentSongVolume: 0.5,
  currentVoiceVolume: 1,
  currentLanguage: "ru" as "ru" | "en",
  isStopBtnPushed: false,
  canvas: null as null | HTMLCanvasElement,
  canvasWrp: null as null | HTMLElement,
  songMP3: null as null | HTMLAudioElement,
  textWrp: null as null | HTMLElement,
  birdOnCanvas: null as null | HTMLElement,
  isCurrentSongPlaying: false,
  xCoordOfBird: 185,
  yCoordOfBird: 50,
  soundExploision: null as null | HTMLAudioElement,
  srcToSoundExploision: srcToSoundExploision,
  soundOfFinish: null as null | HTMLAudioElement,
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
      console.log(action.song);
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
    case SAVE_ELEMENT_TO_STATE:
      return {
        ...state,
        [action.elementName]: action.DOMelement,
      };
    case IS_CURRENT_SONG_PLAYING:
      return {
        ...state,
        isCurrentSongPlaying: action.isCurrentSongPlaying,
      };
    case SEND_CHANGING_MOVE_DATA_TO_STATE:
      return {
        ...state,
        xCoordOfBird: action.xCoordOfBird,
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
