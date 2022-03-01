import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ClientComponent} from './pages/client/client.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'client/:id',component: ClientComponent},
  {path:'register',component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
