const loginForm = document.getElementById("LogInDiv");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // url encoding the request body
  const requestBody = `username=${username}&password=${password}`;

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody,
  });

  if (response.status != 200) {
    const errorData = await response.json();
    const errorMessage = errorData.message;
    alert(errorMessage);
  } else {
    window.location.href = "/";
  }
});
