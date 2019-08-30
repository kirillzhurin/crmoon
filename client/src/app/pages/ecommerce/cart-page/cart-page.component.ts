import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/core/store';
import { selectAllPositions, UpdatePositionAction, DeletePositionAction } from 'src/app/core/store/cart';
import Position from 'src/app/core/models/position';
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  ordersTableData = data.ordersTableData;
  invoicePrices = data.invoicePrices;
  current = 0;
  positions$:Observable<Position[]>;

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.positions$ = this.store.select(selectAllPositions);
  }

  changeQuantity(position: Position) {
    this.store.dispatch(new UpdatePositionAction(position));
  }

  onDelete(position: Position) {
    this.store.dispatch(new DeletePositionAction(position));
  }

  pre(): void {
    this.current -= 1
    // this.changeContent();
  }

  next(): void {
    this.current += 1
    // this.changeContent();
  }

  done(): void {
    console.log('done')
  }

}
