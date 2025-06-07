document.addEventListener("DOMContentLoaded", function () {
  mapCertificationsData();
});

function mapCertificationsData() {
  let certifications = data.certifications;

  for (var i = 0; i < certifications.length; i++) {
    var certification = certifications[i];
    var title = certification.title;
    var issued_by = certification.issued_by;
    var image = certification.image;
    var credential = certification.credential;

    var card = document.createElement("div");
    card.className = "certification-card";

    var imageDiv = document.createElement("div");
    imageDiv.className = "c-image";

    var certificationImg = document.createElement("img");
    certificationImg.className = "c-image-bg";
    certificationImg.src = image;
    certificationImg.alt = title;

    imageDiv.appendChild(certificationImg);

    var certificationName = document.createElement("p");
    certificationName.className = "body1 c-title";
    certificationName.innerHTML = title;

    var labels = document.createElement("div");
    labels.className = "c-labels";

    var label = document.createElement("a");
    label.className = "c-label";
    var labelIcon = document.createElement("img");
    switch (issued_by) {
      case "AWS":
        labelIcon.src = "images/certifications/icons/aws.png";
        break;
      case "CodePath":
        labelIcon.src = "images/certifications/icons/codepath.png";
        break;
      case "Google":
        labelIcon.src = "images/certifications/icons/google.png";
        break;
      case "Udemy":
        labelIcon.src = "images/certifications/icons/udemy.png";
        break;
      case "LinkedIn":
        labelIcon.src = "images/certifications/icons/linkedin.png";
        break;
      case "IIT, Kharagpur":
        labelIcon.src = "images/certifications/icons/iit.png";
        break;
      case "Oracle":
        labelIcon.src = "images/certifications/icons/oracle.png";
        break;
    }
    labelIcon.classList.add("certification-logo");
    labelIcon.width = "12";
    labelIcon.height = "12";
    var labelText = document.createElement("span");
    labelText.className = "label c-label-text";
    labelText.innerHTML = issued_by;

    label.appendChild(labelIcon);
    label.appendChild(labelText);

    const verifyCredentials = document.createElement("a");
    verifyCredentials.href = credential;
    verifyCredentials.classList.add("c-label");
    verifyCredentials.target = "_blank";
    verifyCredentials.innerHTML = `<span class='label credentials-btn'>
    <img class='check' src="images/certifications/icons/check.png" width='14' height='14' />
    View Credentials
    </span>`;

    labels.appendChild(label);
    labels.appendChild(verifyCredentials);

    card.appendChild(certificationImg);
    card.appendChild(certificationName);
    card.appendChild(labels);

    var certificationsDiv = document.getElementById("certifications");
    certificationsDiv.appendChild(card);
  }
}
