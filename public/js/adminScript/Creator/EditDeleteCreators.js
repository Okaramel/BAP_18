document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/creator";
    const editForm = document.getElementById("creator-form");
    const overlay = document.querySelector(".overlay-creator");
    const popupTitle = document.querySelector(".popup-creator #popup-title");
    const formNameInput = document.querySelector("#creator-form #name");
    const formEmailInput = document.querySelector("#creator-form #email");
    const formLinkedinInput = document.querySelector("#creator-form #linkedin");
    const formImageInput = document.querySelector("#creator-form #image");
    const submitBtn = document.getElementById("submit-btn");
    const overlayDelete = document.querySelector(".overlay-delete");
    const confirmDeleteBtn = document.querySelector(".popup-delete .yes");
    const cancelDeleteBtn = document.querySelector(".popup-delete .no");
    let tagIdToDelete = null;

    // Fonction pour récupérer toutes les étiquettes
    async function getCreators() {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const creators = await response.json();
            displayCreators(creators);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des createurs:",
                error
            );
        }
    }

    // Fonction pour afficher les étiquettes dans le DOM
    function displayCreators(creators) {
        const container = document.querySelector(".createur-card");
        container.innerHTML = ""; // Clear existing content
        creators.forEach((creator) => {
            const item = document.createElement("div");
            item.classList.add("creator-item");
            item.innerHTML = `
                <div class="details-btn">${creator.name}</div>
                <div class="action-btn">
                    <svg class="edit-btn" data-id="${creator.id}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#e8eaed"
                                >
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                                    />
                                </svg>
                    <svg class="remove-btn" data-id="${creator.id}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#e8eaed"
                                >
                                    <path d="M200-440v-80h560v80H200Z" />
                                </svg>
                </div>
            `;
            container.appendChild(item);
        });

        // Ajouter des écouteurs d'événements pour les boutons de modification et de suppression
        document
            .querySelectorAll(".creator-item .edit-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    const id = event.target.getAttribute("data-id");
                    fetchCreatorForEditing(id);
                });
            });

        document
            .querySelectorAll(".creator-item .remove-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    tagIdToDelete = event.target.getAttribute("data-id");
                    overlayDelete.style.display = "flex";
                });
            });
    }

    // Fonction pour récupérer une étiquette pour la modification
    async function fetchCreatorForEditing(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const creator = await response.json();
            showEditForm(creator);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'étiquette:",
                error
            );
        }
    }

    // Afficher le formulaire avec les données existantes de l'étiquette
    function showEditForm(creator) {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Modifier le créateur";

        formNameInput.value = creator.name;
        formEmailInput.value = creator.email;
        formLinkedinInput.value = creator.linkedin;
        formImageInput.value = creator.image;
        submitBtn.textContent = "Modifier";

        editForm.setAttribute("data-action", "update");
        editForm.setAttribute("data-id", creator.id);
    }

    // Soumettre le formulaire pour modifier une étiquette
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);

        const data = {
            image: formData.get("image"),
            name: formData.get("name"),
            email: formData.get("email"),
            linkedin: formData.get("linkedin"),
        };

        const creatorId = editForm.getAttribute("data-id");

        if (editForm.getAttribute("data-action") === "update") {
            try {
                const response = await fetch(`${apiUrl}/${creatorId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                const updatedCreator = await response.json();
                if (response.ok) {
                    getCreators(); // Rafraîchir la liste des étiquettes
                    location.reload();
                    overlay.style.display = "none"; // Fermer le formulaire
                } else {
                    console.error(
                        "Erreur lors de la mise à jour de créateur:",
                        updatedCreator
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la requête:", error);
            }
        }
    });

    // Fonction pour supprimer une étiquette
    async function deleteCreator(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const deletedCreator = await response.json();
            console.log("Étiquette supprimée:", deletedCreator);
            getCreators(); // Rafraîchir la liste des étiquettes
            location.reload();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de l'étiquette:",
                error
            );
        }
    }

    // Gérer la confirmation de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (tagIdToDelete) {
            deleteCreator(tagIdToDelete);
            overlayDelete.style.display = "none";
            tagIdToDelete = null;
        }
    });

    // Gérer l'annulation de la suppression
    cancelDeleteBtn.addEventListener("click", () => {
        overlayDelete.style.display = "none";
        tagIdToDelete = null;
    });

    // masquer le formulaire
    document
        .querySelector(".overlay-delete")
        .addEventListener("click", (event) => {
            if (event.target === document.querySelector(".overlay-delete")) {
                document.querySelector(".overlay-delete").style.display =
                    "none";
            }
        });

    // Charger les étiquettes au chargement de la page
    getCreators();
});
