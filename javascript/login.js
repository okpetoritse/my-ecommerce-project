document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("login-tab");
  const signupTab = document.getElementById("signup-tab");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // ✅ Toggle between Login and Signup
  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  });

  signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  });

  // ✅ Handle Signup
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Check if user already exists
    if (localStorage.getItem("user_" + email)) {
      alert("An account with this email already exists.");
      return;
    }

    // Save new user
    const userData = { name, email, password };
    localStorage.setItem("user_" + email, JSON.stringify(userData));
    localStorage.setItem("loggedInUser", email);

    alert("Account created successfully! 🎉");

    // Redirect based on where user came from
    if (localStorage.getItem("fromCheckout")) {
      localStorage.removeItem("fromCheckout");
      window.location.href = "checkout4.html";
    } else {
      window.location.href = "index.html";
    }
  });

  // ✅ Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user_" + email));

    if (!storedUser || storedUser.password !== password) {
      alert("Invalid email or password.");
      return;
    }

    // Save session
    localStorage.setItem("loggedInUser", email);
    alert("Welcome back, " + storedUser.name + "! 👋");

    // Redirect based on where user came from
    if (localStorage.getItem("fromCheckout")) {
      localStorage.removeItem("fromCheckout");
      window.location.href = "checkout4.html";
    } else {
      window.location.href = "index.html";
    }
  });
});
