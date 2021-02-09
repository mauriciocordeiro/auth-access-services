import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'new', component: UserFormComponent, data: { breadcrumb: 'New' } },
  { path: 'edit/:id', component: UserFormComponent, data: { breadcrumb: 'Edit' } }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
