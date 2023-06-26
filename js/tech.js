document.addEventListener("DOMContentLoaded", function () {
    mapTechData();
});

function mapTechData() {
    let tech = data.tech
    for (var i = 0; i < tech.length; i++) {
        let currentItemName = tech[i]["name"];
        // div
        var techDiv = document.createElement("div");
        techDiv.className = "tech";

        // icon
        var techIconImg = document.createElement("img");
        techIconImg.className = "tech-icon";
        techIconImg.width="22";
        techIconImg.height="22";

        let largeIcons = ["Typescript", "Ruby", "Android", "Postgres", "Gitlab", "Clickup", "Bitbucket", "Postman", "MySQL Workbench", "Jupyter Notebook", "WSL"];
        if (currentItemName == "Node.js") {
            techIconImg.style.height = "20px";
        } else if(largeIcons.includes(currentItemName)) {
            techIconImg.width="17";
            techIconImg.height="17";
        }

        // tech name
        var techName = document.createElement("span");
        techName.className = "tech-label";

        techIconImg.src = tech[i]["icon"];
        techIconImg.alt = currentItemName;

        techName.innerHTML = currentItemName;

        var relatedDiv = document.getElementById(tech[i]["type"]);

        techDiv.appendChild(techIconImg);
        techDiv.appendChild(techName);
        relatedDiv.appendChild(techDiv);
    }
}