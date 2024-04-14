function Ability(pokeAbility) {


    return ( 
    <>
    <span><p></p></span>
        <ul>
            {pokeAbility.pokeAbility.map((ability, index) => (
                <li key={index}>{ability.toUpperCase()}</li>
            ))}
        </ul>
    </>
    )
}

export default Ability