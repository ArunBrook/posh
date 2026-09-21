(function () {
  var S = window.SITE || {}, BRANDS = window.BRANDS || [], CATS = window.CATS || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- before / after slider ---------- */
  document.querySelectorAll("[data-ba]").forEach(function (box) {
    var range = box.querySelector("input[type=range]");
    function set(v) { box.style.setProperty("--pos", v + "%"); }
    range.addEventListener("input", function () { set(range.value); });
    set(range.value);
    if (reduce) return;
    // one intro sweep: starts fully "before", settles at the middle
    var from = 96, to = 50, dur = 1900, t0 = null, cancelled = false;
    function stop() { cancelled = true; }
    box.addEventListener("pointerdown", stop, { once: true });
    box.addEventListener("keydown", stop, { once: true });
    set(from); range.value = from;
    function ease(t) { return 1 - Math.pow(1 - t, 4); }
    function tick(ts) {
      if (cancelled) return;
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), v = from + (to - from) * ease(p);
      set(v); range.value = v;
      if (p < 1) requestAnimationFrame(tick);
    }
    setTimeout(function () { requestAnimationFrame(tick); }, 500);
  });

  /* ---------- home: brand strip ---------- */
  var strip = document.getElementById("brand-strip");
  if (strip) {
    strip.innerHTML = BRANDS.slice(0, 10).map(function (b) {
      return '<li><a href="brands.html">' + esc(b.name) + "</a></li>";
    }).join("");
  }

  /* ---------- brands page ---------- */
  var grid = document.getElementById("brand-grid");
  if (grid) {
    var state = { cat: "all", q: "" };
    var chipBox = document.getElementById("brand-chips");
    var search = document.getElementById("brand-search");
    var count = document.getElementById("brand-count");
    var empty = document.getElementById("brand-empty");

    var chips = [["all", "All brands"]].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k]]; }));
    chipBox.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c[0] + '" aria-pressed="' + (c[0] === "all") + '">' + esc(c[1]) + "</button>";
    }).join("");

    function render() {
      var q = state.q.trim().toLowerCase();
      var list = BRANDS.filter(function (b) {
        return (state.cat === "all" || b.cats.indexOf(state.cat) > -1) &&
          (!q || (b.name + " " + b.desc + " " + b.country).toLowerCase().indexOf(q) > -1);
      });
      grid.innerHTML = list.map(function (b) {
        var kinds = b.cats.map(function (k) { return CATS[k]; }).join(", ");
        var msg = "Hi Posh Imperial, I'm interested in " + b.name + " products. Can you share what's available and the prices?";
        return '<article class="brand-card"><h3>' + esc(b.name) + "</h3>" +
          (b.country ? '<p class="where">' + esc(b.country) + "</p>" : "") +
          '<p class="desc">' + esc(b.desc) + '</p><p class="kinds">' + esc(kinds) + "</p>" +
          '<a href="' + window.waLink(msg) + '" target="_blank" rel="noopener">Ask about ' + esc(b.name) + "</a></article>";
      }).join("");
      count.textContent = list.length + (list.length === 1 ? " brand" : " brands");
      empty.hidden = list.length > 0;
    }
    chipBox.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cat]"); if (!b) return;
      state.cat = b.getAttribute("data-cat");
      chipBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      render();
    });
    search.addEventListener("input", function () { state.q = search.value; render(); });
    var reset = document.getElementById("brand-reset");
    if (reset) reset.addEventListener("click", function () {
      state = { cat: "all", q: "" }; search.value = "";
      chipBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-cat") === "all" ? "true" : "false"); });
      render();
    });
    render();
  }

  /* ---------- products page: related brands + enquiry links ---------- */
  document.querySelectorAll("[data-brands-for]").forEach(function (el) {
    var k = el.getAttribute("data-brands-for");
    var names = BRANDS.filter(function (b) { return b.cats.indexOf(k) > -1; }).slice(0, 7);
    el.innerHTML = names.length ? "Brands: " + names.map(function (b) { return '<a href="brands.html">' + esc(b.name) + "</a>"; }).join(", ") : "";
  });

  /* ---------- contact form -> WhatsApp / email ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var msgBox = document.getElementById("form-msg");
    function compose() {
      var d = new FormData(form);
      var lines = ["Hi " + (S.legalName || S.brand) + ",",
        d.get("interest") ? "I'm looking for: " + d.get("interest") : "",
        d.get("car") ? "My car: " + d.get("car") : "",
        d.get("message") ? "\n" + d.get("message") : "",
        "\nName: " + d.get("name") + (d.get("phone") ? "\nPhone: " + d.get("phone") : "")].filter(Boolean);
      return lines.join("\n");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      window.open(window.waLink(compose()), "_blank", "noopener");
      msgBox.textContent = "WhatsApp is opening with your message ready. Press send to reach us.";
    });
    var mailBtn = document.getElementById("mail-btn");
    if (mailBtn) mailBtn.addEventListener("click", function () {
      if (!form.reportValidity()) return;
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Enquiry from website") + "&body=" + encodeURIComponent(compose());
    });
    var mapEl = document.getElementById("map-frame");
    if (mapEl) { if (S.mapEmbed) { mapEl.src = S.mapEmbed; mapEl.hidden = false; } }
  }
})();
