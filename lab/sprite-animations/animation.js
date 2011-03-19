/*
 * CSS Sprite Animations
 */
var SpriteAnimation = function(el) {
    var isRunning = false,
        canvasEl  = document.getElementById(el),
        setStep;

    setStep = function(name, prefix, step) {
        if ( !!isRunning ) {
            canvasEl.className = name + " " + prefix + (step < 10 ? "0" : "") + step;
            return step + 1;
        } else {
            return false;
        }
    };

    this.start = function(that) {
        var run = function(step) {
            step = setStep(that.name, that.prefix, step);

            if ( step !== false ) {
                setTimeout(run, that.speed, step > that.steps ? 1 : step);
            }
        };

        isRunning = true;
        run(1);
    };

    this.stop = function() {
        isRunning = false;
        canvasEl.className = "blank";
    };

    this.runs = function() {
        return isRunning;
    };
};


SpriteAnimation.prototype = {
    name   : null,
    steps  : 0,
    speed  : 160,

    prefix : "s",

    set    : function(name, steps, speed) {
        this.name  = name;
        this.steps = Number(steps);

        if ( !!speed ) {
            this.speed = Number(speed);
        }

        if ( !this.runs() ) {
            this.start(this);
        }
    }
};


// dom
document.addEventListener("DOMContentLoaded", function() {
    var sprite = new SpriteAnimation("anim"),
        mnstr  = document.getElementById("mnstr");

    mnstr.value = "";
    mnstr.addEventListener("change", function() {
        var val  = this.value.split("-");

        if ( this.value === "" ) {
            sprite.stop();
            return;
        }

        sprite.set(val[0], val[1], val[2] ? val[2] : null);
    }, false);
}, false);
