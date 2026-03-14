---
title: Əlaqə
permalink: /elaqe/
---

# Əlaqə
<p class="kicker">Sualın var? Təklifin var? Bizə yaz.</p>

<div class="section">
  <h2>Əlaqə məlumatları</h2>
  <ul>
    <li>E-poçt: <strong>safefuture6@gmail.com</strong></li>
    <li>Instagram: <em>@safefuture</em></li>
    <li>Facebook: <em>/safefuture</em></li>
    <li>LinkedIn: <em>/company/safefuture</em></li>
    <li>TikTok: <em>@safefuture</em></li>
  </ul>
</div>

<div class="section contact-form-section">
  <h2>Əlaqə forması</h2>
  <p id="form-success-msg" class="form-success" style="display:none;">Mesajınız uğurla göndərildi. Tezliklə cavab verəcəyik.</p>
  <form id="contact-form" action="#" method="post">
    <div class="row">
      <div>
        <label for="contact-name">Ad</label>
        <input id="contact-name" name="name" required placeholder="Adınız" />
      </div>
      <div>
        <label for="contact-email">E-poçt</label>
        <input id="contact-email" name="email" type="email" required placeholder="name@email.com" />
      </div>
    </div>

    <label for="contact-message">Mesaj</label>
    <textarea id="contact-message" name="message" required placeholder="Mesajınızı yazın..."></textarea>

    <button class="btn primary" type="submit">Göndər</button>
  </form>
</div>

<script>
(function() {
  var form = document.getElementById("contact-form");
  var successMsg = document.getElementById("form-success-msg");
  if (!form || !successMsg) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = (form.querySelector("[name=name]") && form.querySelector("[name=name]").value) || "";
    var email = (form.querySelector("[name=email]") && form.querySelector("[name=email]").value) || "";
    var message = (form.querySelector("[name=message]") && form.querySelector("[name=message]").value) || "";
    var subject = "Safe Future əlaqə: " + (name || "Ad yoxdur");
    var body = "Ad: " + name + "\nE-poçt: " + email + "\n\nMesaj:\n" + message;
    var mailto = "mailto:safefuture6@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = mailto;
    form.style.display = "none";
    successMsg.style.display = "block";
  });
})();
</script>