import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './features/author/author.component';
import { BookComponent } from './features/book/book.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'authors', component: AuthorComponent},
  {path: 'books', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
