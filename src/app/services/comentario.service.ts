import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'
import { Comentario } from '../entities/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  url = env.url+"comentario"
  constructor(private http: HttpClient) { }
  findAll() : Observable<Comentario[]>{
    return this.http.get<Comentario[]>(this.url);
  }
  findById(id: any): Observable<Comentario>{
    const url = `${this.url}/${id}`
    return this.http.get<Comentario>(url);
  }
  findAllByTarefa(idTarefa: number) : Observable<Comentario[]>{
    const url = `${this.url}/tarefa/${idTarefa}`
    return this.http.get<Comentario[]>(url);
  }
  cadastrar(idTarefa: number, idCriador: number, comentario: Comentario): Observable<Comentario>{
    const url = `${this.url}/tarefa/${idTarefa}/criador/${idCriador}`
    return this.http.post<Comentario>(url, comentario)
  }
  atualizar(comentario: Comentario): Observable<void>{
    const url = `${this.url}/${comentario.id}`
    return this.http.put<void>(url, comentario)
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
}
