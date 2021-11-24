import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { FavService } from '../fav.service';
import { Favorite } from '../Favorite';


@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})



/** Favorites component*/
export class FavoritesComponent {
  DisplayFavs: Event[] = [];
  /** Favorites ctor */
  constructor(private favService: FavService) {



  }

  countFavs: number = 0;

  ngOnInit(): void {
    this.favService.getFavorites().subscribe((response: any) => {
      this.DisplayFavs = response;
      this.countFavs = this.DisplayFavs.length;
      console.log(response);
    });
  }

  UpdateFavs(): void {
    this.favService.getFavorites().subscribe((response: any) => {
      this.DisplayFavs = response;
      console.log(response);
    });
  }

  deleteFavorite(favId: number): void {

    this.favService.deleteFav(favId);
    this.UpdateFavs();
    console.log(this.DisplayFavs);
  }
}
