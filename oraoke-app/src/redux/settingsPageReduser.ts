import { MultiLanguageTextType } from "./startPageReduser";
import Img1 from "./../img/advertisment/adv1SettingPage.png";
import Img2 from "./../img/advertisment/adv2SettingPage.png";
import Img3 from "./../img/advertisment/adv1SettingPage.png";
import Img5 from "./../img/advertisment/adv2SettingPage.png";
import Img4 from "./../img/advertisment/adv4ChooseSongPage.png";
import Img6 from "./../img/advertisment/adv6ChooseSongPage.png";

const IS_CHECKING_MICROPHONE_START =
    "ORAOKE/SETTINGS_PAGE/IS_CHECKING_MICROPHONE_START",
  MAX_USER_VOICE_LEVEL = "ORAOKE/SETTINGS_PAGE/MAX_USER_VOICE_LEVEL",
  IS_MAX_USER_VOICE_LEVEL_SET =
    "ORAOKE/SETTINGS_PAGE/IS_MAX_USER_VOICE_LEVEL_SET";

type ToggleIsCheckingMicrophoneStartType = {
  type: typeof IS_CHECKING_MICROPHONE_START;
  isStart: boolean;
};

export const toggleIsCheckingMicrophoneStart = (
  isStart: boolean
): ToggleIsCheckingMicrophoneStartType => ({
  type: IS_CHECKING_MICROPHONE_START,
  isStart: isStart,
});

type SetMaxUserVoiceLevelType = {
  type: typeof MAX_USER_VOICE_LEVEL;
  userVoiceLevel: number;
};

export const setMaxUserVoiceLevel = (
  userVoiceLevel: number
): SetMaxUserVoiceLevelType => ({
  type: MAX_USER_VOICE_LEVEL,
  userVoiceLevel: userVoiceLevel,
});

type IsSetMaxUserVoiceLevelSuccsessType = {
  type: typeof IS_MAX_USER_VOICE_LEVEL_SET;
  isMaxUserVoiсeLevelSet: boolean;
};

export const isSetMaxUserVoiceLevelSuccsess = (
  isMaxUserVoiсeLevelSet: boolean
): IsSetMaxUserVoiceLevelSuccsessType => ({
  type: IS_MAX_USER_VOICE_LEVEL_SET,
  isMaxUserVoiсeLevelSet: isMaxUserVoiсeLevelSet,
});

type ActionType =
  | ToggleIsCheckingMicrophoneStartType
  | SetMaxUserVoiceLevelType
  | IsSetMaxUserVoiceLevelSuccsessType;

export type AdvertismentType = {
  url: string;
  img: string;
  text: MultiLanguageTextType;
};

let initialState = {
  isCheckingMicrophoneStart: false,
  advertisment: {
    adv1: {
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img1,
      text: {
        ru: "Канал ВНИКНИ",
        en: "VNIKNI channel",
      },
    },
    adv2: {
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img2,
      text: {
        ru: "Канал ВНИКНИ",
        en: "VNIKNI channel",
      },
    },
    adv3: {
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img3,
      text: {
        ru: "Канал ВНИКНИ",
        en: "VNIKNI channel",
      },
    },
    adv4: {
      url:
        "https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8",
      img: Img4,
      text: {
        ru: "Канал Путь Самурая",
        en: "The Way of Samurai channel",
      },
    },
    adv5: {
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img5,
      text: {
        ru: "Канал ВНИКНИ",
        en: "VNIKNI channel",
      },
    },
    adv6: {
      url: "https://it-incubator.by/",
      img: Img6,
      text: {
        ru: "IT-ИНКУБАТОР",
        en: "IT-INCUBATOR",
      },
    },
    adv7: {
      url: "http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98",
      img: Img3,
      text: {
        ru: "Канал ВНИКНИ - самый крутой канал",
        en: "VNIKNI channel - the best channel",
      },
    },
    adv8: {
      url: "https://it-incubator.by/",
      img: Img6,
      text: {
        ru: "IT ИНКУБАТОР - надежный путь в программисты",
        en: "IT-INCUBATOR - the best way to programmers",
      },
    },
  },
  maxUserVoiceLevel: 0,
  isSetMaxUserVoiceLevel: false,
};

export type SettingPageInitialStateType = typeof initialState;

const settingsPageReducer = (
  state = initialState,
  action: ActionType
): SettingPageInitialStateType => {
  switch (action.type) {
    case IS_CHECKING_MICROPHONE_START:
      return {
        ...state,
        isCheckingMicrophoneStart: action.isStart,
      };
    case MAX_USER_VOICE_LEVEL:
      return {
        ...state,
        maxUserVoiceLevel: action.userVoiceLevel,
      };
    case IS_MAX_USER_VOICE_LEVEL_SET:
      return {
        ...state,
        isSetMaxUserVoiceLevel: action.isMaxUserVoiсeLevelSet,
      };

    default:
      return state;
  }
};

export default settingsPageReducer;
