import React from 'react';
import SongPlayPage from './SongPlayPage';
import { compose } from 'redux';
import { connect } from "react-redux";
import { getMaxUserVoiceLevel, getIsSetMaxUserVoiceLevel, getAdv} from '../redux/settingsPageSelectors';
import { getcurrentSongSelector, getSongsSelector } from '../redux/startPageSelectors';


const SongPlayPageContainer = (props) => {
  return(
    <div >
      <SongPlayPage {...props}/>
    </div>
  )
}


let mapStateToProps = (state) => ({
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  currentSong: getcurrentSongSelector(state),
  songs: getSongsSelector(state),
  adv7: getAdv(state, 7),
  adv8: getAdv(state, 8)
  })

export default compose(connect(mapStateToProps, {}))(SongPlayPageContainer)