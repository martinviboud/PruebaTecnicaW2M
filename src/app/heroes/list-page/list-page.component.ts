import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../interfaces/hero.interface';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator'
import { tap } from 'rxjs';



@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  heroes: Hero[] = [];
  totalHeroes: number = 0;
  constructor(private heroesService: HeroesService){

  }
  ngOnInit(): void {
    this.getTotalHeroes()
    this.heroesService.getHeroes(1, 4).subscribe(heroes=>{
      this.heroes = heroes;
    })
    
  }

  get isLoading(){
    return this.heroesService.isLoading;
  }
  onPageChange(e: PageEvent ): void{
      this.heroesService.getHeroes(e.pageIndex + 1, e.pageSize).subscribe(heroes=>{
        this.heroes = heroes;
      })
  }

  getTotalHeroes(){
    this.heroesService.getHeroes().pipe(
      tap((heroes: Hero[])=>{
      this.totalHeroes = heroes.length;
      })
    ).subscribe();
  }
  
}
export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'SuperHeroes por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  

  return paginatorIntl;
}
