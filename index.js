//TMDB, URL requests

const API_KEY = 'api_key=e13239c36d67aaae5fd854a738bd27ed';
//const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//Function to get popular movies data
const main = document.getElementById('movie-container-home')
getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    })
}

//Function to show popular movies data
function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('border-solid', 'border-black', 'border-2', 'text-center', 'bg-slate-50');
        movieEl.innerHTML = `
        <img id="movie-image" src="${IMG_URL+poster_path}" alt="${title}">
                <div class="p-4 border-t-2 border-black border-solid">
                    <h2 id="movie-title">${title}
                    </h2>
                    <p id="release-year" class="py-4">${release_date} 
                    </p>
                    <!-- Button To Add Movies To Local Storage: Local Storage Is Displayed on Journal Page -->
                    <button id="add-journal-button" class="uppercase px-6 py-1 border-black border-2 add-to-favorites">Add to favorites</button>
                    </div>`
                    main.appendChild(movieEl);
//Setting up a button "Add to favorites" to add a movie to favorites
const addToFavoritesButton = movieEl.querySelector('.add-to-favorites');
addToFavoritesButton.addEventListener('click',() => addToFavorites(movie));
                    
    })
}

//Add the movie in localStorage
function addToFavorites(movie){
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
//Alert shows that movie added to localStorage
alert (`${movie.title} has been added to favorites`);

}