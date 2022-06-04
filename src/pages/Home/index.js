import {useState, useEffect} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';

function Home() {

    const [filmes, setFilmes] = useState ([]);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "109f9ff109b31c5dc7096437de77a6d5",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0, 5));
            setLoading(false)
        }

        loadFilmes();

    }, []);

    if(loading) {
        return (
            <div className='loading'>
                <h2>Carregando filme...</h2>
            </div>
        );
    }

    return (
        <div className='wrapper'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong> {filme.title} </strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;