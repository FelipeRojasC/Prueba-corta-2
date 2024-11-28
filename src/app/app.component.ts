import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { CharacterListComponent } from './Characters/Components/character-list/character-list.component';
import { CharacterService } from './Characters/Services/character.service';


@Component({
  imports: [CharacterListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web-app';
  characters: any[] = []; // Almacena los personajes
  currentPage: number = 1; // Página actual
  searchQuery: string = ''; // Valor del campo de búsqueda
  static currentPage: number;

  constructor() {}

  ngOnInit(): void {
    initFlowbite();
  }
  onPageChange(page: number): void {
    if(page>1) this.currentPage = page;
    else this.currentPage = 1;
    console.log('Página actual:', this.currentPage);
  }
}
