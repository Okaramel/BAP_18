document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/creator";
    const formCreator1Select = document.getElementById("creator_form");
    const formCreator2Select = document.getElementById("creator_form2");
    const formCreator3Select = document.getElementById("creator_form3");

    // fonction pour récupérer les créateurs depuis l'API
    const getCreators = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Utilisation du token pour l'authentification
                },
            });

            if (response.ok) {
                const creators = await response.json();
                populateCreatorSelect(creators); // on appelle la fonction pour remplir le select avec les créateurs
            } else {
                console.error("Erreur lors de la récupération des créateurs");
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
        }
    };

    // fonction pour remplir le champ de sélection des créateurs
    const populateCreatorSelect = (creators) => {
        [formCreator1Select, formCreator2Select, formCreator3Select].forEach(
            (selectElement) => {
                selectElement.innerHTML = ""; // vide l'élément select
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Sélectionnez un créateur";
                selectElement.appendChild(defaultOption); // ajoute l'option par défaut

                creators.forEach((creator) => {
                    const option = document.createElement("option");
                    option.value = creator.id; // ID du créateur
                    option.textContent = creator.name; // nom du créateur
                    selectElement.appendChild(option); // ajoute l'option dans le select
                });
            }
        );
    };

    // appele la fonction pour récupérer et afficher les créateurs au chargement de la page
    getCreators();
});
