import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';

import { Bill } from './bills/models/bill';
import { Group } from './groups/models/group';
import { SplitType } from './bills/models/split-type';
import { User } from '../shared-app/models/user';
import { Debtor } from './bills/models/debtor';

import { PaidByPipe } from '../shared-app/pipes/paid-by.pipe';

import { BillService } from './bills/services/bill.service';
import { HelpersService } from '../shared-app/services/helpers.service';

import { ComponentsInteraction } from './services/components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'settle-up',
    template: `
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
    @Input() public modal;
    @Input() public group: Group;

    currentUser: User;
    model = new Bill(0, 'Payment', null, 0, 0, SplitType.Payment, []);
    creditor = 0;
    groupDebts = {};
    debtsKeys = [];

    constructor(
        private billService: BillService,
        private helpers: HelpersService,
        private componentsInteraction: ComponentsInteraction) {
        this.currentUser = this.helpers.getUserFromStorage();
    }

    ngOnInit(): void {
        this.initializeData(this.group.id);
    }

    initializeData(groupId): void {
        this.groupDebts = {};
        this.model.amount = 0;
        this.model.groupId = this.group.id;
        this.model.paidBy = this.currentUser.id;
        this.creditor = this.group.friends.find(f => f.userId != this.currentUser.id).userId;

        this.billService.getBills(groupId)
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

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        let groupChnages = changes['group'];
        if (!groupChnages.isFirstChange()) {
            this.initializeData(this.group.id);
        }
    }

    savePayment(): void {
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

    onChangePayers(): void {
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

    private setDebtorsKeys(): void {
        this.debtsKeys = Object.keys(this.groupDebts);
    }

    private clearSettleDebt(): void {
        let key = this.model.paidBy + '-' + this.creditor;
        let reverseKey = this.getReverseKey(key);
        delete this.groupDebts[key];
        delete this.groupDebts[reverseKey];
        this.setDebtorsKeys();
    }
}