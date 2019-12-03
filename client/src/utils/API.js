import axios from 'axios';

// So how many routes are we going to need? So from user-controller, looks like 7 routes.

//Need a user-routes.js file in our routes/api


// 2. Signup to sumbit form
export const createUser = () => {
    return axios.post("/api/signup")
}

// Boss
// 3. Employer posts showing all the jobs a boss posts or create a new post
export const getPostingByEmployer = bossId => {
    return axios.get(`api/employer/${bossId}`)
}

export const createPosting = bossId => {
    return axios.post(`api/employer/${bossId}`)
}

// 4. Post detail showing job title, job description, who saved the posts, also delete post
export const getPostingById = postId => {
    return axios.get(`/api/employer/posts/${postId}`);
}

export const deletePosting = postId => {
    return axios.delete(`/api/employer/posts/${postId}`);
}

export const getUsersFromSavedPosting = postId => {
    return axios.get(`/api/employer/postsavers/${postId}`);
}

// Seeker
// 6. Show all jobs from all employers
export const getAllPostings = () => {
    return axios.get("/api/jobs")
}

// 7. Show all saved jobs
export const getPostingsSavedByUser = postId => {
    return axios.get(`/api/saved/${postId}`)
}

// 8. Seekers click save button
export const createSubscription = postId => {
    return axios.post(`/api/jobs/saved/${postId}`)
}

// 9. Unsave one job
export const deleteSubscription = postId => {
    return axios.delete(`/api/jobs/unsaved/${postId}`);
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
    deletePosting
}