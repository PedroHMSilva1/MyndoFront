import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Projeto } from '../entities/Projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  url = env.url+"projeto"
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<Projeto[]>{
    const url = this.url
    return this.http.get<Projeto[]>(url)
  }
  findById(id: number): Observable<Projeto>{
    const url = `${this.url}/${id}`
    return this.http.get<Projeto>(url)
  }
  findAllByCriador(idCriador: number): Observable<Projeto[]>{
    const url = `${this.url}/criador/${idCriador}`
    return this.http.get<Projeto[]>(url)
  }
  findAllByMembro(idMembro: number): Observable<Projeto[]>{
    const url = `${this.url}/membro/${idMembro}`
    return this.http.get<Projeto[]>(url)
  }
  cadastrar(idCriador: number, projeto: Projeto): Observable<Projeto>{
    const url = `${this.url}/criador/${idCriador}`
    return this.http.post<Projeto>(url, projeto)
  }
  alterar(id: number, projeto: Projeto): Observable<Projeto>{
    const url = `${this.url}/${id}`
    return this.http.put<Projeto>(url, projeto)
  }
  deletar(id: number): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url)
  }
}
