import React from 'react';
import classes from "./stylesheet/SongChoosePageContainer.module.scss";
import oraokeLogo from "../img/ОраокеLogo.png";
import Button from "./common/Button";
import {NavLink} from "react-router-dom";
import {bgShape} from "./common/commonFunctions";
import Song from "./common/Song";
import AdvertismentBlock from './common/AdvertismentBlock';

const SongChoosePage = (props) => {
  let texts = props.languagesJSONData[props.currentLanguage].songChoosePageTexts
  
  // create Songs components from state
  const createSongs = () => {
    return (
      props.songs.map((item) => {
        return <Song
                song={item}
                key={item.songID}
                changecurrentSong={props.changecurrentSong}
                currentSong={props.currentSong}
                playSongWhileShoosing={props.playSongWhileShoosing}
                isCurrentSongSet={props.isCurrentSongSet}
                currentLanguage={props.currentLanguage}/>
      })
  )
    ;
  }
  
  
  return (
    <div className={classes.PageContainer}>
      <div style={bgShape}/>
      <div className={classes.globalBacGround}>
      </div>
      <div className={classes.PageWrp}>
        
        {/* left advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock adv={props.adv3}
                             currentLanguage = {props.currentLanguage}/>
          <AdvertismentBlock adv={props.adv4}
                             currentLanguage = {props.currentLanguage}/>
        </div>
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={'Logo'}/>
            </div>
            <div>
              <p>{texts.askText}</p>
            </div>
          </div>
          {/*songs*/}
          <div className={classes.songsWrp}>
            <div className={classes.songsRow}>
              {/*  Тут будут песни */}
              {createSongs()}
            </div>
          </div>
          {/*  Button */}
          <NavLink to={'/song-play-page'}>
            <div className={classes.btnsWrp}>
              <Button btnText={texts.GoText}
                      btnNumber='1'
                      currentSong={props.currentSong}
                      currentLanguage={props.currentLanguage}/>
            </div>
          </NavLink>
        </div>
        
        {/* advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock adv={props.adv5}
                             currentLanguage = {props.currentLanguage}/>
          <AdvertismentBlock adv={props.adv6}
                             currentLanguage = {props.currentLanguage}/>
        </div>
        <div className={classes.toMainMenu}>
          <NavLink to={'/start-page'}>
            <span>{texts.mainMenuText}</span>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span onClick={() => props.currentLanguageToggle('ru')}>рус</span>
          <span>|</span>
          <span onClick={() => props.currentLanguageToggle('en')}>eng</span>
        </div>
      </div>
    </div>
  
  )
}


export default SongChoosePage