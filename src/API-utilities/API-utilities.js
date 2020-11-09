import config from '../config';

const apiService = {
    getCats() {
        return fetch(`${config.REACT_APP_API_BASE}/cats`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getDogs() {
        return fetch(`${config.REACT_APP_API_BASE}/dogs`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    dequeueAdoptedDog() {
        fetch(`${config.REACT_APP_API_BASE}/dogs`, {
            method: 'DELETE',            
        })
    },

    dequeueAdoptedCat() {
        fetch(`${config.REACT_APP_API_BASE}/cats`, {
            method: 'DELETE',            
        })
    },

    getPeople() {
        return fetch(`${config.REACT_APP_API_BASE}/people`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    dequeuePerson() {
        fetch(`${config.REACT_APP_API_BASE}/people`, {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
            }
        })
    },

    addPerson(person) {
        let newPerson = { "name" : person}        
        fetch(`${config.REACT_APP_API_BASE}/people`, {
            method: 'POST',            
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newPerson),
        })
    }
}

export default apiService