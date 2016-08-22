/**
 * Created by suncg on 2016/8/16.
 */
import THREE from 'three';

import Line from './line';
import Texture from './texture';
import Cylinder from './cylinder';
import CenterCube from './centerCube';


class Axis {
    constructor() {
        this.axes = null;
        this.texture = null;
        this.cylinders = null;
        this.centerCube = null;


        this.init();
    }

    init() {
        let axesOptions = {
            basePoint: new THREE.Vector3(0, 0, 0),
            xPoint: new THREE.Vector3(1, 0, 0),
            yPoint: new THREE.Vector3(0, 1, 0),
            zPoint: new THREE.Vector3(0, 0, 1),
            xColor: 0xff0000,
            yColor: 0x00ff00,
            zColor: 0x0000ff,
        };
        let cylinderOptions = {
            xPoint: new THREE.Vector3(0.7, 0, 0),
            yPoint: new THREE.Vector3(0, 0.7, 0),
            zPoint: new THREE.Vector3(0, 0, 0.7),
        };


        this.axes = new Line(axesOptions);
        this.texture = new Texture();

        this.cylinders = new Cylinder(cylinderOptions);

        this.centerCube = (new CenterCube(0.2)).cube;


    }


}


export default Axis;




