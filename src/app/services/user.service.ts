import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetail: any;
  constructor() { }


  addUser(postData) {
    this.userDetail = postData;
    return;
  }

  getUser() {
    return this.userDetail;
  }

}
