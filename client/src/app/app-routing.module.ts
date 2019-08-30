import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthLayoutComponent, MainLayoutComponent } from './theme/layouts';
import { ThemeModule } from './theme/theme.module';
import { AuthGuard } from './core/guards/auth.guard';
import {
  LoginPageComponent,
  RegisterPageComponent,
  DashboardPageComponent,
  AnalyticsPageComponent,
  ProfilePageComponent
} from './pages';

const COMPONENTS = [
  LoginPageComponent,
  RegisterPageComponent,
  DashboardPageComponent,
  AnalyticsPageComponent,
  ProfilePageComponent
];

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'ecommerce', loadChildren: () => import('./pages/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent},
      { path: 'register', component: RegisterPageComponent}
    ]
  },
  { path: '**', redirectTo: 'pages' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [RouterModule],
})
export class AppRoutingModule { }
