import React from "react";
import {
  getIsChekingMicrophoneStart,
  getIsSetMaxUserVoiceLevel,
  getMaxUserVoiceLevel,
  } from "../redux/settingsPageSelectors";
import { compose } from "redux";
import { connect } from "react-redux";
import SongChoosePage from "./SongChoosePage";
import {
  getcurrentSongSelector,
  getSongsSelector,
  getIscurrentSongSetSelector,
  getCurrentLanguage,
  getLanguagesJSONData,
  getAdv,
} from "../redux/startPageSelectors";
import {
  changecurrentSong,
  currentLanguageToggle,
  SongType,
} from "../redux/startPageReduser";
import { AppStateType } from "../redux/redux-store";
import { AdvertismentType } from "../redux/startPageReduser";

const SongChoosePageContainer: React.FC<SongChoosePageContainerPropsType> = (
  props
) => {
  let playSongWhileShoosing = (selectedSong: SongType) => {
    let allSongMP3: Array<any> = Array.from(
      document.getElementsByClassName("audioMP3")
    );
    allSongMP3.forEach((song: HTMLAudioElement, i: number) => {
      song.pause();
      if (song && i === +selectedSong.songID && song.currentTime === 0.0) {
        allSongMP3.forEach((song: HTMLAudioElement) => {
          song.currentTime = 0.0;
        });
        song.play();
      } else if (
        song &&
        i === +selectedSong.songID &&
        props.isCurrentSongSet &&
        song.currentTime !== 0.0 &&
        selectedSong.songID === props.currentSong.songID
      ) {
        song.pause();
        song.currentTime = 0.0;
      }
    });
  };

  return (
    <SongChoosePage {...props} playSongWhileShoosing={playSongWhileShoosing} />
  );
};

type MapStateToPropsType = {
  isCheckingMicrophoneStart: boolean;
  adv3: AdvertismentType;
  adv4: AdvertismentType;
  adv5: AdvertismentType;
  adv6: AdvertismentType;
  maxUserVoiceLevel: number;
  isSetMaxUserVoiceLevel: boolean;
  songs: Array<SongType>;
  currentSong: SongType;
  isCurrentSongSet: boolean;
  currentLanguage: "ru" | "en";
  languagesJSONData: any;
};

type MapDispatchToPropsType = {
  changecurrentSong: (song: SongType) => void;
  currentLanguageToggle: (lang: "ru" | "en") => void;
};

type OwnPropsType = {};

type SongChoosePageContainerPropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  OwnPropsType;

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
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
  languagesJSONData: getLanguagesJSONData(state)
});

export default compose(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, { changecurrentSong, currentLanguageToggle })
)(SongChoosePageContainer);
