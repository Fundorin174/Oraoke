import React from "react";
import StartPage from "./StartPage";
import {
  getcurrentSongSelector,
  getCurrentLanguage,
} from "../redux/startPageSelectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { currentLanguageToggle, SongType } from "../redux/startPageReduser";
import { AppStateType } from "../redux/redux-store";

type MapStateToPropsType = {
  currentSong: SongType;
  currentLanguage: string;
};

type MapDisparchToPropsType = {
  currentLanguageToggle: (lang: "ru" | "en") => void;
};

type OwnPropsType = {};

export type StartPageConteinerPropsType = MapStateToPropsType &
  MapDisparchToPropsType &
  OwnPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentSong: getcurrentSongSelector(state),
  currentLanguage: getCurrentLanguage(state),
});

export default compose(
  connect<
    MapStateToPropsType,
    MapDisparchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, { currentLanguageToggle })
)(StartPage);
