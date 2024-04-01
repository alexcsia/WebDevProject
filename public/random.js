/*const btnEnd = document.getElementById("end-session");

fetch("/partials/loginButton")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("loginButtonContainer").innerHTML = html;
  })
  .catch((error) => console.error("Error fetching loginButton:", error));
/*



/*
btnEnd.addEventListener("click", () => {
  //send logout request
  fetch("/logout")
    .then((response) => {
      if (response.redirected) {
        console.log("Redirected to:", response.url);
        // Redirect the browser to the new URL
        window.location.href = response.url;
      } else {
        console.error("Unexpected response:", response);
      }
    })
    .catch((error) => {
      console.error("Error while ending session:", error);
    });
});
*/
