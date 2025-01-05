import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoComponent } from './pages/projeto/projeto.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EsqueceuComponent } from './pages/esqueceu/esqueceu.component';
import { ListaProjetosComponent } from './pages/lista-projetos/lista-projetos.component';
import { AreaPerfilComponent } from './pages/area-perfil/area-perfil.component';


const routes: Routes = [
  //{path: '', component: ProjetoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'esqueceu', component: EsqueceuComponent},
  { path: 'projeto', component: ProjetoComponent},
  { path: 'projetos', component: ListaProjetosComponent},
  { path: 'perfil', component: AreaPerfilComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
