import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { default as localeEn } from '@angular/common/locales/en'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd';
import {
  BreadcrumbsComponent,
  FooterComponent,
  MenuLeftComponent,
  MenuTopComponent,
  SettingsComponent,
  TopbarComponent,
  TopbarProfileMenuComponent
} from './componnets';

import {
  MainLayoutComponent,
  AuthLayoutComponent
} from './layouts';

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

const PROVIDERS = [
  ...LOCALE_PROVIDERS,
  { provide: NZ_ICONS, useValue: icons }
];

const COMPONENTS = [
  BreadcrumbsComponent,
  FooterComponent,
  MenuLeftComponent,
  MenuTopComponent,
  SettingsComponent,
  TopbarComponent,
  TopbarProfileMenuComponent,
];
const LAYOUTS = [MainLayoutComponent, AuthLayoutComponent]

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  exports: [...COMPONENTS, ...LAYOUTS, NgZorroAntdModule],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PerfectScrollbarModule
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...PROVIDERS]
    }
  }
}
