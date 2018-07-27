
import { SortStateEnum, SortTypeEnum, ISortModel } from '../i-sort';
export class SortBarPosition {
    private xOffset = 0;
    private yOffset = 0;
    private marginXOffset = 20;
    private width = 40;
    private height = 35;
    private canvasHeigth = 700;
    constructor(public index: number, public value: number) { }

    getShape() {
        return {
            x: this.xOffset + (this.index - 1) * (this.marginXOffset + this.width),
            y: this.yOffset + this.canvasHeigth - this.height * this.value,
            width: this.width,
            height: this.height * this.value
        };
    }
}
export class SortBarModel implements ISortModel {
    public element: any;
    private shape: any;
    private position: SortBarPosition;
    private newValue: number;
    private newState: SortStateEnum;
    private mapBarStateColor = new Map<SortStateEnum, any>();
    constructor(public value: number, public index: number, public state: SortStateEnum) {
        this.position = new SortBarPosition(index, value);
        this.initMap();
        this.shape = this.position.getShape();
        this.element = new zrender.Rect({
            shape: this.shape,
            style: this.mapBarStateColor.get(state)
        });
    }

    initMap() {
        this.mapBarStateColor.set(SortStateEnum.Default, { fill: '#f3f3f3', text: this.value });
        this.mapBarStateColor.set(SortStateEnum.Compare, { fill: 'yellow', text: this.value });
        this.mapBarStateColor.set(SortStateEnum.Finished, { fill: 'green', text: this.value });
        this.mapBarStateColor.set(SortStateEnum.Exchange, { fill: 'red', text: this.value });
    }
    refresh() {
        this.state = this.newState;
        const style = this.mapBarStateColor.get(this.state);
        switch (this.state) {
            case SortStateEnum.Compare:
            case SortStateEnum.Default:
                style.text = this.value;
                this.element.attr('style', style);
                break;
            case SortStateEnum.Exchange:
                this.value = this.newValue;
                const newShape = new SortBarPosition(this.index, this.newValue).getShape();
                this.element.attr('shape', newShape);
                style.text = this.value;
                this.element.attr('style', style);
                break;
            case SortStateEnum.Finished:
                this.element.attr('style', style);
                break;
        }
    }
    update(newValue: number, state: SortStateEnum) {

        this.newState = state;
        this.newValue = newValue;
        this.refresh();
    }

}
