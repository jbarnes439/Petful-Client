import React, { Component } from 'react';
import apiService from '../../API-utilities/API-utilities';
import Pet from '../Pet/Pet';
import People from '../People/People';

class AdoptionPage extends Component {
    state = {
        cat: {},
        dog: {},
        people: [],
        signup: null,
    }

    async componentDidMount() {
        let firstCat = await apiService.getCats();
        let firstDog = await apiService.getDogs();
        let people = await apiService.getPeople();

        this.setState({
            cat: firstCat,
            dog: firstDog,
            people
        })
    }

    handleAdoptDogClick = (event) => {
        event.preventDefault();
        apiService.dequeueAdoptedDog();

        apiService.getDogs()
            .then(dog => {
                this.setState({ dog })
            })
    }

    handleAdoptCatClick = (event) => {
        event.preventDefault();
        apiService.dequeueAdoptedCat();

        apiService.getCats()
            .then(cat => {
                this.setState({ cat })
            })
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();

        apiService.addPerson()
    }

    render() {
        return (
            <div>
                <Pet
                    pet={this.state.cat}
                    handleClick={this.handleAdoptCatClick} />

                <Pet
                    pet={this.state.dog}
                    handleClick={this.handleAdoptDogClick} />

                <People
                    people={this.state.people} />

                <section>
                    <form className='signup'>
                        <label htmlFor='adoption-sign-up'>Sign up to adopt!</label>
                        <input
                            name='signup'
                            value='signup'>
                        </input>
                        <button>Get a fur baby!</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default AdoptionPage;