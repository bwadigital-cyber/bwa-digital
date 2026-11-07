
/* =========================================
   BWA DIGITAL — INTERACTIVE EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 01. MOBILE NAVIGATION

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    // 02. HEADER SCROLL EFFECT

    const header = document.querySelector(".header");

    function updateHeader() {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // 03. ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll("section[id]");

    if (sections.length && navItems.length) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;

                        navItems.forEach(link => {
                            const isActive =
                                link.getAttribute("href") === `#${currentId}`;

                            link.classList.toggle("active", isActive);
                        });
                    }

                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // 04. SCROLL REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(
        ".service-card, .project-card, .process-card, .price-card, .why-item"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");

            revealObserver.observe(element);
        });

    }


    // 05. CURRENT YEAR

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 06. FAQ ACCORDION

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (item.open) {

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {
                        otherItem.open = false;
                    }

                });

            }

        });

    });


    // 07. CONSOLE BRANDING

    console.log(
        "%c BWA DIGITAL ",
        "background:#00DDF5;color:#050D1B;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c Pages · Websites · Digital Marketing ",
        "color:#00DDF5;font-size:12px;"
    );

});


// PACKAGE SELECTION
document.querySelectorAll(".package-select").forEach(button => {
    button.addEventListener("click", () => {
        const selectedPackage = button.dataset.package;
        const packageField = document.getElementById("selected-package");

        if (packageField) {
            packageField.value = selectedPackage;
        }
    });
});
