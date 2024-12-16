document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/etiquette";
    const editForm = document.getElementById("etiquette-form");
    const overlay = document.querySelector(".overlay-etiquette");
    const popupTitle = document.getElementById("popup-title");
    const overlayDelete = document.querySelector(".overlay-delete");
    const confirmDeleteBtn = document.querySelector(".popup-delete .yes");
    const cancelDeleteBtn = document.querySelector(".popup-delete .no");
    let etiquetteIdToDelete = null;

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
                <div class="details-btn">${etiquette.titleProject}</div>
                <div class="action-btn">
                    
                    <svg class="remove-btn" data-id="${etiquette.id}"
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
            .querySelectorAll(".etiquette-item .edit-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    const id = event.target
                        .closest(".edit-btn") // sert à éviter les erreurs si on clique sur le svg
                        .getAttribute("data-id");
                    fetchEtiquetteForEditing(id);
                });
            });

        document
            .querySelectorAll(".etiquette-item .remove-btn")
            .forEach((button) => {
                button.addEventListener("click", (event) => {
                    etiquetteIdToDelete = event.target
                        .closest(".remove-btn")
                        .getAttribute("data-id");
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

            if (!response.ok) {
                throw new Error(
                    "Erreur lors de la récupération de l'étiquette"
                );
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("La réponse n'est pas au format JSON!");
            }

            const etiquette = await response.json();
            showEditForm(etiquette);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'étiquette:",
                error
            );
        }
    }

    // afficher le formulaire avec les données existantes
    function showEditForm(etiquette) {
        const overlay = document.querySelector(".overlay-etiquette");
        const popupTitle = document.getElementById("popup-title");

        overlay.style.display = "flex";
        popupTitle.innerHTML = "Modifier l'étiquette";

        // Remplir le formulaire avec les données de l'étiquette
        document.getElementById("titleProject").value = etiquette.titleProject;
        document.getElementById("description").value =
            etiquette.descriptionProject;
        document.getElementById("title1").value = etiquette.titleContainer1;
        document.getElementById("description1").value =
            etiquette.descriptionContainer1;
        document.getElementById("title2").value =
            etiquette.titleContainer2 || "";
        document.getElementById("description2").value =
            etiquette.descriptionContainer2 || "";
        document.getElementById("title3").value =
            etiquette.titleContainer3 || "";
        document.getElementById("description3").value =
            etiquette.descriptionContainer3 || "";
        document.getElementById("quoteBanner").value =
            etiquette.quoteBanner || "";
        document.getElementById("title4").value =
            etiquette.titleContainer4 || "";
        document.getElementById("description4").value =
            etiquette.descriptionContainer4 || "";

        // Sélectionner les créateurs
        document.getElementById("creator_form").value = etiquette.creatorId;
        if (etiquette.creators) {
            document.getElementById("creator_form2").value =
                etiquette.creators[0]?.id || "";
            document.getElementById("creator_form3").value =
                etiquette.creators[1]?.id || "";
        }

        // Sélectionner les tags
        if (etiquette.etiquettesTags) {
            document.getElementById("tag1").value =
                etiquette.etiquettesTags[0]?.tag.id || "";
            document.getElementById("tag2").value =
                etiquette.etiquettesTags[1]?.tag.id || "";
            document.getElementById("tag3").value =
                etiquette.etiquettesTags[2]?.tag.id || "";
        }

        // Sélectionner l'innovation
        if (etiquette.etiquettesInnovation?.length) {
            document.getElementById("innovation").value =
                etiquette.etiquettesInnovation[0].innovation.id;
        }

        document.getElementById("submit-btn").textContent = "Modifier";
        editForm.setAttribute("data-action", "update");
        editForm.setAttribute("data-id", etiquette.id);
    }

    // Soumettre le formulaire pour modifier une étiquette
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const etiquetteId = editForm.getAttribute("data-id");

        if (editForm.getAttribute("data-action") === "update") {
            try {
                const response = await fetch(`${apiUrl}/${etiquetteId}`, {
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

    // fonction de suppression
    async function deleteEtiquette(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
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

    // Gestion des événements de suppression
    confirmDeleteBtn.addEventListener("click", () => {
        if (etiquetteIdToDelete) {
            deleteEtiquette(etiquetteIdToDelete);
            overlayDelete.style.display = "none";
        }
    });

    cancelDeleteBtn.addEventListener("click", () => {
        overlayDelete.style.display = "none";
        etiquetteIdToDelete = null;
    });

    // fermeture des overlays au clic en dehors
    document
        .querySelector(".overlay-delete")
        .addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                event.currentTarget.style.display = "none";
            }
        });

    getEtiquettes();
});
