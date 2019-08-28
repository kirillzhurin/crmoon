import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { values } from 'lodash';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Product from 'src/app/core/models/product';
import { RootState } from 'src/app/core/store';
import { GetProductAction, selectProductById } from 'src/app/core/store/products';

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id: string;

  images = data.images
  sku = data.sku
  name = data.name
  rate = data.rate
  price = data.price
  oldPrice = data.oldPrice
  shortDescr = data.shortDescr
  description = data.description
  properties = data.properties
  colorValue = 'Red'

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootState>
  ) { }

  ngOnInit() {

    this.route.params.pipe(
      switchMap(({ id }) => {
        this.id = id;
        this.store.dispatch(new GetProductAction(id));
        return this.store.pipe(select(selectProductById, { id }));
      })
    )
    .subscribe(product => this.product = product);
  }

}
