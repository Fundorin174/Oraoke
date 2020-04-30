import React, { useEffect, useState } from 'react';
import classes from './../stylesheet/Button.module.scss'
import starBtn from './../../img/StarOnBtn.svg'

const Button = (props) => {
  let [partOfSong, setPartOfSong] = useState('');
  let songNameMove;
    useEffect(() => {
      //Бегущая строка в кнопке с название песни
      ticker();

    return (//Отключение счетчика при уходе со страницы
      () => {clearTimeout(songNameMove);}
    );
    }, [props.currentSong, props.currentLanguage]);
    /////////////////////////////////////////////////////////
   //функция вывода бегущей строки в кнопку если она есть в пропсах
    let ticker = () => {
      //создание массива букв, помещающегося в поле
      let arr = props.currentSong && props
        .currentSong
        .fullTitle[props.currentLanguage]
        .split('');
      //если название в поле не помещается - включаем бегущую строку
      if (arr && arr.length > 29) {
        //длина названия песни
        let j = props.currentSong.fullTitle[props.currentLanguage].length;
        // счетчик вставляемых букв
        let i = 0;
        //длина строки
        let stringLength = 28;
        // рекурсия названия песни если она не помещается в топе полностью.
        // плюс вставка символов пробелов, там где они автоматически удаляются
        songNameMove = setTimeout(function move() {
          // массив в буквами из первого круга
          let arr1 = (i < (j - stringLength)) ? arr.slice(i, i + stringLength) : arr.slice(i, j);
          // массив с буквами из второго круга
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

