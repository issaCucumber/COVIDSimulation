function drawGrid(width, height, size) {
    var i = 0;
    var j = 0;

    var grids = [];

    while(j*size < height) {
        grids.push({x: i, y: j});
        i++;

        if(i*size >= width) {
            i = 0;
            j++;
        }
    }

    return grids;
}

function generate_pos_density(population, width, height, safe_distance) {
    var grids = drawGrid(width, height, safe_distance);

    var startpos = [];
    var x = 0;
    var offset = null;
    var index = null;

    if(grids.length >= population){
        while(x < population) {
            index = Math.floor(Math.random() * grids.length);
            offset = grids.splice(index, 1);
    
            startpos.push({x: safe_distance/2 + offset[0].x * safe_distance, y: safe_distance/2 + offset[0].y * safe_distance});
            x++;
        }
    } else {
        while(x < grids.length) {
            offset = grids[x];
    
            startpos.push({x: safe_distance/2 + offset.x * safe_distance, y: safe_distance/2 + offset.y * safe_distance});
            x++;
        }

        while(x < population) {
            index = Math.floor(Math.random() * grids.length);
            offset = grids[index];
    
            startpos.push({x: safe_distance/2 + offset.x * safe_distance, y: safe_distance/2 + offset.y * safe_distance});
            x++;
        }
    }
    
    return startpos;
}

function find_quadrant(x, y, safe_distance) {

    var quarX = Math.floor(x / safe_distance) * safe_distance;
    var quarY = Math.floor(y / safe_distance) * safe_distance;

    var quarX_mid = quarX + safe_distance / 2;
    var quarY_mid = quarY + safe_distance / 2;

    if(x < quarX_mid) {
        // quadrant topleft / bottomleft
        if(y < quarY_mid) {
            return quarX + "_" + quarY;
        } else {
            return quarX + "_" + quarY_mid;
        }
    } else {
        // quadrant topright / bottomright;
        if(y < quarY_mid) {
            return quarX_mid + "_" + quarY;
        } else {
            return quarX_mid + "_" + quarY_mid;
        }
    }

}

export { generate_pos_density, find_quadrant };