document.addEventListener("DOMContentLoaded", function () {
    mapExperienceData();
});


function mapExperienceData() {

    let exp = [
        {
            "org": "PriceLabs",
            "position": "Fullstack Engineer",
            "duration": "Jan 2022 - Present",
            "technologies": [
                "Ruby on Rails", 
                "Javascript", 
                "React.js", 
                "Ruby", 
                "jQuery", 
                "Bootstrap", 
                "MySQL", 
                "Redis", 
                "Minitest", 
                "Git", 
                "Bitbucket",
                "REST APIs",
            ],
            "details": [
                "Enhanced Dynamic Pricing Mechanism: Elevated the efficiency of the dynamic pricing strategy by 25% by streamlining workflow, leading to a 40% reduction in UI interactions and an 8% boost in customer satisfaction.",
                "Zoho SalesIQ Chat Integration: Successfully integrated Zoho SalesIQ chat, gathering user data and using logged-in user context to pre-fill ticket data, enabling 20% faster ticket handling.",
                "Automated Localization Process: Engineered an automated localization process, eradicating the need for manual intervention, resulting in a 100% reduction in errors and a significant reduction in the turnaround time." ,
                "Agile Software Methodology and Team Structures: Flourished in an Agile environment, executing tasks within dynamic sprints and collaborating within diverse team setups, such as Squads.",
"Team Growth and Recruitment Support: Contributed significantly to expanding the developer team by actively participating in the interviewing process and offering valuable support.",
            ]
        },
        {
            "org": "Voxlabs",
            "position": "Flutter/Dart Intern",
            "duration": "Oct 2021 - Jan 2022",
            "technologies": [
                "Flutter",
                "Dart",
                "Supabase",
                "Firebase"
            ],
            "details": [
                "Learned state management concepts like Bloc, futter bloc and provider",
                "Worked with layered architecture",
                "Integrated Supabase in flutter app",
                "Used external packages for managing form input concepts - flutter_form_builder",
                "Learned GitHub (Version Controlling) with a team, concepts like maintaining PRs, branches etc.",
                "Improved concepts of reusable components"
            ]
        },
        {
            "org": "Storius",
            "position": "Flutter/Dart Intern",
            "duration": "Nov 2020 - Jan 2021",
            "technologies": [
                "Flutter",
                "Dart",
                "App script",
                "Google maps"
            ],
            "details": [
                "Developed first BETA version of storius app",
                "Integrated Google sheets with App scripts that act as SQL database",
                "Managed two different source of data into the app to overcome the place of Firebase",
                "Learned and implemented MVC architecture for production level of application",
                "Integrated Google maps, live markers and interaction of users with it",
                "Added audio players on Google maps posted by users",
                "Enhanced UX of beta version till 3rd revision",
                "Helped in expanding team of developers with various resources"
            ]
        },
        {
            "org": "Multi TeleSoft",
            "position": "Flutter Developer",
            "duration": "Fev 2020 - Apr 2020",
            "technologies": [
                "Flutter",
                "Dart",
                "Google maps",
                "SMS integration",
                "Live locations",
                "Firebase auth",
                "Firebase real-time"
            ],
            "details": [
                "Learned real-time location alerts using firebase real-time db",
                "Integrated Google Maps",
                "Firebase authentication via phone number",
                "MVC architecture based application",
                "Deployment on play store"
            ]
        }
    ];

    for (var i = 0; i < exp.length; i++) {
        var expCard = document.createElement("div");
        expCard.className = "exp-card";

        var expMetaDiv = document.createElement("div");
        expMetaDiv.className = "exp-meta";

        var orgName = document.createElement("h2");
        orgName.className = "heading2 exp-org";
        orgName.innerHTML = exp[i]["org"];

        var position = document.createElement("span");
        position.className = "label exp-position";
        position.innerHTML = exp[i]["position"];

        var session = document.createElement("p");
        session.className = "body2 exp-session";
        session.innerHTML = exp[i]["duration"];

        var technologiesHeading = document.createElement("span");
        technologiesHeading.className = "body2 exp-tech";
        technologiesHeading.innerHTML = "Technologies";

        var technologiesList = document.createElement("ul");
        technologiesList.className = "exp-tech-list";

        for (var k = 0; k < exp[i]["technologies"].length; k++) {
            var techName = document.createElement("li");
            techName.className = "body2 exp-tech-item";
            techName.innerHTML = exp[i]["technologies"][k];
            technologiesList.appendChild(techName);
        }
        expMetaDiv.appendChild(orgName);
        expMetaDiv.appendChild(position);
        expMetaDiv.appendChild(session);
        expMetaDiv.appendChild(technologiesHeading);
        expMetaDiv.appendChild(technologiesList);
        expCard.appendChild(expMetaDiv);

        var detailsList = document.createElement("ul");
        detailsList.className = "exp-detail";

        for (var k = 0; k < exp[i]["details"].length; k++) {
            var detail = document.createElement("li");
            detail.className = "body2 exp-detail-item";
            detail.innerHTML = exp[i]["details"][k];
            detailsList.appendChild(detail);
        }

        expCard.appendChild(detailsList);

        var experiences = document.getElementById("exp");
        experiences.appendChild(expCard);
    }
}