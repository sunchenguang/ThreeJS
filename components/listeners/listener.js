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
    onMouseMove(e){

    },
    onMouseDown(event){
        event.preventDefault();

        manager.raycaster.setFromCamera(manager.mouse, manager.camera);

        let intersects = manager.raycaster.intersectObjects(manager.objects);


        if (intersects.length > 0) {
            console.log(intersects)

            manager.controls.enabled = false;

            manager.SELECTED = intersects.pop().object;

            // intersects.forEach(function (item, index) {
            //     if (item.object == manager.cube) {
            //         manager.SELECTED = manager.cube;
            //     }
            //     if (item.object == manager.scaleController) {
            //         manager.SELECTED = manager.scaleController;
            //     }
            //
            //
            // });

            manager.offset.copy(intersection).sub(manager.allObjectsGroup.position);


            // if (manager.raycaster.ray.intersectPlane(plane, intersection)) {
            //     //cube的position一直没变，是group的位置变化 偏移=交点-group中心
            //     offset.copy(intersection).sub(allObjectsGroup.position);
            // }

            manager.container.style.cursor = 'move';

        }


    },
    onMouseUp(e){

    },
    onWindowResize(e){
        manager.camera.aspect = window.innerWidth / window.innerHeight;
        manager.camera.updateProjectionMatrix();
        manager.renderer.setSize(window.innerWidth, window.innerHeight);
    }


};








