import './App.css'
import {useState, useEffect} from "react"
function App() {



  const [pokemones, setPokemones] = useState([])
  const[busquedapokemon,setbusquedaPokemon] = useState("")
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
         <h1 className='titulo'>Pokedex - mike bonito</h1>
         <h2>Welcome to the Pokedex</h2>
         <p>find your favorite pokemon!.</p>
<input type="busqueda" "text"placeholder='busca a tu pokemon'/>

         {pokemones.map((pokemon) =>(
          <div className="card" key={pokemon.id}>
          <h1>{pokemon.nombre} #({pokemon.id}) </h1>
<h2>welcome to the Pokedex</h2>
<p>find your favorite pokemon!</p>
<input
className="busqueda"
type="text"
placeholder="busca a tu pokemon"
value={busquedapokemon}
/>
          <img src={pokemon.imagen} alt=""/>
          <p>altura : {pokemon.altura / 10} m</p>
          <p>peso: {pokemon.peso / 10} kg</p>
        </div>
        ))}
      

         <div>
          <p>Developed by mike bonito</p>
          <p>2025</p>
          <p>All rights reserved</p>
         </div>
    </>
  )
}

export default App