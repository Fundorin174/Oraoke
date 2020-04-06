import React from 'react';
import classes from './stylesheet/StartPageContainer.module.scss';
import oraokeLogo from './../img/ОраокеLogo.png';
import bgImgUrl from './../img/backgroundImg.webp'
import Button from "./common/Button";
import { NavLink } from 'react-router-dom';

const StartPage = (props) => {
  const bgShape = {
    width: `100%`,
    height: `100%`,
    background: `center center no-repeat url(${bgImgUrl})`,
    backgroundSize: `cover`,
    position:`absolute`,
    zIndex:1
  }

  return(
    <div className={classes.startPageContainer}>
      <div style={bgShape}></div>
      <div className={classes.startPageWrp}>
        <div className={classes.title}>
          <p>Добро пожаловать</p>
          <p>в</p>
          <div>
            <img src={oraokeLogo} alt={'Logo'}/>
          </div>
        </div>
        <div className={classes.btnsWrp}>
          <NavLink to={'/settings-page'}>
            <Button btnText = 'Настроить микрофон' btnNumber = '1'/>
          </NavLink>
          <NavLink to={'/song-choose-page'}>
          <Button btnText = 'Выбрать песню' btnNumber = '2'/>
            </NavLink>
          <Button btnText = 'НАЧАТЬ' btnNumber = '3' currentSong = {props.currentSong}/>
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


export  default StartPage