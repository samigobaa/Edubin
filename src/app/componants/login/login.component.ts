import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';
import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {}
  loginForm!: FormGroup;
  errorMessage: any
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {

  }
  login() {

    console.log('Here object', this.user);
    this.userService.login(this.user).subscribe((data) => {
      console.log('message ', data.message);
      if (data.message == 'Welcome') {
        sessionStorage.setItem('jwt', data.user);
        let decoded: any = jwtDecode(data.user);
        if (decoded.role == 'admin') {
          this.router.navigate(['admin-panel']);
        }
        else if (decoded.role == 'student') {
          this.router.navigate(['student-panel']);
        }
        else if (decoded.role == 'teacher') {
          this.router.navigate(['teachers-panel:id']);
        }
        else if (decoded.role == 'parent') {
          this.router.navigate(['parent']);
        }

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
          
        });
      }
    });
  }

}
