import { Component, OnInit, Input } from '@angular/core'
import Product from 'src/app/core/models/product'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  emptyImage = environment.emptyImage;
  constructor() {}
  ngOnInit() {}
}
