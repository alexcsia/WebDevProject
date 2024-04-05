const signUpForm = document.getElementById("SignUpDiv");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const first_name = document.getElementById("fname").value;
  const last_name = document.getElementById("lname").value;
  const username = document.getElementById("uname").value;
  const email = document.getElementById("email").value;
  const phone_number = document.getElementById("pnumber").value;
  const password = document.getElementById("password").value;
  // url encoding the request body
  const requestBody = `first_name=${first_name}&last_name=${last_name}&username=${username}&email=${email}&phone_number=${phone_number}&password=${password}`;

  let errorMessage = "";
  const response = await fetch("/register/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody,
  });
  if (response.status != 200) {
    const errorData = await response.json();
    errorMessage = errorData.message;
    alert(errorMessage);
  } else {
    window.location.href = "/";
  }
});
