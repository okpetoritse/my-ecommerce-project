// common.js - inject header & footer, mobile menu toggle, set padding for fixed header
(function () {
  const headerURL = './header.html';
  const footerURL = './footer.html';

  const headerTemplate = `
    <header class="site-header" role="banner">
      <div class="site-header__inner">
        <div class="site-header__left">
          <button class="common-menu-toggle" aria-label="Open menu">☰</button>
          <a class="site-logo" href="../HTML/home.html"><img src="../Assets/Group 36.png" alt="XIV logo"></a>
          <nav class="site-nav" aria-label="Main navigation">
            <a href="../HTML/home.html">Home</a>
            <a href="../HTML/collections.html">Collections</a>
            <a href="../HTML/new.html">New</a>
          </nav>
        </div>
        <div class="site-header__right">
          <button class="search-btn" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="favorites-btn" aria-label="Favorites"><i class="fa-regular fa-heart"></i></button>
          <button class="cart-btn" aria-label="Cart"><i class="fa-solid fa-bag-shopping"></i><span class="cart-count" data-cart-count="0">0</span></button>
          <a class="account-link" href="../HTML/account.html" aria-label="Account"><i class="fa-regular fa-user"></i></a>
        </div>
      </div>
    </header>
  `;

  const footerTemplate = `
    <footer class="site-footer" role="contentinfo">
      <div class="site-footer__inner">
        <div class="footer-brand">
          <img src="../Assets/logo.png" alt="XIV logo">
          <p class="footer-slogan">Timeless Fashion</p>
        </div>
        <div class="footer-links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="../HTML/home.html">Home</a></li>
            <li><a href="../HTML/collections.html">Collections</a></li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4>Stay updated</h4>
          <form><input type="email" placeholder="Email"><button>Subscribe</button></form>
        </div>
      </div>
      <div class="site-footer__bottom"><p>© 2025 XIV. All rights reserved.</p></div>
    </footer>
  `;

  async function tryFetch(url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      return null;
    }
  }

  

  async function inject() {
    // Header
    let headerHTML = await tryFetch(headerURL);
    if (!headerHTML) headerHTML = headerTemplate;
    const tempHeader = document.createElement('div');
    tempHeader.innerHTML = headerHTML;
    const headerElement = tempHeader.firstElementChild;
    if (headerElement) document.body.insertBefore(headerElement, document.body.firstChild);

    // Footer (skip if on home.html)
    if (!window.location.pathname.includes("home.html")) {
      let footerHTML = await tryFetch(footerURL);
      if (!footerHTML) footerHTML = footerTemplate;
      const tempFooter = document.createElement('div');
      tempFooter.innerHTML = footerHTML;
      const footerElement = tempFooter.firstElementChild;
      if (footerElement) document.body.appendChild(footerElement);
    }

    initHeaderBehaviour();
  }

  function initHeaderBehaviour() {
    const header = document.querySelector('.site-header');
    if (header) {
      const setHeaderSpacing = () => {
        const h = header.getBoundingClientRect().height;
        document.body.style.paddingTop = `${h}px`;
      };
      setHeaderSpacing();
      window.addEventListener('resize', setHeaderSpacing);
    }

    const menuBtn = document.querySelector('.common-menu-toggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
        const nav = document.querySelector('.site-nav');
        if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      });
    }

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const n = cartCount.dataset.cartCount || 0;
      cartCount.textContent = n;
    }

    console.log('✅ common.js: header/footer injected');
  }

  inject();

  window.commonUI = {
    setCartCount: (n) => {
      const el = document.querySelector('.cart-count');
      if (el) el.textContent = n;
    }
  };
})();







// === CART COUNT SYNC + ADD-TO-CART HANDLER ===
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartCountElement = document.querySelector(".cart-count");

  // Load existing cart or initialize empty
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update the cart count
  const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.dataset.cartCount = totalItems;
    }
  };

  updateCartCount(); // show correct count on load

  // Add to Cart click
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = e.target.closest(".product-container");
      if (!product) return;

      const name = product.querySelector(".product-name")?.textContent.trim();
      const price = parseFloat(
        product.querySelector(".price")?.textContent.replace("$", "")
      );
      const image = product.querySelector("img")?.src;

      // Check if item exists
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      // Save and update
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Small visual feedback
      btn.textContent = "Added ✅";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.disabled = false;
      }, 1200);
    });
  });
});















