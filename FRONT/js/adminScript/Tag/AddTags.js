document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/tag";
    const addForm = document.getElementById("tag-form");
    const addBtn = document.getElementById("add-btn-tag");
    const overlay = document.querySelector(".overlay-tag");
    const popupTitle = document.querySelector(".popup-tag #popup-title");

    // Ouvrir le formulaire d'ajout
    addBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        popupTitle.innerHTML = "Ajouter un tag";
        addForm.reset(); // Réinitialiser le formulaire
        addForm.setAttribute("data-action", "create");
    });

    // Soumettre le formulaire pour ajouter un créateur
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);

        // Création de l'objet data à envoyer à l'API
        const data = {
            slug: formData.get("name").toLowerCase().replace(/\s+/g, "-"),
            name: formData.get("name"),
            description: formData.get("description"),
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

                const newTag = await response.json();
                if (response.ok) {
                    location.reload(); // Rafraîchir la page pour afficher le nouveau créateur
                    overlay.style.display = "none"; // Fermer le formulaire
                } else {
                    console.error(
                        "Erreur lors de la création du créateur:",
                        newTag
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
        .querySelector(".overlay-tag")
        .addEventListener("click", (event) => {
            if (event.target === document.querySelector(".overlay-tag")) {
                document.querySelector(".overlay-tag").style.display = "none";
            }
        });
});
