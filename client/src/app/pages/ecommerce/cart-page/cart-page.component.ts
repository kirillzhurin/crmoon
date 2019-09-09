import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { RootState } from 'src/app/core/store';
import {
  selectAllPositions,
  UpdatePositionAction,
  DeletePositionAction,
  ClearCartAction,
  selectTotalPrice
} from 'src/app/core/store/cart';
import { CreateOrderAction, CREATE_ORDER_SUCCESS } from 'src/app/core/store/orders'
import Position from 'src/app/core/models/position';
import Order from 'src/app/core/models/order';
import { BaseComponent } from 'src/app/shared/helpers/base.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  step = 0;
  positions$:Observable<Position[]>;
  total$: Observable<number>;
  invoiceData =  {
    total: 0,
    list: []
  }
  constructor(
    private store: Store<RootState>,
    private actions$: ActionsSubject,
    private messageService: NzMessageService,
    private router: Router) {
      super();
    }

  ngOnInit() {
    this.actions$.pipe(
      takeUntil(this.destroy$),
      filter(action => action.type === CREATE_ORDER_SUCCESS)
    ).subscribe((action: any) => {
      this.store.dispatch(new ClearCartAction());
      this.messageService.success(action.type);
      action.payload._id
      this.router.navigate([`/ecommerce/orders/${ action.payload._id }`])
    });

    this.positions$ = this.store.select(selectAllPositions);
    this.total$ = this.store.select(selectTotalPrice);

    this.form = new FormGroup({
      email: new FormControl('kirillzhurin@gmail.com', [Validators.required, Validators.email]),
      phone: new FormControl('+79054993144', [Validators.required]),
      name: new FormControl('Kirill', [Validators.required]),
      surname: new FormControl('Zhurin', [Validators.required]),
      city: new FormControl('Pyatigorsk', [Validators.required]),
      address: new FormControl('Ludkevicha 9', [Validators.required]),
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
    this.store.dispatch(new CreateOrderAction(this.invoiceData));
  }

  getInvoiceData(positions, total) {
    return this.invoiceData = Object.assign(this.invoiceData, this.form.value, { total }, { list: positions })
  }
}
