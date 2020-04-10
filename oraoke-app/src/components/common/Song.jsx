import React from 'react';
import classes from './../stylesheet/Song.module.scss';

const Song = React.memo((props) => {

  let classNamesBtn = `${classes.songWrp} ${props.song.artistName === props.currentSong.artistName && props.isCurrentSongSet ? classes.active : null}`;


  let onBtnClick = () => {
    props.changecurrentSong(props.song);
    props.playSongWhileShoosing(props.song);
  }

  return (
    <div onClick={() => {
      onBtnClick()
    }} className={classNamesBtn}>
      <div className={classes.imgWrp}>
        <img src={props.song.img} alt="img" />
      </div>
      <div className={classes.textWrp}>
        <div><p>{props.song.artistName}</p></div>
        <div><p>{props.song.songName}</p></div>
      </div>
      <div className={classes.song}>
        <audio className='audioMP3' src={props.song.srcToSongIntro}></audio>
      </div>
    </div>
  )
});

export default Song

