import { Component, Input, OnInit } from '@angular/core';

import { Group } from './group';

import { GroupService } from './group.service';

@Component({
    selector: 'group-balances',
    template: `
        <h4>Group Balances</h4>
    `
})
export class GroupBalancesComponent implements OnInit {
    @Input()
    group: Group;

    constructor(private groupService: GroupService) {}

    ngOnInit() {
        this.groupService.getBalances(this.group.id);
    }
}