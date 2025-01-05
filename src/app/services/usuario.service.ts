import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'
import { Projeto } from '../entities/Projeto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = env.url+"usuario"

  constructor(private http: HttpClient) { }

  findAll() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
  findById(id: any): Observable<Usuario>{
    const url = `${this.url}/${id}`
    return this.http.get<Usuario>(url);
  }
  findAllByEmail(email: string): Observable<Usuario[]>{
    const url = `${this.url}/email/${email}`
    return this.http.get<Usuario[]>(url);
  }
  login(usuario: Usuario): Observable<Usuario>{
    const url = `${this.url}/login`
    return this.http.post<Usuario>(url, usuario)
  }
  cadastrar(usuario: Usuario): Observable<Usuario>{
    const url = this.url
    return this.http.post<Usuario>(url, usuario)
  }
  atualizar(usuario: Usuario): Observable<void>{
    const url = `${this.url}/${usuario.id}`
    return this.http.put<void>(url, usuario)
  }
  apagar(id: any): Observable<void>{
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url);
  }
  /*atualizarSenha(usuario:Usuario): Observable<Usuario>{
    const url=`${this.url}/${usuario.id}/senha`
    return this.http.put<Usuario>(url,usuario.senha)
  }*/
}
