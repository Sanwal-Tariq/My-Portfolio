// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("open");
    navLinks.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal");
const barFills = document.querySelectorAll(".bar-fill");

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    document.body.classList.add("motion-ready");

    document.querySelectorAll(".timeline, .skills-columns, .why-hire-grid, .project-list").forEach((group) => {
        group.querySelectorAll(":scope > .reveal").forEach((item, index) => {
            item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const barObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("filled");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );
    barFills.forEach((el) => barObserver.observe(el));
} else {
    revealTargets.forEach((el) => el.classList.add("in-view"));
    barFills.forEach((el) => el.classList.add("filled"));
}

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

const navWrap = document.querySelector(".nav-wrap");
const scrollProgress = document.getElementById("scrollProgress");
let scrollFrame = 0;

const updateScrollEffects = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;
    navWrap.classList.toggle("scrolled", window.scrollY > 24);
    scrollFrame = 0;
};

window.addEventListener(
    "scroll",
    () => {
        if (!scrollFrame) {
            scrollFrame = window.requestAnimationFrame(updateScrollEffects);
        }
    },
    { passive: true }
);
updateScrollEffects();

// Reveal hero title immediately on load
window.addEventListener("DOMContentLoaded", () => {
    if (!prefersReducedMotion) {
        document.querySelectorAll(".hero .reveal").forEach((el, i) => {
            setTimeout(() => el.classList.add("in-view"), 150 + i * 120);
        });
    }
});