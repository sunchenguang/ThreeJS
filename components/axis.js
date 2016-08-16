/**
 * Created by suncg on 2016/8/16.
 */
import THREE from 'three';

class Axis {
    constructor() {
        this.xLine = null;
        this.yLine = null;
        this.zLine = null;


        this.init();
    }

    init() {

        let point = {x: 0, y: 0, z: 0};
        let pointX = point.x, pointY = point.y, pointZ = point.z;
        let lineLength = 3;


        this.xLine = this.getLine(new THREE.Vector3(pointX, pointY, pointZ), new THREE.Vector3(pointX + lineLength, pointY, pointZ), 'xLine');
        this.yLine = this.getLine(new THREE.Vector3(pointX, pointY, pointZ), new THREE.Vector3(pointX, pointY + lineLength, pointZ), 'yLine');
        this.zLine = this.getLine(new THREE.Vector3(pointX, pointY, pointZ), new THREE.Vector3(pointX, pointY, pointZ + lineLength), 'zLine');

        this.xLine.name = "xLine";
        this.yLine.name = "yLine";
        this.zLine.name = "zLine";
    }

    getLine(point1, point2, lineName) {
        let xLineColor = 0xFF0000, yLineColor = 0x008000, zLineColor = 0x0000FF;

        return (function () {
            let lineMaterial = new THREE.LineBasicMaterial({
                depthTest: false
            });
            switch (lineName) {
                case 'xLine':
                    lineMaterial.color.setHex(xLineColor);
                    break;
                case 'yLine':
                    lineMaterial.color.setHex(yLineColor);
                    break;
                case 'zLine':
                    lineMaterial.color.setHex(zLineColor);
                    break;
                default:
                    console.log('get line default color');
            }

            let lineGeometry = new THREE.Geometry();
            lineGeometry.vertices.push(
                point1,
                point2
            );

            return new THREE.Line(lineGeometry, lineMaterial);
        })();

    }


}


export default Axis;




