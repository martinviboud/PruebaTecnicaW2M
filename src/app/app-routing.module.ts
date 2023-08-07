import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './heroes/layout-page/layout-page.component';
import { HeroPageComponent } from './heroes/hero-page/hero-page.component';
import { ListPageComponent } from './heroes/list-page/list-page.component';
import { NewPageComponent } from './heroes/new-page/new-page.component';
import { SearchPageComponent } from './heroes/search-page/search-page.component';

const routes: Routes = [
  { path: 'layout', component: LayoutPageComponent, children: [
    { path: 'new-hero', component: NewPageComponent},
    { path: 'search',   component: SearchPageComponent},
    { path: 'edit/:id', component: NewPageComponent},
    { path: 'list',     component: ListPageComponent},
    { path: ':id',      component: HeroPageComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'list' }
]},
  {path: '**',pathMatch: 'full' ,  redirectTo: 'layout'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
