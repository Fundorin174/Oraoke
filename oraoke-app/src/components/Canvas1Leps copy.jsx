import React, { useEffect, useState } from "react";
import classes from "./stylesheet/SongPlayPageContainer.module.scss";
import { Buffer, Sound } from "../redux/bufer";

const Canvas1Leps = React.memo((props) => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const canvasWrp = document.getElementById("canvasWrp");
    const textWrp = document.getElementById("textWrp");
    let moveTextToLeft, canvasWidth, canvasHeigth;
    // props.getSound(props.song.srcToSong)

    let context = new AudioContext(); //создание аудиоконтекста WEB Audio API
    let buffer = new Buffer(context, [props.song.srcToSong]); //создпние нового буфера из конструктора
    buffer.loadAll(); //загрузить песню в буфер

    // Задание размеров поля canvas исходя из длительности песни и скорости
    // прокрутки. По умолчанию скорость 50px в секунду, длительность 300 сек.
    const setCanvasSize = (speed = 50, songDuration = 300) => {
      canvas.width = canvas.offsetWidth; //Чтобы изображение не растягивалось
      canvas.height = canvas.offsetHeight; //Чтобы изображение не растягивалось
      canvasWidth = canvasWrp.clientWidth * 2 + speed * songDuration;
      console.log(`длина песни ${songDuration}, скорость ${speed}`);
      canvasHeigth = canvasWrp.clientHeight - 80;
      moveTextToLeft = canvasWrp.clientWidth / 2;
      canvas.style.width = `${canvasWidth}px`; //Задаем ширину планшета исходя из доительности песни
      console.log(canvasWidth);
      textWrp.style.width = `${canvasWidth}px`; //Задаем длину поля текста песни равную длине планшета
      canvas.style.height = `${canvasHeigth}px`; //Задаем высоиу планшета по родителю
    };
    setCanvasSize();

    //пересчет размеров поля canvas при изменении размеров окна браузера
    window.addEventListener("resize", setCanvasSize);

    //запуск проигрывания песни
    const playSongStart = () => {
      let sound = new Sound(context, buffer.getSoundByIndex("0")); //создать новую песню
      let songDuration = Math.round(sound.buffer.duration); //длительность  песни в секундах
      console.log(songDuration);
      setCanvasSize(props.song.playbackSpeed, songDuration); //установить длину canvas исходя из длительности песни и скорости движения поля для этой песни.
      props.transferSoundFromBufferToState(sound); //передать песню из буфера в стейт
      paintingCanvasField(canvasWidth, canvasHeigth); //нарисовать все препятствия
      sound.play(); //начать проигрывание
      moveCanvasAndTextToLeft(50); //начать движение поля и текста (скорость px/с)
    };

    const autoPlaySong = setTimeout(playSongStart, 4000); //запуск проигрывания песни через 4 секунды после загрузки-костыль! Реализовать через Promise

    //движение текста влево
    const moveCanvasAndTextToLeft = (speed) => {
      let canvasWidth = document
        .getElementById("canvas")
        .style.width.slice(0, -2); //получение ширины поля canvas в px
      let movingTextToLeft = setTimeout(function move() {
        if (Math.abs(moveTextToLeft) < canvasWidth) {
          moveTextToLeft -= 3;
          textWrp.style.marginLeft = `${moveTextToLeft}px`; //Это сдвиг текста
          if (moveTextToLeft <= 20) {
            canvas.style.left = `${moveTextToLeft}px`;
          }
          movingTextToLeft = setTimeout(move, 1000 / speed); //speed -это скорость движения px/c
        }
      }, 1000 / speed); //20 -это скорость движения 150px/c
      //остановка при нажатии "Стоп"
      document.getElementById("btnWrp").addEventListener("click", () => {
        stopMovingTextAndCanvas(movingTextToLeft);
      });

      //Остановка при нажатии на "Глваное меню"
      document.getElementById("mainMenu").addEventListener("click", () => {
        stopMovingTextAndCanvas(movingTextToLeft);
        window.removeEventListener("resize", setCanvasSize);
      });
    };

    return () => {
      clearTimeout(autoPlaySong);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // отрисовка canvas
  const paintingCanvasField = (canvasWidth, canvasHeigth) => {
    let canvas = document.getElementById("canvas");
    console.log(canvasWidth);
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    const paintRect = (
      x1,
      y1,
      x2,
      y2,
      fillColor = "rgba(135, 0, 250, 0.8)",
      strokeColor = "rgba(255, 29, 190, 0.8)"
    ) => {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1, y2);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y1);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    for (let x = 0; x < canvasWidth; x += 100) {
      paintRect(x, 0, x + 50, canvasHeigth / 3);
      paintRect(
        50 + x,
        canvasHeigth - canvasHeigth / 3,
        50 + x + 50,
        canvasHeigth + 9
      );
    }
  };

  const stopMovingTextAndCanvas = (movingTextToLeft) => {
    const textWrp = document.getElementById("textWrp");
    const canvas = document.getElementById("canvas");
    //Остановка движения текста
    clearTimeout(movingTextToLeft);
    //Установка текста в начальное положение
    textWrp.style.marginLeft =
      textWrp &&
      document.getElementById("canvasWrp") &&
      `${document.getElementById("canvasWrp").clientWidth / 2}px`;
    //Установка поля в начальное положение
    canvas.style.left = canvas && "20px";
  };

  return (
    <div id="canvasWrp" className={classes.canvasWrp}>
      <canvas id="canvas" className={classes.canvas}></canvas>
      <div id="textWrp" className={classes.textWrp}>
        <pre>{props.song.songText}</pre>
      </div>
      <div className={classes.song}>
        <span></span>
      </div>
    </div>
  );
});

export default Canvas1Leps;
