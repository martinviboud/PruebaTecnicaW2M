import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Gender, Hero } from '../interfaces/hero.interface';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let heroesService: HeroesService;
  
  
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
      declarations: [SearchPageComponent],
      providers: [ { provide: HeroesService, useValue: { searchHero: () => of(null) } },
        ],
      imports: [MaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('debería inicializar el SearchControl con un valor vacío', () => {
    expect(component.searchControl.value).toEqual('');
  });
  it('debería prevenir la acción por defecto cuando se presiona Enter', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');

    component.preventDefault(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  
  it('debería llamar a "searchHero" del servicio con el valor adecuado cuando se busca un héroe', () => {
    spyOn(heroesService, 'searchHero').and.returnValue(of([mockHero]));
    const query = 'bomb';

    component.searchControl.setValue(query);
    component.searchHero();

    expect(heroesService.searchHero).toHaveBeenCalledWith(query);
    expect(component.heroes).toEqual([mockHero]);
  });
});
