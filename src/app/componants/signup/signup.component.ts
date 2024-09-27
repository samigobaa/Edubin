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
  signupForm!: FormGroup;
  displayMessage: any;
  path!: string;
  title!: string;
  userRole: string = 'student'; // Valeur par défaut
  filePreview: any; // Pour la prévisualisation du fichier
  imagePreview: any; // Pour la prévisualisation des images
  pdfPreview: any; // Pour la prévisualisation des PDF

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.path = this.router.url;
    this.setTitleAndRole();
    
    this.signupForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required, Validators.minLength(3)]],
      userLastName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userAdresse: ['', Validators.required],
      userSpeciality: [''],
      userPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      userPhone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      additionalInfo: [''], // Pour les parents uniquement
      userFile: ['']
    });
  }

  setTitleAndRole(): void {
    if (this.path === '/signup-student') {
      this.title = 'Signup Student';
      this.userRole = 'student';
    } else if (this.path === '/inscriptionTeachers') {
      this.title = 'Signup Teacher';
      this.userRole = 'teacher';
    } else if (this.path === '/signup-parent') {
      this.title = 'Signup Parent';
      this.userRole = 'parent';
    } else {
      this.title = 'Signup Admin';
      this.userRole = 'admin';
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ userFile: file });
      this.signupForm.updateValueAndValidity();
      
      const reader = new FileReader();
      if (this.userRole === 'student') {
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (this.userRole === 'teacher') {
        reader.onload = () => {
          this.pdfPreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
      // For 'parent' role or other roles, you might not need to preview the file
    }
  }

  signup(): void {
    let user = this.signupForm.value;
    user.role = this.userRole;

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
    this.router.navigate([''])
  }
}
