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
                <div class="form-group">
                    Group Name
                </div>
                <div class="form-group">
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
                <div class="form-group row">
                    <div class="input-group col-xs-4 col-xs-push-4">
                        <span class="input-group-addon">$</span>
                        <input type="number" class="form-control" required>
                    </div>
                </div>
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