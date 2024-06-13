import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
teachersTable:any=[]
  constructor(private userService:UsersService,private router:Router) { }

  ngOnInit(): void {
  this.getAllUsers();
  }
getAllUsers(){
  this.userService.getAllUsers().subscribe((res)=>{
    this.teachersTable=res.message;

    console.log(res.message);
    
  })
}
goToAddTeacher(){
this.router.navigate(['add-teachers'])
}
displayTeacher(id :any){
  this.router.navigate([`teachers-panel/${id}`])
}
deleteTeacher(id: number) {
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

