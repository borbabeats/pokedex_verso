import { useEffect, useState } from 'react';
import api from '../Services/Api';
import PokeCard from '../Components/Card';


function Grid() {
    const [pokemonList, setPokemonList] = useState([]);


    //lista todos os pokemons
    useEffect(() => {
        async function fetchPokemonList() {
            try {
                const response = await api.get('/pokemon');
                const pokemonDataList = response.data.results;
                
                setPokemonList(pokemonDataList);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        }
        fetchPokemonList();
    }, []);


    //pega as informacoes dos pokemons
    useEffect(() => {
        async function fetchAllPokemonDetails() {
            try {
                const promises = pokemonList.map(async pokemon => {
                    const pokemonData = await buscaPokemon(pokemon.name);
                    return pokemonData;
                    
                });
                
                const pokemonDetails = await Promise.all(promises);
                const updatedPokemonList = pokemonList.map((pokemon, index) => ({
                    ...pokemon,
                    ...pokemonDetails[index]
                }))
                setPokemonList(updatedPokemonList);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }

        if (pokemonList.length > 0) {
            fetchAllPokemonDetails();
        }
    }, []);


    //faz a busca por nome
    async function buscaPokemon(name) {
        try {
            const response = await api.get(`/pokemon/${name}`);
            const pokemonData = response.data;
    
            return {
                name: pokemonData.name.toUpperCase(),
                id: pokemonData.id,
                ability: pokemonData.abilities.map(ability => ability.ability.name),
                photo: pokemonData.sprites.front_default,
                type: pokemonData.types[0].type.name,
                stats: pokemonData.stats.map(stat => ({
                    name: stat.stat.name,
                    base_stat: stat.base_stat
                }))
            };
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            return null;
        }
    }

    return (
        <div className='grid-container'>
            {pokemonList.map((pokemon, index) => (
                <PokeCard 
                    key={index}
                    pokeName={pokemon.name}
                    pokeId={pokemon.id}
                    pokeAbility={pokemon.ability}
                    pokePhoto={pokemon.photo}
                    pokeType={pokemon.type}
                    pokeStats={pokemon.stats}
                />
            ))}
        </div>
    );
}

export default Grid;