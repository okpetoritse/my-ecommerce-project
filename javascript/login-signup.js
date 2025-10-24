document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");
  const formTitle = document.getElementById("formTitle");

  showSignup.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    formTitle.textContent = "Sign Up";
  });

  showLogin.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "Login";
  });

  // Dummy handling for now
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login successful (demo)");
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Account created (demo)");
  });
});
