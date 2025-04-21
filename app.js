const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemon_count = 151;



const bg_color = {
    grass: '#8bd369',
    fire: '#ff603f',
    water: '#3399ff',
    bug: '#Aabb22',
    normal:'#aaaa99',
    flying:'#9aa8fa',
    poison:'#b76ea4',
    electric:'#FFd34e',
    ground:'#ed356a',
    fairy:'f1a8ec',
    psychic:'#ff6ea4',
    rock:'#c5b679',
    dragon:'#7766ee',
    ice:'#66ccff',
}

searchBtn.addEventListener("click", () =>{
    search.classList.toggle("active");
})

searchInput.addEventListener("input", (e) => {
    const searchValue = searchInput.value.toLowerCase();
    const pokemonNames = document.querySelectorAll(".poke-name");

    pokemonNames.forEach((pokemonName) => {
        pokemonName.parentElement.parentElement.style.display = "block";
        if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
            pokemonName.parentElement.parentElement.style.display = "none";
        }
    });
});

const fetchPokemons = async () => {
    for (let i=1; i <= pokemon_count; i++){
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data); 
};

const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");

    const pokemonId = pokemon.id.toString().padStart(3, '0');

    const pokemonType = pokemon.types.map(type => type.type.name).join(", ");
    const primaryType = pokemon.types[0].type.name;
    const pokemonBg = bg_color[primaryType]; 
    pokemonDiv.style.backgroundColor = `${pokemonBg}`;

    const pokemonInnerHTML = `
        <div class="image-container">
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                alt="${pokemon.name} image"
            />
        </div>
        <div class="poke-info">
            <span class="poke-id">#${pokemonId}</span>
            <h3 class="poke-name">${pokemon.name}</h3>
            <div class="small">
                <small class="poke-exp">
                    <i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span>
                </small>
                <small class="poke-weight">
                    <i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span>
                </small>
            </div>
            <div class="poke-type">
                <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
            </div>
        </div>
    `;

    pokemonDiv.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonDiv);
};
    


fetchPokemons();