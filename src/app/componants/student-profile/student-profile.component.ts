import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  editProfile : any = {}
  decoded :any
  studentForm : any
  constructor(private studentService:UsersService , private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);
      console.log('Here decoded token into profile', this.decoded);
    }
    this.editProfile = this.formBuilder.group({
      tel: [''],
      oldPwd: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      newPwd: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPwd: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
    });
  }

}
