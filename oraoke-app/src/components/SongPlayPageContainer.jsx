import React from 'react';
import SongPlayPage from './SongPlayPage';
import { compose } from 'redux';
import { connect } from "react-redux";
import { getMaxUserVoiceLevel, getIsSetMaxUserVoiceLevel, getAdv} from '../redux/settingsPageSelectors';
import { getcurrentSongSelector, getSongsSelector, getCurrentSoundFromBuffer } from '../redux/startPageSelectors';
import { transferSoundFromBufferToState} from './../redux/startPageReduser';



const SongPlayPageContainer = (props) => {



  const stopSigning = () => {
    props.currentSoundFromBuffer && props.currentSoundFromBuffer.stop();//сработает только после запуска песни
  }
  return(
    <div >
      <SongPlayPage stopSigning={stopSigning} {...props}/>
    </div>
  )
}


let mapStateToProps = (state) => ({
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  currentSong: getcurrentSongSelector(state),
  songs: getSongsSelector(state),
  adv7: getAdv(state, 7),
  adv8: getAdv(state, 8),
  currentSoundFromBuffer: getCurrentSoundFromBuffer(state),
})

export default compose(connect(mapStateToProps, { transferSoundFromBufferToState }))(SongPlayPageContainer)