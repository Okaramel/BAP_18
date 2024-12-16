function openNav() {
    document.querySelector(".menu_burger").style.height = "100%";
    document.querySelector(".overlay").style.display = "block";
}

function closeNav() {
    document.querySelector(".menu_burger").style.height = "0";
    document.querySelector(".overlay").style.display = "none";
}