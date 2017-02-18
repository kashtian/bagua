var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var recursive = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 45);
}

var points = [];
var count = 99;
var fp = {
    x: null,
    y: null,
    max: 20000
}

init();
buildPoints();

setTimeout(function() {
    draw()
}, 100);

function init() {
    canvas.width = window.innerWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.body.clientHeight;
    // 设置canvas style属性
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;opacity:0.5';
    document.body.appendChild(canvas);
    window.onmousemove = function(event) {
        event = event || window.event;
        fp.x = event.clientX;
        fp.y = event.clientY;
    }
    window.onmouseout = function() {
        fp.x = null;
        fp.y = null;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var pts = [fp].concat(points);
    var xdif, ydif, r, ratio;
    points.forEach(function(v) {
        v.x += v.xa;
        v.y += v.ya;
        v.xa *= (v.x > canvas.width || v.x < 0) ? -1 : 1;
        v.ya *= (v.y > canvas.height || v.y < 0) ? -1 : 1;
        ctx.fillRect(v.x - 0.5, v.y - 0.5, 1, 1);
        pts.forEach(function(pt) {
            if (v !== pt && pt.x !== null && pt.y !== null) {
                xdif = v.x - pt.x;
                ydif = v.y - pt.y;
                r = xdif * xdif + ydif * ydif;
                if (r < pt.max) {
                    if (pt === fp && r >= pt.max / 2) {
                        v.x -= 0.03 * xdif;
                        v.y -= 0.03 * ydif;
                    }
                    ratio = (pt.max - r) / pt.max;
                    ctx.beginPath();
                    ctx.lineWidth = ratio / 2;
                    ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
                    ctx.moveTo(v.x, v.y);
                    ctx.lineTo(pt.x, pt.y);
                    ctx.stroke();
                }
            }
        });
        pts.splice(pts.indexOf(v), 1);
    });    
    recursive(draw);
}

function buildPoints() {
    for (var i = 0; i < count; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            xa: Math.random() * 2 - 1,
            ya: Math.random() * 2 -1,
            max: 6000
        })
    }
}

