# Əlaqə forması – mesajlar safefuture6@gmail.com-a necə düşər?

**mailto** ilə mesaj avtomatik poçta **gəlmir** – ona görə Formspree istifadə edirik. Bir dəfə aşağıdakıları et, sonra hər göndərilən forma birbaşa **safefuture6@gmail.com**-a düşəcək.

---

## Addımlar (təxminən 2 dəqiqə)

### 1. Formspree saytına get
Brauzerdə aç: **https://formspree.io**

### 2. "Get Started" / "Sign up" bas
- **safefuture6@gmail.com** ilə qeydiyyat ol (və ya artıq hesabın varsa daxil ol).
- Gələn e-poçtda linkə basıb e-poçtu təsdiqlə.

### 3. Yeni form yarat
- "**New form**" / "**Create a new form**" düyməsinə bas.
- **"Email"** sahəsində **safefuture6@gmail.com** yaz (mesajlar bu ünvana gələcək).
- "Create" / "Submit" bas.

### 4. Form ID-ni götür
Form yaradılandan sonra sizə belə bir link veriləcək:
```text
https://formspree.io/f/xjvglkny
```
**Son hissəni** (məsələn `xjvglkny`) götür – bu sənin **Form ID**-ndir.

### 5. Layihədə əvəz et
- **elaqe.md** faylını aç.
- Axtar: `YOUR_FORM_ID`
- Onu **Formspree-dən götürdüyün ID** ilə əvəz et (məs: `xjvglkny`).

**Əvvəl:**
```text
action="https://formspree.io/f/YOUR_FORM_ID"
```

**Sonra (nümunə):**
```text
action="https://formspree.io/f/xjvglkny"
```

### 6. Saytı yenidən yüklə (deploy)
Dəyişikliyi saxla və saytı yenidən deploy et. Bundan sonra formu doldurub "Göndər" basan hər kəsin mesajı **safefuture6@gmail.com** gələnlər qutusuna düşəcək.

---

**Qeyd:** Formspree pulsuz planında ayda 50 mesaj limiti var. İlk dəfə e-poçt təsdiqi tələb oluna bilər.
