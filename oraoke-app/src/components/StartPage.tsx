import React from "react";
import classes from "./stylesheet/StartPageContainer.module.scss";
import oraokeLogo from "./../img/ОраокеLogo.png";
import bgImgUrl from "./../img/backgroundImg.webp";
import Button from "./common/Button";
import { NavLink } from "react-router-dom";
import { StartPageConteinerPropsType } from "./StartPageContainer";

const StartPage: React.FC<StartPageConteinerPropsType> = React.memo((props) => {
  /////////////////////////////////////////////////////////
  //the background styles
  const bgShape = {
    // width: `100%`,
    // height: `100%`,
    minHeight: `100%`,
    minWidth: `100%`,
    background: `center center no-repeat url(${bgImgUrl})`,
    backgroundSize: `cover`,
    position: `absolute`,
    zIndex: 1,
  } as React.CSSProperties;
  let texts;
  /////////////////////////////////////////////////////////
  //texts in different languageS
  switch (props.currentLanguage) {
    case "ru":
      texts = {
        welcome: "Добро пожаловать",
        to: "в",
        button1Text: "Настроить микрофон",
        button2Text: "Выбрать песню",
        button3Text: "НАЧАТЬ",
      };
      break;
    case "en":
      texts = {
        welcome: "Welcome",
        to: "to",
        button1Text: "Microphone settings",
        button2Text: "Сhoose a song",
        button3Text: "START",
      };
      break;
    default:
      return null;
  }
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  return (
    <div className={classes.startPageContainer}>
      {/*background image*/}
      <div style={bgShape} />
      {/*main wrapper*/}
      <div className={classes.startPageWrp}>
        {/*header*/}
        <div className={classes.title}>
          <p>{texts.welcome}</p>
          <p>{texts.to}</p>
          <div>
            <img src={oraokeLogo} alt={"Logo"} />
          </div>
        </div>

        {/*buttons*/}
        <div className={classes.btnsWrp}>
          <NavLink to={"/settings-page"}>
            <Button btnText={texts.button1Text} btnNumber="1" />
          </NavLink>
          <NavLink to={"/song-choose-page"}>
            <Button btnText={texts.button2Text} btnNumber="2" />
          </NavLink>
          <NavLink to={"/song-play-page"}>
            <Button
              btnText={texts.button3Text}
              btnNumber="3"
              currentSong={props.currentSong}
              currentLanguage={props.currentLanguage}
            />
          </NavLink>
        </div>

        {/*language change menu*/}
        <div className={classes.langToggle}>
          <span onClick={() => props.currentLanguageToggle("ru")}>рус</span>
          <span>|</span>
          <span onClick={() => props.currentLanguageToggle("en")}>eng</span>
        </div>
      </div>
    </div>
  );
});

export default StartPage;
