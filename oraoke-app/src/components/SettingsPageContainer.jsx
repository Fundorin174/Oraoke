import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SettingsPage from './SettingsPage';
import {
  getIsChekingMicrophoneStart,
  getMaxUserVoiceLevel,
  getIsSetMaxUserVoiceLevel,
  getAdvLink
} from '../redux/settingsPageSelectors';
import { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevelSuccsess} from './../redux/settingsPageReduser';



let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  firstAdvLink: getAdvLink(state, 1),
  secondAdvLink: getAdvLink(state, 2),
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state)
})

export default compose(connect(mapStateToProps, { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevelSuccsess }))(SettingsPage)