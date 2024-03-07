const inputSearch = document.getElementById('search');
const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener("click", function (e) {
    searchMovie(e)
})

async function searchMovie (e) {
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
}

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
            <button data-id="${movie.imdbID}" class="button">DETAIL</button>
        </div>`
    });
    return card;
}
function loading() {
    const data = `<div class="loading"></div>`;
    pushContent(data)
}

document.addEventListener('click',async function(e) {
    if (e.target.classList.contains("button")) {
        loading()
        const id = e.target.dataset.id;
        const detail = await getMovieDetail(id);
        const data = makeDetail(detail);
        pushContent(data);
    }
})

function getMovieDetail(id) {
    return fetch("http://www.omdbapi.com/?apikey=1bf53760&i="+id).then(response => {
        return response.json()
    }).then(response => response)
}

function makeDetail(detail) {
    return `
    <div class="detail">
        <div class="content">
            <img src="${detail.Poster}">
            <ul>
                <li><strong>Title :</strong>${detail.Title}</li>
                <li><strong>Actors :</strong>${detail.Actors}</li>
                <li><strong>Genre :</strong>${detail.Genre}</li>
                <li><strong>Released :</strong>${detail.Released}</li>
                <li><strong>Director :</strong>${detail.Director}</li>
                <li><strong>Plot :</strong>${detail.Plot}</li>
            </ul>
        </div>
        <button class="btnBack">Back</button>
    </div>`
}

document.addEventListener('click',function (e) {
    if (e.target.classList.contains("btnBack")) {
        searchMovie(e)
    }
})

function pushContent(data) {
    const content = document.querySelector('main').innerHTML = data;
}