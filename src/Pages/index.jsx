//import { useEffect, useState } from 'react';
import {Container} from 'reactstrap'
import Grid from '../Components/Grid';

function Home({ buscaPoke }) {
    
  

    return (
        <Container className='py-5'>
           <Grid
           buscaPoke={buscaPoke}
           />
        </Container>
            
    );
}

export default Home;