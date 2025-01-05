import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MembroProjeto } from '../../entities/MembroProjeto';
import { MembroProjetoService } from '../../services/membro-projeto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entities/Usuario';

@Component({
  selector: 'app-inviter',
  templateUrl: './inviter.component.html',
  styleUrl: './inviter.component.scss'
})
export class InviterComponent implements OnInit{
  @Output("fechar") fechar = new EventEmitter<void>()
  @Input() idProjeto = 0;
  email = ''
  usuarios: Usuario[] = []
  membros: MembroProjeto[] = []
  constructor(private service: MembroProjetoService, private serviceUsuario: UsuarioService){

  }
  ngOnInit(): void {
    if(this.idProjeto != 0){
      this.service.findAllByProjeto(this.idProjeto)
      .subscribe((res)=> this.membros = res)
    }
  }

  buscarUsuario(): void{
    this.serviceUsuario.findAllByEmail(this.email)
    .subscribe((res)=> this.usuarios = res, (err) => alert("Falha ao procurar colaborador"))
  }

  selecionar(usuario: Usuario){
    // admin = 2, membro = 1, visitante = 0
    let membroProjeto: MembroProjeto = {
      nivelAutoridade: 1
    }
    if(this.membros.find(m => m.idMembro == usuario.id) !== undefined){
      alert("Usuário já é um colaborador do projeto")
      return
    }
    this.service.cadastrar(usuario.id!, this.idProjeto, membroProjeto)
    .subscribe((res)=> {
      this.membros.push(res)
      this.fechar.emit()
      alert("Colaborador Adicionado")
    },
    (err)=> alert("Erro ao adicionar colaborador"))
  }
}
