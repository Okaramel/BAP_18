document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/etiquette";
    const addForm = document.getElementById("etiquette-form");
    const addBtn = document.querySelector(".add-btn");
    const overlay = document.querySelector(".overlay-etiquette");
    const popupTitle = document.getElementById("popup-title");

    // Ouvrir le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter une étiquette";
        addForm.reset(); // Réinitialiser le formulaire
        addForm.setAttribute("data-action", "create");
    });

    // Soumettre le formulaire pour ajouter une étiquette
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        // Création de l'objet data à envoyer à l'API
        const data = {
            slug: formData.get("title").toLowerCase().replace(/\s+/g, "-"),
            image: formData.get("image"),
            titleProject: formData.get("title"),
            description: formData.get("description"),
            logo: formData.get("logo"),
            background: formData.get("background"),
            creatorId: parseInt(formData.get("creator")), // S'assurer que l'ID du créateur est transmis
            creators: [
                { id: parseInt(formData.get("creator")) },
                { id: parseInt(formData.get("creator2")) },
                { id: parseInt(formData.get("creator3")) },
            ].filter((creator) => !isNaN(creator.id)), // Enlever les créateurs non sélectionnés
            tags: [
                { id: parseInt(formData.get("tag1")) },
                { id: parseInt(formData.get("tag2")) },
                { id: parseInt(formData.get("tag3")) },
            ].filter((tag) => !isNaN(tag.id)), // Enlever les tags non sélectionnés
            innovations: [{ id: parseInt(formData.get("innovation")) }].filter(
                (innovation) => !isNaN(innovation.id)
            ), // Enlever les innovations non sélectionnées
        };

        // Vérifier l'ID du créateur avant d'envoyer la requête
        console.log("ID Créateur :", formData.get("creator"));

        if (addForm.getAttribute("data-action") === "create") {
            try {
                // Envoyer la requête pour créer l'étiquette
                const response = await fetch(apiUrl, {
                    method: "POST",
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
                    console.log("errorText :", errorText);
                    throw new Error(
                        displayErrorMessageInEtiquetteForm(
                            "Veuillez sélectionner un créateur ou plusieurs créateurs"
                        )
                    );
                }
                // message d'erreur si il n'ya pas de créateur

                function displayErrorMessageInEtiquetteForm(message) {
                    const overlayEtiquette =
                        document.querySelector(".overlay-etiquette");
                    if (overlayEtiquette) {
                        const existingError =
                            overlayEtiquette.querySelector(".errorCreator");
                        if (existingError) {
                            existingError.remove();
                        }

                        const errorDiv = document.createElement("div");
                        errorDiv.classList.add("errorCreator");
                        errorDiv.textContent = message;
                        overlayEtiquette.style.flexDirection = "column-reverse";
                        overlayEtiquette.appendChild(errorDiv);
                    }
                }
                const newEtiquette = await response.json();
                if (response.ok) {
                    location.reload(); // Rafraîchir la page pour afficher la nouvelle étiquette
                    overlay.style.display = "none"; // Fermer le formulaire
                } else {
                    console.error(
                        "Erreur lors de la création de l'étiquette:",
                        newEtiquette
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la requête:", error);
            }
        }
    });

    // Afficher le formulaire d'ajout d'étiquette
    document.querySelector(".add-btn").addEventListener("click", () => {});

    // Masquer le formulaire d'ajout d'étiquette
    document
        .querySelector(".overlay-etiquette")
        .addEventListener("click", (event) => {
            const errorCreator = document.querySelector(".errorCreator");
            if (event.target === document.querySelector(".overlay-etiquette")) {
                document.querySelector(".overlay-etiquette").style.display =
                    "none";
            }
            if (errorCreator) {
                errorCreator.remove();
            }
        });
});
