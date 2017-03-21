import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'makePositive'})
export class MakePositivePipe implements PipeTransform {
    transform(value: number): number {
        return Math.abs(value); 
    }
}