//angular imports
import { Pipe, PipeTransform } from '@angular/core';

//app imports
import { PriorityEnum } from '../../shared/models/domain-enums';

@Pipe({
    name: 'priorityClass'
})
export class PriorityClassPipe implements PipeTransform {
    transform(value: PriorityEnum): string {
        return PriorityEnum.getIndicatorClass(value);
    }
}