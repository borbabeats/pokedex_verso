import { useEffect, useState } from 'react';
import api from '../Services/Api';
import PokeCard from '../Components/Card';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap'
import pokeloading from '../assets/pokeball-loader.gif'

function Grid({ buscaPoke }) {
    const [pokemonLista, setPokemonLista] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [totalPokemon, setTotalPokemon] = useState(0)
    const limit = 18
   
console.log(buscaPoke)
    //lista todos os pokemons
    useEffect(() => {
        async function buscaPokemonLista() {
            try {
                const offset = (paginaAtual -1) * limit
                const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
                const pokemonDataList = response.data.results;
                const total = response.data.count
                setPokemonLista(pokemonDataList);
                setTotalPokemon(total)
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        }
        buscaPokemonLista();
    }, [paginaAtual]);


    //pega as informacoes dos pokemons
    useEffect(() => {
        async function buscaTodosDetalhesPokemon() {
            try {
                const pokemonDetails = [];
                for (const pokemon of pokemonLista) {
                    const details = await buscaPokemon(pokemon.name);
                    pokemonDetails.push(details);
                }
    
                const updatedPokemonList = pokemonLista.map((pokemon, index) => ({
                    ...pokemon,
                    ...pokemonDetails[index]
                }));
    
                // Update state only if there's a change in details
                if (!isEqual(updatedPokemonList, pokemonLista)) {
                    setPokemonLista(updatedPokemonList);
                }
                
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }
    
        // Run only if pokemonLista changes
        buscaTodosDetalhesPokemon();
    }, [pokemonLista]); // Depend on pokemonLista
    
    // Util function to compare objects deeply Comparar objetos
    function isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }


    //faz a busca por nome
    async function buscaPokemon(name) {
        try {
            const response = await api.get(`/pokemon/${name}`);
            const pokemonData = response.data;
            console.log(pokemonData.types)
            return {
                name: pokemonData.name.toUpperCase(),
                id: pokemonData.id,
                ability: pokemonData.abilities.map(ability => ability.ability.name),
                photo: pokemonData.sprites.front_default,
                type: pokemonData.types.map(type => type.type.name.toUpperCase()),
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

    function nextPage() {
        setPaginaAtual(atual => atual + 1)
    }

    function prevPage() {
        setPaginaAtual(atual => atual -1)
    }

    function firstPage() {
        setPaginaAtual(1)
    }

    function lastPage() {
        const lastPageNumber = Math.ceil(totalPokemon / limit)
        setPaginaAtual(lastPageNumber)
    }

    if (pokemonLista.photo) {
        return (
            <div className='text-center'>
                <img src={pokeloading} alt='Loading' />
            </div>
        )
    }

   

    return (
        
        <Container>
        
        {[...Array(6)].map((_, rowIndex) => (
            <Row key={rowIndex} className='mb-3'>
                {[...Array(3)].map((_, colIndex) => {
                    const pokemonIndex = (rowIndex * 3) + colIndex;
                    const pokemon = pokemonLista[pokemonIndex];
                    return (
                        <Col key={colIndex} className='mb-3'>
                            {pokemon && (
                                <PokeCard  
                                    pokeName={pokemon.name}
                                    pokeId={pokemon.id}
                                    pokeAbility={pokemon.ability}
                                    pokePhoto={pokemon.photo}
                                    pokeType={pokemon.type}
                                    pokeStats={pokemon.stats}
                                />
                            )}
                        </Col>
                    );
                })}
            </Row>
        ))}
        
        <Pagination>
            <PaginationItem disabled={paginaAtual === 1}>
                <PaginationLink onClick={firstPage} href="#">Primeira</PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={paginaAtual === 1}>
                <PaginationLink onClick={prevPage} href="#">Página anterior</PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <span>{paginaAtual}</span>
            </PaginationItem>
            
            <PaginationItem disabled={paginaAtual * limit >= totalPokemon}>
                <PaginationLink onClick={nextPage} href="#">Próxima Página</PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={paginaAtual * limit >= totalPokemon}>
                <PaginationLink onClick={lastPage} href="#">Última</PaginationLink>
            </PaginationItem>
        </Pagination>

        
    </Container>
    );
}

export default Grid;