import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroe-page',
  templateUrl: './heroe-page.component.html',
  styles: ``
})
export class HeroePageComponent implements OnInit {

  //opcional pq al iniciar no tenemos aun el hero
  public hero?: Hero;

  constructor(private heroServices: HeroService, 
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  //hacer la inyeccion al servicio cuando carga el componente
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroServices.getHeroById(id) )
    ).subscribe(hero => {
      if(!hero) return this.router.navigate(['/heroes/list']);

      this.hero = hero;

      return;
    });
  }

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
