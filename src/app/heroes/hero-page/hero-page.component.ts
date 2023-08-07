import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../interfaces/hero.interface';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

    hero?: Hero ;
    constructor(private heroesService: HeroesService,
                private activatedRoute: ActivatedRoute,
                private router: Router){}
  
  ngOnInit(): void {
      this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero => {

        if ( !hero ) return this.router.navigate([ '/layout/list' ]);

        this.hero = hero;
        return;
      })
  }

  get isLoading(){
    return this.heroesService.isLoading;
  }
  goBack(){
    this.router.navigateByUrl('/layout/list')
  }
}
