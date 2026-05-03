document.addEventListener("DOMContentLoaded", function () {
    mapProjectsData();
});

function mapProjectsData() {
    const projects = data.projects;
    const projectsDiv = document.getElementById("projects");

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const projectTitle = project.title;
        const type = project.type;
        const image = project.image;
        const description = project.description || "";

        const card = document.createElement('div');
        card.className = "project-card";

        const projectLabel = document.createElement("div");
        projectLabel.className = "label p-type";
        projectLabel.textContent = type;

        const projectImg = document.createElement("img");
        projectImg.className = "p-image-bg";
        projectImg.src = image;
        projectImg.alt = projectTitle;
        projectImg.loading = "lazy";

        const projectName = document.createElement("p");
        projectName.className = "body1 p-title";
        projectName.textContent = projectTitle;

        const projectDesc = document.createElement("p");
        projectDesc.className = "p-description";
        projectDesc.textContent = description;

        const labels = document.createElement("div");
        labels.className = "p-labels";

        for (let j = 0; j < project.labels.length; j++) {
            const labelTitle = project.labels[j]["title"];
            const link = project.labels[j]["link"];

            const label = document.createElement('a');
            label.className = "p-label";

            const labelIcon = document.createElement("i");
            labelIcon.setAttribute("aria-hidden", "true");

            if (labelTitle === "App") {
                labelIcon.className = "p-label-icon fa-brands fa-app-store";
            } else if (labelTitle === "Play") {
                labelIcon.className = "p-label-icon fa-brands fa-google-play";
            } else if (labelTitle === "Web") {
                labelIcon.className = "p-label-icon fa fa-globe";
            } else if (labelTitle === "GitHub") {
                labelIcon.className = "p-label-icon fa-brands fa-github";
            } else if (labelTitle === "Demo") {
                labelIcon.className = "p-label-icon fa-brands fa-youtube";
            } else if (labelTitle === "Package") {
                labelIcon.className = "p-label-icon material-icons";
                labelIcon.textContent = "widgets";
                labelIcon.style.fontSize = "16px";
            }

            const labelText = document.createElement("span");
            labelText.className = "label p-label-text";
            labelText.textContent = labelTitle;

            label.href = link;
            label.target = "_blank";
            label.rel = "noopener noreferrer";
            label.setAttribute("aria-label", `${labelTitle} for ${projectTitle}`);

            label.appendChild(labelIcon);
            label.appendChild(labelText);
            labels.appendChild(label);
        }

        card.appendChild(projectLabel);
        card.appendChild(projectImg);
        card.appendChild(projectName);
        if (description) card.appendChild(projectDesc);
        card.appendChild(labels);

        projectsDiv.appendChild(card);
    }
}
