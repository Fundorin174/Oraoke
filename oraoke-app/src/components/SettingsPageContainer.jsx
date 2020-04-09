import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SettingsPage from './SettingsPage';
import {
  getIsChekingMicrophoneStart,
  getMaxUserVoiceLevel,
  getIsSetMaxUserVoiceLevel,
  getAdv
} from '../redux/settingsPageSelectors';
import { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevelSuccsess} from './../redux/settingsPageReduser';



let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  adv1: getAdv(state, 1),
  adv2: getAdv(state, 2),
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state)
})

export default compose(connect(mapStateToProps, { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevelSuccsess }))(SettingsPage)