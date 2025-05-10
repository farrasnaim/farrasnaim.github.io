'use strict';




// sidebar toggle functionality for mobile



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}

if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    select.classList.toggle("active");
  });
}

// add event in all select items
if (select && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      select.classList.remove("active");
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



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
  threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const sectionId = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);

    if (entry.isIntersecting && navLink && entry.intersectionRatio >= 0.4) {
      document.querySelectorAll('.navbar-link.active').forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Force highlight 'About' on load if no scroll interaction yet
window.addEventListener("load", () => {
  const aboutSection = document.getElementById("about");
  if (aboutSection && window.scrollY < 100) {
    const aboutLink = document.querySelector('.navbar-link[href="#about"]');
    if (aboutLink) {
      document.querySelectorAll('.navbar-link').forEach(link => link.classList.remove('active'));
      aboutLink.classList.add('active');
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