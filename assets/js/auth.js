// Simple auth UI + Firebase Auth integration
(function () {
  const openBtn = document.querySelector("[data-auth-open]");
  const backdrop = document.querySelector("[data-auth-backdrop]");
  const closeBtn = document.querySelector("[data-auth-close]");
  const form = document.querySelector("[data-auth-form]");
  const errorEl = document.querySelector("[data-auth-error]");
  const submitBtn = document.querySelector("[data-auth-submit]");
  const googleBtn = document.querySelector("[data-auth-google]");
  const tabs = document.querySelectorAll("[data-auth-mode]");

  const userBox = document.querySelector("[data-auth-user]");
  const userNameEl = document.querySelector("[data-auth-name]");
  const userEmailEl = document.querySelector("[data-auth-email]");
  const avatarEl = document.querySelector("[data-auth-avatar]");
  const signoutBtn = document.querySelector("[data-auth-signout]");
  const authArea = document.querySelector("[data-auth-area]");

  if (!openBtn || !backdrop || !form) return;

  let mode = "signin"; // "signin" | "signup"
  let auth = null;
  let firebaseReady = false;

  function setMode(next) {
    mode = next;
    tabs.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.authMode === mode);
    });
    if (submitBtn) {
      submitBtn.textContent = mode === "signin" ? "Daxil ol" : "Qeydiyyat";
    }
    if (errorEl) errorEl.textContent = "";
  }

  function openModal() {
    backdrop.hidden = false;
    document.body.classList.add("auth-open");
    const emailInput = form.querySelector('input[name="email"]');
    if (emailInput) emailInput.focus();
  }

  function closeModal() {
    backdrop.hidden = true;
    document.body.classList.remove("auth-open");
    form.reset();
    if (errorEl) errorEl.textContent = "";
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.dataset.loading = isLoading ? "true" : "false";
  }

  function showError(message) {
    if (errorEl) {
      errorEl.textContent = message;
    } else {
      console.error("[auth]", message);
    }
  }

  function updateUserUI(user) {
    if (!authArea || !userBox) return;

    const signupBtn = openBtn;

    if (!user) {
      if (signupBtn) signupBtn.hidden = false;
      userBox.hidden = true;
      return;
    }

    const displayName = user.displayName || user.email || "İstifadəçi";
    const email = user.email || "";
    if (userNameEl) userNameEl.textContent = displayName;
    if (userEmailEl) userEmailEl.textContent = email;

    if (avatarEl) {
      const letter = displayName.trim().charAt(0).toUpperCase();
      avatarEl.textContent = letter || "U";
    }

    if (signupBtn) signupBtn.hidden = true;
    userBox.hidden = false;
  }

  // Firebase init (using global config from layout)
  try {
    const cfg = window.SAFE_FUTURE_FIREBASE_CONFIG || {};
    const missingConfig =
      !cfg.apiKey ||
      cfg.apiKey === "REPLACE_ME" ||
      !cfg.authDomain ||
      cfg.authDomain === "REPLACE_ME.firebaseapp.com";

    if (missingConfig || typeof firebase === "undefined") {
      console.warn("[auth] Firebase config is not set yet.");
    } else {
      firebase.initializeApp(cfg);
      auth = firebase.auth();
      firebaseReady = true;

      auth.onAuthStateChanged((user) => {
        updateUserUI(user);
      });
    }
  } catch (e) {
    console.error("[auth] Failed to init Firebase", e);
  }

  openBtn.addEventListener("click", () => {
    if (!firebaseReady) {
      alert(
        "Auth üçün backend hələ qoşulmayıb. Firebase config əlavə edəndən sonra bu pəncərə real işləyəcək."
      );
    }
    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  backdrop.addEventListener("click", (evt) => {
    if (evt.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && !backdrop.hidden) closeModal();
  });

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.authMode === "signup" ? "signup" : "signin";
      setMode(next);
    });
  });

  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    if (!firebaseReady || !auth) {
      showError("Server auth hələ qoşulmayıb. Firebase config əlavə edin.");
      return;
    }

    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      showError("Email və şifrə daxil edin.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      let msg = "Gözlənilməz xəta baş verdi.";
      if (err.code === "auth/user-not-found") {
        msg = "Bu email ilə istifadəçi tapılmadı.";
      } else if (err.code === "auth/wrong-password") {
        msg = "Şifrə yanlışdır.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "Bu email artıq qeydiyyatdan keçib.";
      } else if (err.code === "auth/weak-password") {
        msg = "Şifrə ən azı 6 simvol olmalıdır.";
      }
      showError(msg);
    } finally {
      setLoading(false);
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      if (!firebaseReady || !auth) {
        showError("Google ilə giriş üçün Firebase config lazımdır.");
        return;
      }

      setLoading(true);
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        closeModal();
      } catch (err) {
        console.error(err);
        showError("Google ilə giriş mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    });
  }

  if (signoutBtn) {
    signoutBtn.addEventListener("click", async () => {
      if (!firebaseReady || !auth) {
        updateUserUI(null);
        return;
      }
      try {
        await auth.signOut();
      } catch (err) {
        console.error(err);
      }
    });
  }

  // initial mode
  setMode(mode);
})();

