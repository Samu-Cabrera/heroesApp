import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroePageComponent } from './pages/heroe-page/heroe-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';


@NgModule({
  declarations: [
    HeroePageComponent,
    NewPageComponent,
    SearchPageComponent,
    LayoutComponent,
    ListPageComponent,
    CardComponent,
    HeroImagePipe,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
