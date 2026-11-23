/* ==========================================================
   Refined Care Services - shared site script
   Used by every page (Home.html and the inner pages).
   Each block checks that its elements exist, so one file
   works everywhere.
   ========================================================== */
(function () {
    'use strict';

    var header = document.getElementById('siteHeader');
    var toggle = document.querySelector('.navToggle');
    var nav = document.getElementById('primaryNav');
    var toTop = document.querySelector('.backToTop');

    /* sticky header shadow + back-to-top visibility */
    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (header) header.classList.toggle('active', y > 10);
        if (toTop) toTop.classList.toggle('show', y > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* mobile menu */
    if (header && toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = header.classList.toggle('navOpen');
            toggle.setAttribute('aria-expanded', open);
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                header.classList.remove('navOpen');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* home hero dots */
    var dots = document.querySelectorAll('.bannerDots button');
    dots.forEach(function (d) {
        d.addEventListener('click', function () {
            dots.forEach(function (x) { x.classList.remove('active'); });
            d.classList.add('active');
        });
    });

    /* tap to reveal service overlays on touch devices */
    document.querySelectorAll('.section-img-secondary-container').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('tapped'); });
    });

    /* accordion (vacancies page) */
    document.querySelectorAll('.accordion-button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            var open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !open);
            btn.classList.toggle('collapsed', open);
            if (panel) panel.classList.toggle('open', !open);
        });
    });

    /* cookie bar */
    var bar = document.getElementById('cookieBar');
    var ok = document.getElementById('cookieOk');
    if (bar && ok) {
        try { if (localStorage.getItem('rcsCookies') === '1') bar.classList.add('hide'); } catch (e) {}
        ok.addEventListener('click', function () {
            bar.classList.add('hide');
            try { localStorage.setItem('rcsCookies', '1'); } catch (e) {}
        });
    }

    /* enquiry forms (front-end only - connect to your own form handler when going live) */
    document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
        var status = form.querySelector('.form-status');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }
            if (status) status.textContent = 'Thank you - your enquiry has been received. We will be in touch shortly.';
            form.reset();
        });
    });
})();
