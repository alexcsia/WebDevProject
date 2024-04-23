const btn_tags = document.getElementById("tag-btn");
const tagList = document.getElementById("featured-tags");
const srcBar = document.getElementById("src-bar");

const tags = [
  "#tech",
  "#design",
  "#travelling",
  "#music",
  "#art",
  "#gaming",
  "#business",
  "#education",
  "#programming",
  "#health",
  "#food",
  "#fitness",
  "#photography",
  "#books",
  "#fashion",
  "#diy",
  "#nature",
  "#science",
  "#history",
  "#movies",
  "#technology",
  "#cooking",
  "#parenting",
  "#motivation",
  "#finance",
  "#careeradvice",
  "#relationships",
  "#sports",
];

//view tags list
btn_tags.addEventListener("click", () => {
  if (tagList.style.display === "none") {
    //visible tag list
    tagList.style.display = "block";
  } else {
    //hidden tag list
    tagList.style.display = "none";
  }
});

//dynamically create the tag buttons based on available tags
function makeElements(tag) {
  const element = document.createElement("button");
  element.textContent = `${tag}`;
  element.className = "custom-button tags";
  element.style.backgroundColor = "#6da0d6";
  element.addEventListener("click", () => {
    srcBar.value += `${tag} `;
  });
  return element;
}

//add tag buttons to the list
tags.forEach((tag) => {
  const tagBtn = makeElements(tag);
  tagList.appendChild(tagBtn);
});
