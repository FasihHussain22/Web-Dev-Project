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

  @Input() listName: string;
  @Input() listKey: string;
  @Input() task: string;
  @Input() taskKey: string;
  @Input() status: boolean;

  ngOnInit(): void {
  }

  deleteTask(){
    this.loginService.deleteTask(this.listKey, this.taskKey);
  }

  updateStatus(){
    this.loginService.updateStatus(this.listKey, this.taskKey, !this.status);
  }

}
