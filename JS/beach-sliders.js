// SLIDER 1
let index1 = 0;
function moveSlide(n) {
    const slides = document.querySelectorAll(".be-section:nth-of-type(1) .slide");
    slides[index1].classList.remove("active");
    index1 = (index1 + n + slides.length) % slides.length;
    slides[index1].classList.add("active");
}

// SLIDER 2
let index2 = 0;
function moveSlide2(n) {
    const slides = document.querySelectorAll(".be-section:nth-of-type(2) .slide");
    slides[index2].classList.remove("active");
    index2 = (index2 + n + slides.length) % slides.length;
    slides[index2].classList.add("active");
}
