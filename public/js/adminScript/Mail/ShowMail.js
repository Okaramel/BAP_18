// Sélection des éléments HTML
const form = document.getElementById("header_email");
const responseMessage = document.getElementById("responseMessage");

// Fonction pour envoyer une requête POST à l'API d'envoi d'email
async function sendEmail(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Récupération des données du formulaire
    const email = document.getElementById("email").value;
    const type = document.querySelector('input[name="type"]:checked').value;

    // Vérification que l'email est valide
    if (!email) {
        responseMessage.textContent = "Veuillez entrer une adresse email valide.";
        responseMessage.style.color = "red";
        return;
    }

    try {
        // Envoi de la requête POST au serveur
        const response = await fetch("/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, type }),
        });

        // Gestion de la réponse
        if (response.ok) {
            const result = await response.json();
            responseMessage.textContent = result.message;
            responseMessage.style.color = "green";
            window.location.href =  "http://localhost:3000/index";
        }

        if (response.status === 200){
            window.location.href =  "http://localhost:3000/index";
        }
    } catch (err) {
        // Gestion des erreurs réseau ou autres
        console.error("Erreur lors de la requête : ", err);
        responseMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
        responseMessage.style.color = "red";
    }
}

// Ajout de l'événement au formulaire
form.addEventListener("submit", sendEmail);
