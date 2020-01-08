import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full', },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationModule' },
  { path: 'users-list', loadChildren: './list-users/list-users.module#ListUsersModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
