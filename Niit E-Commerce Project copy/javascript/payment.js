document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("payment-order-summary");
  const subtotalEl = document.querySelector(".subtotal");
  const totalEl = document.querySelector(".total");
  const form = document.getElementById("paymentForm");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Load Cart Data
  let subtotal = 0;
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>No items in cart.</p>";
  } else {
    orderSummary.innerHTML = cart.map(item => `
      <p>${item.name} x ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</p>
    `).join("");
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
      alert("Please fill out all fields correctly.");
      return;
    }

    // Fake Payment Processing
    alert("Payment successful! 🎉\nThank you for your purchase, " + name + "!");

    // Clear Cart and Redirect
    localStorage.removeItem("cart");
    window.location.href = "../HTML/home.html";
  });
});
