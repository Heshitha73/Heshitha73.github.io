// ===== TYPEWRITER EFFECT =====
const lines = [
  "who_am_i",
  "cybersec_student",
  "ethical_hacker",
  "cloud_security",
  "interner"
];

let lineIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById("typewriter");

function type() {
  const current = lines[lineIndex];
  if (!deleting) {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ===== MOBILE NAV TOGGLE =====
document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

// Close mobile nav on link click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  ".skill-card, .cert-card, .project-card, .timeline-item, .about-grid, .contact-grid"
);

fadeEls.forEach(el => el.classList.add("fade-in"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector("button[type=submit]");
  btn.textContent = "MESSAGE SENT ✓";
  btn.style.borderColor = "#00ff88";
  btn.style.color = "#00ff88";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "SEND MESSAGE ›";
    btn.disabled = false;
    btn.style.borderColor = "";
    btn.style.color = "";
    this.reset();
  }, 3000);
});
