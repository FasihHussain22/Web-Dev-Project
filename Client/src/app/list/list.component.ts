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

  @Input() listName: string;
  @Input() listKey: string;

  @ViewChild('task') task: ElementRef;

  ngOnInit(): void {
  }

  addTask(task: string){
    if (task.length != 0){
      this.loginService.addTask(this.listKey, task);
      this.task.nativeElement.value = '';
    }
  }

  deleteList(){
    this.loginService.deleteList(this.listKey);
  }

}
