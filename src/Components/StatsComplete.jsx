import { Progress } from 'reactstrap';
import './StatsComplete.scss'

function Stats({ pokeStats }) {
    // Checking if pokeStats is undefined or null
    if (!pokeStats) {
        return <div>Infelizmente essas informações estão indisponíveis no momento</div>;
    }

    
    return (
        <div className='board-stats'>
            <ul className=''>
                {pokeStats.map((stat, index) => (
                    <>
                    <span>{stat.name}</span>
                    <Progress  animated className='my-2' key={index} value={stat.base_stat} max={160}>
                         {stat.base_stat}
                    </Progress>
                    </>))}
            </ul>
        </div>
    );
}

export default Stats;