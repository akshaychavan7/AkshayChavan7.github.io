document.addEventListener("DOMContentLoaded", function () {
  mapExperienceData();
});

function mapExperienceData() {
  let exp = [
    {
      org: "PriceLabs",
      position: "Fullstack Engineer",
      duration: "Oct 2022 - Sept 2023",
      location: "Chicago, IL, USA",
      technologies: [
        "Ruby on Rails",
        "Javascript",
        "React.js",
        "Ruby",
        "jQuery",
        "Bootstrap",
        "MySQL",
        "Redis",
        "Minitest",
        "JEST Testing",
        "Git",
        "Bitbucket",
        "REST APIs",
      ],
      details: [
        "Elevated the efficiency of the dynamic pricing strategy by 25% by streamlining workflow, leading to a 40% reduction in UI interactions and an 8% boost in customer satisfaction.",
        "Successfully integrated Zoho SalesIQ chat, gathering user data and using logged-in user context to pre-fill ticket data, enabling 20% faster ticket handling.",
        "Engineered an automated localization process, eradicating the need for manual intervention, resulting in a 100% reduction in errors and a significant reduction in the turnaround time.",
        "Flourished in an Agile environment, executing tasks within dynamic sprints and collaborating within diverse team setups, such as Squads.",
        "Contributed significantly to expanding the developer team by actively participating in the interviewing process and offering valuable support.",
      ],
      accentColor: "#bb86fc",
    },
    {
      org: "Quantiphi Analytics",
      position: "Software Development Engineer - II",
      duration: "July 2021 - Oct 2022",
      location: "Mumbai, MH, India",
      technologies: [
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
        "Git",
      ],
      details: [
        "Conceptualized and built a comprehensive software solution powered by machine learning, achieving a 90% detection rate for construction defects, cutting field technician risk mitigation time by 30%, and saving $50,000 per project.",
        "Developed machine learning integrated Web and Android apps for speech analytics, KPI forecasting, and real-time agent feedback, fully automating customer service calls across multiple businesses, slashing operational costs by 70%.",
        "Designed and executed a robust transactional mechanism for seamless data synchronization between Firestore and MySQL databases, achieving a 98% reduction in data sync errors and boosting application reliability by 30%.",
      ],
      accentColor: "#fbca3e",
    },
    {
      org: "FinIQ Consulting India",
      position: "Software Development Engineer",
      duration: "July 2019 - July 2021",
      location: "Pune, MH, India",
      technologies: [
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
        "Postman",
      ],
      details: [
        "Spearheaded the design and implementation of high-performance structured trading applications for leading banks in Asia, including Bank of China and UBS, contributing to a monthly revenue of over $1 million.",
        "Revamped backend processes and optimized code for multiple software products, resulting in a remarkable 15% performance boost and a 20% reduction in maintenance overhead.",
        "Implemented a robust CI/CD pipeline for a large-scale web app, reducing deployment time by 80% and enhancing release reliability through rigorous testing.",
      ],
      accentColor: "#e24a68",
    },
    {
      org: "Carnegie Mellon University",
      position: "Research Intern",
      duration: "September 2021 - February 2022",
      location: "Pittsburgh, PA, USA",
      technologies: [
        "Python",
        "Deep Learning",
        "Scikit-Learn",
        "TensorFlow",
        "Google Cloud Platform (GCP)",
        "GitHub",
      ],
      details: [
        "Conducted research on optimizing preprocessing pipelines for Cryo-EM images using state-of-the-art deep learning architectures including VGG-16, ResNet, and Vision Transformers, resulting in a 5% improvement in feature extraction and classification accuracy compared to previous methods.",
        "Restructured the Xu Labs website, streamlining its architecture for improved user experience and accessibility.",
        "Collaborated effectively with esteemed professors and fellow team members, fostering a dynamic environment conducive to knowledge exchange and teamwork.",
      ],
      accentColor: "#ff7597",
    },
    {
      org: "The Sparks Foundation",
      position: "Mobile Application Development Intern",
      duration: "November 2021 - December 2022",
      location: "Singapore",
      technologies: [
        "Java",
        "Android",
        "DBBrowser",
        "SQLite",
        "MySQL",
        "GitHub",
      ],
      details: [
        "Successfully designed and developed mobile applications utilizing Android, DBBrowser, and SQLite, effectively meeting project requirements and achieving assigned tasks.",
        "Played a key role in supporting fellow interns by addressing their task-related queries and offering technical implementation guidance. This collaborative effort significantly contributed to team productivity and a positive working environment.",
        "Created detailed video demonstrations showcasing the functionality and features of the developed applications. These videos serve as comprehensive documentation and can be accessed for a closer look at the applications' capabilities:<br/> <div>1. <a href='https://youtu.be/haOWBllnH-o'>Banking Application</a></div> <div>2. <a href='https://youtu.be/JEsCieN_Dgo'>Authentication using Social Platforms</a></div>",
      ],
      accentColor: "#4cadad",
    },
    {
      org: "FinIQ Consulting India",
      position: "Software Development Engineer Intern",
      duration: "May 2018 - June 2018",
      location: "Nashik, MH, India",
      technologies: [
        "Python",
        "Angular 8",
        "Node.js",
        "Android",
        "TypeScript",
        "JavaScript",
        "Cascading Style Sheets (CSS)",
        "Java",
        "Git",
        "HTML",
      ],
      details: [
        "Spearheaded the design and implementation of high-performance structured trading applications for leading banks in Asia, including Bank of China and UBS, contributing to a monthly revenue of over $1 million.",
        "Optimized code and streamlined backend procedures for multiple software products within FinIQ's development environment, yielding a remarkable 15% boost in product performance coupled with a 20% reduction in maintenance time.",
        "Established a CI/CD pipeline for a large-scale web application, slashing deployment time by 80% and elevating software release reliability. Employed rigorous code reviews, load/stress testing, and diverse testing frameworks to ensure impeccable software delivery.",
      ],
      accentColor: "#446b85",
    },
  ];

  var expCard = document.createElement("div");
  expCard.id = "experience";
  var experienceList = document.createElement("ul");
  experienceList.id = "experience-list";
  expCard.appendChild(experienceList);
  var experienceItemsString = "";
  console.log(exp.length);
  for (var i = 0; i < exp.length; i++) {
    const experience = exp[i];
    var experienceDescriptionList = "";
    var techStack =
      "<span style='font-weight:600'>Tech Stack:</span> " +
      experience.technologies.join(", ");
    for (var j = 0; j < experience.details.length; j++) {
      experienceDescriptionList += `<div class='exp-item'>
      <i class="fa fa-angle-double-right experience-bullet" aria-hidden="true"></i>
      <li id='exp-point'>${experience.details[j]}</li>
      </div>`;
    }
    experienceDescriptionList += `<div class='exp-item'>
    <i class="fa fa-angle-double-right experience-bullet" aria-hidden="true"></i>
    <li id='exp-point'>${techStack}</li>
    </div>`;

    const experienceItem = `
          <li id="experience-item" style="--accent-color: ${experience.accentColor}">
            <div class="company-name">${experience.org} </div>
            <div class="title">${experience.position} <span class='exp-duration'>${experience.duration}</span></div>
            <span class='exp-location'><i class="fa fa-map-marker location-icon" aria-hidden="true"></i>&nbsp;&nbsp;${experience.location} </span>
            <div class="descr">
              ${experienceDescriptionList}
            </div>
          </li>
          `;
    experienceItemsString += experienceItem;
  }
  experienceList.innerHTML = experienceItemsString;
  var experiences = document.getElementById("exp");
  experiences.appendChild(expCard);
}
