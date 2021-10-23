import { Component, OnInit } from '@angular/core';
import { TazaService } from './taza.service';
import { Taza } from './taza';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tazas',
  templateUrl: './tazas.component.html',
  styleUrls: ['./tazas.component.css']
})
export class TazasComponent implements OnInit {

  tazas!: Taza[];

  constructor(private tazaService: TazaService) { }

  ngOnInit(): void {
    this.tazaService.getTazas().subscribe( data => {this.tazas = data});
  }

  delete(taza: Taza): void{
    Swal.fire({
      title: 'Seguro que desea eliminar?',
      text: `Se eliminara el registro con id: ${taza.idTaza}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tazaService.delete(taza.idTaza).subscribe(
          response => {
            this.tazas = this.tazas.filter(taz => taz !== taza)
            Swal.fire(
              'Registro eliminado!',
              'Se ha eliminado el registro:' + taza.idTaza,
              'success'
            )
        })
      }
    })
  }

}
