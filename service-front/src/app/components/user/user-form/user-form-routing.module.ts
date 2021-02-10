import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserFormComponent } from './user-form.component';


const routes: Routes = [
  { path: '', component: UserFormComponent, canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormRoutingModule { }
