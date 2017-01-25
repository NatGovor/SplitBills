import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'settle-up',
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">Settle up</h4>
            <button type="button" class="close pull-right" (click)="modal.hide()">
                <span>&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="text-center">
                <select class="form-control form-control-inline" required>
                    <option>you</option>
                    <option>Alexandra</option>
                    <option>Test</option>
                </select>
                paid
                <select class="form-control form-control-inline" required>
                    <option>you</option>
                    <option>Alexandra</option>
                    <option>Test</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn" (click)="modal.hide()">Cancel</button>
            <button type="button" class="btn important-btn">Save</button>
        </div>
    `,
    styles: [`
    `]
})
export class SettleUpComponent {
    @Input()
    modal;
}