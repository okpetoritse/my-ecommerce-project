
document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.querySelector(".order-summary");
  const subtotalEl = document.querySelector(".subtotal");
  const shippingEl = document.querySelector(".shipping");
  const totalEl = document.querySelector(".total");
  const checkoutBtn = document.querySelector(".checkout-btn");

  const emailInput = document.getElementById("email");
  const fullNameInput = document.getElementById("fullName");
  const address1Input = document.getElementById("address1");
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");
  const zipInput = document.getElementById("zip");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let shippingCost = 5; // Default: Standard shipping

  // --- Render cart summary ---
  const renderCart = () => {
    orderSummary.innerHTML = "";

    if (cart.length === 0) {
      orderSummary.innerHTML = "<p>Your cart is empty.</p>";
      subtotalEl.textContent = "$0.00";
      shippingEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      checkoutBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div class="item-info">
          <img src="${item.image}" alt="${item.name}" width="50">
          <div>
            <p><strong>${item.name}</strong></p>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
        </div>
        <button class="remove" data-index="${index}">Remove</button>
      `;
      orderSummary.appendChild(div);
    });

    subtotalEl.textContent = "$" + subtotal.toFixed(2);
    shippingEl.textContent = "$" + shippingCost.toFixed(2);
    totalEl.textContent = "$" + (subtotal + shippingCost).toFixed(2);
  };

  // --- Remove item from cart ---
  orderSummary.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // --- Handle shipping option change ---
  const shippingOptions = document.querySelectorAll("input[name='shippingMethod']");
  shippingOptions.forEach((option) => {
    option.addEventListener("change", () => {
      shippingCost = option.value === "express" ? 15 : 5;
      renderCart();
    });
  });

  // --- Validate contact info before proceeding ---
  const validateContact = () => {
    const requiredFields = [emailInput, fullNameInput, address1Input, cityInput, stateInput, zipInput];
    return requiredFields.every((field) => field.value.trim() !== "");
  };

  // --- Handle Proceed to Payment ---
  checkoutBtn.addEventListener("click", () => {
    if (!validateContact()) {
      alert("⚠️ Please fill out all required contact and shipping details before proceeding.");
      return;
    }

    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      localStorage.setItem("fromCheckout", "true");
      window.location.href = "../HTML/login-signup.html";
    } else {
      // Save chosen shipping option and contact details to localStorage
      localStorage.setItem("shippingCost", shippingCost);
      localStorage.setItem("checkoutContact", JSON.stringify({
        email: emailInput.value,
        fullName: fullNameInput.value,
        address1: address1Input.value,
        address2: document.getElementById("address2").value,
        city: cityInput.value,
        state: stateInput.value,
        zip: zipInput.value,
        phone: document.getElementById("phone").value,
      }));

      window.location.href = "../HTML/payment.html";
    }
  });

  renderCart();
});
