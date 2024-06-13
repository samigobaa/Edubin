import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courTable :any =[]
  teacherTable :any = []
  constructor(private courService : CoursService,private router:Router,private userService:UsersService) { }

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((res)=>{
      console.log('les coures',res.message);
      this.courTable = res.message
    })
  }
  goToAddCour(){
this.router.navigate(['add-courses'])
  }
  
  deleteCours() {
   
    // this.courService.deleteCours(id).subscribe((result) => {
    //   console.log("here response after delete",result.message);
     
    // });
  
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }
}
