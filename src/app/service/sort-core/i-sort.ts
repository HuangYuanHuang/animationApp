import { SortBarModel } from './Bar/SortBarModel';
export interface IBarSort {
    Sort(arr: number[]): SortUpdateModel[];
}
export enum SortTypeEnum {
    BubbleSort,
    SelectSort
}
export enum SortStateEnum {
    Default,
    Compare,
    Exchange,
    Finished
}

export interface ISortModel {

    element: any;
    update(newValue: number, state: SortStateEnum);
}
export class SortUpdateModel {

    constructor(public index: number, public newValue: number,
        public newState: SortStateEnum) {

    }
}
