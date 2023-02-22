let container = document.querySelector(`.card`);
let listGroup = document.querySelector(`.listGroup`);

let search = new URLSearchParams(window.location.search);



let i = search.get(`i`);

let albumst = albums[i];

if (!albumst) {
    container.innerHTML += `<h1>Ошибка. Альбом не найден</h1>`
    setTimeout(() => {
        window.location.pathname = 'index.html';
    }, 2000)
} else {
    container.innerHTML += `
    <div>
    <img class="cardFon" src="${albumst.imgAlb}" alt="">
    </div>
    <div class="cardInfo">
    <div class="crdInf">
        <h1>${albumst.title}</h1>
        <p>${albumst.description}</p>
    </div>
    <div>
        <p class="pGodInfo">Сборник выпущен в ${albumst.year} году</p>
    </div>
    </div>
`

    for (let i = 0; i < albumst.tracks.length; i++) {
        let track = albumst.tracks[i];

        listGroup.innerHTML += `
        <div class="lstGpMs">
            <div>
                <img class="stMs" src="../assets/fon/msPl.png" alt="">
                <img class="stMs1" src="../assets/fon/stMs.png" alt="">
            </div>
            <div class="musicInfo">
                <div class="msinfprog">
                    <div class="infauthprog">
                        <p class="pTitle">${track.title}</p>
                        <p class="pAuthor">${track.author}</p>
                    </div>
                    <div>
                        <div class="progressCont">
                            <div id="progress" class="progress">

                            </div>
                        </div>  
                    </div>
                </div>              
            </div>
            <div>
                <p class="pTime">${track.time}</p>
                <audio class="audio" src='${track.src}'></audio>
            </div>
        </div>
        `

    }
}


let button = document.querySelector(`.stMs`);
let stMs1 = document.querySelector(`.stMs1`);

function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.lstGpMs`);
    let tracks = albumst.tracks;
    for (let i = 0; i < trackNodes.length; i++) {
        // Один элемент
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.pTime`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);
        let progress = node.querySelector(`.progress`);
        let track = tracks[i];
        audio.ontimeupdate = function () {
            console.log(audio.currentTime * 100 / audio.duration + "%");
            progress.style.width = Math.floor(audio.currentTime * 100 / audio.duration) + "%";
        }
        // продолжи самостоятельно
        node.addEventListener(`click`, function (e) {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                node.classList.remove('actvMs');
                // Если трек сейчас не играет...
                let stMs1 = node.querySelector(`.stMs1`);
                stMs1.style.display = 'block'
                let stMs = node.querySelector(`.stMs`);
                stMs.style.display = 'none'

            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                node.classList.add('actvMs');
                let stMs1 = node.querySelector(`.stMs1`);
                stMs1.style.display = 'none'
                let stMs = node.querySelector(`.stMs`);
                stMs.style.display = 'block'
                updateProgress();
            }
        });

        function updateProgress() {
            // Нарисовать актуальное время
            if (getTime(audio.currentTime) != timeNode.innerHTML) {
                timeNode.innerHTML = getTime(audio.currentTime);
            }

            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                requestAnimationFrame(updateProgress);
            }

        }

    }
}
function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`
}

setupAudio();
