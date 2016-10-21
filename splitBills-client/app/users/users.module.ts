import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';

import { UserService } from './user.service';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        AccountComponent
    ],
    providers: [
        UserService
    ]
})
export class UsersModule {}