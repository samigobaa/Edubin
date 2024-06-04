import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
teachersTable:any=[]
  constructor(private userService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
      this.teachersTable=res.message;

      console.log(res.message);
      
    })
  }

goToAddTeacher(){
this.router.navigate(['add-teachers'])
}
}
