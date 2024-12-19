document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/creator";
    const addForm = document.getElementById("creator-form");
    const addBtn = document.getElementById("add-btn-creator");
    const overlay = document.querySelector(".overlay-creator");
    const popupTitle = document.querySelector(".popup-creator #popup-title");

    // ouvre le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter un créateur";
        addForm.reset(); // réinitialise le formulaire
        addForm.setAttribute("data-action", "create");
    });

    // ferme le formulaire d'ajout en cliquant en dehors du formulaire
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });

    // soumettre le formulaire pour ajouter un créateur
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    // ne pas définir "Content-Type" manuellement
                },
                body: formData, // envoie directement le FormData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const newCreator = await response.json();

            // ferme le popup et rafraîchir la page
            overlay.style.display = "none";
            addForm.reset();
            location.reload(); // rafraîchie la page pour voir le nouveau créateur
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            alert("Une erreur est survenue lors de l'ajout du créateur");
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
});
