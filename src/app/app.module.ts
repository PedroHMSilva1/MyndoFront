import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ProjetoComponent } from './pages/projeto/projeto.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EsqueceuComponent } from './pages/esqueceu/esqueceu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TarefaComponent } from './components/tarefa/tarefa.component';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { ListaProjetosComponent } from './pages/lista-projetos/lista-projetos.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { FormProjetoComponent } from './components/form-projeto/form-projeto.component';
import { AreaPerfilComponent } from './pages/area-perfil/area-perfil.component';
import { PrioridadeComponent } from './components/prioridade/prioridade.component';
import { InviterComponent } from './components/inviter/inviter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjetoComponent,
    LoginComponent,
    CadastroComponent,
    EsqueceuComponent,
    TarefaComponent,
    FormTarefaComponent,
    ListaProjetosComponent,
    CabecalhoComponent,
    FormProjetoComponent,
    AreaPerfilComponent,
    PrioridadeComponent,
    InviterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatToolbarModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
