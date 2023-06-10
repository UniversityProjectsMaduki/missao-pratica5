import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LivroListaComponent } from './livro-lista/livro-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: LivroListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
