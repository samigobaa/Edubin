import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
id:any
user:any 
  constructor(private userService:UsersService,private courService:CoursService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllUser();
   this.getAllCours();
   this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUsersById(this.id).subscribe(
      (res)=>{
       this.user = res.match;
       console.log('usrt by id',this.user);
       
      }
    )

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
