import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentTable :any=[]
  notesTable :any=[]
  studentId:any;
  constructor(
    private userService:UsersService,
    private noteService:NotesService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllNotes()
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.studentTable = users.filter(st => st.role === 'student');
      console.log('student table',this.studentTable);
      
  });
  }
  getAllNotes() {
    this.noteService.getNotesForStudent().subscribe(
      (res) => {
        this.notesTable = res.data; // Assigner les données des notes
        console.log('Toutes les notes', this.notesTable);
      },
      (error) => {
        console.error('Erreur lors de la récupération des notes', error);
      }
    );
  }

}
