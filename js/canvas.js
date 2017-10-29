"use strict";

class PoemCanvas {
    constructor() {
        this.styles = [
            {
                "class": "monika",
                "font": "15.5pt Journal",
                "paper": "poem.jpg",
                "maxLength": 175,
                "lineHeight": 16
            },
            {
                "class": "natsuki",
                "font": "15pt Ammys Handwriting",
                "paper": "poem.jpg",
                "maxLength": 85,
                "lineHeight": 16
            },
            {
                "class": "yuri1",
                "font": "16.25pt JP Hand Slanted",
                "paper": "poem.jpg",
                "maxLength": 133,
                "lineHeight": 16
            },
            {
                "class": "yuri2",
                "font": "16.5pt As I Lay Dying",
                "paper": "poem_y1.jpg",
                "maxLength": 170,
                "lineHeight": 16
            },
            {
                "class": "special",
                "font": "15.5pt A Typewriter For Me", 
                "paper": "poem.jpg",
                "maxLength": 67,
                "lineHeight": 18
            },
            {
                "class": "yuri3",
                "font": "16.75pt Damagrafik Script", 
                "paper": "poem_y2.jpg",
                "maxLength": 33,
                "lineHeight": 16
            },
            {
                "class": "sayori",
                "font": "18.75pt Hashtag", 
                "paper": "poem.jpg",
                "maxLength": 122,
                "lineHeight": 16
            }
        ];
        this.canvasIDName = "poemImg";
        this.preLoadCanvasFonts();
    }

    // Source: https://stackoverflow.com/a/15285487
    preLoadCanvasFonts() {
        var ctx = document.getElementById(this.canvasIDName).getContext("2d");

        for (var i = 0; i < this.styles.length; i++) {
            ctx.fillText("Sample", 250, 50);
            ctx.font = this.styles[i].font;
        }
    }

    get canvasID() {
        return this.canvasIDName;
    }

    set canvasID(value) {
        this.canvasIDName = value;
    }

    get style() {
        return this.currStyle;
    }

    set style(styleName) {
        for (var i = 0; i < this.styles.length; i++) {
            if(this.styles[i].class === styleName) {
                this.currStyle = this.styles[i];
                return;
            }
        }
    }

    createDownload(text) {
        var canvas = document.getElementById(this.canvasIDName);

        if (canvas.getContext) {
            // "extract" the style properties so the img onload callback contexts can access them
            var paperPath = 'img/' + this.currStyle.paper;
            var font = this.currStyle.font;
            var lineHeight = this.currStyle.lineHeight;
            text = this.chunkString(text);

            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 1280, 720);

            var club = new Image();
            club.onload = function() { 
                ctx.drawImage(club, 0, 0); 
                
                var paper = new Image();
                paper.onload = function() { 
                    ctx.drawImage(paper, 240, 0);
                    ctx.font = font;
                    for(var i = 0; i < text.length; ++i) {
                        ctx.fillText(text[i], 265, 45 + (lineHeight * i), 1280);
                    }
            
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
                paper.src = paperPath;
            };
            club.src = 'img/club.png';
        } else {
            alert("Sorry, your browser doesn't support image generation!");
        }
    }

    // source: https://stackoverflow.com/a/7033662
    chunkString(str) {
        var strLines = str.match(new RegExp('(.|[\r\n]){1,' + this.currStyle.maxLength + '}', 'g'));

        for(var i = 0; i < strLines.length; ++i) {
            strLines[i] += '\r\n';
        }

        return strLines;
    }
};