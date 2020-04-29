import React from 'react';
import classes from './stylesheet/StartPageContainer.module.scss';
import oraokeLogo from './../img/ОраокеLogo.png';
import bgImgUrl from './../img/backgroundImg.webp'
import Button from "./common/Button";
import { NavLink } from 'react-router-dom';
import ButtonSmall from './common/ButtonSmall';

const StartPage = (props) => {
  const bgShape = {
    width: `100%`,
    height: `100%`,
    background: `center center no-repeat url(${bgImgUrl})`,
    backgroundSize: `cover`,
    position:`absolute`,
    zIndex:1
  }
  let welcome = props.currentLanguage ==='ru'? 'Добро пожаловать' : 'Welcome';
  let to = props.currentLanguage ==='ru'? 'в' : 'to';
  let button1Text = props.currentLanguage ==='ru'?
    'Настроить микрофон':
    'Microphone settings';
  let button2Text = props.currentLanguage ==='ru'?
    'Выбрать песню'
    :'Сhoose a song';
  let button3Text =props.currentLanguage ==='ru'?
    'НАЧАТЬ'
    : "START";
  
  return(
    <div className={classes.startPageContainer}>
      <div style={bgShape}/>
      <div className={classes.startPageWrp}>
        <div className={classes.title}>
          <p>{welcome}</p>
          <p>{to}</p>
          <div>
            <img src={oraokeLogo} alt={'Logo'}/>
          </div>
        </div>
        <div className={classes.btnsWrp}>
          <NavLink to={'/settings-page'}>
            <Button btnText = {button1Text} btnNumber = '1'/>
          </NavLink>
          <NavLink to={'/song-choose-page'}>
          <Button btnText = {button2Text}
                  btnNumber = '2'/>
            </NavLink>
          <NavLink to={'/song-play-page'}>
            <Button btnText = {button3Text}
                    btnNumber = '3' currentSong = {props.currentSong} currentLanguage = {props.currentLanguage}/>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span onClick={()=>props.currentLanguageToggle('ru')}>рус</span>
          <span>|</span>
          <span onClick={()=>props.currentLanguageToggle('en')}>eng</span>
        </div>
      </div>
    </div>
  )
}


export  default StartPage