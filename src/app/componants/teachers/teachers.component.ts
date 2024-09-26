import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
userTable : any =[]
  constructor(
    private userService:UsersService
  ) { }

  ngOnInit(): void {
   this.getAllUsers()
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.userTable = users.filter(st => st.role === 'teacher');
  });
}
}
