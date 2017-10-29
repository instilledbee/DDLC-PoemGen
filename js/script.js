"use strict";

$(function() {
    // show modal
    showModal();
    var poemCanvas = new PoemCanvas();
    poemCanvas.style = "monika";

    $("body").click(function() {
        if($("#poemGen").is(":visible")) {
            $("#poemGen").fadeOut(1000, showModal);
            toggleButtons(true);
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

    $("#download").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        poemCanvas.createDownload($("#poem").val());
    });

    $("#poem").on("input", function(e) {
        $("#poemGen pre").text(e.target.value);
    });

    var s = "h", y = "ppy", o = "thx", r = "ugh";

    $("#poemFont").on("change", function() {
        // reset
        $("#poemGen").removeClass();
        $("#poemGen pre").removeClass();

        $("#poemGen").addClass('paper');
        $("#poemGen pre").addClass(this.value);

        // custom paper bgs
        if(this.value === "yuri2" || this.value === "yuri3") {
            $("#poemGen").addClass(this.value);
        }

        poemCanvas.style = this.value;
    });
});

function toggleButtons(isEnabled) {
    $("#download").attr("disabled", isEnabled);
    $("#generate").attr("disabled", isEnabled);
}

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

    if (qq < (o.length + m.length + n.length + a.length + k.length)) {
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

