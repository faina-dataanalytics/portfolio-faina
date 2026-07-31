/* =========================================================
   PORTFOLIO NAVIGATION
   Vanilla JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const SELECTORS = {

        navigation: ".site-nav",

        navigationToggle: ".site-nav__toggle",

        navigationLinks: ".site-nav a",

        smoothLinks: 'a[href^="#"]',

    };


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const navigation = document.querySelector(
        SELECTORS.navigation
    );

    const navigationToggle = document.querySelector(
        SELECTORS.navigationToggle
    );


    if (navigation && navigationToggle) {

        navigationToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navigation.classList.toggle(
                        "is-open"
                    );

                navigationToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        /* -------------------------------------------------
           CLOSE MENU AFTER CLICKING A LINK
        ------------------------------------------------- */

        const navigationLinks =
            navigation.querySelectorAll(
                "a"
            );

        navigationLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "is-open"
                    );

                    navigationToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


        /* -------------------------------------------------
           CLOSE MENU WITH ESCAPE
        ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key !== "Escape") {

                    return;

                }

                navigation.classList.remove(
                    "is-open"
                );

                navigationToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navigationToggle.focus();

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const smoothLinks =
        document.querySelectorAll(
            SELECTORS.smoothLinks
        );


    smoothLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }

                event.preventDefault();

                const prefersReducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                target.scrollIntoView({

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });


                /*
                 * Update URL without forcing
                 * another browser jump.
                 */

                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


    /* =====================================================
       PROJECT NAVIGATION
    ===================================================== */

    const projects =
        Array.from(
            document.querySelectorAll(
                ".project"
            )
        );


    if (projects.length > 0) {

        projects.forEach(
            (project, index) => {

                const previous =
                    project.querySelector(
                        ".project__previous"
                    );

                const next =
                    project.querySelector(
                        ".project__next"
                    );


                /* -----------------------------------------
                   PREVIOUS PROJECT
                ----------------------------------------- */

                if (
                    previous &&
                    index > 0
                ) {

                    const previousProject =
                        projects[index - 1];

                    const previousId =
                        previousProject.id;

                    if (previousId) {

                        previous.href =
                            `#${previousId}`;

                    }

                }


                /* -----------------------------------------
                   NEXT PROJECT
                ----------------------------------------- */

                if (
                    next &&
                    index < projects.length - 1
                ) {

                    const nextProject =
                        projects[index + 1];

                    const nextId =
                        nextProject.id;

                    if (nextId) {

                        next.href =
                            `#${nextId}`;

                    }

                }


                /* -----------------------------------------
                   FIRST PROJECT
                ----------------------------------------- */

                if (
                    index === 0 &&
                    previous
                ) {

                    previous.classList.add(
                        "project__previous--disabled"
                    );

                    previous.setAttribute(
                        "aria-disabled",
                        "true"
                    );

                    previous.removeAttribute(
                        "href"
                    );

                }


                /* -----------------------------------------
                   LAST PROJECT
                ----------------------------------------- */

                if (
                    index === projects.length - 1 &&
                    next
                ) {

                    next.classList.add(
                        "project__next--disabled"
                    );

                    next.setAttribute(
                        "aria-disabled",
                        "true"
                    );

                    next.removeAttribute(
                        "href"
                    );

                }

            }
        );

    }


    /* =====================================================
       OVERVIEW LINKS
    ===================================================== */

    const overviewLinks =
        document.querySelectorAll(
            ".project__overview"
        );


    overviewLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }

                event.preventDefault();

                const prefersReducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                target.scrollIntoView({

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });


                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        );


    externalLinks.forEach((link) => {

        /*
         * External links open in a new tab.
         * This includes GitHub, LinkedIn,
         * Tableau and other external resources.
         */

        if (
            link.hostname !==
            window.location.hostname
        ) {

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

        }

    });


    /* =====================================================
       CURRENT SECTION
       Intersection Observer
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main > section[id]"
        );


    const navigationAnchors =
        document.querySelectorAll(
            '.site-nav a[href^="#"]'
        );


    if (
        sections.length &&
        navigationAnchors.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }

                            const id =
                                entry.target.id;

                            navigationAnchors
                                .forEach(
                                    (link) => {

                                        const isActive =
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            `#${id}`;

                                        link.classList.toggle(
                                            "is-active",
                                            isActive
                                        );

                                    }
                                );

                        }
                    );

                },
                {

                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0

                }
            );


        sections.forEach(
            (section) => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       BACK / FORWARD BROWSER NAVIGATION
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const targetId =
                window.location.hash;

            if (!targetId) {

                return;

            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {

                return;

            }

            const prefersReducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            target.scrollIntoView({

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",

                block: "start"

            });

        }
    );

});
