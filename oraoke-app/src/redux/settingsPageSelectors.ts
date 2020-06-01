import { AppStateType } from "./redux-store";

export const getIsChekingMicrophoneStart = (state: AppStateType) => {
  return state.settingsPage.isCheckingMicrophoneStart;
};

export const getMaxUserVoiceLevel = (state: AppStateType) => {
  return state.settingsPage.maxUserVoiceLevel;
};
export const getIsSetMaxUserVoiceLevel = (state: AppStateType) => {
  return state.settingsPage.isSetMaxUserVoiceLevel;
};
