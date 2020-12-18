import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @ViewChild('listName') listName: ElementRef;

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
    if (this.loginService.loggedIn === 0){
      this.router.navigate(['']);
    }
  }

  // logout the user
  logout(){
    this.loginService.logout();
  }

  // add a new list
  addList(listName: string){
    if (listName.length != 0){
      this.loginService.addList(listName);
      this.listName.nativeElement.value = '';
    }
  }
}
