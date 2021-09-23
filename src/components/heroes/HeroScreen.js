import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {
    const { heroId } = useParams();
    
    const hero = useMemo(() => getHeroesById(heroId), [ heroId ]);

    if(!hero) {
        return <Redirect to="/" />
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    const handleBack = () => {
        if(history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `../assets/heroes/${ heroId }.jpg` }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={ superhero } />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter Ego: { alter_ego }</b></li>
                    <li className="list-group-item"><b>Publisher: { publisher }</b></li>
                    <li className="list-group-item"><b>First Appearance: { first_appearance }</b></li>                    
                </ul>
                <h5>Characters:</h5>
                <p>{ characters }</p>

                <button 
                        className="btn btn-outline-primary"
                        onClick={ handleBack }
                >
                    ◄ Back
                </button>
            </div>
        </div>
    )
}
