const confirmDeleteBtn = document.querySelector(".overlay-delete .yes");
const cancelDeleteBtn = document.querySelector(".overlay-delete .no");
const overlayDelete = document.querySelector(".overlay-delete");
let emailIdToDelete = null;

//on va chercher depuis MailController tous les emails
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
        console.error("Erreur lors de la récupération des emails:", error);
    }
}

// fonction pour afficher les étiquettes dans le DOM
function displayEmails(emails) {
    const container = document.getElementById("card_email");
    container.innerHTML = "";
    emails.forEach((mail) => {
        const item = document.createElement("div");
        item.classList.add("email-item");
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

    // fonction de suppression
    async function deleteMail(id) {
        try {
            const response = await fetch(`http://localhost:3000/mail/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    }

    // ajouter les écouteurs d'événements pour l'édition et la suppression

    document.querySelectorAll(".email-item .remove-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            emailIdToDelete = event.target
                .closest(".remove-btn")
                .getAttribute("data-id");
            overlayDelete.style.display = "flex";
        });
    });
    // gestion des événements de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (emailIdToDelete) {
            deleteMail(emailIdToDelete);
            overlayDelete.style.display = "none";
        }
    });

    cancelDeleteBtn.addEventListener("click", () => {
        overlayDelete.style.display = "none";
        emailIdToDelete = null;
    });
}
getMails();
