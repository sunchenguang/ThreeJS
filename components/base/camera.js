/**
 * Created by suncg on 2016/8/16.
 */
import THREE from 'three';

class Camera {
    constructor(left = -8, right = 8, top = 4, bottom = -4, near = 0.1, far = 1000) {
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

        this.init();
    }

    init() {
        this.camera.position.set(3, 3, 3);
        this.camera.up.set(0, 1, 0);
        //  照相机聚焦于（0,0,0）时 修改position只会改变物体相对大小，不改变相关位置
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        })
    }
}


export default Camera;






