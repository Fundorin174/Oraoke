import React from 'react';
import StartPage from './StartPage';
import { getDefaultSongSelector } from '../redux/startPageSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => ({
  defaultSong: getDefaultSongSelector(state)
})


export default compose(connect(mapStateToProps, {}))(StartPage)