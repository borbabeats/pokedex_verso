//import { useEffect, useState } from 'react';
import {Container} from 'reactstrap'
import Grid from '../Components/Grid';
import './index.scss'

function Home({ buscaPoke }) {
    
  

    return (
        <Container className='py-5 bg-index'>
           <Grid
           buscaPoke={buscaPoke}
           />
        </Container>
            
    );
}

export default Home;