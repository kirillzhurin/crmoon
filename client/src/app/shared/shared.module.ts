import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const DIRECTIVES = [];
const COMPONENTS = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class SharedModule { }
