import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'
import { NZ_ICONS } from 'ng-zorro-antd'

import { MainLayoutComponent, AuthLayoutComponent } from './layouts';

/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

const PROVIDERS = [
  { provide: NZ_ICONS, useValue: icons }
];

const COMPONENTS = [MainLayoutComponent, AuthLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, NgZorroAntdModule],
  imports: [CommonModule, RouterModule, NgZorroAntdModule]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...PROVIDERS]
    }
  }
}
