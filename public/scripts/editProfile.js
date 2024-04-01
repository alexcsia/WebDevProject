const editBtn = document.getElementById("editBtn");
const form = document.getElementById("SignUpDiv");
let edit = false;
editBtn.addEventListener("click", () => {
  if (!edit) {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.removeAttribute("readonly");
    });
    edit = true;
  } else {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });

    edit = false;
  }
});
