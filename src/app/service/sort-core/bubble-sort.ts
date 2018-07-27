import { IBarSort, SortUpdateModel, SortStateEnum } from './i-sort';
/**
 * 简单冒泡排序算法
 */
export class BubbleSort implements IBarSort {
    Sort(arr: number[]): SortUpdateModel[] {
        // 数组排序过程动画列表
        const res = [];
        const length = arr.length - 1;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                // 数据比较动画模型
                res.push(new SortUpdateModel(j, arr[j], SortStateEnum.Compare));
                res.push(new SortUpdateModel(j + 1, arr[j + 1], SortStateEnum.Compare));
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    // 数据交换动画模型
                    res.push(new SortUpdateModel(j, arr[j], SortStateEnum.Exchange));
                    res.push(new SortUpdateModel(j + 1, arr[j + 1], SortStateEnum.Exchange));
                }
                // 数据交换完成或者比较完成 设置为默认状态
                res.push(new SortUpdateModel(j, arr[j], SortStateEnum.Default));
                res.push(new SortUpdateModel(j + 1, arr[j + 1], SortStateEnum.Default));
            }
        }
        return res;
    }
}
