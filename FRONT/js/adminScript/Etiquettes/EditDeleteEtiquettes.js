document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/etiquette";
    const editForm = document.getElementById("etiquette-form");
    const overlay = document.querySelector(".overlay-etiquette");
    const popupTitle = document.getElementById("popup-title");
    const formTitleInput = document.getElementById("title");
    const formDescriptionInput = document.getElementById("description");
    const formCreatorSelect = document.getElementById("creator_form");
    const formCreatorSelect2 = document.getElementById("creator_form2");
    const formCreatorSelect3 = document.getElementById("creator_form3");
    const formTag1Select = document.getElementById("tag1");
    const formTag2Select = document.getElementById("tag2");
    const formTag3Select = document.getElementById("tag3");
    const submitBtn = document.getElementById("submit-btn");

    const overlayDelete = document.querySelector(".overlay-delete");
    const confirmDeleteBtn = document.querySelector(".popup-delete .yes");
    const cancelDeleteBtn = document.querySelector(".popup-delete .no");
    let tagIdToDelete = null;

    // fonction pour récupérer toutes les étiquettes
    async function getEtiquettes() {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const etiquettes = await response.json();
            displayEtiquettes(etiquettes);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des étiquettes:",
                error
            );
        }
    }

    // fonction pour afficher les étiquettes dans le DOM
    function displayEtiquettes(etiquettes) {
        const container = document.querySelector(".etiquette-card");
        container.innerHTML = "";
        etiquettes.forEach((etiquette) => {
            const item = document.createElement("div");
            item.classList.add("etiquette-item");
            item.innerHTML = `
                <div class="details-btn">${etiquette.title}</div>
                <div class="action-btn">
                    <svg class="edit-btn" data-id="${etiquette.id}"
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
                    <svg class="remove-btn" data-id="${etiquette.id}"
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

        // ajouter des écouteurs d'événements pour les boutons de modification et de suppression
        document
            .querySelectorAll(".etiquette-item .edit-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    const id = event.target.getAttribute("data-id");
                    fetchEtiquetteForEditing(id);
                });
            });

        document
            .querySelectorAll(".etiquette-item .remove-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    tagIdToDelete = event.target.getAttribute("data-id");
                    overlayDelete.style.display = "flex";
                });
            });
    }

    // fonction pour récupérer une étiquette pour la modification
    async function fetchEtiquetteForEditing(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const etiquette = await response.json();
            showEditForm(etiquette);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'étiquette:",
                error
            );
        }
    }

    // afficher le formulaire avec les données existantes de l'étiquette
    function showEditForm(etiquette) {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Modifier l'étiquette";

        formTitleInput.value = etiquette.title;
        formDescriptionInput.value = etiquette.description;
        formCreatorSelect.value = etiquette.creators[0]?.id || ""; // utiliser le premier créateur associé
        formCreatorSelect2.value = etiquette.creators[1]?.id || "";
        formCreatorSelect3.value = etiquette.creators[2]?.id || "";
        formTag1Select.value = etiquette.tags[0]?.id || "";
        formTag2Select.value = etiquette.tags[1]?.id || "";
        formTag3Select.value = etiquette.tags[2]?.id || "";
        submitBtn.textContent = "Modifier";

        editForm.setAttribute("data-action", "update");
        editForm.setAttribute("data-id", etiquette.id);
    }

    // Soumettre le formulaire pour modifier une étiquette
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);

        const data = {
            slug: formData.get("title").toLowerCase().replace(/\s+/g, "-"),
            image: formData.get("image"),
            title: formData.get("title"),
            description: formData.get("description"),
            creators: [
                { id: parseInt(formData.get("creator")) },
                { id: parseInt(formData.get("creator2")) },
                { id: parseInt(formData.get("creator3")) },
            ].filter((creator) => !isNaN(creator.id)),
            tags: [
                { id: parseInt(formData.get("tag1")) },
                { id: parseInt(formData.get("tag2")) },
                { id: parseInt(formData.get("tag3")) },
            ].filter((tag) => !isNaN(tag.id)),
        };

        const etiquetteId = editForm.getAttribute("data-id");

        if (editForm.getAttribute("data-action") === "update") {
            try {
                const response = await fetch(`${apiUrl}/${etiquetteId}`, {
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

                const updatedEtiquette = await response.json();
                if (response.ok) {
                    getEtiquettes(); // rafraîchir la liste des étiquettes
                    location.reload();
                    overlay.style.display = "none"; // fermer le formulaire
                } else {
                    console.error(
                        "Erreur lors de la mise à jour de l'étiquette:",
                        updatedEtiquette
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la requête:", error);
            }
        }
    });

    // fonction pour supprimer une étiquette
    async function deleteEtiquette(id) {
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

            const deletedEtiquette = await response.json();
            console.log("Étiquette supprimée:", deletedEtiquette);
            getEtiquettes(); // rafraîchir la liste des étiquettes
            location.reload();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de l'étiquette:",
                error
            );
        }
    }

    // gérer la confirmation de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (tagIdToDelete) {
            deleteEtiquette(tagIdToDelete);
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

    // charger les étiquettes au chargement de la page
    getEtiquettes();
});
