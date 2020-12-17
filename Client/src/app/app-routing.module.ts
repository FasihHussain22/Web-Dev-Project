import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'list', component: DisplayComponent, canActivate: [LoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
