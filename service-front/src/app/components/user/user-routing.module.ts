import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  //{ path: 'usuario', component: UsuarioDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Usuário' } },
  //{ path: 'usuario/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Usuário' } }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
