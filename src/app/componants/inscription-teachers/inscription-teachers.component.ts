import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription-teachers',
  templateUrl: './inscription-teachers.component.html',
  styleUrls: ['./inscription-teachers.component.css']
})
export class InscriptionTeachersComponent implements OnInit {
  teacherForm!:FormGroup
  pdfPreview:any
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      teacherFirstName : ['',[Validators.required,Validators.minLength(3)]],
      teacherLastName : ['',[Validators.required,Validators.minLength(3)]],
      teacherEmail : ['',[Validators.required,Validators.email]],
      teacherAdresse :['',Validators.required],
      teacherSpeciality :['',Validators.required],
      teacherPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      teacherPhone : ['',[Validators.required,Validators.pattern('[0-9]{8}')]]
      
    })
  }
  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.teacherForm.patchValue({ img: file });
    this.teacherForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.pdfPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    }
    } 
}
