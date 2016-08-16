/**
 * Created by suncg on 2016/8/16.
 */

import THREE from 'three';


class Grid {
    constructor(size = 20, divisions = 20, ...colors) {
        this.grid = new THREE.GridHelper(size, divisions, ...colors);
    }

}

export default Grid;

