import React, {useState} from 'react';
import oraokeLogo from './../img/ОраокеLogo.png';
import classes from './stylesheet/SettingsPageContainer.module.scss';
import Button from './common/Button';
import {NavLink} from 'react-router-dom';
import bgImgUrl from './../img/backgroundImg.webp'
import adv1 from './../img/advertisment/adv1SettingPage.png';
import adv2 from './../img/advertisment/adv2SettingPage.png';
import birdLeft from './../img/BirdTransparentLeft.gif';
import {useEffect} from 'react';
import {bgShape} from "./common/commonFunctions";

const SettingsPage = React.memo((props) => {
  

  
  let num = 32, //количество элементов в массиве в который будет записан звук с микрофона
    array,
    context,
    bird,
    birdHeigth,
    analyser,
    src,
    maxHeightForWile = 255;
  //Statement of Button Start
  
  let onStartCheckingMicrophone = () => {
    let scaleItems = document.getElementsByClassName(
      'SettingsPageContainer_linesItem__X_rp1'
    );
    props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
    //sound animation
    
    array = new Uint8Array(num);
    
    if (context)
      return;
    
    bird = document.getElementById('bird')
    context = new AudioContext();
    analyser = context.createAnalyser();
    
    navigator
      .mediaDevices
      .getUserMedia({audio: true})
      .then(stream => {
        
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        
        analyser.connect(context.destination); //вывод звука на колонки
        
        // loop(); рекурсивная функция обрабатывающая звук с микрофона
        let loop = setTimeout(function moveBird() {
          let lineHeight = document
            .getElementById('linesTable')
            .clientHeight;//высота шкалы
          birdHeigth = bird.clientHeight;//высота птицы
          
          analyser.getByteFrequencyData(array); //получение данных частот
          let averageHeight = array.reduce((summ, current) => summ + current) / array.length;
          
          // Задание высоты подъема птицы от стреднего уровня сигнала в массиве
          
          let birdFlyingHidh = (
            averageHeight * lineHeight / maxHeightForWile > 0 && (averageHeight * lineHeight / maxHeightForWile) - birdHeigth < lineHeight
          )
            ? (averageHeight * lineHeight / maxHeightForWile + 'px')
            : (
              averageHeight * lineHeight / maxHeightForWile > 0 && (averageHeight * lineHeight / maxHeightForWile) - birdHeigth > lineHeight
            )
              ? (lineHeight - birdHeigth + 'px')
              : 0 + 'px';
          
          bird.style.marginBottom = birdFlyingHidh; //changing marging - and fly))
          
          let birdFlyingHidhLikeNum = birdFlyingHidh.slice(0, -2) //remove 'px' from end
          
          // Динамическое закрашивание секций на шкале
          for (let i = 0; i < scaleItems.length; i++) {
            if (i < +birdFlyingHidhLikeNum / 20) {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor = 'rgba(255, 29, 190, 0.8)';
            } else {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor = '';
            }
          }
          
          //Запись максимального значения голоса в state
          
          if (averageHeight > 190) {
            props.isSetMaxUserVoiceLevelSuccsess(true); //успешная калибровка
            if (averageHeight > props.maxUserVoiceLevel) {
              props.setMaxUserVoiceLevel(averageHeight)
            }
          }
          
          loop = setTimeout(moveBird, 30); // рекурсия
        }, 30);
        // eventListener on Stop button + bird go down + disconect dinamics + clear Bgnd
        // of scaleItems
        let stopBtn = document.getElementById('StopBtn');
        let toSongsBtn = document.getElementById('toSongsBtn');
        stopBtn.addEventListener('click', () => {
          clearTimeout(loop);
          bird.style.marginBottom = 0 + 'px';
          analyser.disconnect();
          for (let i = 0; i < scaleItems.length; i++) {
            scaleItems[i].style.backgroundColor = '';
          }
        });
        
        toSongsBtn.addEventListener('click', () => {
          clearTimeout(loop);
          bird.style.marginBottom = 0 + 'px';
          analyser.disconnect();
          for (let i = 0; i < scaleItems.length; i++) {
            scaleItems[i].style.backgroundColor = '';
          }
        });
        
        
      })
      .catch(error => {
        alert(
          error + '\r\n\ Отклонено. Перезагрузите страницу!'
        );
      });
  }
  
  let onFinishCheckingMicrophone = () => {
    props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
  }
  
  let pushStartNotScreamed = props.isCheckingMicrophoneStart && !props.isSetMaxUserVoiceLevel;
  let toSongBtnClassNames = `${classes.btnsWrp} ${props.isSetMaxUserVoiceLevel
    ? classes.visible
    : classes.unvisible}`;
  
  useEffect(() => {
    //generating scale on lineTables (many div for 20px)
    let lineHeight = document
        .getElementById('linesTable')
        .clientHeight,
      numOfItems = Math.floor(lineHeight / 20) - ((lineHeight / 20) * 0, 4),
      lineTable = document.getElementById('linesTable');
    
    for (let i = 0; i < numOfItems; i++) {
      let div = document.createElement('div');
      div.className = 'SettingsPageContainer_linesItem__X_rp1'; //styles '.linesItem' from settingsPageContainer.module.scss
      lineTable.appendChild(div);
    }
  }, []);
  
  
  return (
    <div className={classes.PageContainer}>
     <div style={bgShape}></div>
      <div className={classes.globalBacGround}>
      </div>
      <div className={classes.PageWrp}>
        
        {/* advertisment */}
        <div className={classes.column}>
          <div className={classes.advertBlock}>
            <a href={props.firstAdvLink} target='blank'><img src={adv1} alt="adv1"/></a>
          </div>
          <div className={classes.advertBlock}>
            <a href={props.secondAdvLink} target='blank'><img src={adv2} alt="adv2"/></a>
          </div>
        </div>
        {/* Title and button */}
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={'Logo'}/>
            </div>
            <div>
              {!props.isCheckingMicrophoneStart &&
              <p>Нажмите на кнопку “Старт” и разрешите браузеру доступ к микрофону</p>}
              {pushStartNotScreamed && <p>Крикните в микрофон так, чтобы птичка поднялась в зеленую зону</p>}
            </div>
          </div>
          {/* START or STOP Buttons */}
          {
            !props.isCheckingMicrophoneStart
              ? <div
                className={classes.btnsWrp}
                onClick={() => {
                  onStartCheckingMicrophone()
                }}>
                <Button btnText='СТАРТ' btnNumber='1'/>
              </div>
              : <div
                id='StopBtn'
                className={classes.btnsWrp}
                onClick={() => {
                  onFinishCheckingMicrophone()
                }}>
                <Button btnText='СТОП' btnNumber='1'/>
              </div>
          }
          {/*after success test*/}
          <div className={classes.title}>
            {props.isSetMaxUserVoiceLevel && <p>Отлично! <br></br> Вернитесь к выбору песни</p>}
            {
              <div
                id='toSongsBtn'
                className={toSongBtnClassNames} onClick={() => {
                onFinishCheckingMicrophone()
              }}>
                <NavLink to={'/song-choose-page'}>
                  <Button btnText='К песням' btnNumber='2'/>
                </NavLink>
              </div>}
          </div>
        
        </div>
        {/* Table and bird */}
        <div className={classes.column}>
          <div className={classes.voiceLevelTable}>
            <div className={classes.linesTable} id='linesTable'>
              {/* Тут будут дивы из UseEffecta */}
            </div>
            <div className={classes.birdMainWrp}>
              <div id='bird' className={classes.birdWrp}>
                <img src={birdLeft} alt="bird"/>
              </div>
            </div>
          </div>
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
})

export default SettingsPage