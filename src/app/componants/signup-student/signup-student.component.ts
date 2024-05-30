import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  studentForm !:FormGroup
  imagePreview :any
  student:any
  constructor(private formBuilder:FormBuilder , private studentService:UsersService) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentFirstName : ['',[Validators.required,Validators.minLength(3)]],
      studentLastName : ['',[Validators.required,Validators.minLength(3)]],
      studentEmail : ['',[Validators.required,Validators.email]],
      studentAdresse :['',Validators.required],
      studentSpeciality :['',Validators.required],
      studentPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      studentPhone : ['',[Validators.required,Validators.pattern('[0-9]{8}')]]
      
    })
  }
  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.studentForm.patchValue({ img: file });
    this.studentForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    }
    } 
    addStudent(){
      this.studentService.addUsers(this.student).subscribe();
    }
}
