var windowWidth;
var windowHeight;
var canvas;
var context;
var g;
var pxs = [];
var rint = 50;
var resizeTimer;

$(document).ready(function () {

    setWindowValues();
    setContainerValues();
    setupCanvas();

    for (var i = 0; i < 50; i++) {
        pxs[i] = new Circle();
        pxs[i].reset();
    }

    setInterval(draw, rint);
});

$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('window resize');

        setWindowValues();
        setContainerValues();
        setupCanvas();
    }, 250);
});

function setWindowValues() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

function setContainerValues() {
    $('#container')
        .width(windowWidth)
        .height(windowHeight);
}

function setupCanvas() {
    canvas = document.getElementById('pixie');

    $(canvas)
        .attr('width', windowWidth)
        .attr('height', windowHeight);

    context = canvas.getContext('2d');
}

function draw() {
    context.clearRect(0, 0, windowWidth, windowHeight);

    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
}

function Circle() {
    var instance = this;

    instance.s = { ttl: 8000, xmax: 5, ymax: 2, rmax: 10, rt: 1, xdef: 960, ydef: 540, xdrift: 4, ydrift: 4, random: true, blink: true };

    this.reset = function () {
        this.x = (this.s.random ? windowWidth * Math.random() : this.s.xdef);
        this.y = (this.s.random ? windowHeight * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
        this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    }

    this.fade = function () {
        this.rt += this.s.rt;
    }

    this.draw = function () {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        var newo = 1 - (this.rt / this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();
        var cr = this.r * newo;
        g = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(238,180,28,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(238,180,28,' + (newo * .2) + ')');
        g.addColorStop(1.0, 'rgba(238,180,28,0)');
        context.fillStyle = g;
        context.fill();
    }

    this.move = function () {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > windowWidth || this.x < 0) this.dx *= -1;
        if (this.y > windowHeight || this.y < 0) this.dy *= -1;
    }

    this.getX = function () { return this.x; }
    this.getY = function () { return this.y; }
}
