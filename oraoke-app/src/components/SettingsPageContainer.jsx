import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SettingsPage from './SettingsPage';
import { getIsChekingMicrophoneStart, getFirstAdvLink, getSecondAdvLink, getMaxUserVoiceLevel, getIsSetMaxUserVoiceLevel } from '../redux/settingsPageSelectors';
import { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevel} from './../redux/settingsPageReduser';



let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  firstAdvLink: getFirstAdvLink(state),
  secondAdvLink: getSecondAdvLink(state),
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state)
})

export default compose(connect(mapStateToProps, { toggleIsCheckingMicrophoneStart, setMaxUserVoiceLevel, isSetMaxUserVoiceLevel }))(SettingsPage)