import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../interfaces/ICharactetrs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  public characters: Character[] = [];
  public currentPage = 0;
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
    this.getTotalPages();
  }

  ngOnInit() {
    let ids = this.buildIds();
    this.characterService.getCharactersById(ids).subscribe({
      next: (response: any) => {
        this.characters = response;
        console.log(this.characters);
      },
      error: (error) => {
        console.log(error);
      }
  })
  }

  private buildIds(): number[] {
    let characters = this.currentPage * 10;
    let ids = [];
    for(let i = 1; i <= 10; i++){
      ids.push(i + characters);
    }
    return ids;
  }

  public goToPage(page: number) {
    this.router.navigate(['/characters'], {
      queryParams: { page }
    });
    this.currentPage = page -1;
    this.ngOnInit();
  }

  public getTotalPages() {
    this.characterService.getCharacters().subscribe((response: any) =>{
      let totalPages = response.info.pages * 2;
      console.log(totalPages);
      for(let i = 1; i < totalPages; i++){
        this.totalPages.push(i);
      }
    });
  }

  public filter() {
    this.characterService.filter(this.form.getRawValue()).subscribe((response: any) =>{
      this.characters = response.results;
    })
  }
}
