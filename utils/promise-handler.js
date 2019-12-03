module.exports = promise => {
    return promise
    .then(res => [null, res]) //here we are saying that if the promise is successful, then return an array where first item is null and second item is result. look at how its used in user-controller.js file
    .catch(err => [err, null]); //here we are saying that if the promise is unsuccessful, then return an array where first item is the error and the second item is null. look at how its used in user-controller.js file
};