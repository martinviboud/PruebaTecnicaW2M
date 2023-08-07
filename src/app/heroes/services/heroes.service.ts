import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { Observable, catchError, filter, map, of, switchMap, finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class HeroesService {

  isLoading = false;
    
    constructor(private http: HttpClient,
                private dialog: MatDialog,
                private router: Router,
                private snackbar: MatSnackBar) { }

    getHeroes(page?: number, limit?: number): Observable<Hero[]>{

      if(limit && page){
        return this.http.get<Hero[]>(`http://localhost:3000/heroes?_page=${page}&_limit=${limit}`)
      }
      else{
        return this.http.get<Hero[]>('http://localhost:3000/heroes')
      }
    }

    getHeroById( id: string ): Observable<Hero|undefined> {
        return this.http.get<Hero>(`http://localhost:3000/heroes/${ id }`)
          .pipe(
            catchError( error => of(undefined) )
          );
    }
    searchHero(query: string): Observable<Hero[]>{
        return this.http.get<Hero[]>(`http://localhost:3000/heroes?q=${ query }&_limit=10`);
    }

    newHero(hero: Hero):Observable<Hero>{
        return this.http.post<Hero>('http://localhost:3000/heroes', hero);
    }

    updateHero(hero: Hero):Observable<Hero>{
      if( !hero.id ) throw Error('ID is required')
      return this.http.patch<Hero>(`http://localhost:3000/heroes/${hero.id}`, hero);
    }

    deleteHero(hero: Hero):void{

      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: hero
      });

      dialogRef.afterClosed().pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.confirmDelete( hero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.showSnackBar('Superheroe eliminado con éxito');
        this.router.navigate(['/heroes']);
      });

    }
    
    confirmDelete(id: number){
      return this.http.delete(`http://localhost:3000/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) )  
      );
      
    }

    showSnackBar(message: string):void{
      this.snackbar.open(message, 'done',{
        duration: 3000
      })
    }
}