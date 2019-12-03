const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// pass a function reference
docReady(fn);

// use an anonymous function
docReady(function() {

    const signUpTab = document.getElementByClassName(".sign-in")
    if (onCLick) {
        singUpTab.style.height = "620px";
    }
    // code here
});
