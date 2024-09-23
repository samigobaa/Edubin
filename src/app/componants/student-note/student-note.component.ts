import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styleUrls: ['./student-note.component.css']
})
export class StudentNoteComponent implements OnInit {
  noteForm!:FormGroup;
  studentTable: any =[];
  constructor(private formBuilder:FormBuilder, private noteService:NotesService, private userService:UsersService) {}
 

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      studentName:['',Validators.required],
      studentID:[''],
      studentNote: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    })
    this.getAllUsers()
    
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.studentTable=res.message;
  
      console.log(res.message);
      
    })
  }
  addNote(){
    let note = this.noteForm.value.studentNote;
    let studentId = this.noteForm.value.studentID
console.log('Here cour', note);
this.noteService.addNote(note,studentId).subscribe((response) => {
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

