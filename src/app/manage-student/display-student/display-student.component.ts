import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentData } from 'src/app/student-data';
import { MatTableDataSource } from '@angular/material/table';
import { ManageStudentService } from 'src/app/manage-student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-student',
  templateUrl: './display-student.component.html',
  styleUrls: ['./display-student.component.scss']
})
export class DisplayStudentComponent implements OnInit {
  
  public editClicked: boolean = false;
  public minDate = new Date((new Date().getFullYear() -30), 0, 1);
  public maxDate = new Date((new Date().getFullYear() -20), 11, 31);
  public studentForm!: FormGroup; 
  public studentDataSource = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private manageStudentService: ManageStudentService
  ){
  }

  ngOnInit(){
    this.manageStudentService.students$.subscribe((students) => {
      this.studentDataSource.data = students; //Latest list of students
    });
    this.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl(''),
      gender: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    });
  }

  public editStudent(student: StudentData){
    this.editClicked = true;
    this.studentForm.controls['firstName'].setValue(student.firstName);
    this.studentForm.controls['lastName'].setValue(student.lastName);
    this.studentForm.controls['dob'].setValue(student.dob);
    this.studentForm.controls['email'].setValue(student.email);
    this.studentForm.controls['gender'].setValue(student.gender)
    this.studentForm.controls['course'].setValue(student.course);
  }

  public deleteStudent(email: string){
    this.manageStudentService.deleteStudentData(email);
  }

  public save(){
    const student: StudentData = this.studentForm.value;
    this.editClicked = false;
    this.manageStudentService.updateStudentData(student);
  }

  public cancel() {
    this.editClicked = false;
    this.studentForm.reset();
  }

}
