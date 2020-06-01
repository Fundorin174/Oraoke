
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



let initialState = {
  isCheckingMicrophoneStart: false,
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
