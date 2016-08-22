/**
 * Created by suncg on 2016/8/18.
 */
import THREE from 'three';

class Cylinder {
    constructor(options) {
        this.xCylinder = null;
        this.yCylinder = null;
        this.zCylinder = null;

        this.init(options);
    }

    init(options) {
        let cylinderHeight = 0.7;
        let cylinderRadiusTop = 0.25;
        let cylinderRadiusBottom = 0.25;
        let geometry = new THREE.CylinderGeometry(cylinderRadiusTop, cylinderRadiusBottom, cylinderHeight, 32);
        let material = new THREE.MeshBasicMaterial({
            visible: false
            // color: 0xffff00,
            // depthTest: false
        });
        let xCylinder = new THREE.Mesh(geometry, material);
        let yCylinder = new THREE.Mesh(geometry, material);
        let zCylinder = new THREE.Mesh(geometry, material);

        xCylinder.name = "xCylinder";
        yCylinder.name = "yCylinder";
        zCylinder.name = "zCylinder";


        xCylinder.position.copy(options.xPoint);
        yCylinder.position.copy(options.yPoint);
        zCylinder.position.copy(options.zPoint);

        xCylinder = xCylinder.rotateZ(Math.PI / 2);
        // yCylinder = yCylinder;
        zCylinder = zCylinder.rotateX(Math.PI / 2);

        this.xCylinder = xCylinder;
        this.yCylinder = yCylinder;
        this.zCylinder = zCylinder;

    }

}
export default Cylinder;



















