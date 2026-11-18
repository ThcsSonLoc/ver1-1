
// LẤY CÁC PHẦN TỬ
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");


// HIỆU ỨNG HEADER KHI CUỘN
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        backToTop.classList.add("show");
    } else {
        header.classList.remove("scrolled");
        backToTop.classList.remove("show");
    }
});


// MENU MOBILE
menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("show");

    menuToggle.innerHTML = navbar.classList.contains("show")
        ? "✕"
        : "☰";
});


// ĐÓNG MENU KHI CLICK VÀO LINK
document.querySelectorAll(".navbar a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("show");
        menuToggle.innerHTML = "☰";
    });
});


// NÚT QUAY LẠI ĐẦU TRANG
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ACTIVE MENU KHI CUỘN TRANG
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// HIỆU ỨNG HIỆN NỘI DUNG KHI CUỘN
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".intro-content, .architecture-card, .timeline-item, .visit-content"
).forEach(function (element) {
    element.classList.add("reveal");
    observer.observe(element);
});


// THÊM CSS CHO HIỆU ỨNG REVEAL
const revealStyle = document.createElement("style");

revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(revealStyle);
