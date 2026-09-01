/* risvy.github.io
   Small, dependency-free behaviours: masthead state, sliding nav indicator,
   mobile menu, scroll-drawn research sketches, section reveals, disclosures
   with copy, lightbox, local time, footer year. */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* Opening load-in */
  window.setTimeout(function () { root.classList.add("is-ready"); }, 30);

  /* Masthead hairline once the page has scrolled */
  var masthead = $(".masthead");
  if (masthead) {
    var onScroll = function () {
      masthead.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Sliding indicator under the navigation */
  var nav = $(".nav");
  var navList = $(".nav-list");
  var indicator = $(".nav-indicator");
  if (nav && navList && indicator) {
    var current = navList.querySelector('a[aria-current="page"]');
    var moveTo = function (a) {
      if (!a) { indicator.style.opacity = "0"; return; }
      var r = a.getBoundingClientRect();
      var n = nav.getBoundingClientRect();
      indicator.style.transform = "translateX(" + (r.left - n.left) + "px)";
      indicator.style.width = r.width + "px";
      indicator.style.opacity = "1";
    };
    var settle = function () { moveTo(current); };
    $$("a", navList).forEach(function (a) {
      a.addEventListener("mouseenter", function () { moveTo(a); });
      a.addEventListener("focus", function () { moveTo(a); });
    });
    navList.addEventListener("mouseleave", settle);
    navList.addEventListener("focusout", function (e) {
      if (!navList.contains(e.relatedTarget)) settle();
    });
    window.addEventListener("resize", settle);
    if (doc.fonts && doc.fonts.ready) { doc.fonts.ready.then(settle); }

    /* First placement is instant; sliding starts after it has been painted. */
    indicator.style.transition = "none";
    settle();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { indicator.style.transition = ""; });
    });
  }

  /* Mobile menu */
  var toggle = $(".menu-toggle");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      doc.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* Section hairlines and figure reveals */
  var revealTargets = $$(".section, [data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    revealTargets.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* Research sketches drawn as the reader moves through the steps */
  var scrolly = $("[data-scrolly]");
  if (scrolly) {
    var steps = $$(".step", scrolly);
    var sketches = $$(".sketch", scrolly);

    sketches.forEach(function (sketch) {
      var order = 0;
      $$(".stroke", sketch).forEach(function (path) {
        var len = 0;
        try { len = path.getTotalLength(); } catch (err) { len = 0; }
        if (!len) return;
        path.style.setProperty("--len", String(Math.ceil(len) + 2));
        path.style.setProperty("--d", (order * 0.18) + "s");
        order += 1;
      });
    });

    var activeIndex = -1;
    var setActive = function (index) {
      activeIndex = index;
      steps.forEach(function (step, i) { step.classList.toggle("is-active", i === index); });
      sketches.forEach(function (sketch, i) {
        sketch.classList.toggle("is-drawn", i <= index);
        sketch.classList.toggle("is-current", i === index);
      });
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setActive(steps.length - 1);
      steps.forEach(function (s) { s.classList.add("is-active"); });
    } else {
      var stepIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(steps.indexOf(entry.target));
        });
      }, { rootMargin: "-40% 0px -45% 0px", threshold: 0 });
      steps.forEach(function (s) { stepIO.observe(s); });

      /* Draw the first sketch as soon as the section comes into view. */
      var startIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && activeIndex < 0) { setActive(0); startIO.disconnect(); }
        });
      }, { threshold: 0.2 });
      startIO.observe(scrolly);

      /* Keep the last sketch drawn once the reader has passed the steps. */
      var tail = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) setActive(steps.length - 1);
        });
      }, { threshold: 0 });
      if (steps.length) tail.observe(steps[steps.length - 1]);
    }
  }

  /* Disclosures (abstract, BibTeX) */
  $$("[data-toggle]").forEach(function (btn) {
    var target = doc.getElementById(btn.getAttribute("data-toggle"));
    if (!target) return;
    btn.addEventListener("click", function () {
      var open = !target.classList.contains("is-open");
      target.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* Copy to clipboard */
  $$("[data-copy]").forEach(function (btn) {
    var source = doc.getElementById(btn.getAttribute("data-copy"));
    if (!source || !navigator.clipboard) return;
    var idle = btn.textContent;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(source.textContent.trim()).then(function () {
        btn.textContent = "Copied";
        window.setTimeout(function () { btn.textContent = idle; }, 1600);
      });
    });
  });

  /* Lightbox */
  var links = $$(".lightbox-link");
  if (links.length && typeof doc.createElement("dialog").showModal === "function") {
    var dialog = doc.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    dialog.innerHTML =
      "<figure>" +
      '<button type="button" class="lightbox-close">Close</button>' +
      '<img src="" alt="">' +
      "<figcaption></figcaption>" +
      "</figure>";
    doc.body.appendChild(dialog);

    var dialogImg = $("img", dialog);
    var dialogCaption = $("figcaption", dialog);

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var thumb = link.querySelector("img");
        var figure = link.closest("figure");
        var caption = figure ? figure.querySelector("figcaption") : null;
        dialogImg.src = link.getAttribute("href");
        dialogImg.alt = thumb ? thumb.alt : "";
        dialogCaption.textContent = caption ? caption.textContent : "";
        dialog.showModal();
      });
    });

    $(".lightbox-close", dialog).addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () { dialogImg.src = ""; });
  }

  /* Local time in Newark */
  var clock = $("[data-local-time]");
  if (clock && window.Intl && Intl.DateTimeFormat) {
    var fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
    var tick = function () {
      clock.textContent = fmt.format(new Date()).toLowerCase().replace(/\s/g, " ");
    };
    tick();
    window.setInterval(tick, 20000);
  }

  /* Footer year */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
