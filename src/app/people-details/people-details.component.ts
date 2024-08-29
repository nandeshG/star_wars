import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  constructor(private service: PeopleService) { }

  peopleDetail: any
  films: any = []
  vehicles: any = []
  starShips: any = []

  ngOnInit(): void {

    this.peopleDetail = this.service.peopleRow
    this.films = Object.values(this.peopleDetail?.films)
    this.vehicles = Object.values(this.peopleDetail?.vehicles)
    this.starShips = Object.values(this.peopleDetail?.starships)
  }

}
