import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ResponseAPIGetAll, Result } from '../Interfaces/ResponseAPI_GetAll';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private characters: Result[] = [];
  public errors: string[] = [];
  public currentPage: number = 1;
  private http = inject(HttpClient);

  async getCharacters(currentPage: number) {
    try {
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?page=${this.currentPage}`)
      );
      return response.results;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async searchCharacters(name: string) {
    try {
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?name=${name}`)
      );
      return response.results;
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
