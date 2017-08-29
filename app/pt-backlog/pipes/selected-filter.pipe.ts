import { Pipe, PipeTransform } from '@angular/core';
import { PtItem } from "../../shared/models/domain-models";

@Pipe({
    name: 'selectedFilter'
})

export class SelectedFilterPipe implements PipeTransform {
    transform(value: PtItem[], ...args: any[]): any {
        return value;
    }
}