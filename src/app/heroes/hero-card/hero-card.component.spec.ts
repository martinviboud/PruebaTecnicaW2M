import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardComponent } from './hero-card.component';
import { HeroesService } from '../services/heroes.service';
import { of } from 'rxjs';
import { Gender, Hero } from '../interfaces/hero.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';


describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let heroesService: HeroesService
  const mockHero: Hero = {
    "id": 1,
    "name": "A-Bomb",
    "powerstats": {
      "intelligence": 38,
      "strength": 100,
      "speed": 17,
      "durability": 80,
      "power": 24,
      "combat": 64
    },
    "appearance": {
      "gender": Gender.Male
    },
    "biography": {
      "fullName": "Richard Milhouse Jones",
      "alterEgos": "No alter egos found.",
      "placeOfBirth": "Scarsdale, Arizona",
      "publisher": "Marvel Comics"
    },
    "images": { 
      "md": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg"     
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCardComponent],
      providers: [
        { provide: HeroesService, useValue: { deleteHero: () => of(null) } }
        
      ],
      imports: [MaterialModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    component.hero = mockHero;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia llamar a deleteHero() del servicio cuando se llama la función deleteHero() del componente', () => {
    
    spyOn(heroesService, 'deleteHero');

    component.deleteHero();

    expect(heroesService.deleteHero).toHaveBeenCalledWith(component.hero);
  });
});
