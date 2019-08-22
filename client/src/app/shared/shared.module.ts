import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const DIRECTIVES = [];
const COMPONENTS = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class SharedModule { }
