import { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardLink, ListGroup, ListGroupItem, Button} from 'reactstrap';
import pokelogo from '../assets/pokeball-icon.png'
import pokeloading from '../assets/pokeball-loader.gif'
import './Card.scss'
import ModalPokemon from './Modal';



function PokeCard({ pokeName, pokeId, pokeDescription, pokeAbility, pokePhoto, pokeType, pokeStats }) {
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    
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
    }

    return (
        <>
        <Card className={customClassBorder()} width={'360px'}>
            {!pokePhoto ? (
                <img alt='Carregando' src={pokeloading} width='50px' />
            ) : (
                <>
                    <img alt='pokemon logo' src={pokelogo} width='50px' />
                    <img alt={pokeName} src={pokePhoto} width='100%' />
                    <CardBody>
                        <CardTitle tag='h4'>{pokeId} - {pokeName}</CardTitle>
                    </CardBody>
                    <ListGroup className='description' flush>
                        <Button onClick={toggle}>More Info</Button>
                        {/*{Array.isArray(pokeType) ? (
                            pokeType.map((type, index) => (
                                <ListGroupItem key={index}>{type}</ListGroupItem>
                            ))
                        ) : (
                            <ListGroupItem>{pokeType}</ListGroupItem>
                        )}*/}
                    </ListGroup>
                </>
            )}
        </Card>

            <ModalPokemon 
                toggle={toggle}
                pokeName={pokeName}
                isOpen={modal}
                pokeAbility={pokeAbility}
                pokeType={pokeType}
                pokeId={pokeId}
                pokePhoto={pokePhoto}
                 />
       


        </>
    );

}

export default PokeCard;