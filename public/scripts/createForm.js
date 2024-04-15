const createPostForm = document.getElementById("createPostForm");

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title-space").value;
  const content = document.getElementById("content-space").value;
  const tags = document.getElementById("tags-space").value;
  let errorMessage = "";

  // url encoding the request body
  const requestBody = `title=${title}&content=${content}&tags=${tags}`;
  const response = await fetch("/post/new", {
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
