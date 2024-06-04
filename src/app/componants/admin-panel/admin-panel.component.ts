import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
userTable :any =[]
courTable :any =[]
  constructor(private userService:UsersService,private courService:CoursService) { }

  ngOnInit(): void {
    this.getAllUser();
   this.getAllCours();

  }
getAllUser(){
  this.userService.getAllUsers().subscribe((res)=>{
    console.log(res.message); 
    this.userTable = res.message
  });
}
getAllCours(){
  this.courService.getAllCours().subscribe((res)=>{
    console.log(res.message);
    this.courTable = res.message
  })
}
}
