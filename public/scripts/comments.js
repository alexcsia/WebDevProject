const writeCommentsDiv = document.getElementById("write-comment");
const form = document.getElementById("comment-form");
const infoDiv = document.getElementById("info");
const submitBtn = document.getElementById("submit-comment");

fetch("/auth/check-authentication")
  .then((response) => response.json())
  .then((data) => {
    const isAuthenticated = data.isAuthenticated;
    console.log("user is authenticated " + isAuthenticated);

    //only authenticated users can comment
    if (isAuthenticated) {
      form.style.display = "block";
      infoDiv.textContent = "Comment section";
    } else {
      infoDiv.textContent = "Login to leave a comment!";
      form.style.display = "none";
    }
  });

//refresh page so comment shows
submitBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.reload();
  }, 500);
});
