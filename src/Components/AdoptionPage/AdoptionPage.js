import React, { Component } from 'react';
import apiService from '../../API-utilities/API-utilities';
import Pet from '../Pet/Pet';
import People from '../People/People';
import './AdoptionPage.css';
import { Link, withRouter } from 'react-router-dom';
import Confirmation from '../Confirmation/Confirmation';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class AdoptionPage extends Component {
    state = {
        cat: {},
        dog: {},
        people: [],
        signup: "",
        inLine: "",
        turnToAdopt: "",
        readyToAdopt: false,
        adopted: false,        
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

        console.log('componetDidMount ' + this.state.people[0]);
        if (this.state.people[0] == this.state.inLine) {
            this.setState({readyToAdopt: true})
        }
        this.startAdopting();                
    }    

    startAdopting = () => {
        let adoptionInterval = setInterval(() => {
            let queueFill = ['Julian', 'Bubbles', 'Jacob Collins', 'George Green', 'Sam Losco']
            /* if person who signed up is the at the front of the queue
               stop the interval and enable pet adoption */
            if ((this.state.people[1] === this.state.inLine)) {
                this.setState({readyToAdopt: true})
                clearInterval(adoptionInterval)
            }
            // remove first person in line
            apiService.dequeuePerson();
            apiService.addPerson(queueFill[getRandomInt(4)]);
            apiService.getPeople().then(people => this.setState({ people }));
            // alternate between adopting out dog or cat       
            if (this.state.people.length % 2 === 0) {            
                apiService.dequeueAdoptedDog()
                apiService.getDogs().then(dog => this.setState({ dog }))
            } else {
                apiService.dequeueAdoptedCat()
                apiService.getCats().then(cat => this.setState({ cat }))
            }
        }, 5000)                
    }

    handleAdoptDogClick = (event) => {
        event.preventDefault();
        apiService.dequeueAdoptedDog();
        apiService.dequeuePerson(this.state.people[0]);
        apiService.getPeople().then(people => this.setState({ people }));

        apiService.getDogs()
            .then(dog => {
                this.setState({ dog, readyToAdopt: false, adopted: true })
            })
    }

    handleAdoptCatClick = (event) => {
        event.preventDefault();
        apiService.dequeueAdoptedCat();
        apiService.dequeuePerson(this.state.people[0]);
        apiService.getPeople().then(people => this.setState({ people }));

        apiService.getCats()
            .then(cat => {
                this.setState({ cat, readyToAdopt: false, adopted: true })
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
        apiService.addPerson(this.state.signup)
        // update state to reflect changes to the adopter list
        apiService.getPeople()
            .then(people => this.setState({
                people
            }));
    }

    render() {
        return (
        <div>
            <div className='adoptionDiv'>                
                <div className='centerDiv'>
                    <People
                        people={this.state.people} />
                </div>
                <div className='leftDiv'>
                    <Pet
                        readyToAdopt={this.state.readyToAdopt}
                        inLine={this.state.inLine}
                        pet={this.state.cat}
                        handleClick={this.handleAdoptCatClick} />
                </div>
                <div className='rightDiv'>
                    <Pet
                        readyToAdopt={this.state.readyToAdopt}
                        inLine={this.state.inLine}
                        pet={this.state.dog}
                        handleClick={this.handleAdoptDogClick} />
                </div>
                
            </div>
            <div>
                {this.state.adopted ? <Confirmation adopter={this.state.inLine}/> : null}
            </div>
            <div className='signupForm'>
                    <form>
                        <label htmlFor='adoption-sign-up'>Sign up to adopt!</label>
                        <input
                            name='signup'
                            value={this.state.signup}
                            onChange={event => this.handleSignupChange(event)}>
                        </input>
                        <button onClick={this.handleSignupSubmit}>Sign me up!</button>
                    </form>
                </div>
                <Link to='/'><button>About</button></Link>
                
        </div>
        )
    }
}

export default AdoptionPage;