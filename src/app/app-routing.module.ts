import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailsComponent } from './people-details/people-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/:id', component: PeopleDetailsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
