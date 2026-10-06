console.log("movie.js loeaded")

const params = new URLSearchParams(window.location.search);
const movieId=params.get("id");

const urlMovie ="http://localhost:8080/api/movies/" + movieId;

function fetchMovie(){

    fetch(urlMovie)
        .then(response=>response.json())
        .then(movie=>{
            console.log(movie);
            displayMovie(movie);
        })
        .catch(error => console.log(error));
}

function displayMovie(movie){

    const movieDetails =document.getElementById("movie-details");

    const title = document.createElement("h1");
    title.textContent = movie.name;

    const genre = document.createElement("p");
    genre.textContent = "Genre: " + movie.genre;

    const ageLimit = document.createElement("p");
    ageLimit.textContent = "Age rating: " + movie.ageLimit;

    const description = document.createElement("p");
    description.textContent = movie.description;

    movieDetails.appendChild(title);
    movieDetails.appendChild(genre);
    movieDetails.appendChild(ageLimit);
    movieDetails.appendChild(description);
}

fetchMovie();
