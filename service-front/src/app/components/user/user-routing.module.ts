import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'new', component: UserFormComponent, data: { breadcrumb: 'New' } },
  { path: 'edit/:id', component: UserFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Edit' } }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
