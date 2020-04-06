import React from 'react';
import classes from './../stylesheet/Song.module.scss';

const Song = (props) => {
  
  let classNamesBtn = `${classes.songWrp} ${props.song.artistName == props.currentSong.artistName ? classes.active : null}`;
  
  let onBtnClick = () => {
    props.changecurrentSong(props.song);
  }
  
  
  return (
    <div onClick={() => {
      onBtnClick()
    }} className={classNamesBtn}>
      <div className={classes.imgWrp}>
        <img src={props.song.img} alt="img"/>
      </div>
      <div className={classes.textWrp}>
        <div><p>{props.song.artistName}</p></div>
        <div><p>{props.song.songName}</p></div>
      </div>
    </div>
  )
}

export default Song

