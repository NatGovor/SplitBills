import { Pipe, PipeTransform } from '@angular/core';

import { SplitType } from '../models/split-type';

@Pipe({name: 'splitTypeName'})
export class SplitTypePipe implements PipeTransform {
    transform(value: SplitType): string {
        switch (value) {
            case SplitType.Equal:
                return 'Equal';
            case SplitType.ExactAmounts:
                return 'Exact Amounts';
            case SplitType.Percentage:
                return 'Percentage';
            case SplitType.Payment:
                return 'Payment';
            default:
                console.log('Error in parsing SplitType: ', value); // for demo purposes only
        }
    }
}
