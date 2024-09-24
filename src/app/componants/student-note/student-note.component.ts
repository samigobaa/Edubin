import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styleUrls: ['./student-note.component.css']
})
export class StudentNoteComponent implements OnInit {
  noteForm!: FormArray; // FormArray for holding student note forms
  studentTable: any[] = []; // Array for holding student data

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NotesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.array([]); // Initialize as a FormArray
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.studentTable = users.filter(st => st.role === 'student');

      // Build note forms for each student
      this.studentTable.forEach(student => {
        const studentNoteFormGroup = this.formBuilder.group({
          firstName: [student.firstName, Validators.required],
          lastName: [student.lastName, Validators.required],
          studentID: [student.studentId],
          studentNote: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
        });

        this.noteForm.push(studentNoteFormGroup); // Push the new FormGroup into the FormArray
      });

      console.log('Form Array after populating:', this.noteForm); // Log to debug
    });
  }

  addNote(studentForm: AbstractControl) {
    const note = studentForm.value.studentNote; // Extract the note value
    const studentId = studentForm.value.studentID; // Extract the student ID

    console.log('Here note', note);
    this.noteService.addNote(note, studentId).subscribe((response) => {
      console.log('Here response after add', response.message);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "success",
        title: "Note added successfully"
      });

      studentForm.reset(); // Reset the form after submission (optional)
    });
  }
}
