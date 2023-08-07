import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroPageComponent } from './hero-page/hero-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ListPageComponent, getSpanishPaginatorIntl } from './list-page/list-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeroesService } from './services/heroes.service';
import { HeroCardComponent } from './hero-card/hero-card.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { GenderPipe } from './pipes/gender.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HeroInterceptor } from './interceptors/hero-interceptor.interceptor';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    NewPageComponent,
    HeroCardComponent,
    GenderPipe,
    ConfirmDialogComponent,
    UpperCaseDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LayoutPageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeroInterceptor, multi: true },
    HeroesService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ]
 
})
export class HeroesModule { }
