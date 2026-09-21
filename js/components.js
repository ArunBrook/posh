/* Shared header + footer, and fills in values from config.js */
(function () {
  var S = window.SITE || {};
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  var NAV = [
    ["Home", "index.html"],
    ["Brands", "brands.html"],
    ["Products", "products.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
  ];

  window.waLink = function (msg) {
    return "https://wa.me/" + (S.whatsapp || "") + "?text=" + encodeURIComponent(msg || S.defaultMessage || "");
  };
  function telHref() { return "tel:" + (S.phone || "").replace(/[^\d+]/g, ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- header ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var links = NAV.map(function (n) {
      var cur = page === n[1] || (page === "" && n[1] === "index.html");
      return '<li><a href="' + n[1] + '"' + (cur ? ' aria-current="page"' : "") + ">" + n[0] + "</a></li>";
    }).join("");
    header.innerHTML =
      '<div class="container header-in">' +
      '<a class="brand" href="index.html" aria-label="' + esc(S.brand) + ' home">' +
      '<img src="images/logo-mark.png" alt="" width="32" height="40"><span class="brand-name">' + esc(S.brand) + "</span></a>" +
      '<nav class="main-nav" id="main-nav" aria-label="Main"><ul>' + links + "</ul></nav>" +
      '<a class="btn btn-primary header-cta" data-link="wa" href="#">WhatsApp us</a>' +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><span></span></button>' +
      "</div>";
    var btn = header.querySelector(".nav-toggle");
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) { header.classList.remove("nav-open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  }

  /* ---------- footer ---------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    var social = [["Instagram", S.instagram], ["Facebook", S.facebook], ["YouTube", S.youtube]]
      .filter(function (x) { return x[1]; })
      .map(function (x) { return '<li><a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + x[0] + "</a></li>"; }).join("");
    footer.className = "site-footer carbon";
    footer.innerHTML =
      '<div class="container">' +
      '<div class="foot-grid">' +
      '<div class="foot-brand"><img src="images/logo-mark-white.png" alt="" width="45" height="56"><h3>' + esc(S.brand) + "</h3><p>" + esc(S.tagline) + " Polishes, coatings, wash chemistry and tools from trusted brands.</p></div>" +
      '<div><h3>Explore</h3><ul>' +
      '<li><a href="products.html">Products</a></li><li><a href="brands.html">Brands</a></li><li><a href="about.html">About us</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h3>Policies</h3><ul>' +
      '<li><a href="privacy-policy.html">Privacy policy</a></li><li><a href="terms.html">Terms of use</a></li><li><a href="shipping-returns.html">Shipping &amp; returns</a></li></ul></div>' +
      '<div><h3>Get in touch</h3><address>' +
      '<a href="' + telHref() + '">' + esc(S.phone) + "</a>" +
      '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" +
      "<span>" + esc(S.address) + "</span></address>" +
      (social ? '<ul style="margin-top:16px">' + social + "</ul>" : "") +
      "</div></div>" +
      '<div class="foot-bottom"><span>&copy; <span id="yr"></span> ' + esc(S.legalName || S.brand) + ". All rights reserved." + (S.gstin ? " GSTIN: " + esc(S.gstin) : "") + "</span>" +
      "<span>Brand names and trademarks belong to their respective owners.</span></div>" +
      "</div>";
    var yr = footer.querySelector("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* floating WhatsApp button (all pages except contact) */
  if (page !== "contact.html") {
    var f = document.createElement("a");
    f.className = "wa-float"; f.setAttribute("data-link", "wa"); f.href = "#"; f.textContent = "Chat on WhatsApp";
    f.target = "_blank"; f.rel = "noopener";
    document.body.appendChild(f);
  }

  /* ---------- fill values from config ---------- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v !== undefined && v !== "") el.textContent = v;
  });
  document.querySelectorAll("a[data-link]").forEach(function (a) {
    var t = a.getAttribute("data-link");
    if (t === "wa") { a.href = window.waLink(a.getAttribute("data-msg")); a.target = "_blank"; a.rel = "noopener"; }
    else if (t === "phone") { a.href = telHref(); if (!a.textContent.trim()) a.textContent = S.phone; }
    else if (t === "email") { a.href = "mailto:" + S.email; if (!a.textContent.trim()) a.textContent = S.email; }
  });
})();
