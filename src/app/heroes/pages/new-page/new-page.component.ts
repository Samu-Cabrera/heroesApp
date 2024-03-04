import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { switchMap, tap, filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  //crear un nuevo formulario reactivo con las propiedades que va a manejar
  public heroForm =  new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}), //obligatorio
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_hero: new FormControl('')
  });


  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'DC Marvel', desc: 'DC - Marvel' }
  ];

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return 

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHeroById( id )))
    .subscribe(hero => {
      if(!hero) {
        return this.router.navigateByUrl('/');
      }

      //establecer los valores al form
      this.heroForm.reset(hero);
      return;
    })

  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void{
    if(this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          //snackbar
          this.showSnackbar(`Se actualizó ${ hero.superhero }`);
        });

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        //mostrar snackbar
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`Se creo ${ hero.superhero }`);
      });
  }

  onDeleteHero(): void {
    if(!this.currentHero.id) throw Error('El id es requerido');

    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      //filtramos si la data es true
      filter((res: boolean) => res),
      //disparamos el obs
      switchMap(() => this.heroService.deleteHero(this.currentHero.id)),
      // pasa si fue eliminado
      filter((eliminado: boolean) => eliminado),

    )
    .subscribe(() => this.router.navigateByUrl('/heroes/list'));
  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }
}
