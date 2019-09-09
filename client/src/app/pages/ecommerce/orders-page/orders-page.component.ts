import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { RootState } from 'src/app/core/store';
import Order from 'src/app/core/models/order';
import { LoadOrdersAction, selectAllOrdersWithCounting } from 'src/app/core/store/orders';
import { BaseComponent } from 'src/app/shared/helpers/base.component';

declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends BaseComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 100;
  orders: Order[] = [];

  productsData = data.data
  displayProductsData = [...this.productsData]
  sortName = null
  sortValue = null
  listOfSearchName = []
  searchAddress: string

  constructor(private store: Store<RootState>) {
    super();
  }

  ngOnInit() {
    this.searchData();
    this.store.pipe(
        takeUntil(this.destroy$),
        select(selectAllOrdersWithCounting)
      )
      .subscribe(orders => this.orders = orders);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key
    this.sortValue = sort.value
    this.search()
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName
    this.searchAddress = searchAddress
    this.search()
  }

  searchData(pageIndex = 1) {
    this.store.dispatch(new LoadOrdersAction());
  }

  search(): void {
    // /** filter data **/
    const filterFunc = item =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true)
    const data = this.productsData.filter(item => filterFunc(item))
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayProductsData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1,
      )
    } else {
      this.displayProductsData = data
    }
  }

}
