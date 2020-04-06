export const getIsChekingMicrophoneStart = (state) => {
  return state.settingsPage.isCheckingMicrophoneStart;
}
export const getAdvLink = (state, numOfAdv) => {
  switch (numOfAdv) {
    case 1:
      return state.settingsPage.advertisment.first.url;
    case 2:
      return state.settingsPage.advertisment.second.url;
    case 3:
      return state.settingsPage.advertisment.third.url;
    case 4:
      return state.settingsPage.advertisment.fourth.url;
    case 5:
      return state.settingsPage.advertisment.fifth.url;
    case 6:
      return state.settingsPage.advertisment.six.url;
    default:
      return null;
  }
  
}

export const getAdvImg = (state, numOfAdv) => {
  switch (numOfAdv) {
    case 1:
      return state.settingsPage.advertisment.first.img;
    case 2:
      return state.settingsPage.advertisment.second.img;
    case 3:
      return state.settingsPage.advertisment.third.img;
    case 4:
      return state.settingsPage.advertisment.fourth.img;
    case 5:
      return state.settingsPage.advertisment.fifth.img;
    case 6:
      return state.settingsPage.advertisment.six.img;
    default:
      return null;
  }
  
}

export const getMaxUserVoiceLevel = (state) => {
  return state.settingsPage.maxUserVoiceLevel;
}
export const getIsSetMaxUserVoiceLevel = (state) => {
  return state.settingsPage.isSetMaxUserVoiceLevel;
}