import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: any;
  constructor(private userService: UserService, private router: Router, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getUsersDetails();
  }

  /**
   * get data into firebase db
   */

  getUsersDetails() {
    this.db.list('users').snapshotChanges().pipe(map(res1 => {
      return res1.map(res2 => ({
        $key: res2.payload.key, ...res2.payload.val()
      }));
    })).subscribe(keyvalues => {
      this.users = keyvalues;
    });

  }

  /**
   * edit specific user in firebase DB
   * @param userDetails user detail
   */

  editDetails(userDetails) {
    this.userService.addUser(userDetails);
    this.router.navigate(['/registration']);


  }

  /**
   * delete specific user in firebase DB
   * @param user user record
   */

  deleteUser(user) {
    if (user && user.$key) {
      this.db.list('users').remove(user.$key);
      this.getUsersDetails();
    }
  }

  /**
   * Navigate into Registration page
   */

  backToRegistration() {
    this.userService.addUser(undefined);
    this.router.navigate(['/registration']);
  }

}
