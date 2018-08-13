import * as BABYLON from 'babylonjs';
import { HanoiScene } from '../scene/hanoi-scene';
export class HanoiCylinder {
    public cylinder: BABYLON.Mesh;
    public position: BABYLON.Vector3;
    constructor(private name: string, private scene: HanoiScene,
        private cylinderIndex: number, private width: number, private parentPosition: BABYLON.Vector3,
        private color: BABYLON.StandardMaterial) {
        this.cylinder = BABYLON.Mesh.CreateCylinder(name, 1, width, width, 32, 1,
            scene.scene, false, BABYLON.Mesh.DEFAULTSIDE);
        this.position = new BABYLON.Vector3(parentPosition.x, parentPosition.y + cylinderIndex, parentPosition.z);
        this.cylinder.position = this.position;
        this.cylinder.material = color;
    }

    Refresh() {
        const anminBox = new BABYLON.Animation('cylinder', 'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keys = [
            { frame: 0, value: new BABYLON.Vector3(1, 4, 2) },
            { frame: 200, value: new BABYLON.Vector3(1, 2, 6) }
        ];
        anminBox.setKeys(keys);
        const easingFunction = new BABYLON.CubicEase();

        // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

        // Adding the easing function to the animation
        anminBox.setEasingFunction(easingFunction);
        this.cylinder.animations.push(anminBox);


        // Finally, launch animations on box1, from key 0 to key 100 with loop activated
        // this._scene.beginAnimation(cylinder3, 0, 200, true);

        this.scene.scene.beginAnimation(this.cylinder, 0, 200, false);
    }
}
