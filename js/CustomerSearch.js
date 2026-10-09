// Funktion der kaldes når brugeren søger
function searchCustomer() {
    const searchInput = document.getElementById("customerSearchInput").value;

    fetch(`http://localhost:8080/api/customers/search?name=${encodeURIComponent(searchInput)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fejl ved hentning af kunde");
            }
            return response.json();
        })
        .then(customers => {
            console.log("Kunder fundet:", customers);
            displayCustomers(customers);
        })
        .catch(error => {
            console.error("Fejl:", error);
        });
}

// Funktion til at vise resultaterne på HTML-siden
function displayCustomers(customers) {
    const resultDiv = document.getElementById("searchResults");
    resultDiv.innerHTML = ""; // Tøm tidligere søgeresultater

    if (customers.length === 0) {
        resultDiv.innerHTML = "<p>Ingen kunder fundet</p>";
        return;
    }

    customers.forEach(customer => {
        const customerElement = document.createElement("div");
        customerElement.innerHTML = `
            <h3>${customer.name}</h3>
            <p>Email: ${customer.email}</p>
            <p>Tlf: ${customer.phoneNumber || 'Ikke angivet'}</p>
            <hr>
        `;
        resultDiv.appendChild(customerElement);
    });
}

// Sørg for at søgeknappen og Enter-tasten lytter efter klik/tryk
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("customerSearchInput");

    if (searchBtn) {
        searchBtn.addEventListener("click", searchCustomer);
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchCustomer();
            }
        });
    }
});