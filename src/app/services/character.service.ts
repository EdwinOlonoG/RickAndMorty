import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/ICharactetrs';
import { Response } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://rickandmortyapi.com/api/character/'


  public getCharacters(page: number,form: any) {
    let name = form.name;
    let status = form.status;
    let species = form.species;
    let type = form.type;
    let gender = form.gender;
    return this.http.get<Response>(this.baseUrl + '?' + 'page=' + page + '&name=' + name + '&status=' + status + '&species=' + species + '&type=' + type + '&gender=' + gender);
  }
}
