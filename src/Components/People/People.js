import React from 'react';
import './People.css';

const People = (props) => {
    return (
        <div className='people-card'>
            <section>
                {props.people.map(person => <p>{person}</p>)}
            </section>            
        </div>
    )
}

export default People;