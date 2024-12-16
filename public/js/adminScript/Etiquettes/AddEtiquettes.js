document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/etiquette";
    const addForm = document.getElementById("etiquette-form");
    const addBtn = document.querySelector(".add-btn");
    const overlay = document.querySelector(".overlay-etiquette");
    const popupTitle = document.getElementById("popup-title");

    // ouvre le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter une étiquette";
        addForm.reset();
        addForm.setAttribute("data-action", "create");
    });

    // ferme le formulaire d'ajout en cliquant en dehors du formulaire
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });

    // soumet le formulaire pour ajouter une étiquette
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        // ajoute les créateurs sélectionnés au FormData
        const creator1 = document.getElementById("creator_form").value;
        const creator2 = document.getElementById("creator_form2").value;
        const creator3 = document.getElementById("creator_form3").value;

        if (creator1) formData.append("creators[]", creator1);
        if (creator2) formData.append("creators[]", creator2);
        if (creator3) formData.append("creators[]", creator3);

        // ajoute les tags sélectionnés au FormData
        const tag1 = document.getElementById("tag1").value;
        const tag2 = document.getElementById("tag2").value;
        const tag3 = document.getElementById("tag3").value;

        if (tag1) formData.append("tags[]", tag1);
        if (tag2) formData.append("tags[]", tag2);
        if (tag3) formData.append("tags[]", tag3);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData, // envoie directement le FormData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const newEtiquette = await response.json();
            console.log("Étiquette ajoutée avec succès:", newEtiquette);

            // ferme le popup et rafraîchir la page
            overlay.style.display = "none";
            addForm.reset();
            location.reload(); // rafraîchie la page pour voir la nouvelle étiquette
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            alert("Une erreur est survenue lors de l'ajout de l'étiquette");
        }
    });
});
