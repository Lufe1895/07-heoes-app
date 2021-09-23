import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../heroes/HeroCard';
const queryString = require('query-string');

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q='' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        search: q
    });

    const { search } = formValues;
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ search }`);
    }

    return (
        <div>
            <h1>SearchScreen</h1>

            <div className="row">
                <div className="col-5">
                    <h4>Search a hero</h4>
                    <hr />
                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            name="search"
                            autoComplete="off"
                            value={ search }
                            onChange={ handleInputChange }
                        />

                        <button
                                type="submit"
                                className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7 animate__animated animate__fadeIn">
                    <h4>Results</h4>
                    <hr />

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard 
                                    key={ hero.id }
                                    { ...hero }
                            />
                        ))
                    }

                    {(q === '') && <div className="alert alert-info ">
                        Search a hero.
                    </div>}

                    {(q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">
                        There is no hero with { q }.
                    </div>}
                </div>
            </div>
        </div>
    )
}
