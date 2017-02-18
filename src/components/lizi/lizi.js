let recursive = null;

export default {
    name: 'lizi',

    porps: {
        options: String
    },

    mounted() {
        this.init();
        this.draw();
    },

    methods: {
        init() {    
            this.initVar();
            this.$el.width = this.w;
            this.$el.height = this.h;
            this.$el.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;opacity:0.5';
            this.ctx = this.$el.getContext('2d');
        },

        initVar() {                    
            this.w = window.innerWidth || document.body.clientWidth;
            this.h = window.innerHeight || document.body.clientHeight;

            recursive = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 45);
            };
           
            this.opts = Object.assign({
                count: 99,
            }, this.options);

            this.fp = {
                x: null,
                y: null,
                max: 20000
            };

            this.points = this.buildPoints();

        },

        setFp(event) {
            event = event || window.event;
            this.fp.x = event.clientX;
            this.fp.y = event.clientY;
        },

        clearFp() {
            this.fp.x = null;
            this.fp.y = null;
        },

        draw() {
            this.ctx.clearRect(0,  0, this.w, this.h);
            let pts = [this.fp].concat(this.points);
            let xdif = 0, ydif = 0, r = 0, ratio = 0;
            this.points.forEach(v => {
                v.x += v.xa;
                v.y += v.ya;
                v.xa *= (v.x > this.w || v.x < 0) ? -1 : 1;
                v.ya *= (v.y > this.h || v.y < 0) ? -1 : 1;
                this.ctx.fillRect(v.x - 0.5, v.y - 0.5, 1, 1);
                pts.forEach(pt => {
                    if (v !== pt && pt.x != null && pt.y != null) {
                        xdif = v.x - pt.x;
                        ydif = v.y - pt.y;
                        r = xdif * xdif + ydif * ydif;
                        if (r < pt.max) {  
                            if (pt === this.fp && r >= pt.max / 2) {
                                v.x -= 0.03 * xdif;
                                v.y -= 0.03 * ydif;
                            }        
                            ratio = (pt.max - r) / pt.max;                  
                            this.ctx.beginPath();
                            this.ctx.lineWidth = ratio / 2;
                            this.ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
                            this.ctx.moveTo(v.x, v.y);
                            this.ctx.lineTo(pt.x, pt.y);
                            this.ctx.stroke();
                        }
                    }
                });
                pts.splice(pts.indexOf(v), 1);
            });
            recursive(this.draw);
        },

        buildPoints() {
            let arr = [];
            for (let i = 0; i < this.opts.count; i++) {
                arr.push({
                    x: Math.random() * this.w,
                    y: Math.random() * this.h,
                    xa: Math.random() * 2 - 1, // -1 ~ 1
                    ya: Math.random() * 2 - 1,
                    max: 6000
                })
            }
            return arr;
        }
    }
}