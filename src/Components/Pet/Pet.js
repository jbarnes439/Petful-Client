import React from 'react';
import './Pet.css';

const Pet = (props) => {
    return (
        <div className='pet-card'>
            <img src={props.pet.imageURL} />
            <section>
                <p>Age: {props.pet.age}</p>
                <p>Breed: {props.pet.breed}</p>
                <p>Description: {props.pet.description}</p>
                <p>Gender: {props.pet.gender}</p>
                <p>Name: {props.pet.name}</p>
                <p>Story: {props.pet.story}</p>
            </section>
            <button onClick={event => props.handleClick(event)}>Adopt me!</button>
        </div>
    )
}

export default Pet;