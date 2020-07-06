import React, { useEffect, useState } from 'react';
import classes from './../stylesheet/Button.module.scss'
import starBtn from './../../img/StarOnBtn.svg'

const Button = (props) => {
  let [partOfSong, setPartOfSong] = useState('');
  let songNameMove;
    useEffect(() => {
      //A running line in the button with the song name
      ticker();

    return (//Disabling the counter when leaving the page
      () => {clearTimeout(songNameMove);}
    );
    }, [props.currentSong, props.currentLanguage]);
    /////////////////////////////////////////////////////////
   //function for displaying a running line in the button if it is present in the props
    let ticker = () => {
      //the creation of  of an array of letters that fit in the box
      let arr = props.currentSong && props
        .currentSong
        .fullTitle
        .split('');
      //if the name doesn't fit in the field, turn on the running line
      if (arr && arr.length > 29) {
        //length of the song title
        let j = props.currentSong.fullTitle.length;
        //counter for inserted letters
        let i = 0;
        //string length
        let stringLength = 28;
        // recursion of the song title if it doesn't fit in the top completely.
        // plus inserting space characters where they are automatically deleted
        songNameMove = setTimeout(function move() {
          // array in letters from the first circle
          let arr1 = (i < (j - stringLength)) ? arr.slice(i, i + stringLength) : arr.slice(i, j);
          // array with letters from the second circle
          let arr2 = (i < (j - stringLength)) ? [] : arr.slice(0, (stringLength+i)-j);
          let newArr = arr1.concat(['  '], arr2);
          (i < j || i === j) ? (i += 1) : (i = 0);
          setPartOfSong(newArr);
          songNameMove = setTimeout(move, 300);
        }, 300);
    
      } else {setPartOfSong(arr);};
    };

  return(
    <div className={classes.btnwrp}>
      <div className={classes.star}>
        <img src={starBtn} alt="Star"/>
        <span>{props.btnNumber}</span>
      </div>
      <div className={classes.text}>
        <span>{props.btnText}</span>
        {/* if in props put default song */}
        {props.currentSong
        && 
          <div className={classes.currentSong}>
            {
            partOfSong[0] === ' ' ? <span>&nbsp;{partOfSong}</span> : <span>{partOfSong}</span>
            }
          </div>}
      </div>
    </div>
  )
}

export default Button

