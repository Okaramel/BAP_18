document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/tag";
    const editForm = document.getElementById("tag-form");
    const overlay = document.querySelector(".overlay-tag");
    const popupTitle = document.getElementById("popup-title");
    const formNameInput = document.querySelector("#tag-form #name");
    const formDescriptionInput = document.querySelector(
        "#tag-form #description"
    );
    const submitBtn = document.getElementById("submit-btn");
    const overlayDelete = document.querySelector(".overlay-delete");
    const confirmDeleteBtn = document.querySelector(".popup-delete .yes");
    const cancelDeleteBtn = document.querySelector(".popup-delete .no");
    let tagIdToDelete = null;

    // fonction pour récupérer tous les tags
    async function getTags() {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const tags = await response.json();
            displayTags(tags);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags:", error);
        }
    }

    // fonction pour afficher les tags dans le DOM
    function displayTags(tags) {
        const container = document.querySelector(".tag-card");
        container.innerHTML = "";
        tags.forEach((tag) => {
            const item = document.createElement("div");
            item.classList.add("tag-item");
            item.innerHTML = `
                <div class="details-btn">${tag.name}</div>
                <div class="action-btn">
                    <svg class="edit-btn" data-id="${tag.id}"
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
                    <svg class="remove-btn" data-id="${tag.id}"
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
        document.querySelectorAll(".tag-item .edit-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                if (id && id !== "null") {
                    fetchTagForEditing(id);
                } else {
                    console.error("ID du tag non trouvé ou invalide");
                }
            });
        });

        document.querySelectorAll(".tag-item .remove-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                tagIdToDelete = event.target.getAttribute("data-id");
                if (tagIdToDelete && tagIdToDelete !== "null") {
                    overlayDelete.style.display = "flex";
                } else {
                    console.error("ID du tag non trouvé ou invalide");
                }
            });
        });
    }

    // fonction pour récupérer un tag pour la modification
    async function fetchTagForEditing(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const tag = await response.json();
            showEditForm(tag);
        } catch (error) {
            console.error("Erreur lors de la récupération du tag:", error);
        }
    }

    // affiche le formulaire avec les données existantes du tag
    function showEditForm(tag) {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Modifier le tag";

        formNameInput.value = tag.name;
        formDescriptionInput.value = tag.description;
        submitBtn.textContent = "Modifier";

        editForm.setAttribute("data-action", "update");
        editForm.setAttribute("data-id", tag.id);
    }

    // soumettre le formulaire pour modifier un tag
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);

        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
        };

        const tagId = editForm.getAttribute("data-id");

        if (editForm.getAttribute("data-action") === "update") {
            try {
                const response = await fetch(`${apiUrl}/${tagId}`, {
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

                const updatedTag = await response.json();
                if (response.ok) {
                    getTags(); // rafraîchir la liste des tags
                    overlay.style.display = "none"; // ferme le formulaire
                } else {
                    console.error(
                        "Erreur lors de la mise à jour du tag:",
                        updatedTag
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la requête:", error);
            }
        }
    });

    // fonction pour supprimer un tag
    async function deleteTag(id) {
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

            const deletedTag = await response.json();
            getTags(); // rafraîchir la liste des tags
            overlayDelete.style.display = "none";
        } catch (error) {
            console.error("Erreur lors de la suppression du tag:", error);
        }
    }

    // gérer la confirmation de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (tagIdToDelete) {
            deleteTag(tagIdToDelete);
            overlayDelete.style.display = "none";
            tagIdToDelete = null;
        }
    });

    // gérer l'annulation de la suppression
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

    // charger les tags au chargement de la page
    getTags();
});
