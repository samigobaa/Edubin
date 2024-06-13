import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-teachers',
  templateUrl: './inscription-teachers.component.html',
  styleUrls: ['./inscription-teachers.component.css']
})
export class InscriptionTeachersComponent implements OnInit {
  teacherForm!: FormGroup
  teacher: any
  path!: string;
  pdfPreview: any
  constructor(private formBuilder: FormBuilder, private techaerService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      teacherFirstName: ['', [Validators.required, Validators.minLength(3)]],
      teacherLastName: ['', [Validators.required, Validators.minLength(3)]],
      teacherEmail: ['', [Validators.required, Validators.email]],
      teacherAdresse: ['', Validators.required],
      teacherSpeciality: ['', Validators.required],
      teacherPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      teacherPhone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      teacherCV:['']

    })
    this.path = this.router.url;
  }
  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.teacherForm.patchValue({ img: file });
      this.teacherForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.pdfPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  addTeacher() {
    let user = this.teacherForm.value;
    if (this.path == '/signup-student') {
      user.role = 'student';
    }
     else if (this.path == '/inscriptionTeachers'){
      user.role = 'teacher';
    }
    else if (this.path == '/signup-parent'){
      user.role = 'parent';
    }
    else {
      user.role = 'admin';
    }
    console.log('Here user', user);
    this.techaerService.addUsers(this.teacher,this.teacherForm.value.teacherCV).subscribe((response) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Done"
      });
    });
  }

}
