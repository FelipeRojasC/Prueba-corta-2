import { Component, EventEmitter, inject, Input, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharacterService } from '../../Services/character.service';
import { Result } from '../../Interfaces/ResponseAPI_GetAll';
import { CommonModule } from '@angular/common';
import { appConfig } from '../../../app.config';
import { AppComponent } from '../../../app.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-character-list',
  imports: [HttpClientModule, CommonModule],
  providers: [CharacterService],
  standalone: true,
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
})
export class CharacterListComponent {
  private characterService: CharacterService = inject(CharacterService);
  public characters: Result[] = [];
  @Input() currentPage: number = 1;

  private page: number;

  constructor() {
    this.page = this.currentPage;
  }
  ngOnInit(): void {
    this.getCharacters();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      this.page = this.currentPage;
      this.getCharacters();
    }
  }
  getCharacters() {

    this.characterService
      .getCharacters(this.page)
      .then((characters) => {
        this.characters = characters;
      })
      .catch((error) => {
        console.error('Error al obtener personajes:', error);
      });
  }
}
