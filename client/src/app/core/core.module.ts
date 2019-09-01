import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken, NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment' // Angular CLI environment
import { reducers, metaReducers } from './store';
import { CategoryEffect } from './store/categories';
import { ProductEffect } from './store/products';
import { OrdersEffect } from './store/orders';
import { CartEffect } from './store/cart';

const PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token'
        },
        login: {
          endpoint: 'login'
        },
        register: {
          endpoint: 'register'
        },
        errors: {
          key: 'message',
        },
        messages: {
          key: 'message',
        }
      })
    ]
  }).providers,
  { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: req => {
    if (req.url === '/api/auth/refresh-token') {
      return true;
    }
      return false;
    }
  },
  { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([CategoryEffect, ProductEffect, OrdersEffect, CartEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  exports: [
    NbAuthModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...PROVIDERS
      ]
    }
  }
}
