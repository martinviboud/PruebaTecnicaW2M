import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { HeroesService } from '../services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit{
  @Input() hero!: Hero;

  constructor(private heroesService: HeroesService,
              private router: Router){}
  
  ngOnInit(): void {
    if( !this.hero ){
      throw new Error('No Hero');}
  }

  navigateToHero(){
      this.router.navigateByUrl(`/layout/${this.hero.id}`);
  }
  deleteHero(){
    this.heroesService.deleteHero(this.hero);
  }
}
