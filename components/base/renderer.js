/**
 * Created by suncg on 2016/8/16.
 */
import THREE from 'three';


class Renderer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;
        this.renderer.setClearColor(0xfffffff, 1);
    }

}

export default Renderer;