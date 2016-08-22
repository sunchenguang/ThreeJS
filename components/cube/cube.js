import THREE from 'three';


class Cube {
    constructor() {
        this.cube = null;

        this.init();
    }

    init() {
        let geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

        let material = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            depthTest: true,
            polygonOffset: true,
            polygonOffsetFactor: 0.5,
            polygonOffsetUnits: 0.5
        });

        let cube = new THREE.Mesh(geometry, material);
        cube.name = "cube";
        cube.position.set(0, 0, 0);

        let frameGeometry = this.createBoxFrame(geometry);
        //正方体添加实线
        cube.add(new THREE.LineSegments(frameGeometry, new THREE.LineBasicMaterial(
            {
                color: 'black',
                depthTest: true
            }
        )));
        //添加虚线
        cube.add(new THREE.LineSegments(frameGeometry, new THREE.LineDashedMaterial(
            {
                color: 'black',
                gapSize: 0.05,
                dashSize: 0.05,
                depthTest: false
            }
        )));

        this.cube = cube;
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


}

export default Cube;




