import React from 'react';
import StartPage from './StartPage';
import { getcurrentSongSelector } from '../redux/startPageSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => ({
  currentSong: getcurrentSongSelector(state)
})


export default compose(connect(mapStateToProps, {}))(StartPage)