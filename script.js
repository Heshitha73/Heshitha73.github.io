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
    smoothScrollTo(0);
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


  // =====================================
  // DYNAMIC NAVBAR SCROLL OFFSET
  // =====================================

  const siteHeader = document.querySelector("header");

  function updateNavbarHeight() {
    if (!siteHeader) return;

    const height = Math.ceil(
      siteHeader.getBoundingClientRect().height
    );

    document.documentElement.style.setProperty(
      "--nav-height",
      `${height + 8}px`
    );
  }

  updateNavbarHeight();

  window.addEventListener("resize", updateNavbarHeight);

  if (siteHeader && "ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(
      updateNavbarHeight
    );
    headerObserver.observe(siteHeader);
  }

  // Smooth, eased scrolling for all in-page links (navbar, logo and CTAs).
  // Do not intercept the user's mouse wheel / touch scrolling.
  let activeScrollFrame = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function smoothScrollTo(destination) {
    if (activeScrollFrame !== null) {
      cancelAnimationFrame(activeScrollFrame);
      activeScrollFrame = null;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const end = Math.min(Math.max(0, destination), maxScroll);
    if (prefersReducedMotion.matches) {
      window.scrollTo(0, end);
      return;
    }

    const start = window.scrollY;
    const distance = end - start;
    if (Math.abs(distance) < 2) return;
    const duration = Math.min(850, Math.max(420, Math.abs(distance) * 0.35));
    let startTime = null;

    function frame(timestamp) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) {
        activeScrollFrame = requestAnimationFrame(frame);
      } else {
        activeScrollFrame = null;
      }
    }

    activeScrollFrame = requestAnimationFrame(frame);
  }

  // If a visitor starts manual scrolling, let their gesture take over immediately.
  ["wheel", "touchstart", "keydown"].forEach(type => {
    window.addEventListener(type, () => {
      if (activeScrollFrame !== null) {
        cancelAnimationFrame(activeScrollFrame);
        activeScrollFrame = null;
      }
    }, { passive: true });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
      const hash = this.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      updateNavbarHeight();
      const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 65;
      const targetTop = hash === "#home"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
      history.pushState(null, "", hash);
      smoothScrollTo(targetTop);
    });
  });

})();