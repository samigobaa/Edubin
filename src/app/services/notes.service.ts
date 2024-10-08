import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private URL = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) { }

  // Ajouter une note
  addNote(note: string , studentId:string) {
    const body = {
      studentId:studentId,
      studentNote:note
    }
    return this.http.post<{ message: string }>(this.URL,body);
  }

  // Obtenir les notes d'un étudiant
  getNotesForStudent(): Observable<{ message: string, data: any[] }> {
    return this.http.get<{ message: string, data: any[] }>(this.URL);
  }
}
