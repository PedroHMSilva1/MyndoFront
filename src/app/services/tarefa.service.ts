import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'
import { Tarefa } from '../entities/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  url = env.url+"tarefa"

  constructor(private http: HttpClient) { }
  findAll() : Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(this.url);
  }
  findById(id: any): Observable<Tarefa>{
    const url = `${this.url}/${id}`
    return this.http.get<Tarefa>(url);
  }
  findAllByLista(idLista: number) : Observable<Tarefa[]>{
    const url = `${this.url}/lista/${idLista}`
    return this.http.get<Tarefa[]>(url);
  }
  cadastrar(idLista: number, idCriador: number, tarefa: Tarefa): Observable<Tarefa>{
    const url = `${this.url}/lista/${idLista}/criador/${idCriador}`
    return this.http.post<Tarefa>(url, tarefa)
  }
  atualizar(tarefa: Tarefa): Observable<Tarefa>{
    const url = `${this.url}/${tarefa.id}`
    return this.http.put<Tarefa>(url, tarefa)
  }
  atualizarListaDaTarefa(idLista: number, idTarefa: number) : Observable<void>{
    const url = `${this.url}/${idTarefa}/lista/${idLista}`
    return this.http.put<void>(url, {})
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
}
