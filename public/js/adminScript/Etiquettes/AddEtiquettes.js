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
        addForm.reset();
        addForm.setAttribute("data-action", "create");
    });

    // Soumettre le formulaire pour ajouter une étiquette
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData, // Utiliser directement formData pour l'envoi de fichiers
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de l'étiquette");
            }

            const newEtiquette = await response.json();
            console.log("Étiquette ajoutée avec succès:", newEtiquette);

            // Fermer le popup et rafraîchir la page
            overlay.style.display = "none";
            addForm.reset();
            location.reload(); // Rafraîchir la page pour voir la nouvelle étiquette
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            alert("Une erreur est survenue lors de l'ajout de l'étiquette");
        }
    });
});
