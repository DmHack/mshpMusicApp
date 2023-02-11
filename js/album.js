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
    <div>
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
        </div>
        <div class="musicInfo">
            <p>${track.title}</p>
            <p class="pAuthor">${track.author}</p>
        </div>
        <div>
            <p>${track.time}</p>
        </div>
    </div>
    `

    }
}

