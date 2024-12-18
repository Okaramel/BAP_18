async function getMails() {
    try {
        const response = await fetch("http://localhost:3000/mail", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const emails = await response.json();
        displayEmails(emails);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des emails:",
            error
        );
    }
}

// fonction pour afficher les étiquettes dans le DOM
function displayEmails(emails) {
    const container = document.getElementById("card_email");
    container.innerHTML = "";
    emails.forEach((mail) => {
        const item = document.createElement("div");
        item.classList.add("etiquette-item");
        item.innerHTML = `
            <div class="details-btn">${mail.email}</div>
            <div class="action-btn">
                
                <svg class="remove-btn" data-id="${mail.id}"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed">
                    <path d="M200-440v-80h560v80H200Z" />
                </svg>
            </div>
        `;
        container.appendChild(item);
    });

    // ajouter les écouteurs d'événements pour l'édition et la suppression

    document
        .querySelectorAll(".email-item .remove-btn")
        .forEach((button) => {
            button.addEventListener("click", (event) => {
                emailIdToDelete = event.target
                    .closest(".remove-btn")
                    .getAttribute("data-id");
                overlayDelete.style.display = "flex";
            });
        });
}
getMails()