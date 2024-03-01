import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if(!hero.id && !hero.alt_hero){
      return 'assets/img/no-img.png';
    }

    if(hero.alt_hero) return hero.alt_hero;

    return `assets/img/heroes/${ hero.id }.jpg`;
  }

}
