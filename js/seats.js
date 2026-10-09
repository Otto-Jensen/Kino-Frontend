console.log("seats.js loaded");

const params = new URLSearchParams(window.location.search);
const showingId = params.get("showingId");

console.log("Showing ID:", showingId);

const urlSeats =
    "http://localhost:8080/api/showings/" + showingId + "/available-seats";

function fetchAvailableSeats() {

    fetch(urlSeats)
        .then(response => response.json())
        .then(seats => {
            console.log("Available seats:", seats);

            displaySeats(seats);
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

function displaySeats(seats) {

    const seatsDiv = document.getElementById("seats");

    seats.forEach(seat => {

        const seatButton = document.createElement("button");

        seatButton.textContent =
            seat.cinemaRow + "-" + seat.seatNumber;

        seatsDiv.appendChild(seatButton);
    });
}

fetchAvailableSeats();