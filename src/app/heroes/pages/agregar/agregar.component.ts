import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: ''
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor(private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this._router.url.includes('editar')) {
      this._activatedRoute.params
        .pipe(
          switchMap(({ id }) => this._heroesService.getHeroePorId(id))
        ).subscribe(heroe => this.heroe = heroe);
    }
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this._heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.heroe = heroe);
      this.mostrarSnackBar('Heroe actualizado');
    } else {
      this._heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this._router.navigate([`/heroes/editar/${heroe.id}`])
        })
      this.mostrarSnackBar('Registro creado');
    }

  }

  borrarHeroe(): void {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      res => {
        if (res) {
          this._heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this._router.navigate(['/heroes'])
            })
          this.mostrarSnackBar('Heroe borrado')
        }
      }
    )


  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
