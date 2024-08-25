import { Component, OnInit } from '@angular/core';

import { PeopleService } from '../services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  constructor(private service: PeopleService, private rout: Router) { }

  peopleData: any = []
  ngOnInit(): void {
    this.getPeople()

  }

  getPeople() {
    this.service.getPeople().subscribe((data: any) => {
      this.peopleData = data.results
    })
  }



  selectRow(people: any) {
    console.log("here", people)
    this.rout.navigate(['/people', people])
  }

}
