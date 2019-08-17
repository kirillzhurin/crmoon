import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken, NbAuthJWTInterceptor } from '@nebular/auth';


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
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: NbAuthJWTInterceptor }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
