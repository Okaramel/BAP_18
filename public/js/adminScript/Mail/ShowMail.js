const form = document.getElementById("header_email");
const responseMessage = document.getElementById("responseMessage");

async function sendEmail(event) {
    event.preventDefault(); // empêche le rechargement de la page lors de la soumission du formulaire

    // récupération des données (type et email) du formulaire
    const email = document.getElementById("email").value;
    const type = document.querySelector('input[name="type"]:checked').value;

    // vérification que l'email est valide
    if (!email) {
        responseMessage.textContent =
            "Veuillez entrer une adresse email valide.";
        responseMessage.style.color = "red";
        return;
    }

    try {
        // envoi de la requête POST au serveur
        const response = await fetch("/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, type }),
        });

        // gestion de la réponse
        if (response.ok) {
            const result = await response.json();
            responseMessage.textContent = result.message;
            responseMessage.style.color = "green";
            window.location.href = "http://localhost:3000/index";
        }

        if (response.status === 200) {
            window.location.href = "http://localhost:3000/index";
        }
    } catch (err) {
        // gestion des erreurs réseau ou autres
        console.error("Erreur lors de la requête : ", err);
        responseMessage.textContent =
            "Une erreur est survenue. Veuillez réessayer plus tard.";
        responseMessage.style.color = "red";
    }
}

// ajout de l'événement au formulaire
form.addEventListener("submit", sendEmail);
