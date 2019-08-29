import { Component, OnInit } from '@angular/core';
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  ordersTableData = data.ordersTableData
  invoicePrices = data.invoicePrices
  current = 0

  constructor() { }

  ngOnInit() {
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
