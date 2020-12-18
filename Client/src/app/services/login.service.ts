import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { generate } from 'shortid';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: number = 0;
  username: string;
  message: string = '';

  userList: { key: string; listName: string; tasks: { key: string; desc: string; status: boolean }[] }[];

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string) {
    // send request to login
    this.http.post<any>('http://localhost:3000/login-user', { username: username, password: password }).subscribe((data) => {
      this.loggedIn = data.status;
      // update the userList accordingly
      if (this.loggedIn === 1) {
        this.username = username;
        this.router.navigate(['list']);
        this.getData();
      }
      else {
        this.message = 'Invalid User Name or Password';
      }
    });
  }

  register(username: string, password: string) {
    // send request to register user
    this.http.post<any>('http://localhost:3000/register-user', { username: username, password: password }).subscribe((data) => {
      this.loggedIn = data.status;
      // update the userList accordingly
      if (this.loggedIn === 1) {
        this.username = username;
        this.router.navigate(['list']);
        this.userList = [];
        this.message = '';
      }
      else {
        this.message = 'User Name already in use';
      }
    });
  }

  logout() {
    // logout the user
    this.loggedIn = 0;
    this.userList = [];
    this.message = '';
    this.router.navigate(['']);
  }

  getData() {
    // call to get data of the user
    this.http.post<any>('http://localhost:3000/get-data', { username: this.username }).subscribe((data) => {
      this.userList = data.data;
    });
  }

  addList(listName: string) {
    // add list to the user
    var listKey = generate();
    this.http.post<any>('http://localhost:3000/add-list', { username: this.username, listKey: listKey, listName: listName }).subscribe((data) => {
      // update the userList accordingly
      if (data.status === 1) {
        this.userList.push({ key: listKey, listName: listName, tasks: [] });
      }
    });
  }

  deleteList(listKey: string) {
    // delete list of the user
    this.http.post<any>('http://localhost:3000/delete-list', { username: this.username, listKey: listKey }).subscribe((data) => {
      // update the userList accordingly
      if (data.status === 1) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].key === listKey) {
            this.userList.splice(i, 1);
            console.log('List Deleted');
            return 0;
          }
        }
      }
      console.log('List Delete Failed');
      return -1;
    });
  }

  addTask(listKey: string, task: string) {
    // add task to the list
    var taskKey = generate();
    this.http.post<any>('http://localhost:3000/add-task', { username: this.username, listKey: listKey, taskKey: taskKey, task: task }).subscribe((data) => {
      // update the userList accordingly
      if (data.status === 1) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].key === listKey) {
            this.userList[i].tasks.push({ key: taskKey, desc: task, status: false });
            return 0;
          }
        }
      }
      return -1;
    });
  }

  deleteTask(listKey: string, taskKey: string) {
    // delete task from the list
    this.http.post<any>('http://localhost:3000/delete-task', { username: this.username, listKey: listKey, taskKey: taskKey }).subscribe((data) => {
      // update the userList accordingly
      if (data.status === 1) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].key === listKey) {
            for (let j = 0; j < this.userList[i].tasks.length; j++) {
              if (this.userList[i].tasks[j].key === taskKey) {
                this.userList[i].tasks.splice(j, 1);
              }
            }
          }
        }
      }
    });
  }

  updateStatus(listKey: string, taskKey: string, status: boolean) {
    // update status of the task
    this.http.post<any>('http://localhost:3000/update-task', { username: this.username, listKey: listKey, taskKey: taskKey, status: status }).subscribe((data) => {
      // update the userList accordingly
      if (data.status === 1) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].key === listKey) {
            for (let j = 0; j < this.userList[i].tasks.length; j++) {
              if (this.userList[i].tasks[j].key === taskKey) {
                this.userList[i].tasks[j].status = status;
              }
            }
          }
        }
      }
    });
  }

  canActivate() {
    // check if user is loggedin
    if (this.loggedIn === 1) {
      return true;
    }
    else {
      return false;
    }
  }
}
