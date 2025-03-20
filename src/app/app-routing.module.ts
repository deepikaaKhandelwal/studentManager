import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStudentComponent } from './manage-student/manage-student.component';

const routes: Routes = [
  {
    path: '',
    component: ManageStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
