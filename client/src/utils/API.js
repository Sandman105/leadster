import axios from 'axios';

// So how many routes are we going to need? So from user-controller, looks like 7 routes.

//Need a user-routes.js file in our routes/api

// 1. Signin
export const login = (loginData) => {
    // console.log(loginData);
    return axios.post("/leadster/login", loginData);
}

// 2. Signup to sumbit form
export const createUser = (signupData) => {
    console.log(signupData);
    return axios.post("/leadster/signup", signupData);
}

// Boss
// 3. Employer posts showing all the jobs a boss posts or create a new post
export const getPostingByEmployer = bossId => {
    // console.log("user: ", bossId);
    return axios.get(`/leadster/employer/${bossId}`);
}

export const createPosting = (bossId, postData) => {
    console.log("boss: ", bossId);
    console.log("data: ", postData);
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
    // console.log("post: ", postId);
    return axios.get(`/leadster/employer/postsavers/${postId}`);
}

// Seeker
// 6. Show all jobs from all employers
export const getAllPostings = () => {
    return axios.get("/leadster/jobs");
}

// 7. Show all saved jobs
export const getPostingsSavedByUser = userId => {
    // console.log("call api: ", userId);
    return axios.get(`/leadster/jobs/saved/${userId}`);
}

// 8. Seekers click save button
export const createSubscription = (postId, subscriptionData) => {
    let data = {
        userID: subscriptionData,
        postID: postId
    }
    return axios.post(`/leadster/jobs/saved/${data.postID}` , data);
}

// 9. Unsave one job
export const deleteSubscription = (postId, subscriptionData) => {
    let data = {
        userID: subscriptionData,
        postID: postId
    }
    // console.log("API -- Data: ", data);
    return axios.delete(`/leadster/jobs/unsaved/${data.postID}/${data.userID}` , data);
}

export const queryDB = (query) => {
    return axios.post(`/leadster/jobs/query/${query}`);
}

export const updatePosting = (id, data) => {
    // console.log("API ID: ", id);
    // console.log("data: ", data.status);
    const dataSend = {
        title: data.title,
        description: data.description,
        status: data.status
    };
    return axios.post(`/leadster/employer/update/${id}`, dataSend);
}

export const getAllSeekers = () => {
    return axios.get(`/leadster/users/seekers`);
}

export const SubmitRating = (data) => {
    // console.log("data ", data);
    return axios.post(`/leadster/users/review`, data);
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
    login,
    queryDB,
    updatePosting,
    getAllSeekers,
    SubmitRating
}