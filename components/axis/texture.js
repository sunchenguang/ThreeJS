/**
 * Created by suncg on 2016/8/18.
 */
import THREE from 'three';

class Texture {
    constructor() {
        this.xText = null;
        this.yText = null;
        this.zText = null;


        this.init();
    }

    init() {
        this.xText = this.makeTextSprite('X', {
            fontsize: 60
        });
        this.yText = this.makeTextSprite('Y', {
            fontsize: 60
        });
        this.zText = this.makeTextSprite('Z', {
            fontsize: 60
        });

        this.xText.position.set(1, -0.6, -0.6);
        this.yText.position.set(0, 0.5, -0.6);
        this.zText.position.set(0.5, 0, 1);


        this.xText.name = "xText";
        this.yText.name = "yText";
        this.zText.name = "zText";
    }

    makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};
        let fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        let fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        let borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        let textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {r: 0, g: 0, b: 0, a: 1.0};

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        let metrics = context.measureText(message);
        let textWidth = metrics.width;

        context.lineWidth = borderThickness;

        context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
        context.fillText(message, borderThickness, fontsize + borderThickness);

        let texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;
        //过滤警告
        texture.minFilter = THREE.LinearFilter;

        let spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            depthTest: false
//            useScreenCoordinates: false
        });
        let sprite = new THREE.Sprite(spriteMaterial);
//        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        sprite.scale.set(1, 1, 1);

        return sprite;
    }

}

export default Texture;




