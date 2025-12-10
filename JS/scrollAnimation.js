document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".scroll-animate");

  // mark all elements as animatable
  items.forEach(el => el.classList.add("animate"));

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observerInstance.unobserve(entry.target); // animate once
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  items.forEach(el => observer.observe(el));
});
// ===============================
// SCROLL ANIMATION – ISLAND CARDS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // stagger effect
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 120);

          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach(el => observer.observe(el));
});
