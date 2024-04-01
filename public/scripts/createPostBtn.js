const crtPostBtn = document.getElementById("create-post-btn");
const crtPostRef = document.getElementById("crt-post-ref");

fetch("/auth/check-authentication")
  .then((response) => response.json())
  .then((data) => {
    const isAuthenticated = data.isAuthenticated;
    console.log("user is authenticated " + isAuthenticated);

    //Changing buttons functionalities based on authentication
    if (isAuthenticated) {
      crtPostRef.href = "/createPost.html";
    } else {
      crtPostRef.href = "/login.html";
    }
  });

loginBtn.addEventListener("click", () => {
  if (isAuthenticated) {
    isAuthenticated = false;
    console.log("user logged out");
  }
});
