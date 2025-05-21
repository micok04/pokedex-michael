import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busquedaPokemon, setBusquedaPokemon] = useState("")

 
  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      const { results } = data;

      const pokemonesDetalles = await Promise.all(
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();
          return {
            id: poke.id,
            name: poke.name,
            image: poke.sprites.front_default,
            height: poke.height,
            weight: poke.weight,
            types: poke.types.map((t) => t.type.name),
            abilities: poke.abilities.map((a) => a.ability.name),
          };
        })
      );

      setPokemones(pokemonesDetalles);
    };

    fetchPokemones();
  }, []);


  const pokemonesFiltrados = pokemones.filter((p) =>{
  return p.name.toLowerCase().includes(busquedaPokemon)
  }
    
  );

  return (
    <>
      <h1 className="titulo">POKÉDEX</h1>
      <h2>Welcome to the Pokedex</h2>
      <p>Find your favorite Pokémon!</p>

      <input 
      className="busqueda" 
      type="text" 
      placeholder="Busca a tu pokemon"
      value={busquedaPokemon}
      onChange={(e) => setBusquedaPokemon(e.target.value.toLowerCase()) }
      />
    
     {pokemones.length === 0 ? (
  <p className="loading">Loading...</p>
) : (
  <div className="container">
    {pokemonesFiltrados.length > 0 ? (

      pokemonesFiltrados.map((pokemon) => (
          <Pokemon key={pokemon.id} datos={pokemon} />
      ))
    ) : (
      <div className="no-results">No Pokémon found 😢</div>
    )}
  </div>
)}


      <div className="footer">
        <p>Developed by Alberto Pimentel</p>
        <p>2025</p>
        <p>All rights reserved</p>
      </div>
    </>
  );
}

export default App;