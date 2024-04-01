//const crtPostRef = document.getElementById("crt-post-ref");
const loginRef = document.getElementById("login-ref");
const signupRef = document.getElementById("signup-ref");
//requierements for buttons
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const profileBtn = document.getElementById("profile-btn");
let isAuthenticated = true;

fetch("/auth/check-authentication")
  .then((response) => response.json())
  .then((data) => {
    isAuthenticated = data.isAuthenticated;
    console.log("user is authenticated " + isAuthenticated);

    //Changing buttons displays based on authentication
    if (isAuthenticated) {
      //login button changes to logout button
      loginBtn.textContent = "Log out";
      signupBtn.style.display = "none";
      profileBtn.style.display = "block";

      //signup button disappears
    } else {
      //crtPostRef.href = "log_in.html";
      signupBtn.style.display = "block";
      profileBtn.style.display = "none";
    }
  });

//when clicking on anchor
loginRef.addEventListener("click", function (event) {
  loginBtn.click(); // Trigger the click event of the login button
});

//on click, should log out
loginBtn.addEventListener("click", () => {
  if (isAuthenticated) {
    isAuthenticated = false;
    console.log("user logged out");
    window.location.href = "/auth/logout";
  }
});
