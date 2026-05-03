/// Incase needed in future - problem with click
// $(document).scroll(function () {
//     var up = document.getElementById("up");
//     var y = $(this).scrollTop();
//     if (y > 800) {
//         up.className = "up show";
//         $("#up").fadeIn();
//     } else {
//         up.className = "up hide";
//         $("#up").fadeOut();
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
  scrollToTop();
  aosInit();
  setupLoader();
  getVisitorsCount();
  setupNavbarScrollBehavior();

  window.onscroll = function () {
    $(document).on("scroll", onScroll);

    //smooth scroll
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      $target = $(target);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top + 2,
          },
          1000,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  };
});

// get counts
// https://script.google.com/macros/s/AKfycby4FMdRgqHIUllxL1Mp8V-v07rjHW7gEX_2BgQw2b8NwZc6klvsLll_PP0mjKLOY4j7/exec
// set counts
// https://script.google.com/macros/s/AKfycbyhlPqoatdrK_al85GTjraRpt5BYQi4ZnoY8xU8Skg7nBVy0tLaqlZPnJTaQjM2bUwy/exec?totalCount=20&uniqueCount=5&resumeDownloadCount=1

function getVisitorsCount() {
  const url =
    "https://script.google.com/macros/s/AKfycbzdYjCNOUhUo2lORHPhrocXh_xACWqfXO-1ehzV0Eo53MmnWUZVKZhlaKzIgRLsTftT/exec";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem("counts", result);
      countsObj = JSON.parse(result);
      document.getElementById("visitor-count").innerHTML =
        countsObj["Total Count"] + 1;

      let uniqueCount = countsObj["Unique Count"];
      let resumeDownloadCount = countsObj["Resume Download Count"];
      if (localStorage.getItem("previouslyVisited") === null) {
        uniqueCount += 1;
        localStorage.setItem("previouslyVisited", true);
      }

      let totalCount = countsObj["Total Count"] + 1;
      localStorage.setItem(
        "counts",
        `{"Total Count":${totalCount},"Unique Count":${uniqueCount},"Resume Download Count":${resumeDownloadCount}}`
      );
      // set new values for all the counts
      setUpdatedCounts(totalCount, uniqueCount, resumeDownloadCount);

      // console.log(
      //   "Total Visitors Counts:",
      //   countsObj["Total Count"] + 1,
      //   "\nUnique Visitors Count:",
      //   uniqueCount,
      //   "\nResume Downloads Count:",
      //   resumeDownloadCount
      // );
    })
    .catch((error) => console.log("error", error));
}

function setUpdatedCounts(totalCount, uniqueCount, resumeDownloadCount) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const url = `https://script.google.com/macros/s/AKfycbyhlPqoatdrK_al85GTjraRpt5BYQi4ZnoY8xU8Skg7nBVy0tLaqlZPnJTaQjM2bUwy/exec?totalCount=${totalCount}&uniqueCount=${uniqueCount}&resumeDownloadCount=${resumeDownloadCount}`;
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {})
    .catch((error) => console.log("error", error));
}

function scrollToTop() {
  // scroll to top
  $("#up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
    return false;
  });

  $("#brand").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
    return false;
  });
}

function aosInit() {
  // fade in's animation
  AOS.init({
    easing: "ease",
    duration: 1200,
    once: true,
  });
}

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $("#navbar-menu a").each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (
      refElement.position().top <= scrollPos &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $("#navbar-menu ul li a").removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

function downloadResume() {
  const countsObj = JSON.parse(localStorage.getItem("counts"));
  setUpdatedCounts(
    countsObj["Total Count"],
    countsObj["Unique Count"],
    countsObj["Resume Download Count"] + 1
  );
  window.open("images/others/Akshay_Chavan_Resume.pdf", "_blank");
}

function setupNavbarScrollBehavior() {
  const navbar = document.getElementById("app-navbar");
  if (!navbar) return;
  const onNavScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };
  window.addEventListener("scroll", onNavScroll, { passive: true });
  onNavScroll(); // apply correct state on load
}

function setupLoader() {
  const loader = document.getElementById("loader");
  const bgCircle = document.getElementById("bg-circle");
  setTimeout(() => {
    loader.style.display = "none";
    bgCircle.classList.remove("grad-circle");
    setTimeout(() => {
      bgCircle.classList.add("grad-circle");
    }, 100);
  }, 3000);
}
