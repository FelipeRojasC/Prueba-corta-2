import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, max, Observable } from 'rxjs';
import { ResponseAPIGetAll, Result } from '../Interfaces/ResponseAPI_GetAll';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private characters: Result[] = [];
  public errors: string[] = [];
  private http = inject(HttpClient);

  constructor() {

  }
  async getCharacters(currentPage: number,name: string) {
    try {
      if(name ==""){
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?page=${currentPage}`)
      );
      return response.results;
    }else{
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?page=${currentPage}&name=${name}`)
      );
      return response.results;
    }
    } catch (error) {
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
  async getmaxPage(name: string) {
    if(name ==""){
    const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?page=1`)
      );
      const maxPage = response.info.pages;
      return maxPage;
    }else{
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(`${this.apiUrl}/?page=1&name=${name}`)
      );
      const maxPage = response.info.pages;
      return maxPage;
    }
  }
}
