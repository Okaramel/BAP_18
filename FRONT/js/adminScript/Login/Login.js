const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        const token = data.token;
        const adminEmail = data.admin.email;
        const adminId = data.admin.id;

        window.localStorage.setItem("token", token);
        window.localStorage.setItem("adminEmail", adminEmail);
        window.localStorage.setItem("adminId", adminId);

        window.location.href = "../../html/adminPage/admin.html";
    } catch (error) {
        displayErrorMessage("Mauvais email ou mot de passe");
    }

    function displayErrorMessage(message) {
        const loginContainer = document.querySelector(".login-container");
        if (loginContainer) {
            const existingError = loginContainer.querySelector(".error");
            if (existingError) {
                existingError.remove();
            }

            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error");
            errorDiv.textContent = message;
            loginContainer.style.flexDirection = "column-reverse";
            loginContainer.appendChild(errorDiv);
        }
    }
});
