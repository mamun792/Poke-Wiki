import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {
  currentPage: number = 0;
   constructor(
    private pokeApiService: PokeApiService,
    private route: ActivatedRoute
  ) {
    
   }

    ngOnInit(): void {
      this.route.queryParamMap.subscribe({
        next: (queryParmMap) => {
          this.setCurrentPage(queryParmMap);
         
        }
      });

      this.pokeApiService.getPokemonDetails(this.currentPage).subscribe({
        next: (result) => {
         // this.setCurrentPage(result);
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

  
    setCurrentPage(queryParmMap: any){
      this.currentPage = queryParmMap.has('page') ? queryParmMap.get('page') : 0;
    }
}
