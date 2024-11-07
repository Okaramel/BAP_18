const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
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
    const userEmail = data.user.email;
    const userId = data.user.id;
    console.log(token, userEmail, userId);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userEmail", userEmail);
    window.localStorage.setItem("userId", userId);

    window.location.href = "../html/admin.html";
});
