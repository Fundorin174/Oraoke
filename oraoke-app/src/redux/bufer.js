// import {print} from "./startPageReduser";

export class Buffer {

    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
    }

    loadSound(url, index) {
        let request = new XMLHttpRequest();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        let thisBuffer = this;
        request.onload = function () {
            thisBuffer
                .context
                .decodeAudioData(request.response, function (buffer) {
                    thisBuffer.buffer[index] = buffer;
                    if (index == thisBuffer.urls.length - 1) {
                        thisBuffer.loaded();
                    }
                });
        };
        request.send();
    };

    loadAll() {
        this
            .urls
            .forEach((url, index) => {
                let request = new XMLHttpRequest();
                request.open('get', url, true);
                request.responseType = 'arraybuffer';
                let thisBuffer = this;
                request.onload = function () {
                    thisBuffer
                        .context
                        .decodeAudioData(request.response, function (buffer) {
                            thisBuffer.buffer[index] = buffer;
                            if (index == thisBuffer.urls.length - 1) {
                                thisBuffer.loaded();                                            
                                // print(sound);
                            }
                        });
                }
                request.send();
            })
            
    }

    loaded() {
        // Здесь сделать предлоадер загрузки песен
        document
            .getElementById('btnWrp')
            .style
            .opacity = 1; //появление кнопки "СТОП"
        //задать отсюда изменение стейта
   //this.autoPlay()
            
    }

    // autoPlay() {
    //     let sound = new Sound(this.context, this.getSoundByIndex('0')); //создать новую песню
    //     sound.play(); //начать проигрывание
    // }

    getSoundByIndex(index) {
        return this.buffer[index];
    }

}

export class Sound {

    constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
    }

    setup() {
        this.gainNode = this
            .context
            .createGain(); //создание усилительного узла
        this.source = this
            .context
            .createBufferSource(); //привязка мелодии из буфера как источника звука
        this.source.buffer = this.buffer; //передача в источник содержимого буфера
        this
            .source
            .connect(this.gainNode); //подключение цепочки источник-усилитель
        this
            .gainNode
            .connect(this.context.destination); //дальнейшее подключение цепочки усилитель-колонки
        this
            .gainNode
            .gain
            .setValueAtTime(0.8, this.context.currentTime); //усиление/ослабление исходного звука
    }

    init() {
        this.gainNode = this
            .context
            .createGain(); //то же что и setup, но без усиления
        this.source = this
            .context
            .createBufferSource();
        this.source.buffer = this.buffer;
        this
            .source
            .connect(this.gainNode);
        this
            .gainNode
            .connect(this.context.destination);
    }

    play() {
        this.setup();
        this
            .source
            .start(this.context.currentTime);
        // this.source.start(this.context.currentTime); this.source.start(x,y,z); x-
        // задержка, y-сдвиг от начала, z-время окончания
    }

    stop() {
        this
            .gainNode
            .gain
            .exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this
            .source
            .stop(this.context.currentTime + 0.5);
    }

}
