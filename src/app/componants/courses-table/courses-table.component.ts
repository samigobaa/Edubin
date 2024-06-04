import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courTable :any =[]
  constructor(private courService : CoursService,private router:Router) { }

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((res)=>{
      console.log(res.message);
      this.courTable = res.message
    })
  }
  goToAddCour(){
this.router.navigate(['add-courses'])
  }
}
