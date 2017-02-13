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
        <form  #settleUpForm="ngForm">
        <div class="modal-body" *ngIf="group">
            <div class="text-center">
                <div class="form-group">
                    {{group.name}}
                </div>
                <div class="form-group">
                    <select class="form-control form-control-inline" required
                        [ngModel]="model.paidBy" (ngModelChange)="model.paidBy=$event; onChangePayers();" name="paidBy">
                        <option *ngFor="let f of group.friends" [value]="f.userId">{{f.userId | paidByName:group.friends }}</option>
                    </select>
                    paid
                    <select class="form-control form-control-inline" required
                        [ngModel]="creditor" (ngModelChange)="creditor=$event; onChangePayers();" name="creditor">
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
            <button type="button" class="btn important-btn" (click)="savePayment()" [disabled]="!settleUpForm.form.valid">Save</button>
        </div>
        </form>
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
    debtsKeys = [];

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
                            let reverseKey = this.getReverseKey(key);;
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

                this.model.amount = this.groupDebts[this.model.paidBy + '-' + this.creditor];
                this.setDebtorsKeys();
            });
    }

    savePayment() {
        this.model.paidBy = +this.model.paidBy;
        this.model.debtors.push(new Debtor(+this.creditor, this.model.amount));
        this.billService.create(this.model)
            .then(bill => {
                this.modal.hide();
                this.componentsInteraction.addBill(bill);

                this.clearSettleDebt();

                // reinitialize model
                this.model = new Bill(0, 'Payment', null, this.group.id, this.group.friends.find(f => f.userId != this.currentUser.id).userId, SplitType.Payment, []);
                if (this.debtsKeys[0]) {
                    let usersId = this.debtsKeys[0].split('-');
                    this.model.amount = Math.abs(this.groupDebts[this.debtsKeys[0]]);
                    // debtor -> creditor - if amount is negative than switch places of debtor and creditor
                    if (this.groupDebts[this.debtsKeys[0]] > 0) {
                        this.model.paidBy = +usersId[0];
                        this.creditor = +usersId[1];
                    } else {
                        this.model.paidBy = +usersId[1];
                        this.creditor = +usersId[0];
                    }
                }
            });
    }

    onChangePayers() {
        let key = this.model.paidBy + '-' + this.creditor;
        let reverseKey = this.getReverseKey(key);
        if (this.groupDebts[key] && this.groupDebts[key] > 0) {
            this.model.amount = Math.abs(this.groupDebts[key]);
        } else if (this.groupDebts[reverseKey]) {
            this.model.amount = Math.abs(this.groupDebts[reverseKey]);
        } else {
            this.model.amount = null;
        }
    }

    private getReverseKey(key: string) : string {
        return key.split('').reverse().join('');
    }

    private setDebtorsKeys() {
        this.debtsKeys = Object.keys(this.groupDebts);
    }

    private clearSettleDebt() {
        let key = this.model.paidBy + '-' + this.creditor;
        let reverseKey = this.getReverseKey(key);
        delete this.groupDebts[key];
        delete this.groupDebts[reverseKey];
        this.setDebtorsKeys();
    }
}