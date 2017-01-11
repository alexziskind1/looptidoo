//angular imports
import { Pipe, PipeTransform } from '@angular/core';


//app imports
//import { PriorityEnum } from '../../shared/static-data';

@Pipe({ name: 'estimateDisplay' })
export class EstimateDisplayPipe implements PipeTransform {
    transform(value: number): string {
        //return PriorityEnum[value];
        if (value === 1) {
            return '1 point';
        } else {
            return value + ' points';
        }
    }
}