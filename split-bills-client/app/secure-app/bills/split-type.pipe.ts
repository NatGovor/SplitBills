import { Pipe, PipeTransform } from '@angular/core';

import { SplitType } from './split-type';

@Pipe({name: 'splitTypeName'})
export class SplitTypePipe implements PipeTransform {
    transform(value: SplitType): string {
        switch (value) {
            case SplitType.Equal:
                return 'Equal';
            case SplitType.Unequal:
                return 'Unequal';
            case SplitType.Percent:
                return 'Percent';
            default:
                console.log('Error in parsing SplitType: ', value);
        }
    }
}