import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  studentTable:any=[]
  constructor(private userService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.studentTable=res.message;

      console.log(res.message);
      
    })
  }
  goToAddStudent(){
this.router.navigate(['add-Student'])
  }
  deleteStudent(id: number) {
    // deleteObject(this.matchesTab ,'matches', id);
    this.userService.deleteUsers(id).subscribe((result) => {
      console.log("here response after delete",result.message);
      this.getAllUsers();
    });
  
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
