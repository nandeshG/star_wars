import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'

import { PeopleService } from '../services/people.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit {

  constructor(private service: PeopleService, private rout: Router) { }

  birthYear = new FormControl('');
  peopleData: any = []
  species: any = []
  films: any = []
  vehicles: any = []
  starships: any = []
  name = ''
  starShip = ''
  vehicle = ''
  spec = ''
  peopleCopy: any = []

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
      this.peopleCopy = structuredClone(this.peopleData)
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
        return val.name
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
    people.species = species[0]?.name
    people.films = films
    people.starships = star
    people.vehicles = vehicle
    this.service.peopleRow = people
    this.rout.navigate(['/people', index])
  }

  search() {
    this.peopleCopy = structuredClone(this.peopleData)
    if (this.name != '') {
      let filmCopy = structuredClone(this.films)
      filmCopy = filmCopy.filter((value: any) => {
        return value.title.toLowerCase().includes(this.name.toLowerCase())
      })

      let moc: any = []
      for (let p of this.peopleCopy) {
        if (p.films.length) {
          p.films.filter((f: any) => {
            for (let fi of filmCopy) {
              if (f === fi.url)
                moc.push(p)
            }
          })
        }
      }
      this.peopleCopy = [...new Set(moc)]
    }


    if (this.spec != '') {
      let speci = structuredClone(this.species)
      speci = speci.filter((value: any) => {
        return value.name.toLowerCase().includes(this.spec.toLowerCase())
      })
      let moc: any = []
      for (let p of this.peopleCopy) {
        if (p.species?.length) {
          p.species.filter((f: any) => {
            for (let fi of speci) {
              if (f === fi.url)
                moc.push(p)
            }
          })
        }
        this.peopleCopy = moc
      }

    }


    if (this.vehicle != '') {
      let vehi = structuredClone(this.vehicles)
      vehi = vehi.filter((value: any) => {
        return value.name.toLowerCase().includes(this.vehicle.toLowerCase())
      })

      let moc: any = []
      for (let p of this.peopleCopy) {
        if (p.vehicles?.length) {
          p.vehicles.filter((f: any) => {
            for (let fi of vehi) {
              if (f === fi.url)
                moc.push(p)
            }
          })
        }
        this.peopleCopy = moc
      }
    }


    if (this.starShip != '') {
      let star = structuredClone(this.starships)
      star = star.filter((value: any) => {
        return value.name.toLowerCase().includes(this.starShip.toLowerCase())
      })
      let moc: any = []
      for (let p of this.peopleCopy) {
        if (p.starships?.length) {
          p.starships.filter((f: any) => {
            for (let fi of star) {
              if (f === fi.url)
                moc.push(p)
            }
          })
        }
        this.peopleCopy = moc
      }
    }

    if (this.name == '' && this.vehicle == '' && this.starShip == '' && this.spec == '') {

      this.peopleCopy = this.peopleData

    }
  }

}

