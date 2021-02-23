import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'MSG00ZS32TreN9dYlobJmS1EEyt7kwoD';
  private _history: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  // cambiar any por su tipo
  public resultados: Gif[] = [];
  // public lastResultados: string = '';
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
    this.resultados = JSON.parse( localStorage.getItem('lastOne')!) || [];
    // this.buscarGifs(this.resultados);
  }
  buscarGifs(query: string = ''): any {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem( 'history', JSON.stringify(this._history) );
    }
    console.log(this._history);
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
    console.log(params);
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('lastOne', JSON.stringify(this.resultados));
    });
  }
}
