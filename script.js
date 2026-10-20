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
  if (!themeBtn) return;

  const dark = isDark();
  const themeLabel = themeBtn.querySelector(".theme-label");

  // Update label without removing SVG icons
  if (themeLabel) {
    themeLabel.textContent = dark ? "Dark" : "Light";
  }

  // Accessibility
  themeBtn.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeBtn.setAttribute(
    "title",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
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

  
// ========================================
// BACK TO TOP - MOBILE OPTIMIZED
// ========================================

const backToTop = document.getElementById("backToTop");
const hero = document.querySelector(".hero");

if (backToTop && hero) {
  let ticking = false;

  function updateBackToTop() {
    const heroBottom =
      hero.getBoundingClientRect().bottom;

    const isVisible = heroBottom <= 0;

    backToTop.classList.toggle("show", isVisible);
    backToTop.setAttribute(
      "aria-hidden",
      String(!isVisible)
    );

    backToTop.tabIndex = isVisible ? 0 : -1;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateBackToTop);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, {
    passive: true
  });

  window.addEventListener("resize", onScroll);

  updateBackToTop();

  backToTop.addEventListener("click", function () {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
}


// =====================================
// MOBILE NAVIGATION MENU
// =====================================

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

  function setMenuOpen(isOpen) {
    mobileNav.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("open");
    setMenuOpen(!isOpen);
  });

  // Close menu after clicking a navigation link
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Close when clicking outside
  document.addEventListener("click", event => {
    if (
      !menuToggle.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  // Close using Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  // Reset when switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setMenuOpen(false);
    }
  });
}


  // =====================================
  // CONTACT FORM - AJAX SUBMISSION
  // =====================================

  const contactForm = document.getElementById("form");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const submitBtn = contactForm.querySelector(
        'button[type="submit"]'
      );

      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      formStatus.textContent = "Sending your message...";
      formStatus.className = "form-status sending";

      try {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(
          "https://formsubmit.co/ajax/heshithaprabhashana@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
          }
        );

        const result = await response.json();

        if (!response.ok || result.success === false ||
            result.success === "false") {
          throw new Error(result.message || "Submission failed");
        }

        formStatus.textContent =
          "Message sent successfully! Thank you for contacting me.";

        formStatus.className = "form-status success";

        contactForm.reset();

      } catch (error) {
        console.error("Contact form error:", error);

        formStatus.textContent =
          "Failed to send message. Please try again.";

        formStatus.className = "form-status error";

      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  }


  // =====================================
  // COPY EMAIL ADDRESS
  // =====================================

  document.querySelectorAll(".copy-email").forEach(button => {
    button.addEventListener("click", async () => {
      const email = button.dataset.email;
      const label = button.querySelector("span");

      if (!email || !label) return;

      try {
        await navigator.clipboard.writeText(email);

        label.textContent = "Copied!";
        button.classList.add("copied");

        clearTimeout(button.copyTimer);

        button.copyTimer = setTimeout(() => {
          label.textContent = "Copy";
          button.classList.remove("copied");
        }, 2000);

      } catch (error) {
        console.error("Email copy failed:", error);
        label.textContent = "Copy failed";
      }
    });
  });


})();