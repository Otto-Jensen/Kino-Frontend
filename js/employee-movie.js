console.log("employee-movie.js er loaded");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const urlMovie = "http://localhost:8080/api/movies/" + movieId;

function fetchMovie() {

    fetch(urlMovie)
        .then(response => response.json())
        .then(movie => {
            displayMovie(movie);
        })
        .catch(error => console.log(error));
}

function displayMovie(movie) {

    const movieDetails = document.getElementById("movie-details");

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

function fetchShowings() {

    const urlShowings =
        "http://localhost:8080/api/showings/movie/" + movieId;

    fetch(urlShowings)
        .then(response => response.json())
        .then(showings => {
            displayShowings(showings);
        })
        .catch(error => console.log(error));
}

function displayShowings(showings) {

    const showingsDiv = document.getElementById("showings");

    showingsDiv.innerHTML = "";

    const groupedShowings = {};

    showings.forEach(showing => {

        const dateTime = new Date(showing.dateTime);
        const date = dateTime.toLocaleDateString("da-DK");

        if (!groupedShowings[date]) {
            groupedShowings[date] = [];
        }

        groupedShowings[date].push(showing);
    });

    for (const date in groupedShowings) {

        const dateHeading = document.createElement("h3");
        dateHeading.textContent = date;

        showingsDiv.appendChild(dateHeading);

        groupedShowings[date].forEach(showing => {

            const dateTime = new Date(showing.dateTime);

            const time = dateTime.toLocaleTimeString("da-DK", {
                hour: "2-digit",
                minute: "2-digit"
            });

            const showingDiv = document.createElement("div");

            const showingTime = document.createElement("span");
            showingTime.textContent = time + " ";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {
                deleteShowing(showing.showingId)
            });

            showingDiv.appendChild(showingTime);
            showingDiv.appendChild(deleteButton);

            showingsDiv.appendChild(showingDiv);
        });
    }
}

function deleteShowing(showingId){
    fetch("http://localhost:8080/api/showings/" + showingId,{
        method: "DELETE"
    })
    .then(response=>{
        if(!response.ok){
            throw new Error("Could not delete showing");
        }

        fetchShowings();
    })
        .catch (error => console.log(error))
}

fetchMovie();
fetchShowings();