import Img1 from './../img/advertisment/adv1SettingPage.png';
import Img2 from './../img/advertisment/adv2SettingPage.png';
import Img3 from './../img/advertisment/adv1SettingPage.png';
import Img5 from './../img/advertisment/adv2SettingPage.png';
import Img4 from './../img/advertisment/adv4ChooseSongPage.png';
import Img6 from './../img/advertisment/adv6ChooseSongPage.png';

const IS_CHECKING_MICROPHONE_START = 'ORAOKE/SETTINGS_PAGE/IS_CHECKING_MICROPHONE_START',
      MAX_USER_VOICE_LEVEL = 'ORAOKE/SETTINGS_PAGE/MAX_USER_VOICE_LEVEL',
      IS_MAX_USER_VOICE_LEVEL_SET = 'ORAOKE/SETTINGS_PAGE/IS_MAX_USER_VOICE_LEVEL_SET';

export const toggleIsCheckingMicrophoneStart = (isStart) => ({
    type: IS_CHECKING_MICROPHONE_START,
    isStart: isStart
    });
export const setMaxUserVoiceLevel = (userVoiceLevel) => ({
    type: MAX_USER_VOICE_LEVEL,
    userVoiceLevel: userVoiceLevel
    });
export const isSetMaxUserVoiceLevelSuccsess = (isMaxUserVoiseLevelSet) => ({
    type: IS_MAX_USER_VOICE_LEVEL_SET,
    isMaxUserVoiseLevelSet: isMaxUserVoiseLevelSet
    });

let initialState = {
  isCheckingMicrophoneStart: false,
  advertisment: {
    adv1: {
      url:'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
      img: Img1,
      text: 'Канал ВНИКНИ'
    },
    adv2: {
      url:'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
      img: Img2,
      text: 'Канал ВНИКНИ'
    },
    adv3: {
      url:'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
      img: Img3,
      text: 'Канал ВНИКНИ'
    },
    adv4: {
      url:'https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8',
      img: Img4,
      text: 'Канал Путь Самурая'
    },
    adv5: {
      url:'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
      img: Img5,
      text: 'Канал ВНИКНИ'
    },
    adv6: {
      url:'https://it-incubator.by/',
      img: Img6,
      text: 'IT ИНКУБАТОР'
    },
    adv7: {
      url: 'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
      img: Img3,
      text: 'Канал ВНИКНИ - самый крутой канал'
    },
    adv8: {
      url:'https://it-incubator.by/',
      img: Img6,
      text: 'IT ИНКУБАТОР-надежный путь в программисты'
    }
    
  },
  maxUserVoiceLevel: 0,
  isSetMaxUserVoiceLevel: false
}

const settingsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHECKING_MICROPHONE_START:      
      return {
        ...state,
        isCheckingMicrophoneStart: action.isStart
      };
    case MAX_USER_VOICE_LEVEL:
      return {
        ...state,
        maxUserVoiceLevel: action.userVoiceLevel
      };
    case IS_MAX_USER_VOICE_LEVEL_SET:
      return {
        ...state,
        isSetMaxUserVoiceLevel: action.isMaxUserVoiseLevelSet
      };

    default:
      return state;
  }

  }

  export default settingsPageReducer;