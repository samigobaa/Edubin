import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  studentForm !:FormGroup
  imagePreview :any
  student:any
  constructor(private formBuilder:FormBuilder , private studentService:UsersService, private router:Router) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentFirstName : ['',[Validators.required,Validators.minLength(3)]],
      studentLastName : ['',[Validators.required,Validators.minLength(3)]],
      studentEmail : ['',[Validators.required,Validators.email]],
      studentAdresse :['',Validators.required],
      studentSpeciality :['',Validators.required],
      studentPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      studentPhone : ['',[Validators.required,Validators.pattern('[0-9]{8}')]],
      studentPhoto :['']
      
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
      this.studentService.addUsers(this.student,this.studentForm.value.studentPhoto).subscribe((res)=>{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Done !"
        });
        
      });
      this.router.navigate([''])
    }
}
