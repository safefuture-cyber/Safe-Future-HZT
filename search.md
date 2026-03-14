---
layout: default
title: Axtarış nəticələri
permalink: /search/
---

<section class="search-results-section">
  <h1 class="page-title">Axtarış nəticələri</h1>
  <p class="kicker" id="search-query-display">Axtarış sorğusu yüklənir...</p>
  <div class="section card">
    <p class="muted" id="search-message">
      Bu mövzu üçün xüsusi səhifə tapılmadı. Aşağıdakı bölmələrdən birini seçə və ya yenidən axtarın.
    </p>
    <ul class="search-fallback-links">
      <li><a href="{{ '/resurslar/' | relative_url }}">Resurslar</a></li>
      <li><a href="{{ '/qanunvericilik/' | relative_url }}">Əlaqəli qanunvericilik</a></li>
      <li><a href="{{ '/faq/' | relative_url }}">FAQ</a></li>
      <li><a href="{{ '/komek-al/' | relative_url }}">Kömək Al</a></li>
    </ul>
  </div>
</section>

<script>
(function () {
  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  var display = document.getElementById("search-query-display");
  var message = document.getElementById("search-message");
  if (display) {
    if (q && q.trim()) {
      display.textContent = '"' + q.trim() + '" üçün nəticələr';
    } else {
      display.textContent = "Axtarış sorğusu daxil edin.";
    }
  }
  if (message && (!q || !q.trim())) {
    message.textContent = "Axtarış boşdur. Aşağıdakı bölmələrdən birinə keçin.";
  }
})();
</script>
