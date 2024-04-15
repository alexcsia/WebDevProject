const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/users/delete", {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    alert("User deleted successfully");

    await fetch("/auth/logout");

    isAuthenticated = false;
    window.location.href = "/";
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user");
  }
});
