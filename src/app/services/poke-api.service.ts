import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {

   }

   getPokemonDetails(page: number): Observable<any>{
      const url = `${this.baseUrl}?limit=20&offset=${page * 20}`;
      return this.fetchPokemonList(url).pipe(
        switchMap((result)=>forkJoin(
          result.results.map((pokemon: any) => this.fetchIndividualPokemonDetailsByUrl(pokemon.url))
        ))
      )
   }

   fetchPokemonList(url: string): Observable<any>{
      return this.http.get(url);
   }

   fetchIndividualPokemonDetailsByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/${name}`;
    return this.fetchIndividualPokemonDetailsByUrl(url);
  }

  fetchIndividualPokemonDetailsByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}
