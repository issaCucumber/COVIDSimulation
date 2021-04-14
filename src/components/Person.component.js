class Person {
    constructor(id, vaccinated, masked, pos, width, height, size, safe_distance, draw_callback) {
        var maxSpeed = 11;

        var speedx = Math.floor(Math.random() * maxSpeed) + 1;
        var speedy = Math.floor(Math.random() * maxSpeed) + 1;

        this.state = {
            infected: false,
            infected_t: null,
            vaccinated: vaccinated,
            masked: masked,
            speed: {vx: speedx, vy: speedy, dx: 1, dy: 1},
            pos: pos,
            quarantined: false,
            quarantine_t: null,
            immuned: false,
            recovered: false
        }

        this.canvas = { width: width, height: height };
        var canvas = document.getElementsByTagName('canvas')[0];
        if (canvas && canvas.getContext) {
            var ctx = canvas.getContext('2d');
            this.ctx = ctx;
        }

        this.id = id;
        this.size = size;
        this.safe_distance = safe_distance;
        this.draw_callback = draw_callback;
    }

    _randomizeDirection() {
        var direction = Math.floor(Math.random() * 8);
        switch(direction){
            case 0:
                this.state.speed.dx = 1;
                this.state.speed.dy = 1;
                break;
            case 1:
                this.state.speed.dx = -1;
                this.state.speed.dy = -1;
                break;
            case 2:
                this.state.speed.dx = 1;
                this.state.speed.dy = 0;
                break;
            case 3:
                this.state.speed.dx = 0;
                this.state.speed.dy = 1;
                break;
            case 4:
                this.state.speed.dx = 1;
                this.state.speed.dy = -1;
                break;
            case 5:
                this.state.speed.dx = -1;
                this.state.speed.dy = 1;
                break;
            case 6:
                this.state.speed.dx = -1;
                this.state.speed.dy = 0;
                break;
            case 7:
                this.state.speed.dx = 0;
                this.state.speed.dy = -1;
                break;
        }
    }

    _drawFrame() {
        if (this.ctx !== undefined){
            this.ctx.beginPath();
            this.ctx.arc(this.state.pos.x, this.state.pos.y, this.size, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fillStyle = this._getColor();
            this.ctx.fill();
        }
    }

    _getColor() {
        if(this.state.immuned) {
            return 'gray';
        }

        if(this.state.quarantined) {
            return 'black';
        }

        if(this.state.infected) {
            return 'red';
        }

        if(this.state.vaccinated) {
            if(this.state.masked) {
                return 'orange';
            }

            return 'green';
        }

        if(this.state.masked) {
            return 'purple';
        }

        return 'blue';
    }

    draw() {
        this._drawFrame();

        if(this.state.quarantined) { // no moving
            return;
        }

        var prevX = this.state.pos.x;
        var prevY = this.state.pos.y;

        this.state.pos.x += this.state.speed.vx * this.state.speed.dx;
        this.state.pos.y += this.state.speed.vy * this.state.speed.dy;

        this._randomizeDirection();

        if (this.state.pos.y + this.state.speed.vy * this.state.speed.dy > this.canvas.height ||
            this.state.pos.y + this.state.speed.vy * this.state.speed.dy < 0) {
            this.state.speed.dy = -this.state.speed.dy;
        }

        if (this.state.pos.x + this.state.speed.vx * this.state.speed.dx > this.canvas.width ||
            this.state.pos.x + this.state.speed.vx * this.state.speed.dx < 0) {
            this.state.speed.dx = -this.state.speed.dx;
        }

        this.draw_callback({x:prevX, y:prevY}, this);
    }

    setInfected(infected, t) {
        if(this.immuned) {
            return false;
        }

        this.state.infected = infected;

        if(infected) {
            this.state.infected_t = t;
        } else {
            if(this.vaccinated) {
                // assume there is no in-born immunity for this disease, immunity only comes from vaccination
                this.state.immuned = true;
            }
        }
    }

    setQuarantine(quarantined, t) {
        this.state.quarantined = quarantined;
        if(quarantined && this.state.quarantine_t == null) {
            this.state.quarantine_t = t;
        }
    }

    setRecovered(recovered) {
        if(recovered) { // assume immunity after recovery
            this.state.immuned = true;
            this.state.recovered = true;
            this.state.infected = false;
            this.state.infected_t = null;
            this.state.quarantined = false;
            this.state.quarantine_t = null;
        }
    }
}

export default Person;