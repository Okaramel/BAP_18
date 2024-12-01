document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/creator";
    const addForm = document.getElementById("creator-form");
    const addBtn = document.getElementById("add-btn-creator");
    const overlay = document.querySelector(".overlay-creator");
    const popupTitle = document.querySelector(".popup-creator #popup-title");

    // Ouvrir le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter un créateur";
        addForm.reset(); // Réinitialiser le formulaire
        addForm.setAttribute("data-action", "create");
    });

    // Soumettre le formulaire pour ajouter un créateur
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        // Création de l'objet data à envoyer à l'API
        const data = {
            image: formData.get("image"),
            name: formData.get("name"),
            email: formData.get("email"),
            linkedin: formData.get("linkedin"),
            image: formData.get("image"),
        };

        if (addForm.getAttribute("data-action") === "create") {
            try {
                // Envoyer la requête pour créer le créateur
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
                    throw new Error(errorText);
                }

                const newCreator = await response.json();
                if (response.ok) {
                    location.reload(); // Rafraîchir la page pour afficher le nouveau créateur
                    overlay.style.display = "none"; // Fermer le formulaire
                } else {
                    console.error(
                        "Erreur lors de la création du créateur:",
                        newCreator
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la requête:", error);
            }
        }
    });

    // Afficher le formulaire d'ajout de créateur
    document.querySelector(".add-btn").addEventListener("click", () => {});

    // Masquer le formulaire d'ajout de créateur
    document
        .querySelector(".overlay-creator")
        .addEventListener("click", (event) => {
            if (event.target === document.querySelector(".overlay-creator")) {
                document.querySelector(".overlay-creator").style.display =
                    "none";
            }
        });
});
