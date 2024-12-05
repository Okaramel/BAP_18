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

        // Envoyer la requête pour créer l'étiquette
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
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
    });

    // Afficher le formulaire d'ajout d'étiquette
    document.querySelector(".add-btn").addEventListener("click", () => {
        document.querySelector(".overlay-etiquette").style.display = "flex";
    });

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
