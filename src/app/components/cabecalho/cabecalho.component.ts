import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  constructor(private router: Router){
    this.currentUrl = this.router.url
  }
  currentUrl: string = ''
  irParaListaProjetos(): void{
    if(this.currentUrl != '/projetos'){
      this.router.navigate(['/projetos'])
    }
  }
  
  
  @Output("novoProjeto") novoProjeto = new EventEmitter<undefined>()
  emitNovoProjeto (){
    this.novoProjeto.emit()
  }
  irPerfil(): void{
    this.router.navigate(['/perfil'])
  }
  logoff(){
    localStorage.removeItem('iduser')
    this.router.navigate(['/login'])
  }
}
