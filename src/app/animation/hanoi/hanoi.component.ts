import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.scss']
})
export class HanoiComponent implements OnInit {

  constructor() { }
  createScene(): void {
  }

  doRender(): void {
  }
  ngOnInit() {
    // const canva = <HTMLCanvasElement>document.getElementById('renderCanvas');
    // const engine = new BABYLON.Engine(canva, true);

    const game = new Game('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();

  }

}

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;
  private _light: BABYLON.Light;
  constructor(canvasElement: string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);

  }

  createScene(): void {
    // Create a basic BJS Scene object.
    this._scene = new BABYLON.Scene(this._engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(1, 5, 10), this._scene);

    // Target the camera to scene origin.
    this._camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas.
    this._camera.attachControl(this._canvas, false);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    // this._light.diffuse = new BABYLON.Color3(1, 2, 2);
    // this._light.specular = new BABYLON.Color3(0, 0, 0);

    // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
    // const sphere = BABYLON.MeshBuilder.CreateSphere('cylinder',
    //   { segments: 16, diameter: 2 }, this._scene);
    const cylinder = BABYLON.Mesh.CreateCylinder('cylinder', 1, 3, 3, 32, 1, this._scene, false, BABYLON.Mesh.DEFAULTSIDE);
    cylinder.position = new BABYLON.Vector3(1, 2, 1);
    const cylinder2 = BABYLON.Mesh.CreateCylinder('cylinder', 4, 2, 2, 32, 1, this._scene, false, BABYLON.Mesh.DEFAULTSIDE);
    cylinder2.position = new BABYLON.Vector3(10, 12, 12);
    BABYLON.Mesh.CreateCylinder('cylinder', 1, 1, 1, 32, 1, this._scene, false, BABYLON.Mesh.DEFAULTSIDE);

    // Move the sphere upward 1/2 of its height.
    // sphere.position.y = 1;

    // Create a built-in "ground" shape.
    // const ground = BABYLON.MeshBuilder.CreateGround('ground',
    //   { width: 8, height: 8, subdivisions: 2 }, this._scene);
  }

  doRender(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
      this._engine.resize();
    });

  }
}
