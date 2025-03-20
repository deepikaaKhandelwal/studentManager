import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageStudentComponent } from './manage-student.component';
import { ManageStudentService } from '../manage-student.service';
import { AppModule } from '../app.module';
import { BehaviorSubject } from 'rxjs';
import { StudentData } from '../student-data';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ManageStudentComponent', () => {
  let component: ManageStudentComponent;
  let fixture: ComponentFixture<ManageStudentComponent>;
  let mockManageStudentService: jasmine.SpyObj<ManageStudentService>;
  let studentsSubject: BehaviorSubject<StudentData[]>;
  const testStudentData = {
    firstName: 'test2',
    lastName: 'test2',
    email: 'test12@gmail.com',
    dob:  new Date(1998,10,1),
    gender: 'male',
    course: 'Mechanical'
  }

  beforeEach(() => {
    studentsSubject = new BehaviorSubject<StudentData[]>([]);
    mockManageStudentService = jasmine.createSpyObj('ManageStudentService', ['addStudentData'], {
      students$: studentsSubject.asObservable()
    });

    TestBed.configureTestingModule({
      declarations: [ManageStudentComponent],
      imports: [AppModule],
      providers: [{
        provide: ManageStudentService, useValue: mockManageStudentService
      }]
    });
    fixture = TestBed.createComponent(ManageStudentComponent);
    component = fixture.componentInstance;
    component.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add value upon clicking add button', () => {
    component.studentForm.setValue({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test12@gmail.com',
      dob: new Date(1998,10,1),
      gender: 'male',
      course: 'Mechanical'
    })

    component.studentForm.updateValueAndValidity(); 

    fixture.detectChanges();
    expect(component.studentForm.valid).toBeTrue();
    component.addStudent();
    expect(mockManageStudentService.addStudentData).toHaveBeenCalledWith(testStudentData);
  });

});
