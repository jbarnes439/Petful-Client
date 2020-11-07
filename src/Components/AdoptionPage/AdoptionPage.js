import React, { Component } from 'react';
import apiService from '../../API-utilities/API-utilities';
import Pet from '../Pet/Pet';
import People from '../People/People';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

class AdoptionPage extends Component {
    state = {
        cat: {},
        dog: {},
        people: [],
        signup: "",
        inLine: "",
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

        setInterval(apiService.dequeuePerson(), 5000);
    }

    startAdopting = () => {
        apiService.dequeuePerson();
        apiService.getPeople().then(people => this.setState({ people }))
        let random = getRandomInt(2)
        console.log(random);
        (random === 0)
            ? apiService.dequeueAdoptedDog() && apiService.getDogs().then(dog => this.setState({dog}))
            : apiService.dequeueAdoptedCat() && apiService.getCats().then(cat => this.setState({cat}));       
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

    handleSignupChange = (event) => {
        event.preventDefault();
        this.setState({
            signup: event.target.value
        })
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();
        // create variable to know when to enable adopt buttons
        this.setState({
            inLine: this.state.signup
        })
        // console.log(`${this.state.signup} in handlesubmit`)        
        apiService.addPerson(this.state.signup)
        // update state to reflect changes to the adopter list
        apiService.getPeople()
            .then(people => this.setState({
                people
            }));
        const adopting = setInterval(this.startAdopting(), 5000);
        if (this.state.people.length === 1) {
            clearInterval(adopting)
        }               
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
                            value={this.state.signup}
                            onChange={event => this.handleSignupChange(event)}>
                        </input>
                        <button onClick={this.handleSignupSubmit}>Get a fur baby!</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default AdoptionPage;