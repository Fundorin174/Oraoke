import React, {useEffect, useState} from 'react';
import classes from './stylesheet/SongPlayPageContainer.module.scss'
import {Buffer, Sound} from '../redux/bufer';


const Canvas1Leps = React.memo((props) => {

    
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const textWrp = document.getElementById('textWrp');
        let moveTextToLeft;
        // props.getSound(props.song.srcToSong)
       
        let context = new AudioContext(); //создание аудиоконтекста WEB Audio API
        let buffer = new Buffer(context, [props.song.srcToSong]); //создпние нового буфера из конструктора
        buffer.loadAll(); //загрузить песню в буфер
        // setTimeout(() => { buffer.autoPlay()}, 3000)
        //Задание размеров поля canvas исходя из длительности песни
        const setCanvasSize = () => {
            const canvas = document.getElementById('canvas');
            const canvasWrp = document.getElementById('canvasWrp');
            const textWrp = document.getElementById('textWrp');
            let canvasWidth = canvasWrp.clientWidth * 4;
            let canvasHeigth = canvasWrp.clientHeight - 80;
            moveTextToLeft = canvasWrp.clientWidth / 2;
            canvas.style.width = `${canvasWidth}px`; //Задаем ширину планшета исходя из доительности песни
            textWrp.style.width = `${canvasWidth}px`; //Задаем длину поля текста песни равную длине планшета
            canvas.style.height = `${canvasHeigth}px`; //Задаем высоиу планшета по родителю
        }
        setCanvasSize();

        //пересчет размеров поля canvas при изменении размеров окна браузера
        window.addEventListener("resize", () => {
            setCanvasSize()
        })

        
        //запуск проигрывания песни
        let playSongStart = () => {
            let sound = new Sound(context, buffer.getSoundByIndex('0')); //создать новую песню
            sound.play(); //начать проигрывание
            props.transferSoundFromBufferToState(sound); //передать песню из буфера в стейт
        }

        let autoPlaySong = setTimeout(playSongStart, 4000); //запуск проигрывания песни через 5 секунд после загрузки

        textWrp.style.marginLeft = `${moveTextToLeft}px`; //Это сдвиг текста//  console.log(moveTextToLeft); console.log(canvasHeigth);
        const ctx = canvas.getContext("2d");

        return (() => {
            clearTimeout(autoPlaySong);
            window.removeEventListener("resize", () => {
                setCanvasSize()
            })
        })
    }, [])
    return (
        <div id='canvasWrp' className={classes.canvasWrp}>
            <canvas id='canvas' className={classes.canvas}></canvas>
            <div id='textWrp' className={classes.textWrp}>
                <p>{props.song.songText}</p>
            </div>
            <div className={classes.song}>
                <audio id='audioMP3' className='audioMP3' src={props.song.srcToSong}></audio>
            </div>
        </div>
    )
})

export default Canvas1Leps
