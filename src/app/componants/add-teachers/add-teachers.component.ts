import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrls: ['./add-teachers.component.css']
})
export class AddTeachersComponent implements OnInit {
teacherForm!:FormGroup
displayMessage :any =''
  constructor(private formBuilder:FormBuilder,private teacherService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required, Validators.minLength(3)]],
      userLastName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userAdresse: ['', Validators.required],
      userSpeciality: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      userPhone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      userFile: ['']


    })
  }
  addTeacher() {
    let student = this.teacherForm.value;
      student.role = 'teacher';
    console.log('Here student', student);
    this.teacherService.addUsers(student, this.teacherForm.value.userFile).subscribe((response) => {
      console.log('Here response after signup', response.message);
      this.displayMessage = response.message
    });
  }
}
