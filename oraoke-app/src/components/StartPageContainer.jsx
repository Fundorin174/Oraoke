import React from 'react';
import StartPage from './StartPage';
import { getcurrentSongSelector,getCurrentLanguage } from '../redux/startPageSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {currentLanguageToggle} from "../redux/startPageReduser";

let mapStateToProps = (state) => ({
  currentSong: getcurrentSongSelector(state),
  currentLanguage: getCurrentLanguage(state),
})


export default compose(connect(mapStateToProps, {currentLanguageToggle}))(StartPage)