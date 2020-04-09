export const getIsChekingMicrophoneStart = (state) => {
  return state.settingsPage.isCheckingMicrophoneStart;
}

export const getAdv = (state, numOfAdv) => {
  return state.settingsPage.advertisment[`adv${numOfAdv}`];
}



export const getMaxUserVoiceLevel = (state) => {
  return state.settingsPage.maxUserVoiceLevel;
}
export const getIsSetMaxUserVoiceLevel = (state) => {
  return state.settingsPage.isSetMaxUserVoiceLevel;
}