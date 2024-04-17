import { useState } from 'react';
import { Card, CardBody, CardTitle, ListGroup, Button, Badge } from 'reactstrap';
import pokelogo from '../assets/pokeball-icon.png';
import pokeloading from '../assets/pokeball-loader.gif'
import './Card.scss';
import ModalPokemon from './Modal';

function PokeCard({ pokeName, pokeId, pokeDescription, pokeAbility, pokePhoto, pokeType, pokeStats, pokeCharac }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const customClassColor = () => {
        if (Array.isArray(pokeType)) {
            return pokeType.map(type => {
                switch (type) {
                    case 'FIRE':
                        return 'text-danger me-2';
                    case 'WATER':
                        return 'text-primary me-2';
                    case 'GRASS':
                        return 'text-success me-2';
                    case 'ELECTRIC':
                        return 'text-warning me-2';
                    case 'FLYING':
                        return 'text-light me-2';
                    case 'BUG':
                        return 'text-success me-2';
                    case 'DRAGON':
                        return 'text-danger me-2';
                    case 'DARK':
                        return 'text-danger me-2';
                    case 'POISON':
                        return 'text-danger me-2';
                    case 'FAIRY':
                        return 'text-light me-2';
                    case 'FIGHTING':
                        return 'text-secondary me-2';
                    case 'WIND':
                        return 'text-danger me-2';
                    case 'NORMAL':
                        return 'text-secondary me-2';
                    default:
                        return 'text-secondary me-2';
                }
            });
        } else {
            switch (pokeType) {
                case 'FIRE':
                    return 'text-danger me-2';
                case 'WATER':
                    return 'text-primary me-2';
                case 'GRASS':
                    return 'text-success me-2';
                case 'ELECTRIC':
                    return 'text-warning me-2';
                case 'FLYING':
                    return 'text-light me-2';
                case 'BUG':
                    return 'text-success me-2';
                case 'DRAGON':
                    return 'text-danger me-2';
                case 'DARK':
                    return 'text-danger me-2';
                case 'POISON':
                    return 'text-danger me-2';
                case 'FAIRY':
                    return 'text-light me-2';
                case 'FIGHTING':
                    return 'text-secondary me-2';
                case 'WIND':
                    return 'text-danger me-2';
                case 'NORMAL':
                    return 'text-secondary me-2';
                default:
                    return 'text-secondary me-2';
            }
        }
    };

    return (
        <>
        {!pokePhoto ? (
            <img src={pokeloading}/>
        ) : (
            <Card md='12' className='card'>
                <div className='img-wrapper'>
                    <img alt='pokemon logo' src={pokelogo} width='50px' />
                    <img alt={pokeName} src={pokePhoto} width='100%' />
                </div>
                    <CardBody className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='text-center'>
                            <CardTitle tag='h4'>Nº{pokeId} - {pokeName}</CardTitle>
                            
                            {Array.isArray(pokeType) ? (
                                pokeType.map((type, index) => (
                                    <Badge key={index} color='dark' className={customClassColor()}>{type}</Badge> //me-2
                                ))
                            ) : (
                                <Badge color='dark' className={customClassColor()}>{pokeType}</Badge> //align-self-center
                                
                            )}
                        </div>
                        <Button className='mt-2' onClick={toggle}>More Info</Button>
                    </CardBody>
                
            </Card>
            )}
            <ModalPokemon
                toggle={toggle}
                pokeName={pokeName}
                isOpen={modal}
                pokeAbility={pokeAbility}
                pokeType={pokeType}
                pokeId={pokeId}
                pokePhoto={pokePhoto}
                pokeStats={pokeStats}
                pokeCharac={pokeCharac}
            />
        </>
    );
}

export default PokeCard;