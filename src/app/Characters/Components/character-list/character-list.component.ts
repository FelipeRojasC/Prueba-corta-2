import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharacterService } from '../../Services/character.service';
import { Result } from '../../Interfaces/ResponseAPI_GetAll';
import { CommonModule } from '@angular/common';
import { appConfig } from '../../../app.config';
import { AppComponent } from '../../../app.component';

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

  @Output() onPageChange = new EventEmitter<number>();
  @Input() currentPage: number = 1;

  ngOnInit(): void {
    this.getCharacters();
    console.log(this.currentPage);
  }


  getCharacters() {
    this.characterService
      .getCharacters(this.currentPage)
      .then((characters) => {
        this.characters = characters;
      })
      .catch((error) => {
        console.error('Error al obtener personajes:', error);
      });
  }

  nextPage() {
    this.currentPage = AppComponent.currentPage;
    this.getCharacters();
    this.onPageChange.emit(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacters();
      this.onPageChange.emit(this.currentPage);
    }
  }
}
