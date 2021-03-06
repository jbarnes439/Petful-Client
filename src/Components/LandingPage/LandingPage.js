import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    return (
        <div>
            <h1>Petful</h1>
            <h2>Our Mission:</h2>
            <section>
                We aim to be a FIFO (first in first out) adoption center,
                where our first pet in is our first pet
                homed. Guaranteeing that all pets that come through
                our doors are homed.
            </section>
            <h3>How it works:</h3>
            <section>
                Our policy is to adopt out pets in the order in which
                they came to us to ensure every pet is adopted.
                We also apply this same principal to the selection process,
                where the prospective owners are allowed to adopt in the order
                in which they signed up to adopt.
            </section>
            <Link to='/adopt'><button>Adopt!</button></Link>
            <img src={require('../../images/cats-and-dogs.jpg')} alt='A group of cats and dogs waiting for you!' />
        </div>
    )
}

export default LandingPage;