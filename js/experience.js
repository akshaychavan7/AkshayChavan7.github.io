document.addEventListener("DOMContentLoaded", function () {
  mapExperienceData();
});

function mapExperienceData() {
  let exp = data.experience;

  var expCard = document.createElement("div");
  expCard.id = "experience";
  var experienceList = document.createElement("ul");
  experienceList.id = "experience-list";
  expCard.appendChild(experienceList);
  var experienceItemsString = "";
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
