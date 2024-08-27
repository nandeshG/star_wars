import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  // sendPeople = new Subject<any>();
  // obs = this.sendPeople.asObservable()
  peopleRow: any
  getPeople() {
    return this.http.get('https://swapi.dev/api/people')
  }

  getSpecies() {
    return this.http.get('https://swapi.dev/api/species')
  }

  getFilms() {
    return this.http.get('https://swapi.dev/api/films')
  }

  getstarship() {
    return this.http.get('https://swapi.dev/api/starships')
  }

  getvehicle() {
    return this.http.get('https://swapi.dev/api/vehicles')
  }
}
