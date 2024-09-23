import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotesService} from 'src/app/services/notes.service';
import {UsersService} from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styleUrls: ['./student-note.component.css']
})
export class StudentNoteComponent implements OnInit {
  noteForm: FormArray; // initialisation
  studentTable: any[] = [];

  constructor(private formBuilder: FormBuilder, private noteService: NotesService, private userService: UsersService) {
  }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      const users: any[] = res.message;
      this.studentTable = users.filter(st => st.role === 'student');
      // build note form
      this.studentTable.forEach(student => {
        const studentNoteFormGroup = this.formBuilder.group({
          firstName: [student.firstName, Validators.required],
          lastName: [student.lastName, Validators.required],
          studentID: [student.studentId],
          studentNote: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
        });

        // init
        this.noteForm.push(studentNoteFormGroup)
      })



      console.log(res.message);

    })
  }

  addNote(studentForm: AbstractControl<any>) {
    let note = studentForm.value.studentNote;
    let studentId = studentForm.value.studentID
    console.log('Here cour', note);
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
        title: "Note add successfully"
      });
    });
  }

}

