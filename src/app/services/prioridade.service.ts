import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';

import { Prioridade } from '../entities/Prioridade';

@Injectable({
  providedIn: 'root'
})
export class PrioridadeService {
  url = env.url+"prioridade"
  constructor(private http: HttpClient) { }
  findAll() : Observable<Prioridade[]>{
    return this.http.get<Prioridade[]>(this.url);
  }
  findById(id: any): Observable<Prioridade>{
    const url = `${this.url}/${id}`
    return this.http.get<Prioridade>(url);
  }
  findAllByProjeto(idProjeto: number) : Observable<Prioridade[]>{
    const url = `${this.url}/projeto/${idProjeto}`
    return this.http.get<Prioridade[]>(url);
  }
  cadastrar(idProjeto: number, prioridade: Prioridade): Observable<Prioridade>{
    const url = `${this.url}/projeto/${idProjeto}`
    return this.http.post<Prioridade>(url, prioridade)
  }
  atualizar(prioridade: Prioridade): Observable<void>{
    const url = `${this.url}/${prioridade.id}`
    return this.http.put<void>(url, prioridade)
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
}
