document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/creator";
    const editForm = document.getElementById("creator-form");
    const overlay = document.querySelector(".overlay-creator");
    const popupTitle = document.querySelector(".popup-creator #popup-title");
    const formNameInput = document.querySelector("#creator-form #name");
    const formEmailInput = document.querySelector("#creator-form #email");
    const formLinkedinInput = document.querySelector("#creator-form #linkedin");
    const formImageInput = document.querySelector(
        "#creator-form #profile_picture"
    );
    const formImagePreview = document.querySelector(
        "#creator-form #profile_picture_preview"
    );
    const submitBtn = document.getElementById("submit-btn");
    const overlayDelete = document.querySelector(".overlay-delete");
    const confirmDeleteBtn = document.querySelector(".popup-delete .yes");
    const cancelDeleteBtn = document.querySelector(".popup-delete .no");
    let tagIdToDelete = null;

    // fonction pour récupérer toutes les étiquettes
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

    // fonction pour afficher les étiquettes dans le DOM
    function displayCreators(creators) {
        const container = document.querySelector(".createur-card");
        container.innerHTML = ""; // vide le conteneur avant d'ajouter les créateurs
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

        // ajoute des écouteurs d'événements pour les boutons de modification et de suppression
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

    // fonction pour récupérer un créateur pour la modification
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
            console.error("Erreur lors de la récupération du créateur:", error);
        }
    }

    // affiche le formulaire avec les données existantes du créateur
    function showEditForm(creator) {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Modifier le créateur";

        if (formNameInput) formNameInput.value = creator.name;
        if (formEmailInput) formEmailInput.value = creator.email;
        if (formLinkedinInput) formLinkedinInput.value = creator.linkedin;
        if (formImagePreview) formImagePreview.src = `/${creator.image}`;
        formImageInput.value = ""; // réinitialise le champ de type file
        submitBtn.textContent = "Modifier";

        editForm.setAttribute("data-action", "update");
        editForm.setAttribute("data-id", creator.id);
    }

    // soumettre le formulaire pour modifier un créateur
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const creatorId = editForm.getAttribute("data-id");

        if (editForm.getAttribute("data-action") === "update") {
            try {
                const response = await fetch(`${apiUrl}/${creatorId}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                location.reload();
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
            }
        }
    });

    // ferme le formulaire d'édition en cliquant en dehors du formulaire
    document
        .querySelector(".overlay-creator")
        .addEventListener("click", (event) => {
            if (event.target === document.querySelector(".overlay-creator")) {
                document.querySelector(".overlay-creator").style.display =
                    "none";
            }
        });

    // fonction pour supprimer un créateur
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
            getCreators(); // rafraîchie la liste des créateurs
            location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression du créateur:", error);
        }
    }

    // gére la confirmation de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (tagIdToDelete) {
            deleteCreator(tagIdToDelete);
            overlayDelete.style.display = "none";
            tagIdToDelete = null;
        }
    });

    // gére l'annulation de la suppression
    cancelDeleteBtn.addEventListener("click", () => {
        overlayDelete.style.display = "none";
        tagIdToDelete = null;
    });

    // masque le formulaire
    document
        .querySelector(".overlay-delete")
        .addEventListener("click", (event) => {
            if (event.target === document.querySelector(".overlay-delete")) {
                document.querySelector(".overlay-delete").style.display =
                    "none";
            }
        });

    // ccharge les créateurs au chargement de la page
    getCreators();
});
