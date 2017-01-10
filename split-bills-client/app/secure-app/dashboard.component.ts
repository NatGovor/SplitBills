import { Component } from '@angular/core';

@Component({
    template: `
        <h2>Dashboard</h2>
        <div class="row">
            <div class="col-xs-6 negatives">
                <div class="text-uppercase text-left"><b>You owe</b></div>
            </div>            
            <div class="col-xs-6 positives">
                <div class="text-uppercase text-right"><b>You are owed</b></div>
            </div>
        </div>
    `,
    styles: [`
        .negatives {
            border-right: 1px solid #eee;
        }
    `]
})
export class DashboardComponent {}