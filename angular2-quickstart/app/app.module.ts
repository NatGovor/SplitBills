import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';
import { AppRoutingModule }  from './app-routing.module';

import { HeroesModule } from './heroes/heroes.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { HeroBirthdayComponent } from './pipes/hero-birthday1.component';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { PowerBoostCalculatorComponent } from './pipes/power-boost-calculator.component';
import { HeroAsyncMessageComponent } from './pipes/hero-async-message.component';

import { DialogService } from './dialog.service';

@NgModule({
  imports:      [ 
      BrowserModule,
      FormsModule,
      HeroesModule,      
      LoginRoutingModule,
      AppRoutingModule
  ],
  declarations: [ 
      AppComponent,
      LoginComponent,
      HeroBirthdayComponent,
      ExponentialStrengthPipe,
      PowerBoostCalculatorComponent,
      HeroAsyncMessageComponent
  ],
  providers: [
      DialogService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
