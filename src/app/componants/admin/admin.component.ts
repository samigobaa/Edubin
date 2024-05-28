import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm!:FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      FirstName : ['',[Validators.required,Validators.minLength(3)]],
      adminLastName : ['',[Validators.required,Validators.minLength(3)]],
      adminEmail : ['',[Validators.required,Validators.email]],
      adminAdresse :['',Validators.required],
      adminPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      adminPhone : ['',[Validators.required,Validators.pattern('[0-9]{8}')]],
      
    })
  }

}
