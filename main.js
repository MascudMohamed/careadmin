// --- Mobile Menu Toggle with Smooth Animation ---
const menuBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");

  if (isHidden) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-slide-down");
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("animate-slide-up");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");

    mobileMenu.addEventListener("animationend", function handler() {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("animate-slide-up");
      mobileMenu.removeEventListener("animationend", handler);
    });
  }
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("animate-slide-up");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    mobileMenu.addEventListener("animationend", function handler() {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("animate-slide-up");
      mobileMenu.removeEventListener("animationend", handler);
    });
  });
});

// --- Actual Contact Form Submission to Formspree ---
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const messageBox = document.getElementById("contact-form-message");

    // Send form data to Formspree
    try {
      const response = await fetch("https://formspree.io/f/xanpgjqp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        messageBox.innerHTML =
          "✅ Thank you! Your message has been sent successfully.";
        messageBox.classList.remove("hidden");
        form.reset();
      } else {
        messageBox.innerHTML =
          "⚠️ Sorry, something went wrong. Please try again later.";
        messageBox.classList.remove("hidden");
      }
    } catch (error) {
      console.error(error);
      messageBox.innerHTML =
        "⚠️ Network error. Please check your connection and try again.";
      messageBox.classList.remove("hidden");
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      messageBox.classList.add("hidden");
    }, 5000);
  });
