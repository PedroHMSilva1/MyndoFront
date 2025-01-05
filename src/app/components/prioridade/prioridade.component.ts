import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PrioridadeService } from '../../services/prioridade.service';
import { Prioridade } from '../../entities/Prioridade';

@Component({
  selector: 'app-prioridade',
  templateUrl: './prioridade.component.html',
  styleUrl: './prioridade.component.scss'
})
export class PrioridadeComponent implements OnInit{
  @Input() idProjeto = 0;
  prioridades: Prioridade[] = []
  prioridade: Prioridade = {
    cor: '#00ffb8',
    prioridade: ''
  }
  @Output("fechar") fechar = new EventEmitter<void>()
  @Output("prioridade") selecionarPrioridade = new EventEmitter<Prioridade>()
  @Output("removido") removido = new EventEmitter<Prioridade>()
  constructor(private router: Router, private service: PrioridadeService){
  }
  ngOnInit(): void {
    this.idProjeto = this.router.lastSuccessfulNavigation?.extras?.state?.["id"]
    this.buscarPrioridades()
  }
  buscarPrioridades(): void{
    this.service.findAllByProjeto(this.idProjeto)
    .subscribe((res)=> this.prioridades = res)
  }
  select(prioridade: Prioridade){
    this.selecionarPrioridade.emit(prioridade)
    this.fechar.emit()
  }
  adicionarPrioridade(): void{
    this.service.cadastrar(this.idProjeto, this.prioridade)
      .subscribe((res)=> {
        this.prioridades.push(res)
        this.zerarPrioridade()
      },
      (err)=> {
        this.zerarPrioridade()
        alert("Falha ao adicionar prioridade")

      }
    )
  }
  apagarPrioridade(prioridade: Prioridade){
    this.service.apagar(prioridade.id)
      .subscribe((res)=>{
        alert("Excluído")
        this.prioridades = this.prioridades.filter(p => p.id != prioridade.id)
        this.removido.emit(prioridade)
      },
      (err)=>{
        alert("Falha ao apagar prioridade")
      })
  }
  zerarPrioridade():void {
    this.prioridade = {
      cor: '',
      prioridade: ''
    }
  }
}
