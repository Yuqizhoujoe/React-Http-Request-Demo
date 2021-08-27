import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import axios from "./axios-order";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMoviesHandler = () => {
        setIsLoading(true);
        const transformedMovies = axios.get('/films')
            .then(res => {
                const data = res.json();
                const movies = data.results.map(movie => {
                    return {
                        id: movie.episode_id,
                        title: movie.title,
                        openingText: movie.opening_crawl,
                        releaseDate: movie.release_date
                    };
                });
                return movies;
            });

        setMovies(transformedMovies);
        setIsLoading(false);
    };

    /*async function fetchMoviesHandler() {
        setIsLoading(true);
        const repsonse =  await fetch('https://swapi.dev/api/films');
        const data = await repsonse.json();

        const transformedMovies = data.results.map(movie => {
            return {
                id: movie.episode_id,
                title: movie.title,
                openingText: movie.opening_crawl,
                releaseDate: movie.release_date
            };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
    };*/

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {isLoading && <p>Loading.....</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
