import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private loginService: LoginService, public router: Router) { }

  @Input() listName: string;  // name of the list
  @Input() listKey: string;   // key of the list

  @ViewChild('task') task: ElementRef;

  ngOnInit(): void {
  }

  // add task to the list
  addTask(task: string){
    if (task.length != 0){
      this.loginService.addTask(this.listKey, task);
      this.task.nativeElement.value = '';
    }
  }

  // delete list
  deleteList(){
    this.loginService.deleteList(this.listKey);
  }

}
