console.log("employee.js er loaded");

const urlMovies="http://localhost:8080/api/movies";

function fetchMovies(){
    fetch(urlMovies)
        .then(response=>response.json())
        .then(movies=>{
            console.log(movies);
            displayMovies(movies);
        })
        .catch(error => console.log(error));
}

    function displayMovies(movies) {

        const movieContainer = document.getElementById("movie-container");

        movieContainer.innerHTML = "";

        movies.forEach(movie => {

            const movieDiv = document.createElement("div");
            movieDiv.className = "movie";

            const title = document.createElement("h3");
            title.textContent = movie.name;

            const genre = document.createElement("p");
            genre.textContent = "Genre: " + movie.genre;

            const ageLimit = document.createElement("p");
            ageLimit.textContent = "Age rating: " + movie.ageLimit;

            const editButton = document.createElement("button");
            editButton.textContent = "Manage Movie";

            editButton.addEventListener("click", function () {
                window.location.href = "employee-movie.html?id=" + movie.movieId;
            });

            movieDiv.appendChild(title);
            movieDiv.appendChild(genre);
            movieDiv.appendChild(ageLimit);
            movieDiv.appendChild(editButton);

            movieContainer.appendChild(movieDiv);
        });
    }

    const createMovieButton = document.getElementById("create-movie-button");
    createMovieButton.addEventListener("click", function(){
        window.location.href="create-movie.html";
})

fetchMovies();
