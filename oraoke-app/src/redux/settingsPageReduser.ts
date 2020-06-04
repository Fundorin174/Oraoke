
const IS_CHECKING_MICROPHONE_START =
    "ORAOKE/SETTINGS_PAGE/IS_CHECKING_MICROPHONE_START",
  MAX_USER_VOICE_LEVEL = "ORAOKE/SETTINGS_PAGE/MAX_USER_VOICE_LEVEL",
  IS_MAX_USER_VOICE_LEVEL_SET =
    "ORAOKE/SETTINGS_PAGE/IS_MAX_USER_VOICE_LEVEL_SET",
  SENSIBILITY_OF_FLY = 'ORAOKE/SETTINGS_PAGE/SENSIBILITY_OF_FLY';

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

type SetSensibilityOfFlyType = {
  type: typeof SENSIBILITY_OF_FLY
  sensibilityOfFly: number;
};

export const setSensibilityOfFly = (
  sensibilityOfFly: number
): SetSensibilityOfFlyType => ({
  type: SENSIBILITY_OF_FLY,
  sensibilityOfFly: sensibilityOfFly,
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
  | IsSetMaxUserVoiceLevelSuccsessType
  | SetSensibilityOfFlyType;



let initialState = {
  isCheckingMicrophoneStart: false,
  maxUserVoiceLevel: 0,
  isSetMaxUserVoiceLevel: false,
  sensibilityOfFly: 10
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
    case SENSIBILITY_OF_FLY:
      return {
        ...state,
        sensibilityOfFly: action.sensibilityOfFly,
      };

    default:
      return state;
  }
};

export default settingsPageReducer;
