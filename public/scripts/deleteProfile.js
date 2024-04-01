const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", () => {
  alert("clicked!");
  fetch("/user/delete");
});
