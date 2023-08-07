import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent{
  heroes: Hero[] = [];
  searchControl = new FormControl('');
 
  
  constructor(private heroesService: HeroesService){}
  
  
  get isLoading(){
    return this.heroesService.isLoading
  }

  preventDefault(event: KeyboardEvent){
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  }
  
  searchHero(){
   
    const query = this.searchControl.value || '';
    if(query){
      this.heroesService.searchHero(query).subscribe(data =>{
          this.heroes = data;
      })
    }else{
      this.heroes = [];
    }
  }


}
