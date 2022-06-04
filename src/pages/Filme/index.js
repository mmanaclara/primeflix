import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import api from '../../services/api';

import './filme-info.css'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();


    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "109f9ff109b31c5dc7096437de77a6d5",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('Filme não encontrado!');
                navigate("/", {replace: true});
                return
            })
        }

        loadFilme()

        
        return () => {
            console.log('O COMPONENTE FOI DESMONTADO');
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix")

        //Se tiver um filme na lista, fica, se não começa vazio
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //Some verifica se o filme está na lista
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            alert('Esse filme já está na lista!')
            return
        }
        //Se não tiver
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert('Filme salvo com sucesso!')

    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h2>Carregando os detalhes...</h2>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1> {filme.title} </h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <a target="blank" rel="external" href={`https://youtube.com/results/?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>

            </div>
        </div>
    );
}

export default Filme;