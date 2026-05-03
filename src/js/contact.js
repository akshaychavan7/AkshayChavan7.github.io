document.addEventListener("DOMContentLoaded", function () {
    mapContactDetails();
    currentDate();
});

function mapContactDetails() {
    const contactInfo = data.contactInfo;

    for (let i = 0; i < contactInfo.length; i++) {
        const c = contactInfo[i];
        const icon = c.icon;
        const label = c.label;
        const link = c.link;

        const card = document.createElement("a");
        card.className = "contact-card";
        card.href = link;
        card.target = "_blank";

        const isImage = icon.startsWith("images/");
        const iconDiv = isImage ? document.createElement("img") : document.createElement("i");
        if (isImage) {
            iconDiv.src = icon;
            iconDiv.style.height = "24px";
            iconDiv.alt = label;
        } else {
            iconDiv.className = icon;
        }
        iconDiv.className = (iconDiv.className ? iconDiv.className + " " : "") + "contact-icon";
        iconDiv.setAttribute("aria-hidden", "true");

        const labelDiv = document.createElement("span");
        labelDiv.className = "body2 contact-label";
        labelDiv.textContent = label;

        const chevDiv = document.createElement("i");
        chevDiv.className = "fa fa-chevron-right contact-chevron";
        chevDiv.setAttribute("aria-hidden", "true");

        card.appendChild(iconDiv);
        card.appendChild(labelDiv);
        card.appendChild(chevDiv);

        const contactInfoDiv = document.getElementById("contact-info-div");
        contactInfoDiv.insertBefore(card, contactInfoDiv.firstChild);
    }
}

function onMeetClick() {
    window.open("https://calendly.com/akshaychavan7/30min", '_blank');
}

function currentDate() {
    const current = new Date();
    const monthName = current.toLocaleDateString('en-US', { month: "long" });
    const date = current.getDate();
    const dayName = current.toLocaleDateString('en-US', { weekday: "long" });

    document.getElementById("month").textContent = monthName;
    document.getElementById("date").textContent = date;
    document.getElementById("day").textContent = dayName;
}
