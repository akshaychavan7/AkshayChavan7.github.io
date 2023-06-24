// load personal profile data
let data = {};
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => data = json);

document.addEventListener("DOMContentLoaded", function () {
    mapMetaDataInHeader();
    setBannerData();
    mapSocialLinksData();
    mapStatsData();
});

function mapMetaDataInHeader() {
    // document.querySelector('meta[name="description"]').setAttribute("content", _desc);
    // #6eb0f3
}

function setBannerData() {
    document.getElementById("tag-label").innerHTML = data.role;
    document.getElementById("first-name").innerHTML = data.firstName;
    document.getElementById("last-name").innerHTML = data.lastName.toUpperCase();
    document.getElementById("brand").innerHTML = data.firstName+" "+data.lastName;

}

function mapSocialLinksData() {
    let socials = [
        {
            "icon": "fa fa-linkedin-square",
            "value": "https://linkedin.com/in/mhmzdev"
        },
        {
            "icon": "fa fa-github",
            "value": "https://github.com/mhmzdev"
        },
        {
            "icon": "fa fa-medium",
            "value": "https://mhmzdev.medium.com"
        },
        {
            "icon": "fa fa-facebook-square",
            "value": "https://facebook.com/mhmzdev"
        },
        {
            "icon": "fa fa-instagram",
            "value": "https://instagram.com/mhmzdev"
        },
        {
            "icon": "fa fa-twitter",
            "value": "https://twitter.com/mhmzdev"
        }
    ];

    // icons in top section
    for (var i = 0; i < socials.length; i++) {
        var anchor = document.createElement("a");
        anchor.className = "social-icon-wrapper";

        var icon = document.createElement("i");
        icon.className = "social-icon " + socials[i]["icon"];

        var link = socials[i]["value"];
        anchor.href = link;
        anchor.target = "_blank";

        anchor.appendChild(icon);

        var socialHandles = document.getElementById("social-handles");
        socialHandles.appendChild(anchor);
    }

    // icons in contact section
    for (var i = 0; i < socials.length; i++) {
        var anchor = document.createElement("a");
        anchor.className = "social-icon-wrapper";
        anchor.style.padding = "3%";

        var icon = document.createElement("i");
        icon.className = "social-icon " + socials[i]["icon"];

        var link = socials[i]["value"];
        anchor.href = link;
        anchor.target = "_blank";

        anchor.appendChild(icon);

        var socialHandlsContact = document.getElementById("social-contact-icons");
        var extraDiv = document.createElement("div");

        socialHandlsContact.appendChild(extraDiv);
        socialHandlsContact.appendChild(anchor);
        socialHandlsContact.appendChild(extraDiv);
    }
}

function mapStatsData() {
    let stats = [
        {
            "value": "4+",
            "text-1": "Years",
            "text-2": "Experience"
        },
        {
            "value": "35+",
            "text-1": "Projects Completed",
            "text-2": "in 10+ Countries"
        },
        {
            "value": "109k+",
            "text-1": "Content",
            "text-2": "Reach & Views"
        }
    ];

    for (var i = 0; i < stats.length; i++) {
        var stat = stats[i];
        var value = stat["value"];
        var txt1 = stat["text-1"];
        var txt2 = stat["text-2"];

        var div = document.createElement("div");
        div.className = "stats stats-data";

        var valueText = document.createElement("h1");
        valueText.className = "value";
        valueText.textContent = value;

        var textColumn = document.createElement("div");
        textColumn.className = "stats-label-column";

        var text1 = document.createElement("div");
        text1.className = "label stats-label";
        text1.innerHTML = txt1;

        var text2 = document.createElement("div");
        text2.className = "label stats-label";
        text2.innerHTML = txt2;

        textColumn.appendChild(text1);
        textColumn.appendChild(text2);

        div.appendChild(valueText);
        div.appendChild(textColumn);

        var overaAllStatsDiv = document.getElementById("overall-stats");
        overaAllStatsDiv.append(div);
    }
}