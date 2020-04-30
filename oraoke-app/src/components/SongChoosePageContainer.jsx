import React from 'react';
import {
  getIsChekingMicrophoneStart, getIsSetMaxUserVoiceLevel,
  getMaxUserVoiceLevel,
  getAdv,
} from "../redux/settingsPageSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import SongChoosePage from "./SongChoosePage";
import {
  getcurrentSongSelector,
  getSongsSelector,
  getIscurrentSongSetSelector,
  getCurrentLanguage
} from "../redux/startPageSelectors";
import {changecurrentSong, currentLanguageToggle} from "../redux/startPageReduser";


const SongChoosePageContainer = (props) => {

  let playSongWhileShoosing = (selectedSong) => {
  let allSongMP3 = Array.from(document.getElementsByClassName('audioMP3'));
  allSongMP3.forEach((song, i)=>{
        song.pause();
          if (song && i === +selectedSong.songID && song.currentTime === 0.0) {
            allSongMP3.forEach((song)=>{
              song.currentTime = 0.0;
            })
            song.play();
          }
          else if (song && (i === +selectedSong.songID) &&
            props.isCurrentSongSet && song.currentTime !== 0.0 &&
            selectedSong.songID === props.currentSong.songID)
          {
            song.pause();
            song.currentTime = 0.0;
          }
  });
}

 return <SongChoosePage {...props} playSongWhileShoosing = {playSongWhileShoosing}/>
}



let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  adv3: getAdv(state, 3),
  adv4: getAdv(state, 4),
  adv5: getAdv(state, 5),
  adv6: getAdv(state, 6),
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  songs: getSongsSelector(state),
  currentSong: getcurrentSongSelector(state),
  isCurrentSongSet: getIscurrentSongSetSelector(state),
  currentLanguage: getCurrentLanguage(state),
})



export default compose(connect(mapStateToProps, { changecurrentSong, currentLanguageToggle}))(SongChoosePageContainer)