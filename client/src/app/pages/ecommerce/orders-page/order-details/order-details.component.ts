import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, skipWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import Order from 'src/app/core/models/order';
import { RootState } from 'src/app/core/store';
import { GetOrderAction, PaymentOrderAction, selectOrderById } from 'src/app/core/store/orders';
import { environment } from 'src/environments/environment';

declare var StripeCheckout;
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: string;
  order: Order;
  handler: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ id }) => {
        this.id = id;
        this.store.dispatch(new GetOrderAction(id));
        return this.store.pipe(select(selectOrderById, { id }));
      })
    ).pipe(skipWhile(order => !order))
    .subscribe((order: Order) =>  {
      this.order = order;
    });

    this.handler = StripeCheckout.configure({
      key: environment.STRIPE_PUBLIC_KEY,
      image: 'assets/images/logo-mobile.png',
      locale: 'auto',
      token: token => {
        this.store.dispatch(new PaymentOrderAction({
          amount: this.order.total * 100,
          tokenId: token.id,
          orderId: this.order._id
        }))
      }
    })
  }

  handlePayment() {
    this.handler.open({
      name: 'crmoon',
      description: 'Order Payment',
      amount: this.order.total * 100
    })
  }

  @HostListener('window:popstate')
  onpopstate() {
    this.handler.close();
  }

}
