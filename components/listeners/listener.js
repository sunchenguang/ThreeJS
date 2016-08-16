/**
 * Created by suncg on 2016/8/16.
 */
import manager from '../manager';
import THREE from 'three';

// function onDocumentMouseDown(event) {
//
//     event.preventDefault();
//
//     raycaster.setFromCamera(mouse, camera);
//
//     var intersects = raycaster.intersectObjects(objects);
//
//     if (intersects.length > 0) {
//         controls.enabled = false;
//
//         SELECTED = intersects[0].object;
//         intersects.forEach(function (item, index) {
//             if (item.object == cube) {
//                 SELECTED = cube;
//             }
//             if (item.object == scaleController) {
//                 SELECTED = scaleController;
//             }
//
//
//         });
//
//
//         if (raycaster.ray.intersectPlane(plane, intersection)) {
//             //cube的position一直没变，是group的位置变化 偏移=交点-group中心
//             offset.copy(intersection).sub(allObjectsGroup.position);
//         }
//
//         container.style.cursor = 'move';
//
//     }
//
// }

export default {
    onMouseMove(event){
        event.preventDefault();

        console.log('mousemove-----------')

        manager.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        manager.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        manager.raycaster.setFromCamera(manager.mouse, manager.camera);


        if (manager.SELECTED) {
            //
            let intersects = manager.raycaster.intersectObject(manager.SELECTED);
            if (intersects.length > 0) {
                let intersection = intersects[0].point;
                if (manager.SELECTED.name == "cube") {
                    // 物体随鼠标移动 group中心=交点-偏移
                    console.log(manager)

                    manager.allObjectsGroup.position.copy(intersection.sub(manager.offset));
                }
            }


        }


    },
    onMouseDown(event){
        event.preventDefault();

        console.log('mousedown')

        manager.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        manager.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        manager.raycaster.setFromCamera(manager.mouse, manager.camera);

        let intersects = manager.raycaster.intersectObjects(manager.objects);


        if (intersects.length > 0) {
            console.log(intersects)
            let chosen = null;

            manager.controls.enabled = false;

            chosen = intersects[0];
            manager.SELECTED = chosen.object;

            for (let item of intersects) {

                if (item.object.name == "cube") {
                    chosen = item;
                    manager.SELECTED = chosen.object;
                }
                if (item.object.name == "scaleController") {
                    chosen = item;
                    manager.SELECTED = chosen.object;
                    break;
                }

            }

            manager.intersection = chosen.point;

            manager.offset.copy(manager.intersection).sub(manager.allObjectsGroup.position);

            console.log(manager)

            // if (manager.raycaster.ray.intersectPlane(plane, intersection)) {
            //     //cube的position一直没变，是group的位置变化 偏移=交点-group中心
            //     offset.copy(intersection).sub(allObjectsGroup.position);
            // }

            // manager.container.style.cursor = 'move';

        }


    },
    onMouseUp(event){
        event.preventDefault();

        manager.controls.enabled = true;

        // if (INTERSECTED) {

        manager.SELECTED = null;

        // }
    },
    onWindowResize(e){
        manager.camera.aspect = window.innerWidth / window.innerHeight;
        manager.camera.updateProjectionMatrix();
        manager.renderer.setSize(window.innerWidth, window.innerHeight);
    }


};








