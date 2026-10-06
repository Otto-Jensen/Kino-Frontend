console.log("movies are loeaded");
const urlMovies = "http://localhost:8080/api/movies";
const movieContainer = document.getElementById("movie-container")

function fetchMovies(){
    fetch(urlMovies)
        .then(response=>response.json())
        .then(movies =>{
            movies.forEach(movie=>{
                displayMovie(movie);
            });
        })
        .catch(error=>console.log(error));
}
fetchMovies();

function displayMovie(movie){

    const movieDiv = document.createElement("div");
    movieDiv.className = "movie";

    const posterDiv = document.createElement("div");
    posterDiv.className ="movie-info";
    posterDiv.textContent="Movie-Poster";

    const infoDiv = document.createElement("div");
    infoDiv.className="movie-Info";

    const title = document.createElement("h3");
    title.textContent=movie.name

    const genre =document.createElement("p");
    genre.textContent="Genre: "+ movie.genre;

    const ageLimit = document.createElement("p");
    ageLimit.textContent="Age Limit: " + movie.ageLimit;

    infoDiv.appendChild(title);
    infoDiv.appendChild(genre);
    infoDiv.appendChild(ageLimit);

    const actionDiv = document.createElement("div");
    actionDiv.className = "movie-action";

    const button = document.createElement("button");
    button.textContent = "View Movie";

    actionDiv.appendChild(button);

    movieDiv.appendChild(posterDiv);
    movieDiv.appendChild(infoDiv);
    movieDiv.appendChild(actionDiv);

    movieContainer.appendChild(movieDiv)
}