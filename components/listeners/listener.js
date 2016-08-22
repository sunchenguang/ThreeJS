/**
 * Created by suncg on 2016/8/16.
 */
import manager from '../manager';
import THREE from 'three';
import Util from '../utils/util';

export default {
    onMouseMove(event){
        event.preventDefault();

        let raycaster = new THREE.Raycaster();
        let distanceX, distanceY, speedX, speedY, scaleYDistance;
        let xAxis = new THREE.Vector3(1, 0, 0), yAxis = new THREE.Vector3(0, 1, 0), zAxis = new THREE.Vector3(0, 0, 1);


        //得到当前鼠标于三维的x,y坐标
        manager.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        manager.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
        manager.mouse.z = 0.5;

        raycaster.setFromCamera(manager.mouse, manager.camera);

        if (manager.SELECTED) {
            switch (manager.SELECTED.name) {
                case 'cube':
                    // mouse.unproject(camera);可以得到一个射线指向你想要的方向,mouse的x,y,z值更新
                    //mouse坐标-固定的偏移量=物体位置
                    manager.mouse.unproject(manager.camera);
                    manager.allObjectsGroup.position.copy(manager.mouse.sub(manager.offset));
                    break;

                case 'xCylinder':
                    manager.mouse.unproject(manager.camera);
                    distanceY = manager.mouse.y - manager.prevMouse.y;
                    speedY = distanceY;

                    // 第一次点击移动时不旋转
                    if (manager.prevMouse.y != 0) {
                        Util.rotateAroundWorldAxis(manager.objects[0], xAxis, -speedY);
                    }
                    manager.prevMouse.copy(manager.mouse);

                    break;


                case 'yCylinder':
                    manager.mouse.unproject(manager.camera);
                    distanceX = manager.mouse.x - manager.prevMouse.x;
                    speedX = distanceX;

                    // 第一次点击移动时不旋转
                    if (manager.prevMouse.x != 0) {
                        Util.rotateAroundWorldAxis(manager.objects[0], yAxis, speedX);
                    }
                    manager.prevMouse.copy(manager.mouse);
                    break;

                case 'zCylinder':
                    manager.mouse.unproject(manager.camera);
                    distanceY = manager.mouse.y - manager.prevMouse.y;
                    speedY = distanceY;

                    // 第一次点击移动时不旋转
                    if (manager.prevMouse.y != 0) {
                        Util.rotateAroundWorldAxis(manager.objects[0], zAxis, speedY);
                    }
                    manager.prevMouse.copy(manager.mouse);


                    break;

                case 'scaleController':
                    manager.mouse.unproject(manager.camera);
                    scaleYDistance = (manager.mouse.y - manager.prevMouse.y);

                    if (manager.prevMouse.y != 0) {
                        if (scaleYDistance > 0 && manager.allObjectsGroup.scale.x < 2) {
                            manager.allObjectsGroup.scale.multiplyScalar(1.02);
                            manager.axisGroup.scale.divideScalar(1.02);
                        } else {
                            if (manager.allObjectsGroup.scale.x > 0.3) {
                                manager.allObjectsGroup.scale.multiplyScalar(0.98);
                                manager.axisGroup.scale.divideScalar(0.98);
                            }
                        }
                    }
                    manager.prevMouse.copy(manager.mouse);


                    break;
                default:
                    console.log('mouse move select error')
            }


            return;
        }

        let intersects = raycaster.intersectObjects(manager.objects);

    },
    onMouseDown(event){
        event.preventDefault();

        let raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(manager.mouse, manager.camera);

        let intersects = raycaster.intersectObjects(manager.objects);

        if (intersects.length > 0) {
            manager.SELECTED = intersects[0].object;

            //当与射线相交的物体中有坐标轴体或中心立方体时优先选中
            for (let i = 0; i < intersects.length; i++) {
                if (/^[x|y|z]Cylinder$/.test(intersects[i].object.name)) {
                    manager.SELECTED = intersects[i].object;
                    break;
                }
                if (/^scaleController$/.test(intersects[i].object.name)) {
                    manager.SELECTED = intersects[i].object;
                    break;
                }

            }

            //更新mouse位置
            manager.mouse.unproject(manager.camera);
            //鼠标位置-物体位置=偏移量
            manager.offset.copy(manager.mouse).sub(manager.allObjectsGroup.position);
        }


    },
    onMouseUp(event){
        event.preventDefault();

        manager.SELECTED = null;

        manager.prevMouse = new THREE.Vector3(0, 0, 0);
    },
    onWindowResize(e){
        manager.camera.aspect = window.innerWidth / window.innerHeight;
        manager.camera.updateProjectionMatrix();
        manager.renderer.setSize(window.innerWidth, window.innerHeight);
    }


};








