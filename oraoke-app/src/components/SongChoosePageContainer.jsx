import React, { useEffect }from 'react';
import {
  getAdvImg,
  getAdvLink,
  getIsChekingMicrophoneStart, getIsSetMaxUserVoiceLevel,
  getMaxUserVoiceLevel,
} from "../redux/settingsPageSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import SongChoosePage from "./SongChoosePage";
import {getcurrentSongSelector, getSongsSelector, getIscurrentSongSetSelector} from "../redux/startPageSelectors";
import {changecurrentSong} from "../redux/startPageReduser";


let mapStateToProps = (state) => ({
  isCheckingMicrophoneStart: getIsChekingMicrophoneStart(state),
  thirdAdvLink: getAdvLink (state, 3),
  fourthAdvLink: getAdvLink(state, 4),
  fifthAdvLink: getAdvLink(state, 5),
  sixAdvLink: getAdvLink(state, 6),
  thirdAdvImg: getAdvImg (state, 3),
  fourthAdvImg: getAdvImg(state, 4),
  fifthAdvImg: getAdvImg(state, 5),
  sixAdvImg: getAdvImg(state, 6),
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  songs: getSongsSelector(state),
  currentSong: getcurrentSongSelector(state),
  isCurrentSongSet: getIscurrentSongSetSelector(state),
})

const SongChoosePageContainer = (props) => {

let playSongWhileShoosing = (selectedSong) => {
  let allSongMP3 = Array.from(document.getElementsByClassName('audioMP3'));
  allSongMP3.forEach((song, i)=>{
        song.pause();
        // song.currentTime = 0.0; 
          if (song && i === +selectedSong.songID && song.currentTime == 0.0) {
            allSongMP3.forEach((song)=>{
              song.currentTime = 0.0;
            })
            song.play()
          }
          else if (song && (i === +selectedSong.songID) && props.isCurrentSongSet && song.currentTime != 0.0 && selectedSong.songID === props.currentSong.songID) 
          {
            song.pause();
            song.currentTime = 0.0;
          }
  });
}

 return <SongChoosePage {...props} playSongWhileShoosing = {playSongWhileShoosing}  />
}





export default compose(connect(mapStateToProps, { changecurrentSong}))(SongChoosePageContainer)