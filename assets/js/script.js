'use strict';

// page navigation variables
const navLinks = document.querySelectorAll(".navbar-link");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const section = document.getElementById(targetId);

    if (section) {
      // Remove active from all nav links first
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active to the clicked one
      this.classList.add("active");

      // Smooth scroll
      section.scrollIntoView({ behavior: "smooth" });

      e.preventDefault();
    }
  });
}

const sections = document.querySelectorAll("section[id]");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);

    if (entry.isIntersecting && navLink && entry.intersectionRatio >= 0.4) {
      document.querySelectorAll(".navbar-link.active").forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Force highlight 'About' on load if no scroll interaction yet
window.addEventListener("load", () => {
  const aboutSection = document.getElementById("about");
  if (aboutSection && window.scrollY < 100) {
    const aboutLink = document.querySelector('.navbar-link[href="#about"]');
    if (aboutLink) {
      document.querySelectorAll(".navbar-link").forEach((link) => link.classList.remove("active"));
      aboutLink.classList.add("active");
    }
  }
});

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
}