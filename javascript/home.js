const plusButtons = document.querySelectorAll(".plus");
  var cartCount = document.querySelector(".cart-count");
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    cartCount.innerHTML = cart.length;
  };

  updateCartCount();

  plusButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".cardWrapper");
      const name = card.querySelector("h6").textContent.trim();
      const price = parseFloat(card.querySelector(".description p:last-child").textContent.replace("$", ""));
      const image = card.querySelector("img").src;

      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

     
     

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      const toast = document.getElementById("cartToast");

  
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);

    });
  });

  
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "checkout4.html";
    });
  }


  let hamburgerMenu = document.querySelector(".common-menu-toggle");
  hamburgerMenu.addEventListener("click", () => {
    let navBar = document.querySelector(".navBar");
    navBar.classList.toggle("active");
  });
  
 




