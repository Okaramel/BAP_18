document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/tag"; // Remplacez par l'URL de votre API pour récupérer les tags
    const formTag1Select = document.getElementById("tag1");
    const formTag2Select = document.getElementById("tag2");
    const formTag3Select = document.getElementById("tag3");

    // Fonction pour récupérer les tags depuis l'API
    const getTags = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Utilisation du token pour l'authentification
                },
            });

            if (response.ok) {
                const tags = await response.json();
                populateTagsSelect(tags); // Remplir les select avec les tags
            } else {
                console.error("Erreur lors de la récupération des tags");
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
        }
    };

    // Fonction pour remplir les champs de sélection des tags
    const populateTagsSelect = (tags) => {
        [formTag1Select, formTag2Select, formTag3Select].forEach(
            (selectElement) => {
                selectElement.innerHTML = ""; // Vider chaque élément select
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Sélectionnez un tag";
                selectElement.appendChild(defaultOption); // Ajouter l'option par défaut

                tags.forEach((tag) => {
                    const option = document.createElement("option");
                    option.value = tag.id; // ID du tag
                    option.textContent = tag.name; // Nom du tag
                    selectElement.appendChild(option); // Ajouter l'option dans le select
                });
            }
        );
    };

    // Appeler la fonction pour récupérer et afficher les tags au chargement de la page
    getTags();
});
