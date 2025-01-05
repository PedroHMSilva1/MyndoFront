import { Component, OnInit } from '@angular/core';
import { Lista } from '../../entities/Lista';
import { ProjetoService } from '../../services/projeto.service';
import { ListaService } from '../../services/lista.service';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../entities/Tarefa';
import {
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Projeto } from '../../entities/Projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {
  convidando: boolean = false
  idProjeto = 0
  idLista: number = 0
  listas: Lista[] = []
  tarefas: Map<number, Tarefa[]> = new Map()
  projeto: Projeto = {
    titulo: ''
  }
  novaLista: Lista = {
    titulo: ''
  }
  tarefaSelec: Tarefa | null = null
  constructor(private router: Router ,private projService: ProjetoService, private listService: ListaService, private tarefaService: TarefaService) {

  }
  ngOnInit(): void {
    this.idProjeto = this.router.lastSuccessfulNavigation?.extras?.state?.["id"]
    if(this.idProjeto != undefined){
      this.buscarProjeto()
      this.buscarListas()
    }
    else{
      this.router.navigate(['/projetos'])
    }
  }
  buscarProjeto(): void{
    this.projService.findById(this.idProjeto)
    .subscribe((res)=> {
      this.projeto = res
    })
  }
  buscarListas(): void {
    this.listService.findAllByProjeto(this.idProjeto)
      .subscribe((res) => {
        this.listas = res
      },(err) => {}, () => this.buscarTarefas())
  }
  buscarTarefas(): void {
    this.listas.forEach(lista => {
      this.tarefaService.findAllByLista(lista.id as number)
        .subscribe((tarefas) => {
          this.tarefas.set(lista.id as number, tarefas.filter(tarefa => tarefa.idLista === lista.id as number))
        }, (err) => console.log(err))
    })
  }
  trocarListaDaTarefa(event: CdkDragDrop<Tarefa[] | undefined, any, Tarefa>) {
    if(event.previousContainer !== event.container){
      this.tarefaService.atualizarListaDaTarefa(Number(event.container.id), event.item.data.id || 0)
        .subscribe((res) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data || [],
            event.previousIndex,
            event.currentIndex,
          );
        })

    }

  }
  adicionarNovaLista(): void{
    this.listService.cadastrar(this.idProjeto, this.novaLista)
      .subscribe((newList) => {
        if(newList.id)
          this.tarefas.set(newList.id, [] as Tarefa[])//cria um novo array que representa as tarefas da nova lista
        this.listas.push(newList)// adiciona a nova lista ao front
      })
    this.novaLista.titulo = ''
  }
  apagarLista(lista: Lista): void{
    this.listService.apagar(lista.id)
    .subscribe(() => {
      if(lista.id){
        this.listas = this.listas.filter(l => l.id !== lista.id)
        this.tarefas.delete(lista.id)
      }
    })
  }
  abrirFormNovaTarefa(idLista: number){
    this.idLista = idLista
  }
  fecharFormTarefa(tarefa: Tarefa | null){
    if(tarefa !== null)
      this.tarefas.get(this.idLista)?.push(tarefa)
    this.idLista = 0
  }
  trataData(data: any): string{
    let date = new Date(data as string)
    let dia = date.getUTCDate()
    let mes = date.getMonth()
    let ano = date.getFullYear()
    return `${dia}/${mes+1}/${ano}`
 
  }
  abrirTarefa(tarefa: Tarefa){
    this.tarefaSelec = tarefa
  }
  apagarTarefa(id: number) {
    let listaT = this.tarefas.get(this.tarefaSelec?.idLista as number)
    this.tarefas.set(this.tarefaSelec?.idLista as number, listaT?.filter(t => t.id !== id) as Tarefa[])
    this.tarefaSelec = null
  }
  carregarTarefaAlterada(tarefa: Tarefa){
    this.tarefas.set(tarefa.idLista as number, (this.tarefas.get(tarefa.idLista as number) as Tarefa[]).map((t)=> {
      if(t.id == tarefa.id)
        return tarefa
      return t
    }))
  }

}
