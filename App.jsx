import './App.css'
import {useState, useEffect} from "react"
function App() {
  const [pokemones, setPokemones] = useState([])
  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      const data = await response.json()
     const { results } = data
    
    const detallesPokemon = await Promise.all(
    results.map(async (pokemon)=>{
      const respuesta = await fetch(pokemon.url)
      const datos = await respuesta.json()
      return{
      id:datos.id,
      nombre:datos.name,
      imagen:datos.sprites.front_default,
      altura:datos.height,
      peso:datos.weight
      };
    })   
    )

setPokemones(detallesPokemon)
  };
    fetchPokemones()
    
  }, [])
 
  return (
    <>
         <h1>Pokedex - Alberto Pimentel</h1>
         <h2>Welcome to the Pokedex</h2>
         <p>Here you can find information about your favorite Pokemon.</p>

         {pokemones.map((pokemon) =>(
          <div className="card" key={pokemon.id}>
          <h1>{pokemon.nombre} #({pokemon.id}) </h1>
          <img src={pokemon.imagen} alt=""/>
          <p>altura : {pokemon.altura / 10} m</p>
          <p>peso: {pokemon.peso / 10} kg</p>
        </div>
        ))}
      

         <div>
          <p>Developed by Alberto Pimentel</p>
          <p>2025</p>
          <p>All rights reserved</p>
         </div>
    </>
  )
}

export default App