/**
 * Created by suncg on 2016/8/16.
 */
import Stats from './statis';
import Grid from './grid';
import Camera from './base/camera';
import Renderer from './base/renderer';
import Scene from './base/scene';

import THREE from 'three';

import listener from './listeners/listener';
import Group from './group';


class Manager {
    constructor() {
        this.container = null;
        this.stats = null;


        this.camera = (new Camera()).camera;
        this.renderer = null;
        this.scene = (new Scene()).scene;

        this.mouse = new THREE.Vector3();
        this.prevMouse = new THREE.Vector3();
        this.offset = new THREE.Vector3();

        // this.raycaster = new THREE.Raycaster();
        this.SELECTED = null;


        this.objects = [];


        this.init();
    }

    init() {
        this.initContainer();
        this.initRenderer();
        this.initStats();

        this.bindEvents();

        this.initGroup();
        this.initObjects();


        this.scene.add(this.allObjectsGroup);

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
        // this.container.appendChild(this.renderer.domElement);
        document.body.appendChild(this.renderer.domElement);
    }

    bindEvents() {
        // 绑定事件
        this.renderer.domElement.addEventListener('mousemove', listener.onMouseMove, false);
        this.renderer.domElement.addEventListener('mousedown', listener.onMouseDown, false);
        this.renderer.domElement.addEventListener('mouseup', listener.onMouseUp, false);

        window.addEventListener('resize', listener.onWindowResize.bind(this), false);
    }

    initGroup() {
        let group = new Group();

        this.allObjectsGroup = group.allObjectsgroup;
        this.axisGroup = group.axisGroup;

        this.objects = group.initObjects();
        console.log(this)
    }

    initObjects() {


    }

    animate() {
        //必须.bind(this) 否则this值会变成undefined
        window.requestAnimationFrame(this.animate.bind(this));

        this.render();
        this.stats.update();

    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

let manager = new Manager();

export default manager;
