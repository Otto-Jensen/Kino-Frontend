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


function fetchShowings() {

    const urlShowings =
        "http://localhost:8080/api/showings/movie/" + movieId;

    fetch(urlShowings)
        .then(response => response.json())
        .then(showings => {
            console.log(showings);

            displayShowing(showings);
        })
        .catch(error => console.log(error));
}


function displayShowing(showings) {

    const showingsDiv = document.getElementById("showings");

    const groupedShowings={};

    showings.forEach(showing=>{
        const dateTime = new Date(showing.dateTime);

        const date =dateTime.toLocaleDateString("da-DK");

        if(!groupedShowings[date]){
            groupedShowings[date]=[];
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

            const showingButton = document.createElement("button");
            showingButton.textContent = time;

            showingButton.addEventListener("click", function () {
                window.location.href = "seats.html?showingId=" + showing.showingId;
            });

            showingsDiv.appendChild(showingButton);
        });
    }
}

function fetchAvailableSeats(showingId) {

    const urlSeats =
        "http://localhost:8080/api/showings/" + showingId + "/available-seats";

    fetch(urlSeats)
        .then(response => response.json())
        .then(seats => {
            console.log("Ledige sæder:", seats);
        })
        .catch(error => console.log(error));
}

fetchMovie();
fetchShowings();