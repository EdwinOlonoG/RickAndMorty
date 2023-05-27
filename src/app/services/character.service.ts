import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/ICharactetrs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://rickandmortyapi.com/api/character/'

  public getCharactersById(ids: number[]){
    return this.http.get<Character>(this.baseUrl + ids);
  }

  public getCharacters() {
    return this.http.get<Character>(this.baseUrl);
  }

  public filter(form: any) {
    let name = form.name;
    let status = form.status;
    let species = form.species;
    let type = form.type;
    let gender = form.gender;
    return this.http.get(this.baseUrl + '?' + 'name=' + name + '&status=' + status + '&species=' + species + '&type=' + type + '&gender=' + gender);
  }
}
