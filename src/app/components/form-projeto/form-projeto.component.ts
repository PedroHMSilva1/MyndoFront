import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../entities/Projeto';

@Component({
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.component.html',
  styleUrl: './form-projeto.component.scss'
})
export class FormProjetoComponent {

  constructor(private service: ProjetoService){
    
  }
  @Input() proj: Projeto | null = null
  @Input() oldTitle: string = ''
  titulo = ''
  @Output("criarProjeto") criarProjeto = new EventEmitter<Projeto | null>()
  @Output("close") close = new EventEmitter<void>()
  criar(): void{
    this.service.cadastrar(localStorage.getItem('iduser') as unknown as number, {
      titulo: this.titulo.trim(), 
      dataCriacao: new Date().toISOString().split('.')[0], 
      dataAlteracao: new Date().toISOString().split('.')[0]
    })
    .subscribe(
      (res)=>{
        this.criarProjeto.emit(res)
      },
      (err)=>{
        this.criarProjeto.emit(null)
      },
      () => {

        this.titulo = ''
      }
    )
  }
  @Output("alterarProjeto") alterarProjeto = new EventEmitter<Projeto | null>()
  alterar(): void{
    this.service.alterar(this.proj?.id as number, {...this.proj, titulo: this.proj?.titulo.trim()} as Projeto)
      .subscribe(
        (res)=>{
          this.alterarProjeto.emit(res)
        },
        (err)=>{
          this.alterarProjeto.emit(null)
        },
        ()=>{

          this.proj = null
        }
      )
  }
}
