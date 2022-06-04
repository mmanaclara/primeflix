import { useState, useEffect } from 'react';
import './favoritos.css'
import {Link} from 'react-router-dom';

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");

        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    return (
        <div className='meus-filmes'>
            <h2>Meus filmes</h2>

            <ul>
                {filmes.map((item)=>{
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;