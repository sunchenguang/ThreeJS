/**
 * Created by suncg on 2016/8/18.
 */
import Cube from './cube/cube';
import THREE from 'three';
import Axis from './axis/axis';

class Group {
    constructor() {
        this.allObjectsgroup = new THREE.Group();
        this.axisGroup = new THREE.Group;

        this.objects = [];

        this.init();
    }

    init() {
        let cube = (new Cube()).cube;

        let axis = (new Axis());

        let axes = axis.axes;
        let texture = axis.texture;
        let cylinders = axis.cylinders;
        let centerCube = axis.centerCube;


        this.cube = cube;
        this.centerCube = centerCube;
        this.xCylinder = cylinders.xCylinder;
        this.yCylinder = cylinders.yCylinder;
        this.zCylinder = cylinders.zCylinder;


        this.axisGroup.add(axes.xLine);
        this.axisGroup.add(axes.yLine);
        this.axisGroup.add(axes.zLine);

        this.axisGroup.add(texture.xText);
        this.axisGroup.add(texture.yText);
        this.axisGroup.add(texture.zText);

        this.axisGroup.add(cylinders.xCylinder);
        this.axisGroup.add(cylinders.yCylinder);
        this.axisGroup.add(cylinders.zCylinder);

        this.axisGroup.add(centerCube);

        this.allObjectsgroup.add(cube);
        this.allObjectsgroup.add(this.axisGroup);


    }

    initObjects() {
        this.objects.push(this.cube);
        this.objects.push(this.xCylinder, this.yCylinder, this.zCylinder, this.centerCube);

        console.log(this.objects)

        return this.objects;
    }


}

// let group = new Group();

// export default group.group;
export default Group;













