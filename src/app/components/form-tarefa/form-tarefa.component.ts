import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prioridade } from '../../entities/Prioridade';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../entities/Tarefa';

@Component({
  selector: 'app-form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrl: './form-tarefa.component.scss'
})
export class FormTarefaComponent implements OnInit{
  tarefaSnapshot: Tarefa | null = null;
  @Input() idProjeto = 0;
  @Input() idLista: number = 0
  @Input() editando = false
  @Input() tarefa: Tarefa = {
    idLista: 0,
    objetivo: '',
    prazo: '',
    tagPrioridade: null,
    dataCriacao: ''
  }
  constructor(private tarefaService: TarefaService){

  }
  ngOnInit(): void {
    if(this.editando)
      this.tarefaSnapshot = {...this.tarefa}
  }

  get dataFormatada(){
    let data = new Date(this.tarefa.prazo as string)
    let dia = data.getUTCDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    return `${ano}-${mes+1}-${dia}`
  }

  prioritiesVisible: boolean = false

  setPrioridade(p: Prioridade){
    this.tarefa.tagPrioridade = p
  }
  @Output("criarTarefa") criarTarefa = new EventEmitter<Tarefa | null>()
  @Output("editarTarefa") editarTarefa = new EventEmitter<Tarefa>()
  @Output("close") close = new EventEmitter<Tarefa | void>()

  cadastrarTarefa(){
    let novaTarefa: Tarefa = {
      objetivo: this.tarefa.objetivo,
      prazo: this.tarefa.prazo? new Date(this.tarefa.prazo).toISOString().split('.')[0]: '',
      tagPrioridade: this.tarefa.tagPrioridade,
      dataCriacao: new Date().toISOString().split('.')[0],
      dataAlteracao: new Date().toISOString().split('.')[0],
      idLista: this.idLista as number
    }
    
    if(this.tarefa.objetivo != '')
      this.tarefaService.cadastrar(this.idLista as number, Number(localStorage.getItem('iduser')), novaTarefa)
      .subscribe(
        (res) => {
          this.criarTarefa.emit(res)

        },
        (err)=>{
          this.fechar(null)
        }
      )
    else{
      alert("Insira um Objetivo")
    }
  }
  alterarTarefa(){
    let novaTarefa: Tarefa = {
      ...this.tarefa,
      prazo: this.tarefa.prazo? new Date(this.tarefa.prazo).toISOString().split(".")[0]: '',
      dataAlteracao: new Date().toISOString().split('.')[0]
    }
    
    if(this.tarefa.objetivo != '')
      this.tarefaService.atualizar(novaTarefa)
      .subscribe(
        (res) => {
          this.editarTarefa.emit(res)
          this.fechar(null)
        },
        (err)=>{
          this.fechar(this.tarefaSnapshot)
        }
      )
    else{
      alert("Insira um Objetivo")
    }
  }
  fechar(tarefaAntiga: Tarefa | null){
    if(tarefaAntiga != null)
      this.close.emit(tarefaAntiga)
    
    this.close.emit()
  }
  removerPrioridade(p: Prioridade){
    if(this.tarefa.tagPrioridade?.id == p.id){
      this.tarefa.tagPrioridade = null;

      (this.tarefaSnapshot as Tarefa).tagPrioridade  = null
    }
  }
}
