document.addEventListener("DOMContentLoaded", function () {

  // ===== Scroll Navbar Effect =====
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });


  // ===== MOBILE MENU =====
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("closeMenuBtn");
  const overlay = document.getElementById("menuOverlay");
  const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.add("show");
      overlay.classList.add("show");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

  // Mobile dropdown inside menu
  dropdownToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("open");
    });
  });


  // ===== SEARCH BAR =====
  const searchOverlay = document.getElementById("searchOverlay");
  const exploreTrigger = document.querySelector(".explore-trigger");
  const navbarSearch = document.getElementById("navbarSearch");
  const searchIcon = document.querySelector(".search-icon");

  function toggleSearch() {
    searchOverlay.classList.toggle("active");
    navbarSearch.classList.toggle("active");
  }

  if (exploreTrigger) exploreTrigger.addEventListener("click", toggleSearch);
  if (searchIcon) searchIcon.addEventListener("click", toggleSearch);

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
        navbarSearch.classList.remove("active");
      }
    });
  }

});
