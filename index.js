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
        movieEl.classList.add('relative','border-2', 'border-gray-800', 'text-center', 'bg-gray-100', 'p-4', 'shadow-md', 'flex', 'flex-col');
        movieEl.innerHTML = `
        <img id="movie-image" class="w-full h-auto" src="${IMG_URL+poster_path}" alt="${title}">
                <div class="flex-grow p-4 border-t-2 border-gray-800 flex flex-col justify-between border-solid">
                    <h2 id="movie-title" class="text-xl font-semibold">${title}
                    </h2>
                    <p id="release-year" class="py-4 text-sm">${release_date}
                    </p>
                    <!-- Button To Add Movies To Local Storage: Local Storage Is Displayed on Journal Page -->
                    <div class="mt-auto">
                    <button id="add-journal-button" class="w-full uppercase px-6 py-2 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300 add-to-favorites">Add to favorites</button>
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

// get header form and input html element and store both into variables
const searchForm = document.getElementById("header-form");
const searchInput = document.getElementById("header-form-input");
//we need to submit a new URL when search is used
const searchURL = 'https://api.themoviedb.org/3'+'/search/movie?'+`${API_KEY}`+'&query='
// because we used a form both enter and button click should submit the search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

// the string submitted in the form is stored in the variable searchTerm so we can append it to the regular search
const searchTerm = searchInput.value.trim().toLowerCase();
// if search term exists we add it to search url and use it, otherwise we perform regular search
    if (searchTerm) {
        getMovies(searchURL+searchTerm)
    } else {
        getMovies(API_URL);
    }
})
