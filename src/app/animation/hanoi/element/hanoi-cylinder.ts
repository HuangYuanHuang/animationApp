import * as BABYLON from 'babylonjs';
import { HanoiScene } from '../scene/hanoi-scene';
export class HanoiCylinder {
    public cylinder: BABYLON.Mesh;
    public position: BABYLON.Vector3;
    private animationKeys = [];
    private animation: BABYLON.Animation;
    constructor(private name: string, private scene: HanoiScene,
        public cylinderIndex: number, private width: number, private parentPosition: BABYLON.Vector3,
        private color: BABYLON.StandardMaterial, private animationSeconds = 20) {
        this.cylinder = BABYLON.Mesh.CreateCylinder(name, 1, width, width, 32, 1,
            scene.scene, false, BABYLON.Mesh.DEFAULTSIDE);
        this.position = new BABYLON.Vector3(parentPosition.x, parentPosition.y + cylinderIndex, parentPosition.z);
        this.cylinder.position = this.position;
        this.cylinder.material = color;

        this.animation = new BABYLON.Animation(`cylinder_animation_${name}_${cylinderIndex}`,
            'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const easingFunction = new BABYLON.CubicEase();

        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

        this.animation.setEasingFunction(easingFunction);
        this.cylinder.animations.push(this.animation);
    }

    refresh(newPosition: BABYLON.Vector3) {
        const keys = [
            { frame: 0, value: this.position },
            { frame: this.animationSeconds, value: newPosition }
        ];
        this.animation.setKeys(keys);
        this.position = new BABYLON.Vector3(newPosition.x, newPosition.y, newPosition.z);
        this.scene.scene.beginAnimation(this.cylinder, 0, this.animationSeconds, false);
    }
}
