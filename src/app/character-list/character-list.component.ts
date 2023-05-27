import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../interfaces/ICharactetrs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Response } from '../interfaces/IResponse';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  public characters: Character[] = [];
  public currentPage = 1;
  public totalPages: number[] = [];
  public form = this.fb.group({
    "name": [''],
    "status": [''],
    "species": [''],
    "type": [''],
    "gender": ['']
  })

  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder ) {
    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      if (page){
        this.currentPage = parseInt(page);
      }
    });
  }

  ngOnInit() {
    this.filter();
  }

  public goToPage(page: number) {
    this.router.navigate(['/characters'], {
      queryParams: { page }
    });
    this.currentPage = page;
    this.filter();
  }

  public buildPaginator(totalPages: number) {
    this.totalPages = [];
      for(let i = 1; i < totalPages; i++){
        this.totalPages.push(i);
      } 
  }

  public filter() {
    const isOddPage = this.currentPage % 2;
    const serverPage = Math.floor(this.currentPage/2) + isOddPage;
    this.characterService.getCharacters(serverPage, this.form.getRawValue()).subscribe({
      next: (response: Response)=>{
        if(isOddPage){
          this.characters = response.results.slice(0,10);
        }else{
          this.characters = response.results.slice(10,20);
        }
        this.buildPaginator(response.info.pages * 2);
      },
      error: () =>{}
    })
  }
}
