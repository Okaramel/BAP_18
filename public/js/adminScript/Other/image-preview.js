document.addEventListener("DOMContentLoaded", () => {
    const imageInputs = [
        {
            input: document.getElementById("logo"),
            preview: document.getElementById("logo-preview"),
        },
        {
            input: document.getElementById("background"),
            preview: document.getElementById("background-preview"),
        },
        {
            input: document.getElementById("imageContainer2"),
            preview: document.getElementById("imageContainer2-preview"),
        },
        {
            input: document.getElementById("imageContainer3"),
            preview: document.getElementById("imageContainer3-preview"),
        },
        {
            input: document.getElementById("imageContainer4"),
            preview: document.getElementById("imageContainer4-preview"),
        },
        {
            input: document.getElementById("bannerImage"),
            preview: document.getElementById("bannerImage-preview"),
        },
    ];

    imageInputs.forEach(({ input, preview }) => {
        if (input && preview) {
            input.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.src = e.target.result;
                        preview.style.display = "block";
                    };
                    reader.readAsDataURL(file);
                } else {
                    preview.src = "#";
                    preview.style.display = "none";
                }
            });
        }
    });
});
