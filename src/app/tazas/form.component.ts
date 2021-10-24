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
  
  titulo = 'Agregar taza';
  taza: Taza = new Taza();
  taza1: Taza = new Taza();
  tazas: Taza[] = [];
  tazasBajas: Taza[] = []; 
  tazasExtraer: number = 0;
  tazasIngresar: number = 0;
  tazasRegalo: number = 0;
  repeticion: number = 0;
  
  constructor(private tazaService: TazaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTaza();
    this.tazaService.getTazas().subscribe( data => {
      this.tazas = data
      for(let i = 0; i < this.tazas.length; i++){
        if( this.tazas[i].calidad === 'Baja')
        this.tazasBajas.push(this.tazas[i]);
      }   
    }); 
  }

  cargarTaza(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.tazaService.getTaza(id).subscribe( (taza) => this.taza = taza)
      }
    })
  }

  create(): void {
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

  update():void {
    this.tazaService.update(this.taza).subscribe( taza => {
      this.router.navigate(['/tazas'])
      Swal.fire('Taza actualizada', `Taza ${taza.modelo} actualizada con éxito!`, 'success')
    })
    this.tazaService.update(this.taza1).subscribe( taza1 => {
      Swal.fire('Taza actualizada', `Taza ${taza1.modelo} actualizada con éxito!`, 'success')
    })
  }

  seleccionarTazaR(taza1: Taza){
    this.taza1 = taza1;
    console.log(this.taza1);
  }

  egresoTaza() {
    this.tazasRegalo=0;
    this.repeticion=0;

    if (this.taza.calidad == "Alta") {
      
      this.repeticion = this.tazasExtraer / 10;
      this.tazasRegalo = Math.trunc(this.repeticion) * 3;

      if(this.taza.cantidad >= this.tazasExtraer){
        this.taza.cantidad = this.taza.cantidad - this.tazasExtraer;
        this.taza1.cantidad = this.taza1.cantidad - this.tazasRegalo;
        this.update()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay stok en el almacen para la solicitud'
        })
      }

    } else {

      this.repeticion = this.tazasExtraer / 10;
      this.tazasRegalo = Math.trunc(this.repeticion) * 2;
      
      if (this.taza.cantidad > (this.tazasExtraer + this.tazasRegalo)) {
        
        this.taza.cantidad = this.taza.cantidad - (this.tazasExtraer + this.tazasRegalo);
        this.update()
      
      } else if (this.taza.cantidad == this.tazasExtraer) {
        
        Swal.fire({
          title: 'Tazas',
          text: `No hay stock suficiente para las tazas de regalo desea continuar?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'success',
          cancelButtonColor: 'secondary',
          confirmButtonText: 'Si, continuar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.taza.cantidad = this.taza.cantidad - this.tazasExtraer;
            this.update()
            Swal.fire(
              'Operacion exitosa',
              'Se ha realizado la transaccion',
              'success'
            )
          }
        })
      }
      if(this.taza.cantidad < this.tazasExtraer){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay stok en el almacen para la solicitud'
        })
      }
    }
  }

  ingresoTaza(): void{
    this.taza.cantidad = this.taza.cantidad + this.tazasIngresar;
    this.update()
  }
}
