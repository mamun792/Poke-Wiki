import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {
   constructor(private pokeApiService: PokeApiService) {

   }

    ngOnInit(): void {
      this.pokeApiService.getPokemonDetails(1).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

}
