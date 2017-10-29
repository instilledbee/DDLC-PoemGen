"use strict";

class PoemCanvas {
    styles = [
        {
            "class": "monika",
            "font": "16pt Journal",
            "paper": "poem.jpg"
        },
        {
            "class": "natsuki",
            "font": "16pt Ammys Handwriting",
            "paper": "poem.jpg"
        },
        {
            "class": "yuri1",
            "font": "16pt JP Hand Slanted",
            "paper": "poem.jpg"
        },
        {
            "class": "yuri2",
            "font": "16pt As I Lay Dying",
            "paper": "poem_y1.jpg",
        },
        {
            "class": "special",
            "font": "16pt A Typewriter For Me", 
            "paper": "poem.jpg"
        },
        {
            "class": "yuri3",
            "font": "16pt Damagrafik Script", 
            "paper": "poem_y2.jpg",
        },
        {
            "class": "sayori",
            "font": "16pt Hashtag", 
            "paper": "poem.jpg"
        }
    ];

    constructor() {
        preLoadCanvasFonts();
        this.style = "monika";
    }

    // Source: https://stackoverflow.com/a/15285487
    preLoadCanvasFonts() {
        var ctx = document.getElementById(canvasIDName).getContext("2d");

        for (var i = 0; i < styles.length; i++) {
            ctx.fillText("Sample", 250, 50);
            ctx.font = styles[i].font;
        }
    }
    
    canvasIDName = "poemImg";

    get canvasID() {
        return this.canvasIDName;
    }

    set canvasID(value) {
        this.canvasIDName = value;
    }
    
    currStyle = {};

    get style() {
        return this.currStyle;
    }

    set style(styleName) {
        for (var i = 0; i < styles.length; i++) {
            if(styles[i].class === styleName) {
                return styles[i];
            }
        }
    }

    createDownload(text) {
        var canvas = document.getElementById(canvasIDName);

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 1280, 720);

            var club = new Image();
            club.onload = function() { 
                ctx.drawImage(club, 0, 0); 
                
                var paper = new Image();
                paper.onload = function() { 
                    ctx.drawImage(paper, 240, 0); 
                    
                    var poemText = text;
                    ctx.font = currStyle.font;
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
                paper.src = 'img/' + currStyle.paper;
            };
            club.src = 'img/club.png';
        } else {
            alert("Sorry, your browser doesn't support image generation!");
        }
    }
};