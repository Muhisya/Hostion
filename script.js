let games = JSON.parse(localStorage.getItem("games")) || [];

const inputName = document.getElementById("inputName");
const genreGame = document.getElementById("genreGame");
const inputPrice = document.getElementById("inputPrice");
const inputStock = document.getElementById("inputStock");
const inputUrl = document.getElementById("linkGame");
const addBtn = document.getElementById("add-btn");
const gameList = document.getElementById("gameList");

function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

function renderGames() {
  gameList.innerHTML = "";
  games.forEach((game, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${game.name}</td>
      <td>${game.genre}</td>
      <td>Rp ${Number(game.price).toLocaleString("id-ID")}</td>
      <td>${game.stock}</td>
      <td>
        <button id="buy-btn">Install</button>
        <select class="actionSelect">
          <option value="">Select</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
    `;

    // Install button → open link
    const installBtn = row.querySelector("#buy-btn");
    installBtn.addEventListener("click", () => {
      if (game.url && game.url.trim() !== "") {
        window.open(game.url, "_blank"); // open in new tab
      } else {
        alert("No game link available!");
      }
    });

    // Action dropdown
    const actionSelect = row.querySelector(".actionSelect");
    actionSelect.addEventListener("change", function () {
      if (this.value === "delete") {
        games.splice(index, 1);
        saveGames();
        renderGames();
      } else if (this.value === "edit") {
        inputName.value = game.name;
        genreGame.value = game.genre.toLowerCase();
        inputPrice.value = game.price;
        inputStock.value = game.stock;
        inputUrl.value = game.url;
        games.splice(index, 1);
        saveGames();
        renderGames();
      }
      this.value = "";
    });

    gameList.appendChild(row);
  });
}

// Add button action
addBtn.addEventListener("click", () => {
  const name = inputName.value.trim();
  const genre = genreGame.value;
  const price = inputPrice.value.trim();
  const stock = inputStock.value.trim();
  const url = inputUrl.value.trim();

  if (name === "" || price === "" || stock === "") {
    alert("Enter game name, price, stock");
    return;
  }

  // Add new game object
  games.push({
    name,
    genre: genre.charAt(0).toUpperCase() + genre.slice(1),
    price,
    stock,
    url
  });

  saveGames();
  renderGames();

  // Reset inputs
  inputName.value = "";
  inputPrice.value = "";
  inputStock.value = "";
  inputUrl.value = "";
  genreGame.selectedIndex = 0;
});

// Render on page load
renderGames();