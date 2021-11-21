import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap, delay } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private heroesService: HeroesService, private router: Router) { }

  idHeroe: string = '';
  heroe!: Heroe;


  ngOnInit(): void {
    this.routes.params
      .pipe(
        delay(0)
      )
      .pipe(
        switchMap(param => this.heroesService.getHeroePorId(param.id))
      )
      .subscribe(resp => this.heroe = resp);
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }

}
