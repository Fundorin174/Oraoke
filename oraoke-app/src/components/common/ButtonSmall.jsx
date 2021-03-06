import React, { useEffect, useState } from 'react';
import classes from './../stylesheet/ButtonSmall.module.scss';
import starBtn from './../../img/StarOnBtn.svg'

const ButtonSmall = (props) => {
  let [partOfSong, setPartOfSong] = useState('');
    useEffect(() => {
      //Running line
        let arr = props.currentSong && props
            .currentSong
            .fullTitle
            .split('');
        if (arr && arr.length > 29) {
            let j = props.currentSong.fullTitle.length;
            let i = 0;
            let stringLength = 28;
            let songNameMove = setTimeout(function move() {
              let arr1 = (i < (j - stringLength)) ? arr.slice(i, i + stringLength) : arr.slice(i, j);
              let arr2 = (i < (j - stringLength)) ? [] : arr.slice(0, (stringLength+i)-j);
              let newArr = arr1.concat(['  '], arr2);
              (i < j || i === j)
                    ? i += 1
                    : i = 0;
              setPartOfSong(newArr);
                songNameMove = setTimeout(move, 300);
            }, 300);
          return (//Disabling the tag when leaving the page
            () => {
              clearTimeout(songNameMove);
            }
          )
        } else {setPartOfSong(arr)};
      
    }, [props.currentSong]);


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

export default ButtonSmall

