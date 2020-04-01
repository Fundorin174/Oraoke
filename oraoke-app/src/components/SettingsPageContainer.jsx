import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SettingsPage from './SettingsPage';
import { getIsChekingMicrophoneStart, getFirstAdvLink, getSecondAdvLink } from '../redux/settingsPageSelectors';
import { toggleIsCheckingMicrophoneStart} from './../redux/settingsPageReduser';



let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  firstAdvLink: getFirstAdvLink(state),
  secondAdvLink: getSecondAdvLink(state)
})

export default compose(connect(mapStateToProps, { toggleIsCheckingMicrophoneStart }))(SettingsPage)