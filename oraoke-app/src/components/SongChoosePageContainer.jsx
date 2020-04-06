import React from 'react';
import {
  getAdvImg,
  getAdvLink,
  getIsChekingMicrophoneStart, getIsSetMaxUserVoiceLevel,
  getMaxUserVoiceLevel,
} from "../redux/settingsPageSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import SongChoosePage from "./SongChoosePage";
import settingsPageReducer from "../redux/settingsPageReduser";
import {getDefaultSongSelector, getSongsSelector} from "../redux/startPageSelectors";


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
  defaultSong: getDefaultSongSelector(state)
})

export default compose(connect(mapStateToProps, {  }))(SongChoosePage)