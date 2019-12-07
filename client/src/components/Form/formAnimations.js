/*
$(document).ready(function() {
    const panelOne = $("#form-panel-two").height(),
        panelTwo = $("#form-panel-two")[0].scrollHeight;

    $("#form-panel-two").not("#form-panel-two.active").on("click", (e) => {
        e.preventDefault();

        $("#form-toggle").addClass("visible");
        $("#form-panel-one").addClass("hidden");
        $("#form-panel-two").addClass("active");
        $("#form").animate({
            "height": panelTwo
        },
            200);
    });

    $("#form-toggle").on("click", function(e) {
        e.preventDefault();
        $(this).removeClass("visible");
        $("#form-panel-one").removeClass("hidden");
        $("#form-panel-two").removeClass("active");
        /*$("#form").animate({
            "height": panelOne
        },
            200);
    });
});*/

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
    
    document.querySelector("#form-panel-two").addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("form-toggle").classList.add("visible");
        document.getElementById("form-panel-one").classList.add("hidden");
        document.getElementById("form-panel-two").classList.add("active");
        /*$("#form").animate({
            "height": panelTwo
        },
            200);*/
    });

    document.querySelector("#form-toggle").addEventListener("click", function(e) {
        e.preventDefault();
        
        document.getElementById("form-toggle").classList.remove("visible");
        document.getElementById("form-panel-one").classList.remove("hidden");
        document.getElementById("form-panel-two").classList.remove("active");
        /*$("#form").animate({
            "height": panelOne
        },
            200);*/
    });
});