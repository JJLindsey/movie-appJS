const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=1d38e702d55fa1d1d226c7136e24c15e&language=en-US&page=1'

const IMG_PATH = 'https://image.tmdb.corg/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=1d38e702d55fa1d1d226c7136e24c15e&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
// GET initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    console.log(data.results)
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