import config from '../config';

const apiService = {
    getCats() {
        return fetch(`${config.API_ENDPOINT}/cats`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getDogs() {
        return fetch(`${config.API_ENDPOINT}/dogs`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    dequeueAdoptedDog() {
        fetch(`${config.API_ENDPOINT}/dogs`, {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
            }
        })
    },

    dequeueAdoptedCat() {
        fetch(`${config.API_ENDPOINT}/cats`, {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
            }
        })
    },

    getPeople() {
        return fetch(`${config.API_ENDPOINT}/people`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    dequeuePerson() {
        fetch(`${config.API_ENDPOINT}/people`, {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
            }
        })
    },

    addPerson(person) {
        fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
            "Content-Type": "application/json"
            }
        })
    }
}

export default apiService