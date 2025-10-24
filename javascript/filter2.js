document.addEventListener("DOMContentLoaded", () => {
  // --- Update cart count on page load ---
  const cartCount = document.querySelector(".cart-count");
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) cartCount.textContent = cart.length;
  };
  updateCartCount();

  // --- Add to cart functionality ---
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productElement = e.target.closest(".product-container");
      if (!productElement) return;

      const name = productElement.querySelector(".product-name")?.textContent.trim();
      const priceText = productElement.querySelector(".price")?.textContent.trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
      const image = productElement.querySelector("img")?.getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find((item) => item.name === name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Small feedback animation
      button.textContent = "Added!";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false;
      }, 1000);
    });
  });
});
