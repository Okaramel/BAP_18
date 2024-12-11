document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/etiquette";
    const addForm = document.getElementById("etiquette-form");
    const addBtn = document.querySelector(".add-btn");
    const overlay = document.querySelector(".overlay-etiquette");
    const popupTitle = document.getElementById("popup-title");

    // Prévisualisation de l'image background
    const backgroundInput = document.getElementById("background");
    const imagePreview = document.getElementById("image-preview");

    backgroundInput?.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Ouvrir le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter une étiquette";
        addForm.reset();
        imagePreview.style.display = "none";
        addForm.setAttribute("data-action", "create");
    });

    // Soumettre le formulaire pour ajouter une étiquette
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData, // Envoie directement le FormData qui contient les fichiers
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de l'étiquette");
            }

            const result = await response.json();
            console.log("Étiquette ajoutée avec succès:", result);

            // Fermer le popup et rafraîchir la liste
            overlay.style.display = "none";
            addForm.reset();
            imagePreview.style.display = "none";

            // Recharger la liste des étiquettes
            // Vous devez implémenter cette fonction si nécessaire
            await loadEtiquettes();
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur est survenue lors de l'ajout de l'étiquette");
        }
    });

    // Fermer le popup
    document.querySelector(".close-btn")?.addEventListener("click", () => {
        overlay.style.display = "none";
        addForm.reset();
        imagePreview.style.display = "none";
    });
});
