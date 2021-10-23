import { Injectable } from '@angular/core';
import { Taza } from './taza';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TazaService {

  private urlEndPoint: string = 'http://localhost:8080/api/tazas';
  private httpHeaders = new HttpHeaders({'Contyent-type': 'aplication/json'});
  constructor( private http: HttpClient) { }

  getTazas(): Observable<Taza[]> {
    return this.http.get<Taza[]>(this.urlEndPoint);
  }

  create(taza: Taza): Observable<Taza> {
    return this.http.post<Taza>(this.urlEndPoint, taza, {headers: this.httpHeaders});
  }

  getTaza(id : any):Observable<Taza>{
    return this.http.get<Taza>(`${this.urlEndPoint}/${id}`);
  }

  update(taza: Taza): Observable<Taza>{
    return this.http.put<Taza>(`${this.urlEndPoint}/${taza.idTaza}`, taza, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Taza>{
    return this.http.delete<Taza>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
