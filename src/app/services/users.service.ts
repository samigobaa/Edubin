import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  URL ='http://localhost:3000/api/users'
  addUsers(user :any){
   return this.http.post(this.URL,user);
  }
}
