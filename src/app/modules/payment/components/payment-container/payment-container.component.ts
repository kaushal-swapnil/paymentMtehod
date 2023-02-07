import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemDetails } from '../../../../store.service';

type PaymentDataRequest = google.payments.api.PaymentDataRequest

@Component({
  selector: 'app-payment-container',
  templateUrl: './payment-container.component.html',
  styleUrls: ['./payment-container.component.scss']
})
export class PaymentContainerComponent {
  item!: ItemDetails;
  size = 'M';
  sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
  quantity = 1;
  quantityOptions = [1, 2, 3, 4, 5];

  paymentRequest!: PaymentDataRequest;

  private readonly itemPrice = 100;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initPaymentRequest();
  }

  private initPaymentRequest() {
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: '17613812255336763067',
        merchantName: 'Demo Only (you will not be charged)'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.itemPrice.toFixed(2),
        currencyCode: 'USD',
        countryCode: 'US'
      }
    };
  }

  public onLoadPaymentData(event: Event) {
    const paymentData = (event as CustomEvent<google.payments.api.PaymentData>).detail;
    console.log("paymentData", paymentData);
    this.router.navigate(['/confirm']);
  }
}
