import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
coursTable:any =[]
  constructor(private courService:CoursService) { }

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((res)=>{
this.coursTable =res.message
    })
  }

}
