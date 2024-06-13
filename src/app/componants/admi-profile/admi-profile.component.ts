import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admi-profile',
  templateUrl: './admi-profile.component.html',
  styleUrls: ['./admi-profile.component.css']
})
export class AdmiProfileComponent implements OnInit {
adminForm !: FormGroup
decoded :any
editProfile : any;
  constructor(private formBuilder : FormBuilder) { }

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
