import { Component, Input } from '@angular/core';
import { Character } from '../interfaces/ICharactetrs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {
  @Input () character: Character = {
    'id': 0,
    'name': '',
    'status': '',
    'species': '',
    'type': '',
    'origin': {
      'url': '',
      'name': ''
    },
    'gender': '',
    'location': {
      'url': '',
      'name': ''
    },
    'image': '',
    'url': '',
    'created': '',
    'episode': []
  };
}
