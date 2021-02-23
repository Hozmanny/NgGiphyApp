import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'MSG00ZS32TreN9dYlobJmS1EEyt7kwoD';
  private _history: string[] = [];

  // cambiar any por su tipo
  public resultados: Gif[] = [];
  get history(): string[] {
    return [...this._history];
  }
  constructor(
    private http: HttpClient
  ) {
    // if (localStorage.getItem('history') ) {
    //   this._history = JSON.parse( localStorage.getItem('history')! );
    // };

    this._history = JSON.parse( localStorage.getItem('history')! ) || [];
  }
  buscarGifs(query: string = ''): any {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem( 'history', JSON.stringify(this._history) );
    }
    console.log(this._history);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MSG00ZS32TreN9dYlobJmS1EEyt7kwoD&q=${query}&limit=10`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
