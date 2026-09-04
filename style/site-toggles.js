(function () {
  "use strict";

  var THEME_KEY = "site-theme";   // "dark" | "light"

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function getStored(key, fallback) {
    try {
      return window.localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* ignore (e.g. private browsing) */
    }
  }

  var currentTheme = getStored(THEME_KEY, "dark");
  applyTheme(currentTheme);

  document.addEventListener("DOMContentLoaded", function () {
    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        setStored(THEME_KEY, currentTheme);
        applyTheme(currentTheme);
      });
    }

    var navLinks = document.querySelectorAll(".site-nav a");
    var currentPath = window.location.pathname.replace(/\/$/, "");
    navLinks.forEach(function (link) {
      var linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, "");
      if (linkPath === currentPath || (linkPath.endsWith("/index.html") && currentPath.endsWith("/") ) ) {
        link.classList.add("active");
      }
    });
  });
})();
