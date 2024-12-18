function fetchAll() {
    // get all projects from database
    return fetch(`http://localhost:3000/etiquette/`, {
        method: "GET",
    })
        .then((response) => {
            // process error codes
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Data not found");
                } else if (response.status === 500) {
                    throw new Error("Server error");
                } else {
                    throw new Error("Network response was not ok");
                }
            }

            // transform api response body into json data
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("projects", JSON.stringify(data));
            return data;
        })
        .catch((error) => {
            // process errors
            console.error("Error:", error);
        });
}

// REMINDER: separating calling and displaying functions is also an option

// function fetchSearch() {}

async function displayAll() {
    // const projects = localStorage.getItem("projects");
    const projects = await fetchAll();
    console.log(projects);

    if (projects) {
        console.log(projects);

        let gallery = document.querySelector(".section_container");
        gallery.innerHTML = "";

        // create new article block for each project
        projects.forEach((project) => {
            let newProject = document.createElement("article"); // create new block
            newProject.innerHTML = `
                <a href="etiquette/page/${project.id}" class="article_img"><img src="${project.background}" alt="" /></a>
                        <div class="article_text">
                            <a href="etiquette/page/${project.id}" class="article_title"><h4>${project.titleProject}</h4></a>
                            <p class="article_description">${project.descriptionProject}</p>
                        </div>
                `; // fill block
            newProject.classList.add("section_article"); // add block class
            gallery.appendChild(newProject); // add block to container
        });
    } else {
        console.log("projects are not defined");
    }
}

let searchForm = document.querySelector(".header_search");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let search = document.querySelector("#search_value");
    let gallery = document.querySelector(".section_container");
    gallery.innerHTML = "";

    if (search.value != "") {
        let projects = JSON.parse(localStorage.getItem("projects"));
        console.log(projects);

        // search for project titles
        // create new article block for each project
        projects.forEach((project) => {
            if (project.titleProject.includes(search.value)) {
                let newProject = document.createElement("article"); // create new block
                newProject.innerHTML = `
                <a href="etiquette/page/${project.id}" class="article_img"><img src="${project.background}" alt="" /></a>
                        <div class="article_text">
                            <a href="etiquette/page/${project.id}" class="article_title"><h4>${project.titleProject}</h4></a>
                            <p class="article_description">${project.descriptionProject}</p>
                        </div>
                `; // fill block
                newProject.classList.add("section_article"); // add block class
                gallery.appendChild(newProject); // add block to container
            } else {
                gallery.innerHTML = `<p>Couldn't find any project with this title</p>`;
            }
        });
    } else {
        displayAll();
    }
});

function displaySearch() {}

// trigger function on page load
window.addEventListener("DOMContentLoaded", () => {
    displayAll();
});
