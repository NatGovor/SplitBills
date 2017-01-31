import { Component, OnInit, OnDestroy }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Group } from './group';

import { GroupService } from './group.service';

import { ComponentsInteraction } from '../components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: `
        <div *ngIf="group">
            <div class="row">
                <div class="col-xs-8">
                    <h4>{{group.name}} details</h4>
                </div>
                <div class="col-xs-4">
                    <button class="important-btn" (click)="modal.show()">Settle up</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <div>
                        <span>id: </span>{{group.id}}
                    </div>
                    <div>
                        <span>name: </span>{{group.name}}
                    </div>
                    <div>
                        <span>Members: </span>
                        <ul>
                            <li *ngFor="let friend of group.friends">
                                {{friend.name}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-6">
                    <group-balances [group]="group"></group-balances>
                </div>
            </div>
            <bills-list [group]="group"></bills-list>
            <button (click)="goBack()">Back</button>

            <div class="modal fade" bsModal #modal="bs-modal"
                tabindex="-1"
                role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <settle-up [modal]="modal" [group]="group"></settle-up>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class GroupDetailComponent implements OnInit {
    group: Group;

    subscription: Subscription;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private componentsInteraction: ComponentsInteraction) {
        this.subscription = componentsInteraction.billAdded$.subscribe(
            bill => {
                componentsInteraction.refreshBills(bill);
            });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.groupService.getGroup(id).then(group => this.group = group);
        });
    }

    goBack(): void {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}