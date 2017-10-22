"use strict";

$(function() {
    // show modal
    showModal();

    $("body").click(function() {
        if($("#poemGen").is(":visible")) {
            $("#poemGen").fadeOut(1000, showModal);
        }
    });

    // must click outside the poem area to close
    $("#poemGen").click(function(e) {
        e.stopPropagation();
    });

    $("button").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPoem();
    });

    $("#poem").on("input", function(e) {
        $("#poemGen pre").text(e.target.value);
    });

    $("#poemFont").on("change", function() {
        $("#poemGen pre").removeClass();
        $("#poemGen pre").addClass(this.value);
    });
});

function showModal() {
    $("#mainModal").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false,
    });
}

function showPoem() {
    $.modal.close();
    $("#poemGen").fadeIn(1000);
}

