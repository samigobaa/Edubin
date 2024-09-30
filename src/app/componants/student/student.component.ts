import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentTable: any[] = [];
  notesTable: any[] = [];
  studentId: any;
  user: any = null;
  searchForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private noteService: NotesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllNotes();
    this.searchForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.studentTable = users.filter(st => st.role === 'student');
      console.log('Student Table:', this.studentTable);
    });
  }

  getAllNotes() {
    this.noteService.getNotesForStudent().subscribe(
      (res) => {
        this.notesTable = res.data;
        console.log('All Notes:', this.notesTable);
      },
      (error) => {
        console.error('Error retrieving notes:', error);
      }
    );
  }

  search() {
    const firstName = this.searchForm.value.firstName.trim().toLowerCase();
    const lastName = this.searchForm.value.lastName.trim().toLowerCase();
// La méthode trim() en JavaScript permet de supprimer les espaces blancs au début et à la fin d'une chaîne de caractères.
    this.user = this.studentTable.find(
      (stu: any) =>
        stu.firstName.toLowerCase() === firstName &&
        stu.lastName.toLowerCase() === lastName
    );

    if (this.user) {
      Swal.fire({
        icon: 'success',
        title: 'Student Found',
        html: `
          <p><strong>Student Name:</strong> ${this.user.firstName} ${this.user.lastName}</p>
          <p><strong>Notes:</strong> ${this.getStudentNotes(this.user._id)}</p>
        `,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      console.log('User found:', this.user);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Student Not Found',
        text: 'No student found with that name. Please try again!',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      console.log('No user found with that name.');
    }
  }

  getStudentNotes(studentId: string): string {
    const studentNotes = this.notesTable
      .filter((note: any) => note.studentId === studentId)
      .map((note: any) => note.studentNote);

    return studentNotes.length > 0 ? studentNotes.join(', ') : 'No notes available';
  }
}
