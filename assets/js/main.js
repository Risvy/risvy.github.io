/* risvy.github.io | navigation toggle, reveal animation, lightbox, year */
(function () {
  "use strict";

  /* Mobile navigation toggle ------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }

  /* Reveal-on-scroll ----------------------------------------------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      reveals.forEach(function (el) { observer.observe(el); });
    }
  }

  /* Lightbox -------------------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".lightbox-link"));

  if (links.length && typeof document.createElement("dialog").showModal === "function") {
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    dialog.innerHTML =
      '<figure>' +
      '<button type="button" class="lightbox-close" aria-label="Close image">×</button>' +
      '<img src="" alt="">' +
      '<figcaption></figcaption>' +
      '</figure>';
    document.body.appendChild(dialog);

    var dialogImg = dialog.querySelector("img");
    var dialogCaption = dialog.querySelector("figcaption");

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

    dialog.querySelector(".lightbox-close").addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      dialogImg.src = "";
    });
  }

  /* Footer year -------------------------------------------------------------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-year]")).forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
