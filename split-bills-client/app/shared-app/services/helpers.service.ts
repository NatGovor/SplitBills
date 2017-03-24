import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class HelpersService {
    // return user additional helper
    getStorageProperty(name): Object {
        if (localStorage.getItem(name) != null) {
            const value = localStorage.getItem(name);

            if (value[0] === '{' || value[0] === '[') {
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
            localStorage.setItem(name, typeof (value) === 'string' ? value : JSON.stringify(value));
        }
    }

    getUserFromStorage(): User {
        if (localStorage.getItem('user') != null) {
            const value = localStorage.getItem('user');

            if (value[0] === '{' || value[0] === '[') {
                return JSON.parse(value);
            }

            return Object(value) as User;
        }

        return null;
    }

    divideNumbersEvenly(amount, dividers, digits): Array<number> {
        const fill = (x) => {
            return (y) => {
                return new Array(y).fill(x);
            }
        };

        const quotrem = (x) => {
            return (y) => {
                return [Math.floor(y / x), Math.floor(y % x)];
            };
        };

        const distribute = (digits) => {
            return (dividers) => {
                return (amount) => {
                    const e = Math.pow(10, digits);
                    const x = quotrem(dividers)(amount * e);
                    return fill((x[0] + 1) / e)(x[1]).concat(fill(x[0] / e)(dividers - x[1]));
                };
            };
        };

        return distribute(digits)(dividers)(amount);
    }
}
