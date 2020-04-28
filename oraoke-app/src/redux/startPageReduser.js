import imgSong1LepsRumkaVodki from "./../img/songs/1_leps_rumka_vodki.png";
import imgSong2Leningraglabuteni from "./../img/songs/2_leningrad_eksponat.png";
import imgSong3AiowaSmile from "./../img/songs/3_aiowa_ulibaysya.png";
import imgSong4PirozhkowZacepila from "./../img/songs/4_Pirozhkov_Zacepila.png";
import imgSong5SukochevBabuchka from "./../img/songs/5_Sukachev_Babushka.png";
import imgSong6NatalyOBozhe from "./../img/songs/6_Natali_O_Bozhe.png";
import srcToSong1LepsRumkaVodki from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki.mp3";
import srcToSong1LepsRumkaVodkiIntro from "./../songs/1_Leps_Rumka_Vodki/Grigoriy_Leps_Rumka_Vodki_introduse.mp3";
import srcToSong2Leningraglabuteni from "./../songs/2_leningrad_eksponat/Leningrad_Eksponat.mp3";
import srcToSong2LeningraglabuteniIntro from "./../songs/2_leningrad_eksponat/Leningrad_Eksponat_Introduce.mp3";
import srcToong3AiowaSmile from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile.mp3";
import srcToong3AiowaSmileIntro from "./../songs/3_Aiowa_ulibaysya/IOWA_Smile_introduce.mp3";
import srcToSong4PirozhkowZacepila from "./../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila.mp3";
import srcToSong4PirozhkowZacepilaIntro from "./../songs/4_Pirozhkov_Zacepila/Pirozhkov_Zacepila_Introduce.mp3";
import srcToSong5SukochevBabuchka from "./../songs/5_Sukachev_Moya_Babushka/Sukachev_Moya_Babushka.mp3";
import srcToSong5SukochevBabuchkaIntro from "./../songs/5_Sukachev_Moya_Babushka/Sukachev_Moya_Babushka_Introduce.mp3";
import srcToSong6NatalyOBozhe from "./../songs/6_Natali_O_Bozhe/Natali_O_Bozhe_Kakoy_Men.mp3";
import srcToSong6NatalyOBozheIntro from "./../songs/6_Natali_O_Bozhe/Natali_O_Bozhe_Kakoy_Men_Introduce.mp3";
import srcToSoundExploision from "./../songs/soundExploision.mp3";
import srcToSoundOfFinish from "./../songs/soundOfFinish.mp3";
import srcTofinishLineImg from "./../img/finishLine.jpg";

const CHANGE_CURRENT_SONG = "ORAOKE/START_PAGE/CHANGE_CURRENT_SONG";
const IS_PLAYING_SET = "ORAOKE/START_PAGE/IS_PLAYING_SET";
const STOP_BTN_IS_PUSHED_SET = "ORAOKE/PLAY_SONG_PAGE/STOP_BTN_IS_PUSHED_SET";
const SAVE_ELEMENT_TO_STATE = "ORAOKE/PLAY_SONG_PAGE/SAVE_ELEMENT_TO_STATE";
const IS_CURRENT_SONG_PLAYING = "ORAOKE/PLAY_SONG_PAGE/IS_CURRENT_SONG_PLAYING";
const SEND_CHANGING_MOVE_DATA_TO_STATE ='ORAOKE/PLAY_SONG_PAGE/SEND_CHANGING_MOVE_DATA_TO_STATE';
const SET_NEW_VOLUME_OF_SONG ="ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_SONG";
const SET_NEW_VOLUME_OF_VOICE ="ORAOKE/PLAY_SONG_PAGE/SET_NEW_VOLUME_OF_VOICE";

export const changecurrentSong = (song) => ({
  type: CHANGE_CURRENT_SONG,
  song: {
    ...song,
  },
});

export const isPlayingSet = (isPlayng) => ({
  type: IS_PLAYING_SET,
  isPlayng,
});

export const stopBtnIsPushSet = (isBtnPushed) => ({
  type: STOP_BTN_IS_PUSHED_SET,
  isBtnPushed,
});

export const isCurrentSongPlayingSetter = (isCurrentSongPlaying) => ({
  type: IS_CURRENT_SONG_PLAYING,
  isCurrentSongPlaying,
});

export const saveDOMElementToState = (DOMelement, elementName) => ({
  type: SAVE_ELEMENT_TO_STATE,
  DOMelement,
  elementName,
});
export const sendChangingMoveDataToState = (xCoordOfBird, yCoordOfBird) => ({
  type: SEND_CHANGING_MOVE_DATA_TO_STATE,
  xCoordOfBird,
  yCoordOfBird,
});
export const setNewVolumeOfSong = (newVolume) => ({
  type: SET_NEW_VOLUME_OF_SONG,
  newVolume
});
export const setNewVolumeOfVoice = (newVolume) => ({
  type: SET_NEW_VOLUME_OF_VOICE,
  newVolume
});

//перенести честь данных в новый редюсер song_play_page
let initialState = {
  songs: [
    {
      songID: "0",
      songName: "Рюмка водки на столе",
      artistName: "Григорий Лепс",
      fullTitle: "Григорий Лепс - Рюмка водки на столе",
      img: imgSong1LepsRumkaVodki,
      srcToSong: srcToSong1LepsRumkaVodki,
      srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
      playbackSpeed: 200,
      startMovingDelay: 27,
      canvasWigth: 20000,
      isPlaying: false,
      songText:
        "Ночь по улицам пошла                                          звездной поступью цариц.                                               Слов и чисел простота          у небесного моста           раскидала перья пти и и и и и ц.                              Не забудутся никем                                                  праздник губ обид и глаз.                                                Забери меня в свой плен,          эту линию колен               целовать в последний раааааааз.                 Тоооолькооооооо                рюмка водкииии на столе.           Ветер плачет за окнооом       тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
    },
    {
      songID: "1",
      songName: "Экспонат (Лабутены)",
      artistName: "Ленинград",
      fullTitle: "Ленинград - Экспонат (Лабутены)",
      img: imgSong2Leningraglabuteni,
      srcToSong: srcToSong2Leningraglabuteni,
      srcToSongIntro: srcToSong2LeningraglabuteniIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      isPlaying: false,
      songText:
        "Водил меня Серёга на выставку Ван Гога. Там было тёлок много, и нервы, как канат, но я не недотрога. Дала понять с порога - на выставке Ван Гога я главный экспонат. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. Штанах. Мы с Генкой и Маринкой ходили в «Мариинку» - послушать чисто Глинку. Партер, туда-сюда. Там, сразу без заминки, в партере «Мариинки», все поняли блондинки, Я - Прима и звезда. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах Штанах... штанах... Водил меня Серёга на выставку Ван Гога. Там было тёлок много, и нервы, как канат, но я не недотрога. Дала понять с порога - на выставке Ван Гога я главный экспонат. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. На лабутенах нах и в офигительных штанах. Штанах... штанах...",
    },
    {
      songID: "2",
      songName: "Улыбайся",
      artistName: "AIOWA",
      fullTitle: "Aiowa - Улыбайся",
      img: imgSong3AiowaSmile,
      srcToSong: srcToong3AiowaSmile,
      srcToSongIntro: srcToong3AiowaSmileIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      isPlaying: false,
      songText:
        "Я птицу счастья свою отпускаю на юг. Теперь сама я пою, теперь сама летаю Аа-аа. В открытый космос лечу, кометы огибая. Тебя мечтать научу, теперь одна мы стая Аа-аа Только улыбайся, улыбайся невесомости поверь и отдайся. Улыбайся, улыбайся Аа-аа Закинув лески в дали, ловим мы корабли. Рисуем время в пыли, мы Сальвадоры Дали Аа-аа Над этой бездной во ржи мне глаза завяжи. Рискуя с ветром, дыши, его за крылья держи Аа-аа И улыбайся, улыбайся. Невесомости поверь и отдайся. Улыбайся, улыбайся Аа-аа Я птицу счастья свою отпускаю на юг. Теперь сама я пою, теперь сама летаю Аа-аа Аа-аа",
    },
    {
      songID: "3",
      songName: "Зацепила",
      artistName: "Артур Пирожков",
      fullTitle: "Артур Пирожков - Зацепила",
      img: imgSong4PirozhkowZacepila,
      srcToSong: srcToSong4PirozhkowZacepila,
      srcToSongIntro: srcToSong4PirozhkowZacepilaIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      isPlaying: false,
      songText:
        "Добрый вечер! Эй, полегче, Пусть он длится бесконечно. Нам сегодня было хорошо! Этот праздник не подвел, Я почти уже ушел, И тут она выходит на танцпол. Ну, почему я просто не пошел домой? Зачем сказал я, что сегодня холостой? Я танцевал так, как не снилось никому, Я не пойму — ну, почему? И закружилось все вокруг, как на репите, Ничего уже не помню, извините. Только помню голос: Вы что творите? Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня… Громче крики, громче звуки, Поднимите ваши руки. Эта вечеринка просто класс! Я не знаю, как мне быть: Как мне с ней заговорить, А, может, лучше что-то подарить? Ну, почему я просто не пошел домой? Зачем сказал я, что сегодня холостой? Я танцевал так, как не снилось никому, Я не пойму — ну, почему? И закружилось все вокруг, как на репите, Ничего уже не помню, извините. Только помню голос: Вы что творите? Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня… Зацепила меня, ослепила меня, До порога довела, а любви не дала. Зацепила меня, соблазнила меня, До порога довела, а любви не дала. Зацепила меня…",
    },
    {
      songID: "4",
      songName: "Моя бабушка курит трубку",
      artistName: "Гарик Сукачев",
      fullTitle: "Гарик Сукачев - Моя бабушка курит трубку",
      img: imgSong5SukochevBabuchka,
      srcToSong: srcToSong5SukochevBabuchka,
      srcToSongIntro: srcToSong5SukochevBabuchkaIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      isPlaying: false,
      songText:
        "Моя бабушка курит трубку, чёрный-пречёрный табак, моя бабушка курит трубку в суровый моряцкий затяг. Моя бабушка курит трубку и обожает огненный ром, и когда я к бабуле заскочу на минутку, мы с ней его весело пьём. У неё ничего не осталось, у неё в кошельке три рубля, моя бабушка курит трубку, трубку курит бабушка моя. Моя бабушка курит трубку и чертит планы захвата портов, а потом берёт в плен очередную соседку и продаёт её в бордель моряков. Та становится лучшей шлюx0й, та становится женщиной-вамп, у неё голубые корсет и подвязки, а на шее атласный бант. У неё ни черта не осталось, у неё в кошельке три рубля, но моя бабушка курит трубку, трубку курит бабушка моя. Моя бабушка курит трубку в комнатёнке хрущёвки своей, моя бабушка курит трубку, и сквозь дым видит волны морей. Её боятся все на свете пираты и по праву гордятся ей за то, что бабушка грабит и жжёт их фрегаты, но щадит стариков и детей. За то, что бабушка грабит и жжёт их фрегаты, но щадит стариков и детей. Хоть у неё ни черта не осталось, у неё в кошельке три рубля, но моя бабушка курит трубку, трубку курит бабушка моя. У неё ничего не осталось, у неё в кошельке три рубля, а моя бабушка курит трубку, трубку курит бабушка моя.  **** три рубля****три рубля!****три рубля!****бабушка моя!  У неё ничерта не осталось, у неё в кошельке три рубля, а моя бабушка курит трубку, трубку курит ДАВАЙ!!!",
    },
    {
      songID: "5",
      songName: "О Боже! Какой мужчина!",
      artistName: "Натали",
      fullTitle: "Натали - О Боже! Какой мужчина!",
      img: imgSong6NatalyOBozhe,
      srcToSong: srcToSong6NatalyOBozhe,
      srcToSongIntro: srcToSong6NatalyOBozheIntro,
      playbackSpeed: 50,
      startMovingDelay: 0,
      canvasWigth: 14000,
      isPlaying: false,
      songText:
        "Ты ворвался в жизнь мою нежданно, изменил мою реальность. Мысли мерцают, на сердце вспышки, и любовь без передышки. Все начиналось как невинный флирт, а теперь пуст без тебя мой мир. Ты волшебный, ты с другой планеты, и ты из моей мечты! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! Не хватит всех на свете нежных слов, чтобы описать мою любовь. И по ночам не плакать по мелочам. Ты, как время - лечишь мою печаль. Знаю я, любовь моя взаимна. Женщина прекрасна, когда любима. Ты волшебный, ты с другой планеты, Ты из моей мечты. О Боже, какой мужчина, я хочу от тебя сына. И я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына. И я хочу от тебя дочку, и точка, и точка! Ты Джонни Депп и Брэд Питт в одном флаконе. Как самый лучший, ты записан в телефоне. И ты волшебный, ты с другой планеты. Я на все вопросы к тебе нашла ответы. О Боже, какой мужчина! О Боже, какой мужчина! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка! О Боже, какой мужчина, я хочу от тебя сына, и я хочу от тебя дочку, и точка, и точка!",
    },
  ],
  currentSong: {
    songID: "0",
    songName: "Рюмка водки на столе",
    artistName: "Григорий Лепс",
    fullTitle: "Григорий Лепс - Рюмка водки на столе",
    img: imgSong1LepsRumkaVodki,
    srcToSong: srcToSong1LepsRumkaVodki,
    srcToSongIntro: srcToSong1LepsRumkaVodkiIntro,
    playbackSpeed: 200,
    startMovingDelay: 0,//26,
    canvasWigth: 20000,
    finishLineXCoordinate: 17000,
    isPlaying: false,
    songText:
      "Ночь по улицам пошла                                          звездной поступью цариц.                                               Слов и чисел простота          у небесного моста           раскидала перья пти и и и и и ц.                              Не забудутся никем                                                  праздник губ обид и глаз.                                                Забери меня в свой плен,          эту линию колен               целовать в последний раааааааз.                 Тоооолькооооооо                рюмка водкииии на столе.           Ветер плачет за окнооом       тиииииихооо больююююю                                 о т з ы в а ю т с я в о м н е        э т о й молодой   л у н ы       к р и к и.                                                                                                  ",
  },
  isCurrentSongSet: false,
  currentSongVolume: 0.5,
  currentVoiceVolume: 1,
  isStopBtnPushed: false,
  canvas: null,
  canvasWrp: null,
  songMP3: null,
  textWrp: null,
  birdOnCanvas: null,
  isCurrentSongPlaying: false,
  xCoordOfBird: null,
  yCoordOfBird: null,
  soundExploision: null,
  srcToSoundExploision: srcToSoundExploision,
  soundOfFinish: null,
  srcToSoundOfFinish: srcToSoundOfFinish,
  srcTofinishLineImg: srcTofinishLineImg,
};

const startPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.song,
        isCurrentSongSet: true,
      };
    case IS_PLAYING_SET:
      return {
        ...state,
        isPlayng: action.isPlayng,
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

    default:
      return state;
  }
};

export default startPageReducer;
