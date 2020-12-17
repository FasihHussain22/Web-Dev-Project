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

  // userList: { key: string; listName: string; tasks: { key: string; desc: string; status: boolean }[] }[] = [{ key: '1', listName: 'list 1', tasks: [{ key: 'a', desc: 'task1', status: false }, { key: 'b', desc: 'task2', status: true }, { key: 'c', desc: 'task3', status: false }] }, { key: '2', listName: 'list 2', tasks: [{ key: 'a', desc: 'task1', status: false }, { key: 'b', desc: 'task2', status: true }, { key: 'c', desc: 'task3', status: false }] }];
  userList: { key: string; listName: string; tasks: { key: string; desc: string; status: boolean }[] }[];

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string) {
    // send request to login
    this.http.post<any>('http://localhost:3000/login-user', { username: username, password: password }).subscribe((data) => {
      this.loggedIn = data.status;
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
      if (data.status === 1) {
        this.userList.push({ key: listKey, listName: listName, tasks: [] });
      }
    });
    // this.userList.push({ key: listKey, listName: listName, tasks: [] });
    // console.log(this.userList);
  }

  deleteList(listKey: string) {
    // delete list of the user
    this.http.post<any>('http://localhost:3000/delete-list', { username: this.username, listKey: listKey }).subscribe((data) => {
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
    // for (let i = 0; i < this.userList.length; i++) {
    //   if (this.userList[i].key === listKey) {
    //     this.userList.splice(i, 1);
    //     console.log('List Deleted');
    //     console.log(this.userList);
    //     return 0;
    //   }
    // }
    // console.log('List Delete Failed');
    // return -1;
  }

  addTask(listKey: string, task: string) {
    // add task to the list
    // var index: number = 0;
    // this.userList.forEach((value) => {
    //   if (value.listName == listName){
    //     value.tasks.push(task);
    //     return 0;
    //   }
    // });
    // return -1;
    var taskKey = generate();
    this.http.post<any>('http://localhost:3000/add-task', { username: this.username, listKey: listKey, taskKey: taskKey, task: task }).subscribe((data) => {
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
    // for (let i = 0; i < this.userList.length; i++) {
    //   if (this.userList[i].key === listKey) {
    //     this.userList[i].tasks.push({ key: taskKey, desc: task, status: false });
    //     console.log(this.userList);
    //     return 0;
    //   }
    // }
    // return -1;
  }

  deleteTask(listKey: string, taskKey: string) {
    // delete task from the list
    // var index: number = 0;
    // this.userList.forEach((value) => {
    //   if (value.listName == listName){
    //     value.tasks.forEach((task_) => {
    //       if (task_ == task){
    //         delete value[index];
    //         console.log(this.userList);
    //         return 0;
    //       }
    //       else{
    //         index += 1;
    //       }
    //     });
    //   }
    // });
    // return -1;
    this.http.post<any>('http://localhost:3000/delete-task', { username: this.username, listKey: listKey, taskKey: taskKey }).subscribe((data) => {
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
    // for (let i = 0; i < this.userList.length; i++) {
    //   if (this.userList[i].key === listKey) {
    //     for (let j = 0; j < this.userList[i].tasks.length; j++) {
    //       if (this.userList[i].tasks[j].key === taskKey) {
    //         // delete this.userList[i].tasks[j];
    //         this.userList[i].tasks.splice(j, 1);
    //         console.log(this.userList);
    //         return 0;
    //       }
    //     }
    //   }
    // }
    // return -1;
  }

  updateStatus(listKey: string, taskKey: string, status: boolean) {
    this.http.post<any>('http://localhost:3000/update-task', { username: this.username, listKey: listKey, taskKey: taskKey, status: status }).subscribe((data) => {
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
    // for (let i = 0; i < this.userList.length; i++) {
    //   if (this.userList[i].key === listKey) {
    //     for (let j = 0; j < this.userList[i].tasks.length; j++) {
    //       if (this.userList[i].tasks[j].key === taskKey) {
    //         // delete this.userList[i].tasks[j];
    //         this.userList[i].tasks[j].status = status;
    //         console.log(this.userList);
    //         return 0;
    //       }
    //     }
    //   }
    // }
    // return -1;
  }

  canActivate() {
    if (this.loggedIn === 1) {
      return true;
    }
    else {
      return false;
    }
  }
}
