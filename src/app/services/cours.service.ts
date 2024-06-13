import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  courUrl = 'http://localhost:3000/api/cours'
  constructor(private httpClient: HttpClient) { }
  addCours(courObjet: any) {
    let formData = new FormData();
    formData.append("courName", courObjet.courName );
    formData.append("courNbrHours", courObjet.courNbrHours );
    formData.append("courDiscription", courObjet.courDiscription );
    return this.httpClient.post<{ message: any }>(this.courUrl, courObjet)
  }
  getAllCours() {
    return this.httpClient.get<{ message: any }>(this.courUrl)
  }
  deleteCours(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.courUrl}/${id}`);
  }
}
