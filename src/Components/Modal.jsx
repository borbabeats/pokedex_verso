import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import { useState } from 'react';
import Abilities from './AbilitiyList'
import pokelogo from '../assets/pokeball-icon.png'
import pokeloading from '../assets/pokeball-loader.gif'
import typebug from '../assets/types/bug.png'
import typefire from '../assets/types/fire.png'
import typegrass from '../assets/types/grass.png'
import typewater from '../assets/types/water.svg'
import typefighting from '../assets/types/fighting.svg'
import typeflying from '../assets/types/flying.png'
import typeghost from '../assets/types/ghost.png'
import typeground from '../assets/types/ground.svg'
import typeice from '../assets/types/ice.svg'
import typenormal from '../assets/types/normal.svg'
import typepoison from '../assets/types/poison.svg'
import typepsychic from '../assets/types/psychic.svg'
import typerock from '../assets/types/rock.svg'
import typesteel from '../assets/types/steel.svg'



function ModalPokemon({ toggle, isOpen, pokeName, pokeAbility, pokeType, pokeId, pokePhoto }) {
    
    const customImageTypes = () => {
        if (Array.isArray(pokeType)) {
            return pokeType.map(type => {
                switch (type) {
                    case 'FIRE':
                        return <img src={typefire} width='30px' alt={type} />;
                    case 'WATER':
                        return <img src={typewater} width='30px' alt={type} />;
                    case 'GRASS':
                        return <img src={typegrass} width='30px' alt={type} />;
                    case 'BUG':
                        return <img src={typebug} width='30px' alt={type} />;
                    case 'FIGHTING':
                        return <img src={typefighting} width='30px' alt={type} />;
                    case 'FLYING':
                        return <img src={typeflying} width='30px' alt={type} />;
                    case 'GHOST':
                        return <img src={typeghost} width='30px' alt={type} />;
                    case 'GROUND':
                        return <img src={typeground} width='30px' alt={type} />;
                    case 'ICE':
                        return <img src={typeice} width='30px' alt={type} />;
                    case 'NORMAL':
                        return <img src={typenormal} width='30px' alt={type} />;
                    case 'POISON':
                        return <img src={typepoison} width='30px' alt={type} />;
                    case 'PSYCHIC':
                        return <img src={typepsychic} width='30px' alt={type} />;
                    case 'ROCK':
                        return <img src={typerock} width='30px' alt={type} />;
                    case 'STEEL':
                        return <img src={typesteel} width='30px' alt={type} />;
                    default:
                        return null;
                }
            });
        } else {
            // PAra pokemons com 1 so tipo
            switch (pokeType) {
                case 'FIRE':
                    return <img src={typefire} width='30px' alt={pokeType} />;
                case 'WATER':
                    return <img src={typewater} width='30px' alt={pokeType} />;
                case 'GRASS':
                    return <img src={typegrass} width='30px' alt={pokeType} />;
                case 'BUG':
                    return <img src={typebug} width='30px' alt={pokeType} />;
                case 'FIGHTING':
                    return <img src={typefighting} width='30px' alt={pokeType} />;
                case 'FLYING':
                    return <img src={typeflying} width='30px' alt={pokeType} />;
                case 'GHOST':
                    return <img src={typeghost} width='30px' alt={pokeType} />;
                case 'GROUND':
                    return <img src={typeground} width='30px' alt={pokeType} />;
                case 'ICE':
                    return <img src={typeice} width='30px' alt={pokeType} />;
                case 'NORMAL':
                    return <img src={typenormal} width='30px' alt={pokeType} />;
                case 'POISON':
                    return <img src={typepoison} width='30px' alt={pokeType} />;
                case 'PSYCHIC':
                    return <img src={typepsychic} width='30px' alt={pokeType} />;
                case 'ROCK':
                    return <img src={typerock} width='30px' alt={pokeType} />;
                case 'STEEL':
                    return <img src={typesteel} width='30px' alt={pokeType} />;
                default:
                    return null;
            }
        }
    }

    const pokeImage = (pokeId, pokePhoto) => {
        const imageUrl = `/pokemonHD/${pokeId}.png`; // Adjust the path as necessary
        
        if (!imageUrl) {
            return <img src={pokePhoto} alt={`Pokemon do ID ${pokeId}`} />;
        } else {          
            return <img src={imageUrl} alt={`Pokemon do ID ${pokeId}`} width='360px'/>;
        }
    }


    
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='bg-danger'>
        <ModalHeader toggle={toggle} className='d-flex flex-row justify-content-between ' style={{ flexDirection: 'row !important' }}>
            
                <Col>
                    <h2>{pokeName}</h2>
                </Col>
                <Col className='d-flex flex-column'>
                    {customImageTypes()}
                    {pokeType}
                </Col>
           
            </ModalHeader>
        <ModalBody className='d-flex flex-row justify-content-between'>
            <div className='w-50'>
                {pokeImage(pokeId, pokePhoto)}
            </div>
            <div>
                
                <Abilities
                    pokeAbility={pokeAbility}
                />
            </div>
        </ModalBody>
        <ModalFooter className='d-flex flex-row justify-content-start'>
            <img src={pokelogo} alt='Pokemon Logo' width='50px' />
        </ModalFooter>
    </Modal>
    )
}

export default ModalPokemon