document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("payment-order-summary");
  const subtotalEl = document.querySelector(".subtotal");
  const totalEl = document.querySelector(".total");
  const form = document.getElementById("paymentForm");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Toast Function
  function showPaymentToast(name, { duration = 3500, redirect = null } = {}) {
    let toast = document.getElementById("paymentToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "paymentToast";
      toast.className = "payment-toast";
      toast.innerHTML = `
        <div class="pt-icon">✓</div>
        <div class="pt-content">
          <div class="pt-title">Payment successful!</div>
          <div class="pt-sub"></div>
        </div>
      `;
      document.body.appendChild(toast);
    }

    // personalized message
    const sub = toast.querySelector(".pt-sub");
    sub.textContent = `Thank you for your purchase${name ? ", " + name : ""} 🎉`;

    // show toast
    toast.classList.add("show");

    // hide toast after duration
    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => {
      toast.classList.remove("show");
      if (redirect) {
        setTimeout(() => (window.location.href = redirect), 300);
      }
    }, duration);
  }

  // ✅ Load Cart Data
  let subtotal = 0;
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>No items in cart.</p>";
  } else {
    orderSummary.innerHTML = cart
      .map(
        (item) =>
          `<p>${item.name} x ${item.quantity} — $${(
            item.price * item.quantity
          ).toFixed(2)}</p>`
      )
      .join("");
    subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  subtotalEl.textContent = "$" + subtotal.toFixed(2);
  totalEl.textContent = "$" + (subtotal + 5).toFixed(2);

  // ✅ Payment Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cardName").value.trim();
    const number = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !number || !expiry || !cvv) {
      const warning = document.getElementById("formWarning");
      if (warning) {
        warning.textContent = "⚠️ Please fill out all fields correctly.";
        setTimeout(() => (warning.textContent = ""), 4000);
      }
      return;
    }

    // ✅ Show toast & redirect after it hides
    localStorage.removeItem("cart");
    showPaymentToast(name, { duration: 3500, redirect: "index.html" });
  });
});
