import React from 'react';
import './Pet.css';

const Pet = (props) => {
    return (
        <div className='pet-card'>
            <img src={props.pet.imageURL && props.pet.imageURL} alt={props.pet.description} />
            <section>
                <p>Age: {props.pet.age && props.pet.age}</p>
                <p>Breed: {props.pet.breed && props.pet.breed}</p>
                <p>Description: {props.pet.description && props.pet.description}</p>
                <p>Gender: {props.pet.gender && props.pet.gender}</p>
                <p>Name: {props.pet.name && props.pet.name}</p>
                <p>Story: {props.pet.story && props.pet.story}</p>
            </section>
            {(props.people && props.people[0] === props.inLine) ? 
            <button onClick={event => props.handleClick(event)}>Adopt me!</button>
            : <button onClick={event => props.handleClick(event)} disabled>Adopt me!</button>}
        </div>
    )
}

export default Pet;