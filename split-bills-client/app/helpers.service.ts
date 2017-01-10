import { Injectable }    from '@angular/core';

import { User } from './user';

@Injectable()
export class HelpersService {
    getStorageProperty(name): Object {
        if (localStorage.getItem(name) != null) {
            let value = localStorage.getItem(name);

            if (value[0] === "{" || value[0] === "[") {
                return JSON.parse(value);
            }

            return value;
        }

        return null;
    }

    setStorageProperty(name, value): void {
        if (value === null) {
            localStorage.removeItem(name);
        } else {
            localStorage.setItem(name, typeof (value) == "string" ? value : JSON.stringify(value));
        }
    }

    divideNumbersEvenly(amount, dividers, digits): Array<number> {
        let fill = function (x) {
            return function (y) {
                return new Array(y).fill(x);
            }
        };

        let quotrem = function (x) {
            return function (y) {
                return [Math.floor(y / x), Math.floor(y % x)];
            };
        };

        let distribute = function (digits) {
            return function (dividers) {
                return function (amount) {
                    let e = Math.pow(10, digits);
                    let x = quotrem(dividers)(amount * e);
                    return fill((x[0] + 1) / e)(x[1]).concat(fill(x[0] / e)(dividers - x[1]));
                };
            };
        };

        return distribute(digits)(dividers)(amount);
    }
}