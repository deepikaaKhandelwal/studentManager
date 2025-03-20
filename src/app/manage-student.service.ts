import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentData } from './student-data';

@Injectable({
  providedIn: 'root'
})
export class ManageStudentService {

  public studentsList = new BehaviorSubject<StudentData[]>([]);
  students$ = this.studentsList.asObservable();

  constructor() { }

  addStudentData(student: StudentData): void {
    const addStudent = [...this.studentsList.value, student];
    this.studentsList.next(addStudent);
  }

  updateStudentData(updateStudentData: StudentData): void {
    const students = this.studentsList.value;
    const index = students.findIndex(student => student.email === updateStudentData.email);
    if (index !== -1) {
      students[index] = updateStudentData;
      this.studentsList.next([...students]);
    }
  }

  deleteStudentData(email: string): void {
    const updatedStudents = this.studentsList.value.filter(student => student.email !== email);
    this.studentsList.next(updatedStudents);
  }
}
