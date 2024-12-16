document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/innovation"; // Remplacez par l'URL de votre API pour récupérer les innovations
    const formInnovationSelect = document.getElementById("innovation");

    // Fonction pour récupérer les inovations depuis l'API
    const getInnovations = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Utilisation du token pour l'authentification
                },
            });

            if (response.ok) {
                const innovations = await response.json();
                populateInnovationsSelect(innovations); // Remplir le select avec les innovations
            } else {
                console.error("Erreur lors de la récupération des innovations");
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
        }
    };

    // Fonction pour remplir les champs de sélection des innovations
    const populateInnovationsSelect = (innovations) => {
        [formInnovationSelect].forEach((selectElement) => {
            selectElement.innerHTML = ""; // vide chaque élément select
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Sélectionnez une innovation";
            selectElement.appendChild(defaultOption); // ajoutee l'option par défaut

            innovations.forEach((innovation) => {
                const option = document.createElement("option");
                option.value = innovation.id; // ID de l'innovation
                option.textContent = innovation.name; // nom de l'innovation
                selectElement.appendChild(option); // ajoute l'option dans le select
            });
        });
    };

    // appelle la fonction pour récupérer et afficher les innovations au chargement de la page
    getInnovations();
});
