import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  displayMessage :any;
  teacher: any
  path!: string;
  title !: string
  pdfPreview: any
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.path = this.router.url;
    if (this.path == '/signup-student') {
      this.title = 'Signup Student';
    }
    else if (this.path == '/inscriptionTeachers') {
      this.title = 'Signup Teachers';
    }
    else if (this.path == '/signup-parent') {
      this.title = 'Signup Parent';
    }
    else {
      this.title = 'Signup Admin';
    }
    this.signupForm = this.formBuilder.group({
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
  // onFileSelected(event: Event) {
  //   // const file = (event.target as HTMLInputElement).files[0];
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement && inputElement.files && inputElement.files.length
  //     > 0) {
  //     const file = inputElement.files[0];
  //     this.signupForm.patchValue({ img: file });
  //     this.signupForm.updateValueAndValidity();
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.pdfPreview = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  signup() {
    let user = this.signupForm.value;
    if (this.path == '/signup-student') {
      user.role = 'student';
    }
    else if (this.path == '/inscriptionTeachers') {
      user.role = 'teacher';
    }
    else if (this.path == '/signup-parent') {
      user.role = 'parent';
    }
    else {
      user.role = 'admin';
    }
    console.log('Here user', user);
    this.userService.addUsers(user, this.signupForm.value.userFile).subscribe((response) => {
      console.log('Here response after signup', response.message);
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
  }

}



