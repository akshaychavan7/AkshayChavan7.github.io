const ACHIEVEMENTS_INITIAL_VISIBLE = 6;

document.addEventListener("DOMContentLoaded", function () {
  mapAchievementsData();
});

function mapAchievementsData() {
  const achievements = data.achievements;
  const achievementsRowEle = document.getElementById("achievements-row");

  achievements.forEach((achievement, index) => {
    const achievementEle = document.createElement("div");
    achievementEle.classList.add("col-sm-4", "achievement-col");
    if (index >= ACHIEVEMENTS_INITIAL_VISIBLE) {
      achievementEle.classList.add("achievement-hidden");
    }

    let labelsHTML = "";
    for (const label of achievement.labels) {
      labelsHTML += `
        <a href="${label.link}" class="achievement-tag" target="_blank" rel="noopener noreferrer">
          <span class="label credentials-btn">
            <img class="check" src="${label.icon}" width="14" height="14" alt="" aria-hidden="true" />
            ${label.tag}
          </span>
        </a>
      `;
    }

    achievementEle.innerHTML = `
      <div class="achievement">
        <div>
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-date">${achievement.date}</div>
        </div>
        <div class="achievement-description cutoff-text">${achievement.description}</div>
        <input class="expand-btn" type="checkbox" aria-label="Expand achievement description" />
        <div class="achievement-tags">${labelsHTML}</div>
      </div>
    `;

    achievementsRowEle.appendChild(achievementEle);
  });

  // Add "Show all" toggle button if there are more than the initial visible count
  if (achievements.length > ACHIEVEMENTS_INITIAL_VISIBLE) {
    const showMoreWrapper = document.createElement("div");
    showMoreWrapper.className = "achievements-show-more";

    const showMoreBtn = document.createElement("button");
    showMoreBtn.className = "btn achievements-toggle-btn";
    showMoreBtn.textContent = `Show all ${achievements.length} achievements`;
    showMoreBtn.setAttribute("aria-expanded", "false");

    let expanded = false;
    showMoreBtn.addEventListener("click", () => {
      expanded = !expanded;
      document.querySelectorAll(".achievement-hidden").forEach(el => {
        el.style.display = expanded ? "" : "none";
      });
      showMoreBtn.textContent = expanded
        ? "Show fewer achievements"
        : `Show all ${achievements.length} achievements`;
      showMoreBtn.setAttribute("aria-expanded", String(expanded));
    });

    // Start collapsed
    document.querySelectorAll(".achievement-hidden").forEach(el => {
      el.style.display = "none";
    });

    showMoreWrapper.appendChild(showMoreBtn);
    achievementsRowEle.parentElement.appendChild(showMoreWrapper);
  }
}
