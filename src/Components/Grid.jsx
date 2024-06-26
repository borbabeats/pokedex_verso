import { useEffect, useState } from 'react';
import api from '../Services/Api';
import PokeCard from '../Components/Card';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap'
import pokeloading from '../assets/pokeball-loader.gif'
import './Grid.scss'

function Grid({ buscaPoke }) {
    const [pokemonLista, setPokemonLista] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [totalPokemon, setTotalPokemon] = useState(0)
    const limit = 18
   

        //faz a busca por nome
        async function buscaPokemon(name) {
            try {
                const response = await api.get(`/pokemon/${name}`);
                const pokemonData = response.data;
                
                //const respCharact = await api.get(`/characteristic/${pokemonData.id}`)
                //const charact = respCharact.data.descriptions[7].description
                

                return {
                    name: pokemonData.name.toUpperCase(),
                    id: pokemonData.id,
                    ability: pokemonData.abilities.map(ability => ability.ability.name),
                    photo: pokemonData.sprites.front_default,
                    type: pokemonData.types.map(type => type.type.name.toUpperCase()),
                    stats: pokemonData.stats.map(stat => ({
                        name: stat.stat.name,
                        base_stat: stat.base_stat
                    })),
                    
                    //characteristics: charact ? charact : 'Gotcha it!!'
                    
                };
                
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                return null;
            }
        }

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
    
                
                if (!isEqual(updatedPokemonList, pokemonLista)) {
                    setPokemonLista(updatedPokemonList);
                }
                
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }
    
      
        buscaTodosDetalhesPokemon();
    }, [pokemonLista]); 
    

    function isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }


    useEffect(() => {
        async function searchAndSetPokemon() {
            try {
                const pokemon = await buscaPokemon(buscaPoke);
                if (pokemon) {
                    setPokemonLista([pokemon]);
                } else {
                    setPokemonLista([]);
                }
            } catch (error) {
                console.error('Error searching Pokemon:', error);
            }
        }
        searchAndSetPokemon();
    }, [buscaPoke]);




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
                        <Col key={colIndex} 
                        xs={12} md={4} sm={8}
                        className='mb-3 d-flex d-sm-flex justify-content-center'
                        >
                            {pokemon && (
                                <PokeCard  
                                    pokeName={pokemon.name}
                                    pokeId={pokemon.id}
                                    pokeAbility={pokemon.ability}
                                    pokePhoto={pokemon.photo}
                                    pokeType={pokemon.type}
                                    pokeStats={pokemon.stats}
                                    //pokeCharac={pokemon.characteristics}
                                />
                            )}
                        </Col>
                    );
                })}
            </Row>
        ))}
        
        <Pagination className='pagination-wrapper'>
            <PaginationItem disabled={paginaAtual === 1}>
                <PaginationLink onClick={firstPage} href="#">First</PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={paginaAtual === 1}>
                <PaginationLink onClick={prevPage} href="#">Prev</PaginationLink>
            </PaginationItem>

            <PaginationItem active>
                <PaginationLink>{paginaAtual}</PaginationLink>
            </PaginationItem>
            
            <PaginationItem disabled={paginaAtual * limit >= totalPokemon}>
                <PaginationLink onClick={nextPage} href="#">Next</PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={paginaAtual * limit >= totalPokemon}>
                <PaginationLink onClick={lastPage} href="#">Last</PaginationLink>
            </PaginationItem>
        </Pagination>

        
    </Container>
    );
}

export default Grid;