import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/core/store';
import {
  selectAllPositions,
  UpdatePositionAction,
  DeletePositionAction,
  selectTotalPrice
} from 'src/app/core/store/cart';
import {
  CreateOrderAction
} from 'src/app/core/store/orders'
import Position from 'src/app/core/models/position';
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  form: FormGroup;
  ordersTableData = data.ordersTableData;
  invoicePrices = data.invoicePrices;
  step = 0;
  positions$:Observable<Position[]>;
  total$: Observable<number>;
  invoiceData =  {
    recipient: null,
    total: 0,
    positions: []
  }
  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.positions$ = this.store.select(selectAllPositions);
    this.total$ = this.store.select(selectTotalPrice);

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required]),
      cardHolderName: new FormControl('', [Validators.required])
    });
  }

  changeQuantity(position: Position) {
    this.store.dispatch(new UpdatePositionAction(position));
  }

  onDelete(position: Position) {
    this.store.dispatch(new DeletePositionAction(position));
  }

  pre(): void {
    this.step--
  }

  next(): void {
    if (this.step == 1 && this.form.invalid) return;
    this.step++
  }

  done(): void {
    //this.store.dispatch(CreateOrderAction())
  }

  getInvoiceData(positions, total) {
    this.invoiceData.recipient = this.form.value;
    this.invoiceData.positions = positions
    this.invoiceData.total = total;
    return this.invoiceData;

  }
}
