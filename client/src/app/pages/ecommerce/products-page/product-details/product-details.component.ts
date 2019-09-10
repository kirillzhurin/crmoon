import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { capitalize, omit } from 'lodash';
import { switchMap, skipWhile } from 'rxjs/operators';
import Product from 'src/app/core/models/product';
import Position from 'src/app/core/models/position';
import { RootState } from 'src/app/core/store';
import { GetProductAction, selectProductById } from 'src/app/core/store/products';
import { AddPositionAction } from 'src/app/core/store/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product: Product;
  color: string;
  size: string;
  capitalize = capitalize;

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
    ).pipe(skipWhile(product => !product))
    .subscribe((product: Product) =>  {
      this.product = product;
      this.color = product.colors ? product.colors[0] : null;
      this.size = product.sizes ? product.sizes[0] : null;
    });
  }

  addToCart(product: Product) {
    let position: Position = {
      ...omit(product, ['colors', 'sizes']),
      color: this.color,
      size: this.size,
      quantity: 1
    }

    this.store.dispatch(new AddPositionAction(position));
  }
}
