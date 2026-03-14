(function () {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("[data-nav]");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
})();

// Scroll reveal for sections/cards
(function () {
  // Automatically apply reveal to common content blocks across all pages
  const autoTargets = document.querySelectorAll(
    ".hero-card, .hero-stats, .grid .card, .section"
  );
  autoTargets.forEach((el) => {
    if (!el.hasAttribute("data-reveal")) {
      el.setAttribute("data-reveal", "fade-up");
    }
  });

  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
// Accordion (Resurslar səhifəsi üçün)
(function () {
  const headers = document.querySelectorAll(".accordion-header");
  if (!headers.length) return;

  headers.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const content = button.nextElementSibling;
      const icon = button.querySelector(".icon");

      const isOpen = content.style.maxHeight;

      // digər açıq bölmələri bağla
      document.querySelectorAll(".accordion-item").forEach((el) => {
        el.removeAttribute("data-open");
      });
      document.querySelectorAll(".accordion-content").forEach((c) => {
        c.style.maxHeight = null;
      });
      document.querySelectorAll(".accordion-header .icon").forEach((i) => {
        i.textContent = "+";
      });

      // kliklənən açıq deyilsə aç
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.textContent = "–";
        if (item) item.setAttribute("data-open", "");
      }
    });
  });
})();

// Əlaqə forması: göndərildikdən sonra uğur mesajı
(function () {
  if (typeof window === "undefined" || window.location.search.indexOf("sent=1") === -1) return;
  var msg = document.getElementById("form-success-msg");
  var form = document.getElementById("contact-form");
  if (msg) msg.style.display = "block";
  if (form) form.style.display = "none";
})();