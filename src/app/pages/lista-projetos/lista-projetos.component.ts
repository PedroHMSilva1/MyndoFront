import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../entities/Projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrl: './lista-projetos.component.scss'
})

export class ListaProjetosComponent implements OnInit{
  idUsuario = localStorage.getItem('iduser')
  projetos: Projeto[] = []
  projetosP: Projeto[] = []
  showFormNewProject = false
  projAlterando: Projeto | null = null
  constructor(private projService: ProjetoService, private router: Router){

  }
  ngOnInit(): void {
    if(this.idUsuario == null){
      this.router.navigate(['/login'])
    }
    this.buscarProjetosCriados()
    this.buscarProjetosParticipados()
  }
  buscarProjetosCriados(): void{
    this.projService.findAllByCriador(this.idUsuario as unknown as number)
    .subscribe((res)=> {
      this.projetos = res 
    })
  }
  buscarProjetosParticipados(): void{
    this.projService.findAllByMembro(this.idUsuario as unknown as number)
    .subscribe((res)=> {
      this.projetosP = res 
    })
  }

  abrirNovoProjeto(): void{
    this.showFormNewProject = true
  }
  addProjetoALista(projeto: Projeto | null){
    if(projeto == null)
      alert("Erro ao adicionar novo projeto")
    else{
      this.projetos.push(projeto)
    }
    this.showFormNewProject = false
  }
  verProjeto(id: number): void{
    this.router.navigate(['/projeto'],{state: {id}})
  }
  apagarProjeto(projeto: Projeto): void{
    this.projService.deletar(projeto.id as unknown as number)
    .subscribe(() => {
      if(projeto.id){
        this.projetos = this.projetos.filter(p => p.id !== projeto.id)

      }
    })
  }
  alterarProjeto(projeto: Projeto | null){
    if(projeto == null){
      alert("Erro ao alterar projeto")
    }else{
      this.projetos[this.projetos.findIndex((p, index) => p.id === projeto.id)] = projeto
    }
    this.projAlterando = null
  }
  abrirAlteracao(projeto: Projeto | null){
    if(projeto)
      this.projAlterando = {...projeto} as Projeto 

  }
}
