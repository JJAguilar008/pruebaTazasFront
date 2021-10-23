import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Taza } from './taza';
import { TazaService } from './taza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  taza: Taza = new Taza();
  titulo = 'Agregar taza';

  
  constructor(private tazaService: TazaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTaza();
  }

  cargarTaza(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.tazaService.getTaza(id).subscribe( (taza) => this.taza = taza)
      }
    })
  }

  public create(): void {
    this.tazaService.create(this.taza).subscribe(
      taza => {
        this.router.navigate(['/tazas'])
        Swal.fire({
          icon: 'success',
          title: `Taza "${taza.modelo}" agregada correctamente`,
          showConfirmButton: true
        })
      }
    )
  }

  update():void{
    this.tazaService.update(this.taza).subscribe( taza => {
      this.router.navigate(['/tazas'])
      Swal.fire('Taza actualizada', `Taza ${taza.modelo} actualizada con éxito!`, 'success')
    })
  }
}
