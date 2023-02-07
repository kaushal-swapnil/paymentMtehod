import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentContainerComponent } from './components/payment-container/payment-container.component';
import { MaterialModule } from '../shared/material/material.module';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';

@NgModule({
  declarations: [
    PaymentContainerComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GooglePayButtonModule
  ]
})
export class PaymentModule { }
