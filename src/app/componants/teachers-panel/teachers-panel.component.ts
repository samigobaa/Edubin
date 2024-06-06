import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers-panel',
  templateUrl: './teachers-panel.component.html',
  styleUrls: ['./teachers-panel.component.css']
})
export class TeachersPanelComponent implements OnInit {
teacherTable :any =[]
  constructor(private techerService:UsersService) { }

  ngOnInit(): void {
    this.techerService.getAllUsers().subscribe((res)=>{
      this.teacherTable = res.message
      console.log('teacher table',this.teacherTable);
      
    })
  }

}
