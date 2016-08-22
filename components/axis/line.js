/**
 * Created by suncg on 2016/8/18.
 */
import THREE from 'three';

class Line {
    constructor(options) {
        this.xLine = null;
        this.yLine = null;
        this.zLine = null;

        this.options = options;

        this.init();
    }

    init() {
        let basePoint = this.options.basePoint;
        let xPoint = this.options.xPoint;
        let yPoint = this.options.yPoint;
        let zPoint = this.options.zPoint;


        this.xLine = this.getLine(basePoint, xPoint, 'xLine');
        this.yLine = this.getLine(basePoint, yPoint, 'yLine');
        this.zLine = this.getLine(basePoint, zPoint, 'zLine');

        this.xLine.name = "xLine";
        this.yLine.name = "yLine";
        this.zLine.name = "zLine";
    }

    getLine(point1, point2, lineName) {
        let xLineColor = this.options.xColor, yLineColor = this.options.yColor, zLineColor = this.options.zColor;

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


export default Line;




















