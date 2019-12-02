import axios from 'axios';

// So how many routes are we going to need? So from user-controller, looks like 7 routes.

//Need a user-routes.js file in our routes/api


export const getAllPostings = () => {
    return axios.get('api/user')
}

export const getPostingsSavedByUser = () => {
    return axios.get('api/user')
}

export const getUsersFromSavedPosting = () => {
    return axios.get('api/user')
}

export const createSubscription = () => {
    return axios.post('api/user')
}

export const createUser = () => {
    return axios.post('api/user')
}

export const createPosting = () => {
    return axios.post('api/user')
}

export const deleteSubscription = () => {
    return axios.delete('api/user')
}

export default {
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription
}