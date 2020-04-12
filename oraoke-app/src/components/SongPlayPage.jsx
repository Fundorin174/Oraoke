import React, {useEffect} from 'react';
import classes from './stylesheet/SongPlayPageContainer.module.scss'
import {bgShape} from './common/commonFunctions';
import {NavLink} from 'react-router-dom';
import oraokeLogo from "../img/ОраокеLogo.png";
import AdvertismentBlock from './common/AdvertismentBlock';
import ButtonSmall from './common/ButtonSmall';
import Canvas1Leps from './Canvas1Leps';

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
                    <Canvas1Leps
                        song={props.currentSong}
                        transferSoundFromBufferToState={props.transferSoundFromBufferToState}
                        currentSoundFromBuffer={props.currentSoundFromBuffer}/>{/* Потом автоматизировать выбор песни */}
                    <div
                        onClick={() => {
                            props.stopSigning()
                        }}
                        className={classes.btnWrp}
                        id='btnWrp'>
                        <ButtonSmall btnNumber='1' btnText='СТОП'/>
                    </div>

                </div>

                <div  onClick={() => {
                  props.stopSigning()
                }} className={classes.toMainMenu}>
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