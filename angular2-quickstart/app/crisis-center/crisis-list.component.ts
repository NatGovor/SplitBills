import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Crisis, CrisisService }  from './crisis.service';

@Component({
    template: `
        <ul class="items">
        <li *ngFor="let crisis of crises"
            [class.selected]="isSelected(crisis)"
            (click)="onSelect(crisis)">
            <span class="badge">{{crisis.id}}</span> {{crisis.name}}
        </li>
        </ul>

        <router-outlet></router-outlet>
    `
})
export class CrisisListComponent implements OnInit {
    crises: Crisis[];

    private selectedId: number;

    constructor(
        private service: CrisisService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.selectedId = +params['id'];
            this.service.getCrises()
                .then(crises => this.crises = crises);
        });
    }

    isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

    onSelect(crisis: Crisis) {
        this.selectedId = crisis.id;

        // Navigate with relative link
        this.router.navigate([crisis.id], { relativeTo: this.route });
  }

}