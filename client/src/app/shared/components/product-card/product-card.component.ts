import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import Product from 'src/app/core/models/product'
import { keyBy } from 'lodash';
import SIZES from '../../helpers/sizes';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() onClick = new EventEmitter<Product>();
  emptyImage = environment.emptyImage;
  sizes = keyBy(SIZES, size => size.key);
  constructor() {}
  ngOnInit() {}

  handleClick() {
    this.onClick.emit(this.product);
  }
}
