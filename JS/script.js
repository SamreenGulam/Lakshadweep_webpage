document.addEventListener("DOMContentLoaded", function () {

  // ===== Scroll Navbar Effect =====
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ===== MOBILE MENU =====
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("closeMenuBtn");
  const overlay = document.getElementById("menuOverlay");
  const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

  if (toggleBtn && mobileMenu && overlay) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.add("show");
      overlay.classList.add("show");
    });
  }

  if (closeBtn && mobileMenu && overlay) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

  if (overlay && mobileMenu) {
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

  // ===== SEARCH BAR OVERLAY =====
  const searchOverlay = document.getElementById("searchOverlay");
  const exploreTrigger = document.querySelector(".explore-trigger");
  const navbarSearch = document.getElementById("navbarSearch");
  const searchIcon = document.querySelector(".search-icon");

  function toggleSearch() {
    if (!searchOverlay || !navbarSearch) return;
    searchOverlay.classList.toggle("active");
    navbarSearch.classList.toggle("active");
  }

  if (exploreTrigger) exploreTrigger.addEventListener("click", toggleSearch);
  if (searchIcon) searchIcon.addEventListener("click", toggleSearch);

  if (searchOverlay && navbarSearch) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
        navbarSearch.classList.remove("active");
      }
    });
  }

  // ===== MEGA DROPDOWN (Islands) – hover to open, click to close + scroll =====
  const dropdownMega = document.querySelector(".dropdown-mega");
  const megaDropdown = document.getElementById("megaDropdown");
  const megaMenu = document.querySelector(".mega-menu");

  if (dropdownMega && megaDropdown && megaMenu) {

    // Show on hover (desktop)
    dropdownMega.addEventListener("mouseenter", () => {
      megaMenu.classList.add("show");
    });

    dropdownMega.addEventListener("mouseleave", () => {
      megaMenu.classList.remove("show");
    });

    // Click "Islands" → close menu + scroll to islands section
    megaDropdown.addEventListener("click", (e) => {
      e.preventDefault();

      megaMenu.classList.remove("show"); // close dropdown

      const islandsSection = document.getElementById("islands");
      if (islandsSection) {
        const offsetTop = islandsSection.offsetTop - 80; // adjust nav height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });

    // Optional: clicking any island name closes menu
    document.querySelectorAll(".mega-links a").forEach(link => {
      link.addEventListener("click", () => {
        megaMenu.classList.remove("show");
      });
    });
  }

  // ===== Smooth scroll for other in-page links (except megaDropdown which we already handled) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.id === "megaDropdown") return; // Islands already handled above

    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const offsetTop = targetEl.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
    // ===== TRAVEL SLIDER 1: WAYS TO GET HERE =====
  const waysSlides = document.querySelectorAll(".travel-slide-ways");
  const waysPrev = document.querySelector(".travel-prev-ways");
  const waysNext = document.querySelector(".travel-next-ways");

  if (waysSlides.length && waysPrev && waysNext) {
    let waysIndex = 0;

    function showWaysSlide(index) {
      waysSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    waysNext.addEventListener("click", () => {
      waysIndex = (waysIndex + 1) % waysSlides.length;
      showWaysSlide(waysIndex);
    });

    waysPrev.addEventListener("click", () => {
      waysIndex = (waysIndex - 1 + waysSlides.length) % waysSlides.length;
      showWaysSlide(waysIndex);
    });
  }

  // ===== TRAVEL SLIDER 2: STAY OPTIONS =====
  const staySlides = document.querySelectorAll(".travel-slide-stay");
  const stayPrev = document.querySelector(".travel-prev-stay");
  const stayNext = document.querySelector(".travel-next-stay");

  if (staySlides.length && stayPrev && stayNext) {
    let stayIndex = 0;

    function showStaySlide(index) {
      staySlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    stayNext.addEventListener("click", () => {
      stayIndex = (stayIndex + 1) % staySlides.length;
      showStaySlide(stayIndex);
    });

    stayPrev.addEventListener("click", () => {
      stayIndex = (stayIndex - 1 + staySlides.length) % staySlides.length;
      showStaySlide(stayIndex);
    });
  }



});
megaMenu.addEventListener("mouseleave", () => {
  megaMenu.classList.remove("hide");
});