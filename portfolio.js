// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
    });
});

// Custom cursor
const cursorDot = document.getElementById("cursorDot");
if (cursorDot) {
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => cursorDot.classList.add("grow"));
        el.addEventListener("mouseleave", () => cursorDot.classList.remove("grow"));
    });
}

// Scroll reveal + skill bar fill
const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const barFills = document.querySelectorAll(".bar-fill");
const barObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("filled");
                barObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.4 }
);
barFills.forEach((el) => barObserver.observe(el));

// Reveal hero title immediately on load
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".hero .reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("in-view"), 150 + i * 120);
    });
});