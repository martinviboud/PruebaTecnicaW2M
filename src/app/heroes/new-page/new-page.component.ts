
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appearance, Gender, Hero, Powerstats, Biography, Images } from '../interfaces/hero.interface';
import { HeroesService } from '../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  
  constructor(private heroesService: HeroesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbar: MatSnackBar){
  }
  
  get isLoading(){
    return this.heroesService.isLoading;
  }
  
  heroForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('',[Validators.required, Validators.minLength(2)]),
    gender: new FormControl(''),
    publisher: new FormControl(''),
    fullName: new FormControl(''),
    placeOfBirth: new FormControl(''),
    intelligence: new FormControl( 0 ),
    strength: new FormControl( 0 ),
    speed: new FormControl( 0 ),
    durability: new FormControl( 0 ),
    power: new FormControl( 0 ),
    img: new FormControl('/assets/no-image.png'),
    combat: new FormControl( 0 )
  })
  
  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
    ).subscribe( hero =>{
      if(!hero) return this.router.navigateByUrl('/');
      
      this.heroForm.setValue({
        id: hero.id, 
        name: hero.name,
        gender: hero.appearance.gender,
        publisher: hero.biography.publisher,
        fullName: hero.biography.fullName,
        placeOfBirth: hero.biography.placeOfBirth,
        intelligence: hero.powerstats.intelligence,
        strength: hero.powerstats.strength,
        speed: hero.powerstats.speed,
        durability: hero.powerstats.durability,
        power: hero.powerstats.power,
        combat: hero.powerstats.combat,
        img: hero.images.md
      });
      return
    })
  }

  formatLabel(value: number): string{
    return `${value}`;
  }
  get currentHero():Hero  {

    const {
      intelligence, strength, speed, durability, power, combat, gender, fullName, placeOfBirth, publisher,
      name, id, img
    } = this.heroForm.value;
  
    const powerstats: Powerstats = {
      intelligence: intelligence as number,
      strength: strength as number,
      speed: speed as number,
      durability: durability as number,
      power: power as number,
      combat: combat as number
    };
  
    const appearance: Appearance = { gender: gender as Gender };
    const biography: Biography = { fullName: fullName as string, placeOfBirth: placeOfBirth as string, publisher: publisher as string };
    const images: Images = { md: img as string };
    const hero: Hero = { id, name: name as string, powerstats, appearance, biography, images };
  
    return hero;
  }
  

  onSubmit(){
    if (this.heroForm.invalid) {
      this.showSnackBar('¡Por lo menos dale un nombre a tu heroe!');
      this.heroForm.markAllAsTouched();
      return
    };

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero ).pipe(
        finalize(()=> this.router.navigate(['layout/list']))
      )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.name } actualizado!`);
         
        });
      return;
    }


    this.heroesService.newHero( this.currentHero ).pipe(
      finalize(()=> this.router.navigate(['layout/list']))
    )
      .subscribe( hero => {
        this.showSnackBar(`${ hero.name } creado!`);
        
      });
  }
  
  deleteHero(){
    this.heroesService.deleteHero(this.currentHero);
  }

  showSnackBar(message: string):void{
      this.snackbar.open(message, 'done',{
        duration: 3000
      })
  }

  goBack(){
    this.router.navigateByUrl('/layout/list');
  }
}
