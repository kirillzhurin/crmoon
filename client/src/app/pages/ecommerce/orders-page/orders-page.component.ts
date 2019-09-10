import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { RootState } from 'src/app/core/store';
import Order from 'src/app/core/models/order';
import {
  LoadOrdersAction,
  DeleteOrderAction,
  selectAllOrdersWithCounting
} from 'src/app/core/store/orders';
import { BaseComponent } from 'src/app/shared/helpers/base.component';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends BaseComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  orders: Order[] = [];

  constructor(
    private store: Store<RootState>,
    private modalService: NzModalService) {
    super();
  }

  showConfirm(id: string): void {
    this.modalService.confirm({
      nzTitle: '<i>Confirmation</i>',
      nzContent: 'Do you Want to delete these order?',
      nzOnOk: () => this.store.dispatch(new DeleteOrderAction(id))
    });
  }

  ngOnInit() {
    this.store.pipe(
        takeUntil(this.destroy$),
        select(selectAllOrdersWithCounting)
      )
      .subscribe(orders => this.orders = orders);
    this.store.dispatch(new LoadOrdersAction());
  }
}
