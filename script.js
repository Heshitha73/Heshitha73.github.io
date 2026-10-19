
(function () {
  "use strict";

  // =====================================
  // 1. DARK / LIGHT THEME
  // =====================================

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme");

  function isDark() {
    const theme = root.getAttribute("data-theme");
    return theme ? theme === "dark" : true;
  }

  function updateThemeButton() {
    if (themeBtn) {
      themeBtn.textContent = isDark() ? "Light" : "Dark";
    }
  }

  try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      root.setAttribute("data-theme", savedTheme);
    }
  } catch (error) {
    console.warn("Theme storage unavailable");
  }

  updateThemeButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const newTheme = isDark() ? "light" : "dark";

      root.setAttribute("data-theme", newTheme);

      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Could not save theme");
      }

      updateThemeButton();
    });
  }

  // =====================================
  // 2. TYPING TEXT ANIMATION
  // =====================================

  const typedText = document.getElementById("typed");

  const roles = [
    "Cyber Security Undergraduate",
    "Ethical hacker",
    "Intern"
  ];

  if (typedText) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      let roleIndex = 0;
      let charIndex = roles[0].length;
      let deleting = false;

      function typeAnimation() {
        const currentRole = roles[roleIndex];

        typedText.textContent = currentRole.substring(
          0,
          charIndex
        );

        let speed = deleting ? 35 : 75;

        if (!deleting && charIndex === currentRole.length) {
          deleting = true;
          speed = 1800;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          speed = 350;
        } else {
          charIndex += deleting ? -1 : 1;
        }

        setTimeout(typeAnimation, speed);
      }

      typeAnimation();
    } else {
      typedText.textContent = roles[0];
    }
  }

  // =====================================
  // 3. AUTOMATIC COPYRIGHT YEAR
  // =====================================

  const yearElement = document.getElementById("yr");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =====================================
  // 4. CONTACT FORM
  // =====================================

  const contactForm = document.getElementById("form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = contactForm.elements["name"].value.trim();
      const email = contactForm.elements["email"].value.trim();
      const subject = contactForm.elements["subject"].value.trim();
      const message = contactForm.elements["message"].value.trim();

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const recipient = "heshithaprabhashana@gmail.com";

      const emailBody =
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message;

      const mailtoLink =
        "mailto:" + recipient +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(emailBody);

      window.location.href = mailtoLink;
    });
  }


// =====================================
// BACK TO TOP BUTTON
// =====================================

const backToTop = document.getElementById("backToTop");
const heroSection = document.querySelector(".hero");

if (backToTop && heroSection) {

  function toggleBackToTop() {
    const heroBottom =
      heroSection.getBoundingClientRect().bottom;

    // Show button after scrolling past hero
    if (heroBottom <= 0) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, {
    passive: true
  });

  window.addEventListener("resize", toggleBackToTop);

  // Check initial scroll position
  toggleBackToTop();

  // Smooth scroll to top
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "instant" : "smooth"
    });
  });

}

})();
