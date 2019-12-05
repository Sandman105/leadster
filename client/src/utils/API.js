import axios from 'axios';

// So how many routes are we going to need? So from user-controller, looks like 7 routes.

//Need a user-routes.js file in our routes/api

// 1. Signin
export const login = (loginData) => {
    return axios.post("/leadster/login", loginData);
}

// 2. Signup to sumbit form
export const createUser = (signipData) => {
    return axios.post("/leadster/signup", signipData);
}

// Boss
// 3. Employer posts showing all the jobs a boss posts or create a new post
export const getPostingByEmployer = bossId => {
    return axios.get(`/leadster/employer/${bossId}`);
}

export const createPosting = (bossId, postData) => {
    return axios.post(`/leadster/employer/${bossId}`, postData);
}

// 4. Post detail showing job title, job description, who saved the posts, also delete post
export const getPostingById = postId => {
    return axios.get(`/leadster/employer/posts/${postId}`);
}

export const deletePosting = postId => {
    return axios.delete(`/leadster/employer/posts/${postId}`);
}

export const getUsersFromSavedPosting = postId => {
    return axios.get(`/leadster/employer/postsavers/${postId}`);
}

// Seeker
// 6. Show all jobs from all employers
export const getAllPostings = () => {
    return axios.get("/leadster/jobs");
}

// 7. Show all saved jobs
export const getPostingsSavedByUser = postId => {
    return axios.get(`/leadster/saved/${postId}`);
}

// 8. Seekers click save button
export const createSubscription = (postId, subscriptionData) => {
    return axios.post(`/leadster/jobs/saved/${postId}` , subscriptionData);
}

// 9. Unsave one job
export const deleteSubscription = postId => {
    return axios.delete(`/leadster/jobs/unsaved/${postId}`);
}

export default {
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription,
    getPostingByEmployer,
    getPostingById,
    deletePosting,
    login
}