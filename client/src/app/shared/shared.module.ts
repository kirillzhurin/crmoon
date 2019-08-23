import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ProductCardComponent } from './components/product-card/product-card.component';

const DIRECTIVES = [];
const COMPONENTS = [ProductCardComponent];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class SharedModule { }
