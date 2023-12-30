document.addEventListener("DOMContentLoaded", function () {
  mapAchievementsData();
});

function mapAchievementsData() {
  let achievements = data.achievements;
  const achievementsRowEle = document.getElementById("achievements-row");
  for (let achievement of achievements) {
    let achievementEle = document.createElement("div");
    achievementEle.classList.add("col-sm-4");
    let labelsHTML = "";
    for (let label of achievement.labels) {
      labelsHTML += `
                    <a
                      href="${label.link}"
                      class="achievement-tag"
                      target="_blank"
                      ><span class="label credentials-btn">
                        <img
                          class="check"
                          src="${label.icon}"
                          width="14"
                          height="14"
                        />
                        ${label.tag}
                      </span>
                      </a>
                    `;
    }
    const cardInnerHTML = `
    <div class="achievement">
              <div>
                <div id="title" class="achievement-title">
                  ${achievement.title}
                </div>
                <div id="event-date" class="achievement-date">${achievement.date}</div>
              </div>
              <div id="description" class="achievement-description cutoff-text">
               ${achievement.description}
               </div>
               <input class="expand-btn" type="checkbox" />
              <div id="tags" class="achievement-tags">
              ${labelsHTML}
              </div>
            </div>
    `;
    achievementEle.innerHTML = cardInnerHTML;
    achievementsRowEle.appendChild(achievementEle);
  }
}
