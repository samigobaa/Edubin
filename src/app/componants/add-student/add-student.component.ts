import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
studentForm!:FormGroup
path!: string;
displayMessage :any =''
  constructor(private formBuilder:FormBuilder,private studentService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
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
  addStudent() {
    let student = this.studentForm.value;
      student.role = 'student';
    console.log('Here student', student);
    this.studentService.addUsers(student, this.studentForm.value.userFile).subscribe((response) => {
      console.log('Here response after signup', response.message);
      this.displayMessage = response.message
    });
  }

}
