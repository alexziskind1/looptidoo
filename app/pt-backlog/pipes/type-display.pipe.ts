//angular imports
import { Pipe, PipeTransform } from '@angular/core';

//app imports
import { ItemTypeEnum } from '../../shared/models/domain-enums';

@Pipe({
    name: 'typeDisplay'
})
export class TypeDisplayPipe implements PipeTransform {
    transform(value: number): string {
        return ItemTypeEnum[value];
    }
}