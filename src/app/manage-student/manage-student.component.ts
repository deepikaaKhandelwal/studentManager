import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentData } from '../student-data';
import { ManageStudentService } from '../manage-student.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {
  public students: StudentData[] = [];
  public studentForm: FormGroup; 
  public minDate = new Date((new Date().getFullYear() -30), 0, 1);
  public maxDate = new Date((new Date().getFullYear() -20), 11, 31);
  
  constructor(
    private fb: FormBuilder,
    private manageStudentService: ManageStudentService
  ){
    this.studentForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('',  [Validators.required, Validators.email]),
      course: new FormControl('', Validators.required),
    });
  }

  ngOnInit(){
    this.manageStudentService.students$.subscribe((students) => {
      this.students = students; //Latest list of students
    });
  }

  public addStudent() : void {
    console.log(this.studentForm.value);
    if(this.studentForm.valid){
      const studentData: StudentData = this.studentForm.value;
      this.manageStudentService.addStudentData(studentData); //Add student data in the studentsList
      this.studentForm.reset(); // Resetting the form after submission
      this.removeValidators(this.studentForm);
    }
  }

  public removeValidators(form: FormGroup) {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.setErrors(null);
    });
}
}
