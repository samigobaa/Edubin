import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componants/home/home.component';
import { HeaderComponent } from './componants/header/header.component';
import { FooterComponent } from './componants/footer/footer.component';
import { SliderComponent } from './componants/slider/slider.component';
import { GalaryComponent } from './componants/galary/galary.component';
import { AboutComponent } from './componants/about/about.component';
import { ApplyPartComponent } from './componants/apply-part/apply-part.component';
import { CoursesComponent } from './componants/courses/courses.component';
import { VideoComponent } from './componants/video/video.component';
import { TeachersComponent } from './componants/teachers/teachers.component';
import { PublicationComponent } from './componants/publication/publication.component';
import { TeastimonialComponent } from './componants/teastimonial/teastimonial.component';
import { NewsComponent } from './componants/news/news.component';
import { PatnarComponent } from './componants/patnar/patnar.component';
import { LoginComponent } from './componants/login/login.component';
import { SignupComponent } from './componants/signup/signup.component';
import { AdminComponent } from './componants/admin/admin.component';
import { ParentComponent } from './componants/parent/parent.component';
import { StudentComponent } from './componants/student/student.component';
import { InscriptionTeachersComponent } from './componants/inscription-teachers/inscription-teachers.component';
import { AddCoursComponent } from './componants/add-cours/add-cours.component';
import { AddStudentComponent } from './componants/add-student/add-student.component';
import { AddTeachersComponent } from './componants/add-teachers/add-teachers.component';
import { UpdateCoursComponent } from './componants/update-cours/update-cours.component';
import { AdminPanelComponent } from './componants/admin-panel/admin-panel.component';
import { StudentTableComponent } from './componants/student-table/student-table.component';
import { TeachersTableComponent } from './componants/teachers-table/teachers-table.component';
import { CoursesTableComponent } from './componants/courses-table/courses-table.component';
import { SignupStudentComponent } from './componants/signup-student/signup-student.component';
import { SignupParentComponent } from './componants/signup-parent/signup-parent.component';
import { TeachersPanelComponent } from './componants/teachers-panel/teachers-panel.component';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdmiProfileComponent } from './componants/admi-profile/admi-profile.component';
import { StudentProfileComponent } from './componants/student-profile/student-profile.component';
import { TeacherProfileComponent } from './componants/teacher-profile/teacher-profile.component';
import { ParentProfileComponent } from './componants/parent-profile/parent-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    GalaryComponent,
    AboutComponent,
    ApplyPartComponent,
    CoursesComponent,
    VideoComponent,
    TeachersComponent,
    PublicationComponent,
    TeastimonialComponent,
    NewsComponent,
    PatnarComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ParentComponent,
    StudentComponent,
    InscriptionTeachersComponent,
    AddCoursComponent,
    AddStudentComponent,
    AddTeachersComponent,
    UpdateCoursComponent,
    AdminPanelComponent,
    StudentTableComponent,
    TeachersTableComponent,
    CoursesTableComponent,
    SignupStudentComponent,
    SignupParentComponent,
    TeachersPanelComponent,
    AdmiProfileComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    ParentProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
