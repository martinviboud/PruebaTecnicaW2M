import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ListPageComponent, getSpanishPaginatorIntl } from './list-page.component';
import { HeroesService } from '../services/heroes.service';
import { Gender, Hero } from '../interfaces/hero.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { of } from 'rxjs';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;
  let paginatorIntl: MatPaginatorIntl;
  const mockHeroes: Hero[] = [ {
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
  },
  {
    "id": 2,
    "name": "Abe Sapien",
    "powerstats": {
      "intelligence": 88,
      "strength": 28,
      "speed": 35,
      "durability": 65,
      "power": 100,
      "combat": 85
    },
    "appearance": {
      "gender": Gender.Male
    },
    "biography": {
      "fullName": "Abraham Sapien",
      "alterEgos": "No alter egos found.",
      "placeOfBirth": "-",
      "publisher": "Dark Horse Comics",
    },
    "images": { 
      "md": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg"   
    }
  }];

  beforeEach(() => {
    paginatorIntl = getSpanishPaginatorIntl();
    heroesServiceMock = jasmine.createSpyObj<HeroesService>('HeroesService', ['getHeroes']);
    TestBed.configureTestingModule({
      declarations: [ListPageComponent, HeroCardComponent],
      providers: [{ provide: HeroesService, useValue: heroesServiceMock },
                  { provide: MatPaginatorIntl, useValue: paginatorIntl }],
      imports: [MaterialModule, RouterTestingModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    heroesServiceMock.getHeroes.and.returnValue(of(mockHeroes));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener los héroes correctamente al inicializarse', () => { 
    heroesServiceMock.getHeroes.and.returnValue(of(mockHeroes));
    component.ngOnInit();

    expect(heroesServiceMock.getHeroes).toHaveBeenCalledWith(1, 4);
    expect(component.heroes).toEqual(mockHeroes);
  });

  it('debería obtener los héroes correctamente al cambiar de página', () => {
    
    heroesServiceMock.getHeroes.and.returnValue(of(mockHeroes));

   
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 4,
      length: 8,
    };
    component.onPageChange(pageEvent);

    expect(heroesServiceMock.getHeroes).toHaveBeenCalledWith(2, 4);
    expect(component.heroes).toEqual(mockHeroes);
  });

  it('debería obtener el total de héroes correctamente al inicializarse',() => {
    
    heroesServiceMock.getHeroes.and.returnValue(of(mockHeroes));
    
    component.getTotalHeroes(); 

    
    expect(component.totalHeroes).toBe(mockHeroes.length);
  });
});
