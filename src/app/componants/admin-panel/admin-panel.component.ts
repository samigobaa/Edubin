import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
userTable :any =[]
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
      this.userTable=res.message;

      console.log(res.message);
      
    })
  }

}
