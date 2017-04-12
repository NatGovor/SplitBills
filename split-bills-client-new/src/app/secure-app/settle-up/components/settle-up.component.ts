import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import { User } from '../../../common/models/user';
import { Bill } from '../../../common/models/bill';
import { Debtor } from '../../../common/models/debtor';
import { SplitType } from '../../../common/enums/split-type';
import { Group } from '../../../common/models/group';

import { HelpersService } from '../../../common/services/helpers.service';
import { BillService } from '../../bills/services/bill.service';

import { BillsRefreshInteraction } from '../../services/bills-refresh-interaction.service';

@Component({
    selector: 'app-settle-up',
    templateUrl: './settle-up.component.html'
})
export class SettleUpComponent implements OnInit, OnChanges {
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
        private billsRefreshInteraction: BillsRefreshInteraction) {
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
        this.creditor = this.group.friends.find((f) => f.userId !== this.currentUser.id).userId;

        this.billService.getBills(groupId)
            .then((bills) => {
                bills.forEach((bill) => {
                    bill.debtors.forEach((debtor) => {
                        if (debtor.userId !== bill.paidBy) {
                            // debtor -> creditor
                            const key = debtor.userId + '-' + bill.paidBy;
                            const reverseKey = this.getReverseKey(key);;
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
        const groupChnages = changes['group'];
        if (!groupChnages.isFirstChange()) {
            this.initializeData(this.group.id);
        }
    }

    savePayment(): void {
        this.model.paidBy = +this.model.paidBy;
        this.model.debtors.push(new Debtor(+this.creditor, this.model.amount));
        this.billService.create(this.model)
            .then((bill) => {
                this.modal.hide();
                this.billsRefreshInteraction.addBill(bill);

                this.clearSettleDebt();

                // reinitialize model
                this.model = new Bill(0, 'Payment', null, this.group.id,
                        this.group.friends.find((f) => f.userId !== this.currentUser.id).userId, SplitType.Payment, []);
                if (this.debtsKeys[0]) {
                    const usersId = this.debtsKeys[0].split('-');
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
        const key = this.model.paidBy + '-' + this.creditor;
        const reverseKey = this.getReverseKey(key);
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
        const key = this.model.paidBy + '-' + this.creditor;
        const reverseKey = this.getReverseKey(key);
        delete this.groupDebts[key];
        delete this.groupDebts[reverseKey];
        this.setDebtorsKeys();
    }
}
