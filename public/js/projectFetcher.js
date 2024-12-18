function fetchAll() {
    // get all projects from database
    fetch(`http://localhost:3000/etiquette/`, {
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

            // transform into json data
            return response.json();
        })
        .then((data) => {
            // process json data
            console.log(data);

            let gallery = document.querySelector(".section_container");

            // create new article block for each project
            data.forEach((project) => {
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
        })
        .catch((error) => {
            // process errors
            console.error("Error:", error);
        });
}

// REMINDER: separating calling and displaying functions is also an option

// function fetchSearch() {}

// function displayAll() {}

// function displaySearch() {}

// trigger function on page load
window.addEventListener("load", async () => {
    fetchAll();
});
