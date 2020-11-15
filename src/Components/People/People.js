import React from 'react';
import './People.css';

const People = (props) => {

    return (
        <div className='people-card'>
            <section>
                <h4>Turn to adopt: {props.people[0] && props.people[0]}</h4>
            </section>
            <section>
                {props.people && props.people.map((person, index) => <p key={index}>{person}</p>)}
            </section>
        </div>
    )
}

export default People;