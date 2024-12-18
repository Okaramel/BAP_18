
async function sendEmail(email, type) {
    try {
        const response = await fetch('http://localhost:3000/sendingmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                type: type,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Afficher le message de succès à l'utilisateur
        } else {
            const errorData = await response.json();
            alert(`Erreur : ${errorData.message}`); // Afficher le message d'erreur
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
}

// Gérer l'événement de soumission du formulaire
document.getElementById('header_email').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const type = document.querySelector('input[name="type"]:checked').value;

    sendEmail(email, type); // Appelle la fonction d'envoi d'email
});
