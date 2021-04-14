function randomizeXY() {
    var x = Math.floor(Math.random() * this.state.width);
    var y = Math.floor(Math.random() * this.state.height);

    return {x: x, y: y};
}

function randomizeVacStatus(vaccinated) {
    var prob = Math.random();
    if (prob <= vaccinated / 100) {
        return true;
    }

    return false;
}

function randomizeMaskStatus(masked) {
    var prob = Math.random();
    if (prob <= masked / 100) {
        return true;
    }

    return false;
};


export { randomizeXY, randomizeVacStatus, randomizeMaskStatus };