import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function PokemonRenderFieldComponent() {
    const [pokemons, setPokemons] = useState([])
    const [pokemon, setPokemon] = useState()
    const [request, setRequest] = useState(false);
    // const [currentOffset, setCurrentOffset] = useState(0);

    // useEffect(() => {
    //     getDinamicPokemons(10, 0)
    // }, [])

    useEffect(() => {
        // getPokemon()
        // console.log(pokemon);

    }, [])

    const pokemonImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
    const initialImage = "https://wallpapers.com/images/featured/pokemon-va6139eg5csznzmw.jpg"

    // const getPokemons = async () => {
    //     try {
    //         const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")

    //         if (response.status != 200) {
    //             throw Error("Falha ao realizar requisição.")
    //         }

    //         const data = response.data.results

    //         const details = await Promise.all(data.map(async (pokemon) => {
    //             const res = await axios.get(pokemon.url);
    //             return {
    //                 name: res.data.name,
    //                 image: res.data.sprites.other['official-artwork'].front_default,
    //                 id: res.data.id
    //             };
    //         }));

    //         setPokemons(details)

    //     } catch (error) {
    //         throw Error("Falha ao realizar requisição.", error)
    //     }
    // }

    const getDinamicPokemons = async (limit, offset) => {
        try {

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

            if (response.status != 200) {
                throw Error("Falha ao realizar requisição.")
            }

            const data = response.data.results

            const details = await Promise.all(data.map(async (pokemon) => {
                const res = await axios.get(pokemon.url);
                return {
                    name: res.data.name,
                    image: res.data.sprites.other['official-artwork'].front_default,
                    id: res.data.id,
                    types: res.data.types.map(t => t.type.name)
                };
            }));

            setPokemons(details)
            // setCurrentLimit(limit + currentLimit)
            // setCurrentOffset(offset + currentOffset)

        } catch (error) {
            throw Error("Falha ao realizar requisição.", error)
        }
    }

    const getPokemon = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/6`)
            // console.log(response);

            if (!data) {
                throw Error("Falha ao realizar requisição.")
            }

            setPokemon(data)

        } catch (error) {
            throw Error("Falha ao realizar requisição.", error)
        }
    }
    return (
        < div className="flex flex-col bg-[#b32e30] w-full h-full justify-between text-white overflow-x-hidden" >
            <div className="flex flex-col">
                <div className="flex flex-row justify-evenly p-8">
                    <div>
                        {/* Aqui eu preciso retornar dinamicamente o nome e o número do pokemon único selecionando. */}
                        <p>(#000)</p>
                        <p>(Nome do Pikomon)</p>
                    </div>
                    <div>
                        <img src={pokemonImage} width="150px" alt="foto" />
                    </div>
                </div>
                <div className="flex flex-row justify-around items-center">
                    {/* Aqui eu faço uma renderização dinamica, se tiver pokemon no array ele exibe a listagem dos pokemons */}
                    {pokemons.length > 0 ? (
                        <div className="grid grid-cols-6 justify-items-center w-full gap-6 text-center mb-8">
                            {(pokemons.map((pokemon) => (
                                <div className="border-2 w-48 rounded-3xl flex flex-col justify-center items-center bg-white" key={pokemon.id}>
                                    <p className="text-black text-start">#{pokemon.id}</p>
                                    <img src={pokemon.image} width="150px" height="10px" alt={pokemon.name} />
                                    <div className="flex flex-col justify-center items-center text-black">
                                        <h2>{pokemon.name}</h2>
                                        {pokemon.types.map((type, index) => (
                                            <div key={index} className="text-xs w-14 rounded-md mb-2 bg-gray-200">
                                                <p>{type}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )))}
                        </div>
                        // Do contrário eu exibo uma imagem inicial.
                    ) : (
                        <div className="flex flex-col w-full h-full justify-center items-center">
                            <img className="rounded-3xl w-[800px] h-96" src={initialImage} alt="initialimage" />
                        </div>
                    )}
                    {/* Aqui abaixo eu também faço uma renderização dinâmica, se houver pokemons no array eu exibo os botoões de pesquisa única laterais
                        DO contrario eu não exibo nada.
                    */}
                    {pokemons.length > 0 && (
                        <div className="flex flex-col w-10 gap-6 items-baseline text-white text-center">
                            <button onClick={() => getPokemon(10)}>01</button>
                            <button onClick={() => getPokemon(20)}>02</button>
                            <button onClick={() => getPokemon(30)}>03</button>
                            <button onClick={() => getPokemon(40)}>04</button>
                            <button onClick={() => getPokemon(50)}>05</button>
                            <button onClick={() => getPokemon(60)}>06</button>
                            <button onClick={() => getPokemon(70)}>07</button>
                            <button onClick={() => getPokemon(80)}>08</button>
                            <button onClick={() => getPokemon(90)}>09</button>
                            <button onClick={() => getPokemon(100)}>10</button>
                        </div>
                    )}
                </div>
            </div>
            {/* Eu sei que aqui eu posso fazer uma repetição pra cada botão */}
            {/* Eu sei também que provavelmente to passando o limit e offset da forma mais burra possivel */}
            <div className="flex flex-row justify-evenly w-full text-white mb-8">
                <button onClick={() => getDinamicPokemons(10)}>1-10</button>
                <button onClick={() => getDinamicPokemons(20)}>11-20</button>
                <button onClick={() => getDinamicPokemons(30)}>21-30</button>
                <button onClick={() => getDinamicPokemons(40)}>31-40</button>
                <button onClick={() => getDinamicPokemons(50)}>41-50</button>
                <button onClick={() => getDinamicPokemons(60)}>51-60</button>
                <button onClick={() => getDinamicPokemons(70)}>61-70</button>
                <button onClick={() => getDinamicPokemons(80)}>71-80</button>
                <button onClick={() => getDinamicPokemons(90)}>81-90</button>
                <button onClick={() => getDinamicPokemons(100)}>91-100</button>
                <button onClick={() => getDinamicPokemons(110)}>101-110</button>
                <button onClick={() => getDinamicPokemons(120)}>111-120</button>
                <button onClick={() => getDinamicPokemons(130)}>121-130</button>
                <button onClick={() => getDinamicPokemons(140)}>131-140</button>
                <button onClick={() => getDinamicPokemons(150)}>141-150</button>
            </div>
        </div >
    )
}

export default PokemonRenderFieldComponent;