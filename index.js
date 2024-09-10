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
                    <button id="add-journal-button" class="uppercase px-6 py-1 border-black border-2">Add to favorites</button>
                    </div>`

                    main.appendChild(movieEl);
    })

// get header form and input html element and store both into variables
const searchForm = document.getElementById("header-form");
const searchInput = document.getElementById("header-form-input");
//we need to submit a new URL when search is used
const searchURL = 'https://api.themoviedb.org/3'+'/search/movie?'+`${API_KEY}`+'&query='
// because we used a form both enter and button click should submit the search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

// the string submitted in the form is stored in the variable searchTerm so we can append it to the regular search
    const searchTerm = searchInput.value;
// if search term exists we add it to search url and use it, otherwise we perform regular search
    if (searchTerm) {
        getMovies(searchURL+searchTerm)
    } else {
        getMovies(API_URL);
    }
})}
