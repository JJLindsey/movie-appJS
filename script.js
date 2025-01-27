const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=1d38e702d55fa1d1d226c7136e24c15e&language=en-US&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=1d38e702d55fa1d1d226c7136e24c15e&query="'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const like = './assets/like.png'
const love = './assets/thumbs-up.png'
const dislike = './assets/dislike.png'
// GET initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        // const voteIconEl = document.createElement('div')
        // voteIconEl.classList.add('vote-icon')

        // const iconVote = dislike
        // if(vote_average >=8) {
        //     iconVote = love
        // } else if (vote_average >=5) {
        //     iconVote = like
        // }

        // voteIconEl.innerHTML = `<img src="${iconVote}" alt="rating icon" class=icon>`

        movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span>rating: ${vote_average.toFixed(1)}/10</span>
                </div>
                <div class="overview">
                    <h3>Details</h3>
                    ${overview}
                </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8){
        return love
    }else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value 
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})