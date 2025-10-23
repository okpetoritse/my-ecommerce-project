document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  function renderCart() {
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      subtotalEl.textContent = "$0";
      totalEl.textContent = "$0";
      return;
    }

    container.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `
      )
      .join("");

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${(subtotal + 5).toFixed(2)}`; // Example total (with shipping or tax)

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});













