// Journal Search functionality

// get header form and input html element and store both into variables
const searchForm = document.getElementById("header-form");
const searchInput = document.getElementById("header-form-input");
// the string submitted in the form is stored in the variable searchTerm so we can append it to the regular search
const searchTerm = searchForm.value;

// get the items from local storage
const favMovieItem = localStorage.getItem(searchTerm);


// manipulate DOM
// make sure to check if value exists, else do nothing
if (favMovieItem !== null) {
    // manipulate the DOM according to search result
} else {
    alert("We couldn't find that title in your movies!");
} 