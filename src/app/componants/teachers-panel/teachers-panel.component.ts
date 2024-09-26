import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers-panel',
  templateUrl: './teachers-panel.component.html',
  styleUrls: ['./teachers-panel.component.css']
})
export class TeachersPanelComponent implements OnInit {
teacherTable :any =[]
coursTable :any =[]
  constructor(
    private techerService:UsersService,
    private courService:CoursService
  ) { }

  ngOnInit(): void {
    this.techerService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.teacherTable = users.filter(st => st.role === 'teacher');
  });
    this.courService.getAllCours().subscribe((res)=>{
      this.coursTable = res.message
      console.log('cours table',this.coursTable);
      
    })
  }

}
