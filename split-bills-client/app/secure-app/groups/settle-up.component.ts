import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Bill } from '../bills/bill';
import { Group } from '../groups/group';
import { SplitType } from '../bills/split-type';
import { User } from '../../user';
import { Debtor } from '../bills/debtor';

import { PaidByPipe } from '../../pipes/paid-by.pipe';

import { BillService } from '../bills/bill.service';
import { HelpersService } from '../../helpers.service';

import { ComponentsInteraction } from '../components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'settle-up',
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">Settle up</h4>
            <button type="button" class="close pull-right" (click)="modal.hide()">
                <span>&times;</span>
            </button>
        </div>
        <div class="modal-body" *ngIf="group">
            <div class="text-center">
                <div class="form-group">
                    {{group.name}}
                </div>
                <div class="form-group">
                    <select class="form-control form-control-inline" required
                        [(ngModel)]="model.paidBy" name="paidBy">
                        <option *ngFor="let f of group.friends" [value]="f.userId">{{f.userId | paidByName:group.friends }}</option>
                    </select>
                    paid
                    <select class="form-control form-control-inline" required
                        [(ngModel)]="creditor" name="creditor">
                        <option *ngFor="let f of group.friends" [value]="f.userId">{{f.userId | paidByName:group.friends }}</option>
                    </select>
                </div>
                <div class="form-group row">
                    <div class="input-group col-xs-4 col-xs-push-4">
                        <span class="input-group-addon">$</span>
                        <input type="number" class="form-control" required 
                            [(ngModel)]="model.amount" name="amount">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn" (click)="modal.hide()">Cancel</button>
            <button type="button" class="btn important-btn" (click)="savePayment()">Save</button>
        </div>
    `,
    styles: [`
    `]
})
export class SettleUpComponent implements OnInit {
    @Input() modal;
    @Input() group: Group;

    currentUser: User;
    model = new Bill(0, 'Payment', null, 0, 0, SplitType.Payment, []);
    creditor = 0;
    groupDebts = {};

    constructor(
        private billService: BillService,
        private helpers: HelpersService,
        private componentsInteraction: ComponentsInteraction) {
        this.currentUser = (this.helpers.getStorageProperty("user") as User);
    }

    ngOnInit() {
        this.model.groupId = this.group.id;
        this.model.paidBy = this.currentUser.id;
        this.creditor = this.group.friends.find(f => f.userId != this.currentUser.id).userId;

        this.billService.getBills(this.group.id)
            .then(bills => {
                bills.forEach(bill => {
                    bill.debtors.forEach(debtor => {
                        if (debtor.userId != bill.paidBy) {
                            // debtor -> creditor
                            let key = debtor.userId + '-' + bill.paidBy;
                            let reverseKey = key.split('').reverse().join('');
                            if (this.groupDebts[key]) {
                                this.groupDebts[key] += debtor.amount;
                            } else if (this.groupDebts[reverseKey] ){
                                this.groupDebts[reverseKey] -= debtor.amount;
                            } else {
                                this.groupDebts[key] = debtor.amount;
                            }
                        }
                    });
                });
                
                console.log(this.groupDebts);
                this.model.amount = this.groupDebts[this.model.paidBy + '-' + this.creditor];
            });
    }

    savePayment() {
        this.model.paidBy = +this.model.paidBy;
        this.model.debtors.push(new Debtor(+this.creditor, this.model.amount));
        this.billService.create(this.model)
            .then(bill => {
                this.modal.hide();
                this.componentsInteraction.addBill(bill);
                
                // reinitialize model
                this.model = new Bill(0, 'Payment', null, this.group.id, this.group.friends.find(f => f.userId != this.currentUser.id).userId, SplitType.Payment, []);
            });
    }
}