import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlynumberDirective } from '../directive/number-only.directive';


@NgModule({
  declarations: [RegistrationComponent, OnlynumberDirective],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,

  ],
})
export class RegistrationModule { }
