import { useState } from 'react'
import { Container, Col, InputGroup, Input, Button } from 'reactstrap'
import Logo from '../assets/Pokedex_logo.png'
import './NavBar.scss'


function NavBar({ buscaNomeCategoria }) {
    const [buscaPoke, setBuscaPoke] = useState('')

    const handleChange = (e) => {
        setBuscaPoke(e.target.value) 
        
    }

    const handleBusca = () => {
        buscaNomeCategoria(buscaPoke)
    }



    return (
        <>
        <Container fluid className='py-5 bg-navbar'>
            <Container>
            <Col className='mb-4'><a href='/'><img src={Logo} alt='pokedex logo' width='250px'/></a></Col>
            <Col >
                <InputGroup>
                    <Input 
                        placeholder='Procure por nome ou tipo...'
                        value={buscaPoke}
                        onChange={handleChange}
                         />
                    <Button onClick={handleBusca}>Pesquisar</Button>
                    
                </InputGroup>
            </Col>
            </Container>
        </Container>
        </>
    )
}

export default NavBar