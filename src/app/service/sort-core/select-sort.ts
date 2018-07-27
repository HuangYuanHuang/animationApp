import { IBarSort, SortUpdateModel, SortStateEnum } from './i-sort';
/**
 * 简单选择排序核心算法
 */
export class SelectSort implements IBarSort {
    Sort(arr: number[]): SortUpdateModel[] {
        // 数组排序过程动画列表
        const res = [];
        for (let i = 0; i < arr.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                // 数据比较动画模型
                res.push(new SortUpdateModel(j, arr[j], SortStateEnum.Compare));
                res.push(new SortUpdateModel(min, arr[min], SortStateEnum.Compare));
                // 数据比较完 设置为默认状态
                res.push(new SortUpdateModel(j, arr[j], SortStateEnum.Default));
                res.push(new SortUpdateModel(min, arr[min], SortStateEnum.Default));
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                const temp = arr[min];
                arr[min] = arr[i];
                arr[i] = temp;
                // 数据交换动画模型
                res.push(new SortUpdateModel(i, arr[i], SortStateEnum.Exchange));
                res.push(new SortUpdateModel(min, arr[min], SortStateEnum.Exchange));
                // 数据交换完成 设置为默认状态
                res.push(new SortUpdateModel(i, arr[i], SortStateEnum.Default));
                res.push(new SortUpdateModel(min, arr[min], SortStateEnum.Default));
            }
        }
        return res;
    }
}
