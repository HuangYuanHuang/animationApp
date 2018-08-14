import * as BABYLON from 'babylonjs';
import { HanoiScene } from '../scene/hanoi-scene';
import { HanoiCylinder } from './hanoi-cylinder';
import 'babylonjs-materials';
export class HanoiBottom {

    public bottomCylinder: BABYLON.Mesh;
    public topCylinder: BABYLON.Mesh;
    public children: HanoiCylinder[];
    constructor(private scene: HanoiScene, private maxIndex: number, private name: string,
        public position: BABYLON.Vector3) {
        this.bottomCylinder = BABYLON.Mesh.CreateCylinder(name, 1, maxIndex + 3, maxIndex + 3, 32, 1,
            scene.scene, false, BABYLON.Mesh.DEFAULTSIDE);
        this.bottomCylinder.position = position;
        const materialBox = new BABYLON.StandardMaterial(name + 'color', scene.scene);
        materialBox.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        this.bottomCylinder.material = materialBox;

        this.topCylinder = BABYLON.Mesh.CreateCylinder(name, maxIndex + 3, 0.5, 0.5, 32, 2,
            scene.scene, false, BABYLON.Mesh.DEFAULTSIDE);
        this.topCylinder.position = new BABYLON.Vector3(position.x, position.y + maxIndex / 2 + 1, position.z);
        this.children = [];
    }

    buildHanoiHeight(height: number) {
        let currIndex = 1;
        const materialBox = new BABYLON.StandardMaterial('cylinderColor', this.scene.scene);
        materialBox.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        for (let index = height; index > 0; index--) {
            this.children.push(new HanoiCylinder(`${this.name}_${index}`, this.scene, currIndex++, index, this.position, materialBox));
        }
    }
    getPushPosition(): BABYLON.Vector3 {

        return new BABYLON.Vector3(this.position.x, this.position.y + this.children.length + 1, this.position.z);
    }
    Move(height: number, to: HanoiBottom) {
        if (this.children.length > 0) {
            const top = this.children.pop();
            top.refresh(to.getPushPosition());
            to.children.push(top);
        }

    }
}
