import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
    confirm(message?: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            return resolve(window.confirm(message || 'Is it OK?'));
        });
    }

    alert(message: string): void {
        window.alert(message);
    }
}