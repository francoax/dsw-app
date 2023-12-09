import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './modules/shared/feedbacks/unauthorized/unauthorized.component';
import { NotFoundComponent } from './modules/shared/feedbacks/not-found/not-found.component';
import { LogInComponent } from './modules/shared/log-in/log-in.component';
import { SignUpComponent } from './modules/shared/sign-up/sign-up.component';
import { NotificationsComponent } from './modules/shared/notifications/notifications.component';
import { ForgotPasswordComponent } from './modules/shared/forgot-password/forgot-password.component';
import { homeDataResolver } from './resolvers/home-data.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      data : homeDataResolver
    },
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'password-reset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'confirmation',
    component: NotificationsComponent,
  },
  {
    path: 'user',
    canActivate: [authGuard],
    data: { expectedRole: 'user' },
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    loadChildren: () =>
      import('./modules/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'superadmin',
    canActivate: [authGuard],
    data: { expectedRole: 'SUPER_ADMIN' },
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
  },
  {
    path: 'packages',
    loadChildren: () =>
      import('./modules/package/package.module').then(
        (mod) => mod.PackageModule
      ),
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
