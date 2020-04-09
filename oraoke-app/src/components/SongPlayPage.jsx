import React from 'react';
import classes from './stylesheet/SongPlayPageContainer.module.scss'
import {bgShape} from './common/commonFunctions';
import {NavLink} from 'react-router-dom';
import oraokeLogo from "../img/ОраокеLogo.png";
import AdvertismentBlock from './common/AdvertismentBlock';
import Button from './common/Button';

const SongPlayPage = (props) => {
    return (
        <div className={classes.PageContainer}>
            <div style={bgShape}></div>
            <div className={classes.globalBacGround}></div>
            <div className={classes.PageWrp}>
                {/* left advertisment */}
                <div className={classes.column}>
                    <AdvertismentBlock adv={props.adv7}/>
                    <AdvertismentBlock adv={props.adv8}/>
                </div>
                <div className={classes.column}>
                    <div className={classes.title}>
                        <div>
                            <img src={oraokeLogo} alt={'Logo'}/>
                        </div>
                        <div>
                            <p>{props.currentSong.fullTitle}</p>
                        </div>
                    </div>
                    <div className={classes.canvasWrp}>
                      <canvas className = {classes.canvas}></canvas>
                      <div className = {classes.textWrp}><p>Текст песни</p></div>
                    </div>
                    <div className = {classes.btnWrp}>
                    <Button btnNumber='1' btnText='СТОП' />
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
}

export default SongPlayPage