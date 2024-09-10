/* ---------------------------------------------------------------- */
const main = document.getElementById('movie-container-home')
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const data = JSON.parse(localStorage.getItem('favorites')) || [];

if(data){
    showMovies(data);
}
function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, release_date, review} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('border-solid', 'border-black', 'border-2', 'text-center', 'bg-slate-50');
        movieEl.innerHTML = `
        <img id="movie-image" src="${IMG_URL+poster_path}" alt="${title}">
                <div class="p-4 border-t-2 border-black border-solid">
                    <h2 id="movie-title">${title}
                    </h2>
                    <p id="release-year" class="py-4">${release_date} 
                    </p>
                    <!-- Button To remove the saved movie -->
                    <button id="removeCard" class=" remove uppercase px-6 py-1 bg-red-500 hover:bg-red-800  border-black border-2 ">Remove</button>
                    <button id="add-Review" class=" addReview uppercase mt-2 px-6 py-1 bg-gray-400 hover:bg-gray-300  border-black border-2 ">Add review</button>
                    </div>`
                    main.appendChild(movieEl);

                    if (review) {
                        const reviewEl = document.createElement('p');
                        reviewEl.innerText = `Review: ${review}`;
                        reviewEl.classList.add('review-text', 'italic', 'text-gray-600');
                        movieEl.appendChild(reviewEl);
                    }

//Setting up a button to remove the saved movie
const removeButton = movieEl.querySelector('.remove');
removeButton .addEventListener('click',() => removeFromFavorites(movie));


//Setting up a button to add a review
const addReviewButton = movieEl.querySelector('.addReview');
addReviewButton.addEventListener('click', () => addReview(movie, movieEl)); // Pass movieEl as an argument

                    
    })
}


// Function to remove a movie from favorites
function removeFromFavorites(movieToRemove) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(movie => movie.title !== movieToRemove.title);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    location.reload();
}



// Function to handle adding a review
function addReview(movie, movieEl) { // Add movieEl as a parameter
    // Create an input field (textarea) for adding the review
    const reviewInput = document.createElement('textarea');
    reviewInput.placeholder = 'Write your review here...';
    reviewInput.classList.add('review-input', 'border', 'border-gray-500', 'w-full', 'p-2', 'my-2');
    
    // Create a button to submit the review
    const submitReviewButton = document.createElement('button');
    submitReviewButton.innerText = 'Submit Review';
    submitReviewButton.classList.add('submit-review-button', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');

    // Append the input field and button to the movie element
    movieEl.appendChild(reviewInput);
    movieEl.appendChild(submitReviewButton);

    // Event listener for submitting the review
    submitReviewButton.addEventListener('click', () => {
        const review = reviewInput.value;
        if (review) {
            // Update the movie object with the review
            movie.review = review;

            // Get the current favorites from local storage
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            // Find the movie in the local storage array and update it
            const updatedFavorites = favorites.map(favMovie => {
                if (favMovie.title === movie.title) {
                    return { ...favMovie, review: movie.review }; // Update the review
                }
                return favMovie;
            });

            // Save the updated favorites array back to local storage
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

            // Display the review on the page
            const reviewEl = document.createElement('p');
            reviewEl.innerText = `Review: ${movie.review}`;
            reviewEl.classList.add('review-text', 'italic', 'text-gray-600');
            movieEl.appendChild(reviewEl);

            // Clear the input field and remove the submit button
            reviewInput.remove();
            submitReviewButton.remove();
        }
    });
}

// Get header form and input HTML elements
const searchForm = document.getElementById("header-form");
const searchInput = document.getElementById("header-form-input");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the search term from the input field
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Retrieve the favorites from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filter the favorites list based on the search term
    if (searchTerm) {
        const filteredMovies = favorites.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        
        if (filteredMovies.length > 0) {
            // Show the filtered movies
            showMovies(filteredMovies);
        } else {
            // If no movies are found, show an alert
            alert("We couldn't find that title in your favorites!");
        }
    } else {
        // If no search term is provided, display all favorites
        showMovies(favorites);
    }
});
