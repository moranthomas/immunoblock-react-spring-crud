import axios from 'axios'

const SPONSOR = 'merck'
const BASE_API_URL = 'http://localhost:8080'
const SPONSOR_API_URL = `${BASE_API_URL}/sponsor/${SPONSOR}`

class TrialsDataService {

    retrieveAllTrials(name) {
        //console.log('executed service')
        return axios.get(`${SPONSOR_API_URL}/trials`);
    }

    retrieveTrial(name, id) {
        //console.log('executed service')
        return axios.get(`${SPONSOR_API_URL}/trials/${id}`);
    }

    deleteTrial(name, id) {
        //console.log('executed service')
        return axios.delete(`${SPONSOR_API_URL}/trials/${id}`);
    }

    updateTrial(name, id, trial) {
        //console.log('executed service')
        return axios.put(`${SPONSOR_API_URL}/trials/${id}`, trial);
    }

    createTrial(name, trial) {
        //console.log('executed service')
        return axios.post(`${SPONSOR_API_URL}/trials/`, trial);
    }
}

export default new TrialsDataService()