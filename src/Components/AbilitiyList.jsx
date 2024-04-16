import { Badge } from 'reactstrap'

function Ability(pokeAbility) {


    return ( 
    <div className='d-flex flex-column'>
        <span className='d-flex flex-row justify-content-center'>Habilidades:</span>
        <ul  className='d-flex flex-row justify-content-center p-0'>
            {pokeAbility.pokeAbility.map((ability, index) => (
                <Badge className='ms-1 bg-dark'  key={index}>{ability.toUpperCase()}</Badge>
            ))}
        </ul>
    </div>
    )
}

export default Ability