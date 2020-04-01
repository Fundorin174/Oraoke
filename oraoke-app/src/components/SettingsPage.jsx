import React from 'react';
import oraokeLogo from './../img/ОраокеLogo.png';
import classes from './stylesheet/SettingsPageContainer.module.scss';
import Button from './common/Button';
import {NavLink} from 'react-router-dom';
import bgImgUrl from './../img/backgroundImg.webp'
import adv1 from './../img/advertisment/adv1SettingPage.png';
import adv2 from './../img/advertisment/adv2SettingPage.png';
import bird from './../img/BirdTransparentLeft.gif';
import {useEffect} from 'react';

const SettingsPage = (props) => {

    //Stiles for background picture
    const bgShape = {
        width: `100%`,
        height: `100%`,
        background: `center center no-repeat url(${bgImgUrl})`,
        backgroundSize: `cover`,
        position: `absolute`,
        zIndex: 1
    }

    //Statement of Button Start
    let onStartCheckingMicrophone = () => {
        props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
    }

    let buttonText = props.isCheckingMicrophoneStart
        ? 'СТОП'
        : 'СТАРТ';

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
                            {!props.isCheckingMicrophoneStart && <p>Нажмите на кнопку “Старт” и разрешите браузеру доступ к микрофону</p>}
                            {props.isCheckingMicrophoneStart && <p>Крикните в микрофон так, чтобы птичка поднялась в зеленую зону</p>}
                        </div>
                    </div>
                    <div
                        className={classes.btnsWrp}
                        onClick={() => {
                            onStartCheckingMicrophone()
                        }}>
                        <Button btnText={buttonText} btnNumber='1'/>
                    </div>
                </div>
                {/* Table and bird */}
                <div className={classes.column}>
                    <div className={classes.voiceLevelTable}>
                        <div className={classes.linesTable} id='linesTable'>
                            {/* Тут будут дивы из UseEffecta */}
                        </div>
                        <div className={classes.birdMainWrp}>
                            <div className={classes.birdWrp}>
                                <img src={bird} alt="bird"/>
                            </div>
                        </div>
                    </div>
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

export default SettingsPage