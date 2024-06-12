import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  URL ='http://localhost:3000/api/users'
 
  addUsers(userObjet: any, userFile:File) {
    let formData = new FormData();
    formData.append("firstName", userObjet.userFirstName );
    formData.append("lastName", userObjet.userLastName );
    formData.append("email", userObjet.userEmail );
    formData.append("password", userObjet.userPassword );
    formData.append("phone", userObjet.userPhone );
    formData.append("role", userObjet.role );
    formData.append("speciality", userObjet.userSpeciality );
    formData.append("userFile", userFile);
    
    
    return this.http.post<{ message: string }>(this.URL + '/signup', formData);
  }

  login(user: any) {
    return this.http.post<{ message: string, user: any }>(
      this.URL + '/login',user);
  }
  getAllUsers(){
    return this.http.get<{ message: any }>(this.URL)
  }
  getUsersById(id: any) {
    // http://localhost:3000/users/1
    return this.http.get<{ match: any }>(`${this.URL}/${id}`);
  }
}
