/**
 * Created by suncg on 2016/8/18.
 */
import THREE from 'three';

export default {
    rotateAroundWorldAxis(object, axis, radians) {
        let rotWorldMatrix = new THREE.Matrix4();
        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

        rotWorldMatrix.multiply(object.matrix);                // pre-multiply

        object.matrix = rotWorldMatrix;

        object.rotation.setFromRotationMatrix(object.matrix);
    }


}

