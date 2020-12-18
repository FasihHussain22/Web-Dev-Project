import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private loginService: LoginService, public router: Router) { }

  @Input() listName: string;  // list name of task
  @Input() listKey: string;   // list key of task
  @Input() task: string;      // task description
  @Input() taskKey: string;   // key of the current task
  @Input() status: boolean;   // status of current task

  ngOnInit(): void {
  }

  // send a request to delete the current task
  deleteTask(){
    this.loginService.deleteTask(this.listKey, this.taskKey);
  }

  // update the status of the current task
  updateStatus(){
    this.loginService.updateStatus(this.listKey, this.taskKey, !this.status);
  }

}
