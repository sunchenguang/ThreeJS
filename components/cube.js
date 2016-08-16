/**
 * Created by suncg on 2016/8/16.
 */
import THREE from 'three';
import Axis from './axis';


class Cube {
    constructor() {
        this.cube = null;

        this.axis = {};


        this.addAxis();
        this.init();
        this.initExternalCube();
        this.addCylinder();

    }

    init() {
        let geometry = new THREE.BoxGeometry(1, 1, 1);

        let material = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            polygonOffset: true,
            polygonOffsetFactor: 0.5,
            polygonOffsetUnits: 0.5
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.name = "cube";
        this.cube.position.set(0, 0, 0);


        //添加边
        var frameGeometry = this.createBoxFrame(geometry);
        //正方体添加实线
        this.cube.add(new THREE.LineSegments(frameGeometry, new THREE.LineBasicMaterial(
            {
                color: 'black',
                depthTest: 'true'
            }
        )));
        //添加虚线
        this.cube.add(new THREE.LineSegments(frameGeometry, new THREE.LineDashedMaterial(
            {
                color: 'black',
                gapSize: 0.05,
                dashSize: 0.05,
                depthTest: false
            }
        )));

        //添加中心立方体
        let scaleController = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({
            color: "yellow",
            depthTest: false
        }));

        scaleController.name = 'scaleController';

        // this.cube.add(scaleController);
        this.axis.scaleController = scaleController;

    }

    initExternalCube() {
        let xLineColor = 0xFF0000, yLineColor = 0x008000, zLineColor = 0x0000FF;

        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let xMaterial = new THREE.MeshBasicMaterial({
            color: xLineColor
        });
        let yMaterial = new THREE.MeshBasicMaterial({
            color: yLineColor
        });
        let zMaterial = new THREE.MeshBasicMaterial({
            color: zLineColor
        });

        let xCube = new THREE.Mesh(geometry, xMaterial);
        let yCube = new THREE.Mesh(geometry, yMaterial);
        let zCube = new THREE.Mesh(geometry, zMaterial);


        xCube.position.copy(this.axis.xLine.geometry.vertices[1]);
        yCube.position.copy(this.axis.yLine.geometry.vertices[1]);
        zCube.position.copy(this.axis.zLine.geometry.vertices[1]);

        xCube.name = "xCube";
        yCube.name = "yCube";
        zCube.name = "zCube";

        this.axis.xCube = xCube;
        this.axis.yCube = yCube;
        this.axis.zCube = zCube;


        // this.cube.add(xCube);
        // this.cube.add(yCube);
        // this.cube.add(zCube);


    }

    createBoxFrame(geometry) {
        let frameGeometry = new THREE.Geometry();
        let vector;

        geometry.vertices.forEach(function (item, index) {
            vector = item.clone();
            vector.x -= item.x;

            frameGeometry.vertices.push(item.clone());
            frameGeometry.vertices.push(vector);

            vector = item.clone();
            vector.y -= item.y;

            frameGeometry.vertices.push(vector);
            frameGeometry.vertices.push(item.clone());

            vector = item.clone();
            vector.z -= item.z;

            frameGeometry.vertices.push(item.clone());
            frameGeometry.vertices.push(vector);
        });

        frameGeometry.computeLineDistances();

        return frameGeometry;
    }

    addAxis() {
        this.axis = new Axis();
    }

    addCylinder() {
        let geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        let material = new THREE.MeshBasicMaterial({
            // visible: false
            color: 0xffff00
        });
        let xCylinder = new THREE.Mesh(geometry, material);
        let yCylinder = new THREE.Mesh(geometry, material);
        let zCylinder = new THREE.Mesh(geometry, material);

        xCylinder.name = "xCylinder";
        yCylinder.name = "yCylinder";
        zCylinder.name = "zCylinder";


        xCylinder.position.copy(new THREE.Vector3(this.axis.xLine.geometry.vertices[1].x / 2, 0, 0));
        yCylinder.position.copy(new THREE.Vector3(0, this.axis.yLine.geometry.vertices[1].y / 2, 0));
        zCylinder.position.copy(new THREE.Vector3(0, 0, this.axis.zLine.geometry.vertices[1].z / 2));

        this.axis.xCylinder = xCylinder.rotateZ(Math.PI / 2);
        this.axis.yCylinder = yCylinder;
        this.axis.zCylinder = zCylinder.rotateX(Math.PI / 2);

    }

}

export default Cube;

































