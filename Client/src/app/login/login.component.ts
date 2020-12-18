import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('label') label: ElementRef;

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  // checks user credentials for login
  login() {
    if (this.username.nativeElement.value.length != 0 && this.password.nativeElement.value.length != 0) {
      this.loginService.login(this.username.nativeElement.value, this.password.nativeElement.value);
      if (this.loginService.loggedIn === 0) {
        this.password.nativeElement.value = '';
      }
    }
  }

  // add a new user to system
  register() {
    if (this.username.nativeElement.value.length != 0 && this.password.nativeElement.value.length != 0) {
      this.loginService.register(this.username.nativeElement.value, this.password.nativeElement.value);
      if (this.loginService.loggedIn === 0) {
        this.password.nativeElement.value = '';
      }
    }
  }

}
