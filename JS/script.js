document.addEventListener("DOMContentLoaded", function () {

  /* ============================
        SCROLL NAVBAR EFFECT
  ==============================*/
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ============================
        MOBILE MENU
  ==============================*/
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("closeMenuBtn");
  const overlay = document.getElementById("menuOverlay");

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

  document.querySelectorAll(".mobile-dropdown-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("open");
    });
  });

  /* ============================
   SEARCH OVERLAY 
==============================*/

  const searchOverlay = document.getElementById("searchOverlay");
  const navbarSearch = document.getElementById("navbarSearch");
  const searchField = document.querySelector(".search-field");
  const exploreTrigger = document.querySelector(".explore-trigger");
  const searchIcon = document.querySelector(".search-icon");

  function toggleSearch() {
    if (!searchOverlay || !navbarSearch) return;

    // Toggle active states
    searchOverlay.classList.toggle("active");
    navbarSearch.classList.toggle("active");

    // If search is now open → FOCUS cursor automatically
    if (navbarSearch.classList.contains("active")) {
      setTimeout(() => {
        if (searchField) searchField.focus();
      }, 250); // wait for animation to finish
    }
  }

  // CLICK EVENTS
  if (exploreTrigger) {
    exploreTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSearch();
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", toggleSearch);
  }

  // CLOSE WHEN CLICKING OUTSIDE
  if (searchOverlay && navbarSearch) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
        navbarSearch.classList.remove("active");
      }
    });
  }

  /* ============================
      MEGA DROPDOWN (ISLANDS)
  ==============================*/
  const megaMenu = document.querySelector(".mega-menu");
  const dropdownMega = document.querySelector(".dropdown-mega");
  const megaDropdown = document.querySelector("#megaDropdown");

  if (dropdownMega && megaMenu) {
    dropdownMega.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      megaMenu.classList.add("show");
    });
    let hideTimeout;

    dropdownMega.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        megaMenu.classList.remove("show");
      }, 200);
    });
  }

  if (megaDropdown) {
    megaDropdown.addEventListener("click", (e) => {
      e.preventDefault();
      megaMenu.classList.remove("show");

      const section = document.getElementById("islands");
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  }

  document.querySelectorAll(".mega-links a").forEach(link => {
    link.addEventListener("click", () => megaMenu.classList.remove("show"));
  });

  /* ============================
        SMOOTH SCROLL
  ==============================*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.id === "megaDropdown") return;

    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const el = document.getElementById(targetId);

      if (!el) return;

      e.preventDefault();
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  /* ============================
        BIG SLIDER (desktop + mobile swipe)
  ==============================*/
  function initSlider(rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const slides = Array.from(root.querySelectorAll(".big-slide"));
    const prev = root.querySelector(".big-prev");
    const next = root.querySelector(".big-next");

    let idx = 0;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("active", k === idx));
    }

    // Desktop arrows
    if (next) next.addEventListener("click", () => show(idx + 1));
    if (prev) prev.addEventListener("click", () => show(idx - 1));

    // Swipe support
    let startX = 0;

    root.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    root.addEventListener("touchend", (e) => {
      let dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) show(idx - 1);
      if (dx < -40) show(idx + 1);
    });

    show(idx);
  }

  initSlider("waysSlider");
  initSlider("staySlider");

  /* ============================
        FIX CTA BUTTONS
  ==============================*/
  document.querySelectorAll(".btn-ghost").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (btn.getAttribute("href") === "#" || !btn.getAttribute("href")) {
        e.preventDefault();
      }
    });
  });

  /* ============================
      MOBILE MENU CLOSE ON CLICK
  ==============================*/
  document.querySelectorAll(".mobile-nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      overlay.classList.remove("show");
    });
  });

});
/* ============================
   MAP SWITCHER
============================ */
// MAP SWITCHER (put inside DOMContentLoaded)
(function () {
  const mainMap = document.getElementById('mainMap');
  const mapCaption = document.getElementById('mapCaption');
  const islandButtons = Array.from(document.querySelectorAll('.island-item'));
  const resetBtn = document.getElementById('resetMap');

  if (!mainMap || islandButtons.length === 0) return;

  function setActive(button) {
    islandButtons.forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
    });
  }

  function showMap(imageSrc, name) {
    // small fade swap
    mainMap.style.opacity = 0;
    setTimeout(() => {
      mainMap.src = imageSrc;
      mainMap.alt = `${name} map`;
      mapCaption.textContent = name;
      mainMap.style.opacity = 1;
    }, 180);
  }

  // click/keyboard handlers
  islandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.getAttribute('data-image');
      const name = btn.getAttribute('data-name') || 'Island';
      setActive(btn);
      showMap(img, name);
    });

    // keyboard accessible (Enter / Space)
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // reset to default
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const defaultBtn = document.querySelector('.island-item[data-name="Lakshadweep"]');
      if (defaultBtn) defaultBtn.click();
      else {
        // fallback
        const defaultSrc = 'utilities/pictures/maps/lakshadweep-map.webp';
        showMap(defaultSrc, 'Lakshadweep');
        setActive(null);
      }
    });
  }
})();
// Slide animation//
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scroll-animate");

  function revealOnScroll() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // initial check
});
// ===============================
// EXPERIENCES SLIDER LOGIC
// ===============================
(() => {
  const track = document.querySelector(".exp-track");
  const cards = document.querySelectorAll(".exp-card");
  const prev = document.querySelector(".exp-btn.prev");
  const next = document.querySelector(".exp-btn.next");

  let index = 0;

  function update() {
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  next.addEventListener("click", () => {
    if (index < cards.length - 1) {
      index++;
      update();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });
})();
