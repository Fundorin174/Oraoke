import React, { useEffect, useState } from "react";
import SongPlayPage from "./SongPlayPage";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getMaxUserVoiceLevel,
  getIsSetMaxUserVoiceLevel,
  getAdv,
} from "../redux/settingsPageSelectors";
import {
  getcurrentSongSelector,
  getSongsSelector,
  getIsStopBtnPushed,
} from "../redux/startPageSelectors";
import { isPlayingSet, stopBtnIsPushSet } from "./../redux/startPageReduser";

const SongPlayPageContainer = React.memo((props) => {
  let [isCurrentSongPlaying, isCurrentSongPlayingSet] = useState(false);
  useEffect(() => {
    setCanvasHeigth(); //изменение высоты canvas по родителю

    //пересчет размеров поля canvas при изменении размеров окна браузера
    window.addEventListener("resize", setCanvasHeigth);

    //Отрисовка всего поля canvas
    paintingCanvasField();

    //Запуск проигрывания файла через 4 секунды
    const autoPlaySong =
      !isCurrentSongPlaying && setTimeout(startSigningAndMoving, 4000);

    //component DidUnmount()
    return () => {
      window.removeEventListener("resize", setCanvasHeigth);
      clearTimeout(autoPlaySong);
    };
  }, [props.isStopBtnPushed, isCurrentSongPlaying]);

  // /////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////
  // изменение высоты canvas
  const setCanvasHeigth = () => {
    const canvas = document.getElementById("canvas");
    const canvasWrp = document.getElementById("canvasWrp");

    //устанавливаем высоту планшета на 80 px меньше родителя (80 для текста)
    let canvasHeigth = canvasWrp.clientHeight - 80;
    canvas.style.height = `${canvasHeigth}px`;
  };
  // //////////////////////////////////////////////////////////////////////////
  // Запуск фоновой песни
  const playSongStart = () => {
    const audio = document.getElementById("audioMP3");
    !audio.playing && audio.play();
    isCurrentSongPlayingSet(true);
  };
  // //////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни и отправка к началу
  const playSongStop = () => {
    const audio = document.getElementById("audioMP3");
    audio.pause();
    audio.currentTime = 0;
    isCurrentSongPlayingSet(false);
  };

  // //////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни на текущем месте
  const playSongPause = () => {
    const audio = document.getElementById("audioMP3");
    audio.pause();
    isCurrentSongPlayingSet(false);
  };
  // ///////////////////////////////////////////////////////////////////////////
  // //// Пауза на текущем месте при нажатии клавиш "Space" (служебная функция без
  // remoove)

  let playPauseOnSpaseBtn = (event) => {
    console.log(isCurrentSongPlaying);
    if (event.code === "Space" && isCurrentSongPlaying) {
      pauseSigningAndMoving();
    } else if (event.code === "Space" && !isCurrentSongPlaying) {
      startSigningAndMoving();
    }
  };

  document.addEventListener("keyup", playPauseOnSpaseBtn);
  // /////////////////////////////////////////////////////////////////////////////
  // рисование прямоугольника
  const paintRect = (
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (вверху)
    x2, //конечная x (справа)
    y2, //конечная y (внизу)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
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

  const paintTriangle = (
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (вверху)
    x2, //x вершины
    y2, //y  вершины
    x3, //конечная x (справа)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)"
  ) => {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  //////////////////////////////////////////////////////////////////////////////
  const paintingCanvasField = () => {
    let canvas = document.getElementById("canvas");
    let canvasWidth = canvas.width; //ширина
    let canvasHeigth = canvas.offsetHeight; //высота
    canvas.height = canvas.offsetHeight; //Чтобы изображение не растягивалось
    const ctx = canvas.getContext("2d");

    //рисование
    for (let x = 0; x < canvasWidth; x += 100) {
      paintRect(ctx, x, 0, x + 50, canvasHeigth / 3);
      paintTriangle(
        ctx,
        50 + x,
        canvasHeigth + 9,
        50 + x + 25,
        canvasHeigth - canvasHeigth / 3,
        50 + x + 50
      );
    }
  };

  // /////////////////////////////////////////////////////////////////////////
  // движение поля влево (через санку получить стейт и в мидлваре обработать асинхронную функцию.)
  let timerId;
  let shiftTextToLeft = 100;

  function moveCanvasAndTextToLeft(speed) {
    let canvas = document.getElementById("canvas");
    let canvasWidth = canvas.width; //ширина
    let promise = new Promise((resolved, rejected) => {
      timerId = setTimeout(moveCanvasAndTextToLeft, 1000 / speed);
      shiftTextToLeft -= 1;
      console.log(shiftTextToLeft);
      const textWrp = document.getElementById("textWrp");
      if (Math.abs(shiftTextToLeft) < canvasWidth) {
        textWrp.style.marginLeft = `${shiftTextToLeft}px`; //Это сдвиг текста
        if (shiftTextToLeft <= 20) {
          canvas.style.left = `${shiftTextToLeft}px`; //Это сдвиг поля
        }
      }
      if (props.isStopBtnPushed || Math.abs(shiftTextToLeft) > canvasWidth) {
        stopSigningAndMoving();
      }
      return resolved(timerId);
    });
  }
  function clearTimer() {
    clearTimeout(timerId);
    console.log("Таймер остановлен");
  }

  // //////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  const stopSigningAndMoving = () => {
    playSongStop();
    clearTimer();
  };

  // //////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения на текущем моменте
  const pauseSigningAndMoving = () => {
    playSongPause();
  };

  // //////////////////////////////////////////////////////////////////////////
  // Запуск проигрывания и движения поля
  const startSigningAndMoving = () => {
    playSongStart();
    moveCanvasAndTextToLeft(props.currentSong.playbackSpeed);
  };

  // ////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <SongPlayPage
        stopSigningAndMoving={stopSigningAndMoving}
        startSigningAndMoving={startSigningAndMoving}
        isCurrentSongPlaying={isCurrentSongPlaying}
        {...props}
      />
    </div>
  );
});

let mapStateToProps = (state) => ({
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  currentSong: getcurrentSongSelector(state),
  songs: getSongsSelector(state),
  adv7: getAdv(state, 7),
  adv8: getAdv(state, 8),
  isStopBtnPushed: getIsStopBtnPushed(state),
});

export default compose(
  connect(mapStateToProps, { stopBtnIsPushSet, isPlayingSet })
)(SongPlayPageContainer);
