import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Lista } from '../entities/Lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  url = env.url+"lista"

  constructor(private http: HttpClient) { }

  findAll() : Observable<Lista[]>{
    return this.http.get<Lista[]>(this.url);
  }
  findById(id: any): Observable<Lista>{
    const url = `${this.url}/${id}`
    return this.http.get<Lista>(url);
  }
  findAllByProjeto(idProjeto: number) : Observable<Lista[]>{
    const url = `${this.url}/projeto/${idProjeto}`
    return this.http.get<Lista[]>(url);
  }
  cadastrar(idProjeto: number, lista: Lista): Observable<Lista>{
    const url = `${this.url}/projeto/${idProjeto}`
    return this.http.post<Lista>(url, lista)
  }
  atualizar(lista: Lista): Observable<void>{
    const url = `${this.url}/${lista.id}`
    return this.http.put<void>(url, lista)
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
}
