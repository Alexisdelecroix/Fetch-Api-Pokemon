let directionDroite = document.getElementById("directionDroite");
let directionDroiteGauche = document.getElementById("directionDroiteGauche");
let cible = document.getElementById("cible");

// Déplacement de mon UL 
let click = 140;
let user_click = 0;

directionDroite.addEventListener("click", () => {
  user_click++;
  cible.style.left = `-${click}px`;
  click = click + 140;
});

directionGauche.addEventListener("click", () => {
  user_click++;
  click -= 140;
  cible.style.left = `-${click}px`;
  if (click === -140) {
    click = 0;
    cible.style.left = `-${click}px`;
  }
});
// Fin Déplacement 

// Function Asynchrome Fetch
async function httpGet(url) {
  // On récupére les données de l'url
  const query = await fetch(url);
  // On converti les données de l'url en chaine JSON
  const response = await query.json();
  return response;
}

// obtenir le nombre de Pokemon et généré des LI en fonction du nombre de pokemon par tranche de 10
function getNombrePokemon() {
  const response = httpGet(
    `https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0`
  );
  response.then((data) => {
    // console.log(data.results)
    let nombre = data.results.length;
    console.log(nombre);
    nombre = nombre / 10;
    console.log(nombre);
    let dataOffeset = 1;
    let id = 1;
    let i = 0;
    while (i <= nombre) {
      cible.innerHTML += ` <li class="btn" data="${dataOffeset}"><a class="page-link" href="#">${id}</a></li>`
      i++;
      dataOffeset = dataOffeset + 10;
      id++;
    }

    const btns = document.querySelectorAll(".btn");
    console.log(btns);
    btns.forEach((element) => {
      // console.log(element.getAttribute("data"));
      element.addEventListener("click", () => {
        console.log("coucou");
        getPokemons(element.getAttribute("data"))
      });
    });

  });
}
getNombrePokemon();

// Obtenir les pokemons par tranche de 10
function getPokemons(offset) {
  console.log("coucou");
  const response = httpGet(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  response.then((data) => {
    console.log(data.results)
    showPokemons(data.results, offset);
  });
}


// Afficher les pokemons 
const target = document.getElementById("pokemons");
function showPokemons(pokemons, offsetId) {
  //   let pokemonId = + offsetId +1; // Définition de l'ID initial du Pokémon
  let pokemonId = Number(offsetId) + 1;

  target.innerHTML = ``;

  pokemons.forEach((pokemon) => {
    // console.log(pokemon);
    nom = pokemon.name;
    let imgPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    target.innerHTML += `<div class="Pokemon">
                            <h2>${nom}</h2>
                            <div class="flex"><img src="${imgPokemon}"></div>
                        </div>`
    pokemonId++;
  });
}
