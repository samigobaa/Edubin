import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  coursForm!:FormGroup
  cour :any ={}
  userTable : any =[]
  displayMessage :any =''
  constructor(
    private formBuilder:FormBuilder, 
    private courService:CoursService,
 private userServices:UsersService 
  ) { }

  ngOnInit(): void {
    this.coursForm = this.formBuilder.group({
      courName:['',Validators.required],
      courNbrHours :['',Validators.required],
      courDiscription: ['',Validators.required]
    })
    this.getAllUsers()
  }
  getAllUsers(){
    this.userServices.getAllUsers().subscribe((res)=>{
      this.userTable = res.message
      console.log('all users',this.userTable); 
    })
  }
addCour(){
  let cour = this.coursForm.value;
console.log('Here cour', cour);
this.courService.addCours(cour).subscribe((response) => {
  console.log('Here response after add', response.message);
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
    title: "Course add successfully"
  });
});
}

}

