let container = document.querySelector(`.cards`);


for (let i = 0; i < albums.length; i++) {
    let album = albums[i]
    container.innerHTML +=
        `
    <div onclick="location.href='./html/album.html?i=${i}'" class="card">
        <img class="cardFon" src="${album.img}" alt="">
        <p>${album.title}</p>
    </div>
    `
}