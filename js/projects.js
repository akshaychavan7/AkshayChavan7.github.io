document.addEventListener("DOMContentLoaded", function () {
    mapProjectsData();
});

function mapProjectsData() {
    let projects = [
        {
            "title": "Portable Antivirus System",
            "image": "images/projects/portable-antivirus-system.png",
            "type": "Open Source",
            "labels": [
                {
                    "title": "GitHub",
                    "link": "https://github.com/akshaychavan7/PORTABLE-ANTIVIRUS-SYSTEM"
                }
            ]
        },
        {
            "title": "vaxicov",
            "image": "images/projects/vaxicov.png",
            "type": "Open Source",
            "labels": [
                {
                    "title": "Play",
                    "link": "https://play.google.com/store/apps/details?id=com.akshaychavan.vaxicov&pli=1"
                },
                {
                    "title": "Web",
                    "link": "http://mhmzdev.github.io/devfolio"
                },
                {
                    "title": "GitHub",
                    "link": "https://github.com/mhmzdev/devfolio"
                }
            ]
        },
        {
            "title": "FlashX",
            "image": "images/projects/FlashX.png",
            "type": "Open Source",
            "labels": [
                {
                    "title": "GitHub",
                    "link": "https://github.com/mhmzdev/awesome_snackbar_content"
                },
                {
                    "title": "Package",
                    "link": "https://pub.dev/packages/awesome_snackbar_content"
                }
            ]
        },
        {
            "title": "PriceLabs Assignment",
            "image": "images/projects/pricelabs.png",
            "type": "Open Source",
            "labels": [
                {
                    "title": "GitHub",
                    "link": "https://github.com/mhmzdev/covid19-tracker-app"
                }
            ]
        },
        {
            "title": "Study Cloud React App",
            "image": "images/projects/study-cloud.png",
            "type": "Open Source",
            "labels": [
                {
                    "title": "App",
                    "link": "https://apps.apple.com/hk/app/storius-app/id1581928786?l=en"
                },
                {
                    "title": "Play",
                    "link": "https://play.google.com/store/apps/details?id=com.storius.storiusapp"
                },
                {
                    "title": "Web",
                    "link": "https://storiusapp.com/"
                }
            ]
        },
        {
            "title": "Halo - Color Changing Light Bulb",
            "image": "images/projects/color-changing-bulb.jpg",
            "type": "Open Source",
            "labels": [
                {
                    "title": "Demo",
                    "link": "https://youtube.com/shorts/ff9eCN66Vxs?feature=share"
                }
            ]
        }
    ];

    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var title = project.title;
        var type = project.type;
        var image = project.image;

        var card = document.createElement('div');
        card.className = "project-card";

        var imageDiv = document.createElement('div');
        imageDiv.className = "p-image";
        var projectLabel = document.createElement("div");
        projectLabel.className = "label p-type";
        projectLabel.innerHTML = type;

        var projectImg = document.createElement("img");
        projectImg.className = "p-image-bg";
        projectImg.src = image;
        projectImg.alt = title;

        imageDiv.appendChild(projectLabel);
        imageDiv.appendChild(projectImg);

        var projectName = document.createElement("p");
        projectName.className = "body1 p-title";
        projectName.innerHTML = title;

        var labels = document.createElement("div");
        labels.className = "p-labels";

        for (var j = 0; j < project.labels.length; j++) {
            var title = project.labels[j]["title"];
            var link = project.labels[j]["link"];

            var label = document.createElement('a');
            label.className = "p-label";
            var labelIcon = document.createElement("i");

            if (title == "App") {
                labelIcon.className = "p-label-icon fa-brands fa-app-store";
            } else if (title == "Play") {
                labelIcon.className = "p-label-icon fa-brands fa-google-play";
            } else if (title == "Web") {
                labelIcon.className = "p-label-icon fa fa-globe";
            } else if (title == "GitHub") {
                labelIcon.className = "p-label-icon fa-brands fa-github";
            } else if (title == "Demo") {
                labelIcon.className = "p-label-icon fa-brands fa-youtube";
            } 
            else if (title == "Package") {
                labelIcon.className = "p-label-icon material-icons";
                labelIcon.innerHTML = "widgets";
                labelIcon.style.fontSize = "16px";
            }

            var labelText = document.createElement("span");
            labelText.className = "label p-label-text";
            labelText.innerHTML = title;

            label.href = link;
            label.target = "_blank";

            label.appendChild(labelIcon);
            label.appendChild(labelText);

            labels.appendChild(label);
        }


        card.appendChild(projectLabel);
        card.appendChild(projectImg);
        card.appendChild(projectName);
        card.appendChild(labels);

        var projectsDiv = document.getElementById("projects");
        projectsDiv.appendChild(card);
    }
}