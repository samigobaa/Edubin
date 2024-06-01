import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componants/home/home.component';
import { SignupComponent } from './componants/signup/signup.component';
import { LoginComponent } from './componants/login/login.component';
import { TeachersComponent } from './componants/teachers/teachers.component';
import { AboutComponent } from './componants/about/about.component';
import { CoursesComponent } from './componants/courses/courses.component';
import { AdminComponent } from './componants/admin/admin.component';
import { ParentComponent } from './componants/parent/parent.component';
import { StudentComponent } from './componants/student/student.component';
import { InscriptionTeachersComponent } from './componants/inscription-teachers/inscription-teachers.component';
import { AdminPanelComponent } from './componants/admin-panel/admin-panel.component';
import { SignupStudentComponent } from './componants/signup-student/signup-student.component';
import { SignupParentComponent } from './componants/signup-parent/signup-parent.component';
import { TeachersPanelComponent } from './componants/teachers-panel/teachers-panel.component';
import { AddCoursComponent } from './componants/add-cours/add-cours.component';
import { AddTeachersComponent } from './componants/add-teachers/add-teachers.component';
import { AddStudentComponent } from './componants/add-student/add-student.component';
import { StudentTableComponent } from './componants/student-table/student-table.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'inscription',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'teachers',component:TeachersComponent},
  {path:'about',component:AboutComponent},
  {path:'courses',component:CoursesComponent},
  {path:'inscriptionAdmin',component:SignupComponent},
  {path:'signup-parent',component:SignupComponent},
  {path:'signup-student',component:SignupComponent},
  {path:'inscriptionTeachers',component:SignupComponent},
  {path:'admin-panel',component:AdminPanelComponent},
  {path:'teachers-panel',component:TeachersPanelComponent},
  {path:'student-panel',component:StudentTableComponent},
  {path:'parent-panel',component:ParentComponent},
  {path:'add-courses', component:AddCoursComponent},
  {path:'add-teachers', component:AddTeachersComponent},
  {path:'add-Student', component:AddStudentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
