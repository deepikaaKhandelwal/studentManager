import { TestBed } from '@angular/core/testing';

import { ManageStudentService } from './manage-student.service';

describe('ManageStudentService', () => {
  let service: ManageStudentService;
  const testStudentData = {
    firstName: 'test',
    lastName: 'test',
    email: 'test1@gmail.com',
    dob: new Date(1998,10,1),
    gender: 'male',
    course: 'Mechanical'
  }
  const testDataList = [
    {
      firstName: 'test',
    lastName: 'test',
    email: 'test2@gmail.com',
    dob: new Date(1998,10,1),
    gender: 'male',
    course: 'Electrical'
    },
    {
      firstName: 'test',
    lastName: 'test',
    email: 'test3@gmail.com',
    dob: new Date(1998,10,1),
    gender: 'male',
    course: 'Computer Science'
    },
    {
      firstName: 'test',
    lastName: 'test',
    email: 'test4@gmail.com',
    dob: new Date(1998,10,1),
    gender: 'male',
    course: 'Electronics'
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add student data to students', () => {
    expect(service.studentsList.value.length).toBe(0);
    service.addStudentData(testStudentData);
    expect(service.studentsList.value.length).toBe(1);
    expect(service.studentsList.value[0]).toEqual(testStudentData);
  });

  it('should update student data with the updated value', () => {
    const testUpdatedData = {
      firstName: 'test',
      lastName: 'test',
      email: 'test1@gmail.com',
      dob: new Date(1998,10,1),
      gender: 'male',
      course: 'Electrical'
    }
    service.addStudentData(testStudentData);
    service.updateStudentData(testUpdatedData)
    expect(service.studentsList.value[0]).toEqual(testUpdatedData);
  });

  it('should delete student data', () => {
    service.studentsList.next(testDataList);
    expect(service.studentsList.value.length).toBe(3);
    service.deleteStudentData('test4@gmail.com');
    expect(service.studentsList.value.length).toBe(2);
  })
});
