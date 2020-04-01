const IS_CHECKING_MICROPHONE_START = 'ORAOKE/SETTINGS_PAGE/IS_CHECKING_MICROPHONE_START'

export const toggleIsCheckingMicrophoneStart = (isStart) => ({
    type: IS_CHECKING_MICROPHONE_START,
    isStart: isStart
    });

let initialState = {
  isCheckingMicrophoneStart: false,
  firstAdvLink: 'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98',
  secondAdvLink: 'http://www.youtube.com/c/%D0%92%D0%9D%D0%98%D0%9A%D0%9D%D0%98'
}

const settingsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_CHECKING_MICROPHONE_START:
      
      return {
        ...state,
        isCheckingMicrophoneStart: action.isStart
      };

    default:
      return state;
  }

  }

  export default settingsPageReducer;