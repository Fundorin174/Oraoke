import React from 'react';
import classes from "./stylesheet/SongChoosePageContainer.module.scss";
import oraokeLogo from "../img/ОраокеLogo.png";
import Button from "./common/Button";
import {NavLink} from "react-router-dom";
import {bgShape} from "./common/commonFunctions";
import Song from "./common/Song";
import AdvertismentBlock from './common/AdvertismentBlock';

const SongChoosePage = (props) => {
  
 
  // create Songs components from state
  const createSongs = () => {
    return(
      props.songs.map((item) => {
        return <Song song={item} key={item.songID} changecurrentSong = {props.changecurrentSong} currentSong = {props.currentSong} playSongWhileShoosing = {props.playSongWhileShoosing} isCurrentSongSet = {props.isCurrentSongSet} />
      })    )
  }
  
  
  return (
    <div className={classes.PageContainer}>
      <div style={bgShape}></div>
      <div className={classes.globalBacGround}>
      </div>      
      <div className={classes.PageWrp}>
        {/* left advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock adv = {props.adv3}/>
          <AdvertismentBlock adv={props.adv4}/>
        </div>
        {/* Title and button */}
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={'Logo'} />
            </div>
            <div>
              <p>Что будем орать?</p>
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
              <Button btnText='Поехали!' btnNumber='1' currentSong={props.currentSong} />
            </div>
          </NavLink>

        </div>


        {/* advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock adv={props.adv5} />
          <AdvertismentBlock adv={props.adv6} />
        </div>
        <div className={classes.toMainMenu}>
          <NavLink to={'/start-page'}>
            <span>Главное меню</span>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span>рус</span>
          <span>|</span>
          <span>eng</span>
        </div>
      </div>
      </div>

  )
}


export default SongChoosePage