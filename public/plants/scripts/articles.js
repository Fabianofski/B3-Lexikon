async function addToFavourites(articleName) {
  await fetch(`/favourite?article=${articleName}`, {
    method: "POST"
  });
  document.getElementById("removeFavourite").classList.remove("hidden");
  document.getElementById("addFavourite").classList.add("hidden");
}

async function removeFromFavourites(articleName) {
  await fetch(`/favourite?article=${articleName}`, {
    method: "delete"
  });
  document.getElementById("removeFavourite").classList.add("hidden");
  document.getElementById("addFavourite").classList.remove("hidden");
}

async function addComment(articleName){
  const comment = document.getElementById("comment").value;
  const commentName = document.getElementById("comment-name").value;

  if(comment === "" || commentName === ""){
    return;
  }

  await fetch(`/comment?article=${articleName}&comment=${comment}&name=${commentName}`, {
    method: "POST"
  });
  window.location.reload();
}