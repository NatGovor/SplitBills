import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Group } from '../../../common/models/group';

import { GroupService } from '../services/group.service';

import { Subscription } from 'rxjs/Subscription';
//import { ComponentsInteraction } from '../../services/components-interaction.service';

@Component({
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, OnDestroy {
    group: Group;

    subscription: Subscription;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        /*private componentsInteraction: ComponentsInteraction*/) {
        /*his.subscription = componentsInteraction.billAdded$.subscribe(
            (bill) => {
                componentsInteraction.refreshBills(bill);
            });*/
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['id'];
            this.groupService.getGroup(id).then((group) => this.group = group);
        });
    }

    goBack(): void {
        window.history.back();
    }

    ngOnDestroy(): void {
        //this.subscription.unsubscribe();
    }
}
