import { useState } from 'react';
import { Card, CardBody, CardTitle, ListGroup, Button, Badge } from 'reactstrap';
import pokelogo from '../assets/pokeball-icon.png';
import './Card.scss';
import ModalPokemon from './Modal';

function PokeCard({ pokeName, pokeId, pokeDescription, pokeAbility, pokePhoto, pokeType, pokeStats }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const customClassBorder = () => {
        if (Array.isArray(pokeType)) {
            return pokeType.map(type => {
                switch (type) {
                    case 'FIRE':
                        return 'border border-5 border-danger';
                    case 'WATER':
                        return 'border border-5 border-primary';
                    case 'GRASS':
                        return 'border border-5 border-success';
                    case 'ELECTRIC':
                        return 'border border-5 border-warning';
                    case 'WIND':
                        return 'border border-5 border-info';
                    default:
                        return 'border border-5 border-secondary';
                }
            });
        } else {
            switch (pokeType) {
                case 'FIRE':
                    return 'border border-5 border-danger';
                case 'WATER':
                    return 'border border-5 border-primary';
                case 'GRASS':
                    return 'border border-5 border-success';
                case 'ELECTRIC':
                    return 'border border-5 border-warning';
                case 'WIND':
                    return 'border border-5 border-info';
                default:
                    return 'border border-5 border-secondary';
            }
        }
    };
console.log(pokeType)
    return (
        <>
            <Card className={customClassBorder()} width={'360px'}>
                <>
                    <img alt='pokemon logo' src={pokelogo} width='50px' />
                    <img alt={pokeName} src={pokePhoto} width='100%' />
                    <CardBody className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='text-center'>
                            <CardTitle tag='h4'>Nº{pokeId} - {pokeName}</CardTitle>
                            
                            {Array.isArray(pokeType) ? (
                                pokeType.map((type, index) => (
                                    <Badge key={index} className='me-2 bg-dark'>{type}</Badge>
                                ))
                            ) : (
                                <Badge className='bg-dark align-self-center'>{pokeType}</Badge>
                                
                            )}
                        </div>
                        <Button className='mt-2' onClick={toggle}>More Info</Button>
                    </CardBody>
                </>
            </Card>
            <ModalPokemon
                toggle={toggle}
                pokeName={pokeName}
                isOpen={modal}
                pokeAbility={pokeAbility}
                pokeType={pokeType}
                pokeId={pokeId}
                pokePhoto={pokePhoto}
                pokeStats={pokeStats}
            />
        </>
    );
}

export default PokeCard;