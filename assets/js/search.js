(function () {
  var forms = document.querySelectorAll("[data-search-form]");
  if (!forms.length) return;

  // Açar söz → URL xəritəsi (diakritiksiz, kiçik hərf)
  var keywordMap = {
    // Resurslar
    kiberzorakiliq: "/resurslar/kiberzorakiliq/",
    zorakiliq: "/resurslar/kiberzorakiliq/",
    kiberbulling: "/resurslar/kiberzorakiliq/",
    tehlukesizlik: "/resurslar/tehlukesizlik/",
    guvenlik: "/resurslar/tehlukesizlik/",
    mexfilik: "/resurslar/mexfilik/",
    mahremiyyet: "/resurslar/mexfilik/",

    // Qanunvericilik / FAQ
    qanunvericilik: "/qanunvericilik/",
    qanun: "/qanunvericilik/",
    faq: "/faq/",
    suallar: "/faq/",

    // Kömək al
    komek: "/komek-al/",
    yardim: "/komek-al/",
    hotline: "/komek-al/",
    polis: "/komek-al/",
    xett: "/komek-al/",
  };

  function normalize(q) {
    if (!q) return "";
    var s = q.toString().replace(/\s+/g, " ").trim().toLowerCase();
    // Azərbaycan hərflərini latın əsas ekvivalentinə çevir
    s = s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ə/g, "e")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u");
    return s;
  }

  function resolveKeyword(q) {
    if (!q) return null;
    if (keywordMap[q]) return keywordMap[q];
    // "kiberzorakiliq nedir" kimi hallarda daxilində axtar
    for (var key in keywordMap) {
      if (!Object.prototype.hasOwnProperty.call(keywordMap, key)) continue;
      if (q.indexOf(key) !== -1 || key.indexOf(q) !== -1) {
        return keywordMap[key];
      }
    }
    return null;
  }

  function runSearch(form) {
    var input = form.querySelector(".search-input");
    var raw = (input && input.value) || "";
    var base = form.getAttribute("data-base-url") || "";
    var q = normalize(raw);
    if (!q) return;

    var target = resolveKeyword(q);
    if (target) {
      window.location.href = base + target;
      return;
    }
    // Əgər uyğun açar söz tapılmazsa, ümumi axtarış səhifəsinə yönləndir
    window.location.href = base + "/search?q=" + encodeURIComponent(raw.trim());
  }

  forms.forEach(function (form) {
    var input = form.querySelector(".search-input");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      runSearch(form);
    });
    if (input) {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          runSearch(form);
        }
      });
    }
  });
})();
