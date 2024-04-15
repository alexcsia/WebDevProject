const editBtn = document.getElementById("editBtn");
const form = document.getElementById("SignUpDiv");
let edit = false;

editBtn.addEventListener("click", () => {
  if (!edit) {
    enableEditMode();
  } else {
    disableEditMode();
  }
});

function enableEditMode() {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.removeAttribute("disabled");
    input.style.color = "black";
  });
  editBtn.style.backgroundColor = "#316caa";
  edit = true;
}

function disableEditMode() {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.setAttribute("readonly", true);
    input.setAttribute("disabled", true);
    input.style.color = "#C8C8C8";
  });
  editBtn.style.backgroundColor = "#728e7c";
  edit = false;
}
