import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  coursForm!:FormGroup
  cour :any ={}
  displayMessage :any =''
  constructor(private formBuilder:FormBuilder, private courService:CoursService) { }

  ngOnInit(): void {
    this.coursForm = this.formBuilder.group({
      courName:['',Validators.required],
      courNbrHours :['',Validators.required],
      courDiscription: ['',Validators.required]
    })
  }
addCour(){
  let cour = this.coursForm.value;
console.log('Here cour', cour);
this.courService.addCours(cour).subscribe((response) => {
  console.log('Here response after add', response.message);
  this.displayMessage = response.message
});
}

}

