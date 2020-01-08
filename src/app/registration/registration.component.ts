import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    $key: '',
    name: ['', Validators.required],
    email: ['', Validators.required],
    mobileNo: ['', [Validators.required, Validators.minLength(10)]],
    address: ['', Validators.required],
  });

  submited: boolean;
  userDetail: any;
  isEditMode: boolean;

  constructor(private fb: FormBuilder, private firebaseService: AngularFireDatabase, private router: Router,
    // tslint:disable-next-line: align
    private userService: UserService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.userDetail = this.userService.getUser();
    if (this.userDetail) {
      this.isEditMode = true;
      this.registrationForm.patchValue(this.userDetail);
    }

  }

  /**
   * Add or Update New User
   */
  addOrUpdateUser() {
    this.submited = true;

    if (this.registrationForm.valid) {
      this.submited = false;

      const postData = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        mobileNo: this.registrationForm.value.mobileNo,
        address: this.registrationForm.value.address,
      };

      const key = this.registrationForm.value.$key;

      if (this.isEditMode) {
        this.firebaseService.object('/users/' + key).update(postData);
      } else {
        this.firebaseService.list('users').push(postData);
      }

      this.router.navigate(['users-list']);
    }
  }

}
