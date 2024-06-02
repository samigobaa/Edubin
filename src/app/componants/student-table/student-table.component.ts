import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  studentTable:any=[]
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
      this.studentTable=res.message;

      console.log(res.message);
      
    })
  }
}
