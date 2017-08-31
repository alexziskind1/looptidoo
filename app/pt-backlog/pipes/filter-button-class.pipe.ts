import { Pipe, PipeTransform } from '@angular/core';
import { ViewIndex } from "../../shared/models/ui-models";

@Pipe({
    name: 'filterBtnClass'
})

export class FilterButtonClassPipe implements PipeTransform {
    transform(selectedViewIndex: ViewIndex, thisView: number): any {
        return selectedViewIndex.idx === thisView ? 'slide-out-btn-selected' : 'slide-out-btn';
    }
}