(function () {
  var forms = document.querySelectorAll("[data-search-form]");
  if (!forms.length) return;

  // Case-insensitive keyword → URL (normalize: trim, lowercase)
  var keywordMap = {
    kiberzorakiliq: "/resurslar/kiberzorakiliq/",
    kiberzorakılıq: "/resurslar/kiberzorakiliq/",
    tehlukesizlik: "/resurslar/tehlukesizlik/",
    təhlükəsizlik: "/resurslar/tehlukesizlik/",
    mexfilik: "/resurslar/mexfilik/",
    məxfilik: "/resurslar/mexfilik/",
    qanunvericilik: "/qanunvericilik/",
    faq: "/faq/",
  };

  function normalize(q) {
    return q.replace(/\s+/g, " ").trim().toLowerCase();
  }

  function runSearch(form) {
    var input = form.querySelector(".search-input");
    var raw = (input && input.value) || "";
    var q = normalize(raw);
    var base = form.getAttribute("data-base-url") || "";
    if (!q) return;
    var url = keywordMap[q];
    if (url) {
      window.location.href = base + url;
      return;
    }
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
