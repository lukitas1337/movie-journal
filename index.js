// Index search functionality

// get header form and input html element and store both into variables
const searchForm = document.getElementById("header-form");
const searchInput = document.getElementById("header-form-input");
//we need to submit a new URL when search is used
const searchURL = '*regularURL*' + '/search/movie?'+'*API-KEY*'+'&query='

// because we used a form both enter and button click should submit the search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

// the string submitted in the form is stored in the variable searchTerm so we can append it to the regular search
    const searchTerm = searchForm.value;
// if search term exists we add it to search url and use it, otherwise we perform regular search
    if (searchTerm) {
        '*fetchMovie*'(searchURL+searchTerm)
    } else {
    '*fetchMovie*'('*regularURL*');
    }
})