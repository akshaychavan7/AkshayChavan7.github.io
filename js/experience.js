document.addEventListener("DOMContentLoaded", function () {
    mapExperienceData();
});


function mapExperienceData() {

    let exp = [
        {
            "org": "PriceLabs",
            "position": "Fullstack Engineer",
            "duration": "Oct 2022 - Sept 2023",
            "location": "Chicago, IL, USA",
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
            "org": "Quantiphi Analytics",
            "position": "Software Developer - Full Stack",
            "duration": "July 2021 - Oct 2022",
            "location": "Mumbai, MH, India",
            "technologies": [
                "React", 
                "Angular", 
                "Node.js", 
                "Typescript", 
                "Express.js", 
                "Android", 
                "Java", 
                "Redis", 
                "Firestore", 
                "MongoDB", 
                "Google Cloud Platform", 
                "Git"
            ],
            "details": [
                "Conceptualized and built a comprehensive software solution powered by machine learning, achieving a 90% detection rate for construction defects, cutting field technician risk mitigation time by 30%, and saving $50,000 per project.",
                "Developed machine learning integrated Web and Android apps for speech analytics, KPI forecasting, and real-time agent feedback, fully automating customer service calls across multiple businesses, slashing operational costs by 70%.",
                "Designed and executed a robust transactional mechanism for seamless data synchronization between Firestore and MySQL databases, achieving a 98% reduction in data sync errors and boosting application reliability by 30%."
            ]
        },
        {
            "org": "FinIQ Consulting India",
            "position": "Software Development Engineer",
            "duration": "July 2019 - July 2021",
            "technologies": [
                "Angular", 
                "NodeJS", 
                "Typescript", 
                "Javascript", 
                "Express.js", 
                "Android", 
                "Java", 
                "MySQL", 
                "Git", 
                "Bitbucket", 
                "Postman"
            ],
            "details": [
                "Spearheaded the design and implementation of high-performance structured trading applications for leading banks in Asia, including Bank of China and UBS, contributing to a monthly revenue of over $1 million.", 
                "Revamped backend processes and optimized code for multiple software products, resulting in a remarkable 15% performance boost and a 20% reduction in maintenance overhead.",
                "Implemented a robust CI/CD pipeline for a large-scale web app, reducing deployment time by 80% and enhancing release reliability through rigorous testing.",
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