import { Card, CardBody, CardTitle, CardText, CardLink, ListGroup, ListGroupItem } from 'reactstrap';
import './Card.scss'


function PokeCard({ pokeName, pokeId, pokeDescription, pokeAbility, pokePhoto, pokeType, pokemonStats }) {

    const customClassBorder = () => {
        if (Array.isArray(pokeType)) {
            
            return pokeType.map(type => {
                if (type === 'fire') {
                    return 'border border-5 border-danger';
                } else if (type === 'water') {
                    return 'border border-5 border-primary';
                } else if (type === 'grass') {
                    return 'border border-5 border-success';
                } else if (type === 'electric') {
                    return 'border border-5 border-warning';
                }
               
                return 'border border-5 border-secondary';
            });
        } else {
            
            if (pokeType === 'fire') {
                return 'border border-5 border-danger';
            } else if (pokeType === 'water') {
                return 'border border-5 border-primary';
            } else if (pokeType === 'grass') {
                return 'border border-5 border-success';
            } else if (pokeType === 'electric') {
                return 'border border-5 border-warning';
            }
            // Default class if type is not recognized
            return 'border border-5 border-secondary';
        }
    }

    return (
        <Card className={customClassBorder()} >
            <img alt={pokeName} src={pokePhoto} />   {/*image com texto alternativo*/}
            <CardBody className='cardBackground'>
                <CardTitle tag='h4' >{pokeId} - {pokeName}</CardTitle>  {/*nome do pokemon e Id*/}
            </CardBody>
            <ListGroup className='description' flush>
                <span>Tipo:</span>   {/*de quais tipos ele eh*/}
                {Array.isArray(pokeType) ? (
                    pokeType.map((type, index) => (
                        <ListGroupItem key={index}>{type}</ListGroupItem>   
                    ))
                ) : (
                    <ListGroupItem>{pokeType}</ListGroupItem>
                )}
            </ListGroup>
            <CardBody>
                
            </CardBody>
        </Card>
    );
}

export default PokeCard;