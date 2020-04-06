import React, { useEffect, useState } from 'react';
import classes from './../stylesheet/Song.module.scss'


const Song = (props) => {
  


  return(
    <div className={classes.songWrp}>
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

