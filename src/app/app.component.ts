import { Component, Inject, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { CharacterListComponent } from './Characters/Components/character-list/character-list.component';
import { CharacterService } from './Characters/Services/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [CharacterListComponent, CommonModule, FormsModule],
  providers: [CharacterListComponent, CharacterService],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web-app';
  characters: any[] = []; // Almacena los personajes
  currentPage: number = 1; // Página actual
  searchQuery: string = ''; // Valor del campo de búsqueda
  static currentPage: number;

  constructor(
    private characterList: CharacterListComponent,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    initFlowbite();
  }
  // Método para manejar la búsqueda

  prev(page: number) {
    if (page > 1) this.currentPage = page;
    else this.currentPage = 1;
    this.characterList.currentPage = this.currentPage;
    this.characterList.searchQuery = this.searchQuery;
    this.characterList.getCharacters();
  }
  next(page: number) {
    this.characterService
      .getmaxPage(this.searchQuery)
      .then((maxPage) => {
        if (page > maxPage) {
          this.currentPage = maxPage;
        } else {
          this.currentPage = page;
        }
        this.characterList.currentPage = this.currentPage;
        this.characterList.searchQuery = this.searchQuery;
        this.characterList.getCharacters();
      })
      .catch((error) => {
        console.error('Error al obtener el máximo de páginas:', error);
      });
  }
  onSearch() {
    this.currentPage=1;
    this.characterList.currentPage = this.currentPage;
    this.characterList.searchQuery = this.searchQuery;
    this.characterList.getCharacters();
  }
}
