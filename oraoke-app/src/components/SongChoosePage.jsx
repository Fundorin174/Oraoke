import React from 'react';
import classes from "./stylesheet/SongChoosePageContainer.module.scss";
import oraokeLogo from "../img/ОраокеLogo.png";
import Button from "./common/Button";
import {NavLink} from "react-router-dom";
import {bgShape} from "./common/commonFunctions";
import Song from "./common/Song";

const SongChoosePage = (props) => {
  
 
  // create Songs components from state
  const createSongs = () => {
    return(
      props.songs.map((item, i) => {
        return <Song song = {item} key = {i} changecurrentSong = {props.changecurrentSong} currentSong = {props.currentSong} />
      })    )
  }
  
  
  return (
    <div className={classes.PageContainer}>
      <div className={classes.toMainMenu}>
        <NavLink to={'/start-page'}>
          <span>Главное меню</span>
        </NavLink>
      </div>
      <div style={bgShape}></div>
      <div className={classes.PageWrp}>
        {/* left advertisment */}
        <div className={classes.column}>
          <div className={classes.advertBlock}>
            <a href={props.thirdAdvLink} target='blank'><img src={props.thirdAdvImg} alt="adv3"/></a>
          </div>
          <div className={classes.advertBlock}>
            <a href={props.fourthAdvLink} target='blank'><img src={props.fourthAdvImg} alt="adv4"/></a>
          </div>
        </div>
        {/* Title and button */}
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={'Logo'}/>
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
          <NavLink to = {'/song-play-page'}>
            <div className={classes.btnsWrp}>
              <Button btnText='Поехали!' btnNumber='1' currentSong = {props.currentSong}/>
            </div>
          </NavLink>

        </div>


        {/* advertisment */}
        <div className={classes.column}>
          <div className={classes.advertBlock}>
            <a href={props.fifthAdvLink} target='blank'><img src={props.fifthAdvImg} alt="adv5"/></a>
          </div>
          <div className={classes.advertBlock}>
            <a href={props.sixAdvLink} target='blank'><img src={props.sixAdvImg} alt="adv6"/></a>
          </div>
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