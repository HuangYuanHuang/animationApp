import * as BABYLON from 'babylonjs';

export class HanoiScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private cylinder: BABYLON.Mesh;
    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this.createScene();

    }
    private createScene() {
        this.scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera('crarea', 2, 4, 5, new BABYLON.Vector3(50, 35, 0), this.scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(12, 1, 0), this.scene);
    }

    doRender(): void {
        this._engine.runRenderLoop(() => {
            this.scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });

    }
}
