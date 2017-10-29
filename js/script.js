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

    $("#download").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        createDownload();
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

    if (qq < (o.length + m.length + n.length + a.length + k.length)) {
        $("body").addClass(m + o + n + i + k + a);
        $("*").off();
    }
    else {
        $("#poemGen").fadeIn(1000);
    }
}

function createDownload() {
    var canvas = document.getElementById("poemImg");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        var club = new Image();
        club.onload = function() { 
            ctx.drawImage(club, 0, 0); 
            
            var paper = new Image();
            paper.onload = function() { 
                ctx.drawImage(paper, 240, 0); 
                
                var poemText = $("#poemGen pre").text();
                ctx.font = "16pt Journal";
                ctx.fillText(poemText, 10, 50, 1280);
        
                var dt = canvas.toDataURL('image/png');
                //dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
                //dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
        
                var link = document.createElement("a");
                link.download = "poem.png";
                link.href = dt;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            paper.src = 'img/poem.jpg';
        };
        club.src = 'img/club.png';
    } else {
        alert("Sorry, your browser doesn't support image generation!");
    }
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

