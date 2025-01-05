import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarefa } from '../../entities/Tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../entities/Comentario';
import { Prioridade } from '../../entities/Prioridade';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent implements OnInit {
  @Input() idProjeto = 0;
  @Input() tarefa: Tarefa | null = null
  @Output() close = new EventEmitter<void>();
  @Output() closeAndEmitId = new EventEmitter<number>();
  @Output("tarefaEditada") edit = new EventEmitter<Tarefa>()

  editando: boolean = false

  comentarios: Comentario[] = []
  comentario: Comentario= {
    conteudo: '',
    comentadoEm: '',
  }
  iduser = localStorage.getItem('iduser')
  editting: boolean = false;
  constructor(private tarefaService: TarefaService, private comentService: ComentarioService){

  }
  ngOnInit(): void {
    this.buscarComentarios()
  }
  buscarComentarios():void{
    this.comentService.findAllByTarefa(this.tarefa?.id as number)
    .subscribe((res)=> this.reodenarComentarios(res))
  }
  habilitarEdit(){
    this.editando = true
  }
  fecharEdit(tarefaAntiga: Tarefa | void){
    if(tarefaAntiga){
      this.tarefa = tarefaAntiga as Tarefa
      this.edit.emit(tarefaAntiga as Tarefa)
    }
    this.editando = false
  }
  reodenarComentarios(comentarios: Comentario[]){
    this.comentarios = []
    comentarios.forEach((comentario) => {
      this.comentarios.unshift(comentario as Comentario)
    })

  }
  inserirComentario(){
    this.comentService.cadastrar(this.tarefa?.id as number, Number(this.iduser), {...this.comentario, comentadoEm: new Date().toISOString().split('.')[0]} )
    .subscribe((res) => this.comentarios.unshift(res), (err) => {}, ()=> this.comentario.conteudo = "")

  }
  exibirData(data: any){
    let date = new Date(data)
    let res = date.toLocaleDateString() + " " + date.toLocaleTimeString()
    return res
  }
  excluir(){
    this.tarefaService.apagar(this.tarefa?.id)
    .subscribe((res) => this.closeAndEmitId.emit(this.tarefa?.id),
  (err) => alert("Falha ao apagar tarefa."))
  }
  trataData(data: any): string{
    let date = new Date(data as string)
    let dia = date.getUTCDate()
    let mes = date.getMonth()
    let ano = date.getFullYear()
    return `${dia}/${mes+1}/${ano}`
 
  }

  getTarefaEditada(tarefa: Tarefa){
    this.tarefa = tarefa
    this.edit.emit(tarefa)
  }
  
}
