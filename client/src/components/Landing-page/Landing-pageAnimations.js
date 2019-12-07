function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(function() {
    // DOM is loaded and ready for manipulation here

document.querySelector('.stripe-div').classList.add('expand-horizontally');

document.querySelector('#parent-form-toggle').addEventListener('click', function(e) {
    document.querySelector('.sidebar').classList.toggle('hidden');
});

});