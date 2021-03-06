import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component/login.component';
import { AuthGuard } from '../common/services/auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'login', component: LoginComponent }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class LoginRoutingModule {}
