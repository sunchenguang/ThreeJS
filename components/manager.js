/**
 * Created by suncg on 2016/8/16.
 */
import Stats from './statis';
import Grid from './grid';
import Camera from './base/camera';
import Renderer from './base/renderer';
import Scene from './base/scene';
import THREE from 'three';
import '../lib/TrackballControls';
import listener from './listeners/listener';
import Cube from './cube';


class Manager {
    constructor() {
        this.container = null;
        this.stats = null;
        this.grid = null;
        this.cube = null;
        this.scaleController = null;
        this.camera = (new Camera()).camera;
        this.renderer = null;
        this.controls = null;
        this.scene = (new Scene()).scene;


        this.objects = [];
        this.plane = new THREE.Plane();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.offset = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        this.INTERSECTED = null;
        this.SELECTED = null;


        this.allObjectsGroup = new THREE.Group();
        this.axisGroup = new THREE.Group();


        this.init();
    }

    init() {
        this.initContainer();
        this.initRenderer();
        this.initStats();
        // this.initGrid();
        //
        this.initControls();
        this.initCube();

        // this.scaleController = this.cube.children.filter(function (item, index) {
        //     return item.name == 'scaleController';
        // })[0];

        // this.objects = this.scene.children;
        // this.objects.push(this.cube);


        console.log(this)

        for (let key in this.axis) {
            // console.log(key)
            this.axisGroup.add(this.axis[key]);
        }

        this.allObjectsGroup.add(this.cube);
        this.allObjectsGroup.add(this.axisGroup);

        this.scene.add(this.allObjectsGroup);

        // console.log(this.cube)
        // console.log(this.axisGroup)
        this.objects = [this.cube, ...this.axisGroup.children];

        console.log(this);

        this.animate();
    }

    destroy() {
        console.log('destroy--------');
    }


    initContainer() {
        // 容器
        let container = document.createElement('div');
        document.body.appendChild(container);
        this.container = container;
    }

    initStats() {
        // 统计信息
        this.stats = (new Stats()).stats;
        this.container.appendChild(this.stats.domElement);
    }

    initGrid() {
        this.grid = (new Grid()).grid;
        this.scene.add(this.grid);
    }

    initRenderer() {
        this.renderer = (new Renderer()).renderer;
        this.container.appendChild(this.renderer.domElement);
    }

    initControls() {
        this.controls = new THREE.TrackballControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        // 绑定事件
        this.renderer.domElement.addEventListener('mousemove', listener.onMouseMove.bind(this), false);
        this.renderer.domElement.addEventListener('mousedown', listener.onMouseDown.bind(this), false);
        this.renderer.domElement.addEventListener('mouseup', listener.onMouseUp.bind(this), false);

        window.addEventListener('resize', listener.onWindowResize.bind(this), false);

    }

    initCube() {
        // this.cube = new Cube();
        let {cube, axis} = new Cube();
        this.cube = cube;
        this.axis = axis;

        // this.scene.add(this.cube);
    }


    animate() {
        //必须.bind(this) 否则this值会变成undefined
        window.requestAnimationFrame(this.animate.bind(this));

        this.render();
        this.stats.update();

    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

let manager = new Manager();

export default manager;
