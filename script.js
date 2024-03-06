const inputSearch = document.getElementById('search');
const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener("click",async function (e) {
    loading();
    try {
        const keyword = inputSearch.value;
        const movies = await getMovie(keyword);
        const data = makeCard(movies);
        pushContent(data);
    } catch (error) {
        const data = `<div class="error">${error}</div>`
        pushContent(data)
    }
})

function getMovie(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=1bf53760&s="+keyword).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    }).then(response => {
        if (response.Response === "False") {
            throw new Error(response.Error)
        }
        return response.Search;
    })
}

function makeCard(movies) {
    let card = "";
    movies.forEach(movie => {
        card +=
        `<div class="card">
            <img src="${movie.Poster}">
            <p>${movie.Title}</p>
            <button>DETAIL</button>
        </div>`
    });
    return card;
}
function loading() {
    const data = `<div class="loading"></div>`;
    pushContent(data)
}
function pushContent(data) {
    const content = document.querySelector('main').innerHTML = data;
}