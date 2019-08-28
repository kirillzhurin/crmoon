import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import Product from 'src/app/core/models/product'
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
  constructor() {}
  ngOnInit() {}

  handleClick() {
    this.onClick.emit(this.product);
  }
}
