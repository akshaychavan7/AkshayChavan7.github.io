document.addEventListener("DOMContentLoaded", function () {
  mapExperienceData();
});

function mapExperienceData() {
  const exp = data.experience;

  const expCard = document.createElement("div");
  expCard.id = "experience";
  const experienceList = document.createElement("ul");
  experienceList.id = "experience-list";
  expCard.appendChild(experienceList);
  let experienceItemsString = "";

  for (let i = 0; i < exp.length; i++) {
    const experience = exp[i];
    let experienceDescriptionList = "";
    const techStack =
      "<span style='font-weight:600'>Tech Stack:</span> " +
      experience.technologies.join(", ");

    for (let j = 0; j < experience.details.length; j++) {
      experienceDescriptionList += `<div class='exp-item'>
      <span class="exp-bullet-dot" aria-hidden="true"></span>
      <li class='exp-point'>${experience.details[j]}</li>
      </div>`;
    }
    experienceDescriptionList += `<div class='exp-item exp-tech-stack-item'>
    <span class="exp-bullet-dot exp-bullet-dot--tech" aria-hidden="true"></span>
    <li class='exp-point'>${techStack}</li>
    </div>`;

    const experienceItem = `
          <li class="experience-item" style="--accent-color: ${experience.accentColor}">
            <div class="company-name">${experience.org}</div>
            <div class="title">${experience.position} <span class='exp-duration'>${experience.duration}</span></div>
            <span class='exp-location'><i class="fa fa-map-marker location-icon" aria-hidden="true"></i>&nbsp;&nbsp;${experience.location}</span>
            <div class="descr">
              ${experienceDescriptionList}
            </div>
          </li>
          `;
    experienceItemsString += experienceItem;
  }
  experienceList.innerHTML = experienceItemsString;
  const experiences = document.getElementById("exp");
  experiences.appendChild(expCard);
}
