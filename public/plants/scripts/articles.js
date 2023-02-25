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
