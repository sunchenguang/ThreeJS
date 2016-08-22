/**
 * Created by suncg on 2016/8/18.
 */
import THREE from 'three';

class CenterCube {
    constructor(length) {
        this.cube = null;

        this.init(length);
    }

    init(length) {
        let scaleController = new THREE.Mesh(new THREE.BoxGeometry(length, length, length), new THREE.MeshBasicMaterial({
            color: 0xffffff,
            depthTest: false,
            transparent: true,
            opacity: '0.3'
        }));
        scaleController.name = 'scaleController';

        this.cube = scaleController;
    }


}


export default CenterCube;




