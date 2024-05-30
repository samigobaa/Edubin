import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {
parentForm !:FormGroup
imagePreview:any
parent:any
  constructor(private formBuilder:FormBuilder,private parentService:UsersService) { }

  ngOnInit(): void {
    this.parentForm = this.formBuilder.group({
      parentFirstName : ['',[Validators.required,Validators.minLength(3)]],
      parentLastName : ['',[Validators.required,Validators.minLength(3)]],
      parentEmail : ['',[Validators.required,Validators.email]],
      parentAdresse :['',Validators.required],
      ChildPhone :['',[Validators.required,Validators.pattern('[0-9]{8}')]],
      parentPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      parentPhone : ['',[Validators.required,Validators.pattern('[0-9]{8}')]]
      
    })
  }
  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.parentForm.patchValue({ img: file });
    this.parentForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    }
    } 
    addParent(){
      this.parentService.addUsers(this.parent).subscribe();
    }
}
