import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'
import { MembroProjeto } from '../entities/MembroProjeto';

@Injectable({
  providedIn: 'root'
})
export class MembroProjetoService {
  url = env.url+"membro"
  constructor(private http: HttpClient) { }

  findAll() : Observable<MembroProjeto[]>{
    return this.http.get<MembroProjeto[]>(this.url);
  }
  findAllByProjeto(idProjeto: number) : Observable<MembroProjeto[]>{
    return this.http.get<MembroProjeto[]>(this.url+"/projeto/"+idProjeto);
  }
  findById(id: any): Observable<MembroProjeto>{
    const url = `${this.url}/${id}`
    return this.http.get<MembroProjeto>(url);
  }
  cadastrar(idUsuario: number, idProjeto: number, membroProjeto: MembroProjeto): Observable<MembroProjeto>{
    const url = `${this.url}/membro/${idUsuario}/projeto/${idProjeto}`
    return this.http.post<MembroProjeto>(url, membroProjeto)
  }
  atualizar(membroProjeto: MembroProjeto): Observable<void>{
    const url = `${this.url}/${membroProjeto.id}`
    return this.http.put<void>(url, membroProjeto)
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
}
