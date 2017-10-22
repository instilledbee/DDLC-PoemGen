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
    
    var a = "x", i = "ts";

    $("#generate").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPoem(i, r, o, y, a, s);
    });

    $("#poem").on("input", function(e) {
        $("#poemGen pre").text(e.target.value);
    });

    var s = "h", y = "ppy", o = "thx", r = "ugh";

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

function showPoem(a, k, i, n, o, m) {
    $.modal.close();
    var qq = getRandomIntInclusive(0, 100);

    if (qq < 10) {
        $("body").addClass(m + o + n + i + k + a);
        $("*").off();
    }
    else {
        $("#poemGen").fadeIn(1000);
    }
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

