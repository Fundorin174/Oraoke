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
export const isSetMaxUserVoiceLevel = (isMaxUserVoiseLevelSet) => ({
    type: IS_MAX_USER_VOICE_LEVEL_SET,
    isMaxUserVoiseLevelSet: isMaxUserVoiseLevelSet
    });

let initialState = {
  isCheckingMicrophoneStart: false,
  firstAdvLink: 'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
  secondAdvLink: 'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
  maxUserVoiceLevel: null,
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