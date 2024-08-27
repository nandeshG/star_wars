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
  species: any = []
  films: any = []
  vehicles: any = []
  starships: any = []
  ngOnInit(): void {
    this.getPeople()
    this.getSpecies()
    this.getFilms()
    this.getstarship()
    this.getvehicle()
  }

  getPeople() {
    this.service.getPeople().subscribe((data: any) => {
      this.peopleData = data.results
    })
  }

  getSpecies() {
    this.service.getSpecies().subscribe((val: any) => this.species = val?.results)

  }

  getFilms() {
    this.service.getFilms().subscribe((val: any) => this.films = val?.results)
  }

  getstarship() {
    this.service.getstarship().subscribe((val: any) => this.starships = val?.results)
  }

  getvehicle() {
    this.service.getvehicle().subscribe((val: any) => this.vehicles = val?.results)
  }

  selectRow(index: any, people: any) {
    let species = this.species.filter((val: any) => {
      if (val.url === people.species[0])
        return val.classification
    })
    let films: any[] = []
    Object.values(this.films).forEach((film: any) => {
      Object.values(people?.films).filter((element: any) => {
        if (element === film.url)
          films.push(
            {
              title: film.title,
              episode: film.episode_id,
              director: film.director

            })

      });
    })

    let star: any = []
    Object.values(this.starships).forEach((starship: any) => {
      Object.values(people?.starships).filter((element: any) => {
        if (element === starship.url)
          star.push({
            model: starship.model,
            name: starship.name
          })
      })
    })

    let vehicle: any = [];
    Object.values(this.vehicles).forEach((vehic: any) => {
      Object.values(people?.vehicles).filter((element: any) => {
        if (element === vehic.url)
          vehicle.push({
            model: vehic.model,
            name: vehic.name
          })
      })
    })
    people.species = species[0]?.classification
    people.films = films
    people.starships = star
    people.vehicles = vehicle
    console.log(people)
    this.service.peopleRow = people
    this.rout.navigate(['/people', index])
  }

}
