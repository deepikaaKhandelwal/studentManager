import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStudentComponent } from './display-student.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { ManageStudentService } from 'src/app/manage-student.service';
import { BehaviorSubject } from 'rxjs';
import { StudentData } from 'src/app/student-data';
import { By } from '@angular/platform-browser';

describe('DisplayStudentComponent', () => {
  let component: DisplayStudentComponent;
  let fixture: ComponentFixture<DisplayStudentComponent>;
  let mockManageStudentService: jasmine.SpyObj<ManageStudentService>;
  let studentsSubject: BehaviorSubject<StudentData[]>;
  const testStudentData = {
    firstName: 'test1',
    lastName: 'test1',
    email: 'test1@gmail.com',
    dob: new Date(1998,10,1),
    gender: 'male',
    course: 'Mechanical'
  }
  
  beforeEach(() => {
    studentsSubject = new BehaviorSubject<StudentData[]>([{
      firstName: 'test',
      lastName: 'test',
      email: 'test1@gmail.com',
      dob: new Date(1998,10,1),
      gender: 'male',
      course: 'Mechanical'
    }]);
    mockManageStudentService = jasmine.createSpyObj('ManageStudentService', ['deleteStudentData', 'updateStudentData'], {
      students$: studentsSubject.asObservable()
    });

    TestBed.configureTestingModule({
      declarations: [DisplayStudentComponent],
      providers: [
        { provide: ManageStudentService, useValue: mockManageStudentService }
      ],
      imports: [AppModule]
    });
    
    fixture = TestBed.createComponent(DisplayStudentComponent);
    component = fixture.componentInstance;
    component.studentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl(''),
      gender: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display edit form on click of edit button', () => {
    const button = fixture.debugElement.query(By.css('.edit-btn'));
    button.triggerEventHandler('click', null);
    expect(component.editClicked).toBeTrue();

    fixture.detectChanges();
    const divElement = fixture.nativeElement.querySelector('.edit-form');
    expect(divElement).toBeTruthy();
  });

  it('should pre populate the value upon clicking edit button', () => {
    component.editStudent(testStudentData);
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('#firstName');
    const inputElement2 = fixture.nativeElement.querySelector('#lastName');
    expect(inputElement.value).toBe('test1');
    expect(inputElement2.value).toBe('test1');
  });

  it('should edit the details upon saving and then render dom', () => {
    component.editStudent(testStudentData);
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('#firstName');
    expect(inputElement.value).toBe('test1');

    component.studentForm.controls['firstName'].setValue('Arya');
    component.save();
    fixture.detectChanges();
    const inputElementAfterEdit = fixture.nativeElement.querySelector('#firstName');
    expect(mockManageStudentService.updateStudentData).toHaveBeenCalled();
    expect(inputElement.value).toBe('Arya');
  });

  it('should delete the data', () => {
    component.deleteStudent('test1@gmail.com');
    expect(mockManageStudentService.deleteStudentData).toHaveBeenCalled();
  })


});
