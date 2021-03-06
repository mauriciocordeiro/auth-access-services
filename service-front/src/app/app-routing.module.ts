import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: { skip: true } } },
  { path: 'home', loadChildren: () => import('./components/home/home.module')
    .then(module => module.HomeModule), data: { breadcrumb: 'Home' } },
  { path: 'user', loadChildren: () => import('./components/user/user.module')
    .then(module => module.UserModule), data: { breadcrumb: 'User' } },
  { path: 'log', loadChildren: () => import('./components/log/log.module')
    .then(module => module.LogModule), data: { breadcrumb: 'Logs' } },
  { path: 'status', loadChildren: () => import('./components/status/status.module')
    .then(module => module.StatusModule), data: { breadcrumb: 'Status' } },
  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
