console.log("create-movie er loaded");

const form = document.getElementById("create-movie-form")

form.addEventListener("submit", function(event){
    event.preventDefault();

    const movie = {
        name:document.getElementById("name").value,
        genre:document.getElementById("genre").value,
        description:document.getElementById("description").value,
        ageLimit:Number(document.getElementById("ageLimit").value)
    };

    fetch("http://localhost:8080/api/movies",{
        method:"POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(movie)
    })
        .then(response =>{
            if(!response.ok){
                throw new Error ("Couldn't create");
            }
            return response.json();
        })
        .then (savedMovie =>{
            console.log(savedMovie);

            window.location.href = "employee-movie.html?id=" + savedMovie.movieId;
        })
        .catch(error =>console.log(error));
});


